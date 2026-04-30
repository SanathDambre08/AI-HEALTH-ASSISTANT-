/**
 * MediPulse Reminder & Tracker Module
 */
const ReminderTrackerModule = (() => {
    let _showAddForm = false;

    function render() {
        _showAddForm = false;
        const schedule = Storage.getMedicineSchedule();
        const adherence = Storage.getAdherenceStats(7);
        const streak = Storage.getStreak();
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = Storage.getLogsForDate(today);

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon amber"><i data-lucide="bell-ring"></i></span>
                Medicine Reminders
            </h1>
            <p class="page-description">Track your medication schedule and never miss a dose.</p>
        </div>

        <!-- Stats Row -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon mint"><i data-lucide="check-circle"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Adherence</div>
                    <div class="stat-value" style="color: ${adherence.rate >= 80 ? 'var(--success)' : adherence.rate >= 50 ? 'var(--warning)' : 'var(--danger)'};">${adherence.rate}%</div>
                    <div class="stat-sub">7-day average</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon amber"><i data-lucide="flame"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Streak</div>
                    <div class="stat-value">${streak}</div>
                    <div class="stat-sub">day${streak !== 1 ? 's' : ''} perfect</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon teal"><i data-lucide="pill"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Active Medicines</div>
                    <div class="stat-value">${schedule.filter(m => m.active).length}</div>
                    <div class="stat-sub">of ${schedule.length} total</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon coral"><i data-lucide="calendar-check"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Today Taken</div>
                    <div class="stat-value">${todayLogs.filter(l => l.status === 'taken').length}</div>
                    <div class="stat-sub">of ${getTodayExpected()} expected</div>
                </div>
            </div>
        </div>

        <div class="grid-2">
            <!-- Today's Schedule -->
            <div class="glass-card-static">
                <div class="section-header">
                    <h2 class="section-title">Today's Doses</h2>
                    <span class="badge badge-primary">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div id="todayDoses">
                    ${renderTodayDoses()}
                </div>
            </div>

            <!-- Adherence Chart -->
            <div class="glass-card-static">
                <div class="section-header">
                    <h2 class="section-title">Adherence Progress</h2>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; padding: var(--space-lg);">
                    <div class="progress-ring">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle class="progress-ring-bg" cx="60" cy="60" r="52"></circle>
                            <circle class="progress-ring-fill" cx="60" cy="60" r="52"
                                stroke-dasharray="${2 * Math.PI * 52}"
                                stroke-dashoffset="${2 * Math.PI * 52 * (1 - adherence.rate / 100)}"
                                style="stroke: ${adherence.rate >= 80 ? 'var(--success)' : adherence.rate >= 50 ? 'var(--warning)' : 'var(--danger)'};">
                            </circle>
                        </svg>
                        <div class="progress-ring-text">
                            <div class="progress-ring-value">${adherence.rate}%</div>
                            <div class="progress-ring-label">adherence</div>
                        </div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: var(--font-sm); color: var(--text-secondary);">
                        ${adherence.rate >= 90 ? '🌟 Excellent! Keep it up!' :
                          adherence.rate >= 70 ? '👍 Good work! Room for improvement.' :
                          adherence.rate >= 50 ? '⚠️ Try not to miss doses.' :
                          '❗ Your adherence needs improvement.'}
                    </p>
                </div>
            </div>
        </div>

        <!-- Medicine Schedule -->
        <div class="glass-card-static mt-lg">
            <div class="section-header">
                <h2 class="section-title">Medicine Schedule</h2>
                <button class="btn btn-primary btn-sm" id="addMedicineBtn">
                    <i data-lucide="plus"></i> Add Medicine
                </button>
            </div>

            <div id="addMedicineForm" class="${_showAddForm ? '' : 'hidden'}">
                ${renderAddForm()}
            </div>

            <div id="medicineScheduleList">
                ${renderScheduleList()}
            </div>
        </div>
        `;
    }

    function getTodayExpected() {
        const schedule = Storage.getMedicineSchedule().filter(m => m.active);
        let total = 0;
        schedule.forEach(m => {
            const freq = parseInt(m.frequency) || 1;
            total += freq;
        });
        return total;
    }

    function renderTodayDoses() {
        const schedule = Storage.getMedicineSchedule().filter(m => m.active);
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = Storage.getLogsForDate(today);

        if (schedule.length === 0) {
            return `
            <div class="empty-state" style="padding: var(--space-lg);">
                <p class="empty-state-desc">No medicines scheduled. Add a medicine to start tracking.</p>
            </div>
            `;
        }

        let html = '<div style="display: flex; flex-direction: column; gap: var(--space-sm);">';

        schedule.forEach(med => {
            const freq = parseInt(med.frequency) || 1;
            const times = med.times || generateTimes(freq);

            times.forEach((time, idx) => {
                const logKey = `${med.id}_${idx}`;
                const log = todayLogs.find(l => l.scheduleId === med.id && l.doseIndex === idx);
                const status = log ? log.status : 'pending';

                html += `
                <div class="reminder-card" style="padding: var(--space-md);">
                    <div class="reminder-info">
                        <div class="reminder-name">${med.medicineName}</div>
                        <div class="reminder-details">
                            <span>💊 ${med.dosage}</span>
                            <span>🕐 ${time}</span>
                        </div>
                    </div>
                    <div class="reminder-actions">
                        ${status === 'pending' ? `
                            <button class="btn btn-primary btn-sm dose-action" data-schedule-id="${med.id}" data-dose-index="${idx}" data-action="taken">
                                <i data-lucide="check"></i> Taken
                            </button>
                            <button class="btn btn-danger btn-sm dose-action" data-schedule-id="${med.id}" data-dose-index="${idx}" data-action="missed">
                                <i data-lucide="x"></i> Missed
                            </button>
                        ` : `
                            <span class="badge ${status === 'taken' ? 'badge-success' : 'badge-danger'}">${status === 'taken' ? '✓ Taken' : '✗ Missed'}</span>
                        `}
                    </div>
                </div>
                `;
            });
        });

        html += '</div>';
        return html;
    }

    function generateTimes(frequency) {
        const timeSlots = {
            1: ['09:00 AM'],
            2: ['09:00 AM', '09:00 PM'],
            3: ['08:00 AM', '02:00 PM', '10:00 PM'],
            4: ['06:00 AM', '12:00 PM', '06:00 PM', '12:00 AM'],
        };
        return timeSlots[frequency] || timeSlots[1];
    }

    function renderAddForm() {
        return `
        <div class="glass-card mb-lg" style="border: 1px solid var(--primary); border-left: 3px solid var(--primary);">
            <h3 style="margin-bottom: var(--space-lg); font-size: var(--font-base);">Add New Medicine</h3>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="medName">Medicine Name *</label>
                    <input type="text" id="medName" class="input" placeholder="e.g., Paracetamol">
                </div>
                <div class="form-group">
                    <label class="form-label" for="medDosage">Dosage *</label>
                    <input type="text" id="medDosage" class="input" placeholder="e.g., 500mg">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label" for="medFrequency">Times per Day</label>
                    <select id="medFrequency" class="select">
                        <option value="1">Once daily</option>
                        <option value="2">Twice daily</option>
                        <option value="3">Three times daily</option>
                        <option value="4">Four times daily</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label" for="medDuration">Duration</label>
                    <select id="medDuration" class="select">
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="ongoing">Ongoing</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label" for="medNotes">Notes (optional)</label>
                <input type="text" id="medNotes" class="input" placeholder="e.g., Take after food">
            </div>
            <div class="btn-group" style="justify-content: flex-end;">
                <button class="btn btn-outline btn-sm" id="cancelAddMed">Cancel</button>
                <button class="btn btn-primary btn-sm" id="saveMedBtn">
                    <i data-lucide="plus"></i> Add Medicine
                </button>
            </div>
        </div>
        `;
    }

    function renderScheduleList() {
        const schedule = Storage.getMedicineSchedule();

        if (schedule.length === 0) {
            return `
            <div class="empty-state" style="padding: var(--space-lg);">
                <div class="empty-state-icon"><i data-lucide="pill"></i></div>
                <h3 class="empty-state-title">No medicines scheduled</h3>
                <p class="empty-state-desc">Add your first medicine to start tracking adherence.</p>
            </div>
            `;
        }

        return `
        <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${schedule.map(med => `
                <div class="reminder-card">
                    <div class="reminder-info">
                        <div class="reminder-name">
                            ${med.medicineName}
                            ${med.active ? '<span class="badge badge-success" style="margin-left: 8px;">Active</span>' : '<span class="badge badge-muted" style="margin-left: 8px;">Inactive</span>'}
                        </div>
                        <div class="reminder-details">
                            <span>💊 ${med.dosage}</span>
                            <span>📅 ${med.frequency}x daily</span>
                            ${med.notes ? `<span>📝 ${med.notes}</span>` : ''}
                        </div>
                    </div>
                    <div class="reminder-actions">
                        <button class="btn btn-outline btn-sm toggle-med-btn" data-med-id="${med.id}" title="${med.active ? 'Deactivate' : 'Activate'}">
                            <i data-lucide="${med.active ? 'pause' : 'play'}"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-med-btn" data-med-id="${med.id}" title="Delete">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    }

    function refreshUI() {
        const todayEl = document.getElementById('todayDoses');
        const listEl = document.getElementById('medicineScheduleList');
        if (todayEl) todayEl.innerHTML = renderTodayDoses();
        if (listEl) listEl.innerHTML = renderScheduleList();
        bindDoseEvents();
        bindScheduleEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function bindDoseEvents() {
        document.querySelectorAll('.dose-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const scheduleId = parseInt(btn.getAttribute('data-schedule-id'));
                const doseIndex = parseInt(btn.getAttribute('data-dose-index'));
                const action = btn.getAttribute('data-action');

                Storage.addMedicineLog({
                    scheduleId: scheduleId,
                    doseIndex: doseIndex,
                    medicineName: Storage.getMedicineSchedule().find(m => m.id === scheduleId)?.medicineName || 'Unknown',
                    status: action,
                });

                App.showToast(action === 'taken' ? '✓ Dose marked as taken!' : '✗ Dose marked as missed', action === 'taken' ? 'success' : 'warning');
                refreshUI();
            });
        });
    }

    function bindScheduleEvents() {
        // Toggle active
        document.querySelectorAll('.toggle-med-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-med-id'));
                const med = Storage.getMedicineSchedule().find(m => m.id === id);
                if (med) {
                    Storage.updateMedicineSchedule(id, { active: !med.active });
                    refreshUI();
                }
            });
        });

        // Delete
        document.querySelectorAll('.delete-med-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-med-id'));
                if (confirm('Remove this medicine from your schedule?')) {
                    Storage.removeMedicineSchedule(id);
                    App.showToast('Medicine removed from schedule', 'info');
                    refreshUI();
                }
            });
        });
    }

    function afterRender() {
        // Add medicine button
        const addBtn = document.getElementById('addMedicineBtn');
        const formContainer = document.getElementById('addMedicineForm');

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                _showAddForm = !_showAddForm;
                formContainer.innerHTML = renderAddForm();
                formContainer.classList.toggle('hidden', !_showAddForm);
                if (typeof lucide !== 'undefined') lucide.createIcons();
                bindFormEvents();
            });
        }

        bindDoseEvents();
        bindScheduleEvents();
    }

    function bindFormEvents() {
        const cancelBtn = document.getElementById('cancelAddMed');
        const saveBtn = document.getElementById('saveMedBtn');
        const formContainer = document.getElementById('addMedicineForm');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                _showAddForm = false;
                formContainer.classList.add('hidden');
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const name = document.getElementById('medName').value.trim();
                const dosage = document.getElementById('medDosage').value.trim();
                const frequency = document.getElementById('medFrequency').value;
                const duration = document.getElementById('medDuration').value;
                const notes = document.getElementById('medNotes').value.trim();

                if (!name || !dosage) {
                    App.showToast('Please fill in medicine name and dosage', 'error');
                    return;
                }

                const times = generateTimes(parseInt(frequency));

                Storage.addMedicineSchedule({
                    medicineName: name,
                    dosage: dosage,
                    frequency: frequency,
                    duration: duration,
                    notes: notes,
                    times: times,
                });

                App.showToast(`${name} added to your schedule!`, 'success');
                _showAddForm = false;
                formContainer.classList.add('hidden');
                refreshUI();
            });
        }
    }

    return { render, afterRender };
})();

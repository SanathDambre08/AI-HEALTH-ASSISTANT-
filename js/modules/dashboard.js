/**
 * MediPulse Dashboard Module
 */
const DashboardModule = (() => {

    function render() {
        const adherence = Storage.getAdherenceStats(7);
        const streak = Storage.getStreak();
        const schedule = Storage.getMedicineSchedule().filter(m => m.active);
        const history = Storage.getSymptomsHistory().slice(0, 5);

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon teal"><i data-lucide="layout-dashboard"></i></span>
                Welcome back, ${Storage.getUser().name || 'User'}!
            </h1>
            <p class="page-description">Your health overview at a glance. Track medications, symptoms, and wellness.</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon teal"><i data-lucide="pill"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Active Medicines</div>
                    <div class="stat-value">${schedule.length}</div>
                    <div class="stat-sub">being tracked</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon mint"><i data-lucide="check-circle"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Adherence Rate</div>
                    <div class="stat-value" style="color: ${adherence.rate >= 80 ? 'var(--success)' : adherence.rate >= 50 ? 'var(--warning)' : 'var(--danger)'}">${adherence.rate}%</div>
                    <div class="stat-sub">last 7 days</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon amber"><i data-lucide="flame"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Current Streak</div>
                    <div class="stat-value">${streak}</div>
                    <div class="stat-sub">day${streak !== 1 ? 's' : ''}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon coral"><i data-lucide="activity"></i></div>
                <div class="stat-info">
                    <div class="stat-label">Symptom Checks</div>
                    <div class="stat-value">${Storage.getSymptomsHistory().length}</div>
                    <div class="stat-sub">total checks</div>
                </div>
            </div>
        </div>

        <div class="grid-2">
            <!-- Adherence Chart -->
            <div class="glass-card-static">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Weekly Adherence</h2>
                        <p class="section-subtitle">Medicine intake over the last 7 days</p>
                    </div>
                </div>
                <div style="position: relative; height: 220px;">
                    <canvas id="adherenceChart"></canvas>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="glass-card-static">
                <div class="section-header">
                    <h2 class="section-title">Quick Actions</h2>
                </div>
                <div class="quick-actions">
                    <a href="#symptom-checker" class="quick-action" data-navigate="symptom-checker">
                        <div class="quick-action-icon stat-icon teal"><i data-lucide="stethoscope"></i></div>
                        <span class="quick-action-label">Check Symptoms</span>
                    </a>
                    <a href="#medicine-search" class="quick-action" data-navigate="medicine-search">
                        <div class="quick-action-icon stat-icon blue"><i data-lucide="pill"></i></div>
                        <span class="quick-action-label">Medicine Search</span>
                    </a>
                    <a href="#reminder-tracker" class="quick-action" data-navigate="reminder-tracker">
                        <div class="quick-action-icon stat-icon amber"><i data-lucide="bell-ring"></i></div>
                        <span class="quick-action-label">Set Reminder</span>
                    </a>
                    <a href="#mental-health" class="quick-action" data-navigate="mental-health">
                        <div class="quick-action-icon stat-icon coral"><i data-lucide="brain"></i></div>
                        <span class="quick-action-label">Mental Health</span>
                    </a>
                    <a href="#eye-test" class="quick-action" data-navigate="eye-test">
                        <div class="quick-action-icon stat-icon mint"><i data-lucide="eye"></i></div>
                        <span class="quick-action-label">Eye Test</span>
                    </a>
                    <a href="#health-knowledge" class="quick-action" data-navigate="health-knowledge">
                        <div class="quick-action-icon stat-icon blue"><i data-lucide="book-open"></i></div>
                        <span class="quick-action-label">Health Library</span>
                    </a>
                </div>
            </div>
        </div>



        <!-- Recent Symptom History -->
        <div class="glass-card-static mt-lg">
            <div class="section-header">
                <div>
                    <h2 class="section-title">Recent Symptom Checks</h2>
                    <p class="section-subtitle">Your latest health inquiries</p>
                </div>
            </div>
            ${history.length > 0 ? `
                <div class="timeline">
                    ${history.map(h => `
                        <div class="timeline-item">
                            <div class="timeline-dot ${h.urgency || 'mild'}"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">${new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                <div class="timeline-title">${h.symptoms || 'Health Check'}</div>
                                <div class="timeline-desc">
                                    <span class="badge urgency-badge-${h.urgency || 'mild'}">${(h.urgency || 'mild').toUpperCase()}</span>
                                    ${h.possibleCauses ? ` — ${h.possibleCauses.slice(0, 2).join(', ')}` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    <div class="empty-state-icon"><i data-lucide="stethoscope"></i></div>
                    <h3 class="empty-state-title">No symptom checks yet</h3>
                    <p class="empty-state-desc">Use the symptom checker to get health guidance</p>
                    <a href="#symptom-checker" class="btn btn-primary" data-navigate="symptom-checker">
                        <i data-lucide="stethoscope"></i> Check Symptoms
                    </a>
                </div>
            `}
        </div>
        `;
    }

    function afterRender() {
        renderAdherenceChart();

        // Quick action navigation
        document.querySelectorAll('[data-navigate]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const module = el.getAttribute('data-navigate');
                window.location.hash = module;
            });
        });
    }

    function renderAdherenceChart() {
        const canvas = document.getElementById('adherenceChart');
        if (!canvas) return;

        const stats = Storage.getAdherenceStats(7);
        const ctx = canvas.getContext('2d');

        if (window._adherenceChart) {
            window._adherenceChart.destroy();
        }

        window._adherenceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stats.byDay.map(d => d.label),
                datasets: [
                    {
                        label: 'Taken',
                        data: stats.byDay.map(d => d.taken),
                        backgroundColor: 'rgba(0, 212, 170, 0.7)',
                        borderColor: 'rgba(0, 212, 170, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                    },
                    {
                        label: 'Missed',
                        data: stats.byDay.map(d => d.missed),
                        backgroundColor: 'rgba(255, 107, 107, 0.7)',
                        borderColor: 'rgba(255, 107, 107, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#9fa8da',
                            font: { family: 'Inter', size: 11 },
                            boxWidth: 12,
                            padding: 16,
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { color: '#5c6bc0', font: { family: 'Inter', size: 11 } }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.04)' },
                        ticks: {
                            color: '#5c6bc0',
                            font: { family: 'Inter', size: 11 },
                            stepSize: 1,
                        }
                    }
                }
            }
        });
    }



    return { render, afterRender };
})();

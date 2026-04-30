/**
 * MediPulse Medicine Search Module
 */
const MedicineSearchModule = (() => {
    let _medicineData = null;
    let _selectedMedicine = null;
    let _currentPage = 1;
    const _itemsPerPage = 12;
    let _currentCategory = 'All';

    async function loadData() {
        if (_medicineData) return;
        try {
            const res = await fetch('data/medicines.json');
            _medicineData = await res.json();
        } catch (e) {
            console.error('Failed to load medicine data:', e);
            _medicineData = { medicines: [] };
        }
    }

    function render() {
        _selectedMedicine = null;
        _currentPage = 1;

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon blue"><i data-lucide="pill"></i></span>
                Medicine Search
            </h1>
            <p class="page-description">Search for any medicine to get usage information, side effects, and cheaper alternatives.</p>
        </div>

        <div class="glass-card-static mb-lg">
            <div class="search-container" style="margin-bottom: 0;">
                <i data-lucide="search" class="search-icon"></i>
                <input type="text" id="medicineSearchInput" class="search-input" placeholder="Search medicine name (e.g., Paracetamol, Dolo 650, Crocin...)" autocomplete="off">
                <div class="search-suggestions" id="medicineSuggestions"></div>
            </div>
            <div style="margin-top: var(--space-md); display: flex; align-items: center; gap: var(--space-sm);">
                <label for="medicineCategoryFilter" style="font-size: var(--font-sm); font-weight: 500;">Filter by Category:</label>
                <select id="medicineCategoryFilter" class="search-input" style="max-width: 250px; padding: var(--space-sm); border-radius: var(--radius-md);">
                    <option value="All">All Categories</option>
                    ${renderCategoryOptions()}
                </select>
            </div>
        </div>

        <div id="medicineResultContainer">
            ${renderMedicineList()}
        </div>
        `;
    }

    function renderCategoryOptions() {
        if (!_medicineData) return '';
        const cats = [...new Set(_medicineData.medicines.map(m => m.category))].sort();
        return cats.map(c => `<option value="${c}" ${_currentCategory === c ? 'selected' : ''}>${c}</option>`).join('');
    }

    function renderMedicineList() {
        if (!_medicineData) return '<div class="loading-overlay"><div class="spinner spinner-lg"></div><p class="loading-text">Loading medicines...</p></div>';

        let filtered = _medicineData.medicines;
        if (_currentCategory !== 'All') {
            filtered = filtered.filter(m => m.category === _currentCategory);
        }

        const totalItems = filtered.length;
        const visibleItems = filtered.slice(0, _currentPage * _itemsPerPage);
        const hasMore = visibleItems.length < totalItems;

        return `
        <div class="section-header">
            <div>
                <h2 class="section-title">Medicines Dictionary</h2>
                <p class="section-subtitle">Showing ${visibleItems.length} of ${totalItems} medicines</p>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md);">
            ${visibleItems.map(med => `
                <div class="medicine-card" style="cursor: pointer;" data-medicine-id="${med.id}">
                    <div class="medicine-card-header">
                        <div>
                            <div class="medicine-card-name">${med.name}</div>
                            <div class="medicine-card-generic">${med.genericName}</div>
                        </div>
                        <span class="badge badge-${med.priceTier === 'low' ? 'success' : 'warning'}">${med.priceTier === 'low' ? '💰 Affordable' : '💰 Medium'}</span>
                    </div>
                    <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-sm);">${med.purpose.substring(0, 80)}...</p>
                    <div class="tag-list">
                        <span class="badge badge-info">${med.category}</span>
                    </div>
                </div>
            `).join('')}
        </div>
        ${hasMore ? `
        <div style="text-align: center; margin-top: var(--space-xl);">
            <button class="btn btn-outline" id="loadMoreBtn">
                <i data-lucide="chevron-down"></i> Load More
            </button>
        </div>` : ''}
        `;
    }

    function renderMedicineDetail(med) {
        return `
        <div class="animate-in">
            <button class="btn btn-outline btn-sm mb-lg" id="backToSearch">
                <i data-lucide="arrow-left"></i> Back to Search
            </button>

            <div class="medicine-card mb-lg" style="border-left: 3px solid var(--primary);">
                <div class="medicine-card-header">
                    <div>
                        <div class="medicine-card-name" style="font-size: var(--font-xl);">${med.name}</div>
                        <div class="medicine-card-generic">${med.genericName}</div>
                        ${med.brandNames ? `<div style="margin-top: var(--space-sm); font-size: var(--font-xs); color: var(--text-muted);">Also sold as: ${med.brandNames.join(', ')}</div>` : ''}
                    </div>
                    <div style="text-align: right;">
                        <span class="badge badge-info" style="font-size: var(--font-sm);">${med.category}</span>
                        <br>
                        <span class="badge badge-${med.priceTier === 'low' ? 'success' : 'warning'} mt-sm">${med.priceTier === 'low' ? '💰 Affordable' : '💰 Medium'}</span>
                    </div>
                </div>

                <div class="medicine-card-body mt-lg">
                    <!-- Purpose -->
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="target" class="icon-sm"></i> Purpose</h4>
                        <p class="result-advice">${med.purpose}</p>
                    </div>

                    <!-- Dosage -->
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="clock" class="icon-sm"></i> Dosage</h4>
                        <p style="font-size: var(--font-sm); color: var(--text-primary); background: var(--bg-glass); padding: var(--space-md); border-radius: var(--radius-md);">${med.dosage}</p>
                    </div>

                    <!-- Food Interaction -->
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="utensils" class="icon-sm"></i> Food Interaction</h4>
                        <p style="font-size: var(--font-sm); color: var(--text-primary);">${med.foodInteraction}</p>
                    </div>

                    <!-- Side Effects -->
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="alert-circle" class="icon-sm"></i> Possible Side Effects</h4>
                        <div class="tag-list">
                            ${med.sideEffects.map(s => `<span class="badge badge-muted">${s}</span>`).join('')}
                        </div>
                    </div>

                    <!-- Precautions -->
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="shield-alert" class="icon-sm"></i> Precautions</h4>
                        <ul class="result-list">
                            ${med.precautions.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- Warnings -->
                    ${med.warnings && med.warnings.length > 0 ? `
                    <div class="medicine-warnings">
                        <div class="medicine-warnings-title">
                            <i data-lucide="alert-triangle" class="icon-sm"></i> Warnings
                        </div>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-xs);">
                            ${med.warnings.map(w => `<li style="font-size: var(--font-sm); color: var(--text-primary);">⚠️ ${w}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    <!-- Alternatives -->
                    ${med.alternatives && med.alternatives.length > 0 ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="repeat" class="icon-sm"></i> Alternatives</h4>
                        <div class="alternatives-list">
                            ${med.alternatives.map(a => `
                                <div class="alternative-item">
                                    <div>
                                        <strong>${a.name}</strong>
                                        <div style="font-size: var(--font-xs); color: var(--text-muted);">${a.note}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Disclaimer -->
            <div class="glass-card-static" style="border-left: 3px solid var(--warning);">
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">
                    ⚠️ <strong>Disclaimer:</strong> Medicine information is for educational purposes only. Always consult a doctor or pharmacist before taking any medication. Do not self-medicate with prescription drugs.
                </p>
            </div>
        </div>
        `;
    }

    function renderAIMedicineDetail(med) {
        return `
        <div class="animate-in">
            <button class="btn btn-outline btn-sm mb-lg" id="backToSearch">
                <i data-lucide="arrow-left"></i> Back to Search
            </button>

            <div class="medicine-card mb-lg" style="border-left: 3px solid var(--info);">
                <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
                    <span class="badge badge-info">AI Generated</span>
                </div>
                <div class="medicine-card-header">
                    <div>
                        <div class="medicine-card-name" style="font-size: var(--font-xl);">${med.name}</div>
                        ${med.genericName ? `<div class="medicine-card-generic">${med.genericName}</div>` : ''}
                    </div>
                    ${med.category ? `<span class="badge badge-info">${med.category}</span>` : ''}
                </div>

                <div class="medicine-card-body mt-lg">
                    ${med.purpose ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="target" class="icon-sm"></i> Purpose</h4>
                        <p class="result-advice">${med.purpose}</p>
                    </div>` : ''}

                    ${med.dosage ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="clock" class="icon-sm"></i> Dosage</h4>
                        <p style="font-size: var(--font-sm); color: var(--text-primary); background: var(--bg-glass); padding: var(--space-md); border-radius: var(--radius-md);">${med.dosage}</p>
                    </div>` : ''}

                    ${med.foodInteractions ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="utensils" class="icon-sm"></i> Food Interaction</h4>
                        <p style="font-size: var(--font-sm); color: var(--text-primary);">${med.foodInteractions}</p>
                    </div>` : ''}

                    ${med.sideEffects && med.sideEffects.length > 0 ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="alert-circle" class="icon-sm"></i> Side Effects</h4>
                        <div class="tag-list">${med.sideEffects.map(s => `<span class="badge badge-muted">${s}</span>`).join('')}</div>
                    </div>` : ''}

                    ${med.precautions && med.precautions.length > 0 ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="shield-alert" class="icon-sm"></i> Precautions</h4>
                        <ul class="result-list">${med.precautions.map(p => `<li>${p}</li>`).join('')}</ul>
                    </div>` : ''}

                    ${med.warnings && med.warnings.length > 0 ? `
                    <div class="medicine-warnings">
                        <div class="medicine-warnings-title"><i data-lucide="alert-triangle" class="icon-sm"></i> Warnings</div>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-xs);">
                            ${med.warnings.map(w => `<li style="font-size: var(--font-sm); color: var(--text-primary);">⚠️ ${w}</li>`).join('')}
                        </ul>
                    </div>` : ''}

                    ${med.alternatives && med.alternatives.length > 0 ? `
                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="repeat" class="icon-sm"></i> Alternatives</h4>
                        <div class="alternatives-list">
                            ${med.alternatives.map(a => `
                                <div class="alternative-item">
                                    <div><strong>${a.name}</strong><div style="font-size: var(--font-xs); color: var(--text-muted);">${a.note}</div></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </div>

            <div class="glass-card-static" style="border-left: 3px solid var(--warning);">
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">
                    ⚠️ <strong>Disclaimer:</strong> This information was generated by AI and may not be fully accurate. Always verify with a medical professional.
                </p>
            </div>
        </div>
        `;
    }

    function searchMedicines(query) {
        if (!_medicineData) return [];
        const lower = query.toLowerCase();
        return _medicineData.medicines.filter(m =>
            m.name.toLowerCase().includes(lower) ||
            m.genericName.toLowerCase().includes(lower) ||
            (m.brandNames && m.brandNames.some(b => b.toLowerCase().includes(lower))) ||
            m.category.toLowerCase().includes(lower)
        );
    }

    function showMedicineDetail(med) {
        _selectedMedicine = med;
        const container = document.getElementById('medicineResultContainer');
        container.innerHTML = renderMedicineDetail(med);
        bindDetailEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    async function showAIMedicineDetail(name) {
        const container = document.getElementById('medicineResultContainer');
        container.innerHTML = `
            <div class="loading-overlay">
                <div class="spinner spinner-lg"></div>
                <p class="loading-text">Looking up ${name}...</p>
            </div>
        `;

        const result = await AIService.getMedicineInfo(name);
        if (result) {
            container.innerHTML = renderAIMedicineDetail(result);
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon"><i data-lucide="search-x"></i></div>
                    <h3 class="empty-state-title">Medicine Not Found</h3>
                    <p class="empty-state-desc">We couldn't find information for "${name}". Try a different name or spelling.</p>
                    <button class="btn btn-primary" id="backToSearch"><i data-lucide="arrow-left"></i> Back to Search</button>
                </div>
            `;
        }
        bindDetailEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function bindSearchEvents() {
        const input = document.getElementById('medicineSearchInput');
        const suggestions = document.getElementById('medicineSuggestions');

        if (input) {
            input.addEventListener('input', () => {
                const val = input.value.trim();
                if (val.length >= 2) {
                    const results = searchMedicines(val);
                    if (results.length > 0) {
                        suggestions.innerHTML = results.map(m => `
                            <div class="search-suggestion-item" data-medicine-id="${m.id}">
                                <strong>${m.name}</strong> <span style="color: var(--text-muted);">— ${m.genericName}</span>
                            </div>
                        `).join('');
                        suggestions.classList.add('active');
                    } else {
                        suggestions.innerHTML = `
                            <div class="search-suggestion-item" data-ai-search="${val}">
                                🤖 Search "${val}" with AI
                            </div>
                        `;
                        suggestions.classList.add('active');
                    }
                } else {
                    suggestions.classList.remove('active');
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const val = input.value.trim();
                    if (val.length >= 2) {
                        const results = searchMedicines(val);
                        if (results.length > 0) {
                            showMedicineDetail(results[0]);
                        } else if (AIService.isOnline()) {
                            showAIMedicineDetail(val);
                        }
                        suggestions.classList.remove('active');
                    }
                }
            });
        }

        if (suggestions) {
            suggestions.addEventListener('click', (e) => {
                const item = e.target.closest('.search-suggestion-item');
                if (item) {
                    const medId = item.getAttribute('data-medicine-id');
                    const aiSearch = item.getAttribute('data-ai-search');

                    if (medId) {
                        const med = _medicineData.medicines.find(m => m.id === parseInt(medId));
                        if (med) showMedicineDetail(med);
                    } else if (aiSearch && AIService.isOnline()) {
                        showAIMedicineDetail(aiSearch);
                    }
                    suggestions.classList.remove('active');
                }
            });
        }

        // Search Category Filter
        const categoryFilter = document.getElementById('medicineCategoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                _currentCategory = e.target.value;
                _currentPage = 1;
                const container = document.getElementById('medicineResultContainer');
                container.innerHTML = renderMedicineList();
                bindListEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }

        // Delegate list events (medicine cards and load more)
        bindListEvents();

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                suggestions?.classList.remove('active');
            }
        });
    }

    function bindListEvents() {
        const container = document.getElementById('medicineResultContainer');
        if (!container) return;

        // Clean up previous delegated listener if necessary by replacing the container with its clone
        // For simplicity, we just attach inline or ensure we don't duplicate.
        // Actually, let's just use event delegation on the container.
        container.onclick = (e) => {
            const card = e.target.closest('[data-medicine-id]');
            if (card && !card.classList.contains('search-suggestion-item')) {
                const id = parseInt(card.getAttribute('data-medicine-id'));
                const med = _medicineData.medicines.find(m => m.id === id);
                if (med) showMedicineDetail(med);
            }

            const loadMore = e.target.closest('#loadMoreBtn');
            if (loadMore) {
                _currentPage++;
                container.innerHTML = renderMedicineList();
                bindListEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        };
    }

    function bindDetailEvents() {
        const backBtn = document.getElementById('backToSearch');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                _selectedMedicine = null;
                const container = document.getElementById('medicineResultContainer');
                container.innerHTML = renderMedicineList();
                bindListEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }

    async function afterRender() {
        await loadData();
        const categoryFilter = document.getElementById('medicineCategoryFilter');
        if (categoryFilter) {
            categoryFilter.innerHTML = `<option value="All">All Categories</option>${renderCategoryOptions()}`;
        }
        const container = document.getElementById('medicineResultContainer');
        container.innerHTML = renderMedicineList();
        bindSearchEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    return { render, afterRender };
})();

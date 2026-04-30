/**
 * MediPulse Symptom Checker Module
 */
const SymptomCheckerModule = (() => {
    let _symptomsData = null;
    let _currentStep = 'input'; // input, followUp, result
    let _currentSymptom = null;
    let _answers = {};
    let _aiResult = null;

    async function loadData() {
        if (_symptomsData) return;
        try {
            const res = await fetch('data/symptoms.json');
            _symptomsData = await res.json();
        } catch (e) {
            console.error('Failed to load symptoms data:', e);
            _symptomsData = { symptomSets: [] };
        }
    }

    function render() {
        _currentStep = 'input';
        _currentSymptom = null;
        _answers = {};
        _aiResult = null;

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon teal"><i data-lucide="stethoscope"></i></span>
                Symptom Checker
            </h1>
            <p class="page-description">Describe your symptoms and get guidance. This does NOT replace a doctor's diagnosis.</p>
        </div>

        <div id="symptomStepContainer">
            ${renderInputStep()}
        </div>
        `;
    }

    function renderInputStep() {
        const commonSymptoms = [
            'Fever', 'Headache', 'Cough', 'Sore Throat',
            'Fatigue', 'Nausea', 'Chest Pain', 'Shortness of Breath'
        ];

        return `
        <div class="symptom-hero-container animate-in">
            <h3 style="margin-bottom: var(--space-md); font-size: var(--font-lg); z-index: 1; position: relative;">What are you experiencing?</h3>
            <div class="symptom-hero-search" style="margin-bottom: var(--space-lg);">
                <i data-lucide="search" class="search-icon" style="position: absolute; top: 50%; transform: translateY(-50%);"></i>
                <input type="text" id="symptomInput" class="search-input" style="width: 100%; box-sizing: border-box;" placeholder="Describe your symptoms (e.g., fever, headache...)" autocomplete="off">
                <div class="search-suggestions" id="symptomSuggestions"></div>
            </div>

            <p class="text-muted mb-md" style="font-size: var(--font-sm); z-index: 1; position: relative;">Or select a common symptom:</p>
            <div class="tag-list" style="z-index: 1; position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-sm);">
                ${commonSymptoms.map(s => `
                    <button class="symptom-modern-tag symptom-tag" data-symptom="${s.toLowerCase()}">${s}</button>
                `).join('')}
            </div>

            <div class="mt-lg" style="display: flex; justify-content: center; z-index: 1; position: relative; margin-top: var(--space-xl);">
                <button class="btn btn-primary btn-lg symptom-pulse-btn" id="analyzeBtn" disabled style="padding: 12px 32px; border-radius: 50px; display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="activity"></i> Analyze Symptoms
                </button>
            </div>
        </div>
        `;
    }

    function renderFollowUpStep() {
        const symptom = _currentSymptom;
        if (!symptom) return '';

        const currentQ = symptom.followUp.find(q => !_answers[q.id]);
        const answeredCount = Object.keys(_answers).length;
        const totalQ = symptom.followUp.length;

        if (!currentQ) {
            // All questions answered — generate result
            setTimeout(() => generateResult(), 100);
            return `
            <div class="glass-card-static animate-in">
                <div class="loading-overlay">
                    <div class="spinner spinner-lg"></div>
                    <p class="loading-text">Analyzing your symptoms...</p>
                </div>
            </div>
            `;
        }

        const progress = Math.round((answeredCount / totalQ) * 100);

        return `
        <div class="glass-card-static animate-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
                <button class="btn btn-outline btn-sm" id="backBtn" style="border-radius: 20px;">
                    <i data-lucide="arrow-left"></i> Back
                </button>
                <span class="badge badge-primary" style="background: rgba(0, 212, 170, 0.15); color: var(--primary); border: 1px solid rgba(0, 212, 170, 0.3);">Question ${answeredCount + 1} of ${totalQ}</span>
            </div>

            <div class="modern-progress-bar">
                <div class="modern-progress-fill" style="width: ${progress}%;"></div>
            </div>

            <h3 style="margin-bottom: var(--space-xl); font-size: var(--font-lg); text-align: center;">${currentQ.question}</h3>

            <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                ${currentQ.options.map(opt => `
                    <button class="symptom-option-card follow-up-option" data-question="${currentQ.id}" data-answer="${opt}">
                        <span>${opt}</span>
                        <i data-lucide="chevron-right"></i>
                    </button>
                `).join('')}
            </div>
        </div>
        `;
    }

    function renderResultStep() {
        if (!_aiResult) return '';

        const result = _aiResult;
        const urgencyColors = {
            mild: { class: 'urgency-mild', color: 'var(--success)', icon: 'shield-check', label: 'Mild' },
            moderate: { class: 'urgency-moderate', color: 'var(--warning)', icon: 'alert-circle', label: 'Moderate' },
            high: { class: 'urgency-high', color: 'var(--danger)', icon: 'alert-triangle', label: 'High' },
        };
        const urgency = urgencyColors[result.urgency] || urgencyColors.mild;

        return `
        <div class="animate-in">
            <!-- Urgency Header -->
            <div class="urgency-header-modern ${urgency.class}">
                <div style="position: relative; z-index: 1;">
                    <h3 style="font-size: var(--font-xl); margin-bottom: 4px;">Symptom Analysis Complete</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: var(--font-sm);">Based on your responses</p>
                </div>
                <div style="position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1);">
                    <i data-lucide="${urgency.icon}" style="color: ${urgency.color};"></i>
                    <span style="color: ${urgency.color}; font-weight: 600; font-size: var(--font-base);">${urgency.label} Urgency</span>
                </div>
            </div>

            <div class="masonry-result-grid">
                <!-- Possible Causes -->
                <div class="masonry-card">
                    <div class="masonry-card-title">
                        <div class="icon-blob blue"><i data-lucide="help-circle"></i></div>
                        Possible Causes
                    </div>
                    <ul class="result-list">
                        ${(result.possibleCauses || result.causes || []).map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>

                <!-- Advice -->
                <div class="masonry-card">
                    <div class="masonry-card-title">
                        <div class="icon-blob green"><i data-lucide="lightbulb"></i></div>
                        Advice
                    </div>
                    <div class="result-advice">${result.advice}</div>
                </div>

                <!-- Home Remedies -->
                ${(result.homeRemedies || []).length > 0 ? `
                <div class="masonry-card">
                    <div class="masonry-card-title">
                        <div class="icon-blob purple"><i data-lucide="home"></i></div>
                        Home Remedies
                    </div>
                    <ul class="result-list">
                        ${result.homeRemedies.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <!-- Common Medicines -->
                ${(result.commonMedicine || result.medicines || []).length > 0 ? `
                <div class="masonry-card">
                    <div class="masonry-card-title">
                        <div class="icon-blob orange"><i data-lucide="pill"></i></div>
                        Common Medicines
                    </div>
                    <ul class="result-list">
                        ${(result.commonMedicine || result.medicines).map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>

            <!-- See Doctor -->
            ${result.seeDoctor ? `
            <div class="medicine-warnings mb-lg" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.05);">
                <div class="medicine-warnings-title" style="color: var(--danger);">
                    <i data-lucide="alert-triangle" class="icon-sm"></i> Consult a Doctor
                </div>
                <p style="font-size: var(--font-sm); color: var(--text-primary); margin-top: 8px;">${result.doctorReason || 'Based on your symptoms, we recommend consulting a healthcare professional.'}</p>
            </div>
            ` : ''}

            <!-- Disclaimer -->
            <div class="glass-card-static" style="border-left: 3px solid var(--warning); background: rgba(245, 158, 11, 0.05);">
                <p style="font-size: var(--font-sm); color: var(--text-secondary); display: flex; gap: 12px; align-items: flex-start;">
                    <i data-lucide="info" style="color: var(--warning); flex-shrink: 0; margin-top: 2px;"></i>
                    <span><strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.</span>
                </p>
            </div>

            <!-- Actions -->
            <div class="mt-lg" style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
                <button class="btn btn-primary" id="newCheckBtn">
                    <i data-lucide="refresh-cw"></i> New Check
                </button>
                <a href="#medicine-search" class="btn btn-secondary">
                    <i data-lucide="pill"></i> Search Medicine
                </a>
                <a href="#dashboard" class="btn btn-outline">
                    <i data-lucide="layout-dashboard"></i> Dashboard
                </a>
            </div>
        </div>
        `;
    }

    function determineUrgency() {
        const answers = Object.values(_answers);
        const joinedAnswers = answers.join(' ').toLowerCase();

        // High urgency keywords
        if (joinedAnswers.includes('severe') || joinedAnswers.includes('blood') ||
            joinedAnswers.includes('more than a week') || joinedAnswers.includes('above 102') ||
            joinedAnswers.includes('very severe') || joinedAnswers.includes('can barely') ||
            joinedAnswers.includes('turning blue')) {
            return 'high';
        }

        // Moderate urgency keywords
        if (joinedAnswers.includes('moderate') || joinedAnswers.includes('more than 3 days') ||
            joinedAnswers.includes('several days') || joinedAnswers.includes('disturbing') ||
            joinedAnswers.includes('2-3 days') || joinedAnswers.includes('100-102')) {
            return 'moderate';
        }

        return 'mild';
    }

    async function generateResult() {
        const urgency = determineUrgency();
        const container = document.getElementById('symptomStepContainer');

        // Try AI first
        if (AIService.isOnline()) {
            const symptomText = document.getElementById('symptomInput')?.value || _currentSymptom?.name || '';
            const aiResult = await AIService.analyzeSymptoms(symptomText, _answers);
            if (aiResult) {
                _aiResult = aiResult;
                saveToHistory(aiResult);
                _currentStep = 'result';
                container.innerHTML = renderResultStep();
                bindResultEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
                return;
            }
        }

        // Fallback to rule-based
        const symptom = _currentSymptom;
        if (symptom && symptom.results && symptom.results[urgency]) {
            const ruleResult = symptom.results[urgency];
            _aiResult = {
                possibleCauses: ruleResult.causes,
                urgency: urgency,
                advice: ruleResult.advice,
                homeRemedies: ruleResult.homeRemedies,
                commonMedicine: ruleResult.medicines,
                seeDoctor: ruleResult.seeDoctor || false,
                doctorReason: ruleResult.doctorReason || '',
            };
        } else {
            _aiResult = {
                possibleCauses: ['Could not determine specific cause'],
                urgency: urgency,
                advice: 'Please monitor your symptoms. If they worsen or persist, consult a healthcare professional.',
                homeRemedies: ['Rest and stay hydrated', 'Monitor symptoms'],
                commonMedicine: ['Paracetamol for pain/fever if needed'],
                seeDoctor: urgency !== 'mild',
                doctorReason: 'Symptoms need professional evaluation',
            };
        }

        saveToHistory(_aiResult);
        _currentStep = 'result';
        container.innerHTML = renderResultStep();
        bindResultEvents();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function saveToHistory(result) {
        Storage.addSymptomEntry({
            symptoms: _currentSymptom?.name || 'General Check',
            urgency: result.urgency,
            possibleCauses: result.possibleCauses || result.causes,
            answers: _answers,
        });
    }

    function findMatchingSymptom(text) {
        if (!_symptomsData) return null;
        const lower = text.toLowerCase();
        return _symptomsData.symptomSets.find(s =>
            s.keywords.some(k => lower.includes(k))
        );
    }

    function bindInputEvents() {
        const input = document.getElementById('symptomInput');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const suggestions = document.getElementById('symptomSuggestions');

        if (input) {
            input.addEventListener('input', () => {
                const val = input.value.trim();
                analyzeBtn.disabled = val.length < 2;

                // Show suggestions
                if (val.length >= 2 && _symptomsData) {
                    const matches = _symptomsData.symptomSets.filter(s =>
                        s.name.toLowerCase().includes(val.toLowerCase()) ||
                        s.keywords.some(k => k.includes(val.toLowerCase()))
                    );
                    if (matches.length > 0) {
                        suggestions.innerHTML = matches.map(m => `
                            <div class="search-suggestion-item" data-symptom-id="${m.id}">${m.name}</div>
                        `).join('');
                        suggestions.classList.add('active');
                    } else {
                        suggestions.classList.remove('active');
                    }
                } else {
                    suggestions.classList.remove('active');
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !analyzeBtn.disabled) {
                    analyzeBtn.click();
                }
            });
        }

        if (suggestions) {
            suggestions.addEventListener('click', (e) => {
                const item = e.target.closest('.search-suggestion-item');
                if (item) {
                    const id = item.getAttribute('data-symptom-id');
                    const symptom = _symptomsData.symptomSets.find(s => s.id === id);
                    if (symptom) {
                        input.value = symptom.name;
                        _currentSymptom = symptom;
                        analyzeBtn.disabled = false;
                        suggestions.classList.remove('active');
                    }
                }
            });
        }

        // Symptom tags
        document.querySelectorAll('.symptom-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const name = tag.getAttribute('data-symptom');
                const match = findMatchingSymptom(name);
                if (match) {
                    input.value = match.name;
                    _currentSymptom = match;
                    analyzeBtn.disabled = false;
                }
                document.querySelectorAll('.symptom-tag').forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                const val = input.value.trim();
                if (!_currentSymptom) {
                    _currentSymptom = findMatchingSymptom(val);
                }

                if (_currentSymptom && _currentSymptom.followUp) {
                    _currentStep = 'followUp';
                    const container = document.getElementById('symptomStepContainer');
                    container.innerHTML = renderFollowUpStep();
                    bindFollowUpEvents();
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                } else {
                    // No matching — go directly to AI analysis or generic
                    _currentSymptom = _currentSymptom || { name: val, followUp: [], results: {} };
                    generateResult();
                }
            });
        }

        // Click outside suggestions to close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                suggestions?.classList.remove('active');
            }
        });
    }

    function bindFollowUpEvents() {
        document.querySelectorAll('.follow-up-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const qId = btn.getAttribute('data-question');
                const answer = btn.getAttribute('data-answer');
                _answers[qId] = answer;

                const container = document.getElementById('symptomStepContainer');
                container.innerHTML = renderFollowUpStep();
                bindFollowUpEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        });

        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const keys = Object.keys(_answers);
                if (keys.length > 0) {
                    delete _answers[keys[keys.length - 1]];
                    const container = document.getElementById('symptomStepContainer');
                    container.innerHTML = renderFollowUpStep();
                    bindFollowUpEvents();
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                } else {
                    _currentStep = 'input';
                    const container = document.getElementById('symptomStepContainer');
                    container.innerHTML = renderInputStep();
                    bindInputEvents();
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            });
        }
    }

    function bindResultEvents() {
        const newCheckBtn = document.getElementById('newCheckBtn');
        if (newCheckBtn) {
            newCheckBtn.addEventListener('click', () => {
                _currentStep = 'input';
                _currentSymptom = null;
                _answers = {};
                _aiResult = null;
                const container = document.getElementById('symptomStepContainer');
                container.innerHTML = renderInputStep();
                bindInputEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }

    async function afterRender() {
        await loadData();
        bindInputEvents();
    }

    return { render, afterRender };
})();

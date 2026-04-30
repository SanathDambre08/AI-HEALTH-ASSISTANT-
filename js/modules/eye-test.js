/**
 * MediPulse Eye Test Module
 */
const EyeTestModule = (() => {
    let _currentEye = 'right';
    let _currentLevel = 0;
    let _score = { right: 0, left: 0 };
    let _testActive = false;
    let _totalLevels = 8;
    let _currentLetters = '';
    let _results = { right: null, left: null };

    const LETTER_SETS = [
        { size: 72, letters: 'E', distance: '20/200' },
        { size: 60, letters: 'FP', distance: '20/100' },
        { size: 48, letters: 'TOZ', distance: '20/70' },
        { size: 36, letters: 'LPED', distance: '20/50' },
        { size: 28, letters: 'PECFD', distance: '20/40' },
        { size: 22, letters: 'EDFCZP', distance: '20/30' },
        { size: 16, letters: 'FELOPZD', distance: '20/25' },
        { size: 12, letters: 'DEFPOTEC', distance: '20/20' },
    ];

    function render() {
        _currentEye = 'right';
        _currentLevel = 0;
        _score = { right: 0, left: 0 };
        _testActive = false;
        _results = { right: null, left: null };

        const pastResults = Storage.getEyeTestResults().slice(0, 5);

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon mint"><i data-lucide="eye"></i></span>
                Eye Test
            </h1>
            <p class="page-description">Basic vision screening. Cover one eye and read the letters. This is not a medical diagnosis.</p>
        </div>

        <div id="eyeTestContent">
            ${renderStartScreen(pastResults)}
        </div>
        `;
    }

    function renderStartScreen(pastResults) {
        return `
        <div class="glass-card-static mb-lg animate-in">
            <h3 style="margin-bottom: var(--space-md);">📋 Instructions</h3>
            <ol style="font-size: var(--font-sm); color: var(--text-secondary); list-style: decimal; padding-left: var(--space-lg); display: flex; flex-direction: column; gap: var(--space-sm);">
                <li>Sit <strong>~40cm (arm's length)</strong> from your screen</li>
                <li>You'll test <strong>Right Eye first</strong>, then Left Eye</li>
                <li>Cover the <strong>other eye</strong> completely with your hand</li>
                <li>Read the letters shown and type them</li>
                <li>Letters get smaller at each level</li>
                <li>If you can't read the letters, type your best guess or click "Can't Read"</li>
            </ol>

            <div style="margin-top: var(--space-xl); text-align: center;">
                <button class="btn btn-primary btn-lg" id="startEyeTest">
                    <i data-lucide="eye"></i> Start Eye Test
                </button>
            </div>
        </div>

        <!-- Eye Exercises -->
        <div class="glass-card-static mb-lg">
            <h3 style="margin-bottom: var(--space-md);">👁️ Eye Care Tips & Exercises</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md);">
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">20-20-20 Rule</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Every 20 minutes, look at something 20 feet away for 20 seconds.</p>
                </div>
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">Palming</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Rub palms together, place warm palms over closed eyes for 30 seconds. Repeat 3x.</p>
                </div>
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">Focus Shifting</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Hold your finger close, focus on it, then shift focus to a distant object. Repeat 10x.</p>
                </div>
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">Blinking Exercise</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Blink rapidly 20 times, then close eyes for 20 seconds. Helps lubricate eyes.</p>
                </div>
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">Eye Cleaning</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Splash clean cold water on eyes 2-3 times daily. Use preservative-free eye drops if dry.</p>
                </div>
                <div style="padding: var(--space-md); background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <h4 style="font-size: var(--font-sm); color: var(--primary); margin-bottom: var(--space-sm);">Screen Settings</h4>
                    <p style="font-size: var(--font-xs); color: var(--text-secondary);">Use night mode, keep brightness moderate, maintain arm's-length screen distance.</p>
                </div>
            </div>
        </div>

        ${pastResults && pastResults.length > 0 ? `
        <div class="glass-card-static">
            <h3 style="margin-bottom: var(--space-md);">📊 Past Results</h3>
            <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                ${pastResults.map(r => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-sm) var(--space-md); background: var(--bg-glass); border-radius: var(--radius-sm);">
                        <span style="font-size: var(--font-sm); color: var(--text-secondary);">${new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <div style="display: flex; gap: var(--space-lg);">
                            <span style="font-size: var(--font-sm);">Right: <strong style="color: ${getScoreColor(r.rightScore)}">${r.rightScore || 0}/${_totalLevels}</strong></span>
                            <span style="font-size: var(--font-sm);">Left: <strong style="color: ${getScoreColor(r.leftScore)}">${r.leftScore || 0}/${_totalLevels}</strong></span>
                            <span class="badge badge-${getEfficiencyBadge(r.efficiency)}">${r.efficiency || 0}% efficiency</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        `;
    }

    function getScoreColor(score) {
        if (score >= 7) return 'var(--success)';
        if (score >= 5) return 'var(--warning)';
        return 'var(--danger)';
    }

    function getEfficiencyBadge(eff) {
        if (eff >= 80) return 'success';
        if (eff >= 50) return 'warning';
        return 'danger';
    }

    function renderTestScreen() {
        const level = LETTER_SETS[_currentLevel];
        _currentLetters = level.letters;

        return `
        <div class="glass-card-static animate-in">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-lg);">
                <div class="eye-selector">
                    <div class="eye-selector-btn ${_currentEye === 'right' ? 'active' : ''}" style="pointer-events: none;">
                        👁️ Right Eye
                    </div>
                    <div class="eye-selector-btn ${_currentEye === 'left' ? 'active' : ''}" style="pointer-events: none;">
                        👁️ Left Eye
                    </div>
                </div>
                <div>
                    <span class="badge badge-primary">Level ${_currentLevel + 1} / ${_totalLevels}</span>
                    <span class="badge badge-info" style="margin-left: 4px;">${level.distance}</span>
                </div>
            </div>

            <p style="font-size: var(--font-sm); color: var(--text-muted); text-align: center; margin-bottom: var(--space-md);">
                Cover your <strong>${_currentEye === 'right' ? 'LEFT' : 'RIGHT'}</strong> eye. Read the letters below:
            </p>

            <div class="eye-test-area">
                <div class="eye-test-letter" style="font-size: ${level.size}px;">${level.letters}</div>

                <div style="width: 100%; max-width: 400px;">
                    <input type="text" id="eyeTestAnswer" class="input" placeholder="Type the letters you see..." 
                        style="text-align: center; font-size: var(--font-lg); text-transform: uppercase; letter-spacing: 4px;" 
                        autocomplete="off" autocapitalize="characters">
                </div>

                <div class="eye-test-controls mt-lg">
                    <button class="btn btn-primary" id="submitAnswer">
                        <i data-lucide="check"></i> Submit
                    </button>
                    <button class="btn btn-outline" id="cantRead">
                        <i data-lucide="eye-off"></i> Can't Read
                    </button>
                </div>
            </div>

            <!-- Progress bar -->
            <div style="background: var(--bg-tertiary); height: 4px; border-radius: 2px; margin-top: var(--space-xl);">
                <div style="background: var(--primary); height: 100%; width: ${(_currentLevel / _totalLevels) * 100}%; border-radius: 2px; transition: width 0.3s ease;"></div>
            </div>
        </div>
        `;
    }

    function renderResultScreen() {
        const totalCorrect = _score.right + _score.left;
        const totalPossible = _totalLevels * 2;
        const efficiency = Math.round((totalCorrect / totalPossible) * 100);

        // Determine vision quality
        let visionText, visionColor, suggestion;
        if (efficiency >= 90) {
            visionText = 'Excellent Vision';
            visionColor = 'var(--success)';
            suggestion = 'Your vision appears to be great! Keep up with regular eye exercises and the 20-20-20 rule.';
        } else if (efficiency >= 70) {
            visionText = 'Good Vision';
            visionColor = 'var(--primary)';
            suggestion = 'Your vision is fairly good. Consider reducing screen time and doing daily eye exercises.';
        } else if (efficiency >= 50) {
            visionText = 'Fair Vision';
            visionColor = 'var(--warning)';
            suggestion = 'Consider scheduling an eye checkup. You may benefit from corrective lenses or updated prescription.';
        } else {
            visionText = 'Needs Attention';
            visionColor = 'var(--danger)';
            suggestion = 'We strongly recommend visiting an eye specialist for a comprehensive eye exam as soon as possible.';
        }

        // Save result
        Storage.addEyeTestResult({
            rightScore: _score.right,
            leftScore: _score.left,
            efficiency: efficiency,
            rightVision: LETTER_SETS[Math.min(_score.right, _totalLevels - 1)]?.distance || '20/200',
            leftVision: LETTER_SETS[Math.min(_score.left, _totalLevels - 1)]?.distance || '20/200',
        });

        return `
        <div class="animate-in">
            <div class="result-card mb-lg">
                <div class="result-header" style="background: ${efficiency >= 70 ? 'var(--success-glow)' : efficiency >= 50 ? 'var(--warning-glow)' : 'var(--danger-glow)'};">
                    <div>
                        <h3 style="font-size: var(--font-xl);">Eye Test Results</h3>
                        <p class="text-muted mt-sm" style="font-size: var(--font-sm);">Basic vision screening</p>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: var(--font-3xl); font-weight: 800; color: ${visionColor};">${efficiency}%</div>
                        <div style="font-size: var(--font-sm); color: var(--text-secondary);">Eye Efficiency</div>
                    </div>
                </div>

                <div class="result-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-lg);">
                        <div style="text-align: center; padding: var(--space-lg); background: var(--bg-glass); border-radius: var(--radius-md);">
                            <div style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: var(--space-sm);">👁️ Right Eye</div>
                            <div style="font-size: var(--font-2xl); font-weight: 800; color: ${getScoreColor(_score.right)};">${_score.right}/${_totalLevels}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: var(--space-xs);">
                                ${LETTER_SETS[Math.min(_score.right, _totalLevels - 1)]?.distance || '20/200'}
                            </div>
                        </div>
                        <div style="text-align: center; padding: var(--space-lg); background: var(--bg-glass); border-radius: var(--radius-md);">
                            <div style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: var(--space-sm);">👁️ Left Eye</div>
                            <div style="font-size: var(--font-2xl); font-weight: 800; color: ${getScoreColor(_score.left)};">${_score.left}/${_totalLevels}</div>
                            <div style="font-size: var(--font-xs); color: var(--text-secondary); margin-top: var(--space-xs);">
                                ${LETTER_SETS[Math.min(_score.left, _totalLevels - 1)]?.distance || '20/200'}
                            </div>
                        </div>
                    </div>

                    <div class="result-section">
                        <h4 class="result-section-title" style="color: ${visionColor};">
                            <i data-lucide="${efficiency >= 70 ? 'check-circle' : 'alert-circle'}" class="icon-sm"></i>
                            ${visionText}
                        </h4>
                        <div class="result-advice">${suggestion}</div>
                    </div>

                    <div class="result-section">
                        <h4 class="result-section-title"><i data-lucide="lightbulb" class="icon-sm"></i> Recommendations</h4>
                        <ul class="result-list">
                            <li>Follow the 20-20-20 rule when using screens</li>
                            <li>Use preservative-free lubricating eye drops for dry eyes</li>
                            <li>Do eye exercises daily (palming, focus shifting, blinking)</li>
                            <li>Maintain good lighting while reading</li>
                            ${efficiency < 70 ? '<li><strong>Schedule an eye checkup with an ophthalmologist</strong></li>' : ''}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="glass-card-static mb-lg" style="border-left: 3px solid var(--warning);">
                <p style="font-size: var(--font-sm); color: var(--text-secondary);">
                    ⚠️ <strong>Disclaimer:</strong> This is a basic screening tool and NOT a medical eye exam. It cannot detect conditions like glaucoma, cataracts, or retinal issues. Please visit an eye specialist for a comprehensive examination.
                </p>
            </div>

            <div class="btn-group">
                <button class="btn btn-primary" id="retakeTest"><i data-lucide="refresh-cw"></i> Retake Test</button>
                <a href="#dashboard" class="btn btn-outline"><i data-lucide="layout-dashboard"></i> Dashboard</a>
            </div>
        </div>
        `;
    }

    function checkAnswer(userAnswer) {
        const correct = _currentLetters.toUpperCase();
        const answer = userAnswer.toUpperCase().replace(/\s/g, '');

        // Count correct characters
        let correctCount = 0;
        for (let i = 0; i < Math.min(answer.length, correct.length); i++) {
            if (answer[i] === correct[i]) correctCount++;
        }

        // Consider correct if > 70% of characters match
        return correctCount >= Math.ceil(correct.length * 0.7);
    }

    function nextLevel(isCorrect) {
        if (isCorrect) {
            _score[_currentEye]++;
        }

        _currentLevel++;

        if (_currentLevel >= _totalLevels) {
            if (_currentEye === 'right') {
                // Switch to left eye
                _currentEye = 'left';
                _currentLevel = 0;
                const container = document.getElementById('eyeTestContent');
                container.innerHTML = `
                <div class="glass-card-static animate-in" style="text-align: center; padding: var(--space-2xl);">
                    <h2 style="margin-bottom: var(--space-md);">Right Eye Complete! ✅</h2>
                    <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-lg);">
                        Score: <strong style="color: ${getScoreColor(_score.right)};">${_score.right}/${_totalLevels}</strong><br>
                        Now let's test your <strong>Left Eye</strong>.
                    </p>
                    <p style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: var(--space-xl);">
                        Cover your <strong>RIGHT</strong> eye with your hand.
                    </p>
                    <button class="btn btn-primary btn-lg" id="startLeftEye">
                        <i data-lucide="arrow-right"></i> Test Left Eye
                    </button>
                </div>
                `;
                document.getElementById('startLeftEye').addEventListener('click', () => {
                    const container = document.getElementById('eyeTestContent');
                    container.innerHTML = renderTestScreen();
                    bindTestEvents();
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else {
                // Both eyes done — show results
                const container = document.getElementById('eyeTestContent');
                container.innerHTML = renderResultScreen();
                bindResultEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        } else {
            const container = document.getElementById('eyeTestContent');
            container.innerHTML = renderTestScreen();
            bindTestEvents();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    function bindTestEvents() {
        const submitBtn = document.getElementById('submitAnswer');
        const cantReadBtn = document.getElementById('cantRead');
        const answerInput = document.getElementById('eyeTestAnswer');

        if (answerInput) {
            answerInput.focus();
            answerInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') submitBtn?.click();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const answer = answerInput?.value?.trim() || '';
                const isCorrect = checkAnswer(answer);
                nextLevel(isCorrect);
            });
        }

        if (cantReadBtn) {
            cantReadBtn.addEventListener('click', () => {
                nextLevel(false);
            });
        }
    }

    function bindResultEvents() {
        const retakeBtn = document.getElementById('retakeTest');
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => {
                _currentEye = 'right';
                _currentLevel = 0;
                _score = { right: 0, left: 0 };
                const container = document.getElementById('eyeTestContent');
                const pastResults = Storage.getEyeTestResults().slice(0, 5);
                container.innerHTML = renderStartScreen(pastResults);
                bindStartEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }

    function bindStartEvents() {
        const startBtn = document.getElementById('startEyeTest');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                _testActive = true;
                const container = document.getElementById('eyeTestContent');
                container.innerHTML = renderTestScreen();
                bindTestEvents();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }
    }

    function afterRender() {
        bindStartEvents();
    }

    return { render, afterRender };
})();

/**
 * MediPulse Mental Health Assistant Module
 */
const MentalHealthModule = (() => {
    let _chatHistory = [];
    let _breathingActive = false;
    let _breathingInterval = null;

    function render() {
        _chatHistory = [];

        return `
        <div class="page-header">
            <h1 class="page-title">
                <span class="page-title-icon stat-icon coral"><i data-lucide="brain"></i></span>
                Mental Health Support
            </h1>
            <p class="page-description">A safe space to express how you're feeling. Chat, breathe, and find calm.</p>
        </div>

        <div class="grid-2">
            <!-- Chat Section -->
            <div class="glass-card-static" style="padding: 0; overflow: hidden;">
                <div style="padding: var(--space-md) var(--space-lg); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: var(--space-sm);">
                    <div class="stat-icon coral" style="width: 32px; height: 32px;"><i data-lucide="heart" style="width: 16px; height: 16px;"></i></div>
                    <div>
                        <strong style="font-size: var(--font-sm);">MediPulse Companion</strong>
                        <div style="font-size: var(--font-xs); color: var(--text-muted);">Here to listen</div>
                    </div>
                </div>

                <div class="chat-container" style="height: 450px;">
                    <div class="chat-messages" id="chatMessages">
                        <div class="chat-bubble assistant">
                            Hi there 🌿 I'm your wellness companion. How are you feeling today? You can share anything — I'm here to listen.
                        </div>
                    </div>

                    <div class="chat-input-area">
                        <input type="text" id="chatInput" class="input" placeholder="How are you feeling today?..." autocomplete="off">
                        <button class="btn btn-primary btn-icon" id="sendChatBtn" aria-label="Send message">
                            <i data-lucide="send"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tools Section -->
            <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
                <!-- Breathing Exercise -->
                <div class="glass-card-static">
                    <h3 style="margin-bottom: var(--space-md); font-size: var(--font-base);">🫁 Breathing Exercise</h3>
                    <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">4-7-8 breathing technique to calm your nervous system.</p>

                    <div class="breathing-circle" id="breathingCircle">
                        <span class="breathing-text" id="breathingText">Start</span>
                    </div>

                    <div style="text-align: center;">
                        <button class="btn btn-primary btn-sm" id="startBreathing">
                            <i data-lucide="wind"></i> <span id="breathingBtnText">Start Exercise</span>
                        </button>
                    </div>
                </div>

                <!-- Quick Mood Check -->
                <div class="glass-card-static">
                    <h3 style="margin-bottom: var(--space-md); font-size: var(--font-base);">😊 Quick Mood Check</h3>
                    <p style="font-size: var(--font-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">How are you feeling right now?</p>
                    <div style="display: flex; flex-wrap: wrap; gap: var(--space-sm); justify-content: center;">
                        ${['😊 Happy', '😐 Neutral', '😔 Sad', '😰 Anxious', '😤 Angry', '😴 Tired', '🤗 Grateful', '💪 Motivated'].map(mood => `
                            <button class="tag mood-tag" data-mood="${mood}">${mood}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- Helpful Resources -->
                <div class="glass-card-static">
                    <h3 style="margin-bottom: var(--space-md); font-size: var(--font-base);">📞 Need Help?</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                        <div style="padding: var(--space-sm) var(--space-md); background: var(--danger-glow); border-radius: var(--radius-sm); border: 1px solid rgba(239, 83, 80, 0.2);">
                            <strong style="font-size: var(--font-sm); color: var(--danger);">🆘 Crisis Helpline (India)</strong>
                            <p style="font-size: var(--font-xs); color: var(--text-secondary);">iCall: 9152987821 | Vandrevala: 1860-2662-345</p>
                        </div>
                        <div style="padding: var(--space-sm) var(--space-md); background: var(--info-glow); border-radius: var(--radius-sm); border: 1px solid rgba(79, 195, 247, 0.2);">
                            <strong style="font-size: var(--font-sm); color: var(--info);">💙 NIMHANS Helpline</strong>
                            <p style="font-size: var(--font-xs); color: var(--text-secondary);">080-46110007 (24/7)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    async function sendMessage(text) {
        const messagesEl = document.getElementById('chatMessages');
        if (!messagesEl) return;

        // Add user bubble
        _chatHistory.push({ role: 'user', text });
        messagesEl.innerHTML += `<div class="chat-bubble user">${escapeHtml(text)}</div>`;
        messagesEl.scrollTop = messagesEl.scrollHeight;

        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        messagesEl.innerHTML += `<div class="chat-bubble assistant" id="${typingId}" style="opacity: 0.6;"><span class="loading-text">Thinking...</span></div>`;
        messagesEl.scrollTop = messagesEl.scrollHeight;

        // Get AI response
        let response;
        if (AIService.isOnline()) {
            response = await AIService.mentalHealthChat(text, _chatHistory);
        } else {
            response = AIService.getFallbackMentalHealthResponse(text);
        }

        // Replace typing indicator
        const typingEl = document.getElementById(typingId);
        if (typingEl) {
            typingEl.innerHTML = response;
            typingEl.style.opacity = '1';
        }

        _chatHistory.push({ role: 'assistant', text: response });

        // Save log
        Storage.addMentalHealthLog({ message: text, response: response });

        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function startBreathingExercise() {
        const circle = document.getElementById('breathingCircle');
        const text = document.getElementById('breathingText');
        const btnText = document.getElementById('breathingBtnText');

        if (_breathingActive) {
            // Stop
            _breathingActive = false;
            clearInterval(_breathingInterval);
            circle.className = 'breathing-circle';
            text.textContent = 'Start';
            btnText.textContent = 'Start Exercise';
            return;
        }

        _breathingActive = true;
        btnText.textContent = 'Stop';

        const phases = [
            { text: 'Breathe In', class: 'inhale', duration: 4000 },
            { text: 'Hold', class: 'inhale', duration: 7000 },
            { text: 'Breathe Out', class: 'exhale', duration: 8000 },
        ];

        let phaseIdx = 0;
        let countdown = 0;

        function runPhase() {
            if (!_breathingActive) return;

            const phase = phases[phaseIdx];
            const seconds = phase.duration / 1000;
            countdown = seconds;

            circle.className = `breathing-circle ${phase.class}`;
            text.textContent = `${phase.text}\n${countdown}`;

            const countInterval = setInterval(() => {
                countdown--;
                if (countdown > 0 && _breathingActive) {
                    text.textContent = `${phase.text}\n${countdown}`;
                } else {
                    clearInterval(countInterval);
                }
            }, 1000);

            _breathingInterval = setTimeout(() => {
                phaseIdx = (phaseIdx + 1) % phases.length;
                runPhase();
            }, phase.duration);
        }

        runPhase();
    }

    function afterRender() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendChatBtn');
        const startBtn = document.getElementById('startBreathing');

        if (chatInput && sendBtn) {
            const send = () => {
                const text = chatInput.value.trim();
                if (text) {
                    sendMessage(text);
                    chatInput.value = '';
                }
            };

            sendBtn.addEventListener('click', send);
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') send();
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', startBreathingExercise);
        }

        // Mood tags
        document.querySelectorAll('.mood-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const mood = tag.getAttribute('data-mood');
                document.querySelectorAll('.mood-tag').forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                Storage.addMentalHealthLog({ type: 'mood', mood: mood });
                App.showToast(`Mood logged: ${mood}`, 'success');

                // Auto-send to chat
                sendMessage(`I'm feeling ${mood.split(' ')[1] || mood}`);
            });
        });
    }

    function destroy() {
        _breathingActive = false;
        if (_breathingInterval) clearInterval(_breathingInterval);
    }

    return { render, afterRender, destroy };
})();

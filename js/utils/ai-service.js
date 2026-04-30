/**
 * MediPulse AI Service
 * Google Gemini API integration with rule-based fallback
 */
const AIService = (() => {
    const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const DEFAULT_KEY = 'AIzaSyCBYvuLexlMZnWAVevHeY8dDb1up9aj00U';
    let _apiKey = '';
    let _isOnline = false;

    function init() {
        _apiKey = Storage.getApiKey() || DEFAULT_KEY;
        if (!Storage.getApiKey()) Storage.setApiKey(DEFAULT_KEY);
        _isOnline = !!_apiKey;
        updateStatusUI();
    }

    function setApiKey(key) {
        _apiKey = key;
        Storage.setApiKey(key);
        _isOnline = !!key;
        updateStatusUI();
    }

    function isOnline() {
        return _isOnline;
    }

    function updateStatusUI() {
        const el = document.getElementById('apiStatus');
        if (!el) return;
        const dot = el.querySelector('.status-dot');
        const text = el.querySelector('span');
        if (_isOnline) {
            dot.className = 'status-dot online';
            text.textContent = 'AI: Online';
        } else {
            dot.className = 'status-dot offline';
            text.textContent = 'AI: Offline';
        }
    }

    async function _callGemini(prompt, systemInstruction) {
        if (!_apiKey) return null;

        try {
            const body = {
                contents: [{ parts: [{ text: prompt }] }],
            };
            if (systemInstruction) {
                body.systemInstruction = { parts: [{ text: systemInstruction }] };
            }

            const res = await fetch(`${GEMINI_URL}?key=${_apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                console.error('Gemini API error:', res.status);
                if (res.status === 401 || res.status === 403) {
                    _isOnline = false;
                    updateStatusUI();
                }
                return null;
            }

            const data = await res.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            return text || null;
        } catch (err) {
            console.error('Gemini API call failed:', err);
            return null;
        }
    }

    // ── Symptom Analysis ──
    async function analyzeSymptoms(symptoms, answers) {
        const sysPrompt = `You are a health guidance assistant. You do NOT diagnose. You provide general guidance only.
Always include a disclaimer that this is not medical advice.
Respond in JSON format with these fields:
{
  "possibleCauses": ["cause1", "cause2"],
  "urgency": "mild|moderate|high",
  "advice": "general advice text",
  "homeRemedies": ["remedy1", "remedy2"],
  "commonMedicine": ["medicine1 - purpose", "medicine2 - purpose"],
  "seeDoctor": true/false,
  "doctorReason": "reason to see doctor if applicable"
}`;

        const prompt = `Symptoms: ${symptoms}\nAdditional info: ${JSON.stringify(answers)}\n\nProvide health guidance in the JSON format specified.`;

        const result = await _callGemini(prompt, sysPrompt);
        if (result) {
            try {
                const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                return JSON.parse(cleaned);
            } catch {
                return null;
            }
        }
        return null;
    }

    // ── Medicine Info ──
    async function getMedicineInfo(medicineName) {
        const sysPrompt = `You are a pharmaceutical information assistant. Provide general medicine information only.
Always include warnings and a disclaimer that this is not medical advice.
Respond in JSON format:
{
  "name": "medicine name",
  "genericName": "generic name",
  "category": "category",
  "purpose": "what it treats",
  "dosage": "general dosage info",
  "sideEffects": ["effect1", "effect2"],
  "precautions": ["precaution1"],
  "alternatives": [{"name": "alt name", "note": "why it's an alternative"}],
  "warnings": ["warning1"],
  "foodInteractions": "take with/without food"
}`;

        const prompt = `Provide information about the medicine: ${medicineName}`;
        const result = await _callGemini(prompt, sysPrompt);
        if (result) {
            try {
                const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                return JSON.parse(cleaned);
            } catch {
                return null;
            }
        }
        return null;
    }

    // ── Mental Health Chat ──
    async function mentalHealthChat(message, history = []) {
        const sysPrompt = `You are a compassionate mental health support assistant. You are NOT a therapist.
You provide:
- Empathetic listening and validation
- Simple breathing exercises
- Calming suggestions
- Encouragement to seek professional help when needed

Keep responses warm, brief (2-3 sentences), and supportive. Never diagnose mental health conditions.
If someone expresses severe distress or self-harm, always recommend contacting a crisis helpline.`;

        const contextMessages = history.slice(-6).map(h => `${h.role}: ${h.text}`).join('\n');
        const prompt = `${contextMessages}\nUser: ${message}\n\nRespond supportively.`;

        const result = await _callGemini(prompt, sysPrompt);
        return result || getFallbackMentalHealthResponse(message);
    }

    // ── Health Knowledge ──
    async function explainHealthTopic(topic) {
        const sysPrompt = `You are a health educator. Explain medical topics in simple, easy-to-understand language.
Use short paragraphs. Include:
- What it is
- Common causes
- Symptoms
- Prevention tips
Keep it under 200 words. This is for general education, not diagnosis.`;

        const prompt = `Explain in simple terms: ${topic}`;
        const result = await _callGemini(prompt, sysPrompt);
        return result || null;
    }

    // ── Fallback Responses ──
    function getFallbackMentalHealthResponse(message) {
        const lower = message.toLowerCase();
        const responses = {
            sad: "I hear you, and it's okay to feel this way. Sadness is a natural emotion. Try taking a few deep breaths — inhale for 4 seconds, hold for 4, exhale for 4. Would you like to try a breathing exercise?",
            anxious: "Feeling anxious can be overwhelming. Let's try grounding: name 5 things you can see, 4 you can touch, 3 you can hear. You're safe right now. 💙",
            stressed: "Stress can feel heavy. Take a moment — place your hand on your chest, breathe slowly. You're doing your best, and that's enough. Would you like some relaxation tips?",
            lonely: "Loneliness is tough, but reaching out like this shows strength. You matter, and your feelings are valid. Consider connecting with someone you trust today. 🤗",
            angry: "It's okay to feel angry. Try this: clench your fists tight for 5 seconds, then release. Feel the tension leave. Anger is a signal — what might it be telling you?",
            happy: "That's wonderful to hear! 🌟 Savoring positive moments is great for mental health. What made today good for you?",
            tired: "Feeling exhausted is your body asking for rest. Are you getting enough sleep? Even a 10-minute break with closed eyes can help. Please be kind to yourself. 💤",
        };

        for (const [keyword, response] of Object.entries(responses)) {
            if (lower.includes(keyword)) return response;
        }

        return "Thank you for sharing. I'm here to listen. Remember, it's okay to feel what you're feeling. If you'd like, try a simple breathing exercise: breathe in for 4 counts, hold for 4, and breathe out for 6. 🌿";
    }

    return {
        init,
        isOnline,
        analyzeSymptoms,
        getMedicineInfo,
        mentalHealthChat,
        explainHealthTopic,
        getFallbackMentalHealthResponse,
    };
})();

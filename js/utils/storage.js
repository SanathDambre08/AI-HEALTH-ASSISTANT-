/**
 * MediPulse Storage Utility
 * localStorage wrapper with schemas for health data
 */
const Storage = (() => {
    const KEYS = {
        USER: 'medipulse_user',
        SYMPTOMS_HISTORY: 'medipulse_symptoms_history',
        MEDICINE_SCHEDULE: 'medipulse_medicine_schedule',
        MEDICINE_LOGS: 'medipulse_medicine_logs',
        API_KEY: 'medipulse_api_key',
        SETTINGS: 'medipulse_settings',
        MENTAL_HEALTH_LOGS: 'medipulse_mental_health_logs',
        EYE_TEST_RESULTS: 'medipulse_eye_test_results',
        DISCLAIMER_DISMISSED: 'medipulse_disclaimer_dismissed',
        EMERGENCY_CONTACTS: 'medipulse_emergency_contacts',
    };

    function _get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`Storage read error for ${key}:`, e);
            return null;
        }
    }

    function _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Storage write error for ${key}:`, e);
            return false;
        }
    }

    function _remove(key) {
        localStorage.removeItem(key);
    }

    // ── User ──
    function getUser() {
        return _get(KEYS.USER) || { name: '', age: '', gender: '' };
    }
    function saveUser(user) {
        const existing = _get(KEYS.USER) || { name: '', email: '', age: '', gender: '' };
        return _set(KEYS.USER, { ...existing, ...user });
    }

    // ── Symptom History ──
    function getSymptomsHistory() {
        return _get(KEYS.SYMPTOMS_HISTORY) || [];
    }
    function addSymptomEntry(entry) {
        const history = getSymptomsHistory();
        history.unshift({
            id: Date.now(),
            date: new Date().toISOString(),
            ...entry,
        });
        // Keep last 100 entries
        if (history.length > 100) history.length = 100;
        return _set(KEYS.SYMPTOMS_HISTORY, history);
    }

    // ── Medicine Schedule ──
    function getMedicineSchedule() {
        return _get(KEYS.MEDICINE_SCHEDULE) || [];
    }
    function addMedicineSchedule(med) {
        const schedule = getMedicineSchedule();
        schedule.push({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            active: true,
            ...med,
        });
        return _set(KEYS.MEDICINE_SCHEDULE, schedule);
    }
    function updateMedicineSchedule(id, updates) {
        const schedule = getMedicineSchedule();
        const idx = schedule.findIndex(m => m.id === id);
        if (idx !== -1) {
            schedule[idx] = { ...schedule[idx], ...updates };
            return _set(KEYS.MEDICINE_SCHEDULE, schedule);
        }
        return false;
    }
    function removeMedicineSchedule(id) {
        const schedule = getMedicineSchedule().filter(m => m.id !== id);
        return _set(KEYS.MEDICINE_SCHEDULE, schedule);
    }

    // ── Medicine Logs ──
    function getMedicineLogs() {
        return _get(KEYS.MEDICINE_LOGS) || [];
    }
    function addMedicineLog(log) {
        const logs = getMedicineLogs();
        logs.push({
            id: Date.now(),
            datetime: new Date().toISOString(),
            ...log,
        });
        return _set(KEYS.MEDICINE_LOGS, logs);
    }
    function getLogsForDate(dateStr) {
        const logs = getMedicineLogs();
        return logs.filter(l => l.datetime.startsWith(dateStr));
    }
    function getAdherenceStats(days = 7) {
        const logs = getMedicineLogs();
        const schedule = getMedicineSchedule().filter(m => m.active);
        const now = new Date();
        const stats = { taken: 0, missed: 0, total: 0, byDay: [] };

        for (let i = 0; i < days; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayLogs = logs.filter(l => l.datetime.startsWith(dateStr));
            const taken = dayLogs.filter(l => l.status === 'taken').length;
            const missed = dayLogs.filter(l => l.status === 'missed').length;
            const total = taken + missed;

            stats.taken += taken;
            stats.missed += missed;
            stats.total += total;
            stats.byDay.unshift({
                date: dateStr,
                label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                taken,
                missed,
                total,
            });
        }

        stats.rate = stats.total > 0 ? Math.round((stats.taken / stats.total) * 100) : 100;
        return stats;
    }
    function getStreak() {
        const logs = getMedicineLogs();
        const schedule = getMedicineSchedule().filter(m => m.active);
        if (schedule.length === 0) return 0;

        let streak = 0;
        const now = new Date();

        for (let i = 0; i < 365; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayLogs = logs.filter(l => l.datetime.startsWith(dateStr));
            const missed = dayLogs.filter(l => l.status === 'missed').length;

            if (dayLogs.length === 0 && i === 0) continue; // today may not have entries yet
            if (dayLogs.length === 0 || missed > 0) break;
            streak++;
        }
        return streak;
    }

    // ── Mental Health Logs ──
    function getMentalHealthLogs() {
        return _get(KEYS.MENTAL_HEALTH_LOGS) || [];
    }
    function addMentalHealthLog(entry) {
        const logs = getMentalHealthLogs();
        logs.push({
            id: Date.now(),
            datetime: new Date().toISOString(),
            ...entry,
        });
        if (logs.length > 200) logs.splice(0, logs.length - 200);
        return _set(KEYS.MENTAL_HEALTH_LOGS, logs);
    }

    // ── Eye Test Results ──
    function getEyeTestResults() {
        return _get(KEYS.EYE_TEST_RESULTS) || [];
    }
    function addEyeTestResult(result) {
        const results = getEyeTestResults();
        results.push({
            id: Date.now(),
            date: new Date().toISOString(),
            ...result,
        });
        return _set(KEYS.EYE_TEST_RESULTS, results);
    }

    // ── API Key ──
    function getApiKey() {
        return _get(KEYS.API_KEY) || '';
    }
    function setApiKey(key) {
        return _set(KEYS.API_KEY, key);
    }

    // ── Settings ──
    function getSettings() {
        return _get(KEYS.SETTINGS) || { notifications: true };
    }
    function saveSettings(settings) {
        return _set(KEYS.SETTINGS, settings);
    }

    // ── Disclaimer ──
    function isDisclaimerDismissed() {
        return _get(KEYS.DISCLAIMER_DISMISSED) === true;
    }
    function dismissDisclaimer() {
        return _set(KEYS.DISCLAIMER_DISMISSED, true);
    }

    // ── Emergency Contacts ──
    function getEmergencyContacts() {
        return _get(KEYS.EMERGENCY_CONTACTS) || {};
    }
    function saveEmergencyContacts(contacts) {
        return _set(KEYS.EMERGENCY_CONTACTS, contacts);
    }

    // ── Export/Clear ──
    function exportAll() {
        const data = {};
        Object.entries(KEYS).forEach(([name, key]) => {
            if (name !== 'API_KEY') data[name] = _get(key); // Don't export API key
        });
        return data;
    }
    function clearAll() {
        const apiKey = _get(KEYS.API_KEY); // Preserve API key
        Object.values(KEYS).forEach(key => _remove(key));
        if (apiKey) _set(KEYS.API_KEY, apiKey); // Restore API key
    }

    return {
        getUser, saveUser,
        getSymptomsHistory, addSymptomEntry,
        getMedicineSchedule, addMedicineSchedule, updateMedicineSchedule, removeMedicineSchedule,
        getMedicineLogs, addMedicineLog, getLogsForDate, getAdherenceStats, getStreak,
        getMentalHealthLogs, addMentalHealthLog,
        getEyeTestResults, addEyeTestResult,
        getApiKey, setApiKey,
        getSettings, saveSettings,
        isDisclaimerDismissed, dismissDisclaimer,
        getEmergencyContacts, saveEmergencyContacts,
        exportAll, clearAll,
    };
})();

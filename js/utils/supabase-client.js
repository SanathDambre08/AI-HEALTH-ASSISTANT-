/**
 * MediPulse — Supabase Client
 * Authentication + Cloud Database wrapper
 */
const SupabaseClient = (() => {
    const SUPABASE_URL = 'https://wwbidirqjnbgxlffwhot.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YmlkaXJxam5iZ3hsZmZ3aG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDQ5MDksImV4cCI6MjA5Mjk4MDkwOX0.NBcQKzSlZb1SgZ3YZtj4Ac8SDcBaCNYlu-sXF1s8mS8';

    let _supabase = null;
    let _user = null;
    let _authListeners = [];

    function init() {
        if (typeof supabase === 'undefined' || !supabase.createClient) {
            console.warn('Supabase JS not loaded — running in offline mode');
            return;
        }
        _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        // Listen for auth changes
        _supabase.auth.onAuthStateChange((event, session) => {
            _user = session?.user || null;
            _authListeners.forEach(fn => fn(event, _user));
        });
    }

    function isAvailable() {
        return !!_supabase;
    }

    function getUser() {
        return _user;
    }

    function onAuthChange(callback) {
        _authListeners.push(callback);
    }

    // ── Auth Methods ──
    async function signUp(email, password, name) {
        if (!_supabase) return { error: { message: 'Supabase not available' } };
        const { data, error } = await _supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (!error && data.user) {
            _user = data.user;
            // Update profile with name
            await _supabase.from('profiles').upsert({ id: data.user.id, name, updated_at: new Date().toISOString() });
        }
        return { data, error };
    }

    async function signIn(email, password) {
        if (!_supabase) return { error: { message: 'Supabase not available' } };
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
            _user = data.user;
        }
        return { data, error };
    }

    async function signOut() {
        if (!_supabase) return;
        await _supabase.auth.signOut();
        _user = null;
    }

    async function getSession() {
        if (!_supabase) return null;
        const { data } = await _supabase.auth.getSession();
        _user = data.session?.user || null;
        return data.session;
    }

    // ── Profile ──
    async function getProfile() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('profiles')
            .select('*')
            .eq('id', _user.id)
            .single();
        return error ? null : data;
    }

    async function saveProfile(profile) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('profiles')
            .upsert({ id: _user.id, ...profile, updated_at: new Date().toISOString() });
        return !error;
    }

    // ── Emergency Contacts ──
    async function getEmergencyContacts() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('emergency_contacts')
            .select('*')
            .eq('user_id', _user.id)
            .single();
        return error ? null : data;
    }

    async function saveEmergencyContacts(contacts) {
        if (!_supabase || !_user) return false;
        // Check if exists
        const { data: existing } = await _supabase
            .from('emergency_contacts')
            .select('id')
            .eq('user_id', _user.id)
            .single();

        if (existing) {
            const { error } = await _supabase
                .from('emergency_contacts')
                .update({ ...contacts, updated_at: new Date().toISOString() })
                .eq('user_id', _user.id);
            return !error;
        } else {
            const { error } = await _supabase
                .from('emergency_contacts')
                .insert({ user_id: _user.id, ...contacts });
            return !error;
        }
    }

    // ── Symptoms History ──
    async function getSymptomsHistory() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('symptoms_history')
            .select('*')
            .eq('user_id', _user.id)
            .order('created_at', { ascending: false })
            .limit(100);
        return error ? null : data;
    }

    async function addSymptomEntry(entry) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('symptoms_history')
            .insert({ user_id: _user.id, ...entry });
        return !error;
    }

    // ── Medicine Schedule ──
    async function getMedicineSchedule() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('medicine_schedule')
            .select('*')
            .eq('user_id', _user.id)
            .order('created_at', { ascending: false });
        return error ? null : data;
    }

    async function addMedicineSchedule(med) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('medicine_schedule')
            .insert({ user_id: _user.id, ...med });
        return !error;
    }

    async function updateMedicineSchedule(id, updates) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('medicine_schedule')
            .update(updates)
            .eq('id', id)
            .eq('user_id', _user.id);
        return !error;
    }

    async function removeMedicineSchedule(id) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('medicine_schedule')
            .delete()
            .eq('id', id)
            .eq('user_id', _user.id);
        return !error;
    }

    // ── Medicine Logs ──
    async function getMedicineLogs() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('medicine_logs')
            .select('*')
            .eq('user_id', _user.id)
            .order('datetime', { ascending: false });
        return error ? null : data;
    }

    async function addMedicineLog(log) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('medicine_logs')
            .insert({ user_id: _user.id, ...log });
        return !error;
    }

    // ── Mental Health Logs ──
    async function getMentalHealthLogs() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('mental_health_logs')
            .select('*')
            .eq('user_id', _user.id)
            .order('datetime', { ascending: false })
            .limit(200);
        return error ? null : data;
    }

    async function addMentalHealthLog(entry) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('mental_health_logs')
            .insert({ user_id: _user.id, ...entry });
        return !error;
    }

    // ── Eye Test Results ──
    async function getEyeTestResults() {
        if (!_supabase || !_user) return null;
        const { data, error } = await _supabase
            .from('eye_test_results')
            .select('*')
            .eq('user_id', _user.id)
            .order('created_at', { ascending: false });
        return error ? null : data;
    }

    async function addEyeTestResult(result) {
        if (!_supabase || !_user) return false;
        const { error } = await _supabase
            .from('eye_test_results')
            .insert({ user_id: _user.id, ...result });
        return !error;
    }

    return {
        init,
        isAvailable,
        getUser,
        onAuthChange,
        signUp,
        signIn,
        signOut,
        getSession,
        getProfile,
        saveProfile,
        getEmergencyContacts,
        saveEmergencyContacts,
        getSymptomsHistory,
        addSymptomEntry,
        getMedicineSchedule,
        addMedicineSchedule,
        updateMedicineSchedule,
        removeMedicineSchedule,
        getMedicineLogs,
        addMedicineLog,
        getMentalHealthLogs,
        addMentalHealthLog,
        getEyeTestResults,
        addEyeTestResult,
    };
})();

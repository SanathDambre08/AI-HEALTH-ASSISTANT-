/**
 * MediPulse — Main Application
 * SPA Router, Auth, State Management, and Global Event Handling
 */
const App = (() => {
    const MODULES = {
        'dashboard': DashboardModule,
        'symptom-checker': SymptomCheckerModule,
        'medicine-search': MedicineSearchModule,
        'reminder-tracker': ReminderTrackerModule,
        'mental-health': MentalHealthModule,
        'eye-test': EyeTestModule,
        'health-knowledge': HealthKnowledgeModule,
        'pulse-sensor': PulseSensorModule,
    };

    let _currentModule = null;
    let _currentModuleName = '';

    // ── Auth State ──
    function showAuthPage() {
        document.getElementById('authPage').style.display = '';
        document.getElementById('appContainer').style.display = 'none';
        document.getElementById('disclaimerBanner').classList.add('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function showApp() {
        document.getElementById('authPage').style.display = 'none';
        document.getElementById('appContainer').style.display = '';
        // Show disclaimer if not dismissed
        if (!Storage.isDisclaimerDismissed()) {
            document.getElementById('disclaimerBanner').classList.remove('hidden');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function showAuthError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.display = 'block';
        }
    }

    function hideAuthErrors() {
        const errs = document.querySelectorAll('.auth-error');
        errs.forEach(e => { e.style.display = 'none'; e.textContent = ''; });
    }

    function setAuthLoading(btnId, loading) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        if (loading) {
            btn.dataset.origText = btn.innerHTML;
            btn.innerHTML = '<span class="auth-spinner"></span> Please wait…';
            btn.disabled = true;
        } else {
            btn.innerHTML = btn.dataset.origText || btn.innerHTML;
            btn.disabled = false;
        }
    }

    // Load user profile from Supabase into sidebar
    async function loadUserProfile() {
        const user = SupabaseClient.getUser();
        if (!user) return;

        // Try to get profile from Supabase
        const profile = await SupabaseClient.getProfile();
        const fallbackName = user.user_metadata?.name || '';
        const email = user.email || '';
        const finalName = profile?.name || fallbackName;
        
        if (profile) {
            // Sync to localStorage
            Storage.saveUser({
                name: finalName,
                email: email,
                age: profile.age || '',
                gender: profile.gender || '',
                bloodGroup: profile.blood_group || '',
                allergies: profile.allergies || '',
                conditions: profile.conditions || '',
            });
        } else {
            // No profile found, ensure basic info is in localStorage
            Storage.saveUser({
                name: finalName,
                email: email,
                age: '',
                gender: '',
                bloodGroup: '',
                allergies: '',
                conditions: '',
            });
        }

        // Update Sidebar User Widget
        const sidebarName = document.getElementById('sidebarName');
        const sidebarEmail = document.getElementById('sidebarEmail');
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        
        if (sidebarName) sidebarName.textContent = finalName || 'User';
        if (sidebarEmail) sidebarEmail.textContent = email;
        if (sidebarAvatar) sidebarAvatar.textContent = (finalName || 'U').charAt(0).toUpperCase();

        // Emergency contacts
        const emg = await SupabaseClient.getEmergencyContacts();
        if (emg) {
            Storage.saveEmergencyContacts({
                contact1: { name: emg.contact1_name || '', phone: emg.contact1_phone || '', relation: emg.contact1_relation || '' },
                contact2: { name: emg.contact2_name || '', phone: emg.contact2_phone || '', relation: emg.contact2_relation || '' },
                doctor: { name: emg.doctor_name || '', phone: emg.doctor_phone || '' },
            });
        }
    }

    // ── Router ──
    function getHashModule() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        return MODULES[hash] ? hash : 'dashboard';
    }

    async function navigateTo(moduleName) {
        if (_currentModule && typeof _currentModule.destroy === 'function') {
            _currentModule.destroy();
        }

        _currentModuleName = moduleName;
        _currentModule = MODULES[moduleName];

        if (!_currentModule) {
            _currentModuleName = 'dashboard';
            _currentModule = DashboardModule;
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-module') === _currentModuleName);
        });

        const wrapper = document.getElementById('contentWrapper');
        wrapper.style.opacity = '0';

        setTimeout(async () => {
            wrapper.innerHTML = _currentModule.render();
            if (typeof lucide !== 'undefined') lucide.createIcons();
            if (typeof _currentModule.afterRender === 'function') {
                await _currentModule.afterRender();
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
            wrapper.style.opacity = '1';
            closeMobileSidebar();
            document.getElementById('mainContent').scrollTop = 0;
        }, 150);
    }

    // ── Mobile Sidebar ──
    function openMobileSidebar() {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('sidebarOverlay').classList.add('active');
    }

    function closeMobileSidebar() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('active');
    }

    // ── Toast Notifications ──
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info',
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ── Settings Modal ──
    function openSettings() {
        document.getElementById('settingsModal').classList.add('active');
        const user = Storage.getUser();
        const el = (id) => document.getElementById(id);
        if (el('profileName')) el('profileName').value = user.name || '';
        if (el('profileEmail')) el('profileEmail').value = user.email || '';
        if (el('profileAge')) el('profileAge').value = user.age || '';
        if (el('profileGender')) el('profileGender').value = user.gender || '';
        if (el('profileBlood')) el('profileBlood').value = user.bloodGroup || '';
        if (el('profileAllergies')) el('profileAllergies').value = user.allergies || '';
        if (el('profileConditions')) el('profileConditions').value = user.conditions || '';

        const emg = Storage.getEmergencyContacts();
        if (el('emgName1')) el('emgName1').value = emg.contact1?.name || '';
        if (el('emgPhone1')) el('emgPhone1').value = emg.contact1?.phone || '';
        if (el('emgRelation1')) el('emgRelation1').value = emg.contact1?.relation || '';
        if (el('emgName2')) el('emgName2').value = emg.contact2?.name || '';
        if (el('emgPhone2')) el('emgPhone2').value = emg.contact2?.phone || '';
        if (el('emgRelation2')) el('emgRelation2').value = emg.contact2?.relation || '';
        if (el('emgDoctor')) el('emgDoctor').value = emg.doctor?.name || '';
        if (el('emgDoctorPhone')) el('emgDoctorPhone').value = emg.doctor?.phone || '';

        switchSettingsTab('profile');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeSettings() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    function switchSettingsTab(tabName) {
        document.querySelectorAll('.settings-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        document.querySelectorAll('.settings-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${tabName}`));
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ── Init ──
    async function init() {
        // Initialize Supabase
        SupabaseClient.init();

        // Initialize AI Service
        AIService.init();

        // Check auth state
        const session = await SupabaseClient.getSession();
        if (session) {
            showApp();
            await loadUserProfile();
        } else {
            showAuthPage();
        }

        // Auth state change listener
        SupabaseClient.onAuthChange(async (event, user) => {
            if (event === 'SIGNED_IN' && user) {
                showApp();
                await loadUserProfile();
                navigateTo(getHashModule());
            } else if (event === 'SIGNED_OUT') {
                showAuthPage();
            }
        });

        // ── Auth UI Handlers ──
        // Toggle login / signup
        document.getElementById('showSignup')?.addEventListener('click', (e) => {
            e.preventDefault();
            hideAuthErrors();
            document.getElementById('loginCard').style.display = 'none';
            document.getElementById('signupCard').style.display = '';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            hideAuthErrors();
            document.getElementById('signupCard').style.display = 'none';
            document.getElementById('loginCard').style.display = '';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });

        // Login
        document.getElementById('loginBtn')?.addEventListener('click', async () => {
            hideAuthErrors();
            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value;

            if (!email || !password) {
                showAuthError('loginError', 'Please fill in all fields.');
                return;
            }

            setAuthLoading('loginBtn', true);
            const { error } = await SupabaseClient.signIn(email, password);
            setAuthLoading('loginBtn', false);

            if (error) {
                showAuthError('loginError', error.message || 'Login failed. Please try again.');
            } else {
                showApp();
                await loadUserProfile();
                navigateTo(getHashModule());
                showToast('Welcome back!', 'success');
            }
        });

        // Signup
        document.getElementById('signupBtn')?.addEventListener('click', async () => {
            hideAuthErrors();
            const name = document.getElementById('signupName')?.value.trim();
            const email = document.getElementById('signupEmail')?.value.trim();
            const password = document.getElementById('signupPassword')?.value;

            if (!name || !email || !password) {
                showAuthError('signupError', 'Please fill in all fields.');
                return;
            }
            if (password.length < 6) {
                showAuthError('signupError', 'Password must be at least 6 characters.');
                return;
            }

            setAuthLoading('signupBtn', true);
            const { data, error } = await SupabaseClient.signUp(email, password, name);
            setAuthLoading('signupBtn', false);

            if (error) {
                showAuthError('signupError', error.message || 'Signup failed. Please try again.');
            } else if (data?.user?.identities?.length === 0) {
                showAuthError('signupError', 'An account with this email already exists.');
            } else {
                // Some Supabase configs require email confirmation
                if (data?.session) {
                    showApp();
                    Storage.saveUser({ name, email });
                    await loadUserProfile();
                    navigateTo(getHashModule());
                    showToast(`Welcome, ${name}! 🎉`, 'success');
                } else {
                    // Email confirmation required
                    document.getElementById('signupCard').innerHTML = `
                        <div style="text-align:center; padding: var(--space-xl) 0;">
                            <div style="width:64px;height:64px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-md);">
                                <i data-lucide="mail-check" style="color:white;width:32px;height:32px;"></i>
                            </div>
                            <h3 style="margin-bottom: var(--space-sm);">Check Your Email</h3>
                            <p style="color: var(--text-muted); font-size: var(--font-sm);">
                                We've sent a confirmation link to <strong>${email}</strong>.<br>
                                Click the link to activate your account.
                            </p>
                            <button class="btn btn-outline" style="margin-top: var(--space-lg);" onclick="location.reload();">
                                Back to Login
                            </button>
                        </div>
                    `;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }
            }
        });

        // Enter key on password fields
        document.getElementById('loginPassword')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn')?.click();
        });
        document.getElementById('signupPassword')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('signupBtn')?.click();
        });

        // ── Disclaimer ──
        document.getElementById('disclaimerClose')?.addEventListener('click', () => {
            document.getElementById('disclaimerBanner').classList.add('hidden');
            Storage.dismissDisclaimer();
        });

        // ── Navigation ──
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const module = item.getAttribute('data-module');
                window.location.hash = module;
            });
        });

        // Mobile
        document.getElementById('menuToggle')?.addEventListener('click', openMobileSidebar);
        document.getElementById('sidebarOverlay')?.addEventListener('click', closeMobileSidebar);

        // ── Settings ──
        document.getElementById('settingsBtn')?.addEventListener('click', openSettings);
        document.getElementById('settingsModalClose')?.addEventListener('click', closeSettings);
        document.getElementById('settingsModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'settingsModal') closeSettings();
        });

        // Settings Tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', () => switchSettingsTab(tab.dataset.tab));
        });

        // Save Profile — syncs to both localStorage and Supabase
        document.getElementById('saveProfile')?.addEventListener('click', async () => {
            const user = {
                name: document.getElementById('profileName')?.value.trim() || '',
                age: document.getElementById('profileAge')?.value.trim() || '',
                gender: document.getElementById('profileGender')?.value || '',
                bloodGroup: document.getElementById('profileBlood')?.value || '',
                allergies: document.getElementById('profileAllergies')?.value.trim() || '',
                conditions: document.getElementById('profileConditions')?.value.trim() || '',
            };
            Storage.saveUser(user);

            // Sync to Supabase
            await SupabaseClient.saveProfile({
                name: user.name,
                age: user.age,
                gender: user.gender,
                blood_group: user.bloodGroup,
                allergies: user.allergies,
                conditions: user.conditions,
            });

            await loadUserProfile(); // Refresh the sidebar with the new info
            showToast('Profile saved successfully!', 'success');
        });

        // Save Emergency Contacts — syncs to both localStorage and Supabase
        document.getElementById('saveEmergency')?.addEventListener('click', async () => {
            const emg = {
                contact1: {
                    name: document.getElementById('emgName1')?.value.trim() || '',
                    phone: document.getElementById('emgPhone1')?.value.trim() || '',
                    relation: document.getElementById('emgRelation1')?.value.trim() || '',
                },
                contact2: {
                    name: document.getElementById('emgName2')?.value.trim() || '',
                    phone: document.getElementById('emgPhone2')?.value.trim() || '',
                    relation: document.getElementById('emgRelation2')?.value.trim() || '',
                },
                doctor: {
                    name: document.getElementById('emgDoctor')?.value.trim() || '',
                    phone: document.getElementById('emgDoctorPhone')?.value.trim() || '',
                },
            };
            Storage.saveEmergencyContacts(emg);

            // Sync to Supabase
            await SupabaseClient.saveEmergencyContacts({
                contact1_name: emg.contact1.name,
                contact1_phone: emg.contact1.phone,
                contact1_relation: emg.contact1.relation,
                contact2_name: emg.contact2.name,
                contact2_phone: emg.contact2.phone,
                contact2_relation: emg.contact2.relation,
                doctor_name: emg.doctor.name,
                doctor_phone: emg.doctor.phone,
            });

            showToast('Emergency contacts saved!', 'success');
        });

        // Export Data
        document.getElementById('exportData')?.addEventListener('click', () => {
            const data = Storage.exportAll();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `medipulse_export_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Data exported successfully!', 'success');
        });

        // Clear Data
        document.getElementById('clearData')?.addEventListener('click', () => {
            if (confirm('Are you sure? This will delete ALL your health data. This action cannot be undone.')) {
                Storage.clearAll();
                AIService.init();
                showToast('All data cleared.', 'warning');
                closeSettings();
                navigateTo('dashboard');
            }
        });

        // Log Out — full Supabase sign out
        document.getElementById('logOutBtn')?.addEventListener('click', async () => {
            if (confirm('Log out of your account?')) {
                await SupabaseClient.signOut();
                Storage.saveUser({ name: '', age: '', gender: '' });
                Storage.saveEmergencyContacts({});
                showToast('Logged out successfully.', 'info');
                closeSettings();
                showAuthPage();
            }
        });

        // Hash change listener
        window.addEventListener('hashchange', () => {
            navigateTo(getHashModule());
        });

        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') lucide.createIcons();

        // Initial navigation (only if logged in)
        if (session) {
            navigateTo(getHashModule());
        }

        // Content wrapper transition
        const wrapper = document.getElementById('contentWrapper');
        if (wrapper) wrapper.style.transition = 'opacity 0.15s ease';
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        showToast,
        navigateTo,
    };
})();

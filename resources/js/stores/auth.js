import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user  = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const token = ref(localStorage.getItem('auth_token') || null);

    const isLoggedIn = computed(() => !!token.value);
    const role = computed(() => user.value?.role || (user.value?.is_admin ? 'admin' : 'agent'));
    const isAdmin = computed(() => !!user.value?.is_admin || role.value === 'admin');
    const isAgent = computed(() => role.value === 'agent');
    const isCustomer = computed(() => role.value === 'customer');

    async function login(email, password) {
        const { data } = await axios.post('/login', { email, password });
        setAuth(data);
    }

    async function register(name, email, password, password_confirmation) {
        const { data } = await axios.post('/register', { name, email, password, password_confirmation });
        setAuth(data);
    }

    async function logout() {
        try { await axios.post('/logout'); } catch {}
        clearAuth();
    }

    function setAuth(data) {
        user.value  = data.user;
        token.value = data.access_token;
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }

    function clearAuth() {
        user.value  = null;
        token.value = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    return {
        user,
        token,
        role,
        isLoggedIn,
        isAdmin,
        isAgent,
        isCustomer,
        login,
        register,
        logout,
        clearAuth,
    };
});

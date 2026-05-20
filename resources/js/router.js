import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/LoginView.vue'),
        meta: { guest: true },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./views/RegisterView.vue'),
        meta: { guest: true },
    },
    {
        path: '/',
        component: () => import('./layouts/AppLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./views/AgentDashboardView.vue'),
                meta: { requiresAgent: true },
            },
            {
                path: 'customers',
                name: 'customers',
                component: () => import('./views/CustomersView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'customers/:id',
                name: 'customer-profile',
                component: () => import('./views/CustomerProfileView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'customers/:id/requirements',
                name: 'customer-requirements',
                component: () => import('./views/CustomerRequirementsView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'quotations',
                name: 'quotations',
                component: () => import('./views/QuotationsView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'finance',
                name: 'finance',
                redirect: { name: 'finance-expenses' },
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'finance/expenses',
                name: 'finance-expenses',
                component: () => import('./views/FinanceExpensesView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'finance/payments',
                name: 'finance-payments',
                component: () => import('./views/FinancePaymentsView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'finance/agent-payments',
                name: 'finance-agent-payments',
                component: () => import('./views/AgentPaymentsView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
            {
                path: 'client/portal',
                name: 'client-portal',
                component: () => import('./views/ClientPortalView.vue'),
                meta: { requiresCustomer: true },
            },
            {
                path: 'admin/dashboard',
                name: 'admin-dashboard',
                component: () => import('./views/AdminDashboardView.vue'),
                meta: { requiresAdmin: true },
            },
            {
                path: 'master-data/solutions',
                name: 'admin-solutions',
                component: () => import('./views/AdminSolutionsView.vue'),
                meta: { requiresAdmin: true },
                alias: 'admin/solutions',
            },
            {
                path: 'admin/agents',
                name: 'admin-agents',
                component: () => import('./views/AdminAgentsView.vue'),
                meta: { requiresAdmin: true },
            },
            {
                path: 'transactions',
                name: 'transactions',
                component: () => import('./views/TransactionsView.vue'),
            },
            {
                path: 'add',
                name: 'add-transaction',
                component: () => import('./views/AddTransactionView.vue'),
            },
            {
                path: 'categories',
                name: 'categories',
                component: () => import('./views/CategoriesView.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('./views/ProfileView.vue'),
            },
            {
                path: 'devices',
                name: 'devices',
                component: () => import('./views/DevicesView.vue'),
                meta: { requiresAgentOrAdmin: true },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'login' };

    if (to.name === 'dashboard' && auth.isLoggedIn && !auth.isAgent) {
        if (auth.isAdmin) return { name: 'admin-dashboard' };
        if (auth.isCustomer) return { name: 'client-portal' };
    }

    if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'dashboard' };
    if (to.meta.requiresAgent && !auth.isAgent) return { name: 'dashboard' };
    if (to.meta.requiresCustomer && !auth.isCustomer) return { name: 'dashboard' };
    if (to.meta.requiresAgentOrAdmin && !(auth.isAgent || auth.isAdmin)) return { name: 'dashboard' };
    if (to.meta.guest && auth.isLoggedIn) return { name: 'dashboard' };
});

export default router;

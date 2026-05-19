<template>
  <div class="min-h-screen bg-slate-50">
    <header class="fixed top-0 inset-x-0 bg-white border-b border-primary-100 z-40">
      <div class="h-14 px-3 md:px-4 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-primary-100 text-primary-700 hover:bg-primary-50"
            @click="goBack"
            aria-label="Go back"
          >
            <ArrowLeftIcon class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-primary-100 text-primary-700 hover:bg-primary-50"
            @click="goHome"
            aria-label="Go home"
          >
            <HomeIcon class="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center text-sm font-semibold text-slate-800 hover:text-primary-700 transition-colors"
          @click="goHome"
          aria-label="Go home"
        >
          <img src="/logo.png" alt="Lumac Logo" class="w-14 h-14 rounded-md object-contain" />
        </button>

        <button
          type="button"
          class="text-sm font-semibold text-slate-800 hover:text-primary-700 transition-colors"
          @click="goHome"
        >
          {{ currentSectionLabel }}
        </button>
      </div>

      <div class="px-3 md:px-4 py-2 border-t border-primary-50 bg-white/95 backdrop-blur">
        <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
          <button
            v-for="item in navItems"
            :key="item.name"
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
            :class="isActive(item.to)
              ? 'bg-primary-700 border-primary-700 text-white'
              : 'bg-white border-primary-100 text-slate-600 hover:border-primary-300 hover:text-primary-700'"
            @click="navigateTo(item.to)"
          >
            <component :is="resolveIcon(item)" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="pt-28 md:pt-28">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import {
  ArrowLeftIcon,
  HomeIcon,
  UserGroupIcon,
  IdentificationIcon,
  ListBulletIcon,
  CircleStackIcon,
  UserIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  RectangleGroupIcon,
} from '@heroicons/vue/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ListBulletIcon as ListBulletIconSolid,
  CircleStackIcon as CircleStackIconSolid,
  UserIcon as UserIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  CurrencyDollarIcon as CurrencyDollarIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  RectangleGroupIcon as RectangleGroupIconSolid,
} from '@heroicons/vue/24/solid';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const navItems = computed(() => {
  if (auth.isAdmin) {
    return [
      { name: 'admin-dashboard', to: '/admin/dashboard', label: 'Admin', icon: ShieldCheckIcon, activeIcon: ShieldCheckIconSolid },
      { name: 'master-data', to: '/master-data/solutions', label: 'Solutions', icon: CircleStackIcon, activeIcon: CircleStackIconSolid },
      { name: 'admin-agents', to: '/admin/agents', label: 'Agents', icon: IdentificationIcon, activeIcon: IdentificationIcon },
      { name: 'finance-expenses', to: '/finance/expenses', label: 'Expenses', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
      { name: 'finance-payments', to: '/finance/payments', label: 'Payments', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
      { name: 'finance-agent-payments', to: '/finance/agent-payments', label: 'Agent Pay', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
      { name: 'devices', to: '/devices', label: 'Devices', icon: RectangleGroupIcon, activeIcon: RectangleGroupIconSolid },
      { name: 'profile', to: '/profile', label: 'Profile', icon: UserIcon, activeIcon: UserIconSolid },
    ];
  }

  if (auth.isCustomer) {
    return [
      { name: 'client-portal', to: '/client/portal', label: 'Portal', icon: RectangleGroupIcon, activeIcon: RectangleGroupIconSolid },
      { name: 'profile', to: '/profile', label: 'Profile', icon: UserIcon, activeIcon: UserIconSolid },
    ];
  }

  return [
    { name: 'dashboard', to: '/', label: 'Catalog', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'customers', to: '/customers', label: 'Customers', icon: UserGroupIcon, activeIcon: UserGroupIconSolid },
    { name: 'quotations', to: '/quotations', label: 'Quotes', icon: DocumentTextIcon, activeIcon: DocumentTextIconSolid },
    { name: 'finance-expenses', to: '/finance/expenses', label: 'Expenses', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
    { name: 'finance-payments', to: '/finance/payments', label: 'Payments', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
    { name: 'finance-agent-payments', to: '/finance/agent-payments', label: 'Agent Pay', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
    { name: 'transactions', to: '/transactions', label: 'History', icon: ListBulletIcon, activeIcon: ListBulletIconSolid },
    { name: 'profile', to: '/profile', label: 'Profile', icon: UserIcon, activeIcon: UserIconSolid },
  ];
});

const currentSectionLabel = computed(() => {
  const match = navItems.value.find((item) => isActive(item.to));
  return match?.label || 'Home';
});

const homeRoute = computed(() => {
  if (auth.isAdmin) return '/admin/dashboard';
  if (auth.isCustomer) return '/client/portal';
  return '/';
});

function isActive(path) {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
}

function resolveIcon(item) {
  return isActive(item.to) ? (item.activeIcon || item.icon) : item.icon;
}

function navigateTo(path) {
  if (route.path === path) return;
  router.push(path);
}

function goHome() {
  navigateTo(homeRoute.value);
}

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  goHome();
}
</script>

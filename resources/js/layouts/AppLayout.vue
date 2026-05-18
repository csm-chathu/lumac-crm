<template>
  <div class="flex min-h-screen bg-slate-50">
    <header class="lg:hidden fixed top-0 inset-x-0 h-16 bg-white border-b border-primary-100 z-40">
      <div class="h-full px-4 flex items-center justify-between">
        <button
          type="button"
          class="inline-flex items-center justify-center w-10 h-10 rounded-lg text-primary-700 hover:bg-primary-50"
          @click="toggleMobileSidebar"
          aria-label="Toggle navigation"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
        <p class="text-sm font-semibold text-slate-800">{{ currentSectionLabel }}</p>
        <div class="w-10 h-10"></div>
      </div>
    </header>

    <button
      type="button"
      class="hidden lg:inline-flex fixed top-4 left-4 z-50 items-center justify-center w-10 h-10 rounded-lg border border-primary-100 bg-white text-primary-700 hover:bg-primary-50"
      @click="toggleDesktopSidebar"
      aria-label="Toggle desktop navigation"
    >
      <XMarkIcon v-if="desktopSidebarOpen" class="w-5 h-5" />
      <Bars3Icon v-else class="w-5 h-5" />
    </button>

    <nav
      class="hidden lg:flex flex-col w-64 bg-white border-r border-primary-100 fixed left-0 top-0 h-screen z-40 transform transition-transform duration-300"
      :class="desktopSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-6 border-b border-primary-100 bg-gradient-to-r from-primary-900 to-primary-700">
        <h2 class="text-xl font-bold text-white">Lumac</h2>
        <p class="text-xs text-primary-100 mt-1">Management Suite</p>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all"
            :class="isActive(item.to)
              ? 'bg-primary-700 text-white shadow-sm shadow-primary-200'
              : 'text-slate-600 hover:bg-primary-50 hover:text-primary-700'"
          >
            <component :is="resolveIcon(item)" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </router-link>
        </div>
      </div>
    </nav>

    <div
      v-if="mobileSidebarOpen"
      class="lg:hidden fixed inset-0 bg-slate-900/30 z-40"
      @click="closeMobileSidebar"
    ></div>

    <aside
      class="lg:hidden fixed top-0 left-0 h-screen w-72 bg-white border-r border-primary-100 z-50 transform transition-transform duration-300"
      :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      aria-label="Mobile navigation"
    >
      <div class="p-6 border-b border-primary-100 bg-gradient-to-r from-primary-900 to-primary-700 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white">Lumac</h2>
          <p class="text-xs text-primary-100 mt-1">Management Suite</p>
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10"
          @click="closeMobileSidebar"
          aria-label="Close navigation"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="p-4 space-y-2 overflow-y-auto h-[calc(100vh-89px)]">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all"
          :class="isActive(item.to)
            ? 'bg-primary-700 text-white shadow-sm shadow-primary-200'
            : 'text-slate-600 hover:bg-primary-50 hover:text-primary-700'"
          @click="closeMobileSidebar"
        >
          <component :is="resolveIcon(item)" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </router-link>
      </div>
    </aside>

    <main
      class="flex-1 overflow-y-auto pt-16 lg:pt-0 transition-all duration-300"
      :class="desktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import {
  HomeIcon,
  UserGroupIcon,
  ListBulletIcon,
  CircleStackIcon,
  UserIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  RectangleGroupIcon,
  Bars3Icon,
  XMarkIcon,
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
const auth = useAuthStore();
const mobileSidebarOpen = ref(false);
const desktopSidebarOpen = ref(true);

const navItems = computed(() => {
  if (auth.isAdmin) {
    return [
      { name: 'admin-dashboard', to: '/admin/dashboard', label: 'Admin', icon: ShieldCheckIcon, activeIcon: ShieldCheckIconSolid },
      { name: 'master-data', to: '/master-data/solutions', label: 'Solutions', icon: CircleStackIcon, activeIcon: CircleStackIconSolid },
      { name: 'finance-expenses', to: '/finance/expenses', label: 'Expenses', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
      { name: 'finance-payments', to: '/finance/payments', label: 'Payments', icon: CurrencyDollarIcon, activeIcon: CurrencyDollarIconSolid },
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
    { name: 'transactions', to: '/transactions', label: 'History', icon: ListBulletIcon, activeIcon: ListBulletIconSolid },
    { name: 'profile', to: '/profile', label: 'Profile', icon: UserIcon, activeIcon: UserIconSolid },
  ];
});

const currentSectionLabel = computed(() => {
  const match = navItems.value.find((item) => isActive(item.to));
  return match?.label || 'Menu';
});

function isActive(path) {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
}

function resolveIcon(item) {
  return isActive(item.to) ? (item.activeIcon || item.icon) : item.icon;
}

function toggleMobileSidebar() {
  mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

function closeMobileSidebar() {
  mobileSidebarOpen.value = false;
}

function toggleDesktopSidebar() {
  desktopSidebarOpen.value = !desktopSidebarOpen.value;
}

watch(
  () => route.path,
  () => {
    closeMobileSidebar();
  }
);
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="fixed top-0 inset-x-0 bg-[#0b1220] border-b border-slate-800 z-40">
      <div class="h-14 px-3 md:px-4 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-100 hover:bg-slate-800"
            @click="goBack"
            aria-label="Go back"
          >
            <ArrowLeftIcon class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-100 hover:bg-slate-800"
            @click="goHome"
            aria-label="Go home"
          >
            <HomeIcon class="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 text-white hover:text-sky-300 transition-colors"
          @click="goHome"
          aria-label="Go home"
        >
          <span class="hidden sm:inline font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-widest drop-shadow-lg select-none">
            <span class="text-white">LU</span><span class="text-sky-300">MAC</span>
          </span>
        </button>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="text-sm font-semibold text-slate-100 hover:text-sky-300 transition-colors"
            @click="goHome"
          >
            {{ currentSectionLabel }}
          </button>
          <span class="hidden md:inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-medium text-sky-200 bg-slate-900/40">
            {{ loggedInUserLabel }}
          </span>
          <button
            type="button"
            class="inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-100 hover:bg-slate-800"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>

      <div class="px-3 md:px-4 py-2 border-t border-slate-800 bg-[#0b1220]/95 backdrop-blur">
        <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
          <button
            v-for="item in navItems"
            :key="item.name"
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
            :class="isActive(item.to)
              ? 'bg-sky-500 border-sky-500 text-slate-900'
              : 'bg-[#0f172a] border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-300'"
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
import { ArrowLeftIcon, HomeIcon } from '@heroicons/vue/24/outline';
import { getNavItemsForRole } from '../navigation/navItems';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const navItems = computed(() => getNavItemsForRole(auth));

const currentSectionLabel = computed(() => {
  const match = navItems.value.find((item) => isActive(item.to));
  if (match) return match.label;
  if (route.path === homeRoute.value) return 'Dashboard';
  return 'Home';
});

const loggedInUserLabel = computed(() => auth.user?.name || 'User');

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

async function handleLogout() {
  await auth.logout();
  router.push('/login');
}
</script>

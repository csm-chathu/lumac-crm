<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-12 md:pb-16 lg:pb-20 text-white text-center">
      <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 md:mb-4 text-3xl md:text-4xl font-bold">
        {{ auth.user?.name?.charAt(0)?.toUpperCase() }}
      </div>
      <h1 class="font-bold text-2xl md:text-3xl">{{ auth.user?.name }}</h1>
      <p class="text-primary-200 text-sm md:text-base">{{ auth.user?.email }}</p>
    </div>

    <div class="px-4 md:px-6 lg:px-8 -mt-10 md:-mt-12 lg:-mt-16 space-y-4 md:space-y-6">
      <div class="card space-y-1">
        <h3 class="font-semibold text-base md:text-lg text-gray-700 mb-3 md:mb-4">Account</h3>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 md:py-4 border-b border-gray-50 gap-2 sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserIcon class="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
            </div>
            <div>
              <p class="text-sm md:text-base font-medium text-gray-700">Name</p>
              <p class="text-xs md:text-sm text-gray-400">{{ auth.user?.name }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 md:py-4 border-b border-gray-50 gap-2 sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <EnvelopeIcon class="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p class="text-sm md:text-base font-medium text-gray-700">Email</p>
              <p class="text-xs md:text-sm text-gray-400">{{ auth.user?.email }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 md:py-4 gap-2 sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CalendarIcon class="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            </div>
            <div>
              <p class="text-sm md:text-base font-medium text-gray-700">Member since</p>
              <p class="text-xs md:text-sm text-gray-400">{{ memberSince }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="font-semibold text-base md:text-lg text-gray-700 mb-3 md:mb-4">App Info</h3>
        <p class="text-xs md:text-sm text-gray-500 font-medium">LUMAC v1.0</p>
        <p class="text-xs md:text-sm text-gray-400 mt-2">Your personal income & expense tracker</p>
        <router-link
          v-if="auth.isAdmin"
          to="/master-data/solutions"
          class="inline-block mt-4 text-sm font-semibold text-primary-700 hover:text-primary-900"
        >
          Open Master Data Manager
        </router-link>
      </div>

      <button @click="handleLogout" :disabled="loggingOut"
              class="w-full py-3 md:py-3.5 rounded-xl border border-red-200 text-red-600 text-sm md:text-base font-semibold active:bg-red-50 transition hover:bg-red-50">
        {{ loggingOut ? 'Signing out…' : 'Sign Out' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { UserIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/vue/24/outline';

const auth       = useAuthStore();
const router     = useRouter();
const loggingOut = ref(false);

const memberSince = computed(() => {
  if (!auth.user?.created_at) return '—';
  return new Date(auth.user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
});

async function handleLogout() {
  loggingOut.value = true;
  await auth.logout();
  router.push('/login');
}
</script>

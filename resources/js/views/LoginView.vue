<template>
  <div class="min-h-screen flex flex-col justify-center bg-gradient-to-b from-primary-600 to-primary-800 px-4 md:px-6 py-8 md:py-10">
    <!-- Logo / Header -->
    <div class="text-center mb-8 md:mb-12">
      <div class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span class="text-4xl md:text-5xl">💰</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-white">LUMAC</h1>
      <p class="text-primary-200 mt-2 text-sm md:text-base">Your personal finance tracker</p>
    </div>

    <!-- Form Card -->
    <div class="max-w-md w-full mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Welcome back 👋</h2>

      <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-5">
        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Email</label>
          <input v-model="form.email" type="email" placeholder="your@email.com"
                 class="input-field text-base" required autocomplete="email" />
        </div>

        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Password</label>
          <div class="relative">
            <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                   placeholder="••••••••" class="input-field pr-10 text-base" required autocomplete="current-password" />
            <button type="button" @click="showPass = !showPass"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:text-gray-600">
              <EyeIcon v-if="!showPass" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 text-red-600 text-xs md:text-sm">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary text-base md:text-lg py-3 md:py-3.5" :disabled="loading">
          <span v-if="loading">Signing in…</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <p class="text-center text-sm md:text-base text-gray-500 mt-6 md:mt-8">
        Don't have an account?
        <router-link to="/register" class="text-primary-600 font-semibold hover:text-primary-700">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const auth    = useAuthStore();
const router  = useRouter();
const loading = ref(false);
const error   = ref('');
const showPass = ref(false);
const form = ref({ email: '', password: '' });

async function handleLogin() {
  error.value   = '';
  loading.value = true;
  try {
    await auth.login(form.value.email, form.value.password);
    router.push('/');
  } catch (e) {
    error.value = e.response?.data?.message || 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center bg-gradient-to-b from-primary-600 to-primary-800 px-4 md:px-6 py-8 md:py-10">
    <div class="text-center mb-8 md:mb-12">
      <div class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span class="text-4xl md:text-5xl">💰</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-white">Lumac Money</h1>
      <p class="text-primary-200 mt-2 text-sm md:text-base">Start tracking your finances</p>
    </div>

    <div class="max-w-md w-full mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Create Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-5">
        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Full Name</label>
          <input v-model="form.name" type="text" placeholder="John Doe"
                 class="input-field text-base" required autocomplete="name" />
        </div>

        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Email</label>
          <input v-model="form.email" type="email" placeholder="your@email.com"
                 class="input-field text-base" required autocomplete="email" />
        </div>

        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Password</label>
          <div class="relative">
            <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                   placeholder="Min 8 characters" class="input-field pr-10 text-base" required />
            <button type="button" @click="showPass = !showPass"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1 hover:text-gray-600">
              <EyeIcon v-if="!showPass" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Confirm Password</label>
          <input v-model="form.password_confirmation" :type="showPass ? 'text' : 'password'"
                 placeholder="Repeat password" class="input-field text-base" required />
        </div>

        <div v-if="errors.length" class="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 text-red-600 text-xs md:text-sm space-y-2">
          <p v-for="e in errors" :key="e">{{ e }}</p>
        </div>

        <button type="submit" class="btn-primary text-base md:text-lg py-3 md:py-3.5" :disabled="loading">
          <span v-if="loading">Creating account…</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <p class="text-center text-sm md:text-base text-gray-500 mt-6 md:mt-8">
        Already have an account?
        <router-link to="/login" class="text-primary-600 font-semibold hover:text-primary-700">Sign In</router-link>
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
const errors  = ref([]);
const showPass = ref(false);
const form = ref({ name: '', email: '', password: '', password_confirmation: '' });

async function handleRegister() {
  errors.value  = [];
  loading.value = true;
  try {
    await auth.register(form.value.name, form.value.email, form.value.password, form.value.password_confirmation);
    router.push('/');
  } catch (e) {
    if (e.response?.data?.errors) {
      errors.value = Object.values(e.response.data.errors).flat();
    } else {
      errors.value = [e.response?.data?.message || 'Registration failed.'];
    }
  } finally {
    loading.value = false;
  }
}
</script>

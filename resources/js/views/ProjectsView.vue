<template>
  <div v-if="isAdmin" class="p-4">
    <h1 class="text-2xl font-bold mb-4">Projects</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="project in projects" :key="project.id" class="border rounded-lg p-4 shadow-sm">
        <h2 class="font-medium text-lg">{{ project.name }}</h2>
        <p class="text-sm text-gray-500">{{ project.description }}</p>
        <p class="text-sm text-gray-500">Start Date: {{ project.start_date }}</p>
        <p class="text-sm text-gray-500">Deadline: {{ project.deadline }}</p>
        <p class="text-sm text-gray-500">Progress: {{ project.progress }}%</p>
        <p class="text-sm text-gray-500">Total Amount: {{ toCurrency(project.total_amount) }}</p>
        <p class="text-sm text-gray-500">Amount Paid: {{ toCurrency(project.amount_paid) }}</p>
        <p class="text-sm text-gray-500">Due Amount: {{ toCurrency(project.total_amount - project.amount_paid) }}</p>
        <div class="mt-2">
          <router-link :to="`/projects/${project.id}`" class="text-primary-700 font-medium">View Details</router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-4 text-gray-500">You do not have permission to view this page.</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user.role === 'admin');
const projects = ref([]);

onMounted(async () => {
  if (isAdmin.value) {
    const response = await axios.get('/api/projects');
    projects.value = response.data;
  }
});

function toCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
</script>
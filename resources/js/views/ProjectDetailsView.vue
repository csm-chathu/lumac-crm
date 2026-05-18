<template>
  <div v-if="isAdmin" class="p-4">
    <h1 class="text-2xl font-bold mb-4">{{ project.name }}</h1>

    <div class="mb-4">
      <p class="text-sm text-gray-500">Description: {{ project.description }}</p>
      <p class="text-sm text-gray-500">Start Date: {{ project.start_date }}</p>
      <p class="text-sm text-gray-500">Deadline: {{ project.deadline }}</p>
      <p class="text-sm text-gray-500">Progress: {{ project.progress }}%</p>
      <input
        type="range"
        v-model="project.progress"
        min="0"
        max="100"
        class="w-full mt-2"
        @change="updateProgress"
      />
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-medium mb-2">Images</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div v-for="image in project.images" :key="image.id" class="relative">
          <img :src="`/storage/${image.image_path}`" alt="Project Image" class="w-full h-32 object-cover rounded" />
          <button
            class="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            @click="deleteImage(image.id)"
          >
            Delete
          </button>
        </div>
      </div>
      <input type="file" @change="uploadImage" class="mt-2" />
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-medium mb-2">Payment Details</h2>
      <p class="text-sm text-gray-500">Total Amount: {{ toCurrency(project.total_amount) }}</p>
      <p class="text-sm text-gray-500">Amount Paid: {{ toCurrency(project.amount_paid) }}</p>
      <p class="text-sm text-gray-500">Due Amount: {{ toCurrency(project.total_amount - project.amount_paid) }}</p>
      <div class="mt-2">
        <label class="block text-sm font-medium">Update Amount Paid:</label>
        <input
          type="number"
          v-model.number="project.amount_paid"
          class="input-field mt-1"
          @change="updatePayment"
        />
      </div>
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-medium mb-2">Special Requirements</h2>
      <textarea
        v-model="project.special_requirements"
        class="input-field w-full h-32"
        placeholder="Enter special requirements..."
        @change="updateRequirements"
      ></textarea>
    </div>
  </div>
  <div v-else class="p-4 text-gray-500">You do not have permission to view this page.</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user.role === 'admin');
const route = useRoute();
const project = ref({ images: [], total_amount: 0, amount_paid: 0, special_requirements: '' });

onMounted(async () => {
  if (isAdmin.value) {
    const response = await axios.get(`/api/projects/${route.params.id}`);
    project.value = response.data;
  }
});

const updateProgress = async () => {
  await axios.put(`/api/projects/${project.value.id}`, { progress: project.value.progress });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`/api/projects/${project.value.id}/images`, formData);
  project.value.images.push(response.data);
};

const deleteImage = async (imageId) => {
  await axios.delete(`/api/projects/${project.value.id}/images/${imageId}`);
  project.value.images = project.value.images.filter((image) => image.id !== imageId);
};

const updatePayment = async () => {
  await axios.put(`/api/projects/${project.value.id}`, { amount_paid: project.value.amount_paid });
};

const updateRequirements = async () => {
  await axios.put(`/api/projects/${project.value.id}`, { special_requirements: project.value.special_requirements });
};
</script>
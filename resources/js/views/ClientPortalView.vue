<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Client Portal</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Project and Financial Statement Center</h1>
    </div>

    <section v-if="loading" class="card text-sm text-gray-500">Loading portal data...</section>

    <template v-else-if="portal">
      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Project Pipeline</h2>
        <div v-if="portal.project_progress?.length" class="space-y-3">
          <div v-for="project in portal.project_progress" :key="project.id" class="border border-gray-100 rounded-xl p-4">
            <div class="flex items-center justify-between gap-3 mb-2">
              <p class="font-medium text-gray-800">{{ project.name }}</p>
              <span class="text-xs text-gray-500">{{ project.progress_percent }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div class="h-full bg-primary-600" :style="{ width: `${project.progress_percent}%` }"></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">Stage: {{ prettyStage(project.stage) }}</p>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">No project milestones published yet.</p>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article class="card">
          <p class="text-xs text-gray-500">Contract Value</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ toCurrency(portal.financials?.contract_value) }}</p>
        </article>
        <article class="card border border-green-100">
          <p class="text-xs text-gray-500">Total Advance Paid</p>
          <p class="text-2xl font-bold text-green-700 mt-1">{{ toCurrency(portal.financials?.paid) }}</p>
        </article>
        <article class="card border border-amber-100">
          <p class="text-xs text-gray-500">Remaining Balance</p>
          <p class="text-2xl font-bold text-amber-700 mt-1">{{ toCurrency(portal.financials?.remaining) }}</p>
        </article>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Historical Receipts</h2>
        <div v-if="portal.receipts?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="receipt in portal.receipts" :key="receipt.id" class="border rounded-lg p-4 shadow-sm">
            <div class="font-medium text-gray-800">Receipt #: {{ receipt.receipt_number }}</div>
            <div class="text-gray-500">Date: {{ receipt.payment_date }}</div>
            <div class="text-gray-500">Amount: {{ toCurrency(receipt.amount) }}</div>
            <div class="mt-2">
              <a class="text-primary-700 font-semibold" :href="`/api/advance-payments/${receipt.id}/receipt?mode=a4`" target="_blank" rel="noreferrer">Open</a>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">No receipts available yet.</p>
      </section>
    </template>

    <section v-else class="card text-sm text-gray-500">Client profile is not linked yet.</section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const loading = ref(false);
const portal = ref(null);

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function prettyStage(stage) {
  if (!stage) return 'N/A';
  return stage.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function fetchPortal() {
  loading.value = true;
  try {
    const { data } = await axios.get('/client/overview');
    portal.value = data;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPortal);
</script>

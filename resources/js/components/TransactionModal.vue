<template>
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center lg:items-end p-4 md:p-6">
    <div class="bg-white rounded-3xl lg:rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 md:p-6 pb-8">
      <!-- Handle (mobile only) -->
      <div class="lg:hidden w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>

      <div class="flex justify-between items-start mb-4 md:mb-6">
        <div>
          <span class="text-xs md:text-sm font-medium px-2 md:px-3 py-1 md:py-1.5 rounded-full"
                :class="transaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">
            {{ transaction.type }}
          </span>
          <h2 class="text-2xl md:text-3xl font-bold mt-2 md:mt-3">
            {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
          </h2>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition">
          <XMarkIcon class="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <dl class="space-y-3 md:space-y-4 text-sm md:text-base">
        <div class="flex justify-between">
          <dt class="text-gray-500">Category</dt>
          <dd class="font-medium">{{ transaction.category?.name || '—' }}</dd>
        </div>
        <div class="flex justify-between">
          <dt class="text-gray-500">Date</dt>
          <dd class="font-medium">{{ formatDate(transaction.transaction_date) }}</dd>
        </div>
        <div v-if="transaction.description" class="flex flex-col sm:flex-row sm:justify-between gap-2">
          <dt class="text-gray-500">Description</dt>
          <dd class="font-medium text-right">{{ transaction.description }}</dd>
        </div>
        <div v-if="transaction.note" class="flex flex-col sm:flex-row sm:justify-between gap-2">
          <dt class="text-gray-500">Note</dt>
          <dd class="font-medium text-right text-gray-600 italic">{{ transaction.note }}</dd>
        </div>
      </dl>

      <div class="mt-6 md:mt-8">
        <button @click="confirmDelete" :disabled="deleting"
                class="w-full py-3 md:py-3.5 rounded-xl border border-red-200 text-red-600 text-sm md:text-base font-medium hover:bg-red-50 active:bg-red-50 transition">
          {{ deleting ? 'Deleting…' : 'Delete Transaction' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTransactionStore } from '../stores/transactions';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { formatCurrency as formatLkrCurrency } from '../utils/currency';

const props = defineProps({ transaction: Object });
const emit  = defineEmits(['close', 'deleted']);
const store   = useTransactionStore();
const deleting = ref(false);

function formatCurrency(val) {
  return formatLkrCurrency(val);
}
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function confirmDelete() {
  if (!confirm('Delete this transaction?')) return;
  deleting.value = true;
  try {
    await store.deleteTransaction(props.transaction.id);
    emit('deleted');
  } finally {
    deleting.value = false;
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-4 md:pb-5">
      <div class="flex items-center gap-3">
        <button @click="router.back()" class="text-gray-500 p-1 hover:bg-gray-100 rounded-lg transition">
          <ChevronLeftIcon class="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <h1 class="font-bold text-2xl md:text-3xl text-gray-800">Add Transaction</h1>
      </div>
    </div>

    <div class="px-4 md:px-6 lg:px-8 mt-4 md:mt-6 space-y-4 md:space-y-6">
      <!-- Type toggle -->
      <div class="grid grid-cols-2 bg-gray-100 rounded-xl p-1">
        <button v-for="t in ['income', 'expense']" :key="t"
                @click="form.type = t; fetchCategories()"
                class="py-2 rounded-lg text-sm font-semibold transition-all"
                :class="form.type === t
                  ? (t === 'income' ? 'bg-primary-600 text-white shadow' : 'bg-red-500 text-white shadow')
                  : 'text-gray-400'">
          {{ t === 'income' ? '💚 Income' : '🔴 Expense' }}
        </button>
      </div>

      <!-- Amount -->
      <div>
        <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2">Amount *</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg md:text-xl">$</span>
          <input v-model="form.amount" type="number" step="0.01" min="0.01"
                 placeholder="0.00" class="input-field pl-8 text-xl md:text-2xl font-bold" required />
        </div>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3">Category</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
          <button v-for="cat in categories" :key="cat.id"
                  @click="form.category_id = cat.id"
                  class="p-2 rounded-xl border text-xs text-center transition-all"
                  :class="form.category_id === cat.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                    : 'border-gray-200 text-gray-600'">
            <div class="text-lg mb-0.5">{{ categoryEmoji(cat.icon) }}</div>
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Description</label>
        <input v-model="form.description" type="text" placeholder="e.g. Grocery shopping"
               class="input-field" />
      </div>

      <!-- Date -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Date *</label>
        <input v-model="form.transaction_date" type="date" class="input-field" required />
      </div>

      <!-- Note -->
      <div>
        <label class="block text-xs font-medium text-gray-500 mb-1">Note (optional)</label>
        <textarea v-model="form.note" rows="2" placeholder="Extra details…"
                  class="input-field resize-none"></textarea>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs">
        {{ error }}
      </div>

      <button @click="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Saving…' : 'Save Transaction' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionStore } from '../stores/transactions';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const store  = useTransactionStore();

const categories = ref([]);
const loading    = ref(false);
const error      = ref('');
const form       = ref({
  type: 'expense',
  amount: '',
  category_id: null,
  description: '',
  note: '',
  transaction_date: new Date().toISOString().split('T')[0],
});

const iconMap = {
  'briefcase': '💼', 'laptop': '💻', 'trending-up': '📈', 'plus-circle': '➕',
  'utensils': '🍽️', 'car': '🚗', 'shopping-bag': '🛍️', 'file-text': '📋',
  'heart': '❤️', 'film': '🎬', 'book': '📚', 'more-horizontal': '⋯', 'circle': '⭕',
};
function categoryEmoji(icon) { return iconMap[icon] || '💳'; }

async function fetchCategories() {
  form.value.category_id = null;
  const { data } = await axios.get('/categories', { params: { type: form.value.type } });
  categories.value = data;
}

async function submit() {
  if (!form.value.amount || form.value.amount <= 0) {
    error.value = 'Please enter a valid amount.'; return;
  }
  error.value = '';
  loading.value = true;
  try {
    await store.createTransaction({
      ...form.value,
      amount: parseFloat(form.value.amount),
    });
    router.push('/transactions');
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to save transaction.';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCategories);
</script>

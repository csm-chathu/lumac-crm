<template>
  <div class="pb-4 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-8 md:pb-12 lg:pb-20 text-white">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <p class="text-primary-200 text-sm">Good {{ greeting }},</p>
          <h1 class="text-2xl md:text-3xl font-bold">{{ auth.user?.name }}</h1>
        </div>
        <div class="text-right">
          <select v-model="selectedMonth" @change="loadData"
                  class="bg-white/20 text-white text-xs md:text-sm rounded-lg px-3 md:px-4 py-2 border border-white/30">
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
        </div>
      </div>

      <!-- Balance Card -->
      <div class="mt-6 md:mt-8 bg-white/10 backdrop-blur rounded-2xl p-4 md:p-6">
        <p class="text-primary-200 text-xs md:text-sm mb-2">Net Balance</p>
        <p class="text-4xl md:text-5xl font-bold">{{ formatCurrency(summary.balance) }}</p>
        <div class="grid grid-cols-2 gap-3 md:gap-4 mt-6">
          <div class="bg-white/10 rounded-xl p-3 md:p-4">
            <div class="flex items-center gap-1 text-primary-200 text-xs md:text-sm mb-1">
              <ArrowDownIcon class="w-4 h-4 md:w-5 md:h-5" /> Income
            </div>
            <p class="font-bold text-sm md:text-base">{{ formatCurrency(summary.total_income) }}</p>
          </div>
          <div class="bg-white/10 rounded-xl p-3 md:p-4">
            <div class="flex items-center gap-1 text-red-200 text-xs md:text-sm mb-1">
              <ArrowUpIcon class="w-4 h-4 md:w-5 md:h-5" /> Expenses
            </div>
            <p class="font-bold text-sm md:text-base">{{ formatCurrency(summary.total_expense) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content pulled up over header -->
    <div class="px-4 md:px-6 lg:px-8 -mt-10 md:-mt-12 lg:-mt-16 space-y-4 md:space-y-6">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Expense Breakdown -->
      <div class="card">
        <h3 class="font-semibold text-base md:text-lg text-gray-700 mb-3 md:mb-4">Expense Breakdown</h3>
        <div v-if="summary.expense_by_category?.length">
          <div v-for="cat in summary.expense_by_category.slice(0, 5)" :key="cat.category_id"
               class="mb-3">
            <div class="flex justify-between items-center mb-1">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full" :style="{ background: cat.category?.color || '#9ca3af' }"></div>
                <span class="text-xs text-gray-600">{{ cat.category?.name || 'Uncategorized' }}</span>
              </div>
              <span class="text-xs font-medium text-gray-800">{{ formatCurrency(cat.total) }}</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
              <div class="h-1.5 rounded-full transition-all duration-500"
                   :style="{ width: expensePercent(cat.total) + '%', background: cat.category?.color || '#9ca3af' }">
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-400 text-xs text-center py-4">No expenses this month</p>
      </div>

      <!-- Recent Transactions -->
      <div class="card">
        <div class="flex justify-between items-center mb-3 md:mb-4">
          <h3 class="font-semibold text-base md:text-lg text-gray-700">Recent Transactions</h3>
          <router-link to="/transactions" class="text-primary-600 text-xs font-medium">See all</router-link>
        </div>
        <div v-if="summary.recent?.length" class="space-y-3">
          <TransactionItem v-for="tx in summary.recent" :key="tx.id" :transaction="tx" />
        </div>
        <p v-else class="text-gray-400 text-xs text-center py-4">No transactions yet</p>
      </div>
      </div>

      <!-- Quick Add Button -->
      <div class="lg:col-span-2">
        <router-link to="/add" class="btn-primary text-center block">
          + Add Transaction
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import TransactionItem from '../components/TransactionItem.vue';
import { formatCurrency as formatLkrCurrency } from '../utils/currency';

const auth = useAuthStore();
const summary = ref({});
const selectedMonth = ref(new Date().getMonth() + 1);

const months = [
  { value: 1, label: 'Jan' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' }, { value: 8, label: 'Aug' }, { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dec' },
];

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
});

function formatCurrency(val) {
  return formatLkrCurrency(val);
}

function expensePercent(amount) {
  if (!summary.value.total_expense || summary.value.total_expense === 0) return 0;
  return Math.min(100, (amount / summary.value.total_expense) * 100).toFixed(1);
}

async function loadData() {
  const { data } = await axios.get('/dashboard/summary', {
    params: { month: selectedMonth.value, year: new Date().getFullYear() }
  });
  summary.value = data;
}

onMounted(loadData);
</script>

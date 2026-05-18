<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-4 md:pb-5 sticky top-0 z-10">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 class="font-bold text-2xl md:text-3xl text-gray-800">Transactions</h1>
        <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <select v-model="filterType" @change="load"
                  class="text-xs md:text-sm border border-gray-200 rounded-lg px-3 md:px-4 py-2 flex-1 md:flex-none">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select v-model="filterMonth" @change="load"
                  class="text-xs md:text-sm border border-gray-200 rounded-lg px-3 md:px-4 py-2 flex-1 md:flex-none">
            <option value="">All months</option>
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="px-4 md:px-6 lg:px-8 mt-4 md:mt-6">
      <div v-if="store.loading" class="text-center py-10 text-gray-400 text-sm">Loading…</div>

      <div v-else-if="store.transactions.length" class="card divide-y divide-gray-50">
        <TransactionItem
          v-for="tx in store.transactions"
          :key="tx.id"
          :transaction="tx"
          @click="openDetail(tx)"
          class="cursor-pointer active:bg-gray-50"
        />
      </div>

      <div v-else class="text-center py-16 text-gray-400">
        <p class="text-4xl mb-3">📭</p>
        <p class="text-sm">No transactions found</p>
      </div>
    </div>

    <!-- Transaction Detail Modal -->
    <TransactionModal
      v-if="selected"
      :transaction="selected"
      @close="selected = null"
      @deleted="onDeleted"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTransactionStore } from '../stores/transactions';
import TransactionItem from '../components/TransactionItem.vue';
import TransactionModal from '../components/TransactionModal.vue';

const store = useTransactionStore();
const selected = ref(null);
const filterType = ref('');
const filterMonth = ref(new Date().getMonth() + 1);

const months = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
  { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' },
];

async function load() {
  await store.fetchTransactions({
    type: filterType.value || undefined,
    month: filterMonth.value || undefined,
    year: new Date().getFullYear(),
  });
}

function openDetail(tx) {
  selected.value = tx;
}

function onDeleted() {
  selected.value = null;
  load();
}

onMounted(load);
</script>

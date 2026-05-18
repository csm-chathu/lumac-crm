<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Finance Hub</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Expense Management</h1>
      <p class="text-sm text-gray-500 mt-1">Log and track operational expenses in one place.</p>
    </div>

    <section class="card space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Company Expense Logger</h2>

      <input v-model="expenseForm.category" class="input-field" placeholder="Expense category" />
      <input v-model.number="expenseForm.amount" type="number" min="0.01" step="0.01" class="input-field" placeholder="Amount" />
      <input v-model="expenseForm.expense_date" type="date" class="input-field" />
      <textarea v-model="expenseForm.notes" class="input-field" rows="3" placeholder="Notes"></textarea>
      <input ref="expenseReceiptInput" type="file" class="input-field" accept="image/*,.pdf" @change="onExpenseReceipt" />

      <button class="btn-primary md:w-auto" :disabled="savingExpense" @click="createExpense">
        {{ savingExpense ? 'Saving...' : 'Save Expense' }}
      </button>
    </section>

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Recent Expenses</h2>
        <div class="flex gap-2">
          <input
            v-model="expenseSearchQuery"
            type="text"
            class="input-field flex-1 md:flex-none"
            placeholder="Search category..."
          />
          <button v-if="expenseSearchQuery" @click="expenseSearchQuery = ''" class="btn-secondary px-4 py-2">
            Reset
          </button>
        </div>
      </div>
      <div v-if="loadingExpenses" class="text-sm text-gray-500">Loading expenses...</div>
      <div v-else-if="filteredExpenses.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="expense in filteredExpenses" :key="expense.id" class="border rounded-lg p-4 shadow-sm">
          <div class="font-medium text-gray-800">Date: {{ expense.expense_date }}</div>
          <div class="text-gray-500">Category: {{ expense.category }}</div>
          <div class="text-gray-500">Amount: {{ toCurrency(expense.amount) }}</div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">No expenses logged yet.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useToast } from '../composables/useToast';

const { success, error } = useToast();

const expenses = ref([]);
const loadingExpenses = ref(false);
const savingExpense = ref(false);
const expenseSearchQuery = ref('');
const expenseReceiptInput = ref(null);

const expenseForm = reactive({
  category: '',
  amount: '',
  expense_date: new Date().toISOString().slice(0, 10),
  notes: '',
  receipt: null,
});

const filteredExpenses = computed(() => {
  if (!expenseSearchQuery.value.trim()) return expenses.value;
  const query = expenseSearchQuery.value.toLowerCase();
  return expenses.value.filter((e) =>
    e.category?.toLowerCase().includes(query) || e.notes?.toLowerCase().includes(query)
  );
});

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function onExpenseReceipt(event) {
  expenseForm.receipt = event.target.files?.[0] || null;
}

async function fetchExpenses() {
  loadingExpenses.value = true;
  try {
    const { data } = await axios.get('/expenses');
    expenses.value = data;
  } catch (e) {
    error(e.response?.data?.message || 'Failed to load expenses.');
  } finally {
    loadingExpenses.value = false;
  }
}

async function createExpense() {
  savingExpense.value = true;
  try {
    const formData = new FormData();
    formData.append('category', expenseForm.category);
    formData.append('amount', expenseForm.amount);
    formData.append('expense_date', expenseForm.expense_date);
    formData.append('notes', expenseForm.notes || '');
    if (expenseForm.receipt) formData.append('receipt', expenseForm.receipt);

    await axios.post('/expenses', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    success('Expense saved successfully!');
    expenseForm.category = '';
    expenseForm.amount = '';
    expenseForm.notes = '';
    expenseForm.receipt = null;
    if (expenseReceiptInput.value) expenseReceiptInput.value.value = '';
    await fetchExpenses();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save expense. Please try again.');
  } finally {
    savingExpense.value = false;
  }
}

onMounted(fetchExpenses);
</script>

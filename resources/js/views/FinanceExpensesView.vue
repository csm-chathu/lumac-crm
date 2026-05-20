<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Finance Hub</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Expense Management</h1>
        <p class="text-sm text-gray-500 mt-1">Log and track operational expenses in one place.</p>
      </div>
      <button type="button" class="btn-primary md:w-auto px-4 py-2" @click="openExpenseModal">
        Add Expense
      </button>
    </div>

    <div v-if="showExpenseModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Add Expense</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeExpenseModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 grid grid-cols-1 gap-4">
          <input v-model="expenseForm.category" class="input-field" placeholder="Expense category" />
          <input v-model.number="expenseForm.amount" type="number" min="0.01" step="0.01" class="input-field" placeholder="Amount" />
          <input v-model="expenseForm.expense_date" type="date" class="input-field" />
          <textarea v-model="expenseForm.notes" class="input-field" rows="3" placeholder="Notes"></textarea>
          <input ref="expenseReceiptInput" type="file" class="input-field" accept="image/*,.pdf" @change="onExpenseReceipt" />

          <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="closeExpenseModal">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto" :disabled="savingExpense" @click="createExpense">
              {{ savingExpense ? 'Saving...' : 'Save Expense' }}
            </button>
          </div>
        </div>
      </div>
    </div>

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
      <div v-else-if="filteredExpenses.length" class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-sm">
          <thead>
            <tr class="border-b border-gray-200 text-left text-gray-500">
              <th class="py-3 pr-4 font-semibold">Date</th>
              <th class="py-3 pr-4 font-semibold">Category</th>
              <th class="py-3 pr-4 font-semibold">Amount</th>
              <th class="py-3 pr-4 font-semibold">Notes</th>
              <th class="py-3 pr-4 font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in filteredExpenses" :key="expense.id" class="border-b border-gray-100 text-gray-700">
              <td class="py-3 pr-4 whitespace-nowrap">{{ expense.expense_date }}</td>
              <td class="py-3 pr-4">{{ expense.category }}</td>
              <td class="py-3 pr-4 font-semibold">{{ toCurrency(expense.amount) }}</td>
              <td class="py-3 pr-4 max-w-xs truncate" :title="expense.notes || 'N/A'">{{ expense.notes || 'N/A' }}</td>
              <td class="py-3 pr-4">
                <a
                  v-if="expense.receipt_path"
                  :href="receiptUrl(expense.receipt_path)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-700 font-semibold hover:underline"
                >
                  View
                </a>
                <span v-else class="text-gray-400">N/A</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-sm text-gray-500">No expenses logged yet.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useToast } from '../composables/useToast';
import { useAuthStore } from '../stores/auth';
import { formatCurrency } from '../utils/currency';

const { success, error } = useToast();
const authStore = useAuthStore();

const expenses = ref([]);
const loadingExpenses = ref(false);
const savingExpense = ref(false);
const showExpenseModal = ref(false);
const expenseSearchQuery = ref('');
const expenseReceiptInput = ref(null);

const expenseForm = reactive({
  category: '',
  amount: '',
  expense_date: new Date().toISOString().slice(0, 10),
  notes: '',
  receipt: null,
});

const expenseEndpoint = computed(() => (authStore.isAdmin ? '/admin/expenses' : '/expenses'));

const filteredExpenses = computed(() => {
  if (!expenseSearchQuery.value.trim()) return expenses.value;
  const query = expenseSearchQuery.value.toLowerCase();
  return expenses.value.filter((e) =>
    e.category?.toLowerCase().includes(query) || e.notes?.toLowerCase().includes(query)
  );
});

function toCurrency(value) {
  return formatCurrency(value);
}

function receiptUrl(path) {
  return `/storage/${path}`;
}

function resetExpenseForm() {
  expenseForm.category = '';
  expenseForm.amount = '';
  expenseForm.expense_date = new Date().toISOString().slice(0, 10);
  expenseForm.notes = '';
  expenseForm.receipt = null;
  if (expenseReceiptInput.value) expenseReceiptInput.value.value = '';
}

function openExpenseModal() {
  showExpenseModal.value = true;
}

function closeExpenseModal() {
  showExpenseModal.value = false;
  resetExpenseForm();
}

function onExpenseReceipt(event) {
  expenseForm.receipt = event.target.files?.[0] || null;
}

async function fetchExpenses() {
  loadingExpenses.value = true;
  try {
    const { data } = await axios.get(expenseEndpoint.value);
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

    await axios.post(expenseEndpoint.value, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    success('Expense saved successfully!');
    closeExpenseModal();
    await fetchExpenses();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save expense. Please try again.');
  } finally {
    savingExpense.value = false;
  }
}

onMounted(fetchExpenses);
</script>

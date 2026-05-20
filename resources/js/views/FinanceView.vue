<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Finance Hub</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Expenses and Advance Payments</h1>
      <p class="text-sm text-gray-500 mt-1">Log structural costs, receive customer advances, and print receipts instantly.</p>
    </div>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <article class="card space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">Company Expense Logger</h2>

        <input v-model="expenseForm.category" class="input-field" placeholder="Expense category" />
        <input v-model.number="expenseForm.amount" type="number" min="0.01" step="0.01" class="input-field" placeholder="Amount" />
        <input v-model="expenseForm.expense_date" type="date" class="input-field" />
        <textarea v-model="expenseForm.notes" class="input-field" rows="3" placeholder="Notes"></textarea>
        <input ref="expenseReceiptInput" type="file" class="input-field" accept="image/*,.pdf" @change="onExpenseReceipt" />

        <button class="btn-primary" :disabled="savingExpense" @click="createExpense">
          {{ savingExpense ? 'Saving...' : 'Save Expense' }}
        </button>
      </article>

      <article class="card space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">Advance Payment Processor</h2>

        <select v-model="paymentForm.customer_id" class="input-field">
          <option value="">Select customer</option>
          <option v-for="customer in customersStore.customers" :key="customer.id" :value="customer.id">
            {{ customer.full_name }}
          </option>
        </select>

        <input v-model.number="paymentForm.amount" type="number" min="0.01" step="0.01" class="input-field" placeholder="Advance amount" />
        <input v-model="paymentForm.payment_date" type="date" class="input-field" />
        <input v-model="paymentForm.payment_method" class="input-field" placeholder="Payment method (cash, bank, etc.)" />
        <textarea v-model="paymentForm.notes" class="input-field" rows="3" placeholder="Notes"></textarea>
        <input ref="paymentAttachmentInput" type="file" class="input-field" accept="image/*,.pdf" @change="onPaymentAttachment" />

        <button class="btn-primary" :disabled="savingPayment" @click="createPayment">
          {{ savingPayment ? 'Processing...' : 'Log Advance Payment' }}
        </button>
      </article>
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

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Recent Advance Payments</h2>
        <div class="flex gap-2">
          <input
            v-model="paymentSearchQuery"
            type="text"
            class="input-field flex-1 md:flex-none"
            placeholder="Search customer..."
          />
          <button v-if="paymentSearchQuery" @click="paymentSearchQuery = ''" class="btn-secondary px-4 py-2">
            Reset
          </button>
        </div>
      </div>
      <div v-if="loadingPayments" class="text-sm text-gray-500">Loading payments...</div>
      <div v-else-if="filteredPayments.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="payment in filteredPayments" :key="payment.id" class="border rounded-lg p-4 shadow-sm">
          <div class="font-medium text-gray-800">Receipt #: {{ payment.receipt_number }}</div>
          <div class="text-gray-500">Customer: {{ payment.customer?.full_name || 'N/A' }}</div>
          <div class="text-gray-500">Amount: {{ toCurrency(payment.amount) }}</div>
          <div class="mt-2">
            <div class="flex gap-2">
              <a class="text-primary-700 font-semibold" :href="`/api/advance-payments/${payment.id}/receipt?mode=a4`" target="_blank" rel="noreferrer">A4</a>
              <a class="text-primary-700 font-semibold" :href="`/api/advance-payments/${payment.id}/receipt?mode=thermal`" target="_blank" rel="noreferrer">80mm</a>
            </div>
            <div class="flex gap-2 flex-wrap mt-2">
              <a class="text-primary-700 font-semibold text-xs" :href="`/api/advance-payments/${payment.id}/receipt?mode=a4`" target="_blank" rel="noreferrer">HTML-A4</a>
              <a class="text-primary-700 font-semibold text-xs" :href="`/api/advance-payments/${payment.id}/receipt?mode=thermal`" target="_blank" rel="noreferrer">HTML-80mm</a>
              <a :href="`/api/advance-payments/${payment.id}/pdf`" target="_blank" rel="noopener noreferrer" class="text-green-600 font-semibold text-xs">PDF</a>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">No advance payments recorded yet.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useCustomersStore } from '../stores/customers';
import { useToast } from '../composables/useToast';
import { formatCurrency } from '../utils/currency';

const customersStore = useCustomersStore();
const { success, error } = useToast();

const expenses = ref([]);
const payments = ref([]);
const loadingExpenses = ref(false);
const loadingPayments = ref(false);
const savingExpense = ref(false);
const savingPayment = ref(false);
const expenseSearchQuery = ref('');
const paymentSearchQuery = ref('');

const expenseReceiptInput = ref(null);
const paymentAttachmentInput = ref(null);

const expenseForm = reactive({
  category: '',
  amount: '',
  expense_date: new Date().toISOString().slice(0, 10),
  notes: '',
  receipt: null,
});

const paymentForm = reactive({
  customer_id: '',
  amount: '',
  payment_date: new Date().toISOString().slice(0, 10),
  payment_method: 'cash',
  notes: '',
  attachment: null,
});

const filteredExpenses = computed(() => {
  if (!expenseSearchQuery.value.trim()) return expenses.value;
  const query = expenseSearchQuery.value.toLowerCase();
  return expenses.value.filter((e) =>
    e.category?.toLowerCase().includes(query) || e.notes?.toLowerCase().includes(query)
  );
});

const filteredPayments = computed(() => {
  if (!paymentSearchQuery.value.trim()) return payments.value;
  const query = paymentSearchQuery.value.toLowerCase();
  return payments.value.filter(
    (p) =>
      p.customer?.full_name?.toLowerCase().includes(query) ||
      p.receipt_number?.toLowerCase().includes(query) ||
      p.payment_method?.toLowerCase().includes(query)
  );
});

function toCurrency(value) {
  return formatCurrency(value);
}

function onExpenseReceipt(event) {
  expenseForm.receipt = event.target.files?.[0] || null;
}

function onPaymentAttachment(event) {
  paymentForm.attachment = event.target.files?.[0] || null;
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

async function fetchPayments() {
  loadingPayments.value = true;
  try {
    const { data } = await axios.get('/advance-payments');
    payments.value = data;
  } catch (e) {
    error(e.response?.data?.message || 'Failed to load advance payments.');
  } finally {
    loadingPayments.value = false;
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

async function createPayment() {
  savingPayment.value = true;
  try {
    const formData = new FormData();
    formData.append('customer_id', paymentForm.customer_id);
    formData.append('amount', paymentForm.amount);
    formData.append('payment_date', paymentForm.payment_date);
    formData.append('payment_method', paymentForm.payment_method || 'cash');
    formData.append('notes', paymentForm.notes || '');
    if (paymentForm.attachment) formData.append('attachment', paymentForm.attachment);

    await axios.post('/advance-payments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    success('Advance payment logged successfully!');
    paymentForm.customer_id = '';
    paymentForm.amount = '';
    paymentForm.notes = '';
    paymentForm.attachment = null;
    if (paymentAttachmentInput.value) paymentAttachmentInput.value.value = '';

    await fetchPayments();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to log advance payment. Please try again.');
  } finally {
    savingPayment.value = false;
  }
}

onMounted(async () => {
  await Promise.all([
    customersStore.fetchCustomers(),
    fetchExpenses(),
    fetchPayments(),
  ]);
});
</script>

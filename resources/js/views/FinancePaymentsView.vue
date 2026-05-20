<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <ReceiptPrintModal ref="receiptModal" />

    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Finance Hub</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Advance Payment Management</h1>
      <p class="text-sm text-gray-500 mt-1">Receive, search, and print customer advance payment receipts.</p>
    </div>

    <section class="card space-y-4">
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

      <label class="inline-flex items-center gap-2 text-sm text-gray-700">
        <input v-model="autoIssueInvoice" type="checkbox" class="rounded border-slate-300 text-primary-700 focus:ring-primary-500" />
        <span>Issue invoice immediately after saving</span>
      </label>

      <button class="btn-primary md:w-auto" :disabled="savingPayment" @click="createPayment">
        {{ savingPayment ? 'Processing...' : 'Log Advance Payment' }}
      </button>
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
            <div class="flex gap-2 flex-wrap">
              <button class="text-primary-700 font-semibold text-sm" @click="openReceipt(payment)">
                📄 Receipt
              </button>
              <button class="text-green-700 font-semibold text-sm" @click="openInvoice(payment)">
                🧾 Invoice
              </button>
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
import ReceiptPrintModal from '../components/ReceiptPrintModal.vue';
import { formatCurrency } from '../utils/currency';

const customersStore = useCustomersStore();
const { success, error } = useToast();

const payments = ref([]);
const loadingPayments = ref(false);
const savingPayment = ref(false);
const paymentSearchQuery = ref('');
const paymentAttachmentInput = ref(null);
const autoIssueInvoice = ref(true);

const receiptModal = ref(null);

const paymentForm = reactive({
  customer_id: '',
  amount: '',
  payment_date: new Date().toISOString().slice(0, 10),
  payment_method: 'cash',
  notes: '',
  attachment: null,
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

function onPaymentAttachment(event) {
  paymentForm.attachment = event.target.files?.[0] || null;
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

    const { data } = await axios.post('/advance-payments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    success('Advance payment logged successfully!');
    if (autoIssueInvoice.value && data?.id) {
      const selectedCustomer = customersStore.customers.find((customer) => Number(customer.id) === Number(paymentForm.customer_id));
      receiptModal.value?.open(data, 'invoice', selectedCustomer || null);
    }
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

function openReceipt(payment) {
  receiptModal.value?.open(payment, 'receipt', payment.customer || null);
}

function openInvoice(payment) {
  receiptModal.value?.open(payment, 'invoice', payment.customer || null);
}

onMounted(async () => {
  await Promise.all([
    customersStore.fetchCustomers(),
    fetchPayments(),
  ]);
});
</script>

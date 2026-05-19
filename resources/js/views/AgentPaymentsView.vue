<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Finance Hub</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Agent Payments</h1>
        <p class="text-sm text-gray-500 mt-1">Track ad-hoc money paid to agents for external tasks and support.</p>
      </div>
      <button v-if="isAdmin" type="button" class="btn-primary md:w-auto px-4 py-2" @click="openPaymentModal">
        Add Agent Payment
      </button>
    </div>

    <p v-if="!isAdmin" class="text-sm text-gray-600">Showing only your payment records.</p>

    <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Add Agent Payment</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closePaymentModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 grid grid-cols-1 gap-4">
          <select v-model="form.agent_user_id" class="input-field">
            <option value="">Select agent</option>
            <option v-for="agent in agents" :key="agent.id" :value="agent.id">
              {{ agent.name }}
            </option>
          </select>
          <input v-model="form.purpose" class="input-field" placeholder="Purpose (e.g., Site visit transport, emergency support)" />
          <input v-model.number="form.amount" type="number" min="0.01" step="0.01" class="input-field" placeholder="Amount" />
          <input v-model="form.payment_date" type="date" class="input-field" />
          <input v-model="form.payment_method" class="input-field" placeholder="Payment method (cash, bank, etc.)" />
          <textarea v-model="form.notes" class="input-field" rows="3" placeholder="Notes"></textarea>

          <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="closePaymentModal">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto" :disabled="saving" @click="createPayment">
              {{ saving ? 'Saving...' : 'Save Payment' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Payment Records</h2>
        <div class="flex gap-2">
          <input
            v-model="searchQuery"
            type="text"
            class="input-field flex-1 md:flex-none"
            placeholder="Search reference, purpose, agent..."
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="btn-secondary px-4 py-2">
            Reset
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-sm text-gray-500">Loading payments...</div>
      <div v-else-if="filteredPayments.length" class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-sm">
          <thead>
            <tr class="border-b border-gray-200 text-left text-gray-500">
              <th class="py-3 pr-4 font-semibold">Date</th>
              <th class="py-3 pr-4 font-semibold">Reference</th>
              <th class="py-3 pr-4 font-semibold">Agent</th>
              <th class="py-3 pr-4 font-semibold">Purpose</th>
              <th class="py-3 pr-4 font-semibold">Method</th>
              <th class="py-3 pr-4 font-semibold">Amount</th>
              <th class="py-3 pr-4 font-semibold">Notes</th>
              <th v-if="isAdmin" class="py-3 pr-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in filteredPayments" :key="payment.id" class="border-b border-gray-100 text-gray-700">
              <td class="py-3 pr-4 whitespace-nowrap">{{ payment.payment_date }}</td>
              <td class="py-3 pr-4 font-medium">{{ payment.reference_no }}</td>
              <td class="py-3 pr-4">{{ payment.agent?.name || 'N/A' }}</td>
              <td class="py-3 pr-4">{{ payment.purpose }}</td>
              <td class="py-3 pr-4">{{ payment.payment_method || 'cash' }}</td>
              <td class="py-3 pr-4 font-semibold">{{ toCurrency(payment.amount) }}</td>
              <td class="py-3 pr-4 max-w-xs truncate" :title="payment.notes || 'N/A'">{{ payment.notes || 'N/A' }}</td>
              <td v-if="isAdmin" class="py-3 pr-4">
                <button class="text-red-600 font-semibold text-xs" :disabled="saving" @click="removePayment(payment.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-sm text-gray-500">No agent payments recorded yet.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useToast } from '../composables/useToast';

const authStore = useAuthStore();
const { success, error } = useToast();

const isAdmin = computed(() => authStore.isAdmin);
const endpoint = computed(() => (isAdmin.value ? '/admin/agent-payments' : '/agent-payments'));

const payments = ref([]);
const agents = ref([]);
const loading = ref(false);
const saving = ref(false);
const showPaymentModal = ref(false);
const searchQuery = ref('');

const form = reactive({
  agent_user_id: '',
  purpose: '',
  amount: '',
  payment_date: new Date().toISOString().slice(0, 10),
  payment_method: 'cash',
  notes: '',
});

const filteredPayments = computed(() => {
  if (!searchQuery.value.trim()) return payments.value;

  const query = searchQuery.value.toLowerCase();
  return payments.value.filter((payment) =>
    payment.reference_no?.toLowerCase().includes(query) ||
    payment.purpose?.toLowerCase().includes(query) ||
    payment.agent?.name?.toLowerCase().includes(query)
  );
});

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function resetForm() {
  form.agent_user_id = '';
  form.purpose = '';
  form.amount = '';
  form.payment_date = new Date().toISOString().slice(0, 10);
  form.payment_method = 'cash';
  form.notes = '';
}

function openPaymentModal() {
  showPaymentModal.value = true;
}

function closePaymentModal() {
  showPaymentModal.value = false;
  resetForm();
}

async function fetchAgents() {
  if (!isAdmin.value) return;

  try {
    const { data } = await axios.get('/admin/agents');
    agents.value = Array.isArray(data) ? data : [];
  } catch (e) {
    agents.value = [];
    error('Failed to load agents.');
  }
}

async function fetchPayments() {
  loading.value = true;
  try {
    const { data } = await axios.get(endpoint.value);
    payments.value = Array.isArray(data) ? data : [];
  } catch (e) {
    payments.value = [];
    error(e.response?.data?.message || 'Failed to load agent payments.');
  } finally {
    loading.value = false;
  }
}

async function createPayment() {
  if (!isAdmin.value) return;

  saving.value = true;
  try {
    await axios.post('/admin/agent-payments', {
      agent_user_id: Number(form.agent_user_id),
      purpose: form.purpose,
      amount: Number(form.amount),
      payment_date: form.payment_date,
      payment_method: form.payment_method || 'cash',
      notes: form.notes || null,
    });

    success('Agent payment saved successfully!');
    closePaymentModal();
    await fetchPayments();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save agent payment.');
  } finally {
    saving.value = false;
  }
}

async function removePayment(id) {
  if (!isAdmin.value) return;
  if (!confirm('Delete this payment record?')) return;

  saving.value = true;
  try {
    await axios.delete(`/admin/agent-payments/${id}`);
    success('Agent payment deleted successfully!');
    await fetchPayments();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete payment.');
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  await Promise.all([
    fetchPayments(),
    fetchAgents(),
  ]);
});
</script>

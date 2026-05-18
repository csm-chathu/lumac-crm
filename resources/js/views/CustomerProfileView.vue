<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <router-link to="/customers" class="text-sm text-primary-700 hover:text-primary-900">Back to Customers</router-link>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Customer Profile</h1>
      </div>
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <button
          v-if="store.currentCustomer"
          @click="openQuoteModal"
          class="btn-secondary md:w-auto"
        >
          📄 Create Quote
        </button>
        <router-link
          v-if="store.currentCustomer?.solution_id"
          :to="`/customers/${route.params.id}/requirements`"
          class="btn-primary md:w-auto"
        >
          Open Requirement Checklist
        </router-link>
      </div>
    </div>

    <div v-if="store.loading" class="card text-gray-500">Loading customer profile...</div>

    <template v-else-if="customer">
      <section class="card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-gray-500">Full Name</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.full_name }}</p>
          </div>
          <div>
            <p class="text-gray-500">Company</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.company || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Contact</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.email || customer.phone || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Status</p>
            <p class="font-medium text-gray-800 mt-1">{{ statusLabel(customer.status) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Selected Solution</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.solution?.name || 'Not assigned' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Created</p>
            <p class="font-medium text-gray-800 mt-1">{{ formatDate(customer.created_at) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Contract Value</p>
            <p class="font-medium text-gray-800 mt-1">{{ toCurrency(customer.contract_value) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Paid / Remaining</p>
            <p class="font-medium text-gray-800 mt-1">{{ toCurrency(totalPaid) }} / {{ toCurrency(remainingBalance) }}</p>
          </div>
        </div>

        <div class="mt-4" v-if="customer.notes">
          <p class="text-gray-500 text-sm">Notes</p>
          <p class="text-gray-700 mt-1">{{ customer.notes }}</p>
        </div>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Requested Features</h2>
        <div v-if="requestedFeatures.length" class="space-y-3">
          <article v-for="feature in requestedFeatures" :key="feature.id" class="border border-gray-100 rounded-xl p-4">
            <h3 class="font-medium text-gray-800">{{ feature.solution_feature?.label || 'Feature' }}</h3>
            <p v-if="feature.notes" class="text-sm text-gray-600 mt-1">{{ feature.notes }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No requested features recorded yet.</p>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Timeline & History</h2>
        <div v-if="customer.activities?.length" class="space-y-4">
          <article v-for="activity in customer.activities" :key="activity.id" class="border-l-2 border-primary-200 pl-4">
            <p class="text-sm font-semibold text-gray-800">{{ activity.title }}</p>
            <p v-if="activity.description" class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ formatDate(activity.created_at, true) }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No activity events yet.</p>
      </section>
    </template>

    <div v-else class="card text-gray-500">Customer not found.</div>

    <!-- Quick Quote Modal -->
    <div v-if="showQuoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full space-y-4 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">Create Quote for {{ customer?.full_name }}</h3>
          <button @click="closeQuoteModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-700">Discount Rate (%)</label>
            <input v-model.number="quoteForm.discount_rate" type="number" min="0" max="100" step="0.01" class="input-field mt-1" placeholder="e.g., 35" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input v-model.number="quoteForm.commission_rate" type="number" min="0" max="100" step="0.01" class="input-field mt-1" placeholder="e.g., 10" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Items (optional)</label>
            <p class="text-xs text-gray-500 mt-1">Leave empty to skip items. You can add them on the Quotations page.</p>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button @click="closeQuoteModal" class="btn-secondary flex-1">Cancel</button>
          <button @click="createQuoteForCustomer" :disabled="creatingQuote" class="btn-primary flex-1">
            {{ creatingQuote ? 'Creating...' : 'Create & Open' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomersStore } from '../stores/customers';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const store = useCustomersStore();
const { success, error } = useToast();

const showQuoteModal = ref(false);
const creatingQuote = ref(false);
const quoteForm = reactive({
  discount_rate: 35,
  commission_rate: 10,
});

const customer = computed(() => store.currentCustomer);
const requestedFeatures = computed(() => (store.currentCustomer?.requirements || []).filter((item) => item.is_requested));
const totalPaid = computed(() => (store.currentCustomer?.advance_payments || []).reduce((sum, item) => sum + Number(item.amount || 0), 0));
const remainingBalance = computed(() => Math.max(Number(store.currentCustomer?.contract_value || 0) - totalPaid.value, 0));

function statusLabel(status) {
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(date, includeTime = false) {
  if (!date) return 'N/A';
  const options = includeTime
    ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
}

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function openQuoteModal() {
  showQuoteModal.value = true;
}

function closeQuoteModal() {
  showQuoteModal.value = false;
  quoteForm.discount_rate = 35;
  quoteForm.commission_rate = 10;
}

async function createQuoteForCustomer() {
  creatingQuote.value = true;
  try {
    const payload = {
      customer_id: customer.value.id,
      discount_rate: Number(quoteForm.discount_rate),
      commission_rate: Number(quoteForm.commission_rate),
      status: 'issued',
      items: [], // Empty items; user can add them on Quotations page
    };

    const { data } = await axios.post('/quotations', payload);
    success('Quote created successfully! Redirecting...');
    closeQuoteModal();

    // Redirect to quotations page after a brief delay
    setTimeout(() => {
      router.push('/quotations');
    }, 1000);
  } catch (e) {
    error(e.response?.data?.message || 'Failed to create quote. Please try again.');
  } finally {
    creatingQuote.value = false;
  }
}

onMounted(() => {
  store.fetchCustomer(route.params.id);
});
</script>

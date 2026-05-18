<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Quotation Center</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Build and Print Quotations</h1>
      <p class="text-sm text-gray-500 mt-1">Select customer, packages, and pricing margins to generate formal quotes.</p>
    </div>

    <section class="card space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">New Quotation</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select v-model="form.customer_id" class="input-field">
          <option value="">Select customer</option>
          <option v-for="customer in customersStore.customers" :key="customer.id" :value="customer.id">
            {{ customer.full_name }}
          </option>
        </select>

        <template v-if="isAgent">
          <input value="0" type="number" class="input-field" placeholder="Discount rate" disabled />
          <input value="30" type="number" class="input-field" placeholder="Commission rate" disabled />
        </template>
        <template v-else>
          <input v-model.number="form.discount_rate" type="number" min="0" max="100" step="0.01" class="input-field" placeholder="Discount rate" />
          <input v-model.number="form.commission_rate" type="number" min="0" max="100" step="0.01" class="input-field" placeholder="Commission rate" />
        </template>
      </div>

      <p v-if="isAgent" class="text-xs text-gray-500">For agents, discount is not applied and commission is fixed at 30%.</p>

      <div class="space-y-3 border border-gray-100 rounded-xl p-4">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <p class="text-sm font-semibold text-gray-800">Devices</p>
          <div class="flex items-center gap-3">
            <span class="text-xs text-gray-500">{{ selectedDeviceIds.length }} selected</span>
            <button
              type="button"
              class="btn-secondary md:w-auto"
              :disabled="!selectedDeviceIds.length"
              @click="addSelectedDevicesToBill"
            >
              Add Selected Devices to Bill
            </button>
          </div>
        </div>

        <div v-if="devices.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1">
          <button
            v-for="device in devices"
            :key="device.id"
            type="button"
            class="text-left rounded-lg border px-3 py-2 transition"
            :class="isDeviceSelected(device.id) ? 'border-primary-600 bg-primary-50 text-primary-900' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'"
            @click="toggleDeviceSelection(device.id)"
          >
            <p class="text-sm font-semibold">{{ device.name }}</p>
            <p class="text-xs text-gray-500">{{ device.model || 'No model' }}</p>
            <p class="text-xs font-medium mt-1">{{ toCurrency(device.selling_price) }}</p>
          </button>
        </div>
        <p v-else class="text-sm text-gray-500">No devices available.</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, idx) in form.items"
          :key="`item-${idx}`"
          class="grid grid-cols-1 md:grid-cols-5 gap-3 border border-gray-100 rounded-xl p-3"
        >
          <select v-model="item.solution_id" class="input-field" @change="applySolutionPrice(item)">
            <option value="">Custom Item</option>
            <option v-for="solution in solutionsStore.solutions" :key="solution.id" :value="solution.id">
              {{ solution.name }}
            </option>
          </select>

          <input v-model="item.item_name" class="input-field" placeholder="Item name" />
          <input v-model.number="item.quantity" type="number" min="1" class="input-field" placeholder="Qty" />
          <input v-model.number="item.unit_price" type="number" min="0" step="0.01" class="input-field" placeholder="Unit price" />

          <button type="button" class="w-full rounded-xl border border-red-200 text-red-600 font-semibold" @click="removeItem(idx)">
            Remove
          </button>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <button type="button" class="btn-secondary md:w-auto" @click="addItem">Add Item</button>
        <button type="button" class="btn-primary md:w-auto" :disabled="creating" @click="createQuotation">
          {{ creating ? 'Generating...' : 'Generate Quotation' }}
        </button>
      </div>
    </section>

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Quotation History</h2>
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full md:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            class="input-field w-full sm:flex-1 md:flex-none"
            placeholder="Search customer..."
          />
          <select v-model="filterStatus" class="input-field w-full sm:w-auto md:w-auto">
            <option value="">All statuses</option>
            <option value="issued">Issued</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button v-if="searchQuery || filterStatus" @click="resetQuoteFilters" class="btn-secondary px-4 py-2 w-full sm:w-auto">
            Reset
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-sm text-gray-500">Loading quotations...</div>

      <div v-else-if="filteredQuotations.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="quote in filteredQuotations" :key="quote.id" class="border rounded-lg p-4 shadow-sm">
          <div class="font-medium text-gray-800">Quote #: {{ quote.quote_number }}</div>
          <div class="text-gray-500">Customer: {{ quote.customer?.full_name || 'N/A' }}</div>
          <div class="text-gray-500">Status: {{ quote.status }}</div>
          <div class="text-gray-500">Final Total: {{ toCurrency(quote.final_total) }}</div>
          <div class="mt-2">
            <div class="flex gap-2">
              <button class="text-primary-700 font-semibold" @click="openPrint(quote.id, 'a4')">A4</button>
              <button class="text-primary-700 font-semibold" @click="openPrint(quote.id, 'thermal')">80mm</button>
            </div>
            <div class="flex gap-2 flex-wrap mt-2">
              <button class="text-primary-700 font-semibold text-xs" @click="openPrint(quote.id, 'a4')">HTML-A4</button>
              <button class="text-primary-700 font-semibold text-xs" @click="openPrint(quote.id, 'thermal')">HTML-80mm</button>
              <a :href="`/api/quotations/${quote.id}/pdf?size=a4`" target="_blank" rel="noopener noreferrer" class="text-green-600 font-semibold text-xs">PDF</a>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-gray-500">No quotations generated yet.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useCustomersStore } from '../stores/customers';
import { useSolutionsStore } from '../stores/solutions';
import { useToast } from '../composables/useToast';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const customersStore = useCustomersStore();
const solutionsStore = useSolutionsStore();
const { success, error } = useToast();

const quotations = ref([]);
const devices = ref([]);
const selectedDeviceIds = ref([]);
const loading = ref(false);
const creating = ref(false);
const searchQuery = ref('');
const filterStatus = ref('');
const isAgent = computed(() => authStore.isAgent);

const form = reactive({
  customer_id: '',
  discount_rate: isAgent.value ? 0 : 35,
  commission_rate: isAgent.value ? 30 : 10,
  items: [{ solution_id: '', item_name: '', quantity: 1, unit_price: 0 }],
});

const filteredQuotations = computed(() => {
  let results = quotations.value || [];

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter((q) =>
      q.customer?.full_name?.toLowerCase().includes(query) ||
      q.quote_number?.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (filterStatus.value) {
    results = results.filter((q) => q.status === filterStatus.value);
  }

  return results;
});

function resetQuoteFilters() {
  searchQuery.value = '';
  filterStatus.value = '';
}

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function addItem() {
  form.items.push({ solution_id: '', item_name: '', quantity: 1, unit_price: 0 });
}

function removeItem(index) {
  form.items.splice(index, 1);
  if (!form.items.length) addItem();
}

function applySolutionPrice(item) {
  const solution = solutionsStore.solutions.find((s) => s.id === Number(item.solution_id));
  if (!solution) return;

  item.item_name = solution.name;
  item.unit_price = Number(solution.base_price || 0);
}

function isDeviceSelected(deviceId) {
  return selectedDeviceIds.value.includes(Number(deviceId));
}

function toggleDeviceSelection(deviceId) {
  const id = Number(deviceId);
  if (isDeviceSelected(id)) {
    selectedDeviceIds.value = selectedDeviceIds.value.filter((selectedId) => selectedId !== id);
    return;
  }

  selectedDeviceIds.value.push(id);
}

function addSelectedDevicesToBill() {
  if (!selectedDeviceIds.value.length) return;

  const selectedDevices = devices.value.filter((device) => selectedDeviceIds.value.includes(device.id));
  selectedDevices.forEach((device) => {
    form.items.push({
      solution_id: '',
      item_name: device.model ? `${device.name} (${device.model})` : device.name,
      quantity: 1,
      unit_price: Number(device.selling_price || 0),
    });
  });

  selectedDeviceIds.value = [];
}

async function fetchDevices() {
  try {
    const { data } = await axios.get('/devices');
    devices.value = Array.isArray(data) ? data : [];
  } catch (e) {
    devices.value = [];
  }
}

async function fetchQuotations() {
  loading.value = true;
  try {
    const { data } = await axios.get('/quotations');
    quotations.value = data;
  } catch (e) {
    error(e.response?.data?.message || 'Failed to load quotations.');
  } finally {
    loading.value = false;
  }
}

async function createQuotation() {
  creating.value = true;
  try {
    const payload = {
      customer_id: Number(form.customer_id),
      discount_rate: isAgent.value ? 0 : Number(form.discount_rate),
      commission_rate: isAgent.value ? 30 : Number(form.commission_rate),
      status: 'issued',
      items: form.items.map((item) => ({
        solution_id: item.solution_id ? Number(item.solution_id) : null,
        item_name: item.item_name || null,
        quantity: Number(item.quantity || 1),
        unit_price: Number(item.unit_price || 0),
      })),
    };

    await axios.post('/quotations', payload);
    success('Quotation generated successfully!');
    await fetchQuotations();

    form.customer_id = '';
    form.discount_rate = isAgent.value ? 0 : 35;
    form.commission_rate = isAgent.value ? 30 : 10;
    form.items = [{ solution_id: '', item_name: '', quantity: 1, unit_price: 0 }];
    selectedDeviceIds.value = [];
  } catch (e) {
    error(e.response?.data?.message || 'Failed to create quotation. Please try again.');
  } finally {
    creating.value = false;
  }
}

async function openPrint(quoteId, mode = 'a4') {
  try {
    const { data } = await axios.get(`/quotations/${quoteId}/print`, {
      params: { mode },
      responseType: 'blob',
    });

    const blob = new Blob([data], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (e) {
    error('Failed to generate print view. Please try again.');
  }
}

onMounted(async () => {
  await Promise.all([
    customersStore.fetchCustomers(),
    solutionsStore.fetchSolutions(),
    fetchDevices(),
    fetchQuotations(),
  ]);
});
</script>

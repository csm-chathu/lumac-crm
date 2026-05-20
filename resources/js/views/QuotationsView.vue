<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Quotation Center</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Build and Print Quotations</h1>
        <p class="text-sm text-gray-500 mt-1">Select customer, packages, and pricing margins to generate formal quotes.</p>
      </div>

      <button type="button" class="btn-primary md:w-auto inline-flex items-center gap-2" @click="openQuotationModal">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>New Quotation</span>
      </button>
    </div>

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Quotation History</h2>
        <div class="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            class="input-field flex-1 min-w-[220px] md:w-64"
            placeholder="Search customer..."
          />
          <select v-model="filterStatus" class="input-field w-auto min-w-[150px]">
            <option value="">All statuses</option>
            <option value="issued">Issued</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <button v-if="searchQuery || filterStatus" @click="resetQuoteFilters" class="btn-secondary px-4 py-2 w-auto whitespace-nowrap">
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
            <div class="flex gap-2 flex-wrap">
              <button class="text-blue-600 font-semibold text-xs inline-flex items-center gap-1 hover:text-blue-800" @click="openPreview(quote.id)" title="Preview quotation">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Preview</span>
              </button>
  
              <button class="text-green-700 font-semibold text-xs inline-flex items-center gap-1 hover:text-green-900" @click="downloadAndSend(quote.id)" title="Download & Send via WhatsApp">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Download & Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-gray-500">No quotations generated yet.</p>
    </section>

    <div v-if="showQuotationModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-lg md:text-xl font-semibold text-gray-800">New Quotation</h2>
            <p class="text-sm text-gray-500 mt-1">Select customer, packages, and pricing margins to generate formal quotes.</p>
          </div>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeQuotationModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 md:p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select v-model="form.customer_id" class="input-field">
              <option value="">Select customer</option>
              <option v-for="customer in customersStore.customers" :key="customer.id" :value="customer.id">
                {{ customer.full_name }}
              </option>
            </select>

            <template v-if="isAgent">
              <input value="30" type="number" class="input-field" placeholder="Commission rate" disabled />
            </template>
            <template v-else>
              <input v-model.number="form.commission_rate" type="number" min="0" max="100" step="0.01" class="input-field" placeholder="Commission rate" />
            </template>
          </div>

          <p v-if="isAgent" class="text-xs text-gray-500">For agents, commission is fixed at 30% and calculated from solution items only.</p>

          <div class="space-y-3 border border-gray-100 rounded-xl p-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <p class="text-sm font-semibold text-gray-800">Devices</p>
              <span class="text-xs text-gray-500">Click to select devices for this quotation.</span>
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
                <div class="mb-2 h-24 w-full overflow-hidden rounded-md bg-slate-100 border border-slate-200">
                  <img
                    v-if="device.image_url"
                    :src="device.image_url"
                    :alt="device.name"
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="h-full w-full flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                </div>
                <p class="text-sm font-semibold">{{ device.name }}</p>
                <p class="text-xs text-gray-500">{{ device.model || 'No model' }}</p>
                <p class="text-xs font-medium mt-1">{{ toCurrency(device.selling_price) }}</p>
              </button>
            </div>
            <p v-else class="text-sm text-gray-500">No devices available.</p>

            <div class="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p class="text-xs text-gray-600">Selected devices: {{ selectedDeviceIds.length }}</p>
              <p class="text-xs font-semibold text-gray-800">Device Total: {{ toCurrency(selectedDevicesTotal) }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, idx) in form.items"
              :key="`item-${idx}`"
              class="grid grid-cols-1 md:grid-cols-4 gap-3 border border-gray-100 rounded-xl p-3"
            >
              <select v-model="item.solution_id" class="input-field" @change="applySolutionPrice(item)">
                <option value="">Select solution</option>
                <option v-for="solution in solutionsStore.solutions" :key="solution.id" :value="solution.id">
                  {{ solution.name }}
                </option>
              </select>

              <input v-model.number="item.quantity" type="number" min="1" class="input-field" placeholder="Qty" />
              <input v-model.number="item.unit_price" type="number" min="0" step="0.01" class="input-field" placeholder="Unit price" />

              <button type="button" class="w-full rounded-xl border border-red-200 text-red-600 font-semibold inline-flex items-center justify-center gap-2" @click="removeItem(idx)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                </svg>
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <button type="button" class="btn-secondary md:w-auto inline-flex items-center gap-2" @click="addItem">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Item</span>
            </button>
            <p class="text-sm font-semibold text-gray-800">Estimated Total: {{ toCurrency(estimatedTotal) }}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button type="button" class="btn-secondary md:w-auto inline-flex items-center gap-2" @click="closeQuotationModal">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancel</span>
              </button>
              <button type="button" class="btn-primary md:w-auto inline-flex items-center gap-2" :disabled="creating" @click="createQuotation">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>{{ creating ? 'Generating...' : 'Generate Quotation' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreviewModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div class="bg-white w-full h-full rounded-lg shadow-xl overflow-hidden flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-gray-100 px-5 md:px-6 py-4 flex-shrink-0">
          <h2 class="text-lg md:text-xl font-semibold text-gray-800">Quotation Preview</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closePreviewModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Preview Content -->
        <div class="flex-1 overflow-hidden">
          <iframe 
            :src="previewBlobUrl" 
            class="w-full h-full border-0"
            title="Quotation Preview">
          </iframe>
        </div>

        <!-- Modal Footer -->
        <div class="border-t border-gray-100 px-5 md:px-6 py-4 flex gap-3 justify-end flex-shrink-0">
          <button 
            type="button" 
            class="btn-secondary inline-flex items-center gap-2"
            @click="closePreviewModal"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useCustomersStore } from '../stores/customers';
import { useSolutionsStore } from '../stores/solutions';
import { useToast } from '../composables/useToast';
import { useAuthStore } from '../stores/auth';
import { formatCurrency } from '../utils/currency';
import { generateQuotationPDF, generateQuotationPDFBlob, openQuotationPreview, openWhatsAppWithNumber } from '../utils/quotationGenerator';

const authStore = useAuthStore();
const customersStore = useCustomersStore();
const solutionsStore = useSolutionsStore();
const { success, error } = useToast();

const quotations = ref([]);
const devices = ref([]);
const selectedDeviceIds = ref([]);
const loading = ref(false);
const creating = ref(false);
const showQuotationModal = ref(false);
const showPreviewModal = ref(false);
const previewBlobUrl = ref('');
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

const selectedDevices = computed(() =>
  devices.value.filter((device) => selectedDeviceIds.value.includes(Number(device.id)))
);

const selectedDevicesTotal = computed(() =>
  selectedDevices.value.reduce((sum, device) => sum + Number(device.selling_price || 0), 0)
);

const manualItemsTotal = computed(() =>
  form.items.reduce((sum, item) => sum + (Number(item.quantity || 0) * Number(item.unit_price || 0)), 0)
);

const estimatedTotal = computed(() => manualItemsTotal.value + selectedDevicesTotal.value);

function resetQuoteFilters() {
  searchQuery.value = '';
  filterStatus.value = '';
}

function toCurrency(value) {
  return formatCurrency(value);
}

function resetQuotationForm() {
  form.customer_id = '';
  form.discount_rate = isAgent.value ? 0 : 35;
  form.commission_rate = isAgent.value ? 30 : 10;
  form.items = [{ solution_id: '', item_name: '', quantity: 1, unit_price: 0 }];
  selectedDeviceIds.value = [];
}

function openQuotationModal() {
  showQuotationModal.value = true;
}

function closeQuotationModal() {
  showQuotationModal.value = false;
  resetQuotationForm();
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
    const manualItems = form.items.map((item) => ({
      solution_id: item.solution_id ? Number(item.solution_id) : null,
      item_name: item.item_name || null,
      quantity: Number(item.quantity || 1),
      unit_price: Number(item.unit_price || 0),
    }));

    const deviceItems = selectedDevices.value.map((device) => ({
      solution_id: null,
      item_name: device.model ? `${device.name} (${device.model})` : device.name,
      quantity: 1,
      unit_price: Number(device.selling_price || 0),
    }));

    const payload = {
      customer_id: Number(form.customer_id),
      discount_rate: isAgent.value ? 0 : Number(form.discount_rate),
      commission_rate: isAgent.value ? 30 : Number(form.commission_rate),
      status: 'issued',
      items: [...manualItems, ...deviceItems],
    };

    await axios.post('/quotations', payload);
    success('Quotation generated successfully!');
    await fetchQuotations();
    closeQuotationModal();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to create quotation. Please try again.');
  } finally {
    creating.value = false;
  }
}

async function openPrint(quoteId, mode = 'a4') {
  try {
    // Find the quotation from the loaded quotations
    const quotation = quotations.value.find((q) => q.id === quoteId);
    if (!quotation) {
      error('Quotation not found');
      return;
    }

    // Use the size parameter: 'a4' or 'a5'
    const size = mode === 'thermal' ? 'a5' : 'a4';
    
    // Open preview with print dialog
    openQuotationPreview(quotation, size);
  } catch (e) {
    error('Failed to generate print view. Please try again.');
  }
}

async function openPreview(quoteId) {
  try {
    const quotation = quotations.value.find((q) => q.id === quoteId);
    if (!quotation) {
      error('Quotation not found');
      return;
    }

    if (previewBlobUrl.value) {
      URL.revokeObjectURL(previewBlobUrl.value);
    }

    // Use the same PDF generation path as download so preview stays identical.
    const blob = await generateQuotationPDFBlob(quotation, 'a4');
    previewBlobUrl.value = URL.createObjectURL(blob);
    showPreviewModal.value = true;
  } catch (e) {
    error('Failed to open preview. Please try again.');
  }
}

function closePreviewModal() {
  if (previewBlobUrl.value) {
    URL.revokeObjectURL(previewBlobUrl.value);
  }
  showPreviewModal.value = false;
  previewBlobUrl.value = '';
}

function downloadPDF(quoteId, size = 'a4') {
  try {
    const quotation = quotations.value.find((q) => q.id === quoteId);
    if (!quotation) {
      error('Quotation not found');
      return;
    }
    generateQuotationPDF(quotation, size);
  } catch (e) {
    error('Failed to generate PDF. Please try again.');
  }
}

function downloadAndSend(quoteId) {
  try {
    const quotation = quotations.value.find((q) => q.id === quoteId);
    if (!quotation) {
      error('Quotation not found');
      return;
    }
    generateQuotationPDF(quotation, 'a4');
    if (quotation.customer && quotation.customer.phone) {
      setTimeout(() => {
        openWhatsAppWithNumber(quotation.customer.phone);
      }, 800);
    } else {
      error('Customer phone number not available');
    }
  } catch (e) {
    error('Failed to download and send.');
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

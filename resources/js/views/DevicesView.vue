<template>
  <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Device Management</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Quotation Devices</h1>
        <p class="text-sm text-gray-500 mt-1">Add and manage devices (e.g., printers, barcode scanners) with purchase and selling prices for quotations.</p>
      </div>
      <button v-if="canManage" type="button" class="btn-primary md:w-auto px-4 py-2" @click="openAddModal">
        Add Device
      </button>
    </div>

    <section v-if="!canManage" class="card">
      <p class="text-sm text-gray-600">You have view-only access for devices.</p>
    </section>

    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Add Device</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeAddModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="form.name" class="input-field" placeholder="Device name (e.g., Printer, Barcode Scanner)" />
            <input v-model="form.model" class="input-field" placeholder="Model/Description" />
            <input v-model.number="form.purchase_price" type="number" min="0" step="0.01" class="input-field" placeholder="Purchase price" />
            <input v-model.number="form.selling_price" type="number" min="0" step="0.01" class="input-field" placeholder="Selling price" />
          </div>

          <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="closeAddModal">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto" :disabled="saving" @click="addDevice">
              {{ saving ? 'Saving...' : 'Add Device' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="card">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Device List</h2>
      <div v-if="loading" class="text-sm text-gray-500">Loading devices...</div>
      <div v-else-if="devices.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="device in devices" :key="device.id" class="border rounded-lg p-4 shadow-sm">
          <div class="font-medium text-gray-800">Name: {{ device.name }}</div>
          <div class="text-gray-500">Model: {{ device.model }}</div>
          <div class="text-gray-500">Purchase Price: {{ toCurrency(device.purchase_price) }}</div>
          <div class="text-gray-500">Selling Price: {{ toCurrency(device.selling_price) }}</div>
          <div v-if="canManage" class="mt-2 flex gap-2">
            <button class="btn-secondary px-3 py-1 text-xs" @click="startEdit(device)">Edit</button>
            <button class="btn-secondary px-3 py-1 text-xs text-red-600" @click="deleteDevice(device.id)" :disabled="saving">Delete</button>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">No devices added yet.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { useToast } from '../composables/useToast';
import { useAuthStore } from '../stores/auth';

const { success, error } = useToast();
const auth = useAuthStore();
const canManage = computed(() => auth.isAdmin);
const devices = ref([]);
const loading = ref(false);
const saving = ref(false);
const showAddModal = ref(false);
const form = reactive({
  name: '',
  model: '',
  purchase_price: '',
  selling_price: '',
});
const editId = ref(null);
const editForm = reactive({
  name: '',
  model: '',
  purchase_price: '',
  selling_price: '',
});
function startEdit(device) {
  if (!canManage.value) return;
  editId.value = device.id;
  editForm.name = device.name;
  editForm.model = device.model;
  editForm.purchase_price = device.purchase_price;
  editForm.selling_price = device.selling_price;
}

function cancelEdit() {
  editId.value = null;
}

async function updateDevice(id) {
  if (!canManage.value) {
    error('Only admin can update devices.');
    return;
  }
  if (!editForm.name || !editForm.purchase_price || !editForm.selling_price) {
    error('Please fill all required fields.');
    return;
  }
  saving.value = true;
  try {
    await axios.put(`/devices/${id}`, {
      name: editForm.name,
      model: editForm.model,
      purchase_price: editForm.purchase_price,
      selling_price: editForm.selling_price,
    });
    success('Device updated successfully!');
    editId.value = null;
    await fetchDevices();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to update device.');
  } finally {
    saving.value = false;
  }
}

async function deleteDevice(id) {
  if (!canManage.value) {
    error('Only admin can delete devices.');
    return;
  }
  if (!confirm('Are you sure you want to delete this device?')) return;
  saving.value = true;
  try {
    await axios.delete(`/devices/${id}`);
    success('Device deleted successfully!');
    await fetchDevices();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete device.');
  } finally {
    saving.value = false;
  }
}

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function resetAddForm() {
  form.name = '';
  form.model = '';
  form.purchase_price = '';
  form.selling_price = '';
}

function openAddModal() {
  showAddModal.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
  resetAddForm();
}

async function fetchDevices() {
  loading.value = true;
  try {
    const { data } = await axios.get('/devices');
    devices.value = data;
  } catch (e) {
    error(e.response?.data?.message || 'Failed to load devices.');
  } finally {
    loading.value = false;
  }
}

async function addDevice() {
  if (!canManage.value) {
    error('Only admin can add devices.');
    return;
  }
  if (!form.name || !form.purchase_price || !form.selling_price) {
    error('Please fill all required fields.');
    return;
  }
  saving.value = true;
  try {
    await axios.post('/devices', form);
    success('Device added successfully!');
    closeAddModal();
    await fetchDevices();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to add device.');
  } finally {
    saving.value = false;
  }
}

onMounted(fetchDevices);
</script>

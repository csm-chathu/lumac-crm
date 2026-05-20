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

          <div class="space-y-2 border border-gray-100 rounded-lg p-4">
            <label class="block text-sm font-semibold text-gray-800">Device Image</label>
            <div v-if="form.image_url" class="flex items-start gap-3">
              <img :src="form.image_url" :alt="form.name" class="w-20 h-20 object-cover rounded border border-gray-200" />
              <div class="flex-1">
                <p class="text-xs text-gray-500 break-all mb-2">{{ form.image_url }}</p>
                <button
                  type="button"
                  @click="removeImage"
                  class="text-xs text-red-600 font-medium hover:text-red-800"
                >
                  Replace Image
                </button>
              </div>
            </div>
            <div v-else class="flex items-center gap-3">
              <input
                type="file"
                ref="imageInput"
                @change="handleImageSelect"
                accept="image/*"
                class="flex-1 text-sm"
                :disabled="uploading"
              />
              <button
                type="button"
                @click="uploadImage"
                :disabled="!form.imageFile || uploading"
                class="btn-secondary px-3 py-2 whitespace-nowrap text-sm"
              >
                {{ uploading ? 'Uploading...' : 'Upload' }}
              </button>
            </div>
            <div v-if="imageUploadError" class="text-sm text-red-600 mt-2">{{ imageUploadError }}</div>
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

    <div v-if="editId" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Edit Device</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="cancelEdit">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input v-model="editForm.name" class="input-field" placeholder="Device name (e.g., Printer, Barcode Scanner)" />
            <input v-model="editForm.model" class="input-field" placeholder="Model/Description" />
            <input v-model.number="editForm.purchase_price" type="number" min="0" step="0.01" class="input-field" placeholder="Purchase price" />
            <input v-model.number="editForm.selling_price" type="number" min="0" step="0.01" class="input-field" placeholder="Selling price" />
          </div>

          <div class="space-y-2 border border-gray-100 rounded-lg p-4">
            <label class="block text-sm font-semibold text-gray-800">Device Image</label>
            <div v-if="editForm.image_url" class="mb-3 flex items-start gap-3">
              <img :src="editForm.image_url" :alt="editForm.name" class="w-20 h-20 object-cover rounded border border-gray-200" />
              <button
                type="button"
                @click="editForm.image_url = ''"
                class="text-xs text-red-600 font-medium"
              >
                Remove Image
              </button>
            </div>
            <div v-else class="text-sm text-gray-500">No image uploaded yet</div>
          </div>

          <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="cancelEdit">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto" :disabled="saving" @click="updateDevice(editId)">
              {{ saving ? 'Saving...' : 'Update Device' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showImageModal && selectedDevice?.image_url" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">{{ selectedDevice.name }}</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="showImageModal = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center overflow-hidden p-4">
          <img :src="selectedDevice.image_url" :alt="selectedDevice.name" class="max-w-full max-h-full object-contain" />
        </div>
        <div class="bg-gray-50 px-5 py-4 border-t border-gray-100 space-y-2">
          <p class="text-sm"><strong>Model:</strong> {{ selectedDevice.model }}</p>
          <p class="text-sm"><strong>Purchase:</strong> {{ toCurrency(selectedDevice.purchase_price) }}</p>
          <p class="text-sm"><strong>Selling:</strong> {{ toCurrency(selectedDevice.selling_price) }}</p>
        </div>
      </div>
    </div>

    <section class="card">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Device List</h2>
      <div v-if="loading" class="text-sm text-gray-500">Loading devices...</div>
      <div v-else-if="devices.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="device in devices" :key="device.id" class="border rounded-lg p-4 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer" @click="showImageModal = true; selectedDevice = device">
          <div v-if="device.image_url" class="mb-3 -mx-4 -mt-4 mb-3">
            <img :src="device.image_url" :alt="device.name" class="w-full h-40 object-cover" />
          </div>
          <div class="font-medium text-gray-800">Name: {{ device.name }}</div>
          <div class="text-gray-500 text-sm">Model: {{ device.model }}</div>
          <div class="text-gray-500 text-sm">Purchase: {{ toCurrency(device.purchase_price) }}</div>
          <div class="text-gray-500 text-sm">Selling: {{ toCurrency(device.selling_price) }}</div>
          <div v-if="canManage" class="mt-3 flex gap-2">
            <button class="btn-secondary px-3 py-1 text-xs" @click.stop="startEdit(device)">Edit</button>
            <button class="btn-secondary px-3 py-1 text-xs text-red-600" @click.stop="deleteDevice(device.id)" :disabled="saving">Delete</button>
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
import { formatCurrency } from '../utils/currency';

const { success, error } = useToast();
const auth = useAuthStore();
const canManage = computed(() => auth.isAdmin);
const devices = ref([]);
const loading = ref(false);
const saving = ref(false);
const showAddModal = ref(false);
const showImageModal = ref(false);
const selectedDevice = ref(null);
const form = reactive({
  name: '',
  model: '',
  purchase_price: '',
  selling_price: '',
  image_url: '',
  imageFile: null,
});
const imageInput = ref(null);
const uploading = ref(false);
const imageUploadError = ref('');
const editId = ref(null);
const editForm = reactive({
  name: '',
  model: '',
  purchase_price: '',
  selling_price: '',
  image_url: '',
});
function startEdit(device) {
  if (!canManage.value) return;
  editId.value = device.id;
  editForm.name = device.name;
  editForm.model = device.model;
  editForm.purchase_price = device.purchase_price;
  editForm.selling_price = device.selling_price;
  editForm.image_url = device.image_url || '';
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
      image_url: editForm.image_url || null,
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
  return formatCurrency(value);
}

function handleImageSelect(event) {
  const file = event.target.files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      imageUploadError.value = 'Image size must be less than 5MB';
      return;
    }
    form.imageFile = file;
    imageUploadError.value = '';
  }
}

async function uploadImage() {
  if (!form.imageFile) {
    imageUploadError.value = 'Please select an image file first';
    return;
  }

  uploading.value = true;
  imageUploadError.value = '';

  try {
    // Get signature from backend
    const sigResponse = await axios.get('/cloudinary/signature');
    const { signature, timestamp, api_key, cloud_name, folder } = sigResponse.data;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', form.imageFile);
    cloudinaryFormData.append('api_key', api_key);
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('folder', folder);

    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(errorData.error?.message || 'Image upload failed');
    }

    const data = await uploadResponse.json();
    form.image_url = data.secure_url;
    success('Image uploaded successfully');
    form.imageFile = null;
    if (imageInput.value) {
      imageInput.value.value = '';
    }
  } catch (err) {
    imageUploadError.value = err.message || 'Failed to upload image';
    error(err.message || 'Failed to upload image');
  } finally {
    uploading.value = false;
  }
}

function removeImage() {
  form.image_url = '';
  form.imageFile = null;
  if (imageInput.value) {
    imageInput.value.value = '';
  }
}

function resetAddForm() {
  form.name = '';
  form.model = '';
  form.purchase_price = '';
  form.selling_price = '';
  form.image_url = '';
  form.imageFile = null;
  imageUploadError.value = '';
  if (imageInput.value) {
    imageInput.value.value = '';
  }
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
    await axios.post('/devices', {
      name: form.name,
      model: form.model,
      purchase_price: form.purchase_price,
      selling_price: form.selling_price,
      image_url: form.image_url || null,
    });
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

<template>
  <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Device Management</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Quotation Devices</h1>
        <p class="text-sm text-gray-500 mt-1">Add and manage devices (e.g., printers, barcode scanners) with purchase and selling prices for quotations.</p>
      </div>
      <button v-if="canManage" type="button" class="btn-primary md:w-auto min-w-[9rem] px-5 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap" @click="openAddModal">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
        </svg>
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
            <input v-model="form.model" class="input-field" placeholder="Model" />
            <input v-model.number="form.purchase_price" type="number" min="0" step="0.01" class="input-field" placeholder="Purchase price" />
            <input v-model.number="form.selling_price" type="number" min="0" step="0.01" class="input-field" placeholder="Selling price" />
          </div>

          <textarea v-model="form.description" class="input-field w-full" rows="3" placeholder="Description (optional)"></textarea>

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
            <div v-else class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="btn-secondary px-3 py-2 md:w-auto inline-flex items-center gap-2 text-sm"
                  :disabled="uploading || saving"
                  @click="openFilePicker"
                >
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-2.414-2.414A2 2 0 0013.586 4H4zm6 3a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V8a1 1 0 011-1z" />
                  </svg>
                  Choose Image
                </button>
                <button
                  type="button"
                  class="btn-secondary px-3 py-2 md:w-auto inline-flex items-center gap-2 text-sm"
                  :disabled="uploading || saving"
                  @click="openCameraModal"
                >
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4 6a2 2 0 012-2h1.382a1 1 0 00.894-.553l.447-.894A1 1 0 019.618 2h.764a1 1 0 01.894.553l.447.894A1 1 0 0012.618 4H14a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm6 2.5A3.5 3.5 0 1010 15a3.5 3.5 0 000-7z" />
                  </svg>
                  Take Photo
                </button>
              </div>
              <input
                type="file"
                ref="imageInput"
                @change="handleImageSelect"
                accept="image/*"
                class="hidden"
                :disabled="uploading || saving"
              />
              <div v-if="form.imageFile" class="flex items-start justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2">
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-700 truncate">{{ form.imageFile.name }}</p>
                  <p class="text-xs text-gray-500">Image will upload when you save the device.</p>
                </div>
                <button
                  type="button"
                  @click="removeImage"
                  class="text-xs text-red-600 font-medium hover:text-red-800 whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
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

    <div v-if="showCameraModal" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-xl overflow-hidden">
        <div class="border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Take Device Photo</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeCameraModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 space-y-4">
          <div class="bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
            <video ref="cameraVideo" autoplay playsinline muted class="w-full h-full object-cover"></video>
          </div>
          <div class="flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="closeCameraModal">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto inline-flex items-center gap-2" @click="capturePhoto">
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4 6a2 2 0 012-2h1.382a1 1 0 00.894-.553l.447-.894A1 1 0 019.618 2h.764a1 1 0 01.894.553l.447.894A1 1 0 0012.618 4H14a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm6 2.5A3.5 3.5 0 1010 15a3.5 3.5 0 000-7z" />
              </svg>
              Capture
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCropModal" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-2xl overflow-hidden">
        <div class="border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Crop and Edit Image</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="cancelCrop">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div class="mx-auto w-full max-w-md">
            <canvas
              ref="cropCanvas"
              width="420"
              height="420"
              class="w-full rounded-xl border border-gray-200 bg-gray-50 cursor-move touch-none"
              @mousedown="startCropDrag"
              @mousemove="onCropDrag"
              @mouseup="stopCropDrag"
              @mouseleave="stopCropDrag"
              @touchstart.prevent="startCropTouch"
              @touchmove.prevent="onCropTouch"
              @touchend.prevent="stopCropDrag"
            ></canvas>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <label class="block">
              <span class="text-sm text-gray-700 font-medium">Zoom</span>
              <input v-model.number="cropState.zoom" type="range" min="1" max="4" step="0.01" class="w-full mt-2" />
            </label>
            <div class="flex gap-2">
              <button type="button" class="btn-secondary px-3 py-2 md:w-auto" @click="rotateCrop(-90)">Rotate Left</button>
              <button type="button" class="btn-secondary px-3 py-2 md:w-auto" @click="rotateCrop(90)">Rotate Right</button>
              <button type="button" class="btn-secondary px-3 py-2 md:w-auto" @click="resetCrop">Reset</button>
            </div>
          </div>

          <p class="text-xs text-gray-500">Drag the image to reposition. Use zoom and rotate before applying.</p>

          <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="cancelCrop">Cancel</button>
            <button type="button" class="btn-primary px-4 py-2 md:w-auto" @click="applyCroppedImage">Apply Image</button>
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
            <input v-model="editForm.model" class="input-field" placeholder="Model" />
            <input v-model.number="editForm.purchase_price" type="number" min="0" step="0.01" class="input-field" placeholder="Purchase price" />
            <input v-model.number="editForm.selling_price" type="number" min="0" step="0.01" class="input-field" placeholder="Selling price" />
          </div>

          <textarea v-model="editForm.description" class="input-field w-full" rows="3" placeholder="Description (optional)"></textarea>

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
          <p v-if="selectedDevice.description" class="text-sm" style="white-space: pre-line;"><strong>Description:</strong><br>{{ selectedDevice.description }}</p>
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
          <div v-if="device.description" class="text-gray-500 text-sm mt-1" style="white-space: pre-line;">{{ device.description }}</div>
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
import { computed, ref, reactive, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
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
const showCameraModal = ref(false);
const showCropModal = ref(false);
const form = reactive({
  name: '',
  model: '',
  description: '',
  purchase_price: '',
  selling_price: '',
  image_url: '',
  imageFile: null,
});
const imageInput = ref(null);
const cameraVideo = ref(null);
const cameraStream = ref(null);
const cropCanvas = ref(null);
const cropImage = ref(null);
const cropSource = ref('');
const cropSourceObjectUrl = ref('');
const dragState = reactive({
  active: false,
  lastX: 0,
  lastY: 0,
});
const cropState = reactive({
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
});
const uploading = ref(false);
const imageUploadError = ref('');
const editId = ref(null);
const editForm = reactive({
  name: '',
  model: '',
  description: '',
  purchase_price: '',
  selling_price: '',
  image_url: '',
});
function startEdit(device) {
  if (!canManage.value) return;
  editId.value = device.id;
  editForm.name = device.name;
  editForm.model = device.model;
  editForm.description = device.description || '';
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
      description: editForm.description || null,
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

function revokeBlobUrl(url) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

function openFilePicker() {
  imageInput.value?.click();
}

function validateImageFile(file) {
  if (!file) return false;
  if (!file.type.startsWith('image/')) {
    imageUploadError.value = 'Please select a valid image file.';
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    imageUploadError.value = 'Image size must be less than 5MB';
    return false;
  }
  return true;
}

async function openCropperFromFile(file) {
  if (!validateImageFile(file)) {
    if (imageInput.value) {
      imageInput.value.value = '';
    }
    return;
  }
  imageUploadError.value = '';
  revokeBlobUrl(cropSourceObjectUrl.value);
  cropSourceObjectUrl.value = URL.createObjectURL(file);
  await openCropper(cropSourceObjectUrl.value);
}

async function openCropper(source) {
  cropSource.value = source;
  showCropModal.value = true;
  resetCrop();
  await nextTick();
  await loadCropImage();
}

function resetCrop() {
  cropState.zoom = 1;
  cropState.offsetX = 0;
  cropState.offsetY = 0;
  cropState.rotation = 0;
}

function rotateCrop(degree) {
  cropState.rotation = (cropState.rotation + degree + 360) % 360;
}

function startCropDrag(event) {
  dragState.active = true;
  dragState.lastX = event.clientX;
  dragState.lastY = event.clientY;
}

function onCropDrag(event) {
  if (!dragState.active) return;
  cropState.offsetX += event.clientX - dragState.lastX;
  cropState.offsetY += event.clientY - dragState.lastY;
  dragState.lastX = event.clientX;
  dragState.lastY = event.clientY;
}

function stopCropDrag() {
  dragState.active = false;
}

function startCropTouch(event) {
  const touch = event.touches?.[0];
  if (!touch) return;
  dragState.active = true;
  dragState.lastX = touch.clientX;
  dragState.lastY = touch.clientY;
}

function onCropTouch(event) {
  if (!dragState.active) return;
  const touch = event.touches?.[0];
  if (!touch) return;
  cropState.offsetX += touch.clientX - dragState.lastX;
  cropState.offsetY += touch.clientY - dragState.lastY;
  dragState.lastX = touch.clientX;
  dragState.lastY = touch.clientY;
}

function drawCropPreview() {
  const canvas = cropCanvas.value;
  const img = cropImage.value;
  if (!canvas || !img) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);

  const scaleToCover = Math.max(width / img.width, height / img.height);
  const scale = scaleToCover * cropState.zoom;

  ctx.save();
  ctx.translate(width / 2 + cropState.offsetX, height / 2 + cropState.offsetY);
  ctx.rotate((cropState.rotation * Math.PI) / 180);
  ctx.scale(scale, scale);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}

async function loadCropImage() {
  if (!cropSource.value) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  const loaded = new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  img.src = cropSource.value;

  try {
    await loaded;
    cropImage.value = img;
    drawCropPreview();
  } catch {
    error('Failed to load selected image.');
    cancelCrop();
  }
}

async function applyCroppedImage() {
  const canvas = cropCanvas.value;
  if (!canvas) return;

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
  if (!blob) {
    error('Failed to process image. Please try again.');
    return;
  }

  revokeBlobUrl(form.image_url);
  const outputUrl = URL.createObjectURL(blob);
  form.imageFile = new File([blob], `device-${Date.now()}.jpg`, { type: 'image/jpeg' });
  form.image_url = outputUrl;
  imageUploadError.value = '';
  cancelCrop();
}

function cancelCrop() {
  showCropModal.value = false;
  cropSource.value = '';
  cropImage.value = null;
  revokeBlobUrl(cropSourceObjectUrl.value);
  cropSourceObjectUrl.value = '';
}

function handleImageSelect(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  openCropperFromFile(file);
}

async function openCameraModal() {
  if (!navigator.mediaDevices?.getUserMedia) {
    error('Camera is not supported in this browser.');
    return;
  }

  try {
    showCameraModal.value = true;
    await nextTick();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });
    cameraStream.value = stream;
    if (cameraVideo.value) {
      cameraVideo.value.srcObject = stream;
    }
  } catch {
    showCameraModal.value = false;
    error('Could not access camera. Please allow permission and try again.');
  }
}

function stopCameraStream() {
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach((track) => track.stop());
    cameraStream.value = null;
  }
  if (cameraVideo.value) {
    cameraVideo.value.srcObject = null;
  }
}

function closeCameraModal() {
  showCameraModal.value = false;
  stopCameraStream();
}

async function capturePhoto() {
  const video = cameraVideo.value;
  if (!video || !video.videoWidth || !video.videoHeight) {
    error('Camera is not ready yet. Please try again.');
    return;
  }

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const ctx = tempCanvas.getContext('2d');
  ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
  const capturedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.92);
  closeCameraModal();
  await openCropper(capturedDataUrl);
}

async function uploadSelectedImage() {
  uploading.value = true;
  imageUploadError.value = '';

  try {
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
    return data.secure_url;
  } catch (err) {
    imageUploadError.value = err.message || 'Failed to upload image';
    throw err;
  } finally {
    uploading.value = false;
  }
}

function removeImage() {
  revokeBlobUrl(form.image_url);
  form.image_url = '';
  form.imageFile = null;
  if (imageInput.value) {
    imageInput.value.value = '';
  }
}

function resetAddForm() {
  revokeBlobUrl(form.image_url);
  form.name = '';
  form.model = '';
  form.description = '';
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
    const imageUrl = form.imageFile ? await uploadSelectedImage() : form.image_url || null;

    await axios.post('/devices', {
      name: form.name,
      model: form.model,
      description: form.description || null,
      purchase_price: form.purchase_price,
      selling_price: form.selling_price,
      image_url: imageUrl,
    });
    form.image_url = imageUrl || '';
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

watch(
  () => [cropState.zoom, cropState.offsetX, cropState.offsetY, cropState.rotation],
  drawCropPreview,
);

onBeforeUnmount(() => {
  stopCameraStream();
  revokeBlobUrl(form.image_url);
  revokeBlobUrl(cropSourceObjectUrl.value);
});
</script>

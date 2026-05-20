<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-4 md:pb-5">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 md:mb-6">
        <h1 class="font-bold text-2xl md:text-3xl text-gray-800">Categories</h1>
        <button @click="openAddModal"
                class="bg-primary-600 text-white text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium inline-flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>

      <!-- Type tabs -->
      <div class="flex gap-4 md:gap-6">
        <button v-for="t in ['expense', 'income']" :key="t"
                @click="activeTab = t"
                class="pb-2 text-sm font-medium capitalize transition-colors"
                :class="activeTab === t ? 'tab-active' : 'tab-inactive'">
          {{ t }}
        </button>
      </div>
    </div>

    <div class="px-4 md:px-6 lg:px-8 mt-4 md:mt-6">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        <div v-for="cat in filteredCategories" :key="cat.id"
             class="card text-center relative p-3 md:p-4">
          <div v-if="cat.gallery_images?.length" class="mb-2 md:mb-3">
            <img
              :src="cat.gallery_images[0]"
              :alt="`${cat.name} preview`"
              class="w-full h-24 object-cover rounded-xl border border-gray-100"
              @click="openGalleryViewer(cat, 0)"
            />
            <div class="mt-2 flex items-center justify-center gap-1.5">
              <template v-for="(img, index) in cat.gallery_images.slice(0, 3)" :key="`${cat.id}-thumb-${index}`">
                <img
                  :src="img"
                  :alt="`${cat.name} image ${index + 1}`"
                  class="w-8 h-8 rounded-md border border-gray-200 object-cover cursor-pointer"
                  @click="openGalleryViewer(cat, index)"
                />
              </template>
              <button
                v-if="cat.gallery_images.length > 3"
                type="button"
                class="text-[10px] font-semibold text-gray-500 hover:text-gray-700"
                @click="openGalleryViewer(cat, 3)"
              >
                +{{ cat.gallery_images.length - 3 }}
              </button>
            </div>
          </div>
          <div v-else class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3"
               :style="{ background: cat.color + '20' }">
            <span class="text-2xl md:text-3xl">{{ categoryEmoji(cat.icon) }}</span>
          </div>
          <p class="text-xs md:text-sm font-medium text-gray-700 truncate">{{ cat.name }}</p>
          <div class="absolute top-2 right-2 flex items-center gap-1">
            <button
              type="button"
              @click="openEditModal(cat)"
              class="text-gray-300 active:text-primary-500 p-1 hover:bg-primary-50 rounded"
              title="Edit category"
              aria-label="Edit category"
            >
              <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2m-6.586 13.414a2 2 0 010-2.828L14 8l2 2-7.414 7.414a2 2 0 01-1.414.586H5v-2.172a2 2 0 01.586-1.414z" />
              </svg>
            </button>
            <button @click="deleteCategory(cat)" class="text-gray-300 active:text-red-400 p-1 hover:bg-red-50 rounded" title="Delete category" aria-label="Delete category">
              <XMarkIcon class="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      <p v-if="!filteredCategories.length" class="text-center py-10 text-gray-400 text-sm">
        No {{ activeTab }} categories yet.
      </p>
    </div>

    <!-- Add Category Modal -->
        <div v-if="showAdd" class="fixed inset-0 bg-black/50 z-50 flex items-end"
          @click.self="closeAddModal">
      <div class="bg-white rounded-t-3xl w-full max-w-md mx-auto p-5 pb-8">
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <h2 class="font-bold text-base mb-4">{{ editingCategoryId ? 'Edit Category' : 'New Category' }}</h2>
        <div class="space-y-3">
          <input v-model="newCat.name" placeholder="Category name" class="input-field" />

          <div class="grid grid-cols-2 bg-gray-100 rounded-xl p-1">
            <button v-for="t in ['expense', 'income']" :key="t"
                    @click="newCat.type = t"
                    class="py-2 rounded-lg text-sm font-semibold transition-all capitalize"
                    :class="newCat.type === t ? 'bg-white text-gray-800 shadow' : 'text-gray-400'">
              {{ t }}
            </button>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Color</label>
            <input v-model="newCat.color" type="color" class="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" />
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-medium text-gray-500">Category Gallery Images</label>
            <div v-if="existingGalleryImages.length" class="grid grid-cols-4 gap-2">
              <div v-for="(img, index) in existingGalleryImages" :key="`existing-${index}`" class="relative">
                <img :src="img" alt="Category gallery image" class="w-full h-16 rounded-md border border-gray-200 object-cover" />
                <button
                  type="button"
                  class="absolute -top-1 -right-1 bg-white border border-gray-200 rounded-full w-5 h-5 text-xs text-red-600"
                  @click="removeExistingImage(index)"
                >
                  x
                </button>
              </div>
            </div>
            <input
              ref="categoryImagesInput"
              type="file"
              accept="image/*"
              multiple
              class="input-field"
              @change="onCategoryImagesSelect"
            />
            <div v-if="galleryPreviews.length" class="grid grid-cols-4 gap-2">
              <div v-for="(preview, index) in galleryPreviews" :key="`preview-${index}`" class="relative">
                <img :src="preview" alt="Category preview" class="w-full h-16 rounded-md border border-gray-200 object-cover" />
                <button
                  type="button"
                  class="absolute -top-1 -right-1 bg-white border border-gray-200 rounded-full w-5 h-5 text-xs text-red-600"
                  @click="removeSelectedImage(index)"
                >
                  x
                </button>
              </div>
            </div>
            <p v-if="galleryUploadError" class="text-xs text-red-600">{{ galleryUploadError }}</p>
          </div>

          <button @click="saveCategory" :disabled="!newCat.name || creatingCategory" class="btn-primary inline-flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ creatingCategory ? 'Saving...' : (editingCategoryId ? 'Update Category' : 'Add Category') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showGalleryViewer" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="closeGalleryViewer">
      <div class="bg-white rounded-2xl w-full max-w-4xl overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-sm md:text-base font-semibold text-gray-800 truncate">{{ galleryViewerCategoryName }} Gallery</h3>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeGalleryViewer" aria-label="Close gallery">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-4 md:p-5">
          <div class="bg-gray-900 rounded-xl overflow-hidden h-[50vh] flex items-center justify-center">
            <img
              v-if="currentGalleryImage"
              :src="currentGalleryImage"
              :alt="`${galleryViewerCategoryName} image ${galleryViewerIndex + 1}`"
              class="max-w-full max-h-full object-contain"
            />
          </div>

          <div class="mt-4 flex items-center justify-between gap-2">
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="showPrevImage" :disabled="galleryViewerImages.length <= 1">Previous</button>
            <p class="text-xs md:text-sm text-gray-600">
              {{ galleryViewerIndex + 1 }} / {{ galleryViewerImages.length }}
            </p>
            <button type="button" class="btn-secondary px-4 py-2 md:w-auto" @click="showNextImage" :disabled="galleryViewerImages.length <= 1">Next</button>
          </div>

          <div v-if="galleryViewerImages.length > 1" class="mt-4 grid grid-cols-6 md:grid-cols-10 gap-2">
            <button
              v-for="(img, index) in galleryViewerImages"
              :key="`viewer-thumb-${index}`"
              type="button"
              class="rounded-md overflow-hidden border-2"
              :class="index === galleryViewerIndex ? 'border-primary-500' : 'border-transparent'"
              @click="galleryViewerIndex = index"
            >
              <img :src="img" :alt="`Thumbnail ${index + 1}`" class="w-full h-12 object-cover" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCategoryStore } from '../stores/categories';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const store     = useCategoryStore();
const activeTab = ref('expense');
const showAdd   = ref(false);
const newCat    = ref({ name: '', type: 'expense', icon: 'circle', color: '#6366f1' });
const editingCategoryId = ref(null);
const existingGalleryImages = ref([]);
const categoryImagesInput = ref(null);
const categoryImageFiles = ref([]);
const galleryPreviews = ref([]);
const galleryUploadError = ref('');
const creatingCategory = ref(false);
const showGalleryViewer = ref(false);
const galleryViewerImages = ref([]);
const galleryViewerIndex = ref(0);
const galleryViewerCategoryName = ref('Category');

const iconMap = {
  'briefcase': '💼', 'laptop': '💻', 'trending-up': '📈', 'plus-circle': '➕',
  'utensils': '🍽️', 'car': '🚗', 'shopping-bag': '🛍️', 'file-text': '📋',
  'heart': '❤️', 'film': '🎬', 'book': '📚', 'more-horizontal': '⋯', 'circle': '⭕',
};
function categoryEmoji(icon) { return iconMap[icon] || '💳'; }

const filteredCategories = computed(() =>
  store.categories.filter(c => c.type === activeTab.value)
);

async function saveCategory() {
  creatingCategory.value = true;
  galleryUploadError.value = '';
  try {
    const uploadedImages = categoryImageFiles.value.length
      ? await uploadCategoryImages(categoryImageFiles.value)
      : [];
    const galleryImages = [...existingGalleryImages.value, ...uploadedImages];

    const payload = {
      ...newCat.value,
      gallery_images: galleryImages,
    };

    if (editingCategoryId.value) {
      await store.updateCategory(editingCategoryId.value, payload);
    } else {
      await store.createCategory(payload);
    }

    closeAddModal();
  } catch (err) {
    galleryUploadError.value = err.message || 'Failed to upload gallery images.';
  } finally {
    creatingCategory.value = false;
  }
}

async function deleteCategory(cat) {
  if (!confirm(`Delete "${cat.name}"?`)) return;
  await store.deleteCategory(cat.id);
}

function resetCategoryModal() {
  editingCategoryId.value = null;
  newCat.value = { name: '', type: 'expense', icon: 'circle', color: '#6366f1' };
  existingGalleryImages.value = [];
  categoryImageFiles.value = [];
  galleryPreviews.value.forEach((url) => URL.revokeObjectURL(url));
  galleryPreviews.value = [];
  galleryUploadError.value = '';
  if (categoryImagesInput.value) {
    categoryImagesInput.value.value = '';
  }
}

function openAddModal() {
  resetCategoryModal();
  showAdd.value = true;
}

function openEditModal(category) {
  resetCategoryModal();
  editingCategoryId.value = category.id;
  newCat.value = {
    name: category.name || '',
    type: category.type || 'expense',
    icon: category.icon || 'circle',
    color: category.color || '#6366f1',
  };
  existingGalleryImages.value = Array.isArray(category.gallery_images) ? [...category.gallery_images] : [];
  showAdd.value = true;
}

function closeAddModal() {
  showAdd.value = false;
  resetCategoryModal();
}

function onCategoryImagesSelect(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  galleryUploadError.value = '';
  const validFiles = [];
  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      galleryUploadError.value = 'Only image files are allowed.';
      continue;
    }
    if (file.size > 5 * 1024 * 1024) {
      galleryUploadError.value = 'Each image must be smaller than 5MB.';
      continue;
    }
    validFiles.push(file);
  }

  if (!validFiles.length) {
    event.target.value = '';
    return;
  }

  categoryImageFiles.value = [...categoryImageFiles.value, ...validFiles].slice(0, 12);
  galleryPreviews.value.forEach((url) => URL.revokeObjectURL(url));
  galleryPreviews.value = categoryImageFiles.value.map((file) => URL.createObjectURL(file));
  event.target.value = '';
}

function removeSelectedImage(index) {
  categoryImageFiles.value.splice(index, 1);
  galleryPreviews.value.forEach((url) => URL.revokeObjectURL(url));
  galleryPreviews.value = categoryImageFiles.value.map((file) => URL.createObjectURL(file));
}

function removeExistingImage(index) {
  existingGalleryImages.value.splice(index, 1);
}

function openGalleryViewer(category, index = 0) {
  const images = Array.isArray(category?.gallery_images) ? category.gallery_images : [];
  if (!images.length) return;

  galleryViewerImages.value = images;
  galleryViewerCategoryName.value = category?.name || 'Category';
  galleryViewerIndex.value = Math.min(Math.max(index, 0), images.length - 1);
  showGalleryViewer.value = true;
}

function closeGalleryViewer() {
  showGalleryViewer.value = false;
  galleryViewerImages.value = [];
  galleryViewerIndex.value = 0;
  galleryViewerCategoryName.value = 'Category';
}

function showPrevImage() {
  if (!galleryViewerImages.value.length) return;
  const total = galleryViewerImages.value.length;
  galleryViewerIndex.value = (galleryViewerIndex.value - 1 + total) % total;
}

function showNextImage() {
  if (!galleryViewerImages.value.length) return;
  const total = galleryViewerImages.value.length;
  galleryViewerIndex.value = (galleryViewerIndex.value + 1) % total;
}

const currentGalleryImage = computed(() => {
  if (!galleryViewerImages.value.length) return '';
  return galleryViewerImages.value[galleryViewerIndex.value] || '';
});

async function uploadCategoryImages(files) {
  const sigResponse = await axios.get('/cloudinary/signature');
  const { signature, timestamp, api_key, cloud_name, folder } = sigResponse.data;

  const uploads = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', api_key);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Image upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  });

  return Promise.all(uploads);
}

onMounted(() => store.fetchCategories());

onBeforeUnmount(() => {
  galleryPreviews.value.forEach((url) => URL.revokeObjectURL(url));
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-12 pb-4 md:pb-5">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 md:mb-6">
        <h1 class="font-bold text-2xl md:text-3xl text-gray-800">Categories</h1>
        <button @click="showAdd = true"
                class="bg-primary-600 text-white text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium">+ Add</button>
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
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3"
               :style="{ background: cat.color + '20' }">
            <span class="text-2xl md:text-3xl">{{ categoryEmoji(cat.icon) }}</span>
          </div>
          <p class="text-xs md:text-sm font-medium text-gray-700 truncate">{{ cat.name }}</p>
          <button @click="deleteCategory(cat)" class="absolute top-2 right-2 text-gray-300 active:text-red-400 p-1 hover:bg-red-50 rounded">
            <XMarkIcon class="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <p v-if="!filteredCategories.length" class="text-center py-10 text-gray-400 text-sm">
        No {{ activeTab }} categories yet.
      </p>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAdd" class="fixed inset-0 bg-black/50 z-50 flex items-end"
         @click.self="showAdd = false">
      <div class="bg-white rounded-t-3xl w-full max-w-md mx-auto p-5 pb-8">
        <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <h2 class="font-bold text-base mb-4">New Category</h2>
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

          <button @click="addCategory" :disabled="!newCat.name" class="btn-primary">
            Add Category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '../stores/categories';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const store     = useCategoryStore();
const activeTab = ref('expense');
const showAdd   = ref(false);
const newCat    = ref({ name: '', type: 'expense', icon: 'circle', color: '#6366f1' });

const iconMap = {
  'briefcase': '💼', 'laptop': '💻', 'trending-up': '📈', 'plus-circle': '➕',
  'utensils': '🍽️', 'car': '🚗', 'shopping-bag': '🛍️', 'file-text': '📋',
  'heart': '❤️', 'film': '🎬', 'book': '📚', 'more-horizontal': '⋯', 'circle': '⭕',
};
function categoryEmoji(icon) { return iconMap[icon] || '💳'; }

const filteredCategories = computed(() =>
  store.categories.filter(c => c.type === activeTab.value)
);

async function addCategory() {
  await store.createCategory({ ...newCat.value });
  newCat.value = { name: '', type: 'expense', icon: 'circle', color: '#6366f1' };
  showAdd.value = false;
}

async function deleteCategory(cat) {
  if (!confirm(`Delete "${cat.name}"?`)) return;
  await store.deleteCategory(cat.id);
}

onMounted(() => store.fetchCategories());
</script>

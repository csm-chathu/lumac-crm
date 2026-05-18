<template>
  <div class="space-y-4">
    <!-- Search bar -->
    <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          class="input-field w-full"
          :placeholder="searchPlaceholder"
        />
      </div>
      <div class="flex gap-2">
        <select v-if="filterOptions" v-model="selectedFilter" class="input-field md:w-auto">
          <option value="">All items</option>
          <option v-for="opt in filterOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <button v-if="searchQuery || (filterOptions && selectedFilter)" @click="resetFilters" class="btn-secondary px-4 py-2">
          Reset
        </button>
      </div>
    </div>

    <!-- No results -->
    <p v-if="!filteredAndFilteredItems.length" class="text-sm text-gray-500 text-center py-6">
      {{ emptyMessage }}
    </p>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 text-left text-gray-500">
            <th v-for="column in columns" :key="column.key" class="py-3 pr-4 font-semibold">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id" class="border-b border-gray-50 hover:bg-gray-50">
            <td v-for="column in columns" :key="column.key" class="py-3 pr-4">
              <slot :name="`cell-${column.key}`" :item="item">
                {{ getNestedValue(item, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination controls -->
    <div v-if="totalPages > 1" class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <span class="text-xs text-gray-500">
        Page {{ currentPage }} of {{ totalPages }}
        <span v-if="filteredAndFilteredItems.length"> ({{ filteredAndFilteredItems.length }} items) </span>
      </span>
      <div class="flex gap-2">
        <button
          :disabled="!hasPrevPage"
          @click="prevPage"
          class="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          :disabled="!hasNextPage"
          @click="nextPage"
          class="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePagination } from '../composables/usePagination';
import { useSearch } from '../composables/useSearch';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  searchFields: {
    type: Array,
    default: () => ['name'],
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  filterOptions: {
    type: Array,
    default: null,
  },
  filterKey: {
    type: String,
    default: null,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  emptyMessage: {
    type: String,
    default: 'No items found.',
  },
});

const selectedFilter = ref('');
const allItems = ref(props.items);

watch(
  () => props.items,
  (newItems) => {
    allItems.value = newItems;
  },
  { deep: true }
);

const { searchQuery, filteredItems, resetSearch } = useSearch(allItems, props.searchFields);

// Apply filter on top of search
const filteredAndFilteredItems = computed(() => {
  if (!props.filterKey || !selectedFilter.value) return filteredItems.value;
  return filteredItems.value.filter((item) => {
    return String(item[props.filterKey]) === String(selectedFilter.value);
  });
});

const { currentPage, paginatedItems, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = usePagination(
  computed(() => filteredAndFilteredItems.value),
  props.pageSize
);

const resetFilters = () => {
  resetSearch();
  selectedFilter.value = '';
};

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}
</script>

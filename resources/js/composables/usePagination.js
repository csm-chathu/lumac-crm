import { ref, computed } from 'vue';

export function usePagination(items, pageSize = 10) {
  const currentPage = ref(1);

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return items.value?.slice(start, end) || [];
  });

  const totalPages = computed(() => {
    return Math.ceil((items.value?.length || 0) / pageSize);
  });

  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  const nextPage = () => {
    if (hasNextPage.value) currentPage.value++;
  };

  const prevPage = () => {
    if (hasPrevPage.value) currentPage.value--;
  };

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages.value));
    currentPage.value = p;
  };

  const resetPage = () => {
    currentPage.value = 1;
  };

  return {
    currentPage,
    paginatedItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  };
}

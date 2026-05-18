import { ref, computed } from 'vue';

export function useSearch(items, searchFields = ['name']) {
  const searchQuery = ref('');

  const filteredItems = computed(() => {
    if (!searchQuery.value.trim()) return items.value || [];

    const query = searchQuery.value.toLowerCase();
    return (items.value || []).filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (!value) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  });

  const resetSearch = () => {
    searchQuery.value = '';
  };

  return {
    searchQuery,
    filteredItems,
    resetSearch,
  };
}

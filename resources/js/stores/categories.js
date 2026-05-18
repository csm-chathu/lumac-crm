import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categories', () => {
    const categories = ref([]);

    async function fetchCategories(type = null) {
        const params = type ? { type } : {};
        const { data } = await axios.get('/categories', { params });
        categories.value = data;
        return data;
    }

    async function createCategory(payload) {
        const { data } = await axios.post('/categories', payload);
        categories.value.push(data);
        return data;
    }

    async function deleteCategory(id) {
        await axios.delete(`/categories/${id}`);
        categories.value = categories.value.filter(c => c.id !== id);
    }

    return { categories, fetchCategories, createCategory, deleteCategory };
});

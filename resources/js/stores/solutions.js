import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSolutionsStore = defineStore('solutions', () => {
    const solutions = ref([]);
    const loading = ref(false);

    async function fetchSolutions() {
        loading.value = true;
        try {
            const { data } = await axios.get('/solutions');
            solutions.value = data;
            return data;
        } finally {
            loading.value = false;
        }
    }

    return { solutions, loading, fetchSolutions };
});

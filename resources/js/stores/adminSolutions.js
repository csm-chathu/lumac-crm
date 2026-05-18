import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminSolutionsStore = defineStore('admin-solutions', () => {
    const solutions = ref([]);
    const loading = ref(false);

    async function fetchSolutions() {
        loading.value = true;
        try {
            const { data } = await axios.get('/admin/solutions');
            solutions.value = data;
            return data;
        } finally {
            loading.value = false;
        }
    }

    async function createSolution(payload) {
        const { data } = await axios.post('/admin/solutions', payload);
        solutions.value.push(data);
        return data;
    }

    async function updateSolution(id, payload) {
        const { data } = await axios.put(`/admin/solutions/${id}`, payload);
        const idx = solutions.value.findIndex((item) => item.id === id);
        if (idx !== -1) solutions.value[idx] = data;
        return data;
    }

    async function deleteSolution(id) {
        await axios.delete(`/admin/solutions/${id}`);
        solutions.value = solutions.value.filter((item) => item.id !== id);
    }

    async function createFeature(solutionId, payload) {
        await axios.post(`/admin/solutions/${solutionId}/features`, payload);
        await fetchSolutions();
    }

    async function updateFeature(solutionId, featureId, payload) {
        await axios.put(`/admin/solutions/${solutionId}/features/${featureId}`, payload);
        await fetchSolutions();
    }

    async function deleteFeature(solutionId, featureId) {
        await axios.delete(`/admin/solutions/${solutionId}/features/${featureId}`);
        await fetchSolutions();
    }

    return {
        solutions,
        loading,
        fetchSolutions,
        createSolution,
        updateSolution,
        deleteSolution,
        createFeature,
        updateFeature,
        deleteFeature,
    };
});

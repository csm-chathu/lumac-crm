import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomersStore = defineStore('customers', () => {
    const customers = ref([]);
    const currentCustomer = ref(null);
    const loading = ref(false);

    async function fetchCustomers(params = {}) {
        loading.value = true;
        try {
            const { data } = await axios.get('/customers', { params });
            customers.value = data;
            return data;
        } finally {
            loading.value = false;
        }
    }

    async function createCustomer(payload) {
        const { data } = await axios.post('/customers', payload);
        customers.value.unshift(data);
        return data;
    }

    async function updateCustomer(id, payload) {
        const { data } = await axios.put(`/customers/${id}`, payload);
        const idx = customers.value.findIndex((item) => item.id === id);
        if (idx !== -1) customers.value[idx] = data;
        if (currentCustomer.value?.id === id) currentCustomer.value = data;
        return data;
    }

    async function fetchCustomer(id) {
        loading.value = true;
        try {
            const { data } = await axios.get(`/customers/${id}`);
            currentCustomer.value = data;
            return data;
        } finally {
            loading.value = false;
        }
    }

    async function saveRequirements(id, requirements) {
        const { data } = await axios.post(`/customers/${id}/requirements`, { requirements });
        currentCustomer.value = data;
        const idx = customers.value.findIndex((item) => item.id === id);
        if (idx !== -1) customers.value[idx] = data;
        return data;
    }

    async function deleteCustomer(id) {
        await axios.delete(`/customers/${id}`);
        customers.value = customers.value.filter((item) => item.id !== id);
        if (currentCustomer.value?.id === id) currentCustomer.value = null;
    }

    return {
        customers,
        currentCustomer,
        loading,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        fetchCustomer,
        saveRequirements,
        deleteCustomer,
    };
});

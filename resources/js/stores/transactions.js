import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTransactionStore = defineStore('transactions', () => {
    const transactions = ref([]);
    const pagination   = ref(null);
    const loading      = ref(false);

    async function fetchTransactions(params = {}) {
        loading.value = true;
        try {
            const { data } = await axios.get('/transactions', { params });
            transactions.value = data.data;
            pagination.value   = data;
        } finally {
            loading.value = false;
        }
    }

    async function createTransaction(payload) {
        const { data } = await axios.post('/transactions', payload);
        transactions.value.unshift(data);
        return data;
    }

    async function updateTransaction(id, payload) {
        const { data } = await axios.put(`/transactions/${id}`, payload);
        const idx = transactions.value.findIndex(t => t.id === id);
        if (idx !== -1) transactions.value[idx] = data;
        return data;
    }

    async function deleteTransaction(id) {
        await axios.delete(`/transactions/${id}`);
        transactions.value = transactions.value.filter(t => t.id !== id);
    }

    return { transactions, pagination, loading, fetchTransactions, createTransaction, updateTransaction, deleteTransaction };
});

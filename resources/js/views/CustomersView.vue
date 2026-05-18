<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Customer/Lead Management</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Register and Track Clients</h1>
      <p class="text-sm text-gray-500 mt-1">Create customer profiles and attach each one to a solution.</p>
    </div>

    <section class="card">
      <h2 class="font-semibold text-lg text-gray-800 mb-4">{{ editingCustomerId ? 'Edit Customer' : 'Register New Customer' }}</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="submitCustomer">
        <input v-model="form.full_name" type="text" class="input-field" placeholder="Full name" required />
        <input v-model="form.email" type="email" class="input-field" placeholder="Email" />
        <input v-model="form.phone" type="text" class="input-field" placeholder="Phone" />
        <input v-model="form.company" type="text" class="input-field" placeholder="Company" />

        <select v-model="form.solution_id" class="input-field">
          <option value="">Select solution</option>
          <option v-for="solution in solutionsStore.solutions" :key="solution.id" :value="solution.id">{{ solution.name }}</option>
        </select>

        <select v-model="form.status" class="input-field">
          <option v-for="status in statuses" :key="status" :value="status">{{ statusLabel(status) }}</option>
        </select>

        <input v-model.number="form.contract_value" type="number" min="0" step="0.01" class="input-field" placeholder="Contract value" />

        <textarea v-model="form.notes" class="input-field md:col-span-2" rows="3" placeholder="Lead notes"></textarea>

        <div class="md:col-span-2 flex justify-end">
          <div class="flex gap-3">
            <button v-if="editingCustomerId" type="button" class="btn-secondary md:w-auto px-8" @click="resetForm">Cancel</button>
            <button class="btn-primary md:w-auto px-8" :disabled="saving">{{ saving ? 'Saving...' : (editingCustomerId ? 'Update Customer' : 'Create Customer') }}</button>
          </div>
        </div>
      </form>
    </section>

    <section class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-lg text-gray-800">Customer Profiles</h2>
        <span class="text-xs text-gray-500">{{ customerStore.customers.length }} total</span>
      </div>

      <div v-if="customerStore.loading" class="text-gray-500 text-sm py-8">Loading customers...</div>

      <div v-else-if="customerStore.customers.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="customer in customerStore.customers" :key="customer.id" class="border rounded-lg p-4 shadow-sm">
          <div class="font-medium text-gray-800">Name: {{ customer.full_name }}</div>
          <div class="text-gray-500">Company: {{ customer.company || 'N/A' }}</div>
          <div class="text-gray-500">Solution: {{ customer.solution?.name || 'Not assigned' }}</div>
          <div class="text-gray-500">Status: {{ statusLabel(customer.status) }}</div>
          <div class="mt-2">
            <router-link
              :to="`/customers/${customer.id}`"
              class="text-primary-700 font-medium hover:text-primary-900"
            >
              View Profile
            </router-link>
          </div>
          <div class="mt-2">
            <router-link
              v-if="customer.solution_id"
              :to="`/customers/${customer.id}/requirements`"
              class="text-primary-700 font-medium hover:text-primary-900"
            >
              Open Checklist
            </router-link>
            <span v-else class="text-xs text-gray-400">Assign a solution first</span>
          </div>
          <div class="mt-2 flex gap-3 text-xs">
            <button class="text-primary-700 font-semibold" @click="startEdit(customer)">Edit</button>
            <button class="text-red-600 font-semibold" @click="removeCustomer(customer)">Delete</button>
          </div>
        </div>
      </div>

      <p v-else class="text-gray-500 text-sm py-6">No customers yet. Add your first lead above.</p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomersStore } from '../stores/customers';
import { useSolutionsStore } from '../stores/solutions';
import { useToast } from '../composables/useToast';

const route = useRoute();
const customerStore = useCustomersStore();
const solutionsStore = useSolutionsStore();
const { success, error } = useToast();
const saving = ref(false);
const editingCustomerId = ref(null);
const statuses = ['lead', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const form = reactive({
  full_name: '',
  email: '',
  phone: '',
  company: '',
  solution_id: '',
  status: 'lead',
  contract_value: '',
  notes: '',
});

function statusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

async function loadData() {
  await Promise.all([solutionsStore.fetchSolutions(), customerStore.fetchCustomers()]);

  if (route.query.solution_id) {
    form.solution_id = Number(route.query.solution_id);
  }
}

async function submitCustomer() {
  saving.value = true;
  try {
    const payload = {
      full_name: form.full_name,
      email: form.email || null,
      phone: form.phone || null,
      company: form.company || null,
      solution_id: form.solution_id || null,
      status: form.status,
      contract_value: form.contract_value || 0,
      notes: form.notes || null,
    };

    if (editingCustomerId.value) {
      await customerStore.updateCustomer(editingCustomerId.value, payload);
      success('Customer updated successfully!');
    } else {
      await customerStore.createCustomer(payload);
      success('Customer created successfully!');
    }

    resetForm();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save customer. Please try again.');
  } finally {
    saving.value = false;
  }
}

function startEdit(customer) {
  editingCustomerId.value = customer.id;
  form.full_name = customer.full_name || '';
  form.email = customer.email || '';
  form.phone = customer.phone || '';
  form.company = customer.company || '';
  form.solution_id = customer.solution_id || '';
  form.status = customer.status || 'lead';
  form.contract_value = customer.contract_value || '';
  form.notes = customer.notes || '';
}

function resetForm() {
  editingCustomerId.value = null;
  form.full_name = '';
  form.email = '';
  form.phone = '';
  form.company = '';
  form.solution_id = route.query.solution_id ? Number(route.query.solution_id) : '';
  form.status = 'lead';
  form.contract_value = '';
  form.notes = '';
}

async function removeCustomer(customer) {
  if (!confirm(`Delete ${customer.full_name}?`)) return;
  try {
    await customerStore.deleteCustomer(customer.id);
    success('Customer deleted successfully!');
    if (editingCustomerId.value === customer.id) {
      resetForm();
    }
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete customer. Please try again.');
  }
}

onMounted(loadData);
</script>

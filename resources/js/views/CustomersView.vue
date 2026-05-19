<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Customer/Lead Management</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Register and Track Clients</h1>
      <p class="text-sm text-gray-500 mt-1">Create customer profiles and attach each one to a solution.</p>
    </div>

    <div v-if="showCustomerModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="closeCustomerModal">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b px-6 py-4">
          <h2 class="font-semibold text-lg text-gray-800">{{ editingCustomerId ? 'Edit Customer' : 'Add Customer' }}</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeCustomerModal">✕</button>
        </div>

        <form class="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" @submit.prevent="submitCustomer">
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

          <div class="md:col-span-2 flex justify-end gap-3">
            <button type="button" class="btn-secondary md:w-auto px-8" @click="closeCustomerModal">Cancel</button>
            <button class="btn-primary md:w-auto px-8" :disabled="saving">{{ saving ? 'Saving...' : (editingCustomerId ? 'Update Customer' : 'Create Customer') }}</button>
          </div>
        </form>
      </div>
    </div>

    <section class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-semibold text-lg text-gray-800">Customer Profiles</h2>
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-500">{{ customerStore.customers.length }} total</span>
          <button type="button" class="btn-primary md:w-auto px-4 py-2" @click="openAddCustomerModal">Add Customer</button>
        </div>
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
              v-if="customer.solution_id"
              :to="`/customers/${customer.id}/requirements`"
              class="text-primary-700 font-medium hover:text-primary-900"
            >
              Open Checklist
            </router-link>
            <span v-else class="text-xs text-gray-400">Assign a solution first</span>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <router-link
              :to="`/customers/${customer.id}`"
              class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50"
              title="View Profile"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
              </svg>
            </router-link>

            <button
              type="button"
              class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50"
              title="Edit Customer"
              @click="startEdit(customer)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
              title="Delete Customer"
              @click="removeCustomer(customer)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11v6M14 11v6" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-gray-500 text-sm py-6">No customers yet. Click Add Customer to create your first lead.</p>
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
const showCustomerModal = ref(false);
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
    closeCustomerModal();
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
  showCustomerModal.value = true;
}

function openAddCustomerModal() {
  resetForm();
  showCustomerModal.value = true;
}

function closeCustomerModal() {
  showCustomerModal.value = false;
  resetForm();
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

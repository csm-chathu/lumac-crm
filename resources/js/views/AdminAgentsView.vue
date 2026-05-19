<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Admin Tools</p>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Agent Directory</h1>
        <p class="text-sm text-gray-500 mt-1">View, add, and update agent accounts in one place.</p>
      </div>
      <div class="flex items-center gap-2">
        <router-link to="/master-data/solutions" class="btn-secondary px-4 py-2 text-sm md:text-base whitespace-nowrap">
          Back to Solutions
        </router-link>
        <button type="button" class="btn-primary px-4 py-2 text-sm md:text-base whitespace-nowrap" @click="openAgentModal()">
          Add Agent
        </button>
      </div>
    </div>

    <div v-if="showAgentModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">{{ agentForm.editingId ? 'Edit Agent' : 'Add Agent' }}</h2>
          <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeAgentModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="saveAgent">
          <input v-model="agentForm.name" class="input-field" type="text" placeholder="Agent name" required />
          <input v-model="agentForm.email" class="input-field" type="email" placeholder="Email address" required />
          <input v-model="agentForm.password" class="input-field" type="password" :placeholder="agentForm.editingId ? 'New password (optional)' : 'Password'" :required="!agentForm.editingId" />
          <input v-model="agentForm.phone" class="input-field" type="text" placeholder="Phone number" />
          <select v-model="agentForm.status" class="input-field">
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <select v-model="agentForm.is_active" class="input-field">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </select>
          <input v-model.number="agentForm.commission_rate" class="input-field" type="number" min="0" max="100" step="0.01" placeholder="Commission rate (%)" />
          <div class="md:col-span-2 flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" class="btn-secondary px-4 py-2" @click="closeAgentModal">Cancel</button>
            <button type="submit" class="btn-primary px-4 py-2" :disabled="savingAgent">{{ savingAgent ? 'Saving...' : (agentForm.editingId ? 'Update Agent' : 'Create Agent') }}</button>
          </div>
        </form>
      </div>
    </div>

    <section class="card">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Active Agents</h2>
          <p class="text-sm text-gray-500">Admin can review agent contact details and profile status.</p>
        </div>
        <div class="flex items-center gap-2">
          <input v-model="searchQuery" type="text" class="input-field min-w-[220px]" placeholder="Search agents..." />
          <button v-if="searchQuery" type="button" class="btn-secondary px-4 py-2" @click="searchQuery = ''">Reset</button>
        </div>
      </div>

      <div v-if="loading" class="text-sm text-gray-500">Loading agents...</div>
      <div v-else-if="filteredAgents.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <article v-for="agent in filteredAgents" :key="agent.id" class="rounded-2xl border border-gray-100 p-4 bg-white">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="font-semibold text-gray-800">{{ agent.name }}</h3>
              <p class="text-sm text-gray-500">{{ agent.email }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="agent.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'">
                {{ agent.is_active ? 'Active' : 'Inactive' }}
              </span>
              <button type="button" class="text-xs font-semibold text-primary-700" @click="openAgentModal(agent)">Edit</button>
            </div>
          </div>

          <div class="mt-3 space-y-1 text-sm text-gray-600">
            <p>Phone: {{ agent.phone || getAgentProfile(agent)?.phone || 'N/A' }}</p>
            <p>Commission: {{ getAgentProfile(agent)?.commission_rate ?? 10 }}%</p>
            <p>Status: {{ getAgentProfile(agent)?.status || 'active' }}</p>
          </div>
        </article>
      </div>
      <p v-else class="text-sm text-gray-500">No agents found.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useToast } from '../composables/useToast';

const { success, error } = useToast();
const agents = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const showAgentModal = ref(false);
const savingAgent = ref(false);

const agentForm = ref({
  editingId: null,
  name: '',
  email: '',
  password: '',
  phone: '',
  commission_rate: 10,
  status: 'active',
  is_active: true,
});

function getAgentProfile(agent) {
  return agent?.agentProfile || agent?.agent_profile || null;
}

const filteredAgents = computed(() => {
  if (!searchQuery.value.trim()) return agents.value;

  const query = searchQuery.value.toLowerCase();
  return agents.value.filter((agent) =>
    agent.name?.toLowerCase().includes(query) ||
    agent.email?.toLowerCase().includes(query) ||
    agent.phone?.toLowerCase().includes(query) ||
    getAgentProfile(agent)?.phone?.toLowerCase().includes(query)
  );
});

async function fetchAgents() {
  loading.value = true;
  try {
    const { data } = await axios.get('/admin/agents');
    agents.value = Array.isArray(data) ? data : [];
  } catch (e) {
    agents.value = [];
    error(e.response?.data?.message || 'Failed to load agents.');
  } finally {
    loading.value = false;
  }
}

function resetAgentForm() {
  agentForm.value = {
    editingId: null,
    name: '',
    email: '',
    password: '',
    phone: '',
    commission_rate: 10,
    status: 'active',
    is_active: true,
  };
}

function openAgentModal(agent = null) {
  if (!agent) {
    resetAgentForm();
    showAgentModal.value = true;
    return;
  }

  agentForm.value = {
    editingId: agent.id,
    name: agent.name || '',
    email: agent.email || '',
    password: '',
    phone: agent.phone || getAgentProfile(agent)?.phone || '',
    commission_rate: getAgentProfile(agent)?.commission_rate ?? 10,
    status: getAgentProfile(agent)?.status || 'active',
    is_active: !!agent.is_active,
  };
  showAgentModal.value = true;
}

function closeAgentModal() {
  showAgentModal.value = false;
  resetAgentForm();
}

async function saveAgent() {
  savingAgent.value = true;
  try {
    const payload = {
      name: agentForm.value.name,
      email: agentForm.value.email,
      phone: agentForm.value.phone || null,
      commission_rate: agentForm.value.commission_rate === '' ? null : Number(agentForm.value.commission_rate),
      status: agentForm.value.status,
      is_active: !!agentForm.value.is_active,
    };

    if (!agentForm.value.editingId) {
      payload.password = agentForm.value.password;
      await axios.post('/admin/agents', payload);
      success('Agent created successfully.');
    } else {
      if (agentForm.value.password) payload.password = agentForm.value.password;
      await axios.put(`/admin/agents/${agentForm.value.editingId}`, payload);
      success('Agent updated successfully.');
    }

    closeAgentModal();
    await fetchAgents();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save agent.');
  } finally {
    savingAgent.value = false;
  }
}

onMounted(fetchAgents);
</script>
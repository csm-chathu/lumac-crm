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
            <div class="flex items-start gap-3 min-w-0">
              <div
                class="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold ring-1 ring-inset"
                :class="getAgentAvatarClass(agent.name)"
              >
                {{ getAgentInitials(agent.name) }}
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-gray-800 truncate">{{ agent.name }}</h3>
                <p class="text-sm text-gray-500 truncate">{{ agent.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="agent.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'">
                {{ agent.is_active ? 'Active' : 'Inactive' }}
              </span>
              <button
                type="button"
                class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-primary-700 hover:bg-primary-50"
                title="Edit agent"
                aria-label="Edit agent"
                @click="openAgentModal(agent)"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2m-6.586 13.414a2 2 0 010-2.828L14 8l2 2-7.414 7.414a2 2 0 01-1.414.586H5v-2.172a2 2 0 01.586-1.414z" />
                </svg>
                <span>Edit</span>
              </button>
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

function getAgentInitials(name) {
  const normalized = (name || '').trim();
  if (!normalized) return 'AG';

  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getAgentAvatarClass(name) {
  const palettes = [
    'bg-sky-100 text-sky-700 ring-sky-200',
    'bg-emerald-100 text-emerald-700 ring-emerald-200',
    'bg-amber-100 text-amber-700 ring-amber-200',
    'bg-rose-100 text-rose-700 ring-rose-200',
    'bg-indigo-100 text-indigo-700 ring-indigo-200',
  ];

  const value = (name || '').trim();
  if (!value) return palettes[0];

  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i) * (i + 1)) % palettes.length;
  }
  return palettes[hash];
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
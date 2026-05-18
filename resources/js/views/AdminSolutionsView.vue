<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Master Data</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Solutions Management</h1>
      <p class="text-sm text-gray-500 mt-1">Maintain the official solution catalog and checklist features used by agents.</p>
    </div>

    <section class="card">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">{{ editingSolutionId ? 'Edit Solution' : 'Add Solution' }}</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="saveSolution">
        <input v-model="solutionForm.name" type="text" class="input-field" placeholder="Solution name" required />
        <input v-model.number="solutionForm.base_price" type="number" min="0.01" step="0.01" class="input-field" placeholder="Base price" required />
        <input v-model="solutionForm.demo_url" type="url" class="input-field" placeholder="Demo URL" />
        <input v-model="solutionForm.demo_username" type="text" class="input-field" placeholder="Demo username" />
        <input v-model="solutionForm.demo_email" type="email" class="input-field" placeholder="Demo email" />
        <input v-model="solutionForm.demo_password" type="text" class="input-field" placeholder="Demo password" />
        <select v-model="solutionForm.is_active" class="input-field">
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
        <textarea v-model="solutionForm.description" rows="3" class="input-field md:col-span-2" placeholder="Description"></textarea>

        <div class="md:col-span-2 flex gap-3 justify-end">
          <button v-if="editingSolutionId" type="button" class="btn-secondary md:w-auto" @click="resetSolutionForm">Cancel</button>
          <button class="btn-primary md:w-auto" :disabled="savingSolution">{{ savingSolution ? 'Saving...' : (editingSolutionId ? 'Update Solution' : 'Create Solution') }}</button>
        </div>
      </form>
    </section>

    <section class="card">
      <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Catalog Entries</h2>
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full md:w-auto md:items-center">
          <input
            v-model="searchQuery"
            type="text"
            class="input-field w-full sm:flex-1 md:flex-none"
            placeholder="Search solutions..."
          />
          <select v-model="filterStatus" class="input-field w-full sm:w-auto md:w-auto">
            <option value="">All solutions</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          <button v-if="searchQuery || filterStatus" @click="resetFilters" class="btn-secondary px-4 py-2 w-full sm:w-auto">
            Reset
          </button>
        </div>
      </div>

      <div v-if="store.loading" class="text-sm text-gray-500">Loading solutions...</div>
      <div v-else-if="filteredSolutions.length" class="space-y-5">
        <article v-for="solution in filteredSolutions" :key="solution.id" class="border border-gray-100 rounded-2xl p-4">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <h3 class="font-semibold text-gray-800">{{ solution.name }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ solution.description || 'No description' }}</p>
              <p class="text-xs text-gray-500 mt-2">Base: {{ toCurrency(solution.base_price) }} | Agent: {{ toCurrency(solution.agent_price) }}</p>
            </div>
            <div class="flex gap-2">
              <button class="btn-secondary md:w-auto px-4 py-2" @click="startEditSolution(solution)">Edit</button>
              <button class="w-auto px-4 py-2 rounded-xl border border-red-200 text-red-600 font-semibold" @click="removeSolution(solution.id)">Delete</button>
            </div>
          </div>

          <div class="mt-4">
            <h4 class="font-medium text-sm text-gray-700 mb-2">Feature Checklist</h4>
            <div v-if="solution.features?.length" class="space-y-2">
              <div v-for="feature in solution.features" :key="feature.id" class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-gray-100 rounded-xl p-3">
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ feature.label }}</p>
                  <p class="text-xs text-gray-500">{{ feature.description || 'No description' }}</p>
                </div>
                <div class="flex gap-2">
                  <button class="text-xs font-semibold text-primary-700" @click="startEditFeature(solution.id, feature)">Edit</button>
                  <button class="text-xs font-semibold text-red-600" @click="removeFeature(solution.id, feature.id)">Delete</button>
                </div>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500">No features yet.</p>

            <form class="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3" @submit.prevent="saveFeature(solution.id)">
              <input v-model="featureForms[solution.id].feature_key" type="text" class="input-field" placeholder="feature_key" required />
              <input v-model="featureForms[solution.id].label" type="text" class="input-field" placeholder="Feature label" required />
              <input v-model="featureForms[solution.id].description" type="text" class="input-field" placeholder="Description" />
              <div class="flex gap-2">
                <button class="btn-primary px-4 py-2" :disabled="savingFeatureFor === solution.id">{{ savingFeatureFor === solution.id ? 'Saving...' : (featureForms[solution.id].editingId ? 'Update' : 'Add') }}</button>
                <button v-if="featureForms[solution.id].editingId" type="button" class="btn-secondary px-4 py-2" @click="resetFeatureForm(solution.id)">Cancel</button>
              </div>
            </form>
          </div>
        </article>
      </div>
      <p v-else class="text-sm text-gray-500">No solutions yet.</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useAdminSolutionsStore } from '../stores/adminSolutions';
import { useToast } from '../composables/useToast';
import { useSearch } from '../composables/useSearch';

const store = useAdminSolutionsStore();
const { success, error } = useToast();
const savingSolution = ref(false);
const savingFeatureFor = ref(null);
const editingSolutionId = ref(null);
const featureForms = reactive({});
const filterStatus = ref('');
const searchQuery = ref('');

const solutionForm = reactive({
  name: '',
  description: '',
  base_price: '',
  demo_url: '',
  demo_username: '',
  demo_email: '',
  demo_password: '',
  is_active: true,
});

const filteredSolutions = computed(() => {
  let results = store.solutions || [];

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        (s.description?.toLowerCase().includes(query) || false)
    );
  }

  // Apply status filter
  if (filterStatus.value !== '') {
    const isActive = filterStatus.value === '1';
    results = results.filter((s) => !!s.is_active === isActive);
  }

  return results;
});

function resetFilters() {
  searchQuery.value = '';
  filterStatus.value = '';
}

function toCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
}

function ensureFeatureForm(solutionId) {
  if (!featureForms[solutionId]) {
    featureForms[solutionId] = {
      editingId: null,
      feature_key: '',
      label: '',
      description: '',
      sort_order: 0,
    };
  }
}

function resetSolutionForm() {
  editingSolutionId.value = null;
  solutionForm.name = '';
  solutionForm.description = '';
  solutionForm.base_price = '';
  solutionForm.demo_url = '';
  solutionForm.demo_username = '';
  solutionForm.demo_email = '';
  solutionForm.demo_password = '';
  solutionForm.is_active = true;
}

function resetFeatureForm(solutionId) {
  ensureFeatureForm(solutionId);
  featureForms[solutionId].editingId = null;
  featureForms[solutionId].feature_key = '';
  featureForms[solutionId].label = '';
  featureForms[solutionId].description = '';
  featureForms[solutionId].sort_order = 0;
}

function startEditSolution(solution) {
  editingSolutionId.value = solution.id;
  solutionForm.name = solution.name;
  solutionForm.description = solution.description || '';
  solutionForm.base_price = Number(solution.base_price);
  solutionForm.demo_url = solution.demo_url || '';
  solutionForm.demo_username = solution.demo_username || '';
  solutionForm.demo_email = solution.demo_email || '';
  solutionForm.demo_password = solution.demo_password || '';
  solutionForm.is_active = !!solution.is_active;
}

function startEditFeature(solutionId, feature) {
  ensureFeatureForm(solutionId);
  featureForms[solutionId].editingId = feature.id;
  featureForms[solutionId].feature_key = feature.feature_key;
  featureForms[solutionId].label = feature.label;
  featureForms[solutionId].description = feature.description || '';
  featureForms[solutionId].sort_order = feature.sort_order || 0;
}

async function saveSolution() {
  savingSolution.value = true;
  try {
    const payload = {
      name: solutionForm.name,
      description: solutionForm.description || null,
      base_price: Number(solutionForm.base_price),
      demo_url: solutionForm.demo_url || null,
      demo_username: solutionForm.demo_username || null,
      demo_email: solutionForm.demo_email || null,
      demo_password: solutionForm.demo_password || null,
      is_active: !!solutionForm.is_active,
    };

    if (editingSolutionId.value) {
      await store.updateSolution(editingSolutionId.value, payload);
      success('Solution updated successfully!');
    } else {
      await store.createSolution(payload);
      success('Solution created successfully!');
    }

    resetSolutionForm();
    await store.fetchSolutions();
    hydrateFeatureForms();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save solution. Please try again.');
  } finally {
    savingSolution.value = false;
  }
}

async function removeSolution(solutionId) {
  if (!confirm('Delete this solution and all its features?')) return;
  try {
    await store.deleteSolution(solutionId);
    success('Solution deleted successfully!');
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete solution. Please try again.');
  }
}

async function saveFeature(solutionId) {
  ensureFeatureForm(solutionId);
  const form = featureForms[solutionId];
  savingFeatureFor.value = solutionId;

  try {
    const payload = {
      feature_key: form.feature_key,
      label: form.label,
      description: form.description || null,
      sort_order: form.sort_order || 0,
    };

    if (form.editingId) {
      await store.updateFeature(solutionId, form.editingId, payload);
      success('Feature updated successfully!');
    } else {
      await store.createFeature(solutionId, payload);
      success('Feature added successfully!');
    }

    resetFeatureForm(solutionId);
    hydrateFeatureForms();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save feature. Please try again.');
  } finally {
    savingFeatureFor.value = null;
  }
}

async function removeFeature(solutionId, featureId) {
  if (!confirm('Delete this feature?')) return;
  try {
    await store.deleteFeature(solutionId, featureId);
    success('Feature deleted successfully!');
    hydrateFeatureForms();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete feature. Please try again.');
  }
}

function hydrateFeatureForms() {
  for (const solution of store.solutions) {
    ensureFeatureForm(solution.id);
  }
}

onMounted(async () => {
  await store.fetchSolutions();
  hydrateFeatureForms();
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <router-link to="/customers" class="text-sm text-primary-700 hover:text-primary-900">Back to Customers</router-link>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Requirement Gathering</h1>
        <p class="text-sm text-gray-500 mt-1">Capture client feature requests and save them directly to this customer profile.</p>
      </div>
      <button class="btn-primary md:w-auto" :disabled="saving || store.loading" @click="saveAll">
        {{ saving ? 'Saving...' : 'Save Requirements' }}
      </button>
    </div>

    <section v-if="store.currentCustomer" class="card">
      <h2 class="text-lg font-semibold text-gray-800">Customer</h2>
      <div class="mt-2 text-sm text-gray-600">
        <p><span class="font-medium">Name:</span> {{ store.currentCustomer.full_name }}</p>
        <p><span class="font-medium">Company:</span> {{ store.currentCustomer.company || 'N/A' }}</p>
        <p><span class="font-medium">Solution:</span> {{ store.currentCustomer.solution?.name || 'N/A' }}</p>
      </div>
    </section>

    <section v-if="store.currentCustomer?.solution?.features?.length" class="card">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Interactive Feature Checklist</h2>
      <p class="text-sm text-gray-500 mb-5">Check features requested by the client and add notes where needed.</p>

      <div class="space-y-4">
        <article v-for="item in checklist" :key="item.solution_feature_id" class="rounded-xl border border-gray-200 p-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="font-medium text-gray-800">{{ item.label }}</h3>
              <p v-if="item.description" class="text-sm text-gray-500 mt-1">{{ item.description }}</p>
            </div>

            <label class="inline-flex items-center gap-2 text-sm">
              <input v-model="item.is_requested" type="checkbox" class="w-4 h-4 accent-green-600" />
              Requested
            </label>
          </div>

          <textarea
            v-model="item.notes"
            class="input-field mt-3"
            rows="2"
            placeholder="Requirement notes (priority, assumptions, custom scope, etc.)"
          ></textarea>
        </article>
      </div>
    </section>

    <section v-else-if="store.loading" class="card text-gray-500">Loading requirement profile...</section>

    <section v-else class="card text-gray-500">
      This customer has no solution with a checklist. Assign a solution in the customer profile first.
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomersStore } from '../stores/customers';

const route = useRoute();
const store = useCustomersStore();
const saving = ref(false);
const checklist = ref([]);

function hydrateChecklist() {
  const customer = store.currentCustomer;
  const features = customer?.solution?.features || [];
  const current = customer?.requirements || [];

  checklist.value = features.map((feature) => {
    const existing = current.find((item) => item.solution_feature_id === feature.id);

    return {
      solution_feature_id: feature.id,
      label: feature.label,
      description: feature.description,
      is_requested: existing?.is_requested ?? false,
      notes: existing?.notes || '',
    };
  });
}

async function loadCustomer() {
  await store.fetchCustomer(route.params.id);
  hydrateChecklist();
}

async function saveAll() {
  saving.value = true;
  try {
    await store.saveRequirements(route.params.id, checklist.value.map((item) => ({
      solution_feature_id: item.solution_feature_id,
      is_requested: !!item.is_requested,
      notes: item.notes || null,
    })));
    hydrateChecklist();
  } finally {
    saving.value = false;
  }
}

onMounted(loadCustomer);

const hasData = computed(() => checklist.value.length > 0);
</script>

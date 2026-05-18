<template>
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
    <div>
      <p class="text-xs uppercase tracking-wide text-primary-700 font-semibold">Agent Dashboard</p>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Menu</h1>
    </div>

    <section class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mt-6">
      <router-link
        v-for="tile in menuTiles"
        :key="tile.label"
        :to="tile.to"
        class="card !p-4 hover:border-primary-300 hover:shadow-md transition-all"
      >
        <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
          <component :is="tile.icon" class="w-5 h-5" />
        </div>
        <p class="text-sm font-semibold text-gray-800 mt-3">{{ tile.label }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ tile.description }}</p>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  RectangleGroupIcon,
} from '@heroicons/vue/24/outline';

const menuTiles = [
  { label: 'Dashboard', description: 'Overview', to: '/', icon: HomeIcon },
  { label: 'Customers', description: 'Client list', to: '/customers', icon: UserGroupIcon },
  { label: 'Quotations', description: 'Price offers', to: '/quotations', icon: ClipboardDocumentListIcon },
  { label: 'Expenses', description: 'Cost tracking', to: '/finance/expenses', icon: CurrencyDollarIcon },
  { label: 'Payments', description: 'Advance receipts', to: '/finance/payments', icon: BanknotesIcon },
  { label: 'Devices', description: 'Quotation hardware', to: '/devices', icon: RectangleGroupIcon },
  { label: 'Transactions', description: 'Ledger', to: '/transactions', icon: ArrowsRightLeftIcon },
  { label: 'Profile', description: 'My account', to: '/profile', icon: UserCircleIcon },
];
</script>

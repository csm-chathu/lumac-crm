<template>
  <div class="flex items-center gap-2 md:gap-3 py-2 md:py-3 border-b border-gray-50 last:border-0">
    <!-- Icon -->
    <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
         :style="{ background: (transaction.category?.color || '#9ca3af') + '20' }">
      <span class="text-lg md:text-xl">{{ categoryEmoji(transaction.category?.icon) }}</span>
    </div>
    <!-- Details -->
    <div class="flex-1 min-w-0">
      <p class="font-medium text-sm md:text-base text-gray-800 truncate">
        {{ transaction.description || transaction.category?.name || 'Transaction' }}
      </p>
      <p class="text-xs md:text-sm text-gray-400">
        {{ transaction.category?.name }} · {{ formatDate(transaction.transaction_date) }}
      </p>
    </div>
    <!-- Amount -->
    <span class="font-semibold text-sm md:text-base flex-shrink-0"
          :class="transaction.type === 'income' ? 'text-primary-600' : 'text-red-500'">
      {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
    </span>
  </div>
</template>

<script setup>
defineProps({ transaction: Object });

const iconMap = {
  'briefcase': '💼', 'laptop': '💻', 'trending-up': '📈', 'plus-circle': '➕',
  'utensils': '🍽️', 'car': '🚗', 'shopping-bag': '🛍️', 'file-text': '📋',
  'heart': '❤️', 'film': '🎬', 'book': '📚', 'more-horizontal': '⋯',
  'circle': '⭕',
};

function categoryEmoji(icon) {
  return iconMap[icon] || '💳';
}

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
</script>

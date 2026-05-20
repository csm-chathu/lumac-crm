<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-900">{{ documentType === 'invoice' ? 'Invoice' : 'Receipt' }}</h2>
        <div class="flex gap-2">
          <button @click="handlePrint" class="btn-primary px-4 py-2 text-sm">
            <PrinterIcon class="w-4 h-4 inline mr-1" />
            Print
          </button>
          <button @click="close" class="btn-secondary px-4 py-2 text-sm">Close</button>
        </div>
      </div>

      <!-- Receipt Content -->
      <div ref="printContent" class="p-8 bg-white">
        <!-- Header -->
        <div class="text-center mb-6">
          <div class="text-2xl font-bold text-primary-900">LUMAC</div>
          <div class="text-sm text-gray-600">{{ documentType === 'invoice' ? 'INVOICE' : 'RECEIPT' }}</div>
        </div>

        <!-- Document Number and Date -->
        <div class="grid grid-cols-2 gap-4 mb-6 pb-4 border-b">
          <div>
            <div class="text-xs text-gray-500 uppercase">{{ documentType === 'invoice' ? 'Invoice' : 'Receipt' }} #</div>
            <div class="font-semibold text-lg">{{ payment?.receipt_number || 'N/A' }}</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500 uppercase">Date</div>
            <div class="font-semibold">{{ formatDate(payment?.payment_date) }}</div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="mb-6">
          <div class="text-xs text-gray-500 uppercase font-semibold mb-2">Bill To</div>
          <div class="text-gray-900">
            <div class="font-semibold">{{ payment?.customer?.full_name || 'N/A' }}</div>
            <div v-if="payment?.customer?.email" class="text-sm text-gray-600">{{ payment.customer.email }}</div>
            <div v-if="payment?.customer?.phone_number" class="text-sm text-gray-600">{{ payment.customer.phone_number }}</div>
          </div>
        </div>

        <!-- Amount Section -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs text-gray-500 uppercase">Amount</div>
              <div class="text-2xl font-bold text-primary-700">{{ toCurrency(payment?.amount) }}</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500 uppercase">Payment Method</div>
              <div class="font-semibold text-gray-900">{{ capitalize(payment?.payment_method) }}</div>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="mb-6">
          <table class="w-full text-sm">
            <tbody>
              <tr v-if="payment?.notes" class="border-b">
                <td class="text-gray-600 py-2">Notes:</td>
                <td class="text-gray-900 font-semibold py-2">{{ payment.notes }}</td>
              </tr>
              <tr class="border-b">
                <td class="text-gray-600 py-2">Status:</td>
                <td class="text-gray-900 font-semibold py-2">{{ payment?.status || 'Completed' }}</td>
              </tr>
              <tr>
                <td class="text-gray-600 py-2">Created:</td>
                <td class="text-gray-900 font-semibold py-2">{{ formatDateTime(payment?.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="border-t pt-4 mt-8 text-center text-xs text-gray-500">
          <p>Thank you for your business!</p>
          <p class="mt-2">This is a system-generated {{ documentType }}. No signature is required.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PrinterIcon } from '@heroicons/vue/24/outline';
import { useToast } from '../composables/useToast';
import { formatCurrency } from '../utils/currency';

const { success } = useToast();

const isOpen = ref(false);
const payment = ref(null);
const documentType = ref('receipt');
const printContent = ref(null);

function formatDate(date) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateTime(date) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toCurrency(value) {
  return formatCurrency(value);
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function handlePrint() {
  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    const content = printContent.value?.innerHTML || '';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${capitalize(documentType.value)}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              padding: 20px;
              color: #333;
            }
            @media print {
              body { padding: 0; }
              .print-break { page-break-after: always; }
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .font-semibold { font-weight: 600; }
            .text-2xl { font-size: 1.5rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .text-gray-900 { color: #111827; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-500 { color: #6b7280; }
            .bg-gray-50 { background-color: #f9fafb; }
            .p-4 { padding: 1rem; }
            .p-8 { padding: 2rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .pb-4 { padding-bottom: 1rem; }
            .pt-4 { padding-top: 1rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-8 { margin-top: 2rem; }
            .rounded-lg { border-radius: 0.5rem; }
            .border-b { border-bottom: 1px solid #e5e7eb; }
            .border-t { border-top: 1px solid #e5e7eb; }
            .uppercase { text-transform: uppercase; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 0.5rem 0; }
            td:first-child { color: #4b5563; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  }
}

function open(paymentData, type = 'receipt') {
  payment.value = paymentData;
  documentType.value = type;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
  payment.value = null;
}

defineExpose({
  open,
  close,
});
</script>

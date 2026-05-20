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
          <button @click="downloadAndSend" class="btn-primary min-w-[9.5rem] px-4 py-2 text-sm inline-flex items-center justify-center gap-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 13.487c-.272-.136-1.607-.793-1.856-.883-.249-.09-.43-.136-.611.136-.181.272-.7.883-.858 1.064-.158.181-.317.204-.589.068-.272-.136-1.148-.423-2.187-1.35-.809-.721-1.355-1.612-1.515-1.884-.158-.272-.017-.419.12-.555.123-.122.272-.317.408-.476.136-.158.181-.272.272-.453.09-.181.045-.34-.022-.476-.068-.136-.611-1.477-.837-2.027-.221-.53-.447-.457-.611-.466l-.52-.009c-.181 0-.476.068-.726.34-.249.272-.953.933-.953 2.27 0 1.337.977 2.63 1.113 2.81.136.181 1.924 2.939 4.668 3.999.653.225 1.162.36 1.56.461.655.167 1.252.144 1.724.087.526-.062 1.607-.656 1.834-1.289.227-.633.227-1.176.159-1.289-.068-.113-.249-.181-.521-.317z" /><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/></svg>
            Download & Send
          </button>
          <button @click="close" class="btn-secondary px-4 py-2 text-sm">Close</button>
        </div>
      </div>

      <!-- Receipt Content -->
      <div ref="printContent" class="p-8 bg-white">
        <!-- Letterhead -->
        <div class="section" style="margin-bottom: 20px; text-align: center; padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
          <div style="font-size: 24px; line-height: 1.6; color: #555; font-weight: 600; margin-bottom: 10px;">
            <strong>LU<span style="color: #60a5fa;">MAC</span> Solutions</strong>
          </div>
          <div style="font-size: 14px; line-height: 1.6; color: #666;">
            Address: Jayasiripura, Anuradhapura, Sri Lanka<br>
            Email: contact@lumac.lk<br>
            Phone: 076 464 3050
          </div>
        </div>
        <!-- Document Title -->
        <div class="text-center mb-6">
          <div class="text-2xl font-bold text-primary-900">{{ documentType === 'invoice' ? 'INVOICE' : 'RECEIPT' }}</div>
        </div>

        <!-- Summary Header -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 pb-5 border-b">
          <div class="rounded-lg border border-gray-100 px-5 py-4">
            <div class="text-xs text-gray-500 uppercase">{{ documentType === 'invoice' ? 'Invoice' : 'Receipt' }} #</div>
            <div class="font-semibold text-sm text-gray-900 mt-1">{{ payment?.receipt_number || 'N/A' }}</div>
          </div>
          <div class="rounded-lg border border-gray-100 px-5 py-4">
            <div class="text-xs text-gray-500 uppercase">Date</div>
            <div class="font-semibold text-gray-900 mt-1">{{ formatDate(payment?.payment_date) }}</div>
          </div>
          <div class="rounded-lg border border-gray-100 px-5 py-4">
            <div class="text-xs text-gray-500 uppercase">Bill To</div>
            <div class="font-semibold text-gray-900 mt-1">{{ payment?.customer?.full_name || 'N/A' }}</div>
            <div v-if="payment?.customer?.phone || payment?.customer?.phone_number" class="text-sm text-gray-600 mt-1">{{ payment.customer.phone || payment.customer.phone_number }}</div>
            <div v-else-if="payment?.customer?.email" class="text-sm text-gray-600 mt-1">{{ payment.customer.email }}</div>
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
        <div class="mb-6 flex justify-center">
          <table class="text-sm min-w-[22rem]">
            <tbody>
              <tr v-if="payment?.notes" class="border-b">
                <td class="text-gray-600 py-2 pr-4 text-right">Notes:</td>
                <td class="text-gray-900 font-semibold py-2 text-left">{{ payment.notes }}</td>
              </tr>
              <tr class="border-b">
                <td class="text-gray-600 py-2 pr-4 text-right">Status:</td>
                <td class="text-gray-900 font-semibold py-2 text-left">{{ payment?.status || 'Completed' }}</td>
              </tr>
              <tr>
                <td class="text-gray-600 py-2 pr-4 text-right">Created:</td>
                <td class="text-gray-900 font-semibold py-2 text-left">{{ formatDateTime(payment?.created_at) }}</td>
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
import html2pdf from 'html2pdf.js';
import { openWhatsAppWithNumber } from '../utils/quotationGenerator';
function downloadPDF() {
  const content = printContent.value;
  if (!content) return Promise.resolve();
  const options = {
    margin: 10,
    filename: `${documentType.value}-${payment.value?.receipt_number || 'receipt'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    },
    pagebreak: { avoid: 'div.container', mode: ['avoid-all', 'css', 'legacy'] }
  };
  return html2pdf().set(options).from(content).save();
}

function sendWhatsApp() {
  const phone = payment.value?.customer?.phone || payment.value?.customer?.phone_number;
  if (!phone) {
    success('No phone number found for this customer.');
    return;
  }
  openWhatsAppWithNumber(phone);
}

async function downloadAndSend() {
  await downloadPDF();
  sendWhatsApp();
}

import { ref } from 'vue';
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

function open(paymentData, type = 'receipt', customerData = null) {
  payment.value = {
    ...paymentData,
    customer: paymentData?.customer || customerData || null,
  };
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

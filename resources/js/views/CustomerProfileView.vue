<template>
  <div class="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6">
    <ReceiptPrintModal ref="receiptModal" />

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <router-link to="/customers" class="text-sm text-primary-700 hover:text-primary-900">Back to Customers</router-link>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Customer Profile</h1>
      </div>
      <div class="flex flex-col md:flex-row gap-2 md:items-center">
        <button
          v-if="store.currentCustomer"
          @click="openQuoteModal"
          class="btn-secondary md:w-auto"
        >
          📄 Create Quote
        </button>
        <router-link
          v-if="store.currentCustomer?.solution_id"
          :to="`/customers/${route.params.id}/requirements`"
          class="btn-primary md:w-auto"
        >
          Open Requirement Checklist
        </router-link>
      </div>
    </div>

    <div v-if="store.loading" class="card text-gray-500">Loading customer profile...</div>

    <template v-else-if="customer">
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article class="card">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Contract Value</p>
          <p class="text-2xl font-bold text-gray-900 mt-2">{{ toCurrency(customer.contract_value) }}</p>
        </article>
        <article class="card">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Total Paid</p>
          <p class="text-2xl font-bold text-green-700 mt-2">{{ toCurrency(totalPaid) }}</p>
        </article>
        <article class="card">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Remaining Balance</p>
          <p class="text-2xl font-bold text-amber-700 mt-2">{{ toCurrency(remainingBalance) }}</p>
        </article>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Customer Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-gray-500">Full Name</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.full_name }}</p>
          </div>
          <div>
            <p class="text-gray-500">Company</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.company || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Contact</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.email || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Phone</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.phone || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Status</p>
            <p class="font-medium text-gray-800 mt-1">{{ statusLabel(customer.status) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Selected Solution</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.solution?.name || 'Not assigned' }}</p>
          </div>
          <div>
            <p class="text-gray-500">Created</p>
            <p class="font-medium text-gray-800 mt-1">{{ formatDate(customer.created_at) }}</p>
          </div>
          <div>
            <p class="text-gray-500">Contract Value</p>
            <p class="font-medium text-gray-800 mt-1">{{ toCurrency(customer.contract_value) }}</p>
          </div>
          <div v-if="customer.portal_user">
            <p class="text-gray-500">Portal Account</p>
            <p class="font-medium text-gray-800 mt-1">{{ customer.portal_user.name }} ({{ customer.portal_user.email }})</p>
          </div>
        </div>

        <div class="mt-4" v-if="customer.notes">
          <p class="text-gray-500 text-sm">Notes</p>
          <p class="text-gray-700 mt-1">{{ customer.notes }}</p>
        </div>
      </section>

      <section class="card">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Advance Payments</h2>
            <p class="text-sm text-gray-500 mt-1">Record and maintain all payments for this customer from the profile.</p>
          </div>
          <button @click="openPaymentModal()" class="btn-primary md:w-auto inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Payment</span>
          </button>
        </div>

        <div v-if="sortedPayments.length" class="space-y-3">
          <article v-for="payment in sortedPayments" :key="payment.id" class="border border-gray-100 rounded-xl p-4">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ toCurrency(payment.amount) }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(payment.payment_date) }} • {{ payment.payment_method || 'N/A' }}</p>
                <p class="text-xs text-gray-500 mt-1">Receipt: {{ payment.receipt_number || 'N/A' }}</p>
                <p v-if="payment.attachment_path" class="text-xs text-gray-500 mt-1">Attachment saved</p>
              </div>
              <div class="text-left sm:text-right space-y-2">
                <p class="text-xs text-gray-400">Recorded {{ formatDate(payment.created_at, true) }}</p>
                <div class="flex flex-wrap gap-2 sm:justify-end">
                  <button @click="openReceipt(payment)" class="inline-flex items-center gap-1.5 text-primary-700 font-semibold text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6M7 4h7l5 5v11a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z" />
                    </svg>
                    <span>Receipt</span>
                  </button>
                  <button @click="openInvoice(payment)" class="inline-flex items-center gap-1.5 text-green-700 font-semibold text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10m-11 9h12a1 1 0 001-1V8a2 2 0 00-2-2H7a2 2 0 00-2 2v11a1 1 0 001 1z" />
                    </svg>
                    <span>Invoice</span>
                  </button>
                  <button @click="startEditPayment(payment)" class="inline-flex items-center gap-1.5 text-amber-700 font-semibold text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L12 15l-4 1 1-4 8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button @click="deletePayment(payment)" class="inline-flex items-center gap-1.5 text-red-700 font-semibold text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
            <p v-if="payment.notes" class="text-sm text-gray-600 mt-2">{{ payment.notes }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No payments recorded yet.</p>
      </section>

      <section class="card">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Quotations</h2>
            <p class="text-sm text-gray-500 mt-1">All quotes issued to this customer.</p>
          </div>
          <button @click="openQuoteModal" class="btn-secondary md:w-auto inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Quote</span>
          </button>
        </div>

        <div v-if="quotations.length" class="space-y-3">
          <article v-for="quote in quotations" :key="quote.id" class="border border-gray-100 rounded-xl p-4">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ quote.quote_number }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ quote.items?.length || 0 }} item(s) &nbsp;·&nbsp; {{ toCurrency(quote.final_total) }}</p>
                <p class="text-xs text-gray-500 mt-1">Issued: {{ formatDate(quote.issued_at || quote.created_at) }}</p>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="text-xs px-2 py-0.5 rounded-full font-medium"
                  :class="{
                    'bg-blue-100 text-blue-700': quote.status === 'issued',
                    'bg-green-100 text-green-700': quote.status === 'agreed',
                    'bg-gray-100 text-gray-600': quote.status === 'draft',
                    'bg-red-100 text-red-700': quote.status === 'revoked',
                  }"
                >{{ quote.status }}</span>

                <button
                  @click="viewingQuote = quote"
                  class="inline-flex items-center gap-1.5 text-primary-700 font-semibold text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View</span>
                </button>

                <button
                  v-if="quote.status === 'draft' || quote.status === 'revoked'"
                  @click="issueQuotation(quote)"
                  class="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Issue</span>
                </button>

                <button
                  v-if="quote.status === 'issued'"
                  @click="agreeQuotation(quote)"
                  class="inline-flex items-center gap-1.5 text-green-700 font-semibold text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Agreed</span>
                </button>

                <button
                  v-if="quote.status === 'issued' || quote.status === 'agreed'"
                  @click="revokeQuotation(quote)"
                  class="inline-flex items-center gap-1.5 text-red-700 font-semibold text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Revoke</span>
                </button>
              </div>
            </div>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No projects linked to this customer yet.</p>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Requested Features</h2>
        <div v-if="requestedFeatures.length" class="space-y-3">
          <article v-for="feature in requestedFeatures" :key="feature.id" class="border border-gray-100 rounded-xl p-4">
            <h3 class="font-medium text-gray-800">{{ feature.solution_feature?.label || 'Feature' }}</h3>
            <p v-if="feature.notes" class="text-sm text-gray-600 mt-1">{{ feature.notes }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No requested features recorded yet.</p>
      </section>

      <section class="card">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Timeline & History</h2>
        <div v-if="customer.activities?.length" class="space-y-4">
          <article v-for="activity in customer.activities" :key="activity.id" class="border-l-2 border-primary-200 pl-4">
            <p class="text-sm font-semibold text-gray-800">{{ activity.title }}</p>
            <p v-if="activity.description" class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ formatDate(activity.created_at, true) }}</p>
          </article>
        </div>
        <p v-else class="text-sm text-gray-500">No activity events yet.</p>
      </section>
    </template>

    <div v-else class="card text-gray-500">Customer not found.</div>

    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full space-y-4 p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ editingPaymentId ? 'Edit Payment' : 'Add Payment' }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ customer?.full_name }}</p>
          </div>
          <button @click="closePaymentModal" class="text-gray-400 hover:text-gray-600" :disabled="savingPayment">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Amount</label>
            <input v-model.number="paymentForm.amount" type="number" min="0.01" step="0.01" class="input-field mt-1" placeholder="Advance amount" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Payment Date</label>
            <input v-model="paymentForm.payment_date" type="date" class="input-field mt-1" />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Payment Method</label>
            <input v-model="paymentForm.payment_method" class="input-field mt-1" placeholder="Cash, bank transfer, etc." />
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Attachment</label>
            <input ref="paymentAttachmentInput" type="file" class="input-field mt-1" accept="image/*,.pdf" @change="onPaymentAttachment" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Notes</label>
          <textarea v-model="paymentForm.notes" class="input-field mt-1" rows="3" placeholder="Payment notes"></textarea>
        </div>

        <label v-if="paymentForm.existing_attachment" class="inline-flex items-center gap-2 text-sm text-gray-700">
          <input v-model="paymentForm.remove_attachment" type="checkbox" class="rounded border-slate-300 text-primary-700 focus:ring-primary-500" />
          <span>Remove current attachment</span>
        </label>

        <div class="flex gap-3 pt-2">
          <button @click="closePaymentModal" :disabled="savingPayment" class="btn-secondary flex-1 inline-flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Cancel</span>
          </button>
          <button @click="savePayment" :disabled="savingPayment" class="btn-primary flex-1 inline-flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ savingPayment ? 'Saving...' : editingPaymentId ? 'Update Payment' : 'Add Payment' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Quotation Detail Modal -->
    <div v-if="viewingQuote" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" @click.self="viewingQuote = null">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between">
          <div>
            <p class="text-xs text-primary-700 uppercase tracking-wide font-semibold">Quotation</p>
            <h3 class="text-lg font-bold text-gray-900 mt-0.5">{{ viewingQuote.quote_number }}</h3>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="text-xs px-2.5 py-1 rounded-full font-semibold"
              :class="{
                    'bg-blue-100 text-blue-700': viewingQuote.status === 'issued',
                    'bg-green-100 text-green-700': viewingQuote.status === 'agreed',
                    'bg-gray-100 text-gray-600': viewingQuote.status === 'draft',
                    'bg-red-100 text-red-700': viewingQuote.status === 'revoked',
              }"
            >{{ viewingQuote.status }}</span>
            <button @click="viewingQuote = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="px-6 py-5 space-y-5">
          <!-- Meta -->
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-500">Customer</p>
              <p class="font-medium text-gray-800 mt-0.5">{{ customer?.full_name }}</p>
            </div>
            <div>
              <p class="text-gray-500">Issued On</p>
              <p class="font-medium text-gray-800 mt-0.5">{{ formatDate(viewingQuote.issued_at || viewingQuote.created_at) }}</p>
            </div>
            <div>
              <p class="text-gray-500">Discount Rate</p>
              <p class="font-medium text-gray-800 mt-0.5">{{ viewingQuote.discount_rate }}%</p>
            </div>
            <div>
              <p class="text-gray-500">Commission Rate</p>
              <p class="font-medium text-gray-800 mt-0.5">{{ viewingQuote.commission_rate }}%</p>
            </div>
          </div>

          <!-- Items -->
          <div v-if="viewingQuote.items?.length">
            <p class="text-sm font-semibold text-gray-700 mb-2">Items</p>
            <div class="rounded-xl border border-gray-100 overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th class="text-left px-4 py-2">Item</th>
                    <th class="text-right px-4 py-2">Qty</th>
                    <th class="text-right px-4 py-2">Unit Price</th>
                    <th class="text-right px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="item in viewingQuote.items" :key="item.id" class="hover:bg-gray-50">
                    <td class="px-4 py-2 text-gray-800">{{ item.item_name }}</td>
                    <td class="px-4 py-2 text-right text-gray-600">{{ item.quantity }}</td>
                    <td class="px-4 py-2 text-right text-gray-600">{{ toCurrency(item.unit_price) }}</td>
                    <td class="px-4 py-2 text-right font-medium text-gray-800">{{ toCurrency(item.line_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No items on this quotation.</p>

          <!-- Totals -->
          <div class="border-t border-gray-100 pt-4 space-y-1.5 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{{ toCurrency(viewingQuote.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Discount ({{ viewingQuote.discount_rate }}%)</span>
              <span>-{{ toCurrency(viewingQuote.subtotal - viewingQuote.final_total) }}</span>
            </div>
            <div class="flex justify-between font-bold text-gray-900 text-base pt-1">
              <span>Final Total</span>
              <span>{{ toCurrency(viewingQuote.final_total) }}</span>
            </div>
            <div class="flex justify-between text-gray-500 text-xs pt-1">
              <span>Commission ({{ viewingQuote.commission_rate }}%)</span>
              <span>{{ toCurrency(viewingQuote.commission_amount) }}</span>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="viewingQuote.notes" class="bg-gray-50 rounded-xl px-4 py-3">
            <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Notes</p>
            <p class="text-sm text-gray-700">{{ viewingQuote.notes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Quote Modal -->
    <div v-if="showQuoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full space-y-4 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">Create Quote for {{ customer?.full_name }}</h3>
          <button @click="closeQuoteModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium text-gray-700">Discount Rate (%)</label>
            <input v-model.number="quoteForm.discount_rate" type="number" min="0" max="100" step="0.01" class="input-field mt-1" placeholder="e.g., 35" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input v-model.number="quoteForm.commission_rate" type="number" min="0" max="100" step="0.01" class="input-field mt-1" placeholder="e.g., 10" />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700">Items (optional)</label>
            <p class="text-xs text-gray-500 mt-1">Leave empty to skip items. You can add them on the Quotations page.</p>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button @click="closeQuoteModal" class="btn-secondary flex-1">Cancel</button>
          <button @click="createQuoteForCustomer" :disabled="creatingQuote" class="btn-primary flex-1">
            {{ creatingQuote ? 'Creating...' : 'Create & Open' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCustomersStore } from '../stores/customers';
import { useToast } from '../composables/useToast';
import ReceiptPrintModal from '../components/ReceiptPrintModal.vue';
import { formatCurrency } from '../utils/currency';

const route = useRoute();
const router = useRouter();
const store = useCustomersStore();
const { success, error } = useToast();

const showQuoteModal = ref(false);
const showPaymentModal = ref(false);
const viewingQuote = ref(null);
const creatingQuote = ref(false);
const savingPayment = ref(false);
const editingPaymentId = ref(null);
const paymentAttachmentInput = ref(null);
const receiptModal = ref(null);
const quoteForm = reactive({
  discount_rate: 35,
  commission_rate: 10,
});
const paymentForm = reactive({
  amount: '',
  payment_date: new Date().toISOString().slice(0, 10),
  payment_method: 'cash',
  notes: '',
  attachment: null,
  existing_attachment: null,
  remove_attachment: false,
});

const customer = computed(() => store.currentCustomer);
const requestedFeatures = computed(() => (store.currentCustomer?.requirements || []).filter((item) => item.is_requested));
const payments = computed(() => store.currentCustomer?.advance_payments || store.currentCustomer?.advancePayments || []);
const sortedPayments = computed(() => [...payments.value].sort((left, right) => {
  const rightTime = new Date(right.payment_date || right.created_at || 0).getTime();
  const leftTime = new Date(left.payment_date || left.created_at || 0).getTime();
  return rightTime - leftTime || Number(right.id || 0) - Number(left.id || 0);
}));
const quotations = computed(() => store.currentCustomer?.quotations || []);
const projects = computed(() => store.currentCustomer?.projects || []);
const totalPaid = computed(() => payments.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
const remainingBalance = computed(() => Math.max(Number(store.currentCustomer?.contract_value || 0) - totalPaid.value, 0));

function statusLabel(status) {
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(date, includeTime = false) {
  if (!date) return 'N/A';
  const options = includeTime
    ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleString('en-US', options);
}

function toCurrency(value) {
  return formatCurrency(value);
}

function resetPaymentForm() {
  editingPaymentId.value = null;
  paymentForm.amount = '';
  paymentForm.payment_date = new Date().toISOString().slice(0, 10);
  paymentForm.payment_method = 'cash';
  paymentForm.notes = '';
  paymentForm.attachment = null;
  paymentForm.existing_attachment = null;
  paymentForm.remove_attachment = false;
  if (paymentAttachmentInput.value) {
    paymentAttachmentInput.value.value = '';
  }
}

function openPaymentModal(payment = null) {
  if (payment) {
    startEditPayment(payment);
  } else {
    resetPaymentForm();
  }

  showPaymentModal.value = true;
}

function closePaymentModal() {
  showPaymentModal.value = false;
  resetPaymentForm();
}

function onPaymentAttachment(event) {
  paymentForm.attachment = event.target.files?.[0] || null;
  if (paymentForm.attachment) {
    paymentForm.remove_attachment = false;
  }
}

function startEditPayment(payment) {
  editingPaymentId.value = payment.id;
  paymentForm.amount = Number(payment.amount || 0);
  paymentForm.payment_date = payment.payment_date ? new Date(payment.payment_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  paymentForm.payment_method = payment.payment_method || 'cash';
  paymentForm.notes = payment.notes || '';
  paymentForm.attachment = null;
  paymentForm.existing_attachment = payment.attachment_path || null;
  paymentForm.remove_attachment = false;
  if (paymentAttachmentInput.value) {
    paymentAttachmentInput.value.value = '';
  }
  showPaymentModal.value = true;
}

async function refreshCustomerProfile() {
  await store.fetchCustomer(route.params.id);
}

async function savePayment() {
  if (!customer.value?.id) return;

  savingPayment.value = true;
  try {
    const formData = new FormData();
    formData.append('customer_id', customer.value.id);
    formData.append('amount', paymentForm.amount);
    formData.append('payment_date', paymentForm.payment_date);
    formData.append('payment_method', paymentForm.payment_method || 'cash');
    formData.append('notes', paymentForm.notes || '');
    formData.append('remove_attachment', paymentForm.remove_attachment ? '1' : '0');
    if (paymentForm.attachment) {
      formData.append('attachment', paymentForm.attachment);
    }

    let response;
    if (editingPaymentId.value) {
      formData.append('_method', 'PUT');
      response = await axios.post(`/advance-payments/${editingPaymentId.value}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await axios.post('/advance-payments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    await refreshCustomerProfile();
    success(editingPaymentId.value ? 'Payment updated successfully.' : 'Payment added successfully.');

    if (!editingPaymentId.value && response?.data) {
      receiptModal.value?.open(response.data, 'receipt', customer.value);
    }

    closePaymentModal();
  } catch (e) {
    error(e.response?.data?.message || 'Failed to save payment. Please try again.');
  } finally {
    savingPayment.value = false;
  }
}

async function deletePayment(payment) {
  if (!payment?.id) return;
  if (!window.confirm(`Delete receipt ${payment.receipt_number || payment.id}?`)) return;

  try {
    await axios.delete(`/advance-payments/${payment.id}`);
    await refreshCustomerProfile();
    success('Payment deleted successfully.');
    if (editingPaymentId.value === payment.id) {
      resetPaymentForm();
    }
  } catch (e) {
    error(e.response?.data?.message || 'Failed to delete payment. Please try again.');
  }
}

function openReceipt(payment) {
  receiptModal.value?.open(payment, 'receipt', customer.value);
}

function openInvoice(payment) {
  receiptModal.value?.open(payment, 'invoice', customer.value);
}

async function updateQuotationStatus(quote, newStatus) {
  try {
    await axios.patch(`/quotations/${quote.id}/status`, { status: newStatus });
    await refreshCustomerProfile();
    const messages = { issued: 'Quotation issued successfully.', agreed: 'Quotation agreed. Contract value updated.', revoked: 'Quotation revoked.', draft: 'Quotation moved back to draft.' };
    success(messages[newStatus] ?? 'Quotation status updated.');
  } catch (e) {
    error(e.response?.data?.message || 'Failed to update quotation status.');
  }
}

async function issueQuotation(quote) {
  if (!window.confirm(`Issue quotation ${quote.quote_number} to the customer?`)) return;
  await updateQuotationStatus(quote, 'issued');
}

async function agreeQuotation(quote) {
  if (!window.confirm(`Mark quotation ${quote.quote_number} as agreed? ${toCurrency(quote.final_total)} will be added to the contract value.`)) return;
  await updateQuotationStatus(quote, 'agreed');
}

async function revokeQuotation(quote) {
  const deducts = quote.status === 'agreed';
  const msg = deducts
    ? `Revoke quotation ${quote.quote_number}? ${toCurrency(quote.final_total)} will be deducted from the contract value.`
    : `Revoke quotation ${quote.quote_number}?`;
  if (!window.confirm(msg)) return;
  await updateQuotationStatus(quote, 'revoked');
}

function openQuoteModal() {
  showQuoteModal.value = true;
}

function closeQuoteModal() {
  showQuoteModal.value = false;
  quoteForm.discount_rate = 35;
  quoteForm.commission_rate = 10;
}

async function createQuoteForCustomer() {
  creatingQuote.value = true;
  try {
    const payload = {
      customer_id: customer.value.id,
      discount_rate: Number(quoteForm.discount_rate),
      commission_rate: Number(quoteForm.commission_rate),
      status: 'issued',
      items: [], // Empty items; user can add them on Quotations page
    };

    const { data } = await axios.post('/quotations', payload);
    success('Quote created successfully! Redirecting...');
    closeQuoteModal();

    // Redirect to quotations page after a brief delay
    setTimeout(() => {
      router.push('/quotations');
    }, 1000);
  } catch (e) {
    error(e.response?.data?.message || 'Failed to create quote. Please try again.');
  } finally {
    creatingQuote.value = false;
  }
}

onMounted(() => {
  store.fetchCustomer(route.params.id);
});
</script>

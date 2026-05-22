<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Quotation;
use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
class QuotationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $quotes = Quotation::query()
            ->when(! $user->is_admin, fn ($query) => $query->where('user_id', $user->id))
            ->with(['customer', 'items.solution'])
            ->orderByDesc('id')
            ->get();

        return response()->json($quotes);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'commission_rate' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:draft,issued,agreed,revoked',
            'notes' => 'nullable|string|max:2000',
            'warranty_months' => 'nullable|integer|in:3,6,12,24,36',
            'validity_days' => 'nullable|integer|in:7,30',
            'discount_amount' => 'nullable|numeric|min:0',
            'discount_reason' => 'nullable|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.solution_id' => 'nullable|exists:solutions,id',
            'items.*.item_name' => 'nullable|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'nullable|numeric|min:0',
        ]);

        $user = $request->user();
        $customer = Customer::query()->findOrFail($data['customer_id']);

        abort_if(! $user->is_admin && $customer->user_id !== $user->id, 403);

        $quote = DB::transaction(function () use ($request, $data, $customer, $user) {
            $isAgent = $user->role === 'agent' && ! $user->is_admin;

            if ($isAgent) {
                // Business rule: agents get no discount and fixed 30% commission.
                $discountRate = 0.0;
                $commissionRate = 30.0;
            } else {
                $discountRate = (float) ($data['discount_rate'] ?? optional($request->user()->agentProfile)->discount_rate ?? 35);
                $commissionRate = (float) ($data['commission_rate'] ?? optional($request->user()->agentProfile)->commission_rate ?? 10);
            }

            $quote = Quotation::create([
                'quote_number' => 'QT-' . now()->format('Ymd') . '-' . str_pad((string) random_int(1, 99999), 5, '0', STR_PAD_LEFT),
                // Admin-generated quotations are assigned to the customer's owner for consistent ownership and visibility.
                'user_id' => $user->is_admin ? $customer->user_id : $user->id,
                'customer_id' => $customer->id,
                'discount_rate' => $discountRate,
                'commission_rate' => $commissionRate,
                'status' => $data['status'] ?? 'draft',
                'notes' => $data['notes'] ?? null,
                'warranty_months' => $data['warranty_months'] ?? null,
                'validity_days' => $data['validity_days'] ?? 30,
                'discount_amount' => $data['discount_amount'] ?? 0,
                'discount_reason' => $data['discount_reason'] ?? null,
                'issued_at' => ($data['status'] ?? 'draft') === 'issued' ? now() : null,
            ]);

            $subtotal = 0;
            $commissionableSubtotal = 0;
            foreach ($data['items'] as $item) {
                $solution = isset($item['solution_id']) ? Solution::query()->find($item['solution_id']) : null;
                $itemName = $item['item_name'] ?? $solution?->name ?? 'Custom Item';

                $unitPrice = isset($item['unit_price'])
                    ? (float) $item['unit_price']
                    : (float) ($solution?->base_price ?? 0);

                $lineTotal = $unitPrice * $item['quantity'];
                $subtotal += $lineTotal;

                // Commission applies only to solution items, not custom/device lines.
                if ($solution) {
                    $commissionableSubtotal += $lineTotal;
                }

                $quote->items()->create([
                    'solution_id' => $solution?->id,
                    'item_name' => $itemName,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'line_total' => $lineTotal,
                ]);
            }

            $finalTotal = $subtotal * (1 - ($discountRate / 100));
            $commissionableTotal = $commissionableSubtotal * (1 - ($discountRate / 100));
            $commissionAmount = $commissionableTotal * ($commissionRate / 100);

            $quote->update([
                'subtotal' => $subtotal,
                'final_total' => $finalTotal,
                'commission_amount' => $commissionAmount,
            ]);

            $quote->auditLogs()->create([
                'user_id' => $user->id,
                'action' => 'created',
                'remarks' => $isAgent ? 'Quotation generated by agent.' : 'Quotation generated by admin.',
                'meta' => [
                    'discount_rate' => $discountRate,
                    'commission_rate' => $commissionRate,
                ],
            ]);

            return $quote;
        });

        return response()->json($quote->load(['customer', 'items.solution', 'auditLogs']), 201);
    }

    public function updateStatus(Request $request, Quotation $quotation)
    {
        abort_if($quotation->user_id !== $request->user()->id && ! $request->user()->is_admin, 403);

        $data = $request->validate([
            'status' => 'required|in:draft,issued,agreed,revoked',
        ]);

        $previousStatus = $quotation->status;
        $newStatus = $data['status'];

        if ($previousStatus === $newStatus) {
            return response()->json($quotation->load(['customer', 'items.solution']));
        }

        $customer = $quotation->customer;

        // Only 'agreed' adds to contract value; leaving 'agreed' deducts it.
        if ($newStatus === 'agreed' && $previousStatus !== 'agreed') {
            $customer->increment('contract_value', (float) $quotation->final_total);
        } elseif ($previousStatus === 'agreed' && $newStatus !== 'agreed') {
            $customer->decrement('contract_value', (float) $quotation->final_total);
        }

        $quotation->update([
            'status' => $newStatus,
            'issued_at' => $newStatus === 'issued' ? now() : $quotation->issued_at,
            'revoked_at' => $newStatus === 'revoked' ? now() : null,
        ]);

        $quotation->auditLogs()->create([
            'user_id' => $request->user()->id,
            'action' => $newStatus,
            'remarks' => "Status changed from {$previousStatus} to {$newStatus}.",
            'meta' => [
                'previous_status' => $previousStatus,
                'final_total' => $quotation->final_total,
            ],
        ]);

        return response()->json($quotation->load(['customer', 'items.solution']));
    }

    public function show(Request $request, Quotation $quotation)
    {
        abort_if(! $request->user()->is_admin && $quotation->user_id !== $request->user()->id, 403);

        return response()->json($quotation->load(['customer', 'items.solution', 'auditLogs']));
    }

    public function exportHtml(Request $request, Quotation $quotation)
    {
        abort_if($quotation->user_id !== $request->user()->id && !$request->user()->is_admin, 403);

        $quotation->load(['customer', 'items.solution', 'user']);

        return view('quotes.print', [
            'quotation' => $quotation,
            'printMode' => $request->query('mode', 'a4'),
        ]);
    }

    public function exportPdf(Request $request, Quotation $quotation)
    {
        abort_if($quotation->user_id !== $request->user()->id && !$request->user()->is_admin, 403);

        $quotation->load(['customer', 'items.solution', 'user']);

        $pdf = Pdf::loadView('quotes.pdf', [
            'quotation' => $quotation,
            'paperSize' => $request->query('size', 'a4'),
        ]);

        return $pdf->download("quotation-{$quotation->quote_number}.pdf");
    }
}

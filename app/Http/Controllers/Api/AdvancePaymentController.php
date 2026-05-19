<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdvancePayment;
use App\Models\Customer;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class AdvancePaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = AdvancePayment::query()->with(['customer', 'user']);

        if (! $request->user()->is_admin) {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->query('customer_id'));
        }

        return response()->json($query->orderByDesc('payment_date')->orderByDesc('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'payment_method' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:2000',
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $customer = Customer::query()->findOrFail($data['customer_id']);
        abort_if(!$request->user()->is_admin && $customer->user_id !== $request->user()->id, 403);

        $path = null;
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('advance-payments', 'public');
        }

        $payment = AdvancePayment::create([
            'receipt_number' => 'RCPT-' . now()->format('Ymd') . '-' . str_pad((string) random_int(1, 99999), 5, '0', STR_PAD_LEFT),
            'customer_id' => $customer->id,
            'user_id' => $request->user()->id,
            'amount' => $data['amount'],
            'payment_date' => $data['payment_date'],
            'payment_method' => $data['payment_method'] ?? 'cash',
            'notes' => $data['notes'] ?? null,
            'attachment_path' => $path,
        ]);

        return response()->json($payment->load(['customer', 'user']), 201);
    }

    public function receipt(Request $request, AdvancePayment $advancePayment)
    {
        $customer = $this->authorizeAccess($request, $advancePayment);

        $customer->load('advancePayments');
        $totalPaid = (float) $customer->advancePayments()->sum('amount');
        $remaining = max((float) $customer->contract_value - $totalPaid, 0);

        return view('receipts.advance', [
            'payment' => $advancePayment->load(['customer', 'user']),
            'totalPaid' => number_format($totalPaid, 2, '.', ''),
            'remaining' => number_format($remaining, 2, '.', ''),
            'printMode' => $request->query('mode', 'a4'),
            'documentTitle' => 'Advance Payment Receipt',
        ]);
    }

    public function receiptPdf(Request $request, AdvancePayment $advancePayment)
    {
        $this->authorizeAccess($request, $advancePayment);

        $payment = $advancePayment->load(['customer', 'user']);
        $pdf = Pdf::loadView('receipts.pdf', [
            'payment' => $payment,
            'documentTitle' => 'Advance Payment Receipt',
        ]);

        return $pdf->download("receipt-{$payment->receipt_number}.pdf");
    }

    public function invoice(Request $request, AdvancePayment $advancePayment)
    {
        $customer = $this->authorizeAccess($request, $advancePayment);

        $customer->load('advancePayments');
        $totalPaid = (float) $customer->advancePayments()->sum('amount');
        $remaining = max((float) $customer->contract_value - $totalPaid, 0);

        return view('receipts.advance', [
            'payment' => $advancePayment->load(['customer', 'user']),
            'totalPaid' => number_format($totalPaid, 2, '.', ''),
            'remaining' => number_format($remaining, 2, '.', ''),
            'printMode' => $request->query('mode', 'a4'),
            'documentTitle' => 'Advance Payment Invoice',
        ]);
    }

    public function invoicePdf(Request $request, AdvancePayment $advancePayment)
    {
        $this->authorizeAccess($request, $advancePayment);

        $payment = $advancePayment->load(['customer', 'user']);
        $pdf = Pdf::loadView('receipts.pdf', [
            'payment' => $payment,
            'documentTitle' => 'Advance Payment Invoice',
        ]);

        return $pdf->download("invoice-{$payment->receipt_number}.pdf");
    }

    private function authorizeAccess(Request $request, AdvancePayment $advancePayment): Customer
    {
        $customer = $advancePayment->customer;
        abort_if(
            ! $request->user()->is_admin
            && $advancePayment->user_id !== $request->user()->id
            && $customer?->portal_user_id !== $request->user()->id,
            403
        );

        return $customer;
    }
}

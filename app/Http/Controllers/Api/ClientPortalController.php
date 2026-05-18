<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class ClientPortalController extends Controller
{
    public function overview(Request $request)
    {
        $customer = Customer::query()
            ->where('portal_user_id', $request->user()->id)
            ->with(['solution', 'projects', 'advancePayments'])
            ->firstOrFail();

        $totalPaid = (float) $customer->advancePayments->sum('amount');
        $remaining = max((float) $customer->contract_value - $totalPaid, 0);

        return response()->json([
            'customer' => $customer,
            'project_progress' => $customer->projects,
            'financials' => [
                'contract_value' => number_format((float) $customer->contract_value, 2, '.', ''),
                'paid' => number_format($totalPaid, 2, '.', ''),
                'remaining' => number_format($remaining, 2, '.', ''),
            ],
            'receipts' => $customer->advancePayments,
        ]);
    }
}

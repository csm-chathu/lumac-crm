<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdvancePayment;
use App\Models\Customer;
use App\Models\Expense;
use App\Models\Quotation;

class AdminAnalyticsController extends Controller
{
    public function index()
    {
        $contractValue = (float) Customer::query()->sum('contract_value');
        $collectedAdvances = (float) AdvancePayment::query()->sum('amount');
        $totalExpenses = (float) Expense::query()->sum('amount');
        $quotedRevenue = (float) Quotation::query()->where('status', 'issued')->sum('final_total');

        return response()->json([
            'total_contract_value' => number_format($contractValue, 2, '.', ''),
            'total_collected_advances' => number_format($collectedAdvances, 2, '.', ''),
            'pending_balance' => number_format(max($contractValue - $collectedAdvances, 0), 2, '.', ''),
            'total_operational_expenses' => number_format($totalExpenses, 2, '.', ''),
            'issued_quotation_revenue' => number_format($quotedRevenue, 2, '.', ''),
            'gross_margin_after_expense' => number_format($quotedRevenue - $totalExpenses, 2, '.', ''),
        ]);
    }
}

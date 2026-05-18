<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary(Request $request)
    {
        $user  = $request->user();
        $year  = $request->input('year',  now()->year);
        $month = $request->input('month', now()->month);

        $base = $user->transactions()
            ->whereYear('transaction_date', $year)
            ->whereMonth('transaction_date', $month);

        $totalIncome  = (clone $base)->where('type', 'income')->sum('amount');
        $totalExpense = (clone $base)->where('type', 'expense')->sum('amount');
        $balance      = $totalIncome - $totalExpense;

        // Income by category
        $incomeByCategory = (clone $base)
            ->where('type', 'income')
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->with('category:id,name,color,icon')
            ->groupBy('category_id')
            ->get();

        // Expense by category
        $expenseByCategory = (clone $base)
            ->where('type', 'expense')
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->with('category:id,name,color,icon')
            ->groupBy('category_id')
            ->get();

        // Daily totals for the month (chart)
        $daily = (clone $base)
            ->select(
                DB::raw('DAY(transaction_date) as day'),
                'type',
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('day', 'type')
            ->orderBy('day')
            ->get();

        // Recent 5 transactions
        $recent = $user->transactions()
            ->with('category:id,name,color,icon')
            ->orderByDesc('transaction_date')
            ->orderByDesc('id')
            ->limit(5)
            ->get();

        return response()->json([
            'total_income'       => $totalIncome,
            'total_expense'      => $totalExpense,
            'balance'            => $balance,
            'income_by_category' => $incomeByCategory,
            'expense_by_category'=> $expenseByCategory,
            'daily'              => $daily,
            'recent'             => $recent,
        ]);
    }

    public function monthlyOverview(Request $request)
    {
        $user = $request->user();
        $year = $request->input('year', now()->year);

        $monthly = $user->transactions()
            ->whereYear('transaction_date', $year)
            ->select(
                DB::raw('MONTH(transaction_date) as month'),
                'type',
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('month', 'type')
            ->orderBy('month')
            ->get();

        return response()->json($monthly);
    }
}

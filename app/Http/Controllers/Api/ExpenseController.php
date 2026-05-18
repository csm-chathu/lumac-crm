<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $query = Expense::query()->with('user');

        if (! $request->user()->is_admin) {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->query('category'));
        }

        $expenses = $query->orderByDesc('expense_date')->orderByDesc('id')->get();

        return response()->json($expenses);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'expense_date' => 'required|date',
            'notes' => 'nullable|string|max:2000',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $path = null;
        if ($request->hasFile('receipt')) {
            $path = $request->file('receipt')->store('expense-receipts', 'public');
        }

        $expense = Expense::create([
            'user_id' => $request->user()->id,
            'category' => $data['category'],
            'amount' => $data['amount'],
            'expense_date' => $data['expense_date'],
            'notes' => $data['notes'] ?? null,
            'receipt_path' => $path,
        ]);

        return response()->json($expense->load('user'), 201);
    }
}

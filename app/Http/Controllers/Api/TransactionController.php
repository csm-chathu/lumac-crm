<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->transactions()->with('category')->orderByDesc('transaction_date')->orderByDesc('id');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('month')) {
            $query->whereMonth('transaction_date', $request->month)
                  ->whereYear('transaction_date', $request->year ?? now()->year);
        }

        return response()->json($query->paginate(20));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type'             => 'required|in:income,expense',
            'amount'           => 'required|numeric|min:0.01',
            'category_id'      => 'nullable|exists:categories,id',
            'description'      => 'nullable|string|max:255',
            'note'             => 'nullable|string|max:500',
            'transaction_date' => 'required|date',
        ]);

        $transaction = $request->user()->transactions()->create($data);
        $transaction->load('category');

        return response()->json($transaction, 201);
    }

    public function show(Request $request, Transaction $transaction)
    {
        $this->authorize('view', $transaction);
        return response()->json($transaction->load('category'));
    }

    public function update(Request $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $data = $request->validate([
            'type'             => 'sometimes|in:income,expense',
            'amount'           => 'sometimes|numeric|min:0.01',
            'category_id'      => 'nullable|exists:categories,id',
            'description'      => 'nullable|string|max:255',
            'note'             => 'nullable|string|max:500',
            'transaction_date' => 'sometimes|date',
        ]);

        $transaction->update($data);

        return response()->json($transaction->fresh('category'));
    }

    public function destroy(Request $request, Transaction $transaction)
    {
        $this->authorize('delete', $transaction);
        $transaction->delete();
        return response()->json(null, 204);
    }
}

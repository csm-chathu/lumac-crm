<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;

class AgentProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('agentProfile');

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        if (isset($data['name'])) {
            $request->user()->update(['name' => $data['name']]);
        }

        $request->user()->agentProfile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            ['phone' => $data['phone'] ?? null]
        );

        return response()->json($request->user()->fresh()->load('agentProfile'));
    }

    public function analytics(Request $request)
    {
        $user = $request->user();

        $totalSales = (float) Quotation::query()
            ->where('user_id', $user->id)
            ->where('status', 'issued')
            ->sum('final_total');

        $earnedCommission = (float) Quotation::query()
            ->where('user_id', $user->id)
            ->where('status', 'issued')
            ->sum('commission_amount');

        $activeClients = $user->customers()
            ->whereNotIn('status', ['lost'])
            ->count();

        return response()->json([
            'total_sales' => number_format($totalSales, 2, '.', ''),
            'earned_commission' => number_format($earnedCommission, 2, '.', ''),
            'active_clients' => $activeClients,
            'total_quotations' => Quotation::query()->where('user_id', $user->id)->count(),
        ]);
    }
}

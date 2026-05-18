<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Solution;

class SolutionController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $discountRate = (float) (optional($user?->agentProfile)->discount_rate ?? \App\Models\GlobalSetting::getValue('default_agent_discount_rate', '35'));

        $solutions = Solution::query()
            ->where('is_active', true)
            ->with('features')
            ->orderBy('name')
            ->get();

        $mapped = $solutions->map(function (Solution $solution) use ($discountRate) {
            $payload = $solution->toArray();
            $payload['agent_discount_rate'] = number_format($discountRate, 2, '.', '');
            $payload['agent_price'] = number_format($solution->priceForDiscountRate($discountRate), 2, '.', '');

            return $payload;
        });

        return response()->json($mapped);
    }

    public function show(Solution $solution)
    {
        abort_unless($solution->is_active, 404);

        $discountRate = (float) (optional(auth()->user()?->agentProfile)->discount_rate ?? \App\Models\GlobalSetting::getValue('default_agent_discount_rate', '35'));
        $payload = $solution->load('features')->toArray();
        $payload['agent_discount_rate'] = number_format($discountRate, 2, '.', '');
        $payload['agent_price'] = number_format($solution->priceForDiscountRate($discountRate), 2, '.', '');

        return response()->json($payload);
    }
}

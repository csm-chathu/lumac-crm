<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerRequirementController extends Controller
{
    public function upsert(Request $request, Customer $customer)
    {
        abort_if($customer->user_id !== $request->user()->id, 403);

        $data = $request->validate([
            'requirements' => 'required|array|min:1',
            'requirements.*.solution_feature_id' => 'required|integer|exists:solution_features,id',
            'requirements.*.is_requested' => 'required|boolean',
            'requirements.*.notes' => 'nullable|string|max:1000',
        ]);

        $featureIds = collect($data['requirements'])->pluck('solution_feature_id')->all();
        $allowedFeatureIds = $customer->solution?->features()->whereIn('id', $featureIds)->pluck('id')->all() ?? [];

        if (count($featureIds) !== count($allowedFeatureIds)) {
            return response()->json(['message' => 'One or more requirements do not belong to the selected solution.'], 422);
        }

        DB::transaction(function () use ($customer, $data) {
            foreach ($data['requirements'] as $item) {
                $customer->requirements()->updateOrCreate(
                    ['solution_feature_id' => $item['solution_feature_id']],
                    [
                        'is_requested' => $item['is_requested'],
                        'notes' => $item['notes'] ?? null,
                    ]
                );
            }

            CustomerActivity::create([
                'customer_id' => $customer->id,
                'user_id' => auth()->id(),
                'event_type' => 'requirements_updated',
                'title' => 'Requirements checklist saved',
                'description' => 'Feature requests were captured or updated.',
                'meta' => [
                    'total_items' => count($data['requirements']),
                    'requested_items' => collect($data['requirements'])->where('is_requested', true)->count(),
                ],
            ]);
        });

        return response()->json($customer->fresh()->load(['solution.features', 'requirements.solutionFeature', 'activities']));
    }
}

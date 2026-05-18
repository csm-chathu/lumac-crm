<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use App\Models\SolutionFeature;
use Illuminate\Http\Request;

class AdminSolutionFeatureController extends Controller
{
    public function store(Request $request, Solution $solution)
    {
        $data = $request->validate([
            'feature_key' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $feature = $solution->features()->create([
            ...$data,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return response()->json($feature, 201);
    }

    public function update(Request $request, Solution $solution, SolutionFeature $feature)
    {
        abort_unless($feature->solution_id === $solution->id, 404);

        $data = $request->validate([
            'feature_key' => 'sometimes|string|max:255',
            'label' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:2000',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $feature->update($data);

        return response()->json($feature->fresh());
    }

    public function destroy(Solution $solution, SolutionFeature $feature)
    {
        abort_unless($feature->solution_id === $solution->id, 404);

        $feature->delete();

        return response()->json(null, 204);
    }
}

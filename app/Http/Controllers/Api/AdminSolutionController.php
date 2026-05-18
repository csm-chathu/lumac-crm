<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminSolutionController extends Controller
{
    public function index()
    {
        return response()->json(
            Solution::query()->with('features')->orderBy('name')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'base_price' => 'required|numeric|min:0.01',
            'demo_url' => 'nullable|url|max:1000',
            'demo_username' => 'nullable|string|max:255',
            'demo_email' => 'nullable|email|max:255',
            'demo_password' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $solution = Solution::create([
            ...$data,
            'slug' => Str::slug($data['name']) . '-' . Str::lower(Str::random(5)),
            'is_active' => $data['is_active'] ?? true,
        ]);

        return response()->json($solution->load('features'), 201);
    }

    public function update(Request $request, Solution $solution)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:2000',
            'base_price' => 'sometimes|numeric|min:0.01',
            'demo_url' => 'nullable|url|max:1000',
            'demo_username' => 'nullable|string|max:255',
            'demo_email' => 'nullable|email|max:255',
            'demo_password' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $solution->update($data);

        return response()->json($solution->fresh()->load('features'));
    }

    public function destroy(Solution $solution)
    {
        $solution->delete();

        return response()->json(null, 204);
    }
}

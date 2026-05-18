<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = $request->user()->categories()
            ->when($request->filled('type'), fn($q) => $q->where('type', $request->type))
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:100',
            'type'  => 'required|in:income,expense',
            'icon'  => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
        ]);

        $category = $request->user()->categories()->create($data);

        return response()->json($category, 201);
    }

    public function update(Request $request, Category $category)
    {
        abort_if($category->user_id !== $request->user()->id, 403);

        $data = $request->validate([
            'name'  => 'sometimes|string|max:100',
            'icon'  => 'nullable|string|max:50',
            'color' => 'nullable|string|max:20',
        ]);

        $category->update($data);

        return response()->json($category);
    }

    public function destroy(Request $request, Category $category)
    {
        abort_if($category->user_id !== $request->user()->id, 403);
        $category->delete();
        return response()->json(null, 204);
    }
}

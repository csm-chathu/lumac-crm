<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index()
    {
        return Project::with('images')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'deadline' => 'required|date|after_or_equal:start_date',
            'progress' => 'nullable|integer|min:0|max:100',
            'total_amount' => 'required|numeric|min:0',
            'amount_paid' => 'nullable|numeric|min:0',
            'special_requirements' => 'nullable|string',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        $project->load('images');
        $project->due_amount = $project->total_amount - $project->amount_paid;

        return $project;
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|required|date',
            'deadline' => 'sometimes|required|date|after_or_equal:start_date',
            'progress' => 'nullable|integer|min:0|max:100',
            'total_amount' => 'sometimes|required|numeric|min:0',
            'amount_paid' => 'nullable|numeric|min:0',
            'special_requirements' => 'nullable|string',
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->noContent();
    }

    public function uploadImage(Request $request, Project $project)
    {
        $validated = $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('project_images');

        $image = $project->images()->create(['image_path' => $path]);

        return response()->json($image, 201);
    }

    public function deleteImage(Project $project, ProjectImage $image)
    {
        Storage::delete($image->image_path);
        $image->delete();

        return response()->noContent();
    }
}
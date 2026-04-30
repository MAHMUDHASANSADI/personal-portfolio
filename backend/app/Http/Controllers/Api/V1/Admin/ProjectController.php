<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'stack' => 'required|array',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
        ]);

        return Project::create($validated);
    }

    public function show(Project $project)
    {
        return $project;
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'stack' => 'required|array',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
        ]);

        $project->update($validated);
        return $project;
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->noContent();
    }
}

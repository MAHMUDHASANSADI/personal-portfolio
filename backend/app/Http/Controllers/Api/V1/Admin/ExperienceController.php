<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return Experience::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'period' => 'required|string|max:255',
            'description' => 'required|string',
            'stack' => 'required|array',
        ]);

        return Experience::create($validated);
    }

    public function show(Experience $experience)
    {
        return $experience;
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'period' => 'required|string|max:255',
            'description' => 'required|string',
            'stack' => 'required|array',
        ]);

        $experience->update($validated);
        return $experience;
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return response()->noContent();
    }
}

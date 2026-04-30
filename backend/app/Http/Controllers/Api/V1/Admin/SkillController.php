<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return Skill::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'skills' => 'required|array',
        ]);

        return Skill::create($validated);
    }

    public function show(Skill $skill)
    {
        return $skill;
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'skills' => 'required|array',
        ]);

        $skill->update($validated);
        return $skill;
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->noContent();
    }
}

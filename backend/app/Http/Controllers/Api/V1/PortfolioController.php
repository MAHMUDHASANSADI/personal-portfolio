<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json([
            'skills' => Skill::all(),
            'experiences' => Experience::all(), // Simplified for now
            'projects' => Project::all(),
        ]);
    }
}

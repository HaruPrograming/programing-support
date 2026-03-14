<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        try {
            $projects = Project::all();
            return response()->json($projects);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        $project = Project::create($request->only([
            'project_name',
            'creation_level',
            'status',
            'used_technologies',
        ]));

        return response()->json($project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        // 更新
        $project->update($request->only([
            'creation_level',
            'status'
        ]));

        return response()->json($project);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
  public function index()
  {
      try {
          $projects = \App\Models\Project::all();
          return response()->json($projects);
      } catch (\Exception $e) {
          return response()->json(['error' => $e->getMessage()]);
      }
  }
}

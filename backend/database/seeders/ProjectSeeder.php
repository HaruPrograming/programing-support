<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
  public function run(): void
  {
      Project::create([
          'project_name'   => 'Laravel学習アプリ',
          'creation_level' => 1,
          'status'         => 1,
          'used_technologies'   => 'Laravel,React',
      ]);
  }
}

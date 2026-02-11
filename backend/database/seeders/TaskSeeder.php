<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
  public function run(): void
  {
    Task::create([
          'task_name' => 'テストデータ作成',
          'description' => 'テストデータとは何か調べる、作成手順調べる、実際に作成する。',
          'is_completed' => false,
          'story_id' => 1,
    ]);
  }
}

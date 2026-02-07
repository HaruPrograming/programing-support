<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Story;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        Story::create([
            'story_name' => 'User Authentication',
            'project_id' => 1,
        ]);

        Story::create([
            'story_name' => 'Shopping Cart',
            'project_id' => 1,
        ]);
    }
}

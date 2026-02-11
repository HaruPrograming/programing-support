<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_name', 50);
            $table->integer('creation_level')->default(1);
            $table->integer('status')->default(1);
            $table->text('used_technologies')->nullable();
            $table->timestamps();
        });

        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->string('story_name', 50);
            $table->timestamps();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_name', 50);
            $table->text('description')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
            $table->foreignId('story_id')->constrained()->onDelete('cascade');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('projects');
        Schema::dropIfExists('stories');
        Schema::dropIfExists('tasks');
    }
};

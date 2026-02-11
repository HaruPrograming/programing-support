<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'project_name',
        'creation_level',
        'status',
        'used_technologies',
        'created_at',
        'updated_at',
    ];
}

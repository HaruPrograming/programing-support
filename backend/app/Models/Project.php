<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'project_name',
        'creation_level',
        'status',
        'used_technologies',
        'created_at',
        'updated_at',
    ];
}

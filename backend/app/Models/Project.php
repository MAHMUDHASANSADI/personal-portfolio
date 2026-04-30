<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'category', 'description', 'stack', 'link', 'github_link'];

    protected function casts(): array
    {
        return [
            'stack' => 'array',
        ];
    }
}

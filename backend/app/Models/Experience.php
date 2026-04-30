<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['company', 'role', 'period', 'description', 'stack'];

    protected function casts(): array
    {
        return [
            'stack' => 'array',
        ];
    }
}

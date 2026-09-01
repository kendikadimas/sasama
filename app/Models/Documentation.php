<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documentation extends Model
{
    protected $guarded = [];

    protected $casts = [
        'taken_at' => 'date',
    ];

    public function images()
    {
        return $this->hasMany(DocumentationImage::class)->orderBy('sort_order');
    }
}

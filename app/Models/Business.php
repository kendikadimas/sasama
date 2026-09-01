<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $guarded = [];

    public function images()
    {
        return $this->hasMany(BusinessImage::class)->orderBy('sort_order');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreProduct extends Model
{
    protected $guarded = [];

    public function images()
    {
        return $this->hasMany(StoreProductImage::class)->orderBy('sort_order');
    }
}

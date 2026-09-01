<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemographicType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function demographics()
    {
        return $this->hasMany(Demographic::class);
    }
}

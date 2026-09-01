<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PotentialGroup extends Model
{
    protected $guarded = [];

    public function potentials()
    {
        return $this->hasMany(Potential::class);
    }
}

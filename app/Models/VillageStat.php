<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillageStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'value',
        'unit',
        'icon',
        'color',
        'size',
        'description',
        'category',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'formatted_value',
    ];

    /**
     * Scope untuk mengambil stats yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope untuk mengurutkan berdasarkan order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Get formatted value
     */
    public function getFormattedValueAttribute()
    {
        // Jika value adalah angka, format dengan separator
        if (is_numeric($this->value)) {
            return number_format($this->value, 0, ',', '.');
        }
        return $this->value;
    }
}

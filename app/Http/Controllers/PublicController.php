<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Documentation;
use App\Models\Potential;
use App\Models\PotentialGroup;
use App\Models\Program;
use App\Models\StoreProduct;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home', [
            'programs' => Program::where('is_active', true)->latest()->get(),
            'documentations' => Documentation::with('images')->latest()->get(),
        ]);
    }

    public function potensi()
    {
        return Inertia::render('Public/Potensi', [
            'groups'     => PotentialGroup::orderBy('order')->with('potentials')->get(),
            'potentials' => Potential::all(),
        ]);
    }

    public function mitra()
    {
        $businesses = Business::with('images')->latest()->get();
        $categories = $businesses->pluck('category')->filter()->unique()->values();
        $featured = $businesses->filter(fn($b) => $b->image_path)->first() ?? $businesses->first();

        return Inertia::render('Public/Mitra', [
            'businesses' => $businesses,
            'categories' => $categories,
            'featured' => $featured,
            'storeProducts' => StoreProduct::where('is_active', true)->orderBy('order')->get(),
        ]);
    }
}

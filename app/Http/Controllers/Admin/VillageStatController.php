<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageStat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageStatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stats = VillageStat::ordered()->get();

        return Inertia::render('Admin/VillageStats/Index', [
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/VillageStats/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:255',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Default size since we removed it from frontend
        $validated['size'] = 'small';

        VillageStat::create($validated);

        return redirect()->route('village-stats.index')
            ->with('success', 'Data statistik berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(VillageStat $villageStat)
    {
        return Inertia::render('Admin/VillageStats/Show', [
            'stat' => $villageStat,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VillageStat $villageStat)
    {
        return Inertia::render('Admin/VillageStats/Edit', [
            'stat' => $villageStat,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VillageStat $villageStat)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'unit' => 'nullable|string|max:255',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $villageStat->update($validated);

        return redirect()->route('village-stats.index')
            ->with('success', 'Data statistik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VillageStat $villageStat)
    {
        $villageStat->delete();

        return redirect()->route('village-stats.index')
            ->with('success', 'Data statistik berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Potential;
use App\Models\PotentialGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotentialController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Potentials/Index', [
            'potentials' => Potential::with('potentialGroup')->latest()->paginate(10),
            'groups'     => PotentialGroup::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Potentials/Create', [
            'groups' => PotentialGroup::orderBy('order')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                => 'required|string|max:255',
            'potential_group_id'  => 'nullable|exists:potential_groups,id',
            'description'         => 'required|string',
            'lat'                 => 'nullable|numeric|between:-90,90',
            'lng'                 => 'nullable|numeric|between:-180,180',
            'contact_info'        => 'nullable|string|max:255',
            'image'               => 'nullable|image|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('potentials', 'public');
        }

        Potential::create([
            'name'               => $validated['name'],
            'potential_group_id' => $validated['potential_group_id'] ?? null,
            'description'        => $validated['description'],
            'lat'                => $validated['lat'] ?? null,
            'lng'                => $validated['lng'] ?? null,
            'contact_info'       => $validated['contact_info'] ?? null,
            'image_path'         => $path,
        ]);

        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil ditambahkan.');
    }

    public function edit(Potential $potential)
    {
        return Inertia::render('Admin/Potentials/Edit', [
            'potential' => $potential,
            'groups'    => PotentialGroup::orderBy('order')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Potential $potential)
    {
        $validated = $request->validate([
            'name'               => 'required|string|max:255',
            'potential_group_id' => 'nullable|exists:potential_groups,id',
            'description'        => 'required|string',
            'lat'                => 'nullable|numeric|between:-90,90',
            'lng'                => 'nullable|numeric|between:-180,180',
            'contact_info'       => 'nullable|string|max:255',
            'image'              => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $potential->image_path = $request->file('image')->store('potentials', 'public');
        }

        $potential->update([
            'name'               => $validated['name'],
            'potential_group_id' => $validated['potential_group_id'] ?? null,
            'description'        => $validated['description'],
            'lat'                => $validated['lat'] ?? null,
            'lng'                => $validated['lng'] ?? null,
            'contact_info'       => $validated['contact_info'] ?? null,
        ]);

        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil diperbarui.');
    }

    public function destroy(Potential $potential)
    {
        $potential->delete();
        return redirect()->route('potentials.index')->with('success', 'Potensi berhasil dihapus.');
    }
}

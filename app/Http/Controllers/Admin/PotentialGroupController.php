<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PotentialGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotentialGroupController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PotentialGroups/Index', [
            'groups' => PotentialGroup::orderBy('order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PotentialGroups/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        PotentialGroup::create([
            'name'  => $request->name,
            'order' => $request->order ?? 0,
        ]);

        return redirect()->route('potential-groups.index')->with('success', 'Kelompok berhasil ditambahkan.');
    }

    public function edit(PotentialGroup $potentialGroup)
    {
        return Inertia::render('Admin/PotentialGroups/Edit', [
            'group' => $potentialGroup,
        ]);
    }

    public function update(Request $request, PotentialGroup $potentialGroup)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        $potentialGroup->update([
            'name'  => $request->name,
            'order' => $request->order ?? 0,
        ]);

        return redirect()->route('potential-groups.index')->with('success', 'Kelompok berhasil diperbarui.');
    }

    public function destroy(PotentialGroup $potentialGroup)
    {
        $potentialGroup->delete();
        return redirect()->route('potential-groups.index')->with('success', 'Kelompok berhasil dihapus.');
    }
}

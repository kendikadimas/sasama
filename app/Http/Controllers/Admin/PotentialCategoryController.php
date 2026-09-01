<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PotentialCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PotentialCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Potentials/Categories', [
            'categories' => PotentialCategory::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        PotentialCategory::create($validated);

        return back()->with('success', 'Kategori potensi berhasil ditambahkan');
    }

    public function update(Request $request, PotentialCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return back()->with('success', 'Kategori potensi berhasil diperbarui');
    }

    public function destroy(PotentialCategory $category)
    {
        // Check if has related potentials
        if ($category->potentials()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih digunakan oleh item potensi.');
        }

        $category->delete();

        return back()->with('success', 'Kategori potensi berhasil dihapus');
    }
}

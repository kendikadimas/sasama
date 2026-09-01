<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Documentation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Documentations/Index', [
            'documentations' => Documentation::latest()->paginate(12),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Documentations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'taken_at' => 'nullable|date',
            'image' => 'required|file|max:10240',
        ]);

        $path = $request->file('image')->store('documentations', 'public');

        Documentation::create([
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'] ?? null,
            'taken_at' => $validated['taken_at'] ?? null,
            'image_path' => $path,
        ]);

        return redirect()->route('documentations.index')->with('success', 'Dokumentasi berhasil ditambahkan.');
    }

    public function edit(Documentation $documentation)
    {
        return Inertia::render('Admin/Documentations/Edit', [
            'documentation' => $documentation,
        ]);
    }

    public function update(Request $request, Documentation $documentation)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'taken_at' => 'nullable|date',
            'image' => 'nullable|file|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $documentation->image_path = $request->file('image')->store('documentations', 'public');
        }

        $documentation->update([
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'] ?? null,
            'taken_at' => $validated['taken_at'] ?? null,
        ]);

        return redirect()->route('documentations.index')->with('success', 'Dokumentasi berhasil diperbarui.');
    }

    public function destroy(Documentation $documentation)
    {
        $documentation->delete();
        return redirect()->route('documentations.index')->with('success', 'Dokumentasi berhasil dihapus.');
    }
}

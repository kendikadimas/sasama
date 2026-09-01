<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Programs/Index', [
            'programs' => Program::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Programs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|mimes:jpg,jpeg,png,gif,webp|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('programs', 'public');
        }

        Program::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'description' => $validated['description'],
            'content' => $validated['content'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'image_path' => $path,
        ]);

        return redirect()->route('programs.index')->with('success', 'Program berhasil ditambahkan.');
    }

    public function edit(Program $program)
    {
        return Inertia::render('Admin/Programs/Edit', [
            'program' => $program,
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|mimes:jpg,jpeg,png,gif,webp|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $program->image_path = $request->file('image')->store('programs', 'public');
        }

        $program->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'content' => $validated['content'] ?? null,
            'is_active' => $validated['is_active'] ?? $program->is_active,
        ]);

        return redirect()->route('programs.index')->with('success', 'Program berhasil diperbarui.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('programs.index')->with('success', 'Program berhasil dihapus.');
    }
}

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
            'documentations' => Documentation::withCount('images')->latest()->paginate(12),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Documentations/Create');
    }

    public function store(Request $request)
    {
        $mode = $request->input('mode', 'single');

        if ($mode === 'album') {
            $request->validate([
                'title'       => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'taken_at'    => 'nullable|date',
                'images'      => 'required|array|min:1',
                'images.*'    => 'required|file|max:10240',
            ]);

            $files = $request->file('images');
            $doc = Documentation::create([
                'title'       => $request->input('title'),
                'description' => $request->input('description'),
                'taken_at'    => $request->input('taken_at'),
                'image_path'  => $files[0]->store('documentations', 'public'),
            ]);

            foreach (array_slice($files, 1) as $i => $file) {
                $doc->images()->create([
                    'image_path' => $file->store('documentations', 'public'),
                    'sort_order' => $i + 1,
                ]);
            }

        } elseif ($mode === 'bulk') {
            $request->validate([
                'items'            => 'required|array|min:1',
                'items.*.title'    => 'nullable|string|max:255',
                'items.*.taken_at' => 'nullable|date',
                'images'           => 'required|array|min:1',
                'images.*'         => 'required|file|max:10240',
            ]);

            $files = $request->file('images');
            $items = $request->input('items');

            foreach ($files as $i => $file) {
                Documentation::create([
                    'title'      => $items[$i]['title'] ?? null,
                    'taken_at'   => $items[$i]['taken_at'] ?? null,
                    'image_path' => $file->store('documentations', 'public'),
                ]);
            }

        } else {
            // single
            $request->validate([
                'title'       => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'taken_at'    => 'nullable|date',
                'image'       => 'required|file|max:10240',
            ]);

            Documentation::create([
                'title'       => $request->input('title'),
                'description' => $request->input('description'),
                'taken_at'    => $request->input('taken_at'),
                'image_path'  => $request->file('image')->store('documentations', 'public'),
            ]);
        }

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
            'title'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'taken_at'    => 'nullable|date',
            'image'       => 'nullable|file|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $documentation->image_path = $request->file('image')->store('documentations', 'public');
        }

        $documentation->update([
            'title'       => $validated['title'] ?? null,
            'description' => $validated['description'] ?? null,
            'taken_at'    => $validated['taken_at'] ?? null,
        ]);

        return redirect()->route('documentations.index')->with('success', 'Dokumentasi berhasil diperbarui.');
    }

    public function destroy(Documentation $documentation)
    {
        $documentation->delete();
        return redirect()->route('documentations.index')->with('success', 'Dokumentasi berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\HandlesImageUpload;
use App\Models\Business;
use App\Models\BusinessImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BusinessController extends Controller
{
    use \App\Http\Controllers\Concerns\HandlesImageUpload;
    public function index()
    {
        return Inertia::render('Admin/Businesses/Index', [
            'businesses' => Business::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Businesses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'rw' => 'nullable|string|max:50',
            'operating_hours' => 'nullable|string|max:255',
            'contact' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'shopee_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'halal_cert_number' => 'nullable|string|max:255',
            'halal_status' => 'nullable|string|max:100',
            'image' => 'nullable|file|max:10240',
            'extra_images.*' => 'nullable|file|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $this->storeImage($request->file('image'), 'businesses');
        }

        $business = Business::create(array_merge(
            collect($validated)->except(['image', 'extra_images'])->toArray(),
            ['image_path' => $path]
        ));

        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $i => $file) {
                $business->images()->create([
                    'image_path' => $this->storeImage($file, 'businesses'),
                    'sort_order' => $i,
                ]);
            }
        }

        return redirect()->route('businesses.index')->with('success', 'Usaha berhasil ditambahkan.');
    }

    public function edit(Business $business)
    {
        return Inertia::render('Admin/Businesses/Edit', [
            'business' => $business->load('images'),
        ]);
    }

    public function update(Request $request, Business $business)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'rw' => 'nullable|string|max:50',
            'operating_hours' => 'nullable|string|max:255',
            'contact' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'shopee_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'tiktok_url' => 'nullable|url|max:255',
            'halal_cert_number' => 'nullable|string|max:255',
            'halal_status' => 'nullable|string|max:100',
            'image' => 'nullable|file|max:10240',
            'extra_images.*' => 'nullable|file|max:10240',
            'delete_image_ids' => 'nullable|array',
            'delete_image_ids.*' => 'integer|exists:business_images,id',
        ]);

        if ($request->hasFile('image')) {
            $business->image_path = $this->storeImage($request->file('image'), 'businesses');
        }

        $business->update(collect($validated)->except(['image', 'extra_images', 'delete_image_ids'])->toArray());

        // Delete removed extra images
        if (!empty($validated['delete_image_ids'])) {
            $toDelete = BusinessImage::whereIn('id', $validated['delete_image_ids'])
                ->where('business_id', $business->id)
                ->get();
            foreach ($toDelete as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // Add new extra images
        if ($request->hasFile('extra_images')) {
            $nextOrder = $business->images()->max('sort_order') + 1;
            foreach ($request->file('extra_images') as $i => $file) {
                $business->images()->create([
                    'image_path' => $this->storeImage($file, 'businesses'),
                    'sort_order' => $nextOrder + $i,
                ]);
            }
        }

        return redirect()->route('businesses.index')->with('success', 'Usaha berhasil diperbarui.');
    }

    public function destroy(Business $business)
    {
        foreach ($business->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        $business->delete();
        return redirect()->route('businesses.index')->with('success', 'Usaha berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\HandlesImageUpload;
use App\Models\StoreProduct;
use App\Models\StoreProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreProductController extends Controller
{
    use \App\Http\Controllers\Concerns\HandlesImageUpload;
    public function index()
    {
        return Inertia::render('Admin/StoreProducts/Index', [
            'products' => StoreProduct::orderBy('order')->orderBy('created_at', 'desc')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/StoreProducts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'price'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'wa_message'    => 'nullable|string|max:500',
            'is_active'     => 'boolean',
            'order'         => 'integer',
            'image'         => 'nullable|file|max:10240',
            'extra_images.*'=> 'nullable|file|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $this->storeImage($request->file('image'), 'store');
        }

        $product = StoreProduct::create([
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'] ?? null,
            'wa_message'  => $validated['wa_message'] ?? null,
            'is_active'   => $validated['is_active'] ?? true,
            'order'       => $validated['order'] ?? 0,
            'image_path'  => $path,
        ]);

        if ($request->hasFile('extra_images')) {
            foreach ($request->file('extra_images') as $i => $file) {
                $product->images()->create([
                    'image_path' => $this->storeImage($file, 'store'),
                    'sort_order' => $i,
                ]);
            }
        }

        return redirect()->route('store-products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function edit(StoreProduct $storeProduct)
    {
        return Inertia::render('Admin/StoreProducts/Edit', [
            'product' => $storeProduct->load('images'),
        ]);
    }

    public function update(Request $request, StoreProduct $storeProduct)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'price'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'wa_message'    => 'nullable|string|max:500',
            'is_active'     => 'boolean',
            'order'         => 'integer',
            'image'         => 'nullable|file|max:10240',
            'extra_images.*'=> 'nullable|file|max:10240',
            'delete_image_ids' => 'nullable|array',
            'delete_image_ids.*' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $storeProduct->image_path = $this->storeImage($request->file('image'), 'store');
        }

        $storeProduct->update([
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'] ?? null,
            'wa_message'  => $validated['wa_message'] ?? null,
            'is_active'   => $validated['is_active'] ?? $storeProduct->is_active,
            'order'       => $validated['order'] ?? $storeProduct->order,
        ]);

        if (!empty($validated['delete_image_ids'])) {
            foreach (StoreProductImage::whereIn('id', $validated['delete_image_ids'])->get() as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        if ($request->hasFile('extra_images')) {
            $nextOrder = $storeProduct->images()->max('sort_order') + 1;
            foreach ($request->file('extra_images') as $i => $file) {
                $storeProduct->images()->create([
                    'image_path' => $this->storeImage($file, 'store'),
                    'sort_order' => $nextOrder + $i,
                ]);
            }
        }

        return redirect()->route('store-products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(StoreProduct $storeProduct)
    {
        foreach ($storeProduct->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        $storeProduct->delete();
        return redirect()->route('store-products.index')->with('success', 'Produk berhasil dihapus.');
    }
}

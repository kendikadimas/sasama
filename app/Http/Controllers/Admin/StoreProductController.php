<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StoreProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreProductController extends Controller
{
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
            'name'       => 'required|string|max:255',
            'price'      => 'required|string|max:255',
            'description'=> 'nullable|string',
            'wa_message' => 'nullable|string|max:500',
            'is_active'  => 'boolean',
            'order'      => 'integer',
            'image'      => 'nullable|image|max:10240',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('store', 'public');
        }

        StoreProduct::create([
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'] ?? null,
            'wa_message'  => $validated['wa_message'] ?? null,
            'is_active'   => $validated['is_active'] ?? true,
            'order'       => $validated['order'] ?? 0,
            'image_path'  => $path,
        ]);

        return redirect()->route('store-products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    public function edit(StoreProduct $storeProduct)
    {
        return Inertia::render('Admin/StoreProducts/Edit', [
            'product' => $storeProduct,
        ]);
    }

    public function update(Request $request, StoreProduct $storeProduct)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'price'      => 'required|string|max:255',
            'description'=> 'nullable|string',
            'wa_message' => 'nullable|string|max:500',
            'is_active'  => 'boolean',
            'order'      => 'integer',
            'image'      => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $storeProduct->image_path = $request->file('image')->store('store', 'public');
        }

        $storeProduct->update([
            'name'        => $validated['name'],
            'price'       => $validated['price'],
            'description' => $validated['description'] ?? null,
            'wa_message'  => $validated['wa_message'] ?? null,
            'is_active'   => $validated['is_active'] ?? $storeProduct->is_active,
            'order'       => $validated['order'] ?? $storeProduct->order,
        ]);

        return redirect()->route('store-products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(StoreProduct $storeProduct)
    {
        $storeProduct->delete();
        return redirect()->route('store-products.index')->with('success', 'Produk berhasil dihapus.');
    }
}

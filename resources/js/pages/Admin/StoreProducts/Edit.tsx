import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, X } from 'lucide-react';

interface StoreProduct {
    id: number;
    name: string;
    price: string;
    description: string | null;
    wa_message: string | null;
    image_path: string | null;
    is_active: boolean;
    order: number;
    images: { id: number; image_path: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'SASAMA Store', href: '/dashboard/store-products' },
    { title: 'Edit', href: '#' },
];

export default function StoreProductEdit({ product }: { product: StoreProduct }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name,
        price: product.price,
        description: product.description ?? '',
        wa_message: product.wa_message ?? '',
        is_active: product.is_active,
        order: product.order,
        image: null as File | null,
        extra_images: [] as File[],
        delete_image_ids: [] as number[],
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(`/dashboard/store-products/${product.id}`, {
            forceFormData: true,
            onError: (errors) => { console.error('CRUD Error:', errors); alert('Error: ' + JSON.stringify(errors)); },
            onSuccess: () => console.log('CRUD Success'),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk Store" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/store-products" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Produk Store</h1>
                        <p className="text-slate-500 text-sm">Perbarui data produk SASAMA Store.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl">
                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Produk <span className="text-red-500">*</span></Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Harga <span className="text-red-500">*</span></Label>
                                <Input id="price" placeholder="Rp 15.000 / 1 kg" value={data.price} onChange={e => setData('price', e.target.value)} />
                                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="wa_message">Pesan WA</Label>
                            <Input id="wa_message" value={data.wa_message} onChange={e => setData('wa_message', e.target.value)} />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="order">Urutan tampil</Label>
                                <Input id="order" type="number" value={data.order} onChange={e => setData('order', parseInt(e.target.value) || 0)} />
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                                <Label htmlFor="is_active">Tampilkan di halaman publik</Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Foto Utama</Label>
                            {product.image_path && (
                                <img src={`/storage/${product.image_path}`} alt={product.name} className="h-24 w-36 object-cover rounded-lg mb-2" />
                            )}
                            <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                        </div>

                        {product.images && product.images.length > 0 && (
                            <div className="space-y-2">
                                <Label>Foto Tambahan (saat ini)</Label>
                                <div className="flex flex-wrap gap-2">
                                    {product.images.map(img => (
                                        <div key={img.id} className="relative">
                                            <img src={`/storage/${img.image_path}`} className="h-20 w-20 object-cover rounded-lg" alt="" />
                                            <button
                                                type="button"
                                                onClick={() => setData('delete_image_ids', data.delete_image_ids.includes(img.id)
                                                    ? data.delete_image_ids.filter(id => id !== img.id)
                                                    : [...data.delete_image_ids, img.id]
                                                )}
                                                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shadow ${data.delete_image_ids.includes(img.id) ? 'bg-red-500' : 'bg-slate-400 hover:bg-red-400'}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {data.delete_image_ids.length > 0 && (
                                    <p className="text-xs text-red-500">{data.delete_image_ids.length} foto akan dihapus saat disimpan.</p>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="extra_images">Tambah Foto Lagi <span className="text-slate-400 text-xs">(opsional)</span></Label>
                            <Input id="extra_images" type="file" accept="image/*" multiple onChange={e => setData('extra_images', Array.from(e.target.files ?? []))} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link href="/dashboard/store-products" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                                Batal
                            </Link>
                            <Button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-900/20">
                                <Save className="w-5 h-5 mr-2" />
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

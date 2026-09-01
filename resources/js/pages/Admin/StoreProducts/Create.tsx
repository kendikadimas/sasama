import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'SASAMA Store', href: '/dashboard/store-products' },
    { title: 'Tambah', href: '#' },
];

export default function StoreProductCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        wa_message: '',
        is_active: true as boolean,
        order: 0 as number,
        image: null as File | null,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/dashboard/store-products', { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk Store" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/store-products" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Produk Store</h1>
                        <p className="text-slate-500 text-sm">Tambah produk baru ke SASAMA Store.</p>
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
                            <Label htmlFor="wa_message">Pesan WA (otomatis terisi saat "Beli Sekarang")</Label>
                            <Input id="wa_message" placeholder="Halo, saya ingin memesan..." value={data.wa_message} onChange={e => setData('wa_message', e.target.value)} />
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
                            <Label htmlFor="image">Foto Produk</Label>
                            <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link href="/dashboard/store-products" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
                                Batal
                            </Link>
                            <Button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-900/20">
                                <Save className="w-5 h-5 mr-2" />
                                Simpan Produk
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

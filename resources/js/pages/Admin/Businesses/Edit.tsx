import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Usaha Desa', href: '/dashboard/businesses' },
    { title: 'Edit', href: '#' },
];

export default function BusinessEdit({ business }: { business: any }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: business.name ?? '',
        description: business.description ?? '',
        category: business.category ?? '',
        address: business.address ?? '',
        rw: business.rw ?? '',
        operating_hours: business.operating_hours ?? '',
        contact: business.contact ?? '',
        website_url: business.website_url ?? '',
        instagram_url: business.instagram_url ?? '',
        shopee_url: business.shopee_url ?? '',
        facebook_url: business.facebook_url ?? '',
        tiktok_url: business.tiktok_url ?? '',
        halal_cert_number: business.halal_cert_number ?? '',
        halal_status: business.halal_status ?? '',
        image: null as File | null,
        extra_images: [] as File[],
        delete_image_ids: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/dashboard/businesses/${business.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Usaha Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/businesses" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Usaha Desa</h1>
                        <p className="text-slate-500 text-sm">Perbarui data usaha atau UMKM desa.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Usaha <span className="text-red-500">*</span></Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Kategori</Label>
                                <Input id="category" value={data.category} onChange={e => setData('category', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi <span className="text-red-500">*</span></Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={4} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input id="address" value={data.address} onChange={e => setData('address', e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rw">RW</Label>
                                <Input id="rw" value={data.rw} onChange={e => setData('rw', e.target.value)} placeholder="Contoh: 001" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="operating_hours">Jam Operasional</Label>
                                <Input id="operating_hours" value={data.operating_hours} onChange={e => setData('operating_hours', e.target.value)} placeholder="Contoh: 08.00–17.00 WIB" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact">Kontak</Label>
                                <Input id="contact" value={data.contact} onChange={e => setData('contact', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website_url">Website</Label>
                            <Input id="website_url" type="url" value={data.website_url} onChange={e => setData('website_url', e.target.value)} />
                            {errors.website_url && <p className="text-xs text-red-500">{errors.website_url}</p>}
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Media Sosial <span className="text-slate-400 font-normal">(opsional)</span></p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="instagram_url">Instagram</Label>
                                    <Input id="instagram_url" type="url" value={data.instagram_url} onChange={e => setData('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
                                    {errors.instagram_url && <p className="text-xs text-red-500">{errors.instagram_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shopee_url">Shopee</Label>
                                    <Input id="shopee_url" type="url" value={data.shopee_url} onChange={e => setData('shopee_url', e.target.value)} placeholder="https://shopee.co.id/..." />
                                    {errors.shopee_url && <p className="text-xs text-red-500">{errors.shopee_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="facebook_url">Facebook</Label>
                                    <Input id="facebook_url" type="url" value={data.facebook_url} onChange={e => setData('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
                                    {errors.facebook_url && <p className="text-xs text-red-500">{errors.facebook_url}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tiktok_url">TikTok</Label>
                                    <Input id="tiktok_url" type="url" value={data.tiktok_url} onChange={e => setData('tiktok_url', e.target.value)} placeholder="https://tiktok.com/@..." />
                                    {errors.tiktok_url && <p className="text-xs text-red-500">{errors.tiktok_url}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Sertifikasi Halal <span className="text-slate-400 font-normal">(opsional)</span></p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="halal_cert_number">Nomor Sertifikat</Label>
                                    <Input id="halal_cert_number" value={data.halal_cert_number} onChange={e => setData('halal_cert_number', e.target.value)} placeholder="Contoh: SH2026-1-2502916-(13126IGA)" />
                                    {errors.halal_cert_number && <p className="text-xs text-red-500">{errors.halal_cert_number}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="halal_status">Status</Label>
                                    <select id="halal_status" value={data.halal_status} onChange={e => setData('halal_status', e.target.value)}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                        <option value="">-- Pilih Status --</option>
                                        <option value="Terbit SH">Terbit SH</option>
                                        <option value="Proses P3H">Proses P3H</option>
                                    </select>
                                    {errors.halal_status && <p className="text-xs text-red-500">{errors.halal_status}</p>}
                                </div>
                            </div>
                        </div>

                        {business.image_path && (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Foto Utama Saat Ini</Label>
                                <img src={`/storage/${business.image_path}`} alt={business.name} className="h-32 rounded-lg object-cover border border-slate-200" />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="image">Ganti Foto Utama</Label>
                            <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                        </div>

                        {business.images && business.images.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Foto Tambahan Saat Ini</Label>
                                <div className="flex flex-wrap gap-3">
                                    {business.images.map((img: { id: number; image_path: string }) => (
                                        <div key={img.id} className="relative group">
                                            <img src={`/storage/${img.image_path}`} alt="" className="h-24 w-24 rounded-lg object-cover border border-slate-200" />
                                            <button
                                                type="button"
                                                onClick={() => setData('delete_image_ids', [...data.delete_image_ids, img.id])}
                                                className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${data.delete_image_ids.includes(img.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-red-100'}`}
                                            >
                                                ×
                                            </button>
                                            {data.delete_image_ids.includes(img.id) && (
                                                <div className="absolute inset-0 rounded-lg bg-red-500/30 flex items-center justify-center">
                                                    <span className="text-xs text-red-700 font-semibold">Hapus</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400">Klik × untuk menandai foto yang akan dihapus</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="extra_images">Tambah Foto Baru <span className="text-slate-400 font-normal">(opsional, bisa pilih lebih dari 1)</span></Label>
                            <Input id="extra_images" type="file" accept="image/*" multiple onChange={e => setData('extra_images', Array.from(e.target.files ?? []))} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link href="/dashboard/businesses" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
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

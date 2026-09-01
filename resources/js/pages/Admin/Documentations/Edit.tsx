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
    { title: 'Dokumentasi', href: '/dashboard/documentations' },
    { title: 'Edit', href: '#' },
];

export default function DocumentationEdit({ documentation }: { documentation: any }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: documentation.title ?? '',
        description: documentation.description ?? '',
        taken_at: documentation.taken_at ? documentation.taken_at.substring(0, 10) : '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/dashboard/documentations/${documentation.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Dokumentasi" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/documentations" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Dokumentasi</h1>
                        <p className="text-slate-500 text-sm">Perbarui data dokumentasi kegiatan desa.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl">
                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul <span className="text-slate-400 text-xs font-normal">(opsional)</span></Label>
                            <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Keterangan</Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="taken_at">Tanggal Pengambilan</Label>
                            <Input id="taken_at" type="date" value={data.taken_at} onChange={e => setData('taken_at', e.target.value)} />
                        </div>

                        {documentation.image_path && (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Foto Saat Ini</Label>
                                <img src={`/storage/${documentation.image_path}`} alt={documentation.title} className="h-40 rounded-lg object-cover border border-slate-200" />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="image">Ganti Foto</Label>
                            <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link href="/dashboard/documentations" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
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

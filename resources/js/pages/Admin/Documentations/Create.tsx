import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler, useState, useRef } from 'react';
import heic2any from 'heic2any';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Images, SplitSquareHorizontal, Image, Loader2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Dokumentasi', href: '/dashboard/documentations' },
    { title: 'Tambah', href: '#' },
];

type Mode = 'single' | 'album' | 'bulk';

interface BulkItem {
    title: string;
    taken_at: string;
    file: File;
    preview: string;
}

export default function DocumentationCreate() {
    const [mode, setMode] = useState<Mode>('single');
    const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
    const [albumFiles, setAlbumFiles] = useState<File[]>([]);
    const [albumPreviews, setAlbumPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Single mode form
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        taken_at: '',
        image: null as File | null,
    });

    const submitSingle: FormEventHandler = (e) => {
        e.preventDefault();
        post('/dashboard/documentations', { forceFormData: true });
    };

    // Album mode submit
    const [albumMeta, setAlbumMeta] = useState({ title: '', description: '', taken_at: '' });
    const [albumProcessing, setAlbumProcessing] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);

    async function handleAlbumFiles(files: FileList | null) {
        if (!files) return;
        const arr = Array.from(files);
        setAlbumFiles(arr);
        setPreviewLoading(true);
        const previews = await Promise.all(arr.map(async f => {
            const ext = f.name.split('.').pop()?.toLowerCase();
            if (ext === 'heic' || ext === 'heif') {
                try {
                    const blob = await heic2any({ blob: f, toType: 'image/jpeg', quality: 0.7 }) as Blob;
                    return URL.createObjectURL(blob);
                } catch { return ''; }
            }
            return URL.createObjectURL(f);
        }));
        setAlbumPreviews(previews);
        setPreviewLoading(false);
    }

    function submitAlbum(e: React.FormEvent) {
        e.preventDefault();
        if (!albumFiles.length) return;
        setAlbumProcessing(true);
        const fd = new FormData();
        fd.append('mode', 'album');
        fd.append('title', albumMeta.title);
        fd.append('description', albumMeta.description);
        fd.append('taken_at', albumMeta.taken_at);
        albumFiles.forEach(f => fd.append('images[]', f));

        fetch('/dashboard/documentations', {
            method: 'POST',
            headers: { 'X-XSRF-TOKEN': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? ''), Accept: 'application/json' },
            body: fd,
        }).then(r => {
            if (r.ok || r.redirected) window.location.href = '/dashboard/documentations';
            else r.json().then(j => { alert(JSON.stringify(j.errors ?? j)); setAlbumProcessing(false); });
        }).catch(() => setAlbumProcessing(false));
    }

    // Bulk mode
    const [bulkProcessing, setBulkProcessing] = useState(false);
    const [sharedDate, setSharedDate] = useState('');

    async function handleBulkFiles(files: FileList | null) {
        if (!files) return;
        const arr = Array.from(files);
        setPreviewLoading(true);
        const items = await Promise.all(arr.map(async f => {
            const ext = f.name.split('.').pop()?.toLowerCase();
            let preview = '';
            if (ext === 'heic' || ext === 'heif') {
                try {
                    const blob = await heic2any({ blob: f, toType: 'image/jpeg', quality: 0.7 }) as Blob;
                    preview = URL.createObjectURL(blob);
                } catch { preview = ''; }
            } else {
                preview = URL.createObjectURL(f);
            }
            return {
                title: f.name.replace(/\.[^/.]+$/, ''),
                taken_at: sharedDate,
                file: f,
                preview,
            };
        }));
        setBulkItems(items);
        setPreviewLoading(false);
    }

    function submitBulk(e: React.FormEvent) {
        e.preventDefault();
        if (!bulkItems.length) return;
        setBulkProcessing(true);
        const fd = new FormData();
        fd.append('mode', 'bulk');
        bulkItems.forEach((item, i) => {
            fd.append(`items[${i}][title]`, item.title);
            fd.append(`items[${i}][taken_at]`, item.taken_at);
            fd.append('images[]', item.file);
        });

        fetch('/dashboard/documentations', {
            method: 'POST',
            headers: { 'X-XSRF-TOKEN': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? ''), Accept: 'application/json' },
            body: fd,
        }).then(r => {
            if (r.ok || r.redirected) window.location.href = '/dashboard/documentations';
            else r.json().then(j => { alert(JSON.stringify(j.errors ?? j)); setBulkProcessing(false); });
        }).catch(() => setBulkProcessing(false));
    }

    const isUploading = albumProcessing || bulkProcessing;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Dokumentasi" />

            {/* Upload loading overlay */}
            {isUploading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                        <p className="text-slate-800 font-semibold text-lg">Mengupload foto...</p>
                        <p className="text-slate-400 text-sm text-center">Jangan tutup halaman ini.<br/>Proses mungkin memakan waktu untuk banyak foto.</p>
                    </div>
                </div>
            )}

            <div className="p-6 md:p-8 space-y-6 bg-slate-50/50 min-h-full">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/documentations" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tambah Dokumentasi</h1>
                        <p className="text-slate-500 text-sm">Pilih mode upload foto.</p>
                    </div>
                </div>

                {/* Mode toggle */}
                <div className="flex gap-2 flex-wrap">
                    {([
                        { id: 'single', icon: Image, label: '1 Foto' },
                        { id: 'album', icon: Images, label: 'Album (banyak foto, 1 postingan)' },
                        { id: 'bulk', icon: SplitSquareHorizontal, label: 'Bulk (pisah-pisah)' },
                    ] as { id: Mode; icon: any; label: string }[]).map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setMode(id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${mode === id ? 'bg-emerald-600 text-white border-emerald-600 shadow' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'}`}
                        >
                            <Icon className="w-4 h-4" /> {label}
                        </button>
                    ))}
                </div>

                {/* Single */}
                {mode === 'single' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl">
                        <form onSubmit={submitSingle} encType="multipart/form-data" className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Judul <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Judul dokumentasi" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="taken_at">Tanggal <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Input id="taken_at" type="date" value={data.taken_at} onChange={e => setData('taken_at', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Foto <span className="text-red-500">*</span></Label>
                                <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                                {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Link href="/dashboard/documentations" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">Batal</Link>
                                <Button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-900/20">
                                    <Save className="w-5 h-5 mr-2" /> Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Album */}
                {mode === 'album' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-2xl">
                        <form onSubmit={submitAlbum} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Judul Album <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Input value={albumMeta.title} onChange={e => setAlbumMeta(m => ({ ...m, title: e.target.value }))} placeholder="Judul album" />
                            </div>
                            <div className="space-y-2">
                                <Label>Deskripsi <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Textarea value={albumMeta.description} onChange={e => setAlbumMeta(m => ({ ...m, description: e.target.value }))} rows={2} />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                <Input type="date" value={albumMeta.taken_at} onChange={e => setAlbumMeta(m => ({ ...m, taken_at: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Foto-foto <span className="text-red-500">*</span></Label>
                                <Input type="file" accept="image/*" multiple onChange={e => handleAlbumFiles(e.target.files)} />
                                <p className="text-xs text-slate-400">Pilih beberapa foto sekaligus. Foto pertama jadi cover.</p>
                            </div>
                            {previewLoading && (
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                    <span>Memproses foto...</span>
                                </div>
                            )}
                            {!previewLoading && albumPreviews.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {albumPreviews.map((src, i) => (
                                        <div key={i} className={`relative aspect-square rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-emerald-500' : 'border-slate-200'}`}>
                                            {src
                                                ? <img src={src} className="w-full h-full object-cover" alt="" />
                                                : <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-1">
                                                    <Image className="w-6 h-6" />
                                                    <span className="text-[10px]">HEIC</span>
                                                  </div>
                                            }
                                            {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white text-[10px] text-center py-0.5">Cover</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Link href="/dashboard/documentations" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50">Batal</Link>
                                <Button type="submit" disabled={albumProcessing || !albumFiles.length} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/20">
                                    <Save className="w-5 h-5 mr-2" /> Simpan Album ({albumFiles.length} foto)
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Bulk */}
                {mode === 'bulk' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                        <form onSubmit={submitBulk} className="space-y-6">
                            <div className="flex gap-4 flex-wrap items-end">
                                <div className="flex-1 min-w-[180px] space-y-2">
                                    <Label>Tanggal default <span className="text-slate-400 text-xs">(opsional)</span></Label>
                                    <Input type="date" value={sharedDate} onChange={e => {
                                        setSharedDate(e.target.value);
                                        setBulkItems(items => items.map(i => ({ ...i, taken_at: e.target.value })));
                                    }} />
                                </div>
                                <div className="flex-1 min-w-[200px] space-y-2">
                                    <Label>Pilih foto-foto <span className="text-red-500">*</span></Label>
                                    <Input type="file" accept="image/*" multiple onChange={e => handleBulkFiles(e.target.files)} />
                                    {previewLoading && (
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                            <span>Memproses foto...</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {bulkItems.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium text-slate-700">{bulkItems.length} foto — edit judul/tanggal per foto:</p>
                                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                                        {bulkItems.map((item, i) => (
                                            <div key={i} className="flex gap-3 items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                {item.preview
                                                    ? <img src={item.preview} className="w-16 h-16 object-cover rounded-lg shrink-0" alt="" />
                                                    : <div className="w-16 h-16 rounded-lg shrink-0 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                                                        <Image className="w-5 h-5" />
                                                        <span className="text-[9px]">HEIC</span>
                                                      </div>
                                                }
                                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <Input
                                                        placeholder="Judul (opsional)"
                                                        value={item.title}
                                                        onChange={e => setBulkItems(items => items.map((it, idx) => idx === i ? { ...it, title: e.target.value } : it))}
                                                    />
                                                    <Input
                                                        type="date"
                                                        value={item.taken_at}
                                                        onChange={e => setBulkItems(items => items.map((it, idx) => idx === i ? { ...it, taken_at: e.target.value } : it))}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Link href="/dashboard/documentations" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50">Batal</Link>
                                <Button type="submit" disabled={bulkProcessing || !bulkItems.length} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-900/20">
                                    <Save className="w-5 h-5 mr-2" /> Upload {bulkItems.length} Postingan
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, Camera, CalendarDays, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DocumentationIndex({ documentations }: { documentations: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Dokumentasi', href: '/dashboard/documentations' },
    ];

    const { flash } = usePage().props as any;

    function handleDelete(id: number) {
        if (confirm('Hapus dokumentasi ini?')) {
            router.delete(`/dashboard/documentations/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Dokumentasi" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dokumentasi</h2>
                        <p className="text-muted-foreground">Kelola foto dan dokumentasi kegiatan desa.</p>
                    </div>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Link href="/dashboard/documentations/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Dokumentasi
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {documentations.data.length > 0 ? (
                        documentations.data.map((doc: any) => (
                            <div key={doc.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden">
                                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                    {doc.image_path ? (
                                        <img
                                            src={`/storage/${doc.image_path}`}
                                            alt={doc.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Camera className="w-12 h-12 text-slate-300" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                    {doc.images_count > 0 && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                                            <Images className="w-3 h-3" /> {doc.images_count + 1}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col gap-2">
                                    <h3 className="font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                                        {doc.title}
                                    </h3>

                                    {doc.taken_at && (
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <CalendarDays className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(doc.taken_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    )}

                                    {doc.description && (
                                        <p className="text-xs text-slate-500 line-clamp-2">{doc.description}</p>
                                    )}

                                    <div className="mt-auto pt-3 flex gap-2 justify-end border-t border-slate-100">
                                        <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 rounded-full border-slate-200 hover:border-emerald-300 hover:text-emerald-600">
                                            <Link href={`/dashboard/documentations/${doc.id}/edit`}>
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(doc.id)} className="h-8 w-8 p-0 rounded-full border-slate-200 hover:border-red-300 hover:text-red-600">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Camera className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Belum ada dokumentasi</h3>
                            <p className="text-slate-500 mb-6">Mulai dengan menambahkan foto dokumentasi kegiatan.</p>
                            <Button asChild>
                                <Link href="/dashboard/documentations/create">Tambah Dokumentasi</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {documentations.links && documentations.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {documentations.links.map((link: any, key: number) => (
                            <Link
                                key={key}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-sm rounded-md border ${link.active ? 'bg-primary text-primary-foreground' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={!link.url}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

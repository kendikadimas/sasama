import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BusinessIndex({ businesses }: { businesses: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Usaha Desa', href: '/dashboard/businesses' },
    ];

    const { flash } = usePage().props as any;

    function handleDelete(id: number) {
        if (confirm('Hapus data usaha ini?')) {
            router.delete(`/dashboard/businesses/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Usaha Desa" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Usaha Desa</h2>
                        <p className="text-muted-foreground">Kelola data usaha dan UMKM desa.</p>
                    </div>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Link href="/dashboard/businesses/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Usaha
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.data.length > 0 ? (
                        businesses.data.map((business: any) => (
                            <div key={business.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden">
                                {business.image_path ? (
                                    <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                                        <img src={`/storage/${business.image_path}`} alt={business.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                    </div>
                                ) : (
                                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />
                                )}

                                <div className="p-6 flex-1 flex flex-col gap-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                                            {business.name}
                                        </h3>
                                        {business.category && (
                                            <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                                {business.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1.5 text-sm text-slate-600">
                                        {business.address && (
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                                <span className="line-clamp-2">{business.address}</span>
                                            </div>
                                        )}
                                        {business.contact && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span>{business.contact}</span>
                                            </div>
                                        )}
                                        {business.website_url && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                                                <a href={business.website_url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline truncate">
                                                    {business.website_url}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 flex gap-2 justify-end border-t border-slate-100">
                                        <Button variant="outline" size="sm" asChild className="h-9 w-9 p-0 rounded-full border-slate-200 hover:border-emerald-300 hover:text-emerald-600">
                                            <Link href={`/dashboard/businesses/${business.id}/edit`}>
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(business.id)} className="h-9 w-9 p-0 rounded-full border-slate-200 hover:border-red-300 hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Belum ada data</h3>
                            <p className="text-slate-500 mb-6">Mulai dengan menambahkan usaha desa baru.</p>
                            <Button asChild>
                                <Link href="/dashboard/businesses/create">Tambah Usaha</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {businesses.links && businesses.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {businesses.links.map((link: any, key: number) => (
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

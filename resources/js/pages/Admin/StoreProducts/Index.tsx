import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'SASAMA Store', href: '/dashboard/store-products' },
];

export default function StoreProductIndex({ products }: { products: any }) {
    const { flash } = usePage().props as any;

    function handleDelete(id: number) {
        if (confirm('Hapus produk ini?')) {
            router.delete(`/dashboard/store-products/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SASAMA Store" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">SASAMA Store</h2>
                        <p className="text-muted-foreground">Kelola produk yang dijual di SASAMA Store.</p>
                    </div>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Link href="/dashboard/store-products/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Produk
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">{flash.success}</div>
                )}

                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-4 py-3 text-left font-semibold text-slate-600">Foto</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600">Nama</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600">Harga</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                                <th className="px-4 py-3 text-right font-semibold text-slate-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-slate-400">Belum ada produk.</td>
                                </tr>
                            ) : products.data.map((p: any) => (
                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="px-4 py-3">
                                        {p.image_path ? (
                                            <img src={`/storage/${p.image_path}`} alt={p.name} className="h-12 w-16 object-cover rounded-lg" />
                                        ) : (
                                            <div className="h-12 w-16 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <ImageOff className="h-4 w-4 text-slate-300" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{p.price}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                                            {p.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/dashboard/store-products/${p.id}/edit`} className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.links && products.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {products.links.map((link: any, key: number) => (
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

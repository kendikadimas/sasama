import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProgramIndex({ programs }: { programs: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Program SASANA', href: '/dashboard/programs' },
    ];

    const { flash } = usePage().props as any;

    function handleDelete(id: number) {
        if (confirm('Hapus program ini?')) {
            router.delete(`/dashboard/programs/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Program SASANA" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Program SASANA</h2>
                        <p className="text-muted-foreground">Kelola program dan kegiatan desa.</p>
                    </div>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Link href="/dashboard/programs/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Program
                        </Link>
                    </Button>
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                        {flash.success}
                    </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-6 py-3 text-left font-semibold text-slate-600">Judul</th>
                                <th className="px-6 py-3 text-left font-semibold text-slate-600">Status</th>
                                <th className="px-6 py-3 text-left font-semibold text-slate-600">Tanggal</th>
                                <th className="px-6 py-3 text-right font-semibold text-slate-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.data.length > 0 ? (
                                programs.data.map((program: any) => (
                                    <tr key={program.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{program.title}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${program.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {program.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(program.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 rounded-full border-slate-200 hover:border-emerald-300 hover:text-emerald-600">
                                                    <Link href={`/dashboard/programs/${program.id}/edit`}>
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleDelete(program.id)} className="h-8 w-8 p-0 rounded-full border-slate-200 hover:border-red-300 hover:text-red-600">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                                                <Plus className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <p className="font-medium text-slate-500">Belum ada program</p>
                                            <Button asChild size="sm">
                                                <Link href="/dashboard/programs/create">Tambah Program</Link>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {programs.links && programs.links.length > 3 && (
                    <div className="flex w-full justify-center space-x-2 mt-4">
                        {programs.links.map((link: any, key: number) => (
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

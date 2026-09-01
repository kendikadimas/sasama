import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelompok Potensi', href: '#' },
];

interface Group { id: number; name: string; order: number; }

export default function PotentialGroupIndex({ groups }: { groups: Group[] }) {
    const destroy = (id: number) => {
        if (confirm('Hapus kelompok ini? Potensi di dalamnya tidak akan terhapus.')) {
            router.delete(`/dashboard/potential-groups/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelompok Potensi" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Kelompok Potensi</h1>
                    <Button asChild className="gap-2">
                        <Link href="/dashboard/potential-groups/create"><Plus className="w-4 h-4" /> Tambah</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {groups.length === 0 ? (
                        <p className="p-8 text-center text-slate-400">Belum ada kelompok.</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3 text-left">Nama</th>
                                    <th className="px-4 py-3 text-left">Urutan</th>
                                    <th className="px-4 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {groups.map(g => (
                                    <tr key={g.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{g.name}</td>
                                        <td className="px-4 py-3 text-slate-500">{g.order}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/dashboard/potential-groups/${g.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link>
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => destroy(g.id)}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

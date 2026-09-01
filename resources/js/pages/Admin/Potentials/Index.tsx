import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Phone, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Potensi Desa', href: '/dashboard/potentials' },
];

export default function PotentialIndex({ potentials, groups }: { potentials: any; groups: any[] }) {
    const [tab, setTab] = useState<'potentials' | 'groups'>('potentials');
    const [filterGroup, setFilterGroup] = useState<string>('');
    const { flash } = usePage().props as any;

    const filteredPotentials = filterGroup
        ? potentials.data.filter((p: any) => p.potential_group?.id === Number(filterGroup))
        : potentials.data;

    function handleDeletePotential(id: number) {
        if (confirm('Hapus potensi ini?')) router.delete(`/dashboard/potentials/${id}`);
    }

    function handleDeleteGroup(id: number) {
        if (confirm('Hapus kelompok ini? Potensi di dalamnya tidak ikut terhapus.')) {
            router.delete(`/dashboard/potential-groups/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Potensi Desa" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Potensi Desa</h2>
                    {tab === 'potentials' ? (
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                            <Link href="/dashboard/potentials/create"><Plus className="mr-2 h-4 w-4" />Tambah Potensi</Link>
                        </Button>
                    ) : (
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                            <Link href="/dashboard/potential-groups/create"><Plus className="mr-2 h-4 w-4" />Tambah Kelompok</Link>
                        </Button>
                    )}
                </div>

                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">{flash.success}</div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 border-b border-slate-200">
                    {(['potentials', 'groups'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                tab === t
                                    ? 'border-emerald-600 text-emerald-700'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {t === 'potentials' ? 'Isi Potensi' : 'Kelompok Potensi'}
                        </button>
                    ))}
                </div>

                {/* Tab: Isi Potensi */}
                {tab === 'potentials' && (
                    <>
                        {/* Filter */}
                        <div className="flex items-center gap-3">
                            <select
                                value={filterGroup}
                                onChange={e => setFilterGroup(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="">Semua Kelompok</option>
                                {groups.map((g: any) => (
                                    <option key={g.id} value={String(g.id)}>{g.name}</option>
                                ))}
                            </select>
                            {filterGroup && (
                                <button onClick={() => setFilterGroup('')} className="text-xs text-slate-400 hover:text-slate-600">
                                    Reset
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPotentials.length > 0 ? filteredPotentials.map((p: any) => (
                            <div key={p.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg transition-all flex flex-col group overflow-hidden">
                                {p.image_path ? (
                                    <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                                        <img src={`/storage/${p.image_path}`} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
                                    </div>
                                ) : (
                                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />
                                )}
                                <div className="p-5 flex-1 flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">{p.name}</h3>
                                        {p.potential_group && (
                                            <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                                                <Layers className="w-3 h-3" />{p.potential_group.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <span>{p.contact_info || '-'}</span>
                                    </div>
                                    <div className="mt-auto pt-3 flex gap-2 justify-end border-t border-slate-100">
                                        <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0 rounded-full">
                                            <Link href={`/dashboard/potentials/${p.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDeletePotential(p.id)} className="h-8 w-8 p-0 rounded-full hover:border-red-300 hover:text-red-600">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-16 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 mb-4">Belum ada potensi.</p>
                                <Button asChild><Link href="/dashboard/potentials/create">Tambah Potensi</Link></Button>
                            </div>
                        )}
                    </div>
                    </>
                )}

                {/* Tab: Kelompok */}
                {tab === 'groups' && (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {groups.length === 0 ? (
                            <div className="py-16 text-center">
                                <p className="text-slate-500 mb-4">Belum ada kelompok.</p>
                                <Button asChild><Link href="/dashboard/potential-groups/create">Tambah Kelompok</Link></Button>
                            </div>
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
                                    {groups.map((g: any) => (
                                        <tr key={g.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">{g.name}</td>
                                            <td className="px-4 py-3 text-slate-500">{g.order}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/dashboard/potential-groups/${g.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteGroup(g.id)}>
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
                )}

                {/* Pagination */}
                {tab === 'potentials' && potentials.links?.length > 3 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {potentials.links.map((link: any, key: number) => (
                            <Link key={key} href={link.url || '#'} className={`px-4 py-2 text-sm rounded-md border ${link.active ? 'bg-primary text-primary-foreground' : 'bg-white text-slate-700 hover:bg-slate-50'}`} dangerouslySetInnerHTML={{ __html: link.label }} disabled={!link.url} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

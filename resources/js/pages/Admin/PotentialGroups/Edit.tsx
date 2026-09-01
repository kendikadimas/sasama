import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelompok Potensi', href: '/dashboard/potential-groups' },
    { title: 'Edit', href: '#' },
];

export default function PotentialGroupEdit({ group }: { group: any }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: group.name ?? '',
        order: String(group.order ?? 0),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dashboard/potential-groups/${group.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kelompok Potensi" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/potential-groups" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Edit Kelompok Potensi</h1>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-lg">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Kelompok <span className="text-red-500">*</span></Label>
                            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="order">Urutan</Label>
                            <Input id="order" type="number" min="0" value={data.order} onChange={e => setData('order', e.target.value)} />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing} className="gap-2">
                                <Save className="w-4 h-4" /> Simpan
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/potential-groups">Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

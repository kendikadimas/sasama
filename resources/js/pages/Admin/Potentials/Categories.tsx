import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash2, Mountain, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function PotentialCategories({ categories }: { categories: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Potensi Desa', href: '/dashboard/potentials' },
        { title: 'Kategori', href: '#' },
    ];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        is_active: true,
    });

    const handleCreate = () => {
        reset();
        clearErrors();
        setIsCreateOpen(true);
    };

    const handleEdit = (item: any) => {
        reset();
        clearErrors();
        setEditingItem(item);
        setData({
            name: item.name,
            description: item.description || '',
            is_active: !!item.is_active,
        });
    };

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('potential-categories.store'), {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            }
        });
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;
        put(route('potential-categories.update', editingItem.id), {
            onSuccess: () => {
                setEditingItem(null);
                reset();
            }
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('potential-categories.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori Potensi Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={route('potentials.index')}>
                            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                                <ArrowLeft className="w-5 h-5 text-slate-500" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Kategori Potensi</h1>
                            <p className="text-slate-500 text-sm">Kelola kategori untuk potensi dan produk desa.</p>
                        </div>
                    </div>
                    <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Kategori
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Card key={category.id} className="hover:shadow-lg transition-shadow border-slate-200 overflow-hidden group">
                            <CardHeader className="bg-white pb-4 relative">
                                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)} className="h-8 w-8 text-slate-400 hover:text-blue-600">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Kategori "{category.name}" akan dihapus. Pastikan tidak ada potensi yang menggunakan kategori ini.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-red-600 hover:bg-red-700">
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                                    {category.slug === 'wisata' || category.slug === 'tourism' ?
                                        <Mountain className="w-6 h-6" /> :
                                        <ShoppingBag className="w-6 h-6" />
                                    }
                                </div>
                                <CardTitle className="text-xl text-slate-900">{category.name}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-1">
                                    {category.description || 'Tidak ada deskripsi'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                                    <span>Status</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${category.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {category.is_active ? 'Aktif' : 'Non-Aktif'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Create Dialog */}
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Kategori</DialogTitle>
                            <DialogDescription>Buat kategori baru untuk pengelompokan potensi desa.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Kategori <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Contoh: Kuliner, Kerajinan"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat..."
                                />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                                <Label htmlFor="active" className="cursor-pointer">Status Aktif</Label>
                                <Switch
                                    id="active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">Simpan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Kategori</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Kategori <span className="text-red-500">*</span></Label>
                                <Input
                                    id="edit-name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Deskripsi</Label>
                                <Textarea
                                    id="edit-description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                                <Label htmlFor="edit-active" className="cursor-pointer">Status Aktif</Label>
                                <Switch
                                    id="edit-active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Batal</Button>
                                <Button type="submit" disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">Simpan Perubahan</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppSidebarLayout>
    );
}

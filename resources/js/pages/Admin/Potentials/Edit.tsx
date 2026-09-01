import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Potensi Desa', href: '/dashboard/potentials' },
    { title: 'Edit', href: '#' },
];

export default function PotentialEdit({ potential, groups }: { potential: any; groups: { id: number; name: string }[] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: potential.name ?? '',
        potential_group_id: potential.potential_group_id ? String(potential.potential_group_id) : '',
        description: potential.description ?? '',
        lat: potential.lat != null ? String(potential.lat) : '',
        lng: potential.lng != null ? String(potential.lng) : '',
        contact_info: potential.contact_info ?? '',
        image: null as File | null,
    });

    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<any>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        const loadLeaflet = () => {
            if ((window as any).L) { initMap(); return; }
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = initMap;
            document.head.appendChild(script);
        };

        const initMap = () => {
            const L = (window as any).L;
            if (!mapRef.current || mapInstanceRef.current) return;

            const initLat = potential.lat ?? -7.73;
            const initLng = potential.lng ?? 109.0;
            const map = L.map(mapRef.current).setView([initLat, initLng], 13);
            mapInstanceRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            if (potential.lat && potential.lng) {
                markerRef.current = L.marker([potential.lat, potential.lng]).addTo(map);
            }

            map.on('click', (e: any) => {
                const { lat, lng } = e.latlng;
                setData(prev => ({ ...prev, lat: lat.toFixed(6), lng: lng.toFixed(6) }));
                if (markerRef.current) {
                    markerRef.current.setLatLng(e.latlng);
                } else {
                    markerRef.current = L.marker(e.latlng).addTo(map);
                }
            });
        };

        loadLeaflet();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
            }
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/dashboard/potentials/${potential.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Potensi Desa" />

            <div className="p-6 md:p-8 space-y-8 bg-slate-50/50 min-h-full">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/potentials" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Edit Potensi Desa</h1>
                        <p className="text-slate-500 text-sm">Perbarui data potensi wisata atau produk unggulan.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 max-w-4xl">
                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Potensi <span className="text-red-500">*</span></Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="group">Kelompok</Label>
                                <Select value={data.potential_group_id} onValueChange={v => setData('potential_group_id', v)}>
                                    <SelectTrigger id="group">
                                        <SelectValue placeholder="Pilih kelompok" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groups.map(g => (
                                            <SelectItem key={g.id} value={String(g.id)}>{g.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.potential_group_id && <p className="text-xs text-red-500">{errors.potential_group_id}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi <span className="text-red-500">*</span></Label>
                            <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={4} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact_info">Kontak</Label>
                            <Input id="contact_info" value={data.contact_info} onChange={e => setData('contact_info', e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label>Lokasi di Peta <span className="text-slate-400 text-xs font-normal">(klik peta untuk memperbarui)</span></Label>
                            <div ref={mapRef} className="w-full h-64 rounded-xl border border-slate-200 bg-slate-100 z-0" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="lat" className="text-xs text-slate-500">Latitude</Label>
                                    <Input id="lat" value={data.lat} onChange={e => setData('lat', e.target.value)} className="font-mono text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lng" className="text-xs text-slate-500">Longitude</Label>
                                    <Input id="lng" value={data.lng} onChange={e => setData('lng', e.target.value)} className="font-mono text-sm" />
                                </div>
                            </div>
                        </div>

                        {potential.image_path && (
                            <div className="space-y-2">
                                <Label className="text-sm text-slate-500">Foto Saat Ini</Label>
                                <img src={`/storage/${potential.image_path}`} alt={potential.name} className="h-32 rounded-lg object-cover border border-slate-200" />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="image">Ganti Foto</Label>
                            <Input id="image" type="file" accept="image/*" onChange={e => setData('image', e.target.files?.[0] ?? null)} />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link href="/dashboard/potentials" className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
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

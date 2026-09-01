import { Head, Link } from '@inertiajs/react';

import {
    Leaf,
    Phone,
    ImageOff,
    Users,
    CheckSquare,
    Recycle,
    Wallet,
    GraduationCap,
    ShoppingBag,
    MapPin,
    ExternalLink,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

type Sector = 'pertanian' | 'peternakan' | 'perikanan' | 'pariwisata' | 'umkm' | 'lainnya';

interface Potential {
    id: number;
    name: string;
    potential_group_id: number | null;
    description: string;
    lat: number | null;
    lng: number | null;
    image_path: string | null;
    contact_info: string | null;
}

interface PotentialGroup {
    id: number;
    name: string;
    order: number;
    potentials: Potential[];
}

interface PotensiProps {
    groups: PotentialGroup[];
    potentials: Potential[];
}


const SECTOR_LABELS: Record<Sector, string> = {
    pertanian:  'Pertanian',
    peternakan: 'Peternakan',
    perikanan:  'Perikanan',
    pariwisata: 'Pariwisata',
    umkm:       'UMKM',
    lainnya:    'Lainnya',
};

const SECTOR_COLORS: Record<Sector, string> = {
    pertanian:  'bg-green-100 text-green-800',
    peternakan: 'bg-yellow-100 text-yellow-800',
    perikanan:  'bg-blue-100 text-blue-800',
    pariwisata: 'bg-orange-100 text-orange-800',
    umkm:       'bg-purple-100 text-purple-800',
    lainnya:    'bg-slate-100 text-slate-700',
};

const CAPAIAN_STATS = [
    { icon: Users,       value: '3',        label: 'RW Sasaran Program' },
    { icon: CheckSquare, value: '50+',      label: 'Kegiatan Terlaksana' },
    { icon: Recycle,     value: '2,3 Ton',  label: 'Sampah Terkelola' },
    { icon: Wallet,      value: 'Rp 5.000', label: 'Pengurangan Biaya Sampah/Minggu' },
    { icon: Users,       value: '100+',     label: 'Masyarakat Terlibat' },
];

const CAPAIAN_BIDANG = [
    {
        icon: GraduationCap,
        label: 'Edukasi & Kesadaran',
        desc: 'Meningkatnya kesadaran masyarakat dalam mengelola sampah.',
        value: '100%',
        sub: 'Kegiatan Terlaksana',
    },
    {
        icon: Recycle,
        label: 'Pengelolaan Sampah',
        desc: 'Terbentuknya sistem pengelolaan sampah berbasis masyarakat.',
        value: '30%',
        sub: 'Kegiatan Terlaksana',
    },
    {
        icon: ShoppingBag,
        label: 'Pemberdayaan Ekonomi',
        desc: 'Meningkatnya peluang pendapatan dari produk sampah & potensi lokal.',
        value: '43%',
        sub: 'Peningkatan Peluang Pendapatan',
    },
    {
        icon: Leaf,
        label: 'Kelestarian Lingkungan',
        desc: 'Lingkungan desa lebih bersih dan kualitas hidup meningkat.',
        value: '100%',
        sub: 'Kegiatan Terlaksana',
    },
];

function PotentialCard({ item }: { item: Potential }) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
            {item.image_path ? (
                <img
                    src={`/storage/${item.image_path}`}
                    alt={item.name}
                    className="h-44 w-full object-cover"
                />
            ) : (
                <div className="flex h-44 w-full items-center justify-center bg-emerald-50">
                    <ImageOff className="h-10 w-10 text-emerald-200" />
                </div>
            )}
            <div className="p-4">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 leading-snug">{item.name}</h3>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${SECTOR_COLORS[item.sector]}`}>
                        {SECTOR_LABELS[item.sector]}
                    </span>
                </div>
                <p className="mb-3 line-clamp-3 text-sm text-slate-500">{item.description}</p>
                {item.contact_info && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Phone className="h-3 w-3 shrink-0" />
                        <span>{item.contact_info}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 py-14 text-center">
            <ImageOff className="mx-auto mb-2 h-8 w-8 text-slate-200" />
            <p className="text-sm font-medium text-slate-400">Belum ada data {label}</p>
        </div>
    );
}

function MapSection() {
    return (
        <section className="bg-white px-4 py-14">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                    Peta Desa Bojongjengkol
                </h2>
                <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-3">
                        <div>
                            <p className="text-sm font-bold text-slate-900">Desa Bojongjengkol</p>
                            <p className="text-xs text-slate-500">Kec. Ciampea, Kab. Bogor</p>
                        </div>
                        <a
                            href="https://maps.google.com/?q=Bojong+Jengkol+Ciampea+Bogor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                        >
                            <MapPin className="h-3.5 w-3.5" />
                            Lihat di Google Maps
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31708.656952350928!2d106.68820025583763!3d-6.574304578812613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69db39826105b7%3A0x40629d034410e4eb!2sBojong%20Jengkol%2C%20Kec.%20Ciampea%2C%20Kabupaten%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1788200455158!5m2!1sid!2sid"
                        className="h-[420px] w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="Peta Desa Bojongjengkol"
                    />
                </div>
            </div>
        </section>
    );
}

export default function Potensi({ groups, potentials }: PotensiProps) {
    return (
        <PublicLayout>
            <Head title="Potensi Desa Binaan dan Capaian SASAMA" />

            {/* Hero */}
            <section className="relative h-[280px] sm:h-[320px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000"
                        alt="Potensi Desa"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald-950/70" />
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                    <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                        POTENSI DESA BINAAN<br />DAN CAPAIAN SASAMA
                    </h1>
                    <p className="mt-3 text-sm text-white/75">
                        Menggali potensi desa dan melihat capaian nyata program SASAMA.
                    </p>
                </div>
            </section>

            {/* Dynamic Groups */}
            {groups.map((group, idx) => (
                <section key={group.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} px-6 py-20`}>
                    <div className="mx-auto max-w-6xl">
                        <h2 className="mb-10 text-2xl font-bold uppercase text-emerald-700">
                            {group.name}
                        </h2>
                        {group.potentials.length === 0 ? (
                            <EmptyState label={group.name.toLowerCase()} />
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {group.potentials.map((item) => (
                                    <PotentialCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            ))}

            <section className="bg-white px-6 py-20 border-t border-slate-100">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-emerald-700 uppercase">Capaian SASAMA</h2>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3 lg:grid-cols-5 border border-slate-100 rounded-2xl overflow-hidden">
                        {CAPAIAN_STATS.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex flex-col items-center justify-center px-6 py-10 text-center bg-white hover:bg-slate-50 transition-colors">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                                    <Icon className="h-7 w-7 text-emerald-600" />
                                </div>
                                <p className="text-3xl font-black text-emerald-700 leading-none">{value}</p>
                                <p className="mt-2.5 text-xs text-slate-500 leading-snug">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-emerald-700 uppercase">Capaian Per Bidang</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {CAPAIAN_BIDANG.map(({ icon: Icon, label, desc, value, sub }) => (
                            <div key={label} className="flex flex-col items-center text-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                    <Icon className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="mb-2 text-sm font-bold text-slate-900">{label}</h3>
                                <p className="mb-6 text-xs leading-relaxed text-slate-500 flex-1">{desc}</p>
                                <p className="text-3xl font-black text-emerald-700">{value}</p>
                                <p className="mt-1 text-[11px] font-medium text-slate-500">{sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <MapSection />
        </PublicLayout>
    );
}
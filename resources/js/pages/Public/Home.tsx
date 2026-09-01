import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    X,
    ArrowRight,
    ImageOff,
    MapPin,
    Ruler,
    AlertTriangle,
    GraduationCap,
    Recycle,
    ShoppingBag,
    Leaf,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

interface HomeProps {
    programs: Array<{
        id: number;
        title: string;
        description: string;
        image_path: string | null;
        is_active: boolean;
    }>;
    documentations: Array<{
        id: number;
        title: string | null;
        description: string | null;
        image_path: string;
        taken_at: string | null;
    }>;
}


const PROFIL_DESA = [
    {
        icon: MapPin,
        title: 'Letak Strategis',
        desc: 'Desa Bojongjengkol terletak di Kecamatan Ciampea, Kabupaten Bogor dengan jarak ±4,6 km dari Kampus IPB Dramaga.',
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=800',
    },
    {
        icon: Ruler,
        title: 'Data Wilayah',
        desc: 'Luas wilayah 214,35 Ha yang terdiri dari 12 RW dan 35 RT dengan jumlah penduduk 10.308 jiwa (3.233 KK).',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
    },
    {
        icon: AlertTriangle,
        title: 'Kondisi Lingkungan',
        desc: 'Menghadapi tantangan pengelolaan sampah rumah tangga yang belum terkelola secara optimal di beberapa RW.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    },
];

const PILLARS = [
    {
        label: 'Edukasi &\nKesadaran',
        svg: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0">
                {/* Toko/bangunan */}
                <rect x="6" y="18" width="36" height="24" rx="2"/>
                <path d="M6 18l4-10h28l4 10"/>
                <path d="M16 42V30h8v12"/>
                <path d="M28 30h8v8h-8z"/>
                <path d="M6 18h36"/>
            </svg>
        ),
    },
    {
        label: 'Pengelolaan\nSampah',
        svg: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0">
                {/* Kotak diamond/recycle */}
                <rect x="8" y="8" width="32" height="32" rx="4"/>
                <path d="M24 14v4M24 30v4"/>
                <path d="M14 24h4M30 24h4"/>
                <path d="M17 17l3 3M28 28l3 3"/>
                <path d="M31 17l-3 3M20 28l-3 3"/>
                <circle cx="24" cy="24" r="4"/>
            </svg>
        ),
    },
    {
        label: 'Pemberdayaan\nEkonomi',
        svg: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0">
                {/* Rumah dengan tanda panah naik */}
                <path d="M8 22L24 8l16 14"/>
                <path d="M14 22v18h20V22"/>
                <path d="M20 40V30h8v10"/>
                <path d="M28 16l6-6M28 10h6v6"/>
            </svg>
        ),
    },
    {
        label: 'Kelestarian\nLingkungan',
        svg: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 shrink-0">
                {/* Tanaman bercabang / pohon stilisasi */}
                <line x1="24" y1="44" x2="24" y2="20"/>
                <path d="M24 20 C24 20 12 18 10 8 C10 8 22 8 24 20Z"/>
                <path d="M24 28 C24 28 36 26 38 16 C38 16 26 16 24 28Z"/>
                <path d="M24 36 C24 36 14 34 12 26 C12 26 22 24 24 36Z"/>
            </svg>
        ),
    },
];

export default function Home({ programs, documentations }: HomeProps) {
    const [lightbox, setLightbox] = useState<{ src: string; title: string | null } | null>(null);
    const [showAllDocs, setShowAllDocs] = useState(false);
    const DOCS_INITIAL = 6;
    const visibleDocs = showAllDocs ? documentations : documentations.slice(0, DOCS_INITIAL);
    return (
        <PublicLayout>
            <Head title="Beranda - SASAMA" />

            {/* Section Nav tab (1-2-3) — sticky di bawah navbar */}
            {/* Hero */}
            <section className="relative h-[400px] sm:h-[440px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
                        alt="Desa Bojongjengkol"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-950/50 to-emerald-950/10" />
                </div>
                <div className="relative z-10 flex h-full items-center">
                    <div className="mx-auto w-full max-w-6xl px-6">
                        <div className="max-w-xl">
                            <p className="mb-1 text-xl font-medium text-white/80">Selamat Datang di</p>
                            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                                DESA BOJONGJENGKOL
                            </h1>
                            <p className="mb-6 text-lg leading-relaxed text-white/75">
                                Bersama SASAMA, wujudkan desa cerdas sampah <br className="hidden sm:block" />
                                yang mandiri, bersih, dan berdaya.
                            </p>
                            <Link
                                href="/potensi"
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                            >
                                Kenali Lebih Dekat Desa Kami <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profil Desa Binaan */}
            <section className="bg-white px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700 ">
                        Profil Desa Binaan
                    </h2>
                    <div className="grid gap-7 sm:grid-cols-3">
                        {PROFIL_DESA.map(({ icon: Icon, title, desc, image }) => (
                            <div key={title} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="mb-2 font-bold text-emerald-700">{title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tentang SASAMA */}
            <section className="bg-white px-4 pb-14">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 h-px bg-slate-100" />
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                        Tentang SASAMA
                    </h2>
                    <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-500">
                        SASAMA (Sinergi Aksi Sampah Masyarakat) merupakan Program PPK Ormawa BEM FEM 2026 yang menaungi desa binaan Desa Bojongjengkol dengan program pemberdayaan masyarakat yang berfokus pada pengelolaan sampah berbasis masyarakat dengan pengembangan ekonomi lokal yang berkelanjutan.
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {PILLARS.map(({ svg, label }) => (
                            <div key={label} className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-2 ring-emerald-200 text-emerald-700">
                                    {svg}
                                </div>
                                <span className="text-xs font-semibold leading-tight text-slate-800">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program SASAMA — data dari DB */}
            <section className="bg-slate-50 px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                        Program SASAMA
                    </h2>
                    {programs.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
                            <ImageOff className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                            <p className="font-medium text-slate-500">Belum ada program</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {programs.map((program) => (
                                <div
                                    key={program.id}
                                    className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
                                >
                                    {program.image_path ? (
                                        <img
                                            src={`/storage/${program.image_path}`}
                                            alt={program.title}
                                            className="h-44 w-full object-contain bg-white p-2"
                                        />
                                    ) : (
                                        <div className="flex h-44 w-full items-center justify-center bg-emerald-50">
                                            <Leaf className="h-12 w-12 text-emerald-300" />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="mb-2 font-bold text-slate-900">{program.title}</h3>
                                        <p className="line-clamp-3 text-sm text-slate-500">{program.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Dokumentasi Kegiatan — data dari DB */}
            <section className="bg-white px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                        Dokumentasi Kegiatan
                    </h2>
                    {documentations.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
                            <ImageOff className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                            <p className="font-medium text-slate-500">Belum ada dokumentasi</p>
                        </div>
                    ) : (
                        <>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {visibleDocs.map((doc) => (
                                <button
                                    key={doc.id}
                                    type="button"
                                    onClick={() => setLightbox({ src: `/storage/${doc.image_path}`, title: doc.title })}
                                    className="group relative aspect-video overflow-hidden rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <img
                                        src={`/storage/${doc.image_path}`}
                                        alt={doc.title ?? ''}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                                        {doc.title && <p className="line-clamp-2 text-xs font-medium text-white">{doc.title}</p>}
                                    </div>
                                </button>
                            ))}
                        </div>
                        {!showAllDocs && documentations.length > DOCS_INITIAL && (
                            <div className="mt-8 text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAllDocs(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-600"
                                >
                                    Lihat Semua Dokumentasi <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        type="button"
                        onClick={() => setLightbox(null)}
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                        aria-label="Tutup"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="max-h-[90vh] max-w-5xl" onClick={e => e.stopPropagation()}>
                        <img
                            src={lightbox.src}
                            alt={lightbox.title ?? ''}
                            className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
                        />
                        {lightbox.title && (
                            <p className="mt-3 text-center text-sm font-medium text-white/80">{lightbox.title}</p>
                        )}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
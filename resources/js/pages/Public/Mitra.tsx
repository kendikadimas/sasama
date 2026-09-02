import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ExternalLink, MapPin, Phone, Tag, Clock, X, ImageOff, Search, Truck, ShieldCheck, Leaf, MessageCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Business {
    id: number;
    name: string;
    description: string;
    category: string | null;
    address: string | null;
    rw: string | null;
    contact: string | null;
    operating_hours: string | null;
    image_path: string | null;
    website_url: string | null;
    instagram_url: string | null;
    shopee_url: string | null;
    facebook_url: string | null;
    tiktok_url: string | null;
    halal_cert_number: string | null;
    halal_status: string | null;
    images: { id: number; image_path: string }[];
}

interface StoreProduct {
    id: number;
    name: string;
    price: string;
    description: string | null;
    wa_message: string | null;
    image_path: string | null;
    images: { id: number; image_path: string }[];
}

interface MitraProps {
    businesses: Business[];
    categories: string[];
    featured: Business | null;
    storeProducts: StoreProduct[];
}

// ─── Constants ───────────────────────────────────────────────────────────────


const WA_NUMBER = '6281234567890';

const STORE_FEATURES = [
    { icon: Truck, label: 'Pengiriman Cepat', desc: 'Produk dikirim dengan aman dan tepat waktu.' },
    { icon: ShieldCheck, label: 'Produk Berkualitas', desc: 'Produk dipilih secara selektif dan berkualitas.' },
    { icon: Leaf, label: 'Dukung Produk Lokal', desc: 'Berbelanja berarti mendukung ekonomi desa.' },
];

const PARTNERS = [
    {
        name: 'IPB University',
        logo: '/assets/logo/Logo IPB University_Horizontal.png',
    },
    {
        name: 'Desa Bojongjengkol',
        logo: '/assets/logo/Logo.png',
    },
];

// ─── Business detail modal ────────────────────────────────────────────────────

function BusinessModal({ biz, onClose }: { biz: Business; onClose: () => void }) {
    const allImages = [
        ...(biz.image_path ? [{ id: 0, image_path: biz.image_path }] : []),
        ...(biz.images ?? []),
    ];
    const [activeImg, setActiveImg] = useState(0);
    const [halalOpen, setHalalOpen] = useState(false);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {allImages.length > 0 ? (
                    <img src={`/storage/${allImages[activeImg].image_path}`} alt={biz.name} className="w-full h-56 object-cover" />
                ) : (
                    <div className="w-full h-56 bg-emerald-50 flex items-center justify-center">
                        <ImageOff className="h-12 w-12 text-emerald-200" />
                    </div>
                )}
                {allImages.length > 1 && (
                    <div className="flex gap-2 px-4 py-2 bg-black/40 absolute bottom-0 left-0 right-0">
                        {allImages.map((img, i) => (
                            <button
                                key={img.id}
                                onClick={() => setActiveImg(i)}
                                className={`h-12 w-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${i === activeImg ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={`/storage/${img.image_path}`} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow text-slate-600 hover:text-slate-900"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <h2 className="text-xl font-black text-slate-900">{biz.name}</h2>
                        {biz.category && (
                            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                <Tag className="h-3 w-3" />{biz.category}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{biz.description}</p>
                    <div className="space-y-2.5 text-sm">
                        {biz.address && (
                            <div className="flex items-start gap-2 text-slate-500">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                                <span>{biz.address}{biz.rw ? ` — RW ${biz.rw}` : ''}</span>
                            </div>
                        )}
                        {biz.contact && (
                            <div className="flex items-center gap-2 text-slate-500">
                                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                                <a href={`tel:${biz.contact}`} className="hover:text-emerald-700">{biz.contact}</a>
                            </div>
                        )}
                        {biz.operating_hours && (
                            <div className="flex items-center gap-2 text-slate-500">
                                <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
                                <span>{biz.operating_hours}</span>
                            </div>
                        )}
                        {biz.halal_cert_number && (
                            <div>
                                <button
                                    onClick={() => setHalalOpen(v => !v)}
                                    className="flex items-center gap-2 w-full text-left rounded-lg px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm transition-colors"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    <span>Sertifikasi Halal</span>
                                    <ChevronDown className={`h-3.5 w-3.5 ml-auto transition-transform ${halalOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {halalOpen && (
                                    <div className="mt-1.5 rounded-lg border border-emerald-100 bg-white px-4 py-3 space-y-1.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Nama</span>
                                            <span className="font-medium text-slate-800">{biz.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">No. Sertifikat</span>
                                            <span className="font-medium text-slate-800 text-right">{biz.halal_cert_number}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Status</span>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${biz.halal_status === 'Terbit SH' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {biz.halal_status ?? '-'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {biz.website_url && (
                        <a
                            href={biz.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 text-sm font-bold transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" /> Kunjungi Website
                        </a>
                    )}
                    {(biz.instagram_url || biz.shopee_url || biz.facebook_url || biz.tiktok_url) && (
                        <div className="mt-3 flex items-center justify-center gap-2">
                            {biz.instagram_url && (
                                <a href={biz.instagram_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    Instagram
                                </a>
                            )}
                            {biz.shopee_url && (
                                <a href={biz.shopee_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 7h-1.06A6.5 6.5 0 0 0 12 1.5 6.5 6.5 0 0 0 5.56 7H4.5A1.5 1.5 0 0 0 3 8.5v11A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 19.5 7zM12 3.5a4.5 4.5 0 0 1 4.44 3.5H7.56A4.5 4.5 0 0 1 12 3.5zm0 10a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/></svg>
                                    Shopee
                                </a>
                            )}
                            {biz.facebook_url && (
                                <a href={biz.facebook_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    Facebook
                                </a>
                            )}
                            {biz.tiktok_url && (
                                <a href={biz.tiktok_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
                                    TikTok
                                </a>
                            )}
                        </div>
                    )}
                    {biz.address && (
                        <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(biz.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 text-sm font-medium transition-colors"
                        >
                            <MapPin className="h-4 w-4" /> Lihat di Google Maps
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Store Product detail modal ───────────────────────────────────────────────

function StoreProductModal({ product, onClose }: { product: StoreProduct; onClose: () => void }) {
    const allImages = [
        ...(product.image_path ? [{ id: 0, image_path: product.image_path }] : []),
        ...(product.images ?? []),
    ];
    const [activeImg, setActiveImg] = useState(0);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {allImages.length > 0 ? (
                    <img src={`/storage/${allImages[activeImg].image_path}`} alt={product.name} className="w-full h-56 object-cover" />
                ) : (
                    <div className="w-full h-56 bg-emerald-50 flex items-center justify-center">
                        <ImageOff className="h-12 w-12 text-emerald-200" />
                    </div>
                )}
                {allImages.length > 1 && (
                    <div className="flex gap-2 px-4 py-2 bg-black/40 absolute bottom-0 left-0 right-0">
                        {allImages.map((img, i) => (
                            <button
                                key={img.id}
                                onClick={() => setActiveImg(i)}
                                className={`h-12 w-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${i === activeImg ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={`/storage/${img.image_path}`} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow text-slate-600 hover:text-slate-900"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h2>
                    <p className="text-lg font-semibold text-emerald-700 mb-3">{product.price}</p>
                    {product.description && (
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">{product.description}</p>
                    )}
                    <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(product.wa_message ?? `Halo, saya ingin memesan ${product.name} dari SASAMA Store.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Beli Sekarang via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Mitra({ businesses, categories, featured, storeProducts }: MitraProps) {
    const [activeCategory, setActiveCategory] = useState<string>('Semua');
    const [search, setSearch] = useState('');
    const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);

    const filtered = businesses.filter((b) => {
        const matchCat = activeCategory === 'Semua' || b.category === activeCategory;
        const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <PublicLayout>
            <Head title="Mitra Usaha dan SASAMA Store" />

            {/* Hero */}
            <section className="relative h-[280px] sm:h-[320px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2000"
                        alt="Mitra Usaha"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald-950/75" />
                </div>
                <div className="relative z-10 flex h-full flex-col justify-center px-6">
                    <div className="mx-auto w-full max-w-6xl">
                        <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                            MITRA USAHA<br />DAN SASAMA STORE
                        </h1>
                        <p className="mt-3 max-w-xs text-sm text-white/75">
                            Bersama mitra usaha dan produk lokal, kita tumbuh dan berdaya.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mitra Usaha — dari DB */}
            <section className="bg-white px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                        Mitra Usaha
                    </h2>

                    {/* Search + filter */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari usaha..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Semua', ...categories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                                        activeCategory === cat
                                            ? 'bg-emerald-700 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
                            <ImageOff className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                            <p className="font-medium text-slate-500">Belum ada mitra usaha</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((biz) => (
                                <div
                                    key={biz.id}
                                    className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 cursor-pointer transition-shadow hover:shadow-md"
                                    onClick={() => setSelectedBiz(biz)}
                                >
                                    {biz.image_path ? (
                                        <img src={`/storage/${biz.image_path}`} alt={biz.name} className="h-44 w-full object-cover" />
                                    ) : (
                                        <div className="flex h-44 w-full items-center justify-center bg-slate-50">
                                            <ImageOff className="h-10 w-10 text-slate-200" />
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-4">
                                        <div className="mb-1 flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-slate-900">{biz.name}</h3>
                                            {biz.category && (
                                                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                                                    <Tag className="h-3 w-3" />{biz.category}
                                                </span>
                                            )}
                                        </div>
                                        {biz.rw && (
                                            <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                                                <MapPin className="h-3 w-3 shrink-0" />
                                                <span>RW {biz.rw}</span>
                                            </div>
                                        )}
                                        <p className="line-clamp-2 text-sm text-slate-500 flex-1">{biz.description}</p>
                                        <span className="mt-3 text-xs font-semibold text-emerald-700">Lihat Detail →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* SASAMA Store — hardcode */}
            <section className="bg-white px-4 pb-14">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 h-px bg-slate-100" />
                    <div className="mb-4 flex items-center gap-4">
                        <img src="/assets/logo/program/LOGO SASAMA STORE.png" alt="SASAMA Store" className="h-16 w-auto object-contain" />
                        <h2 className="text-2xl font-bold uppercase text-emerald-700">SASAMA Store</h2>
                    </div>
                    <p className="mb-8 max-w-xl text-sm text-slate-500">
                        Dukung produk lokal hasil karya masyarakat Desa Bojongjengkol.
                        Belanja sambil berkontribusi untuk desa yang lebih maju!
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {storeProducts.length === 0 ? (
                            <div className="col-span-3 rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center">
                                <ImageOff className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                <p className="font-medium text-slate-500">Belum ada produk store</p>
                            </div>
                        ) : storeProducts.map((product) => (
                            <div key={product.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                {product.image_path ? (
                                    <img src={`/storage/${product.image_path}`} alt={product.name} className="h-44 w-full object-cover" />
                                ) : (
                                    <div className="flex h-44 w-full items-center justify-center bg-slate-50">
                                        <ImageOff className="h-10 w-10 text-slate-200" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="mb-1 font-bold text-slate-900">{product.name}</h3>
                                    <p className="mb-4 text-sm font-semibold text-slate-700">{product.price}</p>
                                    <a
                                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(product.wa_message ?? `Halo, saya ingin memesan ${product.name} dari SASAMA Store.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Beli Sekarang
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-3">
                        {STORE_FEATURES.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200">
                                    <Icon className="h-5 w-5 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{label}</p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mitra Kami — static */}
            <section className="border-t border-slate-100 bg-white px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-8 text-2xl font-bold uppercase text-emerald-700">
                        Mitra Kami
                    </h2>
                    <div className="flex flex-wrap items-center gap-8">
                        {PARTNERS.map(({ name, logo }) => (
                            <div key={name} className="flex flex-col items-center gap-2">
                                <img src={logo} alt={name} className="h-16 object-contain" />
                                <span className="text-xs font-medium text-slate-500">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detail popup */}
            {selectedBiz && <BusinessModal biz={selectedBiz} onClose={() => setSelectedBiz(null)} />}
            {selectedProduct && <StoreProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </PublicLayout>
    );
}

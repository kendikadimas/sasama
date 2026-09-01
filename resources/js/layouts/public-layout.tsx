import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { Menu, X, MapPin, Mail, Clock, Phone, Facebook, Instagram, Youtube, Building2 } from 'lucide-react';

const SECTION_MENU = [
    { label: 'Profil Desa Binaan dan Program SASAMA', href: '/' },
    { label: 'Potensi Desa Binaan dan Capaian SASAMA', href: '/potensi' },
    { label: 'Mitra Usaha dan SASAMA Store', href: '/mitra' },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <div className="flex min-h-screen flex-col">
            <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/assets/logo/tegar beriman.png"
                            alt="Logo Desa Bojongjengkol"
                            className="h-10 w-10 object-contain"
                        />
                        <img
                            src="/assets/logo/Logo SASAMA.png"
                            alt="Logo SASAMA"
                            className="h-10 w-10 object-contain"
                        />
                        <img
                            src="/assets/logo/bemfem.PNG"
                            alt="Logo BEM FEM"
                            className="h-10 w-10 object-contain"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-bold text-slate-700">
                                Desa Bojongjengkol
                            </span>
                            <span className="text-[10px] font-semibold uppercase text-emerald-700">
                                Desa Cerdas Sampah
                            </span>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {SECTION_MENU.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                    isActive(href)
                                        ? 'bg-emerald-700 text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="rounded-md p-2 text-slate-700 md:hidden"
                        onClick={() => setOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {open && (
                    <div className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden">
                        {SECTION_MENU.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                                    isActive(href) ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            <main className="flex-1 pt-16">{children}</main>

            {/* Footer — disesuaikan match gambar */}
            <footer className="bg-emerald-950 text-emerald-100">
                <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Brand */}
                        <div>
                            <div className="mb-1 flex items-center gap-2">
                                <img
                                    src="/assets/logo/tegar beriman.png"
                                    alt="Logo Kabupaten Bogor"
                                    className="h-9 w-9 object-contain mix-blend-screen"
                                />
                                <span className="text-sm font-black text-white">DESA BOJONGJENGKOL</span>
                            </div>
                            <p className="mb-4 text-xs text-emerald-400">Desa Cerdas Sampah</p>
                            <div className="flex gap-3">
                                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="text-emerald-300 transition-colors hover:text-white"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Menu */}
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-white">Menu</h4>
                            <ul className="space-y-2">
                                {SECTION_MENU.map(({ label, href }, i) => (
                                    <li key={href} className="flex items-start gap-1.5 text-xs text-emerald-300">
                                        <span className="shrink-0 font-semibold text-emerald-400">{i + 1}.</span>
                                        <Link href={href} className="leading-relaxed hover:text-white transition-colors">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kontak */}
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-white">Kontak</h4>
                            <ul className="space-y-2.5 text-xs text-emerald-300">
                                <li className="flex items-start gap-2">
                                    <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    Kantor Desa Bojongjengkol
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    Kec. Ciampea, Kab. Bogor
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    (0251) 862xxxx
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    bojongjengkol.desa@gmail.com
                                </li>
                            </ul>
                        </div>

                        {/* Jam Operasional */}
                        <div>
                            <h4 className="mb-3 text-sm font-bold text-white">Jam Operasional</h4>
                            <ul className="space-y-2 text-xs text-emerald-300">
                                <li className="flex items-start gap-2">
                                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    <span>
                                        <span className="block">Senin – Jumat</span>
                                        <span className="font-semibold text-white">08.00 – 16.00</span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    <span>
                                        <span className="block">Sabtu</span>
                                        <span className="font-semibold text-white">08.00 – 12.00</span>
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="mt-10 border-t border-emerald-800 pt-5 text-center text-[11px] text-emerald-500">
                        © {new Date().getFullYear()} Desa Bojongjengkol. Semua Hak Dilindungi.
                    </div>
                </div>
            </footer>
        </div>
    );
}
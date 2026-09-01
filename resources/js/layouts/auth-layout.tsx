import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function AuthLayout({
    children,
    title,
    description,
}: PropsWithChildren<{ title: string; description: string }>) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans bg-slate-50">
            {/* Left Side - Image & Branding (Hidden on mobile) */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-slate-900">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
                        alt="SASAMA background"
                        className="w-full h-full object-cover opacity-50 transition-transform duration-[20s] hover:scale-110"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-slate-900/80 to-slate-950/90 mix-blend-multiply" />
                    {/* Decorative Patterns */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px]" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg overflow-hidden p-1">
                        <img src="/favicon.svg" alt="SASAMA Logo" className="w-full h-full object-contain" />
                        </div>
                            <span className="text-xl font-bold text-white tracking-wide font-serif">SASAMA</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-black font-serif text-white mb-6 leading-tight">
                        Membangun Desa, <br />
                        <span className="text-emerald-400">Melayani Warga.</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Sistem Informasi Desa terpadu untuk pelayanan publik yang lebih cepat, transparan, dan akuntabel.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} SASAMA. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
                {/* Mobile Branding (Visible only on mobile) */}
                <div className="lg:hidden absolute top-8 left-6 sm:left-12 flex items-center gap-2 mb-8">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white shadow-md overflow-hidden p-1 border border-emerald-100">
                        <img src="/images/cropped-Logo-Cilacap.png" alt="Logo Cilacap" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 tracking-wide font-serif">SASAMA</span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Return Link */}
                    <Link href="/" className="absolute top-8 right-6 sm:right-12 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors group">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="hidden sm:inline">Kembali ke Beranda</span>
                    </Link>

                    {/* Form Header */}
                    <div className="text-center lg:text-left pt-12 lg:pt-0">
                        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6 lg:hidden">
                            <Sparkles className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            {description || 'Silakan masukkan kredensial Anda untuk melanjutkan.'}
                        </p>
                    </div>

                    {/* Form Content - Remove aggressive text color override */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 ring-1 ring-slate-100 text-slate-900">
                        {children}
                    </div>

                    {/* Mobile Footer */}
                    <p className="lg:hidden text-center text-xs text-slate-400 mt-8">
                        &copy; {new Date().getFullYear()} SASAMA.
                    </p>
                </div>
            </div>
        </div>
    );
}

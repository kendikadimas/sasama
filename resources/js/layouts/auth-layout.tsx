import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

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
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px]" />
                </div>

                {/* Top logos */}
                <div className="relative z-10 flex items-center gap-4">
                    <img src="/assets/logo/Logo SASAMA.png" alt="Logo SASAMA" className="h-12 w-auto object-contain" />
                    <img src="/assets/logo/tegar beriman.png" alt="Logo Tegar Beriman" className="h-12 w-auto object-contain" />
                    <img src="/assets/logo/bemfem.PNG" alt="Logo BEM FEM" className="h-12 w-auto object-contain" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-black font-serif text-white mb-6 leading-tight">
                        Membangun Desa, <br />
                        <span className="text-emerald-400">Melayani Warga.</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Platform digital SASAMA untuk pengelolaan dan informasi desa yang transparan dan modern.
                    </p>
                </div>

                {/* Bottom footer */}
                <div className="relative z-10">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} SASAMA — BEM FEM IPB University
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile logos */}
                    <div className="lg:hidden flex items-center justify-center gap-4 mb-2">
                        <img src="/assets/logo/Logo SASAMA.png" alt="Logo SASAMA" className="h-10 w-auto object-contain" />
                        <img src="/assets/logo/tegar beriman.png" alt="Logo Tegar Beriman" className="h-10 w-auto object-contain" />
                        <img src="/assets/logo/bemfem.PNG" alt="Logo BEM FEM" className="h-10 w-auto object-contain" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            {description || 'Silakan masukkan kredensial Anda untuk melanjutkan.'}
                        </p>
                    </div>

                    {/* Form Content */}
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

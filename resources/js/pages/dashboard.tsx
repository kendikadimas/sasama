import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import {
    LayoutGrid,
    TrendingUp,
    ChevronRight,
    Mountain,
    ClipboardList,
    Briefcase,
    Camera,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface DashboardProps {
    stats: {
        potentials: number;
        businesses: number;
        programs: number;
        documentations: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8">

                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 p-8 text-white shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                            <p className="text-emerald-100 mt-2 text-lg">Selamat datang kembali, Administrator.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse outline outline-4 outline-emerald-500/20" />
                            {currentDate}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Potensi Desa" value={stats.potentials} icon={Mountain} trend="Total" trendLabel="data potensi" theme="emerald" />
                    <StatsCard title="Usaha Desa" value={stats.businesses} icon={Briefcase} trend="Total" trendLabel="data usaha" theme="blue" />
                    <StatsCard title="Program SASANA" value={stats.programs} icon={ClipboardList} trend="Total" trendLabel="program aktif" theme="teal" />
                    <StatsCard title="Dokumentasi" value={stats.documentations} icon={Camera} trend="Total" trendLabel="foto & media" theme="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Quick Access */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
                                    <LayoutGrid className="w-5 h-5" />
                                </span>
                                Akses Cepat
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <QuickAction href="/dashboard/potentials/create" icon={Mountain} label="Tambah Potensi" color="emerald" />
                                <QuickAction href="/dashboard/businesses/create" icon={Briefcase} label="Tambah Usaha" color="blue" />
                                <QuickAction href="/dashboard/programs/create" icon={ClipboardList} label="Tambah Program" color="teal" />
                                <QuickAction href="/dashboard/documentations/create" icon={Camera} label="Tambah Dokumentasi" color="orange" />
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div>
                        <div className="rounded-2xl p-1 bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg">
                            <div className="bg-slate-900/90 rounded-xl p-6 text-white backdrop-blur-sm relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-semibold text-lg mb-1">Website Publik</h3>
                                    <p className="text-emerald-100/70 text-sm mb-5">Sistem berjalan normal dan dapat diakses.</p>
                                    <div className="flex items-center gap-3 mb-6 bg-white/5 p-3 rounded-lg border border-white/10">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-sm font-bold text-emerald-400 tracking-wide">SYSTEM ONLINE</span>
                                    </div>
                                    <Link href="/" target="_blank" className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium text-slate-900 bg-white hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors shadow-lg">
                                        Kunjungi Website <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

function StatsCard({ title, value, icon: Icon, trend, trendLabel, theme = 'emerald' }: any) {
    const themes: Record<string, string> = {
        emerald: 'from-emerald-500 to-green-600 shadow-emerald-900/10',
        blue: 'from-blue-500 to-indigo-600 shadow-blue-900/10',
        teal: 'from-teal-500 to-emerald-600 shadow-teal-900/10',
        orange: 'from-orange-500 to-amber-500 shadow-orange-900/10',
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br text-white ${themes[theme] ?? themes.emerald} p-6 shadow-xl transition-transform hover:-translate-y-1`}>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-black/5 blur-xl" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shadow-inner ring-1 ring-white/30">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-white/90 bg-black/10 px-2.5 py-1 rounded-lg backdrop-blur-md">
                            <TrendingUp className="w-3 h-3" /> {trend}
                        </span>
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-white/80">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{value.toLocaleString('id-ID')}</h3>
                    {trendLabel && <p className="text-xs text-white/60 mt-1 capitalize font-medium tracking-wide">{trendLabel}</p>}
                </div>
            </div>
        </div>
    );
}

function QuickAction({ href, icon: Icon, label, color }: any) {
    const colorClasses: Record<string, string> = {
        blue: 'text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
        orange: 'text-orange-600 bg-orange-50 border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
        teal: 'text-teal-600 bg-teal-50 border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
    };

    return (
        <Link href={href} className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className={`p-4 rounded-xl transition-all duration-300 border ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 text-center">{label}</span>
        </Link>
    );
}

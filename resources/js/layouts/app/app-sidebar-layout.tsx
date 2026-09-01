import { useState, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import {
    LayoutGrid,
    MapPin,
    Building2,
    BookOpen,
    Camera,
    ShoppingBag,
    Users,
    Layers,
    Menu,
    X,
    LogOut,
    ChevronDown,
    ChevronRight,
    Search,
    Bell,
    UserCheck,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { url, props } = usePage<SharedData>();
    const user = props.auth.user;
    const flash = props.flash;
    const lastFlash = useRef<string | null>(null);

    useEffect(() => {
        // Simple deduplication based on message content and timestamp approximation
        // In a real app, adding a unique ID to flash messages from the backend is better.
        const flashMessage = flash?.success || flash?.error || flash?.message;

        if (flashMessage && lastFlash.current !== JSON.stringify(flash)) {
            if (flash?.success) {
                toast.success('Berhasil!', { description: flash.success });
            } else if (flash?.error) {
                toast.error('Gagal!', { description: flash.error });
            } else if (flash?.message) {
                toast.info('Info', { description: flash.message });
            }
            lastFlash.current = JSON.stringify(flash);
        }
    }, [flash]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { title: 'Dashboard',     url: '/dashboard',                  icon: LayoutGrid },
        { title: 'Potensi Desa',  url: '/dashboard/potentials',       icon: MapPin },
        { title: 'Mitra Usaha',   url: '/dashboard/businesses',       icon: Building2 },
        { title: 'Program',       url: '/dashboard/programs',         icon: BookOpen },
        { title: 'Dokumentasi',   url: '/dashboard/documentations',   icon: Camera },
        { title: 'SASAMA Store',  url: '/dashboard/store-products',   icon: ShoppingBag },
    ];

    return (
        <div className="h-screen overflow-hidden bg-slate-50 flex">
            {/* Sidebar Desktop & Mobile */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-emerald-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Section */}
                <div className="h-16 flex items-center px-6 bg-emerald-950/30 border-b border-emerald-800/50 shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="p-1 bg-white rounded-lg backdrop-blur-sm shadow-sm overflow-hidden w-9 h-9 flex items-center justify-center">
                            <img src="/favicon.svg" alt="SASAMA Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="grid flex-1 text-left text-base leading-tight">
                            <span className="truncate font-bold text-white tracking-wide text-lg">
                                Admin SASAMA
                            </span>
                            <span className="truncate text-[10px] text-emerald-200/80 uppercase tracking-widest font-medium">
                                Sistem Informasi Desa
                            </span>
                        </div>
                    </Link>
                    <button onClick={toggleSidebar} className="lg:hidden ml-auto text-emerald-200 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
                    {navItems.map((item, i) => (
                        <NavItem key={i} item={item} currentUrl={url} />
                    ))}
                </nav>
            </aside>

            {/* Backdrop for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 h-full overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 sticky top-0 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumbs */}
                        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                            {breadcrumbs.length > 0 && breadcrumbs.map((crumb, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                                    {crumb.href !== '#' ? (
                                        <Link href={crumb.href} className="hover:text-emerald-600 transition-colors font-medium">
                                            {crumb.title}
                                        </Link>
                                    ) : (
                                        <span className="text-slate-900 font-semibold">{crumb.title}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all w-64"
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors outline-none">
                                    <Bell className="w-5 h-5" />
                                    {props.auth.notifications?.length > 0 && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 mt-2 p-0 bg-white border border-slate-200 shadow-xl rounded-xl">
                                <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
                                    <h3 className="font-semibold text-slate-800 text-sm">Aktivitas Terbaru</h3>
                                    <span className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full shadow-sm">
                                        {props.auth.notifications?.length || 0} Baru
                                    </span>
                                </div>
                                <div className="max-h-[350px] overflow-y-auto">
                                    {props.auth.notifications?.length > 0 ? (
                                        props.auth.notifications.map((notif: any) => (
                                            <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 text-left group cursor-pointer">
                                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${notif.data.action === 'create' ? 'bg-emerald-500' :
                                                    notif.data.action === 'update' ? 'bg-blue-500' : 'bg-red-500'
                                                    }`} />
                                                <div className="space-y-1">
                                                    <p className="text-sm text-slate-700 leading-snug group-hover:text-slate-900">{notif.data.message}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{notif.data.model}</span>
                                                        <span className="text-[10px] text-slate-300">•</span>
                                                        <span className="text-[10px] text-slate-400">Baru saja</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center">
                                            <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                            <p className="text-slate-400 text-sm">Belum ada notifikasi</p>
                                        </div>
                                    )}
                                </div>
                                {props.auth.notifications?.length > 0 && (
                                    <div className="p-2 border-t border-slate-50 bg-slate-50/50 rounded-b-xl text-center">
                                        <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                                            Tandai semua dibaca
                                        </button>
                                    </div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="h-8 w-px bg-slate-200 mx-1"></div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-3 outline-none group cursor-pointer">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                                <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-emerald-100 transition-all">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2">
                                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/settings/profile" className="flex items-center w-full">
                                        <UserCheck className="w-4 h-4 mr-2" /> Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-50">
                                    <Link href="/logout" method="post" as="button" className="flex items-center w-full">
                                        <LogOut className="w-4 h-4 mr-2" /> Keluar
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}

// Sub-component for Navigation Items
function NavItem({ item, currentUrl }: { item: any, currentUrl: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.items && item.items.length > 0;
    const isActive = currentUrl.startsWith(item.url) && item.url !== '#';
    const isSubActive = hasSubItems && item.items.some((sub: any) => currentUrl.startsWith(sub.url));

    if (hasSubItems) {
        return (
            <div className="mb-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isSubActive || isOpen
                            ? "bg-emerald-800/50 text-white"
                            : "text-emerald-100 hover:bg-emerald-800/30 hover:text-white"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <item.icon className={cn("w-5 h-5", isSubActive ? "text-emerald-400" : "text-emerald-300/70")} />
                        <span>{item.title}</span>
                    </div>
                    <ChevronRight className={cn("w-4 h-4 transition-transform", isOpen && "rotate-90")} />
                </button>
                {isOpen && (
                    <div className="mt-1 ml-4 space-y-1 pl-3 border-l border-emerald-800/50">
                        {item.items.map((sub: any, idx: number) => (
                            <Link
                                key={idx}
                                href={sub.url}
                                className={cn(
                                    "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                    currentUrl.startsWith(sub.url)
                                        ? "text-emerald-400 bg-emerald-900/50 font-medium"
                                        : "text-emerald-200/80 hover:text-white hover:bg-emerald-800/30"
                                )}
                            >
                                {sub.title}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.url}
            className={cn(
                "w-full text-left flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
                    : "text-emerald-100 hover:bg-emerald-800/30 hover:text-white"
            )}
        >
            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-emerald-300/70")} />
            <span>{item.title}</span>
        </Link>
    );
}

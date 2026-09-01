import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-3 grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-bold text-white tracking-wide text-lg">
                    Admin SASAMA
                </span>
                <span className="truncate text-sm text-white/80">
                    Sistem Informasi Desa
                </span>
            </div>
        </>
    );
}

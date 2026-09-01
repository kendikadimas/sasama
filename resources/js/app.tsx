import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Ziggy } from './ziggy';
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'SASAMA';

// Expose Ziggy to the window object for use by ziggy-js
if (typeof window !== 'undefined') {
    Ziggy.url = window.location.origin;
    // @ts-ignore
    Ziggy.port = window.location.port ? parseInt(window.location.port) : null;
    (window as any).Ziggy = Ziggy;
    (window as any).route = (name: string, params: any, absolute: any) => route(name, params, absolute, Ziggy as any);
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

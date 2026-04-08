"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import EnhancedNavigation from '@/components/admin/EnhancedNavigation';
import { LogOut } from 'lucide-react';

/**
 * AdminLayoutInner — Sidebar + Header du panel d'administration.
 * Doit être rendu à l'intérieur d'un <SessionProvider>.
 * La protection des routes est gérée par src/middleware.ts.
 */
export default function AdminLayoutInner({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    // Pages publiques de l'admin (login etc.) : rendu minimal sans sidebar
    const isAuthPage =
        pathname?.startsWith('/admin/auth/') ||
        pathname === '/admin/login';

    if (isAuthPage) {
        return <>{children}</>;
    }

    // Pendant le chargement de la session : on n'affiche PAS un écran bloquant
    // Le proxy (src/proxy.ts) gère la vraie protection — ici c'est juste cosmétique
    const isLoading = status === 'loading';

    const user = session?.user;

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/admin/auth/login' });
    };

    return (
        <div className="flex h-screen bg-gray-50/50">
            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
                {/* Logo */}
                <div className="p-6">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/images/logo-fps.png"
                                alt="Logo FPS"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-gray-900 text-lg tracking-tight">
                            Admin FPS
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <EnhancedNavigation />
                </div>

                {/* Profil utilisateur */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200 shrink-0">
                            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.name || 'Administrateur'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main content ─────────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div className="text-sm text-gray-500">Administration</div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                target="_blank"
                                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Voir le site
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </header>

                {/* Contenu de la page */}
                <main className="flex-1 overflow-auto p-8">{children}</main>
            </div>
        </div>
    );
}

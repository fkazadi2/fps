import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Proxy Next.js 16 — Protection des routes /admin/*
 * (anciennement "middleware" dans Next.js < 16)
 *
 * Toutes les routes /admin/* (sauf /admin/auth/*) nécessitent
 * un JWT NextAuth valide avec isAdmin=true.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Pages publiques de l'admin (login etc.) ─────────────────────────────
    if (
        pathname.startsWith("/admin/auth/") ||
        pathname === "/admin/login"
    ) {
        return NextResponse.next();
    }

    // ── Routes protégées /admin/* ────────────────────────────────────────────
    if (pathname.startsWith("/admin")) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Pas de token → redirection login
        if (!token) {
            const loginUrl = new URL("/admin/auth/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Token présent mais pas admin → accès refusé
        if (!token.isAdmin) {
            const loginUrl = new URL("/admin/auth/login", request.url);
            loginUrl.searchParams.set("error", "AccessDenied");
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

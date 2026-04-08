'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ============================================================================
// Hook d'authentification — basé sur NextAuth (session JWT côté serveur)
// ============================================================================
export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isLoading = status === 'loading';
    const isAuthenticated = status === 'authenticated' && session?.user?.isAdmin === true;

    /**
     * Connexion via NextAuth CredentialsProvider
     */
    const login = async (
        credentials: { email: string; password: string },
        callbacks?: {
            onSuccess?: () => void;
            onError?: (error: Error) => void;
        }
    ) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: credentials.email,
                password: credentials.password,
            });

            if (result?.error) {
                const error = new Error(
                    result.error === 'CredentialsSignin'
                        ? 'Email ou mot de passe incorrect'
                        : result.error
                );
                callbacks?.onError?.(error);
                return;
            }

            callbacks?.onSuccess?.();
            router.push('/admin/dashboard');
            router.refresh();
        } catch (error: any) {
            callbacks?.onError?.(error);
        }
    };

    /**
     * Déconnexion via NextAuth
     */
    const logout = async () => {
        await signOut({ redirect: false });
        router.push('/admin/auth/login');
        router.refresh();
    };

    return {
        user: session?.user ?? null,
        isAuthenticated,
        isLoading,
        login,
        loginAsync: login,
        logout,
        isLoggingIn: isLoading,
        loginError: null,
    };
}

// ============================================================================
// Hook de protection de route (fallback côté client si middleware échoue)
// ============================================================================
export function useRequireAuth() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    if (!isLoading && !isAuthenticated) {
        router.push('/admin/auth/login');
    }

    return { user, isAuthenticated, loading: isLoading };
}

/**
 * Page de connexion - Version MongoDB avec React Query
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { login, isLoggingIn, loginError, isAuthenticated } = useAuth();

  // Rediriger si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLocalError('');

      // Utiliser le hook useAuth avec React Query
      await login(
        { email, password },
        {
          onSuccess: () => {
            // Redirection gérée par useEffect
            router.push('/admin/dashboard');
          },
          onError: (error: Error) => {
            setLocalError(error.message || 'Erreur de connexion');
          }
        }
      );
    } catch (err: any) {
      console.error('Erreur login:', err);
      setLocalError(err.message || 'Une erreur est survenue');
    }
  };

  const displayError = localError || (loginError ? loginError.message : '');

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-light)] p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <Image
            src="/images/logo-fps.png"
            alt="Logo FPS"
            width={120}
            height={120}
            className="mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-900">Administration FPS</h1>
          <p className="text-sm text-gray-600">Connectez-vous pour accéder au système</p>
        </div>

        {displayError && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <Link
              href="#"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)]"
            >
              Mot de passe oublié?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full rounded-md bg-[var(--primary)] px-4 py-2 text-white transition hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${isLoggingIn ? 'cursor-not-allowed opacity-70' : ''
                }`}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            🔐 Authentification sécurisée avec MongoDB
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Identifiants par défaut: admin@fps.gouv.cd / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
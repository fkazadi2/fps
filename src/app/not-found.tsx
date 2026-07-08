import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-fps-danger-light flex items-center justify-center mb-8">
          <span className="text-4xl font-bold text-[var(--danger)]">404</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">
          Page non trouvée
        </h1>
        
        <p className="text-xl text-gray-600 max-w-lg mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition-colors"
          >
            Retour à l'accueil
          </Link>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </MainLayout>
  );
} 
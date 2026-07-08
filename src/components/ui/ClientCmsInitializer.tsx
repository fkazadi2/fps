'use client';

import { useEffect } from 'react';

export default function ClientCmsInitializer() {
  useEffect(() => {
    // Initialiser le CMS côté client
    async function initCms() {
      if (typeof window !== 'undefined') {
        try {
          const cms = await import('@/lib/cms');
          cms.initializeCMS();
          console.log('✅ CMS initialisé avec succès côté client');
        } catch (error) {
          console.error('❌ Erreur lors de l\'initialisation du CMS:', error);
        }
      }
    }

    initCms();
  }, []);

  // Ce composant ne rend rien, il effectue seulement l'initialisation
  return null;
} 
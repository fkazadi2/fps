'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ClientDynamicPage() {
  const params = useParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadPageFromLocalStorage() {
      try {
        // S'assurer que nous sommes côté client
        if (typeof window === 'undefined') return;

        // S'assurer que les paramètres sont disponibles
        if (!params || !params.slug) return;

        // Normaliser le slug
        const normalizedSlug = (params.slug as string).replace(/^\//, '').replace(/\/$/, '');

        // Charger le service de page depuis le CMS
        const pageService = await import('@/lib/cms/page-service');
        
        // Récupérer la page par son slug depuis localStorage
        const page = pageService.getPageBySlug(normalizedSlug);
        
        // Si la page est trouvée, nous sommes prêts
        if (page) {
          console.log(`✅ Page "${normalizedSlug}" chargée depuis localStorage`);
        } else {
          console.warn(`❌ Page "${normalizedSlug}" non trouvée dans localStorage`);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la page depuis localStorage:', error);
      } finally {
        // Indiquer que le client est prêt, même en cas d'erreur
        setIsReady(true);
      }
    }

    // Charger la page
    loadPageFromLocalStorage();
  }, [params]);

  // Ce composant ne rend rien visuellement, il effectue seulement les opérations côté client
  return null;
} 
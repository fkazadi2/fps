import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { BlockData } from '@/components/admin/BlockEditor';

interface BannerData {
  enabled: boolean;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  height: 'small' | 'medium' | 'large';
}

interface PreviewData {
  id: string;
  pageData: {
    title: string;
    content: string;
    blocks?: BlockData[];
    banner?: BannerData;
    layout: string;
  };
  expiresAt: string;
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { pageData } = await request.json();
    
    if (!pageData) {
      return NextResponse.json(
        { success: false, error: 'Données de page requises' },
        { status: 400 }
      );
    }

    // Générer un ID unique pour la prévisualisation
    const previewId = nanoid(10);
    
    // Créer l'objet de prévisualisation
    const preview: PreviewData = {
      id: previewId,
      pageData,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      createdAt: new Date().toISOString()
    };

    // Dans une vraie app, on stockerait ça en base de données
    // Pour cette démo, on utilise un cache mémoire simple
    const previews = getPreviewsFromStorage();
    previews[previewId] = preview;
    savePreviewsToStorage(previews);

    // Nettoyer les prévisualisations expirées
    cleanExpiredPreviews();

    return NextResponse.json({
      success: true,
      previewUrl: `/api/admin/preview/${previewId}`,
      previewId,
      expiresAt: preview.expiresAt
    });

  } catch (error) {
    console.error('Erreur lors de la création de la prévisualisation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const previewId = searchParams.get('id');

    if (!previewId) {
      return NextResponse.json(
        { success: false, error: 'ID de prévisualisation requis' },
        { status: 400 }
      );
    }

    const previews = getPreviewsFromStorage();
    const preview = previews[previewId];

    if (!preview) {
      return NextResponse.json(
        { success: false, error: 'Prévisualisation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si la prévisualisation n'a pas expiré
    if (new Date() > new Date(preview.expiresAt)) {
      delete previews[previewId];
      savePreviewsToStorage(previews);
      return NextResponse.json(
        { success: false, error: 'Prévisualisation expirée' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      pageData: preview.pageData
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de la prévisualisation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Fonctions utilitaires pour le stockage (en mémoire pour cette démo)
let previewsCache: { [key: string]: PreviewData } = {};

function getPreviewsFromStorage(): { [key: string]: PreviewData } {
  return previewsCache;
}

function savePreviewsToStorage(previews: { [key: string]: PreviewData }) {
  previewsCache = previews;
}

function cleanExpiredPreviews() {
  const now = new Date();
  const previews = getPreviewsFromStorage();
  
  Object.keys(previews).forEach(id => {
    if (new Date(previews[id].expiresAt) < now) {
      delete previews[id];
    }
  });
  
  savePreviewsToStorage(previews);
} 
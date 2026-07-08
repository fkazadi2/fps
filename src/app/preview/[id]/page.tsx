"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Eye, Clock, AlertCircle, Loader2, FileText } from "lucide-react";
import { BlockData } from "@/components/admin/BlockEditor";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

interface BannerData {
  enabled: boolean;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  height: 'small' | 'medium' | 'large';
}

interface PageData {
  title: string;
  content: string;
  blocks?: BlockData[];
  banner?: BannerData;
  layout: string;
}

interface PreviewResponse {
  success: boolean;
  pageData?: PageData;
  error?: string;
}

export default function PreviewPage() {
  const params = useParams();
  const previewId = params.id as string;

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const response = await fetch(`/api/admin/preview?id=${previewId}`);
        const result: PreviewResponse = await response.json();

        if (result.success && result.pageData) {
          setPageData(result.pageData);
        } else {
          setError(result.error || 'Erreur inconnue');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la prévisualisation');
        console.error('Erreur preview:', err);
      } finally {
        setLoading(false);
      }
    };

    if (previewId) {
      loadPreview();
    }
  }, [previewId]);

  // Composant pour rendre un bloc
  const renderBlock = (block: BlockData) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {String(block.data.title || 'Titre Hero')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {String(block.data.subtitle || 'Sous-titre')}
              </p>
              {!!block.data.buttonText && (
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {String(block.data.buttonText)}
                </button>
              )}
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="max-w-4xl mx-auto py-8 px-6">
            <div className="prose max-w-none">
              {!!block.data.title && (
                <h2 className="text-3xl font-bold mb-6">{String(block.data.title)}</h2>
              )}
              <div dangerouslySetInnerHTML={{ __html: String(block.data.content || '') }} />
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="max-w-6xl mx-auto py-8 px-6">
            {!!block.data.title && (
              <h2 className="text-3xl font-bold text-center mb-8">{String(block.data.title)}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(block.data.images) && block.data.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={String(image.url || '/placeholder.jpg')}
                    alt={String(image.alt || `Image ${index + 1}`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
              {!!block.data.title && (
                <h2 className="text-3xl font-bold text-center mb-12">{String(block.data.title)}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.isArray(block.data.stats) && block.data.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {String(stat.value || '0')}
                    </div>
                    <div className="text-gray-600">{String(stat.label || 'Statistique')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="bg-blue-600 text-white py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {String(block.data.title || 'Appel à l\'action')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {String(block.data.description || 'Description')}
              </p>
              {!!block.data.buttonText && (
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {String(block.data.buttonText)}
                </button>
              )}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              {!!block.data.title && (
                <h2 className="text-3xl font-bold text-center mb-12">{String(block.data.title)}</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(block.data.testimonials) && block.data.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-600 mb-4 italic">
                      "{String(testimonial.content || 'Témoignage')}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                      <div>
                        <div className="font-semibold">{String(testimonial.author || 'Auteur')}</div>
                        <div className="text-sm text-gray-500">{String(testimonial.role || 'Fonction')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-600">Bloc non reconnu: {block.type}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement de la prévisualisation</h2>
          <p className="text-gray-600">Veuillez patienter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Prévisualisation indisponible</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                Les prévisualisations expirent après 24 heures
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contenu introuvable</h2>
          <p className="text-gray-600">Aucun contenu à prévisualiser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Barre de prévisualisation */}
      <div className="bg-yellow-500 text-white px-6 py-3 text-center sticky top-0 z-50">
        <div className="flex items-center justify-center space-x-2">
          <Eye className="h-5 w-5" />
          <span className="font-medium">Mode Prévisualisation</span>
          <span className="hidden sm:inline">• Cette page n'est pas encore publiée</span>
        </div>
      </div>

      {/* 1. La Bannière */}
      <PageHeader
        title={pageData.banner?.title || pageData.title}
        description={pageData.banner?.subtitle}
        icon={FileText}
        variant="blue"
        breadcrumbs={[
          { name: "Mode Prévisualisation", href: "#" },
          { name: pageData.title, href: "#" }
        ]}
      />

      {/* 2. L'Image à la Une */}
      <FeaturedImageBox
        image={pageData.banner?.imageUrl}
        variant="blue"
      />

      {/* Contenu principal */}
      <main>
        {pageData.layout === 'blocks' && pageData.blocks ? (
          // Mode blocs
          <div className="space-y-0">
            {pageData.blocks.map((block, index) => (
              <div key={block.id || index}>
                {renderBlock(block)}
              </div>
            ))}
          </div>
        ) : (
          // Mode contenu classique
          <div className="max-w-4xl mx-auto py-12 px-6">
            {!pageData.banner?.enabled && (
              <h1 className="text-4xl font-bold text-gray-900 mb-8">{pageData.title}</h1>
            )}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        )}
      </main>

      {/* Footer de prévisualisation */}
      <div className="bg-gray-100 border-t px-6 py-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center space-x-4">
          <span>Prévisualisation générée à {new Date().toLocaleTimeString('fr-FR')}</span>
          <span>•</span>
          <span>Layout: {pageData.layout}</span>
          {pageData.layout === 'blocks' && pageData.blocks && (
            <>
              <span>•</span>
              <span>{pageData.blocks.length} bloc(s)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 
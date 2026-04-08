"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, File, Image, Calendar, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  type: 'page' | 'media' | 'folder';
  title: string;
  description?: string;
  url?: string;
  lastModified?: string;
  thumbnail?: string;
  matchedContent?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus sur l'input quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Recherche en temps réel
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      await performSearch(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Réinitialiser l'index sélectionné quand les résultats changent
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const performSearch = async (searchQuery: string) => {
    const foundResults: SearchResult[] = [];

    try {
      // Rechercher dans les pages
      const storedPages = localStorage.getItem('fps_cms_pages');
      if (storedPages) {
        const pages = JSON.parse(storedPages);
        pages.forEach((page: any) => {
          const titleMatch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
          const contentMatch = page.content.toLowerCase().includes(searchQuery.toLowerCase());
          const slugMatch = page.slug.toLowerCase().includes(searchQuery.toLowerCase());

          if (titleMatch || contentMatch || slugMatch) {
            foundResults.push({
              id: page.id,
              type: 'page',
              title: page.title,
              description: `Page ${page.status === 'published' ? 'publiée' : 'en brouillon'}`,
              url: `/admin/pages/edit/${page.id}`,
              lastModified: page.lastUpdated || page.createdAt,
              matchedContent: contentMatch ? extractMatchedContent(page.content, searchQuery) : undefined
            });
          }
        });
      }

      // Rechercher dans les médias
      const storedMedia = localStorage.getItem('fps_cms_media');
      if (storedMedia) {
        const mediaFiles = JSON.parse(storedMedia);
        mediaFiles.forEach((media: any) => {
          const nameMatch = media.originalName.toLowerCase().includes(searchQuery.toLowerCase());
          const filenameMatch = media.filename.toLowerCase().includes(searchQuery.toLowerCase());

          if (nameMatch || filenameMatch) {
            foundResults.push({
              id: media.id,
              type: 'media',
              title: media.originalName,
              description: `${formatFileSize(media.size)} • ${media.type}`,
              url: `/admin/media`,
              lastModified: media.uploadedAt,
              thumbnail: media.type.startsWith('image/') ? media.url : undefined
            });
          }
        });
      }

      // Trier par pertinence (titre exact puis contenu)
      foundResults.sort((a, b) => {
        const aExactTitle = a.title.toLowerCase() === searchQuery.toLowerCase();
        const bExactTitle = b.title.toLowerCase() === searchQuery.toLowerCase();
        
        if (aExactTitle && !bExactTitle) return -1;
        if (!aExactTitle && bExactTitle) return 1;
        
        const aContainsTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
        const bContainsTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (aContainsTitle && !bContainsTitle) return -1;
        if (!aContainsTitle && bContainsTitle) return 1;
        
        return 0;
      });

      setResults(foundResults.slice(0, 10)); // Limiter à 10 résultats
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
    }
  };

  const extractMatchedContent = (content: string, query: string): string => {
    const cleanContent = content.replace(/<[^>]*>/g, ''); // Supprimer HTML
    const index = cleanContent.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return '';

    const start = Math.max(0, index - 50);
    const end = Math.min(cleanContent.length, index + query.length + 50);
    let excerpt = cleanContent.slice(start, end);

    if (start > 0) excerpt = '...' + excerpt;
    if (end < cleanContent.length) excerpt = excerpt + '...';

    return excerpt;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      window.location.href = result.url;
    }
    onClose();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'page':
        return <File className="h-4 w-4 text-blue-500" />;
      case 'media':
        return <Image className="h-4 w-4 text-green-500" />;
      case 'folder':
        return <File className="h-4 w-4 text-orange-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* Header de recherche */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher des pages, médias..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none placeholder-gray-500"
          />
          <button
            onClick={onClose}
            className="ml-3 p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Résultats */}
        <div ref={resultsRef} className="max-h-80 overflow-y-auto">
          {isSearching && query.trim() && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              Recherche en cours...
            </div>
          )}

          {!isSearching && query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Aucun résultat trouvé</p>
              <p className="text-sm">Essayez avec d'autres mots-clés</p>
            </div>
          )}

          {!query.trim() && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Recherche globale</p>
              <p className="text-sm">Tapez pour rechercher dans vos pages et médias</p>
              <div className="mt-4 text-xs text-gray-400 space-y-1">
                <p>• Utilisez ↑↓ pour naviguer</p>
                <p>• Appuyez sur Entrée pour ouvrir</p>
                <p>• Échap pour fermer</p>
              </div>
            </div>
          )}

          {results.map((result, index) => (
            <div
              key={result.id}
              className={`
                flex items-center p-4 cursor-pointer border-b border-gray-100 last:border-b-0
                ${index === selectedIndex ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
              `}
              onClick={() => handleResultClick(result)}
            >
              {/* Thumbnail ou icône */}
              <div className="flex-shrink-0 mr-4">
                {result.thumbnail ? (
                  <img
                    src={result.thumbnail}
                    alt=""
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                    {getResultIcon(result.type)}
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {highlightText(result.title, query)}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
                
                <p className="text-xs text-gray-500 mt-1">
                  {result.description}
                </p>

                {result.matchedContent && (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    {highlightText(result.matchedContent, query)}
                  </p>
                )}

                {result.lastModified && (
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Modifié le {new Date(result.lastModified).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer avec raccourcis */}
        {results.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
            <span>↑↓ pour naviguer</span>
            <span>Entrée pour ouvrir</span>
            <span>Échap pour fermer</span>
          </div>
        )}
      </div>
    </div>
  );
} 
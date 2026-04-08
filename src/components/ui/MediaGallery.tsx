'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Camera } from 'lucide-react';
import { usePhotoAlbums, initPhotoAlbums, PhotoAlbum } from '@/lib/services/photoAlbumService';

// Type pour les éléments média
type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  date?: string;
  link?: string;
};

// Données de démonstration pour la galerie - à utiliser si le localStorage n'est pas disponible
const defaultMediaItems: MediaItem[] = [
  {
    id: 'reunion-dg-hebdomadaire-dga',
    type: 'image',
    src: '/images/albums/album1/01.jpg',
    thumbnail: '/images/albums/album1/01.jpg',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du FPS sous la conduite de sa DGA, Professeure Claudine Tshimanga.',
    date: '05 mai 2025',
    link: '/actualites/galerie/reunion-dg-hebdomadaire-dga'
  },
  {
    id: 'reunion-hebdomadaire-dg-fps',
    type: 'image',
    src: '/images/albums/album2/01.jpg',
    thumbnail: '/images/albums/album2/01.jpg',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du FPS par Professeure Claudine Tshimanga, DGA.',
    date: '07 avril 2025',
    link: '/actualites/galerie/reunion-hebdomadaire-dg-fps'
  },
  {
    id: 'briefing-dg-marius-mika',
    type: 'image',
    src: '/images/albums/album3/1.jpg',
    thumbnail: '/images/albums/album3/1.jpg',
    title: 'Briefing hebdomadaire de la Direction générale du FPS',
    description: 'Briefing hebdomadaire de la Direction générale du FPS présidé par le DGE Marius MIKA ce 17.03.2025.',
    date: '17 mars 2025',
    link: '/actualites/galerie/briefing-dg-marius-mika'
  },
  {
    id: 'reunion-dg-marius-mika-janvier',
    type: 'image',
    src: '/images/albums/album4/01.jpg',
    thumbnail: '/images/albums/album4/01.jpg',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du Fonds de Promotion de la Santé dirigée par le DGE Marius Mika. 27.01.2025',
    date: '27 janvier 2025',
    link: '/actualites/galerie/reunion-dg-marius-mika-janvier'
  },
  {
    id: 'reunion-dga-tshimanga-mbuyi',
    type: 'image',
    src: '/images/albums/album5/1.jpg',
    thumbnail: '/images/albums/album5/1.jpg',
    title: 'Réunion hebdomadaire de la direction générale',
    description: 'Réunion hebdomadaire de la Direction générale présidée par professeure TSHIMANGA MBUYI Claudine, DGA du Fonds de Promotion de la Santé.',
    date: '18 novembre 2024',
    link: '/actualites/galerie/reunion-dga-tshimanga-mbuyi'
  },
  {
    id: 'reunion-preparation-conference-fps-fec',
    type: 'image',
    src: '/images/albums/album6/01.jpg',
    thumbnail: '/images/albums/album6/01.jpg',
    title: 'Réunion hebdomadaire de la Direction générale',
    description: 'Réunion hebdomadaire de la Direction générale. La préparation de la conférence FPS-FEC ce mardi 11 juin 2024 a été à l\'ordre du jour.',
    date: '11 juin 2024',
    link: '/actualites/galerie/reunion-preparation-conference-fps-fec'
  }
];

// Fonction pour convertir un album photo en élément média
const albumToMediaItem = (album: PhotoAlbum): MediaItem => {
  // Convertir format date "05/05/2025" en "05 mai 2025"
  let formattedDate = album.date;
  try {
    const [day, month, year] = album.date.split('/');
    const monthNames = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const monthIndex = parseInt(month, 10) - 1;
    if (monthNames[monthIndex]) {
      formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    }
  } catch (e) {
    console.error("Erreur de formatage de date:", e);
  }

  return {
    id: album.id,
    type: 'image',
    src: album.coverImage,
    thumbnail: album.coverImage,
    title: album.title,
    description: album.description,
    date: formattedDate,
    link: `/actualites/galerie/${album.id}`
  };
};

// Type pour les propriétés du composant
type MediaGalleryProps = {
  mediaItems?: MediaItem[];
  title?: string;
  subtitle?: string;
  forceInit?: boolean; // Nouveau prop pour forcer l'initialisation
};

export default function MediaGallery({ 
  mediaItems = [],
  title = "Galerie média",
  subtitle = "Découvrez en images les activités et réalisations du Fonds de Promotion de la Santé",
  forceInit = false // Valeur par défaut
}: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [displayItems, setDisplayItems] = useState<MediaItem[]>(defaultMediaItems);
  const { albums, loading } = usePhotoAlbums();

  // Charger les albums au démarrage et quand forceInit change
  useEffect(() => {
    // Si forceInit est true, réinitialisons complètement les albums
    if (forceInit && typeof window !== 'undefined') {
      // Supprimer les données existantes
      localStorage.removeItem('fps_photo_albums');
      // Réinitialiser
      initPhotoAlbums();
    } else {
      // Initialisation normale
      initPhotoAlbums();
    }
  }, [forceInit]);

  // Mettre à jour les éléments média quand les albums sont chargés
  useEffect(() => {
    if (albums && albums.length > 0) {
      console.log("Albums chargés dans MediaGallery:", albums);
      
      // Triez les albums par date (du plus récent au plus ancien)
      const sortedAlbums = [...albums].sort((a, b) => {
        try {
          // Format attendu: "DD/MM/YYYY" (par exemple "05/05/2025")
          const [dayA, monthA, yearA] = a.date.split('/');
          const [dayB, monthB, yearB] = b.date.split('/');
          
          // Créer des objets Date (format: YYYY-MM-DD)
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          
          // Vérifier si les dates sont valides
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            console.error("Dates invalides:", a.date, b.date);
            return 0; // Pas de changement d'ordre si dates invalides
          }
          
          // Trier du plus récent au plus ancien
          return dateB.getTime() - dateA.getTime();
        } catch (error) {
          console.error("Erreur lors du tri des dates:", error);
          return 0;
        }
      });
      
      // Log pour vérifier le tri
      console.log("Albums triés:", sortedAlbums.map(a => ({ id: a.id, date: a.date })));
      
      // Convertir les albums en éléments média
      const albumItems = sortedAlbums.map(albumToMediaItem);
      
      // Limiter à 6 éléments maximum
      setDisplayItems(albumItems.slice(0, 6));
    }
  }, [albums]);

  // Effet pour forcer une actualisation du composant
  useEffect(() => {
    // Créer un petit délai pour s'assurer que le localStorage est bien initialisé
    if (forceInit) {
      const timer = setTimeout(() => {
        // Forcer une mise à jour du composant
        setDisplayItems([...defaultMediaItems]);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [forceInit]);

  // Fonction pour ouvrir la vue détaillée
  const openModal = (item: MediaItem) => {
    setSelectedItem(item);
  };

  // Fonction pour fermer la vue détaillée
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--accent)] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 opacity-10 rounded-full blur-3xl"></div>
      
      {/* Grille décorative */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gallery-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="1" height="60" fill="currentColor" className="text-[var(--accent)]" />
              <rect x="0" y="0" width="60" height="1" fill="currentColor" className="text-[var(--accent)]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-[var(--accent)] to-orange-400 bg-opacity-20 text-white rounded-full text-sm font-semibold tracking-wide uppercase backdrop-blur-sm border border-[var(--accent)]/30 flex items-center gap-2">
              <Camera className="w-4 h-4 text-white" />
              Centre de Presse
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--secondary)] mb-4">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-700">
            {subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--accent)]"></div>
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3"
                onClick={() => openModal(item)}
                style={{
                  animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Image avec overlay dégradé */}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={item.thumbnail} 
                    alt={item.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Badge de date moderne */}
                  {item.date && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-2 bg-gradient-to-r from-[var(--danger)] to-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> 
                        <span>{item.date}</span>
                      </div>
                    </div>
                  )}

                  {/* Icône play/zoom centrale */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Nombre de photos (si disponible) */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[var(--secondary)] text-sm font-medium rounded-lg shadow-md flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Album photo
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-3 line-clamp-2 group-hover:text-[var(--danger)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Ligne décorative */}
                  <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent)] to-orange-400 mb-4 transform group-hover:w-full transition-all duration-500"></div>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-3 transition-all"
                      aria-label={`Voir les détails de ${item.title}`}
                    >
                      Voir l'album
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bordure décorative au survol */}
                <div className="absolute inset-0 border-4 border-[var(--accent)] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/centre-presse/galerie"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-orange-400 text-[var(--secondary)] text-base font-semibold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Voir tous les albums 
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Modal moderne pour afficher l'élément sélectionné */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" 
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Bouton fermer moderne */}
              <button 
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm hover:bg-[var(--danger)] text-gray-600 hover:text-white rounded-full p-3 shadow-lg z-20 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                onClick={closeModal}
                aria-label="Fermer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image avec fond dégradé */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl overflow-hidden">
                <Image 
                  src={selectedItem.src} 
                  alt={selectedItem.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
              </div>
              
              {/* Contenu du modal */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-[var(--primary)] mb-2">
                      {selectedItem.title}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-orange-400 mb-4"></div>
                  </div>
                  {selectedItem.date && (
                    <div className="inline-flex">
                      <span className="px-4 py-2 bg-gradient-to-r from-[var(--danger)] to-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" /> 
                        {selectedItem.date}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedItem.description}
                </p>
                
                {selectedItem.link && (
                  <div className="flex gap-4">
                    <Link 
                      href={selectedItem.link} 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Voir l'album complet
                    </Link>
                    <button
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Fermer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations pour le modal */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
} 
// Service pour gérer les albums photos dans le localStorage
import { useState, useEffect } from 'react';

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export type PhotoAlbum = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  photos: Photo[];
};

// Clé pour le stockage dans localStorage
const STORAGE_KEY = 'fps_photo_albums';

// Données par défaut pour les albums photos
const defaultAlbums: PhotoAlbum[] = [
  {
    id: 'reunion-dg-hebdomadaire-dga',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du FPS sous la conduite de sa DGA, Professeure Claudine Tshimanga.',
    date: '05/05/2025',
    category: 'reunions',
    coverImage: '/images/albums/album1/01.jpg',
    photos: [
      {
        id: 'reunion-dg-hebdomadaire-dga-1',
        src: '/images/albums/album1/01.jpg',
        alt: 'Réunion de la Direction générale sous la conduite de la DGA',
        caption: 'Professeure Claudine Tshimanga dirigeant la réunion hebdomadaire'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-2',
        src: '/images/albums/album1/495355173_601736906255249_6749656125338518196_n.jpg',
        alt: 'Participants à la réunion de la Direction générale',
        caption: 'Équipe de direction pendant les discussions'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-3',
        src: '/images/albums/album1/495467965_601736722921934_7215218402358744623_n.jpg',
        alt: 'Séance de travail à la Direction générale',
        caption: 'Analyse des dossiers en cours'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-4',
        src: '/images/albums/album1/495110069_601736726255267_4654519226464166977_n.jpg',
        alt: 'Discussion entre les cadres du FPS',
        caption: 'Échange sur les projets prioritaires'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-5',
        src: '/images/albums/album1/494639974_601736622921944_5814473378881736652_n.jpg',
        alt: 'Vue générale de la réunion de la Direction',
        caption: 'Coordination des activités hebdomadaires'
      }
    ]
  },
  {
    id: 'reunion-hebdomadaire-dg-fps',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du FPS par Professeure Claudine Tshimanga, DGA.',
    date: '07/04/2025',
    category: 'reunions',
    coverImage: '/images/albums/album2/01.jpg',
    photos: [
      {
        id: 'reunion-hebdomadaire-dg-fps-1',
        src: '/images/albums/album2/01.jpg',
        alt: 'Réunion de coordination hebdomadaire',
        caption: 'La DGA présentant les objectifs de la semaine'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-2',
        src: '/images/albums/album2/488909830_579644991797774_1772670195890762873_n.jpg',
        alt: 'Équipe de direction en concertation',
        caption: 'Analyse des résultats des programmes en cours'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-3',
        src: '/images/albums/album2/488912023_579645075131099_660984792756912370_n.jpg',
        alt: 'Cadres du FPS en réunion',
        caption: 'Discussion sur l\'allocation des ressources'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-4',
        src: '/images/albums/album2/488917061_579644915131115_2945468185851778057_n.jpg',
        alt: 'Présentation des rapports d\'activités',
        caption: 'Revue des indicateurs de performance'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-5',
        src: '/images/albums/album2/489571909_579645045131102_8758764895091984017_n.jpg',
        alt: 'Session de planification stratégique',
        caption: 'Élaboration du plan d\'action mensuel'
      }
    ]
  },
  {
    id: 'briefing-dg-marius-mika',
    title: 'Briefing hebdomadaire de la Direction générale du FPS',
    description: 'Briefing hebdomadaire de la Direction générale du FPS présidé par le DGE Marius MIKA ce 17.03.2025.',
    date: '17/03/2025',
    category: 'reunions',
    coverImage: '/images/albums/album3/1.jpg',
    photos: [
      {
        id: 'briefing-dg-marius-mika-1',
        src: '/images/albums/album3/1.jpg',
        alt: 'Briefing hebdomadaire présidé par le DG',
        caption: 'Le DGE Marius MIKA présidant la réunion de briefing'
      },
      {
        id: 'briefing-dg-marius-mika-2',
        src: '/images/albums/album3/484018007_562847476810859_7115257564519134910_n.jpg',
        alt: 'Participants au briefing de la DG',
        caption: 'Équipe de direction écoutant les directives du DG'
      },
      {
        id: 'briefing-dg-marius-mika-3',
        src: '/images/albums/album3/484334822_562847783477495_7766459505057889284_n.jpg',
        alt: 'Discussion stratégique au briefing',
        caption: 'Échanges sur les priorités stratégiques'
      },
      {
        id: 'briefing-dg-marius-mika-4',
        src: '/images/albums/album3/484033170_562847570144183_3971661060155186816_n.jpg',
        alt: 'Présentation des rapports au DG',
        caption: 'Analyse des rapports d\'activités'
      },
      {
        id: 'briefing-dg-marius-mika-5',
        src: '/images/albums/album3/484036067_562847660144174_2221149389762333102_n.jpg',
        alt: 'Vue d\'ensemble du briefing',
        caption: 'Coordination des activités sous la direction du DG'
      }
    ]
  },
  {
    id: 'reunion-dg-marius-mika-janvier',
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    description: 'Réunion hebdomadaire de la Direction générale du Fonds de Promotion de la Santé dirigée par le DGE Marius Mika. 27.01.2025',
    date: '27/01/2025',
    category: 'reunions',
    coverImage: '/images/albums/album4/01.jpg',
    photos: [
      {
        id: 'reunion-dg-marius-mika-janvier-1',
        src: '/images/albums/album4/01.jpg',
        alt: 'Réunion hebdomadaire dirigée par le DG',
        caption: 'Le DGE Marius Mika présidant la réunion de janvier'
      },
      {
        id: 'reunion-dg-marius-mika-janvier-2',
        src: '/images/albums/album4/481016905_548284598267147_6002408905080460848_n.jpg',
        alt: 'Équipe de direction en séance de travail',
        caption: 'Discussion sur les objectifs du premier trimestre'
      },
      {
        id: 'reunion-dg-marius-mika-janvier-3',
        src: '/images/albums/album4/480797906_548284448267162_2943389580578493373_n.jpg',
        alt: 'Présentation des projets',
        caption: 'Revue des projets prioritaires pour 2025'
      },
      {
        id: 'reunion-dg-marius-mika-janvier-4',
        src: '/images/albums/album4/482067522_548286304933643_8327950392956281086_n.jpg',
        alt: 'Séance de planification',
        caption: 'Planification des activités du premier semestre'
      }
    ]
  },
  {
    id: 'reunion-dga-tshimanga-mbuyi',
    title: 'Réunion hebdomadaire de la direction générale',
    description: 'Réunion hebdomadaire de la Direction générale présidée par professeure #TSHIMANGA #MBUYI Claudine, DGA du Fonds de Promotion de la Santé. 18.11.2024',
    date: '18/11/2024',
    category: 'reunions',
    coverImage: '/images/albums/album5/1.jpg',
    photos: [
      {
        id: 'reunion-dga-tshimanga-mbuyi-1',
        src: '/images/albums/album5/1.jpg',
        alt: 'Réunion dirigée par la professeure Tshimanga Mbuyi',
        caption: 'La DGA présidant la réunion hebdomadaire de novembre'
      },
      {
        id: 'reunion-dga-tshimanga-mbuyi-2',
        src: '/images/albums/album5/476279915_535415986220675_7619744846924465372_n.jpg',
        alt: 'Équipe de direction en discussion',
        caption: 'Échanges sur les programmes en cours'
      },
      {
        id: 'reunion-dga-tshimanga-mbuyi-3',
        src: '/images/albums/album5/476383353_535416199553987_5925367163870609081_n.jpg',
        alt: 'Présentation des rapports',
        caption: 'Analyse des rapports d\'activité de fin d\'année'
      }
    ]
  },
  {
    id: 'reunion-preparation-conference-fps-fec',
    title: 'Réunion hebdomadaire de la Direction générale',
    description: 'Réunion hebdomadaire de la Direction générale. La préparation de la conférence FPS-FEC ce mardi 11 juin 2024 a été à l\'ordre du jour.',
    date: '11/06/2024',
    category: 'reunions',
    coverImage: '/images/albums/album6/01.jpg',
    photos: [
      {
        id: 'reunion-preparation-conference-fps-fec-1',
        src: '/images/albums/album6/01.jpg',
        alt: 'Réunion de préparation de la conférence FPS-FEC',
        caption: 'Séance de travail sur la conférence à venir'
      },
      {
        id: 'reunion-preparation-conference-fps-fec-2',
        src: '/images/albums/album6/474951179_525917350503872_1158143146258307265_n.jpg',
        alt: 'Discussion sur l\'organisation de la conférence',
        caption: 'Planification des aspects logistiques'
      },
      {
        id: 'reunion-preparation-conference-fps-fec-3',
        src: '/images/albums/album6/474976013_525917690503838_5001107639148967956_n.jpg',
        alt: 'Échanges entre les cadres',
        caption: 'Définition du programme de la conférence'
      },
      {
        id: 'reunion-preparation-conference-fps-fec-4',
        src: '/images/albums/album6/474948606_525917580503849_9186975903008253469_n.jpg',
        alt: 'Vue d\'ensemble de la réunion',
        caption: 'Coordination finale avant l\'événement'
      }
    ]
  }
];

// Fonction pour initialiser les albums photos dans le localStorage
export const initPhotoAlbums = () => {
  if (typeof window === 'undefined') return;
  
  // Vérifie si les albums sont déjà dans le localStorage
  const existingAlbums = localStorage.getItem(STORAGE_KEY);
  if (!existingAlbums) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAlbums));
  }
};

// Hook pour obtenir tous les albums photos
export const usePhotoAlbums = () => {
  const [albums, setAlbums] = useState<PhotoAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialiser les albums si nécessaire
    initPhotoAlbums();
    
    // Récupérer les albums depuis le localStorage
    const albumsData = localStorage.getItem(STORAGE_KEY);
    if (albumsData) {
      setAlbums(JSON.parse(albumsData));
    }
    setLoading(false);
  }, []);

  return { albums, loading };
};

// Hook pour obtenir un album spécifique par son ID
export const usePhotoAlbum = (albumId: string) => {
  const [album, setAlbum] = useState<PhotoAlbum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !albumId) return;
    
    // Initialiser les albums si nécessaire
    initPhotoAlbums();
    
    // Récupérer les albums depuis le localStorage
    const albumsData = localStorage.getItem(STORAGE_KEY);
    if (albumsData) {
      const allAlbums: PhotoAlbum[] = JSON.parse(albumsData);
      const foundAlbum = allAlbums.find(a => a.id === albumId);
      
      if (foundAlbum) {
        setAlbum(foundAlbum);
      } else {
        setError('Album non trouvé');
      }
    } else {
      setError('Aucun album disponible');
    }
    setLoading(false);
  }, [albumId]);

  return { album, loading, error };
};

// Fonction pour ajouter un nouvel album
export const addPhotoAlbum = (newAlbum: PhotoAlbum) => {
  if (typeof window === 'undefined') return false;
  
  // Récupérer les albums existants
  const albumsData = localStorage.getItem(STORAGE_KEY);
  if (albumsData) {
    const albums: PhotoAlbum[] = JSON.parse(albumsData);
    
    // Vérifier si un album avec le même ID existe déjà
    if (albums.some(a => a.id === newAlbum.id)) {
      return false;
    }
    
    // Ajouter le nouvel album
    albums.push(newAlbum);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
    return true;
  }
  return false;
};

// Fonction pour mettre à jour un album existant
export const updatePhotoAlbum = (updatedAlbum: PhotoAlbum) => {
  if (typeof window === 'undefined') return false;
  
  // Récupérer les albums existants
  const albumsData = localStorage.getItem(STORAGE_KEY);
  if (albumsData) {
    const albums: PhotoAlbum[] = JSON.parse(albumsData);
    
    // Trouver l'index de l'album à mettre à jour
    const albumIndex = albums.findIndex(a => a.id === updatedAlbum.id);
    if (albumIndex === -1) {
      return false;
    }
    
    // Mettre à jour l'album
    albums[albumIndex] = updatedAlbum;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
    return true;
  }
  return false;
};

// Fonction pour supprimer un album
export const deletePhotoAlbum = (albumId: string) => {
  if (typeof window === 'undefined') return false;
  
  // Récupérer les albums existants
  const albumsData = localStorage.getItem(STORAGE_KEY);
  if (albumsData) {
    const albums: PhotoAlbum[] = JSON.parse(albumsData);
    
    // Filtrer pour retirer l'album avec l'ID spécifié
    const updatedAlbums = albums.filter(a => a.id !== albumId);
    
    // Si la taille est différente, l'album a été trouvé et supprimé
    if (updatedAlbums.length !== albums.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlbums));
      return true;
    }
  }
  return false;
}; 
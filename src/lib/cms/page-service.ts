/**
 * Service pour gérer les pages du site en utilisant localStorage
 */

import { v4 as uuidv4 } from 'uuid';
import { getAllItems, getItem, setItem, removeItem } from './local-storage';

// Interface pour les données d'une page
export interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'published' | 'draft';
  layout: 'standard' | 'full-width' | 'sidebar' | 'landing';
  lastUpdated?: string;
  author?: string;
  banner?: {
    enabled: boolean;
    imageUrl?: string;
    title?: string;
    subtitle?: string;
    height: 'small' | 'medium' | 'large';
  };
  components?: {
    id: string;
    type: 'text' | 'gallery' | 'cta' | 'stats' | 'testimonials';
    data: Record<string, any>;
  }[];
}

/**
 * Initialiser les pages par défaut dans le localStorage
 */
export function initializeDefaultPages(): void {
  const pages = getAllItems<PageData>('pages');
  
  // Si le localStorage est vide, ajoutons des pages par défaut
  if (pages.length === 0) {
    const defaultPages = getDefaultPages();
    
    // Ajouter chaque page par défaut
    Object.values(defaultPages).forEach(page => {
      setItem('pages', page.id, page);
    });
  }
}

/**
 * Obtenir toutes les pages
 */
export function getAllPages(): PageData[] {
  return getAllItems<PageData>('pages');
}

/**
 * Obtenir une page par son ID
 */
export function getPageById(id: string): PageData | null {
  return getItem<PageData>('pages', id);
}

/**
 * Obtenir une page par son slug
 */
export function getPageBySlug(slug: string): PageData | null {
  // Transformer le slug en format normalisé
  const normalizedSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  
  const pages = getAllItems<PageData>('pages');
  return pages.find(page => {
    const pageSlug = page.slug.replace(/^\//, '').replace(/\/$/, '');
    return pageSlug === normalizedSlug;
  }) || null;
}

/**
 * Créer une nouvelle page
 */
export function createPage(pageData: Omit<PageData, 'id'>): PageData {
  const id = uuidv4();
  const date = new Date().toISOString();
  
  const newPage: PageData = {
    ...pageData,
    id,
    lastUpdated: date,
    author: 'Admin'
  };
  
  setItem('pages', id, newPage);
  return newPage;
}

/**
 * Mettre à jour une page existante
 */
export function updatePage(id: string, pageData: Partial<PageData>): PageData | null {
  const existingPage = getItem<PageData>('pages', id);
  
  if (!existingPage) {
    return null;
  }
  
  const updatedPage: PageData = {
    ...existingPage,
    ...pageData,
    lastUpdated: new Date().toISOString()
  };
  
  setItem('pages', id, updatedPage);
  return updatedPage;
}

/**
 * Supprimer une page
 */
export function deletePage(id: string): boolean {
  const existingPage = getItem<PageData>('pages', id);
  
  if (!existingPage) {
    return false;
  }
  
  removeItem('pages', id);
  return true;
}

/**
 * Obtenir les pages par défaut pour initialiser le localStorage
 */
function getDefaultPages(): Record<string, PageData> {
  return {
    "1": {
      id: "1",
      title: "Accueil",
      slug: "/",
      content: "<h1>Bienvenue sur le site du FPS</h1><p>Le Fonds de Promotion de la Santé (FPS) est un établissement public créé pour financer les interventions prioritaires de santé en République Démocratique du Congo.</p>",
      metaTitle: "Accueil - Fonds de Promotion de la Santé RDC",
      metaDescription: "Site officiel du Fonds de Promotion de la Santé (FPS) de la République Démocratique du Congo",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: false,
        imageUrl: "",
        title: "",
        subtitle: "",
        height: "medium"
      },
      components: []
    },
    "2": {
      id: "2",
      title: "À propos",
      slug: "/a-propos",
      content: "<h1>À propos du FPS</h1><p>Le Fonds de Promotion de la Santé (FPS) est un établissement public à caractère administratif, doté de la personnalité juridique, créé par Décret n°19/13 du 25 novembre 2019.</p><p>Le FPS a pour mission de mobiliser des ressources additionnelles pour le financement des interventions prioritaires de santé.</p>",
      metaTitle: "À propos - Fonds de Promotion de la Santé RDC",
      metaDescription: "Découvrez l'histoire, la mission et la vision du Fonds de Promotion de la Santé (FPS) de la RDC",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: true,
        imageUrl: "/images/banners/banner-about.jpg",
        title: "À propos du FPS",
        subtitle: "Découvrez notre mission et notre vision pour l'amélioration de la santé publique en RDC",
        height: "medium"
      },
      components: [
        {
          id: "a1",
          type: "text",
          data: {
            title: "Notre histoire",
            content: "<p>Le Fonds de Promotion de la Santé (FPS) a été créé en 2015 par décret présidentiel pour répondre aux défis persistants du financement de la santé en République Démocratique du Congo.</p><p>Né de la volonté de renforcer le système de santé congolais et d'améliorer l'accès aux soins pour tous, le FPS représente une innovation majeure dans le paysage sanitaire du pays. Depuis sa création, il a mobilisé des ressources significatives et mis en œuvre des programmes qui ont contribué à l'amélioration des indicateurs de santé dans plusieurs provinces.</p>",
            columns: 1
          }
        },
        {
          id: "a2",
          type: "text",
          data: {
            title: "Notre mission",
            content: "<p>Mobiliser et gérer efficacement des ressources financières pour soutenir les interventions prioritaires de santé publique, renforcer le système de santé et améliorer l'accès à des soins de qualité pour tous les Congolais, en particulier les populations les plus vulnérables.</p>",
            columns: 1
          }
        },
        {
          id: "a3",
          type: "stats",
          data: {
            title: "Le FPS en chiffres",
            stats: [
              { label: "Provinces couvertes", value: "26" },
              { label: "Bénéficiaires", value: "5M+" },
              { label: "Programmes actifs", value: "12" }
            ]
          }
        }
      ]
    },
    "21": {
      id: "21",
      title: "Notre histoire",
      slug: "/a-propos/histoire",
      content: "<h1>Notre histoire</h1><p>Découvrez les étapes clés du développement du Fonds de Promotion de la Santé en République Démocratique du Congo.</p>",
      metaTitle: "Notre histoire - Fonds de Promotion de la Santé RDC",
      metaDescription: "Chronologie du développement du FPS en République Démocratique du Congo",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: true,
        imageUrl: "/images/banners/banner-history.jpg",
        title: "Notre histoire",
        subtitle: "Les étapes clés du développement du Fonds de Promotion de la Santé",
        height: "medium"
      },
      components: [
        {
          id: "h1",
          type: "text",
          data: {
            title: "Chronologie du FPS",
            content: "<p>Le Fonds de Promotion de la Santé a parcouru un chemin important depuis sa conception initiale jusqu'à son fonctionnement actuel. Voici les principales étapes de son développement.</p>",
            columns: 1
          }
        },
        {
          id: "h2",
          type: "text",
          data: {
            title: "2020 - Conception initiale",
            content: "<p>Élaboration du concept du Fonds de Promotion de la Santé par le Ministère de la Santé Publique pour répondre aux défis du financement de la santé en RDC.</p>",
            columns: 1
          }
        }
      ]
    },
    "22": {
      id: "22",
      title: "Notre mission",
      slug: "/a-propos/mission",
      content: "<h1>Notre mission</h1><p>Découvrez la mission, la vision et les valeurs qui guident les actions du Fonds de Promotion de la Santé.</p>",
      metaTitle: "Mission et vision - Fonds de Promotion de la Santé RDC",
      metaDescription: "La mission, la vision et les valeurs qui guident les actions du FPS en RDC",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: true,
        imageUrl: "/images/banners/banner-mission.jpg",
        title: "Notre mission",
        subtitle: "Notre engagement pour la santé publique en RDC",
        height: "medium"
      },
      components: [
        {
          id: "m1",
          type: "text",
          data: {
            title: "Mission",
            content: "<p>Le Fonds de Promotion de la Santé a pour mission de <strong>mobiliser, gérer et allouer des ressources financières supplémentaires</strong> en vue de soutenir et d'améliorer les interventions et les programmes de santé prioritaires, notamment la prévention et la promotion de la santé, en République Démocratique du Congo.</p>",
            columns: 1
          }
        }
      ]
    },
    "23": {
      id: "23",
      title: "Structure de gouvernance",
      slug: "/a-propos/gouvernance",
      content: "<h1>Structure de gouvernance</h1><p>L'organisation interne du Fonds de Promotion de la Santé pour assurer une gestion efficace et transparente.</p>",
      metaTitle: "Gouvernance - Fonds de Promotion de la Santé RDC",
      metaDescription: "La structure organisationnelle et le système de gouvernance du FPS en RDC",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: true,
        imageUrl: "/images/banners/banner-governance.jpg",
        title: "Structure de gouvernance",
        subtitle: "Organisation interne pour une gestion efficace",
        height: "medium"
      },
      components: []
    },
    "24": {
      id: "24",
      title: "Cadre juridique",
      slug: "/a-propos/juridique",
      content: "<h1>Cadre juridique</h1><p>Les bases légales qui encadrent le fonctionnement du Fonds de Promotion de la Santé en RDC.</p>",
      metaTitle: "Cadre juridique - Fonds de Promotion de la Santé RDC",
      metaDescription: "Base légale et réglementaire régissant le FPS en République Démocratique du Congo",
      status: "published",
      lastUpdated: new Date().toISOString(),
      author: "Admin FPS",
      layout: "standard",
      banner: {
        enabled: true,
        imageUrl: "/images/banners/banner-legal.jpg",
        title: "Cadre juridique",
        subtitle: "Les fondements légaux du FPS",
        height: "medium"
      },
      components: []
    }
  };
} 
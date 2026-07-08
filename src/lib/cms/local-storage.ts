/**
 * Service de stockage de données dans le localStorage du navigateur
 * Cette implémentation remplace temporairement l'utilisation de MongoDB
 */

// Préfixe pour toutes les clés stockées dans le localStorage
const STORAGE_PREFIX = 'fps_cms_';

// Types de collections disponibles
export type CollectionName = 'pages' | 'users' | 'site_config' | 'media';

/**
 * Initialiser le stockage local avec des données par défaut si nécessaire
 */
export function initLocalStorage(): void {
  if (typeof window === 'undefined') return;

  // Créer les collections par défaut si elles n'existent pas
  const collections: CollectionName[] = ['pages', 'users', 'site_config', 'media'];

  collections.forEach(collection => {
    const key = `${STORAGE_PREFIX}${collection}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  });

  // Initialiser la configuration du site si elle n'existe pas
  const siteConfig = getItem('site_config', 'default');
  if (!siteConfig) {
    setItem('site_config', 'default', {
      siteName: 'Fonds de Promotion de la Santé (FPS) - RDC',
      siteDescription: 'Site officiel du Fonds de Promotion de la Santé de la République Démocratique du Congo',
      faviconUrl: '/favicon.ico',
      logoUrl: '/images/logo-fps.jpg',
      contactEmail: 'secretariat@fps.cd',
      contactPhone: '+243 819 115 812',
      contactAddress: '16, Av. Lukusa, Imm Les Palmiers, Apt 3B, Kinshasa-Gombe, RDC',
      socialLinks: {}
    });
  }
}

/**
 * Obtenir un élément du localStorage
 * @param collection Nom de la collection
 * @param id Identifiant de l'élément (ou 'default' pour les collections singleton)
 */
export function getItem<T = unknown>(collection: CollectionName, id: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    const data = localStorage.getItem(key);

    if (!data) return null;

    const items: Record<string, unknown>[] = JSON.parse(data);

    // Pour les collections de type singleton (comme site_config)
    if (id === 'default' && Array.isArray(items) && items.length > 0) {
      return items[0] as T;
    }

    // Pour les collections standard
    if (Array.isArray(items)) {
      return (items.find((item: Record<string, unknown>) => item.id === id) as T) || null;
    }

    return null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${collection}/${id}:`, error);
    return null;
  }
}

/**
 * Obtenir tous les éléments d'une collection
 * @param collection Nom de la collection
 */
export function getAllItems<T = unknown>(collection: CollectionName): T[] {
  if (typeof window === 'undefined') return [];

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    const data = localStorage.getItem(key);

    if (!data) return [];

    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Erreur lors de la récupération de la collection ${collection}:`, error);
    return [];
  }
}

/**
 * Ajouter ou mettre à jour un élément dans le localStorage
 * @param collection Nom de la collection
 * @param id Identifiant de l'élément (ou 'default' pour les collections singleton)
 * @param data Données à stocker
 */
export function setItem<T = unknown>(collection: CollectionName, id: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    let items: Record<string, unknown>[] = [];

    const existingData = localStorage.getItem(key);
    if (existingData) {
      items = JSON.parse(existingData);
    }

    // Pour les collections singleton (comme site_config)
    if (id === 'default') {
      items = [{ ...(data as Record<string, unknown>), id: 'default' }];
    } else {
      // Pour les collections standard
      const index = items.findIndex((item: Record<string, unknown>) => item.id === id);

      if (index >= 0) {
        // Mettre à jour un élément existant
        items[index] = { ...(data as Record<string, unknown>), id };
      } else {
        // Ajouter un nouvel élément
        items.push({ ...(data as Record<string, unknown>), id });
      }
    }

    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement de ${collection}/${id}:`, error);
  }
}

/**
 * Supprimer un élément du localStorage
 * @param collection Nom de la collection
 * @param id Identifiant de l'élément
 */
export function removeItem(collection: CollectionName, id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    const existingData = localStorage.getItem(key);

    if (!existingData) return;

    let items: Record<string, unknown>[] = JSON.parse(existingData);

    // Filtrer pour enlever l'élément avec l'ID spécifié
    items = items.filter((item: Record<string, unknown>) => item.id !== id);

    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${collection}/${id}:`, error);
  }
}

/**
 * Effacer toutes les données d'une collection
 * @param collection Nom de la collection
 */
export function clearCollection(collection: CollectionName): void {
  if (typeof window === 'undefined') return;

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    localStorage.setItem(key, JSON.stringify([]));
  } catch (error) {
    console.error(`Erreur lors de la suppression de la collection ${collection}:`, error);
  }
}

/**
 * Importer des données dans le localStorage
 * @param collection Nom de la collection
 * @param data Données à importer
 */
export function importData<T = unknown>(collection: CollectionName, data: T[]): void {
  if (typeof window === 'undefined') return;

  try {
    const key = `${STORAGE_PREFIX}${collection}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erreur lors de l'importation des données dans ${collection}:`, error);
  }
}

/**
 * Exporter les données du localStorage
 * @param collection Nom de la collection
 */
export function exportData<T = unknown>(collection: CollectionName): T[] {
  return getAllItems<T>(collection);
}

/**
 * Obtenir la configuration du site
 * @returns La configuration du site ou une configuration par défaut
 */
export async function getSiteConfig<T = unknown>(): Promise<T> {
  const config = getItem<T>('site_config', 'default');
  if (!config) {
    // Configuration par défaut
    const defaultConfig = {
      siteName: 'Fonds de Promotion de la Santé (FPS) - RDC',
      siteDescription: 'Site officiel du Fonds de Promotion de la Santé de la République Démocratique du Congo',
      faviconUrl: '/favicon.ico',
      logoUrl: '/images/logo-fps.jpg',
      contactEmail: 'secretariat@fps.cd',
      contactPhone: '+243 819 115 812',
      contactAddress: '16, Av. Lukusa, Imm Les Palmiers, Apt 3B, Kinshasa-Gombe, RDC',
      socialLinks: {}
    };
    setItem('site_config', 'default', defaultConfig);
    return defaultConfig as T;
  }
  return config;
}

/**
 * Mettre à jour la configuration du site
 * @param data Les nouvelles données de configuration
 * @returns La configuration mise à jour
 */
export async function updateSiteConfig<T = unknown>(data: T): Promise<T> {
  const config = await getSiteConfig<T>();

  // Mettre à jour les champs
  Object.keys(data as Record<string, unknown>).forEach((key) => {
    if (key !== 'id') {
      if (key === 'socialLinks' && typeof (data as Record<string, unknown>)[key] === 'object') {
        // Gestion spéciale pour les liens sociaux
        (config as Record<string, unknown>).socialLinks = {
          ...((config as Record<string, unknown>).socialLinks as object),
          ...((data as Record<string, unknown>)[key] as object)
        };
      } else {
        (config as Record<string, unknown>)[key] = (data as Record<string, unknown>)[key];
      }
    }
  });

  setItem('site_config', 'default', config);
  return config;
} 
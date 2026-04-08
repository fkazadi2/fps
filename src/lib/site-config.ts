/**
 * Service pour gérer la configuration du site
 */

// Configuration du site (interface)
export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  faviconUrl: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

// Utiliser localStorage (côté client) ou des valeurs par défaut (côté serveur)
export async function getSiteConfig(): Promise<SiteConfig> {
  // Version par défaut de la configuration (utilisée côté serveur)
  const defaultConfig: SiteConfig = {
    siteName: 'Fonds de Promotion de la Santé (FPS) - RDC',
    siteDescription: 'Site officiel du Fonds de Promotion de la Santé de la République Démocratique du Congo',
    faviconUrl: '/favicon.ico',
    logoUrl: '/images/logo-fps.jpg',
    contactEmail: '',
    contactPhone: '+243 819 115 812',
    contactAddress: '16, Av. Lukusa, Imm Les Palmiers, Apt 2A, Kinshasa-Gombe, RDC',
    socialLinks: {}
  };

  // Si côté client, essayer de récupérer depuis localStorage
  if (typeof window !== 'undefined') {
    try {
      const { getItem } = await import('./cms/local-storage');
      const storedConfig = getItem('site_config', 'default');

      if (storedConfig) {
        return storedConfig as SiteConfig;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la config depuis localStorage:', error);
    }
  }

  // Retourner la configuration par défaut
  return defaultConfig;
}

// Mettre à jour la configuration (côté client uniquement)
export async function updateSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig | null> {
  if (typeof window === 'undefined') return null;

  try {
    // Récupérer la configuration actuelle
    const currentConfig = await getSiteConfig();

    // Fusionner avec les nouvelles valeurs
    const updatedConfig: SiteConfig = {
      ...currentConfig,
      ...config
    };

    // Enregistrer dans localStorage
    const { setItem } = await import('./cms/local-storage');
    setItem('site_config', 'default', updatedConfig);

    return updatedConfig;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la configuration:', error);
    return null;
  }
} 
/**
 * Point d'entrée principal pour le CMS basé sur localStorage
 */

import { initLocalStorage } from './local-storage';
import { initializeDefaultPages } from './page-service';
import { initializeDefaultUsers } from './auth-service';

// Fonction d'initialisation du CMS
export function initializeCMS() {
  if (typeof window !== 'undefined') {
    // Initialiser le localStorage
    initLocalStorage();
    
    // Initialiser les pages par défaut
    initializeDefaultPages();
    
    // Initialiser les utilisateurs par défaut
    initializeDefaultUsers();
    
    console.log('✅ CMS initialisé avec succès en mode localStorage');
  }
}

// Exporter tous les services
export * from './local-storage';
export * from './page-service';
export * from './auth-service'; 
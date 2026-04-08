/**
 * Script pour configurer l'environnement de développement local
 * Ce script :
 * 1. Vérifie et crée un fichier .env.local s'il n'existe pas
 * 2. Initialise le stockage local (localStorage)
 */

import * as fs from 'fs';
import * as path from 'path';
import { initLocalStorage } from './cms/local-storage';

// Contenu du fichier .env.local par défaut
const envContent = `# Stockage local
USE_LOCAL_STORAGE=true

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret_nextauth_ultra_securise

# Cloudinary (facultatif - pour le stockage d'images)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Configuration du site
SITE_URL=http://localhost:3000
`;

/**
 * Configuration du développement local
 */
export async function setupLocalEnvironment() {
  try {
    console.log('🚀 Configuration de l\'environnement de développement local...');
    
    // 1. Vérifier et créer le fichier .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    
    if (!fs.existsSync(envPath)) {
      console.log('📄 Création du fichier .env.local...');
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Fichier .env.local créé avec succès');
    } else {
      console.log('✅ Le fichier .env.local existe déjà');
    }
    
    // 2. Initialiser le stockage local
    if (typeof window !== 'undefined') {
      console.log('💾 Initialisation du stockage local...');
      initLocalStorage();
      console.log('✅ Stockage local initialisé');
    } else {
      console.log('⚠️ Le stockage local sera initialisé côté client');
    }
    
    console.log('\n✅ Configuration terminée ! Votre environnement est prêt.');
    console.log('\n🌐 Lancer le serveur de développement avec :');
    console.log('npm run dev');
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    
    console.log('\n⚠️ La configuration a échoué. Vérifiez les points suivants :');
    console.log('1. Vous avez les permissions suffisantes pour créer des fichiers');
    console.log('2. Node.js est correctement installé');
    
    return false;
  }
}

// Si ce script est exécuté directement
if (require.main === module) {
  setupLocalEnvironment();
} 
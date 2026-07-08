/**
 * Script pour configurer le CMS en mode local sans dépendances externes
 * Exécuter avec: node scripts/setup-local.js
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Chemin du projet
const ROOT_DIR = path.resolve(__dirname, '..');

async function setupLocalCMS() {
  console.log('🚀 Configuration du CMS FPS en mode local...');

  // 1. Créer un fichier .env.local s'il n'existe pas
  const envPath = path.join(ROOT_DIR, '.env.local');
  const envContent = `# Base de données MongoDB locale
MONGODB_URI=mongodb://localhost:27017/fps_database

# NextAuth Secret (pour développement local)
NEXTAUTH_SECRET=local_development_secret_key_for_fps_website
NEXTAUTH_URL=http://localhost:3000

# Mode stockage local (pas besoin de Cloudinary)
USE_LOCAL_STORAGE=true
LOCAL_STORAGE_PATH=./public/uploads
`;

  if (!fs.existsSync(envPath)) {
    console.log('📝 Création du fichier .env.local...');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fichier .env.local créé avec succès');
  } else {
    console.log('ℹ️ Le fichier .env.local existe déjà');
  }

  // 2. Créer le dossier pour le stockage local des images
  const uploadsDir = path.join(ROOT_DIR, 'public', 'uploads');
  const faviconsDir = path.join(uploadsDir, 'favicons');
  const logosDir = path.join(uploadsDir, 'logos');

  if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Création des dossiers pour le stockage local...');
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.mkdirSync(faviconsDir, { recursive: true });
    fs.mkdirSync(logosDir, { recursive: true });
    console.log('✅ Dossiers de stockage créés avec succès');
  } else {
    console.log('ℹ️ Les dossiers de stockage existent déjà');
  }

  console.log('\n✅ Configuration de base terminée!');
  console.log('\n⚠️ Pour terminer la configuration:');
  console.log('1. Assurez-vous que MongoDB est installé et démarré sur votre machine');
  console.log('2. Démarrez le serveur avec: npm run dev');
  console.log('3. Accédez au CMS à: http://localhost:3000/admin/login');
  console.log('\nLors de la première connexion, un compte administrateur sera créé:');
  console.log('Email: admin@fps.gouv.cd');
  console.log('Mot de passe: admin123');
}

// Exécuter la fonction
setupLocalCMS().catch(error => {
  console.error('❌ Erreur lors de la configuration:', error);
}); 
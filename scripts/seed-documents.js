const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI est manquant dans .env.local');
  process.exit(1);
}

// Schéma minimal pour le seed
const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true, unique: true },
  fileSize: { type: String, required: true },
  format: { type: String, default: 'PDF' },
  date: { type: String, required: true },
  description: { type: String },
  downloads: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const DocumentModel = mongoose.models.Document || mongoose.model('Document', DocumentSchema);

const DOCUMENTS_DIR = path.join(process.cwd(), 'public/uploads/documents');

const documentsToSeed = [
  {
    fileName: 'Rapport annuel FPS 2023.pdf',
    title: 'Rapport Annuel 2023 - Activités et Réalisations',
    category: 'Rapport Annuel',
    date: '15 Janvier 2024',
    description: 'Rapport complet des activités et réalisations du FPS pour l\'année 2023, incluant les statistiques de performance et les projets réalisés.',
    featured: true
  },
  {
    fileName: 'Rapport - Gratuité des accouchements.pdf',
    title: 'Rapport sur la Gratuité des Accouchements',
    category: 'Rapport Technique',
    date: '10 Mars 2024',
    description: 'Analyse de l\'impact du programme de gratuité des accouchements sur la santé maternelle et néonatale en RDC.',
    featured: true
  }
];

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    return `${fileSizeInMegabytes.toFixed(1)} MB`;
  } catch (error) {
    return '0.0 MB';
  }
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    for (const doc of documentsToSeed) {
      const filePath = path.join(DOCUMENTS_DIR, doc.fileName);
      const fileUrl = `/uploads/documents/${doc.fileName}`;

      // Vérifier si le fichier existe physiquement
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Fichier non trouvé physiquement: ${doc.fileName}`);
        continue;
      }

      const fileSize = getFileSize(filePath);

      // Vérifier si le document existe déjà en base par fileUrl
      const exists = await DocumentModel.findOne({ fileUrl });
      
      const documentData = {
        title: doc.title,
        category: doc.category,
        fileUrl: fileUrl,
        fileSize: fileSize,
        format: 'PDF',
        date: doc.date,
        description: doc.description,
        featured: doc.featured
      };

      if (exists) {
        await DocumentModel.findByIdAndUpdate(exists._id, documentData);
        console.log(`🔄 Document mis à jour: ${doc.title}`);
      } else {
        await DocumentModel.create(documentData);
        console.log(`✅ Document créé: ${doc.title}`);
      }
    }

    console.log('🎉 Importation des documents terminée !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

seed();

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import DocumentModel from '../src/lib/models/Document';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI est manquant dans .env.local');
  process.exit(1);
}

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
  },
  {
    fileName: 'loi_csu_23_006_du_03_mars_2023.pdf',
    title: 'Loi relative à la CSU - N°23/006',
    category: 'Texte Légal',
    date: '03 Mars 2023',
    description: 'Loi portant modification et complétant certaines dispositions relatives à la Couverture Santé Universelle (CSU).',
    featured: true
  },
  {
    fileName: 'Décret FPS TPS-1.pdf',
    title: 'Décret FPS TPS-1',
    category: 'Décret',
    date: '2024',
    description: 'Décret fixant les modalités de fonctionnement et d\'organisation technique du Fonds de Promotion de la Santé.',
    featured: true
  },
  {
    fileName: 'Decrets Journal FPS.pdf',
    title: 'Journal des Décrets FPS',
    category: 'Bulletin Officiel',
    date: 'Avril 2024',
    description: 'Recueil officiel regroupant l\'ensemble des décrets et ordonnances relatifs au fonctionnement du Fonds de Promotion de la Santé.',
    featured: true
  }
];

function getFileSize(filePath: string): string {
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
    await mongoose.connect(MONGODB_URI as string);
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

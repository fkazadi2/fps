import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Page from '../src/lib/models/Page';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI est manquant dans .env.local');
    process.exit(1);
}

// Données corrigées (published: true au lieu de status: 'published')
const pagesToSeed = [
    {
        title: 'À propos',
        slug: '/a-propos',
        content: '<h1>À propos du FPS</h1><p>Le Fonds de Promotion de la Santé (FPS) est un établissement public...</p>', // Simplifié pour le seed
        published: true, // CORRIGÉ
        layout: 'standard',
        metaTitle: 'À propos - FPS',
        banner: {
            enabled: true,
            title: 'À propos du FPS',
            height: 'medium'
        },
        // On peut stocker les composants complexes dans 'content' si on change le code frontend pour lire 'content.components' 
        // ou on garde 'content' comme string HTML simple pour ce fix rapide.
        // Le schéma dit content: Mixed.
    },
    {
        title: 'Notre histoire',
        slug: '/a-propos/histoire',
        content: '<h1>Notre histoire</h1><p>Historique...</p>',
        published: true, // CORRIGÉ
        layout: 'standard'
    },
    {
        title: 'Notre mission',
        slug: '/a-propos/mission',
        content: '<h1>Notre mission</h1><p>Mission...</p>',
        published: true, // CORRIGÉ
        layout: 'standard'
    },
    {
        title: 'Structure de gouvernance',
        slug: '/a-propos/gouvernance',
        content: '<h1>Gouvernance</h1><p>Contenu gouvernance...</p>',
        published: true, // CORRIGÉ
        layout: 'standard'
    },
    {
        title: 'Programmes',
        slug: '/programmes',
        content: '<h1>Programmes</h1><p>Nos programmes...</p>',
        published: true, // CORRIGÉ
        layout: 'sidebar'
    }
];

async function reseed() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connecté à MongoDB');

        // 1. Nettoyer les données incorrectes
        console.log('🧹 Suppression des anciennes pages...');
        await Page.deleteMany({});

        // 2. Insérer les nouvelles données correctes
        console.log('🌱 Insertion des données valides...');
        for (const pageData of pagesToSeed) {
            await Page.create(pageData);
            console.log(`✅ Page créée: ${pageData.title} (${pageData.slug})`);
        }

        console.log('🎉 Seed corrigé terminé !');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

reseed();

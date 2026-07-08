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

// Données extraites de src/app/[slug]/page.tsx
const pagesToSeed = [
    {
        title: 'À propos',
        slug: '/a-propos',
        content: '<h1>À propos du FPS</h1><p>Le Fonds de Promotion de la Santé (FPS) est un établissement public à caractère administratif, doté de la personnalité juridique, créé par Décret n°19/13 du 25 novembre 2019.</p><p>Le FPS a pour mission de mobiliser des ressources additionnelles pour le financement des interventions prioritaires de santé.</p>',
        metaTitle: 'À propos - Fonds de Promotion de la Santé RDC',
        metaDescription: 'Découvrez l\'histoire, la mission et la vision du Fonds de Promotion de la Santé (FPS) de la RDC',
        status: 'published',
        layout: 'standard',
        banner: {
            enabled: true,
            imageUrl: '/images/banners/banner-about.jpg',
            title: 'À propos du FPS',
            subtitle: 'Découvrez notre mission et notre vision pour l\'amélioration de la santé publique en RDC',
            height: 'medium'
        },
        components: [
            {
                id: '1',
                type: 'text',
                data: {
                    title: 'Notre histoire',
                    content: '<p>Le Fonds de Promotion de la Santé (FPS) a été créé en 2015 par décret présidentiel pour répondre aux défis persistants du financement de la santé en République Démocratique du Congo.</p><p>Né de la volonté de renforcer le système de santé congolais et d\'améliorer l\'accès aux soins pour tous, le FPS représente une innovation majeure dans le paysage sanitaire du pays. Depuis sa création, il a mobilisé des ressources significatives et mis en œuvre des programmes qui ont contribué à l\'amélioration des indicateurs de santé dans plusieurs provinces.</p>',
                    columns: 1
                }
            },
            {
                id: '2',
                type: 'text',
                data: {
                    title: 'Notre mission',
                    content: '<p>Mobiliser et gérer efficacement des ressources financières pour soutenir les interventions prioritaires de santé publique, renforcer le système de santé et améliorer l\'accès à des soins de qualité pour tous les Congolais, en particulier les populations les plus vulnérables.</p>',
                    columns: 1
                }
            },
            {
                id: '3',
                type: 'stats',
                data: {
                    title: 'Le FPS en chiffres',
                    stats: [
                        { label: 'Provinces couvertes', value: '26' },
                        { label: 'Bénéficiaires', value: '5M+' },
                        { label: 'Programmes actifs', value: '12' }
                    ]
                }
            },
            {
                id: '4',
                type: 'text',
                data: {
                    title: 'Notre vision',
                    content: '<p>Un système de santé congolais résilient, performant et équitable, offrant des services de santé de qualité accessibles à tous, grâce à des mécanismes de financement durables et innovants.</p>',
                    columns: 1
                }
            },
            {
                id: '5',
                type: 'text',
                data: {
                    title: 'Structure de gouvernance',
                    content: '<p>Le FPS dispose d\'une structure de gouvernance bien définie qui assure une répartition claire des responsabilités, une gestion efficace des ressources et une prise de décision transparente.</p><p>Dirigé par un CA qui définit les orientations stratégiques, et géré par une Direction générale qui assure la mise en œuvre opérationnelle, le FPS est organisé en plusieurs directions techniques spécialisées qui couvrent tous les aspects de sa mission.</p><p>Notre organigramme illustre la structure hiérarchique et fonctionnelle complète de l\'institution, incluant les directions régionales qui assurent notre présence dans toutes les provinces du pays.</p>',
                    columns: 1
                }
            },
            {
                id: '7',
                type: 'cta',
                data: {
                    title: 'Contactez-nous',
                    text: 'Pour plus d\'informations sur nos activités ou pour discuter de partenariats potentiels, n\'hésitez pas à nous contacter.',
                    buttonText: 'Nous contacter',
                    buttonUrl: '/contact'
                }
            }
        ]
    },
    {
        title: 'Notre histoire',
        slug: '/a-propos/histoire',
        content: '<h1>Notre histoire</h1><p>Découvrez les étapes clés du développement du Fonds de Promotion de la Santé en République Démocratique du Congo.</p>',
        metaTitle: 'Notre histoire - Fonds de Promotion de la Santé RDC',
        metaDescription: 'Chronologie du développement du FPS en République Démocratique du Congo',
        status: 'published',
        layout: 'standard',
        banner: {
            enabled: true,
            imageUrl: '/images/banners/banner-history.jpg',
            title: 'Notre histoire',
            subtitle: 'Les étapes clés du développement du Fonds de Promotion de la Santé',
            height: 'medium'
        },
        components: [
            { id: 'h1', type: 'text', data: { title: 'Chronologie du FPS', content: '<p>Le Fonds de Promotion de la Santé a parcouru un chemin important depuis sa conception initiale jusqu\'à son fonctionnement actuel.</p>', columns: 1 } }
        ]
    },
    {
        title: 'Notre mission',
        slug: '/a-propos/mission',
        content: '<h1>Notre mission</h1><p>Découvrez la mission, la vision et les valeurs qui guident les actions du Fonds de Promotion de la Santé.</p>',
        metaTitle: 'Mission et vision - Fonds de Promotion de la Santé RDC',
        metaDescription: 'La mission, la vision et les valeurs qui guident les actions du FPS en RDC',
        status: 'published',
        layout: 'standard',
        banner: { enabled: true, imageUrl: '/images/banners/banner-mission.jpg', title: 'Notre mission', subtitle: 'Notre engagement pour la santé publique en RDC', height: 'medium' }
    },
    {
        title: 'Structure de gouvernance',
        slug: '/a-propos/gouvernance',
        content: '<h1>Structure de gouvernance</h1><p>L\'organisation interne du Fonds de Promotion de la Santé pour assurer une gestion efficace et transparente.</p>',
        status: 'published',
        layout: 'standard',
        banner: { enabled: true, imageUrl: '/images/banners/banner-governance.jpg', title: 'Structure de gouvernance', subtitle: 'Organisation interne pour une gestion efficace', height: 'medium' }
    },
    {
        title: 'Programmes',
        slug: '/programmes',
        content: '<h1>Nos programmes</h1><p>Le FPS développe et soutient divers programmes visant à améliorer l\'accès aux soins de santé.</p>',
        status: 'published',
        layout: 'sidebar',
        banner: { enabled: true, imageUrl: '/images/banners/banner-programs.jpg', title: 'Nos programmes', subtitle: 'Des initiatives concrètes pour améliorer la santé publique', height: 'large' },
        components: [
            { id: 'p1', type: 'text', data: { title: 'Programmes prioritaires', content: '<p>Le FPS développe et finance plusieurs programmes prioritaires.</p>', columns: 1 } },
            { id: 'p3', type: 'cta', data: { title: 'Soumettre un projet', text: 'Vous avez un projet qui contribue à nos objectifs?', buttonText: 'Soumettre un projet', buttonUrl: '/contact' } }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connecté à MongoDB');

        for (const pageData of pagesToSeed) {
            // Vérifier si la page existe déjà par slug
            const exists = await Page.findOne({ slug: pageData.slug });
            if (exists) {
                console.log(`⚠️ La page ${pageData.slug} existe déjà, ignorée.`);
                continue;
            }

            await Page.create(pageData);
            console.log(`✅ Page créée: ${pageData.title} (${pageData.slug})`);
        }

        console.log('🎉 Importation terminée !');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

seed();

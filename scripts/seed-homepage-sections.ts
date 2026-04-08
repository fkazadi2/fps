/**
 * Script de migration pour peupler HomepageSection avec données initiales
 * 
 * Ce script copie les données hardcodées actuelles de page.tsx vers MongoDB
 * Usage: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-homepage-sections.ts
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Charger .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Import du modèle
import HomepageSection from '../src/lib/models/HomepageSection';

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI non trouvé dans .env.local');
    process.exit(1);
}

// Données initiales (copiées depuis defaultHomepageContent dans page.tsx)
const initialSections = [
    {
        sectionType: 'hero_slider',
        key: 'homepage_hero',
        title: 'Hero Slider - Page d\'accueil',
        content: {
            slides: [
                {
                    id: 1,
                    title: "Accès aux soins pour les vulnérables",
                    description: "L'accès aux prestations de santé pour les indigents et les vulnérables sur toute l'étendue de la RDC.",
                    image: "/images/slides/new-slides/acces-aux-soins-pour-les-vulnerables.jpg",
                    buttonText: "Découvrir le FPS",
                    buttonLink: "/a-propos",
                    secondaryButtonText: "Nos programmes",
                    secondaryButtonLink: "/programmes"
                },
                {
                    id: 2,
                    title: "Mise en œuvre de la CSU",
                    description: "Nous envisageons la mise en œuvre du système de la CSU comme un processus en tenant compte de la diversité des contextes géographiques, socio-culturels et économiques.",
                    image: "/images/slides/new-slides/mise-en-œuvre-de-la-CSU.jpg",
                    buttonText: "En savoir plus",
                    buttonLink: "/programmes",
                    secondaryButtonText: "Contactez-nous",
                    secondaryButtonLink: "/contact"
                },
                {
                    id: 3,
                    title: "Équité dans l'accès aux soins",
                    description: "L'accès aux soins des populations, des familles et des individus en assurant l'équité, en enlevant les barrières de toutes sortes.",
                    image: "/images/slides/new-slides/equite-dans-l-acces-aux-soins.jpg",
                    buttonText: "Voir les programmes",
                    buttonLink: "/programmes",
                    secondaryButtonText: "Partenaires",
                    secondaryButtonLink: "/financement#partenaires"
                },
                {
                    id: 4,
                    title: "Participation communautaire",
                    description: "La participation communautaire suppose que la communauté s'organise pour créer une dynamique en faveur du processus de la CSU.",
                    image: "/images/slides/new-slides/participation-communautaire.jpg",
                    buttonText: "Nos initiatives",
                    buttonLink: "/programmes#capacites",
                    secondaryButtonText: "Contactez-nous",
                    secondaryButtonLink: "/contact"
                }
            ],
            autoplay: true,
            duration: 7000
        },
        active: true,
        displayOrder: 1
    },
    {
        sectionType: 'mission',
        key: 'homepage_mission',
        title: 'Mission, Vision et Axes Stratégiques',
        content: {
            title: "Notre mission",
            subtitle: "Mobiliser, gérer et promouvoir efficacement les ressources pour la santé publique, conformément au Décret n°22/15 du 09 avril 2022",
            vision: "Une RDC où la santé est financée de manière durable et équitable pour tous",
            legalFramework: "Décret n°22/15 du 09 avril 2022 - Tutelle du Ministère de la Santé",
            strategicAxes: [
                {
                    title: "Mobilisation des ressources internes et externes",
                    description: "Mobiliser activement des ressources financières additionnelles provenant de sources internes et externes pour renforcer le financement du secteur de la santé.",
                    icon: "trending"
                },
                {
                    title: "Soutien aux zones de santé pour l'accès aux soins",
                    description: "Apporter un soutien direct aux zones de santé pour améliorer l'accès aux soins de qualité, incluant le financement d'infrastructures et la dotation en médicaments.",
                    icon: "building"
                },
                {
                    title: "Promotion des comportements sains et de la prévention",
                    description: "Développer et financer des programmes de prévention et de promotion de la santé pour encourager les comportements sains au sein des communautés.",
                    icon: "check"
                },
                {
                    title: "Partenariat et plaidoyer avec les acteurs du secteur santé",
                    description: "Développer des partenariats stratégiques et mener des actions de plaidoyer pour promouvoir des politiques favorables à la santé publique et à la CSU.",
                    icon: "users"
                }
            ]
        },
        active: true,
        displayOrder: 2
    },
    {
        sectionType: 'features',
        key: 'homepage_features',
        title: 'Nos Valeurs',
        content: {
            features: [
                {
                    title: "Éducation Sanitaire",
                    description: "Promouvoir l'éducation sanitaire pour améliorer les comportements et pratiques de santé.",
                    link: "/programmes#education",
                    icon: "education"
                },
                {
                    title: "Prévention",
                    description: "Développer des programmes de prévention des maladies et de promotion de modes de vie sains.",
                    link: "/programmes#prevention",
                    icon: "prevention"
                },
                {
                    title: "Collaboration",
                    description: "Coordonner les efforts avec les partenaires publics et privés pour maximiser l'impact sanitaire.",
                    link: "/a-propos#partenariats",
                    icon: "collaboration"
                }
            ]
        },
        active: true,
        displayOrder: 3
    },
    {
        sectionType: 'stats',
        key: 'homepage_stats',
        title: 'Statistiques Clés',
        content: {
            title: "Notre impact en chiffres",
            subtitle: "Le FPS en action pour améliorer la santé publique en RDC",
            values: [
                { label: "Personnes couvertes", value: "5M+", icon: "users", color: "bg-[var(--danger)]" },
                { label: "Centres de santé partenaires", value: "650+", icon: "building", color: "bg-[var(--accent)]" },
                { label: "Provinces couvertes", value: "26", icon: "check", color: "bg-[var(--danger)]" },
                { label: "Taux de satisfaction", value: "85%", icon: "trending", color: "bg-[var(--accent)]" }
            ]
        },
        active: true,
        displayOrder: 4
    },
    {
        sectionType: 'csu_progress',
        key: 'homepage_csu_progress',
        title: 'Progrès vers la CSU',
        content: {
            title: "Progrès vers la CSU",
            subtitle: "Notre contribution à la Couverture Santé Universelle en RDC",
            description: "Le FPS contribue activement à l'atteinte des objectifs de la Couverture Santé Universelle en République Démocratique du Congo.",
            progressItems: [
                { label: "Accès financier", progress: 75 },
                { label: "Qualité des soins", progress: 80 },
                { label: "Disponibilité des services", progress: 70 },
                { label: "Équité géographique", progress: 65 }
            ]
        },
        active: true,
        displayOrder: 5
    },
    {
        sectionType: 'partners',
        key: 'homepage_partners',
        title: 'Nos Partenaires',
        content: {
            title: "Nos Partenaires",
            subtitle: "Ensemble pour une meilleure santé publique",
            description: "Le FPS collabore avec de nombreux partenaires locaux et internationaux pour maximiser son impact."
        },
        active: true,
        displayOrder: 6
    },
    {
        sectionType: 'testimonials',
        key: 'homepage_testimonials',
        title: 'Témoignages',
        content: {
            title: "Témoignages",
            subtitle: "Ce que disent nos bénéficiaires et partenaires",
            autoplay: true
        },
        active: true,
        displayOrder: 7
    },
    {
        sectionType: 'cta',
        key: 'homepage_cta',
        title: 'Appel à l\'action',
        content: {
            title: "Restez informé",
            description: "Recevez les dernières actualités et informations sur les activités du Fonds de Promotion de la Santé.",
            buttons: [
                { text: "Actualités", link: "/centre-presse/presse" },
                { text: "Nous contacter", link: "/contact" }
            ]
        },
        active: true,
        displayOrder: 8
    }
];

async function seedHomepageSections() {
    console.log('🚀 Démarrage du seed des sections homepage...\n');

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI non trouvé dans .env.local');
        process.exit(1);
    }

    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connecté à MongoDB\n');

        // Supprimer les sections existantes (clean slate)
        const deleteResult = await HomepageSection.deleteMany({});
        console.log(`🗑️  Supprimé ${deleteResult.deletedCount} sections existantes\n`);

        // Insérer les nouvelles sections
        console.log('📝 Insertion des sections initiales:');

        for (const section of initialSections) {
            const created = await HomepageSection.create(section);
            console.log(`   ✓ ${section.sectionType} (${section.key})`);
        }

        console.log(`\n✅ ${initialSections.length} sections créées avec succès!`);

        // Afficher résumé
        const total = await HomepageSection.countDocuments();
        const active = await HomepageSection.countDocuments({ active: true });
        console.log(`\n📊 Résumé:`);
        console.log(`   - Total sections: ${total}`);
        console.log(`   - Sections actives: ${active}`);

    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n👋 Déconnexion de MongoDB');
    }
}

// Exécution
seedHomepageSections();

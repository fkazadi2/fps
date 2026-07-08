/**
 * Script de migration pour peupler NavigationMenu avec données actuelles du Header
 * 
 * Ce script copie la navigation hardcodée de Header.tsx vers MongoDB
 * Usage: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-navigation-menu.ts
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Charger .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Import du modèle
import NavigationMenu from '../src/lib/models/NavigationMenu';

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI non trouvé dans .env.local');
    process.exit(1);
}

// Données de navigation actuelle (copiées depuis Header.tsx et Footer.tsx)
const mainHeaderNavigation = {
    key: 'main_header',
    title: 'Menu Principal - Header',
    location: 'header' as const,
    items: [
        {
            name: "Accueil",
            href: "/",
            order: 1,
            submenu: []
        },
        {
            name: "Qui sommes-nous",
            href: "/a-propos",
            order: 2,
            submenu: [
                { name: "Notre histoire", href: "/a-propos/histoire", order: 1 },
                { name: "Nos missions", href: "/a-propos/mission", order: 2 },
                { name: "Organisation", href: "/a-propos/gouvernance", order: 3 },
                { name: "Cadre juridique", href: "/a-propos/juridique", order: 4 }
            ]
        },
        {
            name: "Plateau technique",
            href: "/plateau-technique",
            order: 3,
            submenu: [
                { name: "Infrastructures sanitaires", href: "/plateau-technique/infrastructures", order: 1 },
                { name: "Financement en médicaments", href: "/plateau-technique/medicaments", order: 2 },
                { name: "Financement et dotation en équipements", href: "/plateau-technique/equipements", order: 3 },
                { name: "Banque de sang", href: "/plateau-technique/banque-de-sang", order: 4 }
            ]
        },
        {
            name: "Gouvernance Santé",
            href: "/gouvernance-sante",
            order: 4,
            submenu: [
                { name: "Financement du renforcement des capacités des ressources humaines du secteur santé", href: "/gouvernance-sante/capacitation", order: 1 },
                { name: "Système des références", href: "/gouvernance-sante/systeme-references", order: 2 },
                { name: "Recherche en médecine", href: "/gouvernance-sante/recherche-medicale", order: 3 }
            ]
        },
        {
            name: "Médecine traditionnelle",
            href: "/medecine-traditionnelle",
            order: 5,
            submenu: [
                { name: "Réglementation", href: "/medecine-traditionnelle/reglementation", order: 1 },
                { name: "Formation des praticiens", href: "/medecine-traditionnelle/formation-praticiens", order: 2 },
                { name: "Promotion des initiatives locales en santé", href: "/medecine-traditionnelle/promotion-initiatives", order: 3 }
            ]
        },
        {
            name: "Publications",
            href: "/publications",
            order: 6,
            submenu: [
                { name: "Appel d'offre", href: "/publications/appel-offre", order: 1 },
                { name: "Offre d'emploi", href: "/publications/offre-emploi", order: 2 },
                { name: "Rapports & Documentations", href: "/publications/rapports-documentations", order: 3 }
            ]
        },
        {
            name: "Centre de Presse",
            href: "/centre-presse",
            order: 7,
            submenu: [
                { name: "Presse", href: "/centre-presse/presse", order: 1 },
                { name: "Galerie Photo", href: "/centre-presse/galerie", order: 2 },
                { name: "Événements", href: "/centre-presse/evenements", order: 3 }
            ]
        }
    ],
    active: true
};

const footerMainNavigation = {
    key: 'footer_main',
    title: 'Footer - Liens rapides',
    location: 'footer' as const,
    items: [
        { name: "Accueil", href: "/", order: 1, submenu: [] },
        { name: "Notre raison d'être", href: "/a-propos", order: 2, submenu: [] },
        { name: "Plateau technique", href: "/plateau-technique", order: 3, submenu: [] },
        { name: "Gouvernance Santé", href: "/gouvernance-sante", order: 4, submenu: [] },
        { name: "Médecine traditionnelle", href: "/medecine-traditionnelle", order: 5, submenu: [] },
        { name: "Publications", href: "/publications", order: 6, submenu: [] },
        { name: "Centre de Presse", href: "/centre-presse", order: 7, submenu: [] }
    ],
    active: true
};

const footerColumnsNavigation = {
    key: 'footer_columns',
    title: 'Footer - Colonnes de liens',
    location: 'footer' as const,
    items: [
        {
            name: "Qui sommes-nous",
            href: "#",
            order: 1,
            submenu: [
                { name: "Notre histoire", href: "/a-propos/histoire", order: 1 },
                { name: "Nos missions", href: "/a-propos/mission", order: 2 },
                { name: "Organisation", href: "/a-propos/gouvernance", order: 3 },
                { name: "Cadre juridique", href: "/a-propos/juridique", order: 4 }
            ]
        },
        {
            name: "Plateau technique",
            href: "#",
            order: 2,
            submenu: [
                { name: "Infrastructures sanitaires", href: "/plateau-technique/infrastructures", order: 1 },
                { name: "Financement en médicaments", href: "/plateau-technique/medicaments", order: 2 },
                { name: "Financement et dotation en équipements", href: "/plateau-technique/equipements", order: 3 },
                { name: "Banque de sang", href: "/plateau-technique/banque-de-sang", order: 4 }
            ]
        },
        {
            name: "Gouvernance Santé",
            href: "#",
            order: 3,
            submenu: [
                { name: "Financement du renforcement des capacités des ressources humaines du secteur santé", href: "/gouvernance-sante/capacitation", order: 1 },
                { name: "Système des références", href: "/gouvernance-sante/systeme-references", order: 2 },
                { name: "Recherche en médecine", href: "/gouvernance-sante/recherche-medicale", order: 3 }
            ]
        },
        {
            name: "Médecine traditionnelle",
            href: "#",
            order: 4,
            submenu: [
                { name: "Réglementation", href: "/medecine-traditionnelle/reglementation", order: 1 },
                { name: "Formation des praticiens", href: "/medecine-traditionnelle/formation-praticiens", order: 2 },
                { name: "Promotion des initiatives locales en santé", href: "/medecine-traditionnelle/promotion-initiatives", order: 3 }
            ]
        },
        {
            name: "Publications",
            href: "#",
            order: 5,
            submenu: [
                { name: "Appel d'offre", href: "/publications/appel-offre", order: 1 },
                { name: "Offre d'emploi", href: "/publications/offre-emploi", order: 2 },
                { name: "Rapports & Documentations", href: "/publications/rapports-documentations", order: 3 }
            ]
        },
        {
            name: "Centre de Presse",
            href: "#",
            order: 6,
            submenu: [
                { name: "Presse", href: "/centre-presse/presse", order: 1 },
                { name: "Galerie Photo", href: "/centre-presse/galerie", order: 2 },
                { name: "Événements", href: "/centre-presse/evenements", order: 3 }
            ]
        },
        {
            name: "Contacts",
            href: "#",
            order: 7,
            submenu: [
                { name: "Nous visiter", href: "/contacts/nous-visiter", order: 1 },
                { name: "Nous écrire", href: "/contacts/nous-ecrire", order: 2 },
                { name: "Commissions provinciales FPS", href: "/contacts/adresses-provinces", order: 3 }
            ]
        }
    ],
    active: true
};

async function seedNavigationMenu() {
    console.log('🚀 Démarrage du seed du menu de navigation...\n');

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI non trouvé');
        process.exit(1);
    }

    try {
        // Connexion à MongoDB
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connecté à MongoDB\n');

        // Supprimer les menus existants (clean slate)
        const deleteResult = await NavigationMenu.deleteMany({});
        console.log(`🗑️  Supprimé ${deleteResult.deletedCount} menus existants\n`);

        // Insérer le menu principal
        console.log('📝 Insertion des menus:');

        const createdHeader = await NavigationMenu.create(mainHeaderNavigation);
        console.log(`   ✓ Menu Header créé (${createdHeader.items.length} items principaux)`);

        const createdFooterMain = await NavigationMenu.create(footerMainNavigation);
        console.log(`   ✓ Footer Quick Links créé (${createdFooterMain.items.length} items)`);

        const createdFooterCols = await NavigationMenu.create(footerColumnsNavigation);
        console.log(`   ✓ Footer Columns créé (${createdFooterCols.items.length} cols)`);

        console.log(`\n✅ Menus de navigation créés avec succès!`);

        // Afficher résumé
        const total = await NavigationMenu.countDocuments();
        const active = await NavigationMenu.countDocuments({ active: true });
        console.log(`\n📊 Résumé:`);
        console.log(`   - Total menus: ${total}`);
        console.log(`   - Menus actifs: ${active}`);

    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n👋 Déconnexion de MongoDB');
    }
}

// Exécution
seedNavigationMenu();

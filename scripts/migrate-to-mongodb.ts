import connectDB from '../src/lib/mongodb';
import User from '../src/lib/models/User';
import Page from '../src/lib/models/Page';
import Article from '../src/lib/models/Article';

/**
 * Script de migration localStorage → MongoDB
 * Copier vos données localStorage ici et exécuter avec: npm run migrate
 */

// IMPORTANT: Remplacez ces données par vos vraies données localStorage
const localStorageData = {
    users: [
        {
            name: 'Administrateur FPS',
            email: 'admin@fps.gouv.cd',
            password: 'admin123',
            isAdmin: true,
        },
    ],

    pages: [
        // Exemple - à remplacer par vos vraies pages
        {
            slug: 'a-propos',
            title: 'À propos du FPS',
            content: {
                sections: [],
            },
            published: true,
        },
    ],

    articles: [
        // Exemple - à remplacer par vos vrais articles
    ],
};

async function migrate() {
    try {
        console.log('🚀 Début de la migration vers MongoDB...\n');

        await connectDB();

        // 1. Migrer les utilisateurs
        console.log('👤 Migration des utilisateurs...');
        let userCount = 0;
        for (const userData of localStorageData.users) {
            const existing = await User.findOne({ email: userData.email });
            if (!existing) {
                await User.create(userData);
                console.log(`  ✅ Utilisateur créé: ${userData.email}`);
                userCount++;
            } else {
                console.log(`  ℹ️  Utilisateur existe déjà: ${userData.email}`);
            }
        }

        // 2. Migrer les pages
        console.log('\n📄 Migration des pages...');
        let pageCount = 0;
        for (const pageData of localStorageData.pages) {
            const existing = await Page.findOne({ slug: pageData.slug });
            if (!existing) {
                await Page.create(pageData);
                console.log(`  ✅ Page créée: ${pageData.slug}`);
                pageCount++;
            } else {
                console.log(`  ℹ️  Page existe déjà: ${pageData.slug}`);
            }
        }

        // 3. Migrer les articles
        console.log('\n📰 Migration des articles...');
        let articleCount = 0;
        for (const articleData of localStorageData.articles) {
            const existing = await Article.findOne({ slug: articleData.slug });
            if (!existing) {
                await Article.create(articleData);
                console.log(`  ✅ Article créé: ${articleData.slug}`);
                articleCount++;
            } else {
                console.log(`  ℹ️  Article existe déjà: ${articleData.slug}`);
            }
        }

        console.log('\n✅ Migration terminée avec succès!');
        console.log('\n📊 Résumé:');
        console.log(`  - Utilisateurs créés: ${userCount}`);
        console.log(`  - Pages créées: ${pageCount}`);
        console.log(`  - Articles créés: ${articleCount}`);
        console.log('\n📈 Total en base:');
        console.log(`  - Utilisateurs: ${await User.countDocuments()}`);
        console.log(`  - Pages: ${await Page.countDocuments()}`);
        console.log(`  - Articles: ${await Article.countDocuments()}`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Erreur de migration:', error);
        process.exit(1);
    }
}

// Exécuter la migration
migrate();

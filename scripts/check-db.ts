import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Page from '../src/lib/models/Page';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function check() {
    try {
        console.log('🔌 Connexion à :', MONGODB_URI); // Debug URI (masqué en partie si besoin)
        await mongoose.connect(MONGODB_URI as string);

        // Lister les collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📂 Collections présentes :', collections.map(c => c.name));

        // Compter les pages
        const count = await Page.countDocuments();
        console.log(`📄 Nombre de pages dans la collection 'pages' : ${count}`);

        if (count > 0) {
            const pages = await Page.find({}, 'title slug status');
            console.log('✅ Liste des pages trouvées :', pages);
        } else {
            console.log('❌ Aucune page trouvée via Mongoose.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

check();

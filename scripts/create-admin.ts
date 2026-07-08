// Charger les variables d'environnement depuis .env.local
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectDB from '../src/lib/mongodb.js';
import User from '../src/lib/models/User.js';

/**
 * Script pour créer l'utilisateur admin par défaut
 * À exécuter une seule fois après la configuration MongoDB
 */
async function createDefaultAdmin() {
    try {
        console.log('🔄 Connexion à MongoDB...');
        await connectDB();

        // Vérifier si l'admin existe déjà
        const existingAdmin = await User.findOne({ email: 'admin@fps.gouv.cd' });

        if (existingAdmin) {
            console.log('ℹ️  L\'utilisateur admin existe déjà');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Nom:', existingAdmin.name);
            return;
        }

        // Créer l'admin par défaut
        const admin = await User.create({
            name: 'Administrateur FPS',
            email: 'admin@fps.gouv.cd',
            password: 'admin123', // Sera hashé automatiquement par le pre-save hook
            isAdmin: true,
        });

        console.log('✅ Utilisateur admin créé avec succès!');
        console.log('📧 Email: admin@fps.gouv.cd');
        console.log('🔑 Password: admin123');
        console.log('⚠️  IMPORTANT: Changez ce mot de passe en production!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de la création de l\'admin:', error);
        process.exit(1);
    }
}

// Exécuter le script
createDefaultAdmin();

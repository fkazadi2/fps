import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global est utilisé pour maintenir la connexion MongoDB cached
 * à travers les rechargements de modules en développement Next.js.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Connexion à MongoDB avec gestion du cache
 * Réutilise la connexion existante en développement
 */
async function connectDB(): Promise<typeof mongoose> {
    if (!MONGODB_URI) {
        throw new Error(
            'Veuillez définir la variable MONGODB_URI dans les paramètres du projet (Vercel) ou dans .env.local'
        );
    }
    if (cached.conn) {
        console.log('✅ Utilisation de la connexion MongoDB existante');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        console.log('🔄 Connexion à MongoDB...');
        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
            console.log('✅ MongoDB connecté avec succès');
            if (mongoose.connection.db) {
                console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
            }
            return mongoose;
        }).catch((error) => {
            console.error('❌ Erreur de connexion MongoDB:', error);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;

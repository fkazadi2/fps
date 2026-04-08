/**
 * Script de vérification : l'utilisateur admin existe-t-il en DB ?
 */
import connectDB from '../src/lib/mongodb';
import User from '../src/lib/models/User';

async function checkAdmin() {
    try {
        await connectDB();
        const user = await User.findOne({ email: 'admin@fps.gouv.cd' }).lean() as any;

        if (!user) {
            console.log('❌ Utilisateur admin non trouvé !');
            console.log('👉 Lancez : npx dotenv-cli -e .env.local -- npx tsx scripts/create-admin.ts');
        } else {
            console.log('✅ Admin trouvé :');
            console.log(`   email   : ${user.email}`);
            console.log(`   name    : ${user.name}`);
            console.log(`   isAdmin : ${user.isAdmin}`);
            console.log(`   password: ${user.password ? '✅ hash présent' : '❌ MANQUANT'}`);
        }

        const total = await User.countDocuments();
        console.log(`\n📊 Total utilisateurs en base : ${total}`);
        process.exit(0);
    } catch (e: any) {
        console.error('❌ Erreur:', e.message);
        process.exit(1);
    }
}

checkAdmin();

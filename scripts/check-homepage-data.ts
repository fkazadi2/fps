
import connectDB from "../src/lib/mongodb";
import { getArticles } from "../src/lib/data/articles";

async function testHomepageData() {
    try {
        console.log("🚀 Connexion à MongoDB...");
        await connectDB();

        console.log("🔍 Récupération des actualités (communique)...");
        const news = await getArticles(3, 'communique');
        console.log(`✅ ${news.length} actualités trouvées:`);
        news.forEach(n => console.log(`   - ${n.title} (ID: ${n._id}, Catégorie: ${n.category})`));

        console.log("\n🔍 Récupération des événements (evenement)...");
        const events = await getArticles(3, 'evenement');
        console.log(`✅ ${events.length} événements trouvés:`);
        events.forEach(e => console.log(`   - ${e.title} (ID: ${e._id}, Catégorie: ${e.category})`));

        if (news.length === 0 || events.length === 0) {
            console.log("\n⚠️ ATTENTION: Une des catégories est vide !");
        } else {
            console.log("\n🎉 Succès: Les deux catégories contiennent des articles.");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur lors du test:", error);
        process.exit(1);
    }
}

testHomepageData();

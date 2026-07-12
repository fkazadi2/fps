const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const allArticles = [
    // --- SET 1: Articles de seed-real-articles.ts ---
    {
        slug: 'celebration-de-la-23e-journee',
        title: 'Célébration de la 23e Journée mondiale de la sécurité et de la santé au travail',
        date: '28 avril 2025',
        excerpt: 'À l\'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, les plus hautes autorités du pays se sont réunies à Kinshasa.',
        content: `<p>À l'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail...</p>`,
        category: 'communique',
        image: '/images/articles/celebration-de-la-23e-journee/1.jpg',
        published: true,
        publishedAt: new Date('2025-04-28T10:00:00Z'),
        author: 'Direction Communication FPS',
    },
    {
        slug: 'rdc-csu-mise-en-oeuvre',
        title: 'RDC-CSU : MISE EN OEUVRE DES NORMES NATIONALES SUR LA RÉFÉRENCE ET CONTRE-RÉFÉRENCE',
        date: '23 avril 2025',
        excerpt: 'Le Fonds de Promotion de la Santé organise durant 3 jours des travaux en commission.',
        content: `<p>Le Fonds de Promotion de la Santé, FPS en sigle, organise durant 3 jours des travaux...</p>`,
        category: 'communique',
        image: '/images/articles/rdc-csu-mise-en-oeuvre/1.jpg',
        published: true,
        publishedAt: new Date('2025-04-23T09:00:00Z'),
        author: 'Dircom/FPS',
    },
    {
        slug: 'celebration-3eme-anniversaire-fps',
        title: 'Célébration 3ème anniversaire du FPS',
        date: '12 avril 2025',
        excerpt: 'La Direction générale du Fonds de Promotion de la Santé ainsi que l\'ensemble de son personnel ont soufflé la 3ième bougie.',
        content: `<p>La Direction générale du Fonds de Promotion de la Santé ainsi que l'ensemble de son personnel...</p>`,
        category: 'evenement',
        image: '/images/articles/celebration/1.jpg',
        published: true,
        publishedAt: new Date('2025-04-12T10:00:00Z'),
        author: 'Direction Communication',
    },
    // --- SET 2: Articles de reseed-articles.ts ---
    {
        title: "3ᵉ anniversaire du Fonds de Promotion de la Santé (FPS)",
        slug: "celebration-23e-journee-africaine-medecine-traditionnelle",
        excerpt: "À l’occasion de la célébration de son 3ᵉ anniversaire, le Fonds de Promotion de la Santé (FPS) réaffirme son engagement en faveur de l’amélioration de la qualité de l’offre des soins et des services de santé en République démocratique du Congo. Depuis sa mise en place, le FPS s’emploie à accompagner la mise en œuvre de la Couverture Santé Universelle (CSU), à soutenir la gratuité de la maternité et à renforcer les capacités des structures de santé à travers la dotation en équipements, l’appui aux établissements de soins et la modernisation des outils de gestion, notamment par la digitalisation de certaines procédures.",
        content: "<p>À l’occasion de la célébration de son 3ᵉ anniversaire, le Fonds de Promotion de la Santé (FPS) réaffirme son engagement en faveur de l’amélioration de la qualité de l’offre des soins et des services de santé en République démocratique du Congo.</p><p>Depuis sa mise en place, le FPS s’emploie à accompagner la mise en œuvre de la Couverture Santé Universelle (CSU), à soutenir la gratuité de la maternité et à renforcer les capacités des structures de santé.</p><p>Ces actions se traduisent notamment par la dotation en équipements, l’appui aux établissements de soins et la modernisation des outils de gestion, notamment par la digitalisation de certaines procédures.</p><p>Cette célébration marque une étape importante dans la consolidation des actions menées par l’établissement public pour accompagner les priorités nationales de santé et améliorer l’accès aux soins pour les populations.</p>",
        category: "communique",
        image: "/images/articles/celebration/1.jpg",
        images: [
            { src: "/images/articles/celebration/1.jpg", alt: "Célébration du 3ᵉ anniversaire du FPS" },
            { src: "/images/articles/celebration/2.jpg", alt: "Activités de célébration du Fonds de Promotion de la Santé" },
            { src: "/images/articles/celebration/3.jpg", alt: "Participants à la célébration du 3ᵉ anniversaire du FPS" }
        ],
        published: true,
        publishedAt: new Date("2025-08-31T10:00:00Z"),
        author: "Comms FPS"
    },
    {
        title: "Lancement de la campagne de sensibilisation sur la Couverture Santé Universelle",
        slug: "lancement-campagne-csu-2025",
        excerpt: "Une nouvelle étape franchie vers l'accès aux soins pour tous avec le lancement officiel de la campagne nationale.",
        content: "<p>Le Ministre de la Santé Publique, Hygiène et Prévention a procédé ce jour au lancement officiel...</p>",
        category: "communique",
        image: "/images/articles/rdc-csu-mise-en-oeuvre/3.jpg",
        published: true,
        publishedAt: new Date("2025-09-15T09:30:00Z"),
        author: "Comms FPS"
    },
    {
        title: "Le FPS renforce ses partenariats internationaux",
        slug: "partenariats-internationaux-fps-2025",
        excerpt: "Signature d'un protocole d'accord stratégique avec plusieurs bailleurs de fonds.",
        content: "<p>Dans le cadre de sa mission de mobilisation des ressources, le FPS a signé ce matin un protocole d'accord...</p>",
        category: "communique",
        image: "/images/articles/celebration-de-la-23e-journee/3.jpg",
        published: true,
        publishedAt: new Date("2025-10-01T14:00:00Z"),
        author: "Direction Générale"
    },
    {
        title: "Conférence annuelle sur le Financement de la Santé",
        slug: "conference-financement-sante-2025",
        excerpt: "Rejoignez-nous pour débattre des nouveaux mécanismes de financement innovants pour le secteur de la santé.",
        content: "<p>La conférence annuelle sur le financement de la santé réunira experts, décideurs politiques...</p>",
        category: "evenement",
        image: "/images/events/event-bg-01.jpg",
        published: true,
        publishedAt: new Date("2025-11-01T08:00:00Z"),
        eventStartDate: new Date("2025-12-10T09:00:00Z"),
        eventEndDate: new Date("2025-12-12T17:00:00Z"),
        eventLocation: "Pullman Hôtel, Kinshasa"
    },
    {
        title: "Formation des prestataires de santé sur la digitalisation",
        slug: "formation-digitalisation-sante-2025",
        excerpt: "Série de formations visant à améliorer la collecte et la gestion des données sanitaires via les outils numériques.",
        content: "<p>Le FPS finance une série de formations destinées aux gestionnaires des zones de santé...</p>",
        category: "evenement",
        image: "/images/events/event-bg-02.jpg",
        published: true,
        publishedAt: new Date("2025-10-15T10:00:00Z"),
        eventStartDate: new Date("2025-11-20T08:30:00Z"),
        eventLocation: "INRB, Kinshasa"
    },
    {
        title: "Remise officielle des équipements médicaux au Nord-Kivu",
        slug: "remise-equipements-nord-kivu-2025",
        excerpt: "Cérémonie officielle de dotation en matériels médicaux modernes pour les hôpitaux de référence.",
        content: "<p>Une délégation du FPS se rendra à Goma pour procéder à la remise officielle d'un lot important d'équipements...</p>",
        category: "evenement",
        image: "/images/events/event-bg-03.jpg",
        published: true,
        publishedAt: new Date("2025-10-20T11:00:00Z"),
        eventStartDate: new Date("2025-12-05T10:00:00Z"),
        eventLocation: "Hôpital Général de Goma"
    }
];

async function run() {
    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI non définie");
        process.exit(1);
    }

    try {
        console.log("🚀 Connexion à MongoDB Atlas...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Connecté.");

        const Article = mongoose.models.Article || mongoose.model('Article', new mongoose.Schema({}, { strict: false, timestamps: true })); 
        
        console.log(`📝 Insertion de ${allArticles.length} articles...`);
        for (const art of allArticles) {
            await Article.findOneAndUpdate(
                { slug: art.slug },
                { $set: art },
                { upsert: true, new: true }
            );
            console.log(`  ✓ Restauration de : ${art.title.substring(0, 50)}...`);
        }

        const total = await Article.countDocuments();
        console.log(`\n🎉 Restauration complète terminée !`);
        console.log(`📦 Nombre total d'articles en base : ${total}`);

    } catch (err) {
        console.error("❌ Erreur pendant la restauration :", err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

run();

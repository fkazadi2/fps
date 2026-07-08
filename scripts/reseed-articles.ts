
import connectDB from "../src/lib/mongodb";
import Article from "../src/lib/models/Article";

async function seedArticles() {
    try {
        console.log("🚀 Connexion à MongoDB...");
        await connectDB();
        console.log("✅ Connecté.");

        // Nettoyer les articles existants pour éviter les doublons
        console.log("🧹 Nettoyage de la collection Article...");
        await Article.deleteMany({});
        console.log("✨ Collection nettoyée.");

        const articles = [
            // ACTUALITÉS (category: 'communique')
            {
                title: "Célébration de la 23ème Journée Africaine de la Médecine Traditionnelle",
                slug: "celebration-23e-journee-africaine-medecine-traditionnelle",
                excerpt: "Le FPS a pris part activement aux festivités marquant la journée dédiée à la valorisation de la médecine traditionnelle en Afrique.",
                content: "<p>Le Fonds de Promotion de la Santé (FPS) a participé avec enthousiasme à la 23ème Journée Africaine de la Médecine Traditionnelle. Cet événement a été l'occasion de réaffirmer l'importance de l'intégration de la médecine traditionnelle dans le système de santé national.</p><p>Lors de cette journée, plusieurs ateliers et conférences ont mis en lumière les avancées réalisées dans la recherche et la standardisation des produits issus de la pharmacopée traditionnelle. Le FPS s'engage à soutenir les initiatives visant à promouvoir une médecine traditionnelle sûre, efficace et accessible à tous.</p>",
                category: "communique",
                image: "/images/articles/celebration/1.jpg",
                published: true,
                publishedAt: new Date("2025-08-31T10:00:00Z"),
                author: "Comms FPS",
                tags: ["santé", "médecine traditionnelle", "célébration"]
            },
            {
                title: "Lancement de la campagne de sensibilisation sur la Couverture Santé Universelle",
                slug: "lancement-campagne-csu-2025",
                excerpt: "Une nouvelle étape franchie vers l'accès aux soins pour tous avec le lancement officiel de la campagne nationale.",
                content: "<p>Le Ministre de la Santé Publique, Hygiène et Prévention a procédé ce jour au lancement officiel de la grande campagne de sensibilisation sur la Couverture Santé Universelle (CSU). Le FPS, en tant qu'acteur clé du financement de la santé, soutient pleinement cette initiative.</p><p>L'objectif est d'informer la population sur les mécanismes de prise en charge, notamment la gratuité de la maternité et des soins néonatals. Des agents de santé communautaires seront déployés dans toutes les provinces pour relayer le message.</p>",
                category: "communique",
                image: "/images/articles/celebration/2.jpg",
                published: true,
                publishedAt: new Date("2025-09-15T09:30:00Z"),
                author: "Comms FPS",
                tags: ["CSU", "santé publique", "campagne"]
            },
            {
                title: "Le FPS renforce ses partenariats internationaux",
                slug: "partenariats-internationaux-fps-2025",
                excerpt: "Signature d'un protocole d'accord stratégique avec plusieurs bailleurs de fonds pour le renforcement du système de santé.",
                content: "<p>Dans le cadre de sa mission de mobilisation des ressources, le FPS a signé ce matin un protocole d'accord avec un consortium de partenaires internationaux. Ce financement additionnel permettra d'accélérer la réhabilitation des infrastructures sanitaires dans les zones reculées.</p><p>La Directrice Générale du FPS a salué cet engagement qui témoigne de la confiance des partenaires envers les réformes engagées par le gouvernement congolais dans le secteur de la santé.</p>",
                category: "communique",
                image: "/images/articles/celebration/3.jpg",
                published: true,
                publishedAt: new Date("2025-10-01T14:00:00Z"),
                author: "Direction Générale",
                tags: ["partenariat", "financement", "infrastructures"]
            },

            // ÉVÉNEMENTS (category: 'evenement')
            {
                title: "Conférence annuelle sur le Financement de la Santé",
                slug: "conference-financement-sante-2025",
                excerpt: "Rejoignez-nous pour débattre des nouveaux mécanismes de financement innovants pour le secteur de la santé en RDC.",
                content: "<p>La conférence annuelle sur le financement de la santé réunira experts, décideurs politiques et partenaires techniques et financiers. Les discussions porteront sur l'optimisation des recettes fiscales affectées à la santé et l'efficacité de la dépense publique.</p><p>Un accent particulier sera mis sur le rôle du secteur privé et les partenariats public-privé dans le renforcement du système de santé.</p>",
                category: "evenement",
                image: "/images/events/event-bg-01.jpg",
                published: true,
                publishedAt: new Date("2025-11-01T08:00:00Z"),
                eventStartDate: new Date("2025-12-10T09:00:00Z"),
                eventEndDate: new Date("2025-12-12T17:00:00Z"),
                eventTime: "09:00 - 17:00",
                eventLocation: "Pullman Hôtel, Kinshasa",
                author: "Comité Organisateur",
                tags: ["conférence", "financement", "kinshasa"]
            },
            {
                title: "Formation des prestataires de santé sur la digitalisation",
                slug: "formation-digitalisation-sante-2025",
                excerpt: "Série de formations visant à améliorer la collecte et la gestion des données sanitaires via les nouveaux outils numériques.",
                content: "<p>Le FPS finance une série de formations destinées aux gestionnaires des zones de santé. L'objectif est de maîtriser les nouveaux logiciels de gestion hospitalière et de reporting épidémiologique.</p><p>Cette digitalisation est essentielle pour assurer un suivi en temps réel des indicateurs de santé et une meilleure allocation des ressources.</p>",
                category: "evenement",
                image: "/images/events/event-bg-02.jpg",
                published: true,
                publishedAt: new Date("2025-10-15T10:00:00Z"),
                eventStartDate: new Date("2025-11-20T08:30:00Z"),
                eventEndDate: new Date("2025-11-20T16:30:00Z"),
                eventTime: "08:30",
                eventLocation: "INRB, Kinshasa",
                author: "Direction Technique",
                tags: ["formation", "digital", "santé"]
            },
            {
                title: "Remise officielle des équipements médicaux au Nord-Kivu",
                slug: "remise-equipements-nord-kivu-2025",
                excerpt: "Cérémonie officielle de dotation en matériels médicaux modernes pour les hôpitaux de référence de la province.",
                content: "<p>Une délégation du FPS se rendra à Goma pour procéder à la remise officielle d'un lot important d'équipements médicaux (imagerie, chirurgie, laboratoire) destinés aux structures sanitaires de la province.</p><p>Cette initiative s'inscrit dans le cadre du programme d'urgence pour le renforcement du système de santé dans les zones affectées par les conflits.</p>",
                category: "evenement",
                image: "/images/events/event-bg-03.jpg",
                published: true,
                publishedAt: new Date("2025-10-20T11:00:00Z"),
                eventStartDate: new Date("2025-12-05T10:00:00Z"),
                eventEndDate: new Date("2025-12-05T13:00:00Z"),
                eventTime: "10:00",
                eventLocation: "Hôpital Général de Goma",
                author: "Direction Logistique",
                tags: ["équipement", "nord-kivu", "cérémonie"]
            }
        ];

        console.log(`📝 Insertion de ${articles.length} articles...`);
        await Article.insertMany(articles);
        console.log("✅ Articles insérés avec succès !");

        const count = await Article.countDocuments();
        console.log(`📊 Total articles en base : ${count}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur lors du seeding:", error);
        process.exit(1);
    }
}

seedArticles();

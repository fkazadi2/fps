/**
 * Script de migration : 3 vrais articles FPS → MongoDB
 * 
 * Usage:
 *   MONGODB_URI=mongodb://localhost:27017/fps_website npx ts-node --skip-project scripts/seed-real-articles.ts
 * 
 * Utilise upsert par slug → safe à relancer sans créer de doublons.
 */

import connectDB from '../src/lib/mongodb';
import Article from '../src/lib/models/Article';

const realArticles = [
    {
        slug: 'celebration-de-la-23e-journee',
        title: 'Célébration de la 23e Journée mondiale de la sécurité et de la santé au travail',
        date: '28 avril 2025',
        excerpt: 'À l\'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, les plus hautes autorités du pays se sont réunies à Kinshasa pour réfléchir aux enjeux de la sécurité au travail dans un contexte de mutation technologique.',
        content: `
      <p>À l'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, placée sous le thème national : « Prévention des risques professionnels face aux défis de la transformation numérique et à la mise en œuvre effective de la couverture santé universelle en RDC », les plus hautes autorités du pays se sont réunies ce jour à Kinshasa pour réfléchir aux enjeux cruciaux de la sécurité au travail dans un contexte de mutation technologique.</p>

      <p>Dans son intervention, Son Excellence Monsieur le Ministre de la Santé Publique, Hygiène et Prévoyance Sociale, le dr Samuel Roger Kamba, a rappelé que toutes les catastrophes du monde du travail finissent par devenir des questions de santé publique. En ce sens, il a insisté sur le rôle essentiel que joue le système de santé dans la prise en charge des conséquences de l'insécurité au travail, tout en appelant à une mobilisation collective de l'ensemble de la société : institutions, employeurs, syndicats et travailleurs.</p>

      <p>Il a salué l'engagement du Chef de l'État, Son Excellence Félix-Antoine Tshisekedi, qui a fait de la santé une priorité nationale, notamment à travers la Couverture Santé Universelle (CSU). Dans ce cadre, le ministère de la Santé s'engage à améliorer continuellement sa capacité de résilience et à répondre de manière holistique aux enjeux de santé liés au travail, tout en plaçant l'humain au centre de toutes les préoccupations. Le Ministre a également évoqué la nécessité d'une évolution du cadre législatif pour garantir une réponse juridique appropriée aux nouveaux risques professionnels engendrés par les technologies émergentes, telles que l'intelligence artificielle.</p>

      <p>Le Ministre de l'Emploi et du Travail, pour sa part, a dénoncé les conséquences de la guerre sur la santé des travailleurs, tout en soulignant l'urgence de faire de la prévention une priorité nationale. Il a alerté sur le fait que les risques professionnels, souvent exclus du panier de soins de base, méritent une prise en charge spécifique, notamment pour les cas les plus graves. Il a également annoncé un atelier conjoint avec des partenaires internationaux comme Ajibadeen Health Group, en vue de proposer des solutions concrètes.</p>

      <p>Le représentant de la CNSS a quant à lui détaillé les actions de la Caisse en matière de prévention des risques professionnels, notamment à travers la collecte de données statistiques, les campagnes de sensibilisation, la construction d'infrastructures sanitaires modernes intégrant des technologies de pointe et l'organisation d'événements scientifiques comme les Rencontres africaines de la prévention des risques professionnels dans l'industrie chimique (RAPIKIN).</p>

      <p>Tous les intervenants ont reconnu les opportunités qu'apporte la numérisation du monde du travail, mais aussi ses risques accrus pour la santé et la sécurité. Ils ont unanimement souligné que l'intelligence artificielle ne doit pas devenir un danger supplémentaire, mais bien un outil au service du travailleur, dans le strict respect des principes éthiques et bioéthiques.</p>
    `,
        category: 'communique',
        image: '/images/articles/celebration-de-la-23e-journee/1.jpg',
        images: [
            { src: '/images/articles/celebration-de-la-23e-journee/1.jpg', alt: 'Cérémonie de célébration de la Journée mondiale de la sécurité et de la santé au travail' },
            { src: '/images/articles/celebration-de-la-23e-journee/2.jpg', alt: 'Interventions des autorités lors de la Journée mondiale de la sécurité et de la santé au travail' },
            { src: '/images/articles/celebration-de-la-23e-journee/3.jpg', alt: 'Participation des partenaires à l\'événement' },
        ],
        published: true,
        publishedAt: new Date('2025-04-28T10:00:00Z'),
        author: 'Direction Communication FPS',
        tags: ['sécurité au travail', 'santé', 'journée mondiale'],
    },
    {
        slug: 'rdc-csu-mise-en-oeuvre',
        title: 'RDC-CSU : MISE EN OEUVRE DES NORMES NATIONALES SUR LA RÉFÉRENCE ET CONTRE-RÉFÉRENCE DES CAS DES FEMMES ENCEINTES ET NOUVEAU-NÉS',
        date: '23 avril 2025',
        excerpt: 'Le Fonds de Promotion de la Santé organise durant 3 jours des travaux en commission sur la mise en œuvre des normes nationales relatives à la référence et contre-référence des cas de prise en charge des femmes enceintes.',
        content: `
      <p>Le Fonds de Promotion de la Santé, FPS en sigle, organise durant 3 jours des travaux en commission sur la mise en œuvre des normes nationales relatives à la référence et contre-référence des cas de prise en charge des femmes enceintes, des accouchées et des nouveau-nés dans la ville de Kinshasa.</p>

      <p>En effet, après près de 2 ans de sous-traitance avec la Croix-rouge, gestionnaire des références et contre-références au moyen de 16 ambulances mises à sa disposition, une commission mixte d'experts issus des différents établissements a vu le jour ce 23 avril 2025 au village Silikin à la Gombe.</p>

      <p>Celle-ci a pour objectifs :</p>
      <ul>
        <li>Améliorer la prise en charge des parturientes, des accouchées et des nouveau-nés ;</li>
        <li>Répertorier les normes nationales sur les références et contre-références des femmes enceintes, des accouchées, et nouveau-nés pour une mise en place et application au niveau national.</li>
      </ul>

      <p>Il est important de souligner que cette prise en charge de la femme enceinte, de l'accouchement et du nouveau-né est un projet phare qui marque ainsi, le premier pas vers une implémentation effective de la Couverture Santé Universelle, de manière à répondre aux différentes préoccupations exprimées face à la croissance exponentielle du taux de mortalité maternelle et infantile dans notre pays.</p>

      <p><strong>Dircom/FPS</strong></p>

      <p><em>Crédits Photos :</em></p>
      <p>Creusene Maximus Tamufu<br>
      Conseil National de la Couverture Santé Universelle<br>
      Ministère de la Santé/RDC<br>
      ANICNS-RDC<br>
      ARC-CSU<br>
      Institut National de Santé Publique RDC</p>
    `,
        category: 'communique',
        image: '/images/articles/rdc-csu-mise-en-oeuvre/1.jpg',
        images: [
            { src: '/images/articles/rdc-csu-mise-en-oeuvre/1.jpg', alt: 'Commission d\'experts sur les normes nationales de référence et contre-référence' },
            { src: '/images/articles/rdc-csu-mise-en-oeuvre/2.jpg', alt: 'Travaux en commission sur la mise en œuvre des normes nationales' },
            { src: '/images/articles/rdc-csu-mise-en-oeuvre/3.jpg', alt: 'Experts lors de la session de travail au village Silikin' },
        ],
        published: true,
        publishedAt: new Date('2025-04-23T09:00:00Z'),
        author: 'Dircom/FPS',
        tags: ['CSU', 'santé maternelle', 'normes nationales'],
    },
    {
        slug: 'celebration-3eme-anniversaire-fps',
        title: 'Célébration 3ème anniversaire du FPS',
        date: '12 avril 2025',
        excerpt: 'La Direction générale du Fonds de Promotion de la Santé ainsi que l\'ensemble de son personnel ont soufflé la 3ième bougie d\'anniversaire depuis la création de cet établissement public.',
        content: `
      <p>La Direction générale du Fonds de Promotion de la Santé ainsi que l'ensemble de son personnel ont soufflé la 3ième bougie d'anniversaire depuis la création de cet établissement public impliqué dans la facilitation de la mise en œuvre de la Couverture Santé Universelle en RDC.</p>

      <p>Occasion pour le DGE du FPS, Monsieur Marius MIKA, de rappeler aux cadres, collaborateurs et experts réunis en l'espace « La Sablière » ce samedi 12 avril 2025, de la responsabilité de rester dans la droite ligne de la mission assignée au FPS, à savoir veiller à l'amélioration de la qualité de l'offre des soins et services de santé en RDC.</p>

      <p>Une approche de travail orientée vers la performance qui a permis au FPS, de présenter à ce jour depuis sa création, des résultats concrets sur le terrain.</p>

      <p>Souhaitons tous bon anniversaire au FPS et bon vent !</p>

      <p><strong>Direction Communication.</strong></p>
    `,
        category: 'evenement',
        image: '/images/articles/celebration/1.jpg',
        images: [
            { src: '/images/articles/celebration/1.jpg', alt: 'Célébration du 3ème anniversaire du FPS à l\'espace La Sablière' },
            { src: '/images/articles/celebration/2.jpg', alt: 'Discours du DGE du FPS, Monsieur Marius MIKA' },
            { src: '/images/articles/celebration/3.jpg', alt: 'Réunion des cadres, collaborateurs et experts lors de l\'anniversaire' },
        ],
        published: true,
        publishedAt: new Date('2025-04-12T10:00:00Z'),
        author: 'Direction Communication',
        tags: ['anniversaire', 'FPS', 'institution'],
    },
];

async function seedRealArticles() {
    try {
        console.log('🚀 Connexion à MongoDB...');
        await connectDB();
        console.log('✅ Connecté.');

        let inserted = 0;
        let updated = 0;

        for (const article of realArticles) {
            const result = await Article.findOneAndUpdate(
                { slug: article.slug },
                { $set: article },
                { upsert: true, new: true, runValidators: true }
            );
            if (result?.createdAt?.getTime() === result?.updatedAt?.getTime()) {
                inserted++;
            } else {
                updated++;
            }
            console.log(`  ✓ "${article.title.substring(0, 60)}..." → slug: ${article.slug}`);
        }

        const total = await Article.countDocuments();
        console.log(`\n📊 Résultat : ${inserted} insérés, ${updated} mis à jour`);
        console.log(`📦 Total articles en base : ${total}`);
        console.log('\n🎉 Seed des articles réels FPS terminé !');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seeding:', error);
        process.exit(1);
    }
}

seedRealArticles();

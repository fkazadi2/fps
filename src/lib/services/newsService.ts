// Service pour gérer les actualités dans le localStorage
import { useState, useEffect } from 'react';

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  link: string;
};

// Clé pour le stockage dans localStorage
const STORAGE_KEY = 'fps_news_articles';

// Données par défaut pour les actualités
const defaultArticles: NewsArticle[] = [
  {
    id: 'celebration-de-la-23e-journee',
    title: "Célébration de la 23e Journée mondiale de la sécurité et de la santé au travail",
    date: "28 avril 2025",
    excerpt: "À l'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, les plus hautes autorités du pays se sont réunies à Kinshasa pour réfléchir aux enjeux cruciaux de la sécurité au travail dans un contexte de mutation technologique.",
    content: `
      <p>À l'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, placée sous le thème national : « Prévention des risques professionnels face aux défis de la transformation numérique et à la mise en œuvre effective de la couverture santé universelle en RDC », les plus hautes autorités du pays se sont réunies ce jour à Kinshasa pour réfléchir aux enjeux cruciaux de la sécurité au travail dans un contexte de mutation technologique.</p>

      <p>Dans son intervention, Son Excellence Monsieur le Ministre de la Santé Publique, Hygiène et Prévoyance Sociale, le dr Samuel Roger Kamba, a rappelé que toutes les catastrophes du monde du travail finissent par devenir des questions de santé publique. En ce sens, il a insisté sur le rôle essentiel que joue le système de santé dans la prise en charge des conséquences de l'insécurité au travail, tout en appelant à une mobilisation collective de l'ensemble de la société : institutions, employeurs, syndicats et travailleurs.</p>

      <p>Il a salué l'engagement du Chef de l'État, Son Excellence Félix-Antoine Tshisekedi, qui a fait de la santé une priorité nationale, notamment à travers la Couverture Santé Universelle (CSU). Dans ce cadre, le ministère de la Santé s'engage à améliorer continuellement sa capacité de résilience et à répondre de manière holistique aux enjeux de santé liés au travail, tout en plaçant l'humain au centre de toutes les préoccupations. Le Ministre a également évoqué la nécessité d'une évolution du cadre législatif pour garantir une réponse juridique appropriée aux nouveaux risques professionnels engendrés par les technologies émergentes, telles que l'intelligence artificielle.</p>

      <p>Le Ministre de l'Emploi et du Travail, pour sa part, a dénoncé les conséquences de la guerre sur la santé des travailleurs, tout en soulignant l'urgence de faire de la prévention une priorité nationale. Il a alerté sur le fait que les risques professionnels, souvent exclus du panier de soins de base, méritent une prise en charge spécifique, notamment pour les cas les plus graves. Il a également annoncé un atelier conjoint avec des partenaires internationaux comme Ajibadeen Health Group, en vue de proposer des solutions concrètes.</p>

      <p>Le représentant de la CNSS a quant à lui détaillé les actions de la Caisse en matière de prévention des risques professionnels, notamment à travers la collecte de données statistiques, les campagnes de sensibilisation, la construction d'infrastructures sanitaires modernes intégrant des technologies de pointe et l'organisation d'événements scientifiques comme les Rencontres africaines de la prévention des risques professionnels dans l'industrie chimique (RAPIKIN). Il a souligné que la CNSS, fidèle à sa mission, mettra tout en œuvre pour harmoniser la transformation numérique avec la protection des travailleurs.</p>

      <p>Tous les intervenants ont reconnu les opportunités qu'apporte la numérisation du monde du travail, mais aussi ses risques accrus pour la santé et la sécurité. Ils ont unanimement souligné que l'intelligence artificielle ne doit pas devenir un danger supplémentaire, mais bien un outil au service du travailleur, dans le strict respect des principes éthiques et bioéthiques.</p>
    `,
    image: "/images/articles/celebration-de-la-23e-journee/1.jpg",
    category: "Événement",
    link: "/actualites/presse/celebration-de-la-23e-journee"
  },
  {
    id: 'rdc-csu-mise-en-oeuvre',
    title: "RDC-CSU : MISE EN OEUVRE DES NORMES NATIONALES SUR LA RÉFÉRENCE ET CONTRE-RÉFÉRENCE DES CAS DES FEMMES ENCEINTES ET NOUVEAU-NÉS",
    date: "23 avril 2025",
    excerpt: "Le Fonds de Promotion de la Santé organise durant 3 jours des travaux en commission sur la mise en oeuvre des normes nationales relatives à la référence et contre-référence des cas de prise en charge des femmes enceintes, des accouchées et des nouveau-nés dans la ville de Kinshasa.",
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
    image: "/images/articles/rdc-csu-mise-en-oeuvre/1.jpg",
    category: "Santé maternelle",
    link: "/actualites/presse/rdc-csu-mise-en-oeuvre"
  },
  {
    id: 'celebration-3eme-anniversaire-fps',
    title: "Célébration 3ème anniversaire du FPS",
    date: "12 avril 2025",
    excerpt: "La Direction générale du Fonds de Promotion de la Santé ainsi que l'ensemble de son personnel ont soufflé la 3ème bougie d'anniversaire depuis la création de cet établissement public impliqué dans la facilitation de la mise en œuvre de la Couverture Santé Universelle en RDC.",
    content: `
      <p>La Direction générale du Fonds de Promotion de la Santé ainsi que l'ensemble de son personnel ont soufflé la 3ième bougie d'anniversaire depuis la création de cet établissement public impliqué dans la facilitation de la mise en œuvre de la Couverture Santé Universelle en RDC.</p>

      <p>Occasion pour le Directeur général du FPS, Monsieur Marius MIKA NYEMBO, de rappeler aux cadres, collaborateurs et experts réunis en l'espace « La Sablière » ce samedi 12 avril 2025, de la responsabilité de rester dans la droite ligne de la mission assignée au FPS, à savoir veiller à l'amélioration de la qualité de l'offre des soins et services de santé en RDC.</p>

      <p>Une approche de travail orientée vers la performance qui a permis au FPS, de présenter à ce jour depuis sa création, des résultats concrets sur le terrain.</p>

      <p>Souhaitons tous bon anniversaire au FPS et bon vent !</p>

      <p><strong>Direction Communication.</strong></p>
    `,
    image: "/images/articles/celebration/1.jpg",
    category: "Événement",
    link: "/actualites/presse/celebration-3eme-anniversaire-fps"
  },
  {
    id: 'lancement-programme-structures-rurales',
    title: "Lancement du programme de soutien aux structures sanitaires rurales",
    date: "15 février 2025",
    excerpt: "Le Fonds de Promotion de la Santé a officiellement lancé ce mercredi un nouveau programme visant à renforcer les capacités des structures sanitaires rurales dans toute la RDC.",
    content: `
      <p>Le Fonds de Promotion de la Santé (FPS) a officiellement lancé ce mercredi un nouveau programme visant à renforcer les capacités des structures sanitaires en zones rurales.</p>
      <p>Ce programme ambitieux, qui s'étendra sur une période de trois ans, cible particulièrement les centres de santé dans les régions les plus reculées de la République Démocratique du Congo, où l'accès aux soins de qualité demeure un défi majeur.</p>
      <p>Lors de la cérémonie de lancement, le Directeur général du FPS a souligné l'importance de cette initiative pour l'avancement de la Couverture Santé Universelle (CSU) : "Nous ne pouvons pas parler de couverture santé universelle si les centres de santé de base ne disposent pas des infrastructures et des équipements nécessaires pour offrir des soins de qualité à tous les citoyens, peu importe où ils vivent."</p>
      <p>Le programme comprend plusieurs volets, notamment la réhabilitation des infrastructures existantes, la formation du personnel médical, la fourniture d'équipements médicaux essentiels et la mise en place de systèmes de référence efficaces vers les hôpitaux de district.</p>
      <p>Les premiers bénéficiaires seront 150 centres de santé répartis dans cinq provinces : le Nord-Kivu, le Sud-Kivu, le Kasaï, le Kasaï Central et la Lomami. Le programme s'étendra progressivement à d'autres provinces dans les phases ultérieures.</p>
      <p>Cette initiative, d'un coût total estimé à 15 millions de dollars, est financée par le gouvernement congolais avec l'appui de partenaires internationaux.</p>
    `,
    image: "/placeholder.jpg",
    category: "Programme",
    link: "/actualites/presse/programme-structures-rurales"
  },
  {
    id: 'bilan-campagne-csu',
    title: "Bilan de la Campagne Nationale de Sensibilisation sur la CSU",
    date: "20 janvier 2025",
    excerpt: "Après trois mois d'activités intensives à travers tout le territoire national, le FPS a présenté aujourd'hui le bilan de sa campagne de sensibilisation sur la Couverture Santé Universelle.",
    content: `
      <p>Après trois mois d'activités intensives à travers tout le territoire national, le Fonds de Promotion de la Santé (FPS) a présenté aujourd'hui le bilan de sa campagne de sensibilisation sur la Couverture Santé Universelle (CSU).</p>
      <p>Cette campagne, lancée en octobre 2024, avait pour objectif principal d'informer la population congolaise sur les principes fondamentaux de la CSU et les modalités de sa mise en œuvre dans le pays.</p>
      <p>Selon le rapport présenté par le Coordinateur National de la campagne, plus de 15 millions de personnes ont été directement touchées par les messages de sensibilisation à travers différents canaux : ateliers communautaires, spots radio et télévision, affiches, réseaux sociaux et caravanes motorisées.</p>
      <p>"Nous sommes satisfaits des résultats obtenus", a déclaré le Ministre de la Santé lors de la présentation du rapport. "La population comprend maintenant mieux ce qu'est la Couverture Santé Universelle, ses avantages et comment elle sera mise en œuvre progressivement."</p>
      <p>Le rapport souligne également que la campagne a permis d'identifier certaines préoccupations récurrentes de la population, notamment concernant le coût des cotisations, la qualité des soins et l'accessibilité géographique des services de santé.</p>
      <p>Le FPS s'engage à prendre en compte ces préoccupations dans la phase de mise en œuvre de la CSU et annonce déjà une nouvelle série d'actions de communication ciblées pour les prochains mois.</p>
    `,
    image: "/placeholder.jpg",
    category: "Campagne",
    link: "/actualites/presse/bilan-campagne-csu"
  },
  {
    id: 'partenariat-fps-unicef',
    title: "Signature d'un accord de partenariat entre le FPS et l'UNICEF",
    date: "10 décembre 2024",
    excerpt: "Le Fonds de Promotion de la Santé et l'UNICEF ont signé ce mardi un accord de partenariat pour renforcer la prise en charge des soins maternels et infantiles en RDC.",
    content: `
      <p>Le Fonds de Promotion de la Santé (FPS) et l'UNICEF ont signé ce mardi un accord de partenariat stratégique pour renforcer la prise en charge des soins maternels et infantiles en République Démocratique du Congo.</p>
      <p>Cet accord, d'une durée de cinq ans, vise à réduire la mortalité maternelle et infantile dans le pays, particulièrement dans les zones les plus vulnérables.</p>
      <p>La cérémonie de signature s'est déroulée en présence du Ministre de la Santé Publique, Hygiène et Prévoyance Sociale, et du Représentant de l'UNICEF en RDC.</p>
      <p>"Ce partenariat marque une étape importante dans notre engagement commun pour la santé des femmes et des enfants congolais", a déclaré le Directeur général du FPS. "Il permettra de renforcer nos capacités d'intervention et d'améliorer significativement l'accès aux soins de qualité pour les populations les plus vulnérables."</p>
      <p>Le partenariat se concentrera sur plusieurs axes prioritaires : le renforcement des services de santé maternelle et néonatale, l'amélioration de la couverture vaccinale, la promotion de pratiques nutritionnelles saines, et le développement de mécanismes de financement innovants pour garantir la pérennité des interventions.</p>
      <p>Ce nouveau partenariat s'inscrit dans le cadre plus large de la mise en œuvre de la Couverture Santé Universelle en RDC et témoigne de l'engagement du gouvernement congolais à faire de la santé maternelle et infantile une priorité nationale.</p>
    `,
    image: "/placeholder.jpg",
    category: "Partenariat",
    link: "/actualites/presse/partenariat-fps-unicef"
  }
];

// Fonction pour initialiser les actualités dans le localStorage
export const initNewsArticles = () => {
  if (typeof window === 'undefined') return;

  // Vérifie si les actualités sont déjà dans le localStorage
  const existingArticles = localStorage.getItem(STORAGE_KEY);
  if (!existingArticles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultArticles));
  }
};

// Hook pour obtenir toutes les actualités
export const useNewsArticles = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialiser les actualités si nécessaire
    initNewsArticles();

    // Récupérer les actualités depuis le localStorage
    const articlesData = localStorage.getItem(STORAGE_KEY);
    if (articlesData) {
      // Trier les articles par date du plus récent au plus ancien
      const parsedArticles = JSON.parse(articlesData) as NewsArticle[];
      const sortedArticles = [...parsedArticles].sort((a, b) => {
        // Convertir les dates en objets Date pour comparaison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      setArticles(sortedArticles);
    }
    setLoading(false);
  }, []);

  return { articles, loading };
};

// Hook pour obtenir un article spécifique par son ID
export const useNewsArticle = (articleId: string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !articleId) return;

    // Initialiser les actualités si nécessaire
    initNewsArticles();

    // Récupérer les actualités depuis le localStorage
    const articlesData = localStorage.getItem(STORAGE_KEY);
    if (articlesData) {
      const allArticles: NewsArticle[] = JSON.parse(articlesData);
      const foundArticle = allArticles.find(a => a.id === articleId);

      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        setError('Article non trouvé');
      }
    } else {
      setError('Aucun article disponible');
    }
    setLoading(false);
  }, [articleId]);

  return { article, loading, error };
};

// Fonction pour ajouter un nouvel article
export const addNewsArticle = (newArticle: NewsArticle) => {
  if (typeof window === 'undefined') return false;

  // Récupérer les actualités existantes
  const articlesData = localStorage.getItem(STORAGE_KEY);
  if (articlesData) {
    const articles: NewsArticle[] = JSON.parse(articlesData);

    // Vérifier si un article avec le même ID existe déjà
    if (articles.some(a => a.id === newArticle.id)) {
      return false;
    }

    // Ajouter le nouvel article
    articles.push(newArticle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return true;
  }
  return false;
};

// Fonction pour mettre à jour un article existant
export const updateNewsArticle = (updatedArticle: NewsArticle) => {
  if (typeof window === 'undefined') return false;

  // Récupérer les actualités existantes
  const articlesData = localStorage.getItem(STORAGE_KEY);
  if (articlesData) {
    const articles: NewsArticle[] = JSON.parse(articlesData);

    // Trouver l'index de l'article à mettre à jour
    const articleIndex = articles.findIndex(a => a.id === updatedArticle.id);
    if (articleIndex === -1) {
      return false;
    }

    // Mettre à jour l'article
    articles[articleIndex] = updatedArticle;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return true;
  }
  return false;
};

// Fonction pour supprimer un article
export const deleteNewsArticle = (articleId: string) => {
  if (typeof window === 'undefined') return false;

  // Récupérer les actualités existantes
  const articlesData = localStorage.getItem(STORAGE_KEY);
  if (articlesData) {
    const articles: NewsArticle[] = JSON.parse(articlesData);

    // Filtrer pour retirer l'article avec l'ID spécifié
    const updatedArticles = articles.filter(a => a.id !== articleId);

    // Si la taille est différente, l'article a été trouvé et supprimé
    if (updatedArticles.length !== articles.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
      return true;
    }
  }
  return false;
};

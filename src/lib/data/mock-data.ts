/**
 * DONNÉES DE SECOURS (MOCKS)
 * Ce fichier contient les données statiques utilisées si MongoDB est inaccessible.
 */

export const MOCK_ARTICLES = [
  {
    _id: "mock-celebration-23e",
    title: "Célébration de la 23e Journée mondiale de la sécurité et de la santé au travail",
    slug: "celebration-de-la-23e-journee",
    excerpt: "À l'occasion de la 23e Journée mondiale de la sécurité et de la santé au travail, les plus hautes autorités du pays se sont réunies à Kinshasa.",
    content: "Contenu complet de l'article sur la sécurité et la santé au travail...",
    category: "communique",
    image: "/images/articles/celebration-de-la-23e-journee/1.jpg",
    published: true,
    publishedAt: "2025-04-28T10:00:00Z",
    createdAt: "2025-04-28T10:00:00Z"
  },
  {
    _id: "mock-rdc-csu",
    title: "RDC-CSU : MISE EN OEUVRE DES NORMES NATIONALES SUR LA RÉFÉRENCE ET CONTRE-RÉFÉRENCE",
    slug: "rdc-csu-mise-en-oeuvre",
    excerpt: "Le Fonds de Promotion de la Santé organise durant 3 jours des travaux en commission sur la mise en œuvre des normes nationales.",
    content: "Contenu sur la mise en œuvre des normes nationales de référence...",
    category: "communique",
    image: "/images/articles/rdc-csu-mise-en-oeuvre/1.jpg",
    published: true,
    publishedAt: "2025-04-23T09:00:00Z",
    createdAt: "2025-04-23T09:00:00Z"
  },
  {
    _id: "mock-anniversaire-3",
    title: "Célébration 3ème anniversaire du FPS",
    slug: "celebration-3eme-anniversaire-fps",
    excerpt: "La Direction générale du Fonds de Promotion de la Santé ainsi que l'ensemble de son personnel ont soufflé la 3ième bougie d'anniversaire.",
    content: "Célébration du 3ème anniversaire du Fonds de Promotion de la Santé...",
    category: "evenement",
    image: "/images/articles/celebration/1.jpg",
    published: true,
    publishedAt: "2025-04-12T10:00:00Z",
    createdAt: "2025-04-12T10:00:00Z",
    eventStartDate: "2025-04-12T10:00:00Z",
    eventLocation: "Kinshasa"
  },
  {
    _id: "mock-medecine-trad",
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
    publishedAt: "2025-08-31T10:00:00Z",
    createdAt: "2025-08-31T10:00:00Z"
  },
  {
    _id: "mock-campagne-csu",
    title: "Lancement de la campagne de sensibilisation sur la Couverture Santé Universelle",
    slug: "lancement-campagne-csu-2025",
    excerpt: "Une nouvelle étape franchie vers l'accès aux soins pour tous avec le lancement officiel de la campagne nationale.",
    content: "Lancement de la campagne nationale CSU...",
    category: "communique",
    image: "/images/articles/rdc-csu-mise-en-oeuvre/3.jpg",
    published: true,
    publishedAt: "2025-09-15T09:30:00Z",
    createdAt: "2025-09-15T09:30:00Z"
  },
  {
    _id: "mock-partenariat",
    title: "Le FPS renforce ses partenariats internationaux",
    slug: "partenariats-internationaux-fps-2025",
    excerpt: "Signature d'un protocole d'accord stratégique avec plusieurs bailleurs de fonds.",
    content: "Renforcement des partenariats stratégiques internationaux...",
    category: "communique",
    image: "/images/articles/celebration-de-la-23e-journee/3.jpg",
    published: true,
    publishedAt: "2025-10-01T14:00:00Z",
    createdAt: "2025-10-01T14:00:00Z"
  },
  {
    _id: "mock-conf-finance",
    title: "Conférence annuelle sur le Financement de la Santé",
    slug: "conference-financement-sante-2025",
    excerpt: "Rejoignez-nous pour débattre des nouveaux mécanismes de financement innovants.",
    content: "Débats sur le financement de la santé en RDC...",
    category: "evenement",
    image: "/images/events/event-bg-01.jpg",
    published: true,
    publishedAt: "2025-11-01T08:00:00Z",
    createdAt: "2025-11-01T08:00:00Z",
    eventStartDate: "2025-12-10T09:00:00Z",
    eventLocation: "Pullman Hôtel, Kinshasa"
  },
  {
    _id: "mock-digitalisation",
    title: "Formation des prestataires de santé sur la digitalisation",
    slug: "formation-digitalisation-sante-2025",
    excerpt: "Série de formations visant à améliorer la collecte et la gestion des données sanitaires.",
    content: "Digitalisation des services de santé...",
    category: "evenement",
    image: "/images/events/event-bg-02.jpg",
    published: true,
    publishedAt: "2025-10-15T10:00:00Z",
    createdAt: "2025-10-15T10:00:00Z",
    eventStartDate: "2025-11-20T08:30:00Z",
    eventLocation: "INRB, Kinshasa"
  },
  {
    _id: "mock-equipe-nord-kivu",
    title: "Remise officielle des équipements médicaux au Nord-Kivu",
    slug: "remise-equipements-nord-kivu-2025",
    excerpt: "Cérémonie officielle de dotation en matériels médicaux modernes pour les hôpitaux de référence.",
    content: "Dotation d'équipements médicaux au Nord-Kivu...",
    category: "evenement",
    image: "/images/events/event-bg-03.jpg",
    published: true,
    publishedAt: "2025-10-20T11:00:00Z",
    createdAt: "2025-10-20T11:00:00Z",
    eventStartDate: "2025-12-05T10:00:00Z",
    eventLocation: "Goma"
  }
];

export const MOCK_PAGES = {
  "/a-propos": {
    _id: "mock-page-1",
    title: "Notre raison d'être",
    slug: "/a-propos",
    content: "Le Fonds de Promotion de la Santé (FPS) est une institution publique de la République Démocratique du Congo. Notre mission principale est le financement et la promotion des activités de santé sur l'ensemble du territoire national.",
    status: "published",
    layout: "standard",
    banner: {
      enabled: true,
      title: "À propos du FPS",
      subtitle: "Au service de la santé des Congolais",
      height: "medium"
    }
  },
  "/missions": {
    _id: "mock-page-2",
    title: "Nos Missions",
    slug: "/missions",
    content: "Le FPS oeuvre pour : 1. Le financement du plateau technique. 2. L'accès aux médicaments essentiels. 3. Le renforcement des capacités du personnel de santé.",
    status: "published",
    layout: "standard"
  }
};

export const MOCK_NAVIGATION = {
  header: [
    { name: "Accueil", href: "/", submenu: [] },
    { name: "À propos", href: "/a-propos", submenu: [] },
    { name: "Plateau technique", href: "/plateau-technique", submenu: [] },
    { name: "Expertise & Action", href: "/expertises", submenu: [] },
    { name: "Actualités", href: "/actualites", submenu: [] },
    { name: "Contact", href: "/contact", submenu: [] }
  ]
};

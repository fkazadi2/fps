"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Target,
  Heart,
  Zap
} from 'lucide-react';
import MainLayout from "@/components/layout/MainLayout";
import HeroSlider from "@/components/ui/HeroSlider";
import StatsSection from "@/components/ui/StatsSection";
import InteractiveMap from "@/components/ui/InteractiveMap";
import NewsHighlights from "@/components/ui/NewsHighlights";
import CSUProgressSection from "@/components/ui/CSUProgressSection";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import PartnersSection from "@/components/ui/PartnersSection";
import MediaGallery from "@/components/ui/MediaGallery";
import EventsSection from "@/components/ui/EventsSection";
import AnimatedSection from "@/components/ui/AnimatedSection";

function getStrategicAxeHref(axe: any): string {
  const icon = String(axe?.icon || "").toLowerCase();
  const title = String(axe?.title || "").toLowerCase();

  if (icon === "building" || title.includes("infrastructure")) return "/plateau-technique/infrastructures";
  if (icon === "tool" || title.includes("équipement") || title.includes("equipement")) return "/plateau-technique/equipements";
  if (icon === "pill" || title.includes("médicament") || title.includes("medicament")) return "/plateau-technique/medicaments";
  if (icon === "users" || title.includes("ressources humaines") || title.includes("ressource humaine")) return "/gouvernance-sante/capacitation";
  if (icon === "leaf" || title.includes("médecine traditionnelle") || title.includes("medecine traditionnelle")) return "/medecine-traditionnelle";
  if (icon === "shield" || title.includes("gouvernance")) return "/gouvernance-sante";

  return "/a-propos/mission#nos-axes";
}

// Configuration par défaut pour les sections éditables
const defaultHomepageContent = {
  heroSlider: {
    slides: [
      {
        id: 1,
        title: "Mise en œuvre de la CSU",
        description: "Nous envisageons la mise en œuvre du système de la CSU comme un processus en tenant compte de la diversité des contextes géographiques, socio-culturels et économiques.",
        image: "/images/slides/new-slides/mise-en-œuvre-de-la-CSU.jpg",
        buttonText: "En savoir plus",
        buttonLink: "/programmes",
        secondaryButtonText: "Contactez-nous",
        secondaryButtonLink: "/contact",
      },
      {
        id: 2,
        title: "Accès aux soins pour les vulnérables",
        description: "L'accès aux prestations de santé pour les indigents et les vulnérables sur toute l'étendue de la RDC.",
        image: "/images/slides/new-slides/acces-aux-soins-pour-les-vulnerables.jpg",
        buttonText: "Découvrir le FPS",
        buttonLink: "/a-propos",
      },
      {
        id: 3,
        title: "Équité dans l'accès aux soins",
        description: "L'accès aux soins des populations, des familles et des individus en assurant l'équité, en enlevant les barrières de toutes sortes.",
        image: "/images/slides/new-slides/equite-dans-l-acces-aux-soins.jpg",
        buttonText: "Voir les programmes",
        buttonLink: "/programmes",
        secondaryButtonText: "Partenaires",
        secondaryButtonLink: "/financement#partenaires",
      },
      {
        id: 4,
        title: "Participation communautaire",
        description: "La participation communautaire suppose que la communauté s'organise pour créer une dynamique en faveur du processus de la CSU.",
        image: "/images/slides/new-slides/participation-communautaire.jpg",
        buttonText: "Nos initiatives",
        buttonLink: "/programmes#capacites",
        secondaryButtonText: "Contactez-nous",
        secondaryButtonLink: "/contact",
      },
    ],
    autoplay: true,
    duration: 7000
  },
  mission: {
    title: "Notre mission",
    subtitle: "Mobiliser, gérer et promouvoir efficacement les ressources pour la santé publique, conformément au Décret n°22/15 du 09 avril 2022",
    vision: "Une RDC où la santé est financée de manière durable et équitable pour tous",
    legalFramework: "Décret n°22/15 du 09 avril 2022 - Tutelle du Ministre de la Santé",
    strategicAxes: [
      {
        title: "Infrastructures sanitaires",
        description: "La construction et la réhabilitation des infrastructures sanitaires pour assurer un environnement de soin moderne et adapté aux besoins de la population.",
        icon: "building",
        image: "/images/home/axes/axe-infrastructures.png"
      },
      {
        title: "Financement et dotation en équipements",
        description: "Le financement et la dotation des Établissements de Services et Soins de Santé en matériels médicaux et non médicaux de pointe pour des diagnostics précis.",
        icon: "tool",
        image: "/images/home/axes/axe-equipements.png"
      },
      {
        title: "Financement en médicaments",
        description: "Le financement permanent en médicaments essentiels, vaccins et autres intrants de santé publique sur toute l'étendue du territoire.",
        icon: "pill",
        image: "/images/home/axes/axe-medicaments.png"
      },
      {
        title: "Financement du renforcement des capacités des ressources humaines du secteur santé",
        description: "Le renforcement continu des capacités du personnel de santé et le soutien au développement des compétences pour une prise en charge de qualité.",
        icon: "users",
        image: "/images/home/axes/axe-rh.png"
      },
      {
        title: "Recherche en médecine",
        description: "La promotion et l'encadrement de la médecine traditionnelle comme axe complémentaire intégré dans le système de santé national.",
        icon: "leaf",
        image: "/images/home/axes/axe-medecine-traditionnelle.png"
      },
      {
        title: "Système des références",
        description: "Le pilotage stratégique de la santé publique, incluant la planification, le financement de la recherche et le système de références ambulances.",
        icon: "shield",
        image: "/images/home/axes/axe-gouvernance.png"
      }
    ]
  },
  features: [
    {
      title: "Éducation Sanitaire",
      description: "Promouvoir l'éducation sanitaire pour améliorer les comportements et pratiques de santé.",
      link: "/programmes#education",
      icon: "education"
    },
    {
      title: "Prévention",
      description: "Développer des programmes de prévention des maladies et de promotion de modes de vie sains.",
      link: "/programmes#prevention",
      icon: "prevention"
    },
    {
      title: "Collaboration",
      description: "Coordonner les efforts avec les partenaires publics et privés pour maximiser l'impact sanitaire.",
      link: "/a-propos#partenariats",
      icon: "collaboration"
    }
  ],
  stats: {
    title: "Notre impact en chiffres",
    subtitle: "Le FPS en action pour améliorer la santé publique en RDC",
    values: [
      { label: "Personnes couvertes", value: "5M+", icon: "users", color: "bg-[var(--danger)]" },
      { label: "Centres de santé partenaires", value: "650+", icon: "building", color: "bg-[var(--accent)]" },
      { label: "Provinces couvertes", value: "26", icon: "check", color: "bg-emerald-500" },
      { label: "Taux de satisfaction", value: "85%", icon: "trending", color: "bg-blue-500" }
    ]
  },
  interactiveMap: {
    title: "Présence sur le territoire",
    subtitle: "Découvrez notre implantation à travers la République Démocratique du Congo",
    buttonText: "Voir la carte complète",
    buttonLink: "/programmes#presence"
  },
  csuProgress: {
    title: "Progrès vers la CSU",
    subtitle: "Notre contribution à la Couverture Santé Universelle en RDC",
    description: "Le FPS contribue activement à l'atteinte des objectifs de la Couverture Santé Universelle en République Démocratique du Congo.",
    progressItems: [
      { label: "Accès financier", progress: 75 },
      { label: "Qualité des soins", progress: 80 },
      { label: "Disponibilité des services", progress: 70 },
      { label: "Équité géographique", progress: 65 }
    ]
  },
  newsHighlights: {
    title: "Actualités récentes",
    subtitle: "Restez informé des dernières nouvelles du FPS",
    linkText: "Toutes les actualités",
    linkUrl: "/centre-presse/presse",
    showCount: 3
  },
  mediaGallery: {
    title: "Galerie Média",
    subtitle: "Découvrez nos activités en images et vidéos",
    buttonText: "Voir la galerie complète",
    buttonLink: "/media"
  },
  events: {
    title: "Événements à venir",
    subtitle: "Participez à nos prochains événements et activités",
    linkText: "Voir tous les événements",
    linkUrl: "/evenements"
  },
  partners: {
    title: "Nos Partenaires EPVG",
    subtitle: "Ensemble pour une meilleure santé publique",
    description: "Le FPS collabore avec de nombreux partenaires locaux et internationaux pour maximiser son impact."
  },
  testimonials: {
    title: "Témoignages",
    subtitle: "Ce que disent nos bénéficiaires et partenaires",
    autoplay: true
  },
  cta: {
    title: "Restez informé",
    description: "Recevez les dernières actualités et informations sur les activités du Fonds de Promotion de la Santé.",
    buttons: [
      { text: "Actualités", link: "/centre-presse/presse" },
      { text: "Nous contacter", link: "/contact" }
    ]
  },
  sectionsVisibility: {
    heroSlider: true,
    mission: true,
    stats: true,
    map: true,
    csuProgress: true,
    news: true,
    mediaGallery: true,
    events: true,
    partners: true,
    testimonials: true,
    cta: true
  }
};

type HomeClientProps = {
  latestNews?: any[];
  upcomingEvents?: any[];
  initialSections?: any;
};

export default function HomeClient({
  latestNews = [],
  upcomingEvents = [],
  initialSections = null
}: HomeClientProps) {
  // État pour contrôler l'animation des cartes
  const [animate, setAnimate] = useState(false);
  // État pour le contenu personnalisable
  const [homepageContent, setHomepageContent] = useState(defaultHomepageContent);

  // Déclencher l'animation après le montage du composant
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Hydrater le contenu avec les données initiales du serveur
  useEffect(() => {
    if (initialSections) {
      setHomepageContent(prev => ({
        ...prev,
        ...initialSections
      }));
    }
  }, [initialSections]);

  // Fonction pour obtenir l'icône SVG selon le type
  const getFeatureIcon = (iconType: string) => {
    switch (iconType) {
      case 'education':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
          </svg>
        );
      case 'prevention':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        );
      case 'collaboration':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        );
    }
  };

  return (
    <MainLayout>
      {/* Hero Slider Section */}
      {homepageContent.sectionsVisibility.heroSlider && <HeroSlider customSlides={homepageContent.heroSlider.slides} />}

      {/* Featured Section - Design Moderne avec Géométrie */}
      {homepageContent.sectionsVisibility.mission && (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          {/* Éléments décoratifs géométriques en arrière-plan */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--danger)] opacity-5 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection direction="up" delay={100}>
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                    <Target className="w-4 h-4 text-white" />
                    Notre Mission
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] leading-tight">
                  {homepageContent.mission.title}
                </h2>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
                  {homepageContent.mission.subtitle}
                </p>
              </div>
            </AnimatedSection>

            {/* Vision et Cadre légal - Design Glassmorphism Raffiné */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="group relative">
                <div className="absolute inset-0 bg-[var(--primary)] opacity-10 rounded-3xl blur-2xl group-hover:opacity-20 transition-all duration-500"></div>
                <div className="relative h-full bg-[var(--primary)] border border-white/20 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-all duration-500">
                    <Target className="w-24 h-24 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[var(--accent)] rounded-full"></span>
                    Notre Vision
                  </h3>
                  <p className="text-3xl font-bold text-white leading-snug tracking-tight">
                    « {homepageContent.mission.vision} »
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-[var(--accent)] opacity-10 rounded-3xl blur-2xl group-hover:opacity-20 transition-all duration-500"></div>
                <div className="relative h-full bg-[var(--accent)] border border-white/40 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-all duration-500">
                    <svg className="w-24 h-24 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[var(--danger)] rounded-full"></span>
                    Cadre légal
                  </h3>
                  <p className="text-lg text-[var(--primary)] leading-relaxed font-bold">
                    {homepageContent.mission.legalFramework}
                  </p>
                  <p className="mt-4 text-sm text-[var(--secondary)] opacity-80">
                    Sous la tutelle administrative et technique du Ministre de la Santé Publique, Hygiène et Prévoyance Sociale.
                  </p>
                </div>
              </div>
            </div>

            {/* Séparateur discret amélioré */}
            <div className="max-w-4xl mx-auto border-t border-gray-100 my-20"></div>

            {/* Axes stratégiques - Cards avec Images */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-[var(--primary)] mb-4">Nos axes stratégiques</h3>
                <div className="w-24 h-1.5 bg-[var(--danger)] mx-auto rounded-full"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {homepageContent.mission.strategicAxes.map((axe, index) => {
                  const axesColors = [
                    "from-blue-500 to-blue-700",       // 1. Infrastructures
                    "from-amber-500 to-orange-600",    // 2. Equipements
                    "from-cyan-500 to-blue-600",       // 3. Medicaments
                    "from-violet-500 to-purple-600",   // 4. RH
                    "from-emerald-500 to-green-600",   // 5. Medecine Trad
                    "from-rose-500 to-red-600"         // 6. Gouvernance
                  ];
                  const currentGradient = axesColors[index % axesColors.length];

                  return (
                    <Link
                      key={index}
                      href={getStrategicAxeHref(axe)}
                      className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transform transition-all duration-700 ease-out border border-gray-100 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                      style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                    >
                      <div className="flex flex-col h-full">
                        {/* Partie Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={axe.image || `/images/home/axes/strategic_axe_mobilization_1775667777913${index + 1}.png`}
                            alt={axe.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Overlay au survol */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="text-white font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              En savoir plus <ArrowRight className="w-5 h-5" />
                            </span>
                          </div>
                        </div>

                        {/* Partie Contenu */}
                        <div className="relative p-8 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${currentGradient} text-white flex items-center justify-center font-black text-xl shadow-lg`}>
                              {index + 1}
                            </div>
                            <h4 className="text-xl font-bold text-[var(--primary)] leading-tight">
                              {axe.title}
                            </h4>
                          </div>

                          <p className="text-gray-600 leading-relaxed text-sm pb-6">
                            {axe.description}
                          </p>

                          <div className="mt-auto">
                            {/* Ligne décorative en bas forcée */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA vers page Mission complète */}
            <div className="text-center">
              <Link
                href="/a-propos/mission"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Découvrir notre mission complète
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Section Valeurs - Design Créatif */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--accent)] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                  <Heart className="w-4 h-4 text-white" />
                  Nos Valeurs
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-6">
                Ce qui nous guide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des principes forts pour un impact durable sur la santé publique en RDC
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Équité",
                description: "Garantir un accès équitable aux soins pour tous les citoyens, sans discrimination.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Excellence",
                description: "Rechercher l'excellence dans la qualité des services de santé fournis.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Collaboration",
                description: "Travailler en partenariat avec toutes les parties prenantes du secteur de la santé.",
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Innovation",
                description: "Adopter des approches innovantes pour relever les défis sanitaires.",
                color: "from-red-500 to-red-600"
              }
            ].map((value, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 100}>
                <div className="group relative">
                  {/* Carte principale */}
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {/* Fond dégradé au survol */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Icône */}
                    <div className="relative mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} text-white transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                        {value.icon}
                      </div>
                    </div>

                    {/* Contenu */}
                    <h3 className="text-2xl font-bold text-[var(--primary)] mb-3 group-hover:text-[var(--danger)] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>

                    {/* Ligne décorative */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {homepageContent.sectionsVisibility.stats && (
        <AnimatedSection direction="up">
          <StatsSection customContent={homepageContent.stats} />
        </AnimatedSection>
      )}

      {/* Interactive Map */}
      {homepageContent.sectionsVisibility.map && (
        <AnimatedSection direction="up" delay={200}>
          <InteractiveMap />
        </AnimatedSection>
      )}

      {/* CSU Progress Section */}
      {homepageContent.sectionsVisibility.csuProgress && (
        <AnimatedSection direction="up" delay={200}>
          <CSUProgressSection />
        </AnimatedSection>
      )}

      {/* News Highlights */}
      {homepageContent.sectionsVisibility.news && (
        <AnimatedSection direction="left" delay={200}>
          <NewsHighlights articles={latestNews} />
        </AnimatedSection>
      )}

      {/* Media Gallery Section */}
      {homepageContent.sectionsVisibility.mediaGallery && (
        <AnimatedSection direction="right" delay={200}>
          <MediaGallery forceInit={true} />
        </AnimatedSection>
      )}

      {/* Events Section */}
      {homepageContent.sectionsVisibility.events && (
        <AnimatedSection direction="up" delay={200}>
          <EventsSection events={upcomingEvents} />
        </AnimatedSection>
      )}

      {/* Partenaires */}
      {homepageContent.sectionsVisibility.partners && (
        <AnimatedSection direction="up" delay={200}>
          <PartnersSection />
        </AnimatedSection>
      )}

      {/* Testimonials */}
      {homepageContent.sectionsVisibility.testimonials && (
        <AnimatedSection direction="left" delay={200}>
          <TestimonialsCarousel />
        </AnimatedSection>
      )}

      {/* CTA Section - Design Moderne et Impactant */}
      {homepageContent.sectionsVisibility.cta && (
        <AnimatedSection direction="up" delay={300}>
          <section className="relative py-20 overflow-hidden">
            {/* Fond avec dégradé complexe */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--danger)]"></div>

            {/* Motifs géométriques animés */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-pulse"></div>
              <div className="absolute top-40 right-20 w-24 h-24 border-4 border-white rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-white rounded-lg animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Réseau de connexions */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="connection-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="2" fill="white" opacity="0.3" />
                    <line x1="50" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.2" />
                    <line x1="50" y1="50" x2="50" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#connection-grid)" />
              </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {/* Contenu texte */}
                <div className="text-white">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-[var(--primary)] text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      Engagement & Action
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    {homepageContent.cta.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                    {homepageContent.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {homepageContent.cta.buttons.map((button, index) => (
                      <Link
                        key={index}
                        href={button.link}
                        className={`group px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center ${index === 0
                          ? 'bg-white text-[var(--primary)] hover:bg-gray-100'
                          : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[var(--primary)]'
                          }`}
                      >
                        {button.text}
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Visualisation créative avec le logo */}
                <div className="hidden lg:block relative mt-12 lg:mt-0">
                  <div className="relative w-full h-96">
                    {/* Cercles concentriques animés */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-80 h-80 border-4 border-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="absolute w-64 h-64 border-4 border-white/30 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute w-48 h-48 border-4 border-white/40 rounded-full"></div>

                      {/* Logo central */}
                      <div className="relative w-40 h-40 bg-white rounded-full shadow-2xl p-4 z-10 transform hover:scale-110 transition-transform duration-500 overflow-hidden">
                        <Image
                          src="/images/logo-fps.jpg"
                          alt="Logo FPS"
                          fill
                          className="object-contain p-2 rounded-full"
                          sizes="160px"
                        />
                      </div>
                    </div>

                    {/* Points de connexion */}
                    <div className="absolute top-10 right-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}
    </MainLayout>
  );
}

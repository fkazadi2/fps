"use client";

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Edit3,
  Type,
  Image as ImageIcon,
  BarChart3,
  MapPin,
  TrendingUp,
  Newspaper,
  Calendar,
  Users,
  MessageSquare,
  Megaphone,
  PlayCircle
} from 'lucide-react';

// Configuration par défaut complète - même que page.tsx
const defaultHomepageContent = {
  heroSlider: {
    slides: [
      {
        id: 1,
        title: "Accès aux soins pour les vulnérables",
        description: "L'accès aux prestations de santé pour les indigents et les vulnérables sur toute l'étendue de la RDC.",
        image: "/images/slides/fps-slide-1.jpg",
        buttonText: "Découvrir le FPS",
        buttonLink: "/a-propos",
      },
      {
        id: 2,
        title: "Mise en œuvre de la CSU",
        description: "Nous envisageons la mise en œuvre du système de la CSU comme un processus en tenant compte de la diversité des contextes géographiques, socio-culturels et économiques.",
        image: "/images/slides/fps-slide-2.jpg",
        buttonText: "En savoir plus",
        buttonLink: "/programmes",
        secondaryButtonText: "Contactez-nous",
        secondaryButtonLink: "/contact",
      },
      {
        id: 3,
        title: "Équité dans l'accès aux soins",
        description: "L'accès aux soins des populations, des familles et des individus en assurant l'équité, en enlevant les barrières de toutes sortes.",
        image: "/images/slides/fps-slide-3.jpg",
        buttonText: "Voir les programmes",
        buttonLink: "/programmes",
        secondaryButtonText: "Partenaires",
        secondaryButtonLink: "/financement#partenaires",
      },
      {
        id: 4,
        title: "Participation communautaire",
        description: "La participation communautaire suppose que la communauté s'organise pour créer une dynamique en faveur du processus de la CSU.",
        image: "/images/slides/fps-slide-4.jpg",
        buttonText: "Nos initiatives",
        buttonLink: "/programmes#capacites",
        secondaryButtonText: "Comment participer",
        secondaryButtonLink: "/contact",
      },
    ],
    autoplay: true,
    duration: 7000
  },
  mission: {
    title: "Notre mission",
    subtitle: "Promouvoir la santé publique en République Démocratique du Congo"
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
      { label: "Provinces couvertes", value: "26", icon: "check", color: "bg-[var(--danger)]" },
      { label: "Taux de satisfaction", value: "85%", icon: "trending", color: "bg-[var(--accent)]" }
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
    linkUrl: "/actualites/presse",
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
    title: "Nos Partenaires",
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
      { text: "Actualités", link: "/actualites/presse" },
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

export default function HomepageEditor() {
  const [content, setContent] = useState(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sectionsConfig, setSectionsConfig] = useState<Record<string, { key: string; id: string }>>({});

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  // Charger le contenu depuis l'API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/homepage');
        if (!res.ok) throw new Error('Erreur lors du chargement des données');

        const data = await res.json();
        if (data.success) {
          // Fusionner avec les défauts pour s'assurer que la structure est complète
          const mergedContent = {
            ...defaultHomepageContent,
            ...data.data,
            // S'assurer que sectionsVisibility est bien fusionné
            sectionsVisibility: {
              ...defaultHomepageContent.sectionsVisibility,
              ...(data.data.sectionsVisibility || {})
            }
          };

          setContent(mergedContent);
          if (data.config) {
            setSectionsConfig(data.config);
          }
        } else {
          throw new Error(data.error || 'Erreur inconnue');
        }
      } catch (err) {
        console.error('Erreur chargement homepage:', err);
        setError('Impossible de charger le contenu de la page d\'accueil');
        // Fallback sur localStorage ou défauts si API échoue
        const saved = localStorage.getItem('fps_homepage_content');
        if (saved) {
          try {
            setContent({ ...defaultHomepageContent, ...JSON.parse(saved) });
            setError(null); // Clear error if local backup works
          } catch (e) { /* ignore */ }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Sauvegarder via l'API
  const saveContent = async () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Préparer les promesses de mise à jour pour chaque section
      const updates = [];
      const sectionsToUpdate = Object.keys(sectionsConfig);

      if (sectionsToUpdate.length === 0) {
        // Fallback: si pas de config (ex: mode offline/localStorage), on sauvegarde en local
        localStorage.setItem('fps_homepage_content', JSON.stringify(content));
        setIsSaved(true);
        setSaving(false);
        setSuccessMsg('Sauvegardé localement (API non disponible)');
        return;
      }

      for (const frontendKey of sectionsToUpdate) {
        const config = sectionsConfig[frontendKey];
        const sectionContent = content[frontendKey as keyof typeof content];
        const isVisible = content.sectionsVisibility[frontendKey as keyof typeof content.sectionsVisibility];

        // Skip si content n'existe pas
        if (!sectionContent) continue;

        // Construire la requête PUT
        updates.push(
          fetch('/api/homepage', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: config.key, // Clé DB (ex: homepage_hero)
              content: sectionContent,
              active: isVisible
              // displayOrder peut être ajouté ici si on gère le réordonnancement
            })
          })
        );
      }

      // Attendre toutes les mises à jour
      const results = await Promise.all(updates);
      const failed = results.filter(r => !r.ok);

      if (failed.length > 0) {
        throw new Error(`${failed.length} sections n'ont pas pu être sauvegardées`);
      }

      setIsSaved(true);
      setSuccessMsg('Modifications enregistrées avec succès !');

      // Nettoyer le message après 3s
      setTimeout(() => setSuccessMsg(null), 3000);

      // Forcer le rechargement de la homepage (optionnel via event custom si besoin)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('homepage-content-updated'));
      }

    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  // Réinitialiser le contenu (Recharger depuis l'API)
  const resetContent = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler vos modifications non sauvegardées ?')) {
      window.location.reload();
    }
  };

  // Basculer la visibilité d'une section
  const toggleSectionVisibility = (sectionKey: string) => {
    setContent(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [sectionKey]: !prev.sectionsVisibility[sectionKey as keyof typeof prev.sectionsVisibility]
      }
    }));
    setIsSaved(false);
  };

  // Fonctions de mise à jour pour chaque section
  const updateSection = (sectionKey: string, field: string, value: unknown) => {
    setContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey as keyof typeof prev],
        [field]: value
      }
    }));
    setIsSaved(false);
  };

  const updateSlide = (slideIndex: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      heroSlider: {
        ...prev.heroSlider,
        slides: prev.heroSlider.slides.map((slide, i) =>
          i === slideIndex ? { ...slide, [field]: value } : slide
        )
      }
    }));
    setIsSaved(false);
  };

  const updateFeature = (index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
    setIsSaved(false);
  };

  const updateStat = (index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        values: prev.stats.values.map((stat, i) =>
          i === index ? { ...stat, [field]: value } : stat
        )
      }
    }));
    setIsSaved(false);
  };

  const updateProgressItem = (index: number, field: string, value: string | number) => {
    setContent(prev => ({
      ...prev,
      csuProgress: {
        ...prev.csuProgress,
        progressItems: prev.csuProgress.progressItems.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
    setIsSaved(false);
  };

  const updateCTAButton = (index: number, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      cta: {
        ...prev.cta,
        buttons: prev.cta.buttons.map((button, i) =>
          i === index ? { ...button, [field]: value } : button
        )
      }
    }));
    setIsSaved(false);
  };

  const sections = [
    { key: 'heroSlider', label: 'Hero Slider', icon: ImageIcon, editable: true },
    { key: 'mission', label: 'Section Mission', icon: Type, editable: true },
    { key: 'stats', label: 'Statistiques', icon: BarChart3, editable: true },
    { key: 'map', label: 'Carte Interactive', icon: MapPin, editable: true },
    { key: 'csuProgress', label: 'Progrès CSU', icon: TrendingUp, editable: true },
    { key: 'news', label: 'Actualités', icon: Newspaper, editable: true },
    { key: 'mediaGallery', label: 'Galerie Média', icon: PlayCircle, editable: true },
    { key: 'events', label: 'Événements', icon: Calendar, editable: true },
    { key: 'partners', label: 'Partenaires', icon: Users, editable: true },
    { key: 'testimonials', label: 'Témoignages', icon: MessageSquare, editable: true },
    { key: 'cta', label: 'Section CTA', icon: Megaphone, editable: true }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Messages de feedback */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 roundedshadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">⚠️</div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">✅</div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMsg}</p>
            </div>
          </div>
        </div>
      )}

      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Éditeur de Page d'Accueil</h1>
          <p className="text-gray-600 mt-1">Personnalisez tous les composants de votre page d'accueil</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={resetContent}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            disabled={saving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Annuler
          </button>

          <button
            onClick={saveContent}
            disabled={isSaved || saving}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${isSaved
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : saving
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            {saving ? (
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? 'Enregistrement...' : isSaved ? 'Sauvegardé' : 'Sauvegarder'}
          </button>

          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            Voir site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gestion des sections */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sections de la Page
            </h3>

            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <div key={section.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleSectionVisibility(section.key)}
                        className={`p-1 rounded ${content.sectionsVisibility[section.key as keyof typeof content.sectionsVisibility]
                          ? 'text-green-600' : 'text-gray-400'
                          }`}
                      >
                        {content.sectionsVisibility[section.key as keyof typeof content.sectionsVisibility]
                          ? <Eye className="h-4 w-4" />
                          : <EyeOff className="h-4 w-4" />
                        }
                      </button>
                      <IconComponent className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{section.label}</span>
                    </div>

                    {section.editable && (
                      <button
                        onClick={() => setEditingSection(editingSection === section.key ? null : section.key)}
                        className={`p-1 rounded ${editingSection === section.key ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600'
                          }`}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Éditeur de contenu */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 max-h-[80vh] overflow-y-auto">
            {/* Éditeur Hero Slider */}
            {editingSection === 'heroSlider' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <ImageIcon className="h-5 w-5 inline mr-2" />
                  Hero Slider
                </h3>

                <div className="space-y-6">
                  {content.heroSlider.slides.map((slide, index) => (
                    <div key={slide.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Slide {index + 1}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => updateSlide(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            value={slide.description}
                            onChange={(e) => updateSlide(index, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bouton principal</label>
                            <input
                              type="text"
                              value={slide.buttonText}
                              onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien principal</label>
                            <input
                              type="text"
                              value={slide.buttonLink}
                              onChange={(e) => updateSlide(index, 'buttonLink', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bouton secondaire</label>
                            <input
                              type="text"
                              value={slide.secondaryButtonText}
                              onChange={(e) => updateSlide(index, 'secondaryButtonText', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien secondaire</label>
                            <input
                              type="text"
                              value={slide.secondaryButtonLink}
                              onChange={(e) => updateSlide(index, 'secondaryButtonLink', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Éditeur Mission (déjà existant) */}
            {editingSection === 'mission' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <Type className="h-5 w-5 inline mr-2" />
                  Section Mission
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={content.mission.title}
                      onChange={(e) => updateSection('mission', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                    <textarea
                      value={content.mission.subtitle}
                      onChange={(e) => updateSection('mission', 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Fonctionnalités</h4>
                    {content.features.map((feature, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) => updateFeature(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={feature.description}
                              onChange={(e) => updateFeature(index, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien</label>
                            <input
                              type="text"
                              value={feature.link}
                              onChange={(e) => updateFeature(index, 'link', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Éditeur Statistiques */}
            {editingSection === 'stats' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <BarChart3 className="h-5 w-5 inline mr-2" />
                  Section Statistiques
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={content.stats.title}
                      onChange={(e) => updateSection('stats', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                    <textarea
                      value={content.stats.subtitle}
                      onChange={(e) => updateSection('stats', 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Statistiques</h4>
                    {content.stats.values.map((stat, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateStat(index, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStat(index, 'value', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Autres éditeurs de sections */}
            {['map', 'csuProgress', 'news', 'mediaGallery', 'events', 'partners', 'testimonials'].includes(editingSection || '') && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {sections.find(s => s.key === editingSection)?.icon &&
                    React.createElement(sections.find(s => s.key === editingSection)!.icon, { className: "h-5 w-5 inline mr-2" })
                  }
                  {sections.find(s => s.key === editingSection)?.label}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={(content[editingSection as keyof typeof content] as any)?.title || ''}
                      onChange={(e) => updateSection(editingSection!, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                    <textarea
                      value={(content[editingSection as keyof typeof content] as any)?.subtitle || ''}
                      onChange={(e) => updateSection(editingSection!, 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Éditeur CTA (déjà existant mais amélioré) */}
            {editingSection === 'cta' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <Megaphone className="h-5 w-5 inline mr-2" />
                  Section Appel à l'Action
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      value={content.cta.title}
                      onChange={(e) => updateSection('cta', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={content.cta.description}
                      onChange={(e) => updateSection('cta', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Boutons</h4>
                    {content.cta.buttons.map((button, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texte</label>
                            <input
                              type="text"
                              value={button.text}
                              onChange={(e) => updateCTAButton(index, 'text', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien</label>
                            <input
                              type="text"
                              value={button.link}
                              onChange={(e) => updateCTAButton(index, 'link', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!editingSection && (
              <div className="text-center py-12">
                <Settings className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez une section à modifier
                </h3>
                <p className="text-gray-500">
                  Cliquez sur l'icône d'édition à côté d'une section pour commencer à la personnaliser.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
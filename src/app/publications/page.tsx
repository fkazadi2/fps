/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Briefcase, BookOpen, Calendar, Download, Eye, Users, TrendingUp, Award, Video, Image as ImageIcon, ArrowRight, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Données des 3 dernières publications (à remplacer par données réelles du CMS)
  const recentPublications = [
    {
      id: 1,
      title: "Rapport Annuel 2023 - Activités et Réalisations",
      category: "Rapport Annuel",
      date: "15 Janvier 2024",
      size: "2.5 MB",
      format: "PDF",
      downloads: 1250,
      description: "Rapport complet des activités et réalisations du FPS pour l'année 2023, incluant les statistiques de performance et les projets réalisés.",
      link: "/publications/rapports-documentations#rapport-2023",
      isNew: true
    },
    {
      id: 2,
      title: "Étude sur la Couverture Sanitaire Universelle en RDC",
      category: "Étude",
      date: "22 Décembre 2023",
      size: "4.1 MB",
      format: "PDF",
      downloads: 890,
      description: "Analyse approfondie de l'état de la couverture sanitaire universelle en RDC avec recommandations stratégiques.",
      link: "/publications/rapports-documentations#etude-csu",
      isNew: true
    },
    {
      id: 3,
      title: "Guide de Bonnes Pratiques - Médecine Traditionnelle",
      category: "Guide",
      date: "10 Novembre 2023",
      size: "1.8 MB",
      format: "PDF",
      downloads: 675,
      description: "Guide pratique pour les praticiens de médecine traditionnelle, incluant les standards et protocoles recommandés.",
      link: "/publications/rapports-documentations#guide-medecine",
      isNew: false
    }
  ];

  // Catégories de publications
  const categories = [
    {
      id: "emplois",
      name: "Offres d'emploi",
      icon: Briefcase,
      color: "teal",
      description: "Opportunités de carrière au sein du FPS",
      link: "/publications/offre-emploi"
    },
    {
      id: "appels-offres",
      name: "Appels d'offres",
      icon: FileText,
      color: "orange",
      description: "Appels d'offres en cours et à venir",
      link: "/publications/appel-offre"
    },
    {
      id: "rapports",
      name: "Rapports annuels de performance",
      icon: BookOpen,
      color: "blue",
      description: "Rapports annuels de performance (obligation de redevabilité)",
      link: "/publications/rapports-documentations?type=rapport-annuel"
    },
    {
      id: "gouvernance",
      name: "Documents de gouvernance",
      icon: FileText,
      color: "purple",
      description: "Statuts, règlements, plan stratégique",
      link: "/publications/rapports-documentations?type=gouvernance"
    },

  ];

  // Voix du terrain - Témoignages et reportages
  const voixDuTerrain = [
    {
      id: 1,
      type: "témoignage",
      title: "Témoignage d'un bénéficiaire - Zone de santé de Mbuji-Mayi",
      description: "Marie, mère de 3 enfants, témoigne de l'impact du programme de Financement en médicaments sur sa communauté.",
      image: "/images/articles/celebration/1.jpg", // Placeholder - à remplacer par photo réelle
      date: "15 Janvier 2024",
      link: "/centre-presse/presse#temoignage-marie"
    },
    {
      id: 2,
      type: "reportage",
      title: "Reportage photo : Équipes FPS en action dans les zones rurales",
      description: "Découvrez en images les activités de sensibilisation menées par nos équipes dans les zones rurales du Kasaï-Oriental.",
      image: "/images/articles/rdc-csu-mise-en-oeuvre/1.jpg", // Placeholder - à remplacer par photo réelle
      date: "10 Janvier 2024",
      link: "/centre-presse/galerie#reportage-rural"
    },
    {
      id: 3,
      type: "activite",
      title: "Activité de sensibilisation - Promotion des comportements sains",
      description: "Photos et vidéos de nos activités de sensibilisation communautaire pour la promotion de la santé.",
      image: "/images/articles/celebration-de-la-23e-journee/1.jpg", // Placeholder - à remplacer par photo réelle
      date: "5 Janvier 2024",
      link: "/centre-presse/galerie#sensibilisation"
    }
  ];

  // Résultats tangibles
  const resultatsTangibles = [
    {
      id: 1,
      title: "Financement en médicaments essentiels",
      value: "500+",
      unit: "zones de santé équipées",
      description: "Plus de 500 zones de santé ont été équipées en médicaments essentiels en 2023",
      impact: "Réduction de 40% des ruptures de stock",
      image: "/images/articles/celebration/2.jpg", // Placeholder - à remplacer par photo réelle
      link: "/publications/rapports-documentations#dotations"
    },
    {
      id: 2,
      title: "Formation du personnel de santé",
      value: "2,500",
      unit: "agents formés",
      description: "Formation de 2,500 agents de santé en 2023 dans diverses spécialités",
      impact: "Amélioration de la qualité des soins dans 85% des structures",
      image: "/images/articles/rdc-csu-mise-en-oeuvre/2.jpg", // Placeholder - à remplacer par photo réelle
      link: "/publications/rapports-documentations#formations"
    },
    {
      id: 3,
      title: "Projets d'infrastructure financés",
      value: "45",
      unit: "projets réalisés",
      description: "45 projets d'infrastructure sanitaire financés et réalisés en 2023",
      impact: "Amélioration de l'accès aux soins pour 200,000+ personnes",
      image: "/images/articles/celebration-de-la-23e-journee/2.jpg", // Placeholder - à remplacer par photo réelle
      link: "/publications/rapports-documentations#infrastructures"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* 1. La Bannière */}
        <PageHeader
          title="Publications"
          description="Accéder à toutes les publications officielles du FPS : offres d'emploi, appels d'offres, rapports annuels et documents stratégiques"
          icon={FileText}
          variant="blue"
          breadcrumbs={[
            { name: "Publications", href: "/publications" }
          ]}
          backgroundImage="/images/banners/publications/banner-document.jpg"
        />



        {/* Section: 3 Dernières publications mises en avant */}
        <section className="py-12 bg-white border-b-4 border-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Publications récentes</h2>
                <p className="text-gray-600">Les 3 dernières publications du FPS</p>
              </div>
              <Link
                href="/publications/rapports-documentations"
                className="text-[var(--primary)] font-semibold hover:underline flex items-center"
              >
                Voir toutes les publications
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[var(--primary)] overflow-hidden group"
                >
                  {/* Badge "Nouveau" */}
                  {pub.isNew && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-[var(--danger)] text-white text-xs font-bold rounded-full shadow-lg">
                        NOUVEAU
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-blue-600 uppercase">{pub.category}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {pub.date}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {pub.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <Download className="w-4 h-4 mr-1" />
                        {pub.downloads} téléchargements
                      </div>
                      <Link
                        href={pub.link}
                        className="text-[var(--primary)] font-semibold text-sm hover:underline flex items-center"
                      >
                        Télécharger
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Catégories de publications */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Catégories de publications</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Consultez nos publications organisées par type pour faciliter votre recherche
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const colorClasses = {
                  blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
                  purple: "bg-purple-100 text-purple-600 hover:bg-purple-200",
                  green: "bg-green-100 text-green-600 hover:bg-green-200",
                  orange: "bg-orange-100 text-orange-600 hover:bg-orange-200",
                  teal: "bg-teal-100 text-teal-600 hover:bg-teal-200"
                };

                return (
                  <Link
                    key={category.id}
                    href={category.link}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-[var(--primary)] group"
                  >
                    <div className={`w-16 h-16 rounded-xl ${colorClasses[category.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-[var(--primary)] font-semibold text-sm">
                      Accéder
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Voix du terrain */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--accent)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
                  Voix du Terrain
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Témoignages et reportages</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Découvrez les témoignages de bénéficiaires, les reportages photo/vidéo de nos activités de terrain et les équipes FPS en action dans les zones rurales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {voixDuTerrain.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[var(--primary)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${item.type === 'témoignage' ? 'bg-blue-600' :
                        item.type === 'reportage' ? 'bg-green-600' : 'bg-purple-600'
                        }`}>
                        {item.type === 'témoignage' ? 'Témoignage' : item.type === 'reportage' ? 'Reportage' : 'Activité'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/centre-presse"
                className="inline-flex items-center px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Voir tous les témoignages et reportages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Résultats tangibles */}
        <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
                  Résultats Tangibles
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact mesurable de nos actions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Découvrez les résultats concrets de nos dotations, projets financés et statistiques de performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resultatsTangibles.map((resultat) => (
                <div
                  key={resultat.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[var(--primary)] group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={resultat.image}
                      alt={resultat.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white">
                        <div className="text-4xl font-extrabold mb-1">{resultat.value}</div>
                        <div className="text-sm font-semibold">{resultat.unit}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Award className="w-5 h-5 text-[var(--accent)] mr-2" />
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors">
                        {resultat.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {resultat.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-[var(--danger)]">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Impact: {resultat.impact}
                    </div>
                    <Link
                      href={resultat.link}
                      className="mt-4 inline-flex items-center text-[var(--primary)] font-semibold text-sm hover:underline"
                    >
                      En savoir plus
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Informations pratiques */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    Calendrier des publications
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Rapports annuels : Publiés en fin d'année</li>
                    <li>• Documents de gouvernance : Mis à jour selon les besoins</li>
                    <li>• Bulletins/Infolettres : Publication mensuelle</li>
                    <li>• Appels d'offres : Mis à jour hebdomadairement</li>
                    <li>• Offres d'emploi : Selon les besoins de recrutement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Download className="h-5 w-5 text-green-600 mr-2" />
                    Formats disponibles
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Documents PDF pour téléchargement</li>
                    <li>• Formulaires en ligne interactifs</li>
                    <li>• Versions imprimables</li>
                    <li>• Résumés exécutifs</li>
                    <li>• Photos et vidéos haute résolution</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Abonnement aux notifications</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      Inscrivez-vous pour recevoir les alertes sur les nouvelles publications par email :
                      <a href="mailto:secretariat@fps.cd" className="underline ml-1">secretariat@fps.cd</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

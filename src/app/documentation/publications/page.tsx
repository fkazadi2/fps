"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Download, Calendar, Book, FileText, BarChart, Search } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function DocumentationPublications() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Publications du FPS"
          description="Consultez nos rapports, études, bulletins et autres publications sur la santé publique et la Couverture Santé Universelle en RDC."
          icon={FileText}
          variant="orange"
          breadcrumbs={[
            { name: "Documentation", href: "/documentation" },
            { name: "Rapports & Publications", href: "/documentation/publications" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={FileText}
          label="Savoir et Transparence : Nos Rapports et Études de Terrain"
          variant="blue"
        />

        {/* Section de filtrage */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
                    placeholder="Rechercher une publication..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Toutes les années</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Tous les types</option>
                  <option value="rapport">Rapports</option>
                  <option value="etude">Études</option>
                  <option value="bulletin">Bulletins</option>
                  <option value="guide">Guides</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Rapports Annuels */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Book className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Rapports Annuels
            </h2>
            <div className="space-y-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-fps-primary flex items-center justify-center md:w-48 h-48 text-white">
                    <div className="text-center p-6">
                      <span className="block text-lg font-semibold">Rapport Annuel</span>
                      <span className="block text-3xl font-bold mt-2">2023</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapport Annuel d'activités du FPS</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                        <Calendar className="w-3 h-3 mr-1" />
                        Avril 2024
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Ce document présente les activités, les réalisations et les défis du Fonds de Promotion de la Santé au cours de l'année 2023. Il inclut également les perspectives pour l'année 2024.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Rapport annuel
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Performance
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Bilan
                      </span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger (PDF, 4.2 MB)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-fps-secondary flex items-center justify-center md:w-48 h-48 text-white">
                    <div className="text-center p-6">
                      <span className="block text-lg font-semibold">Rapport Annuel</span>
                      <span className="block text-3xl font-bold mt-2">2022</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapport Annuel d'activités du FPS</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                        <Calendar className="w-3 h-3 mr-1" />
                        Mars 2023
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Bilan des activités et des réalisations du FPS pour l'année 2022, avec un accent sur le lancement des programmes de santé maternelle et infantile et les premiers résultats obtenus.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Rapport annuel
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Lancement
                      </span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger (PDF, 3.8 MB)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Études et Recherches */}
        <section className="py-12 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Études et Recherches
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">État des lieux de la CSU en RDC</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Déc 2023
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Cette étude analyse l'état actuel de la mise en œuvre de la Couverture Santé Universelle en République Démocratique du Congo, identifiant les progrès, les défis et les prochaines étapes.
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      CSU
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Recherche
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Analyse
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 3.8 MB)
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Impact des programmes de santé maternelle</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Fév 2024
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Étude d'impact des programmes de santé maternelle et infantile financés par le FPS dans les provinces du Kasaï et du Kivu, avec analyse des indicateurs clés et recommandations.
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Santé maternelle
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Impact
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Kasaï
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Kivu
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 2.9 MB)
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Financement innovant de la santé</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Oct 2023
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Analyse des mécanismes innovants de financement de la santé applicables au contexte de la RDC, incluant des études de cas internationaux et des recommandations adaptées.
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Financement
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Innovation
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Étude comparative
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 3.2 MB)
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Accès aux médicaments essentiels</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Août 2023
                    </span>
                  </div>
                  <p className="text-gray-600">
                    État des lieux de la chaîne d'approvisionnement des médicaments essentiels en RDC et analyse des obstacles à leur accessibilité dans les zones rurales.
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Médicaments
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Accessibilité
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Zones rurales
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 2.7 MB)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Bulletins trimestriels */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Bulletins trimestriels
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-32 bg-fps-secondary flex items-center justify-center text-white">
                  <div className="text-center">
                    <span className="block text-sm font-semibold">Bulletin T1</span>
                    <span className="block text-2xl font-bold mt-1">2024</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulletin trimestriel du FPS</h3>
                  <p className="text-gray-600 mb-4">
                    Activités et résultats du premier trimestre 2024, focus sur les programmes de l'Est.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-32 bg-fps-primary flex items-center justify-center text-white">
                  <div className="text-center">
                    <span className="block text-sm font-semibold">Bulletin T4</span>
                    <span className="block text-2xl font-bold mt-1">2023</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulletin trimestriel du FPS</h3>
                  <p className="text-gray-600 mb-4">
                    Bilan de l'année 2023 et présentation des objectifs pour l'année à venir.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-32 bg-fps-accent flex items-center justify-center text-[var(--secondary)]">
                  <div className="text-center">
                    <span className="block text-sm font-semibold">Bulletin T3</span>
                    <span className="block text-2xl font-bold mt-1">2023</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulletin trimestriel du FPS</h3>
                  <p className="text-gray-600 mb-4">
                    Activités du troisième trimestre avec focus sur les partenariats internationaux.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-5 py-2 border border-transparent text-white bg-fps-primary rounded-md hover:bg-fps-primary shadow-sm transition-colors">
                Voir tous les bulletins
              </button>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                &larr; Précédent
              </button>
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center w-8 h-8 border border-[var(--primary)] bg-fps-primary text-white rounded-md">1</button>
                <button className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">2</button>
                <button className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">3</button>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">
                Suivant &rarr;
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
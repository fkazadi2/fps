"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Download, Search, BookOpen, FileText, Users, Video } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function DocumentationRessources() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Ressources éducatives"
          description="Consultez nos guides, brochures, affiches et autres matériels éducatifs pour la promotion de la santé et la sensibilisation à la CSU."
          icon={BookOpen}
          variant="teal"
          breadcrumbs={[
            { name: "Documentation", href: "/documentation" },
            { name: "Ressources documentaires", href: "/documentation/ressources" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={BookOpen}
          label="Éducation et Sensibilisation : Outils pour une Santé Communautaire Durable"
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
                    placeholder="Rechercher une ressource..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Toutes les catégories</option>
                  <option value="guide">Guides</option>
                  <option value="brochure">Brochures</option>
                  <option value="affiche">Affiches</option>
                  <option value="video">Vidéos</option>
                </select>
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Tous les thèmes</option>
                  <option value="csu">CSU</option>
                  <option value="maternal">Santé maternelle et infantile</option>
                  <option value="prevention">Prévention</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Guides de sensibilisation */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Guides de sensibilisation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-fps-primary-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-[var(--primary)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Guide de sensibilisation communautaire</h3>
                  <p className="text-gray-600 mb-4">
                    Guide complet pour les agents de sensibilisation sur la prévention des maladies et la promotion de comportements sains.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Prévention
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Formation
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 4.5 MB)
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-fps-secondary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Manuel sur la CSU pour les professionnels de santé</h3>
                  <p className="text-gray-600 mb-4">
                    Manuel explicatif sur la Couverture Santé Universelle et son impact sur la pratique des professionnels de santé.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      CSU
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Professionnels
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 3.2 MB)
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-fps-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-[var(--secondary)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Guide pour les comités de santé communautaires</h3>
                  <p className="text-gray-600 mb-4">
                    Guide pratique pour la mise en place et le fonctionnement des comités de santé communautaires dans le cadre du FPS.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Communauté
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Participation
                    </span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger (PDF, 2.8 MB)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Brochures et dépliants */}
        <section className="py-12 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Brochures et dépliants
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="h-40 bg-fps-primary-light flex items-center justify-center rounded mb-4">
                  <FileText className="w-12 h-12 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">La CSU expliquée simplement</h3>
                <p className="text-gray-600 mb-4 text-sm h-20 overflow-hidden">
                  Brochure explicative sur la Couverture Santé Universelle, ses principes et ses avantages pour les citoyens.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="h-40 bg-fps-secondary flex items-center justify-center rounded mb-4">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Soins prénatals</h3>
                <p className="text-gray-600 mb-4 text-sm h-20 overflow-hidden">
                  Information sur l'importance des soins prénatals pour la santé de la mère et de l'enfant.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="h-40 bg-fps-accent flex items-center justify-center rounded mb-4">
                  <FileText className="w-12 h-12 text-[var(--secondary)]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vaccination des enfants</h3>
                <p className="text-gray-600 mb-4 text-sm h-20 overflow-hidden">
                  Dépliant sur le calendrier vaccinal et l'importance de la vaccination pour la santé des enfants.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="h-40 bg-fps-danger-light flex items-center justify-center rounded mb-4">
                  <FileText className="w-12 h-12 text-[var(--danger)]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutrition infantile</h3>
                <p className="text-gray-600 mb-4 text-sm h-20 overflow-hidden">
                  Guide sur l'alimentation des enfants, l'allaitement maternel et les pratiques nutritionnelles pour la santé infantile.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Affiches */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Affiches éducatives
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Les gestes barrières</h3>
                    <p className="text-sm">Affiche illustrant les mesures de prévention</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Prévention
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Format A2
                      </span>
                    </div>
                    <button className="inline-flex items-center px-3 py-1 border border-fps-primary text-fps-primary bg-white rounded-md hover:bg-fps-primary-light transition-colors text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Allaitement maternel</h3>
                    <p className="text-sm">Affiche sur les bienfaits de l'allaitement</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Nutrition
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Format A2
                      </span>
                    </div>
                    <button className="inline-flex items-center px-3 py-1 border border-fps-primary text-fps-primary bg-white rounded-md hover:bg-fps-primary-light transition-colors text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Droits des patients</h3>
                    <p className="text-sm">Affiche sur les droits des patients dans le cadre de la CSU</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        CSU
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Format A2
                      </span>
                    </div>
                    <button className="inline-flex items-center px-3 py-1 border border-fps-primary text-fps-primary bg-white rounded-md hover:bg-fps-primary-light transition-colors text-sm">
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Vidéos éducatives */}
        <section className="py-12 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Video className="w-6 h-6 mr-2 text-[var(--primary)]" />
              Vidéos éducatives
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-56 bg-gray-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                      </svg>
                    </div>
                  </div>
                  <img src="/placeholder.jpg" alt="Thumbnail" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">La CSU en RDC : Vision et mise en œuvre</h3>
                  <p className="text-gray-600 mb-4">
                    Vidéo explicative sur la vision et la stratégie de mise en œuvre de la Couverture Santé Universelle en RDC.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Durée: 8:24</span>
                    <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors">
                      Voir la vidéo
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-56 bg-gray-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                      </svg>
                    </div>
                  </div>
                  <img src="/placeholder.jpg" alt="Thumbnail" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Témoignages : Impact du FPS sur la santé communautaire</h3>
                  <p className="text-gray-600 mb-4">
                    Reportage présentant des témoignages sur l'impact des programmes du FPS sur la santé des communautés.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Durée: 12:36</span>
                    <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors">
                      Voir la vidéo
                    </button>
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
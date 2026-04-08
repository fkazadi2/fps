"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Download, Calendar, Search, Filter, BookOpen, Scale, GavelIcon } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function DocumentationTextesLegaux() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Textes légaux"
          description="Consulter les lois, décrets, arrêtés et autres textes juridiques régissant le Fonds de Promotion de la Santé et la Couverture Santé Universelle en RDC."
          icon={Scale}
          variant="slate"
          breadcrumbs={[
            { name: "Documentation", href: "/documentation" },
            { name: "Cadre Légal & Textes", href: "/documentation/textes-legaux" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Scale}
          label="Cadre Juridique et Réglementaire de la Santé en RDC"
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
                    placeholder="Rechercher un texte légal..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Toutes les années</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="older">Avant 2022</option>
                </select>
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Tous les types</option>
                  <option value="loi">Lois</option>
                  <option value="decret">Décrets</option>
                  <option value="arrete">Arrêtés</option>
                  <option value="circulaire">Circulaires</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Lois */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-[var(--primary)]" /> 
              Lois
            </h2>
            <div className="space-y-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Loi organique du FPS</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Loi N°22-002 du 27 janvier 2023</p>
                      <p className="text-gray-600 mb-4">
                        Loi portant création, organisation et fonctionnement du Fonds de Promotion de la Santé (FPS) en République Démocratique du Congo.
                      </p>
                    </div>
                    <div className="md:flex md:items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)] mr-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Jan 2023
                      </span>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Loi sur la Couverture Santé Universelle</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Loi N°21-018 du 15 décembre 2021</p>
                      <p className="text-gray-600 mb-4">
                        Loi-cadre relative à la mise en œuvre de la Couverture Santé Universelle en République Démocratique du Congo.
                      </p>
                    </div>
                    <div className="md:flex md:items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)] mr-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Déc 2021
                      </span>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Loi relative au système de santé</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Loi N°18-035 du 13 décembre 2018</p>
                      <p className="text-gray-600 mb-4">
                        Loi fixant les principes fondamentaux relatifs à l'organisation et à la promotion de la santé publique en République Démocratique du Congo.
                      </p>
                    </div>
                    <div className="md:flex md:items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)] mr-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Déc 2018
                      </span>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Décrets */}
        <section className="py-12 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Filter className="w-6 h-6 mr-2 text-[var(--primary)]" /> 
              Décrets
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 h-full">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                      <Filter className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Décret sur la CSU</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Décret N°23-012 du 15 mars 2023</p>
                  <p className="text-gray-600 mb-4">
                    Décret relatif à la mise en œuvre de la Couverture Santé Universelle en République Démocratique du Congo et définissant le panier de soins de base.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Mar 2023
                    </span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 h-full">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                      <Filter className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Décret d'application du FPS</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Décret N°23-042 du 5 juin 2023</p>
                  <p className="text-gray-600 mb-4">
                    Décret fixant les modalités d'application de la loi portant création, organisation et fonctionnement du Fonds de Promotion de la Santé.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Juin 2023
                    </span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 h-full">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                      <Filter className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Décret sur la gratuité des soins</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Décret N°22-056 du 12 décembre 2022</p>
                  <p className="text-gray-600 mb-4">
                    Décret portant mesures d'application de la gratuité des soins de santé maternelle et infantile dans le cadre de la mise en œuvre de la CSU.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Déc 2022
                    </span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 h-full">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-[var(--primary)] mr-3">
                      <Filter className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Décret sur les zones de santé</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Décret N°22-022 du 15 avril 2022</p>
                  <p className="text-gray-600 mb-4">
                    Décret fixant les normes d'organisation et de fonctionnement des zones de santé dans le cadre du renforcement du système de santé.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fps-primary-light text-[var(--primary)]">
                      <Calendar className="w-3 h-3 mr-1" />
                      Avr 2022
                    </span>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Arrêtés ministériels */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Filter className="w-6 h-6 mr-2 text-fps-primary" /> 
              Arrêtés ministériels
            </h2>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Référence</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Objet</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Télécharger</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      N°0012/CAB/MIN/SPHP/2023
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">25 juillet 2023</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Arrêté ministériel fixant les modalités de prise en charge des femmes enceintes et des nouveau-nés
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-fps-primary hover:text-fps-secondary">Télécharger</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      N°0018/CAB/MIN/SPHP/2023
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">10 septembre 2023</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Arrêté ministériel relatif à l'organisation et au fonctionnement des directions régionales du FPS
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-fps-primary hover:text-fps-secondary">Télécharger</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      N°0024/CAB/MIN/SPHP/2023
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">30 octobre 2023</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Arrêté ministériel portant sur les procédures d'allocation des subventions aux établissements de santé
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-fps-primary hover:text-fps-secondary">Télécharger</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      N°0005/CAB/MIN/SPHP/2024
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">15 février 2024</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Arrêté ministériel fixant les normes de qualité des soins de santé dans le cadre de la CSU
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-fps-primary hover:text-fps-secondary">Télécharger</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      N°0008/CAB/MIN/SPHP/2024
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">22 mars 2024</td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      Arrêté ministériel relatif au financement basé sur les résultats dans le cadre des programmes du FPS
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-fps-primary hover:text-fps-secondary">Télécharger</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Autres documents */}
        <section className="py-12 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-fps-primary" /> 
              Documents administratifs
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-fps-primary-light flex items-center justify-center text-fps-primary mr-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Manuel de procédures</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Manuel de procédures administratives, financières et comptables du Fonds de Promotion de la Santé (2023).
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-fps-secondary flex items-center justify-center text-white mr-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Règlement intérieur</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Règlement intérieur du FPS définissant les règles de fonctionnement interne de l'institution.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-fps-accent bg-opacity-20 flex items-center justify-center text-[var(--secondary)] mr-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Plan stratégique</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Plan stratégique 2023-2027 du Fonds de Promotion de la Santé approuvé par le CA.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors w-full justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
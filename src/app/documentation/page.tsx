import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Download, BookOpen } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function Documentation() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Documentation"
          description="Consultez nos publications, textes légaux et ressources éducatives liés à la promotion de la santé et la Couverture Santé Universelle en RDC."
          icon={BookOpen}
          variant="blue"
          breadcrumbs={[
            { name: "Documentation", href: "/documentation" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={BookOpen}
          label="Centre de Ressources et Documentation du FPS"
          variant="blue"
        />

        {/* Section: Publications */}
        <section id="publications" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Publications</h2>
            <div className="space-y-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-fps-primary flex items-center justify-center md:w-48 h-48 text-white">
                    <div className="text-center p-6">
                      <span className="block text-lg font-semibold">Rapport Annuel</span>
                      <span className="block text-3xl font-bold mt-2">2023</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapport Annuel d'activités du FPS</h3>
                    <p className="text-gray-600 mb-4">
                      Ce document présente les activités, les réalisations et les défis du Fonds de Promotion de la Santé au cours de l'année 2023. Il inclut également les perspectives pour l'année 2024.
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger (PDF, 4.2 MB)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-fps-secondary flex items-center justify-center md:w-48 h-48 text-white">
                    <div className="text-center p-6">
                      <span className="block text-lg font-semibold">Étude</span>
                      <span className="block text-3xl font-bold mt-2">2023</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">État des lieux de la CSU en RDC</h3>
                    <p className="text-gray-600 mb-4">
                      Cette étude analyse l'état actuel de la mise en œuvre de la Couverture Santé Universelle en République Démocratique du Congo, identifiant les progrès, les défis et les prochaines étapes.
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger (PDF, 3.8 MB)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 bg-fps-accent flex items-center justify-center md:w-48 h-48 text-[var(--secondary)]">
                    <div className="text-center p-6">
                      <span className="block text-lg font-semibold">Bulletin</span>
                      <span className="block text-3xl font-bold mt-2">2024</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Bulletin trimestriel du FPS - T1 2024</h3>
                    <p className="text-gray-600 mb-4">
                      Ce bulletin présente les activités et les résultats du premier trimestre 2024, avec un focus sur les programmes de santé maternelle et infantile dans les provinces de l'Est.
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger (PDF, 2.1 MB)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Textes légaux */}
        <section id="textes-legaux" className="py-16 bg-fps-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Textes légaux</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-fps-primary-light flex items-center justify-center text-fps-primary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Loi organique du FPS</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Loi N°22-002 du 27 janvier 2023 portant création, organisation et fonctionnement du Fonds de Promotion de la Santé.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-fps-secondary bg-opacity-10 flex items-center justify-center text-fps-secondary mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Décret sur la CSU</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Décret N°23-012 relatif à la mise en œuvre de la Couverture Santé Universelle en République Démocratique du Congo.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-fps-accent bg-opacity-20 flex items-center justify-center text-[var(--secondary)] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Arrêté ministériel</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Arrêté ministériel N°0012/CAB/MIN/SPHP/2023 fixant les modalités de prise en charge des femmes enceintes et des nouveau-nés.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-fps-danger-light flex items-center justify-center text-[var(--danger)] mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Manuel de procédures</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Manuel de procédures administratives, financières et comptables du Fonds de Promotion de la Santé (2023).
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/documentation/textes-legaux" className="inline-flex items-center px-6 py-3 border border-transparent text-white bg-fps-primary rounded-md hover:bg-fps-primary shadow-sm transition-colors">
                Voir tous les textes légaux
              </Link>
            </div>
          </div>
        </section>

        {/* Section: Ressources éducatives */}
        <section id="ressources" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ressources éducatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-primary-light flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-fps-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Guide de sensibilisation</h3>
                  <p className="text-gray-600 mb-4">
                    Guide complet pour les agents de sensibilisation communautaire sur la prévention des maladies et la promotion de comportements sains.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--danger)] rounded-md hover:bg-fps-danger-dark transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-secondary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Brochure sur la CSU</h3>
                  <p className="text-gray-600 mb-4">
                    Document explicatif sur la Couverture Santé Universelle en RDC : principes, objectifs, bénéfices et modalités d'accès.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-white bg-[var(--secondary)] rounded-md hover:bg-fps-primary transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-[var(--secondary)]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kit de formation</h3>
                  <p className="text-gray-600 mb-4">
                    Ensemble de supports pédagogiques pour la formation des personnels de santé sur la prise en charge des femmes enceintes et des nouveau-nés.
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-[var(--secondary)] bg-fps-accent bg-opacity-20 rounded-md hover:bg-fps-accent hover:text-[var(--secondary)] transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/documentation/ressources" className="inline-flex items-center px-6 py-3 border border-transparent text-white bg-fps-primary rounded-md hover:bg-fps-primary shadow-sm transition-colors">
                Voir toutes les ressources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
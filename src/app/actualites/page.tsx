import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ChevronRight, FileText, AlertCircle } from "lucide-react";
import { getArticles } from "@/lib/data/articles";

import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { Newspaper } from "lucide-react";

export const revalidate = 600; // ISR: Revalider toutes les 10 minutes

export default async function Actualites() {
  // Récupération des données dynamiques
  const allArticles = await getArticles(20); // Les 20 derniers

  const communiques = allArticles.filter(a => a.category === 'communique' || a.category === 'autre');
  const evenements = allArticles.filter(a => a.category === 'evenement');

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Actualités"
          description="Restez informé des dernières nouvelles, événements et activités du Fonds de Promotion de la Santé en RDC"
          icon={Newspaper}
          variant="blue"
          breadcrumbs={[
            { name: "Actualités", href: "/actualites" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Newspaper}
          label="Dernières Nouvelles et Communiqués du FPS"
          variant="blue"
        />

        {/* Section: Communiqués de presse */}
        <section id="communiques" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#005bb0] mb-8">Presse & Communiqués</h2>

            {communiques.length > 0 ? (
              <div className="space-y-12">
                {communiques.map((article) => (
                  <div key={article._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                    <div className="lg:flex">
                      <div className="lg:w-3/4 p-8">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{article.formattedDate || article.publishedAt}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#005bb0] transition-colors">
                          <Link href={`/actualites/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-4">
                          <Link
                            href={`/actualites/${article.slug}`}
                            className="inline-flex items-center text-[#005bb0] font-medium hover:text-[#F8C03E]"
                          >
                            Lire la suite <ChevronRight className="ml-1 w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {/* Image ou Icone si pas d'image */}
                      <div className="lg:w-1/4 bg-fps-primary-light relative min-h-[200px] lg:min-h-full">
                        {article.image ? (
                          <div className="absolute inset-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full p-8 text-center text-[#005bb0]">
                            <div>
                              <FileText className="mx-auto w-16 h-16 mb-4" />
                              <span className="block font-medium">Communiqué officiel</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Aucun communiqué publié pour le moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section: Événements */}
        <section id="evenements" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#005bb0] mb-8">Événements récents</h2>

            {evenements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {evenements.map((event) => {
                  const day = event.dayBadge || "01";
                  const month = event.monthBadge || "JAN";

                  return (
                    <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                      <div className="h-48 bg-fps-primary-light relative">
                        {/* Badge Date */}
                        <div className="absolute top-0 left-0 bg-[#e10000] text-white px-3 py-2 rounded-br-lg z-10">
                          <div className="text-center leading-tight">
                            <span className="block text-xl font-bold">{day}</span>
                            <span className="block text-sm capitalize">{month}</span>
                          </div>
                        </div>

                        {/* Image */}
                        {event.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Calendar className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">{event.formattedDate || event.publishedAt}</span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {event.excerpt}
                        </p>

                        <div className="mt-4">
                          <Link href={`/actualites/${event.slug}`} className="inline-flex items-center text-[#005bb0] font-medium hover:text-[#F8C03E]">
                            En savoir plus <ChevronRight className="ml-1 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucun événement à venir.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
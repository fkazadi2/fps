import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Calendar, ChevronRight, MapPin, Clock } from "lucide-react";
import { getArticles } from "@/lib/data/articles";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export const revalidate = 600;

export default async function Evenements() {
  const events = await getArticles(50, 'evenement');

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Événements & Agenda"
          description="Suivez l'agenda des activités et des événements du Fonds de Promotion de la Santé"
          icon={Calendar}
          variant="indigo"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" },
            { name: "Événements", href: "/centre-presse/evenements" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Calendar}
          label="Agenda Institutionnel et Manifestations du FPS"
          variant="blue"
        />

        {/* Section: Événements */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {events.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-lg font-medium text-gray-900">Aucun événement prévu</h3>
                <p className="mt-2 text-sm text-gray-500">Consulter régulièrement cette page pour ne rien manquer de notre agenda.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {events.map((event) => {
                  const day = event.dayBadge || "01";
                  const month = event.monthBadge || "JAN";

                  return (
                    <div key={event._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full transition-all hover:shadow-2xl hover:-translate-y-1">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        {event.image ? (
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--primary)] flex items-center justify-center">
                            <Calendar className="w-20 h-20 text-white opacity-20" />
                          </div>
                        )}
                        {/* Badge date */}
                        <div className="absolute top-0 left-0 bg-[var(--danger)] text-white px-4 py-2 rounded-br-2xl shadow-lg">
                          <div className="text-center">
                            <span className="block text-2xl font-bold leading-none">{day}</span>
                            <span className="block text-xs font-bold uppercase tracking-wider">{month}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3 p-6 flex flex-col">
                        <div className="mb-2">
                          <span className="px-3 py-1 bg-red-50 text-[var(--danger)] rounded-full text-xs font-bold uppercase tracking-widest">
                            Événement
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-[var(--primary)]" />
                            {event.formattedDate || event.eventStartDate}
                          </div>
                          {event.eventLocation && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-[var(--primary)]" />
                              {event.eventLocation}
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm italic">
                          {event.excerpt}
                        </p>

                        <div className="mt-auto">
                          <Link href={`/actualites/${event.slug}`} className="inline-flex items-center text-[var(--primary)] font-bold hover:text-[var(--accent)] group">
                            En savoir plus <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
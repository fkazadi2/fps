'use client';

import { CalendarDays, MapPin, Clock, ArrowRight, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Type pour les articles (événements depuis MongoDB)
type ArticleEvent = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  eventTime?: string;
  eventLocation?: string;
  createdAt: string;
  // Computed fields backend
  dayBadge?: string;
  monthBadge?: string;
  formattedDate?: string;
  eventMeta?: {
    formattedDate: string;
    time: string;
    location: string;
    isUpcoming?: boolean;
  };
};

// Images par défaut à utiliser lorsqu'aucune image n'est spécifiée
const defaultEventImages = [
  "/images/events/event-bg-01.jpg",
  "/images/events/event-bg-02.jpg",
  "/images/events/event-bg-03.jpg"
];

type EventsSectionProps = {
  events?: ArticleEvent[];
  title?: string;
  subtitle?: string;
  linkText?: string;
  linkUrl?: string;
};

export default function EventsSection({
  events = [],
  title = "Événements à venir",
  subtitle = "Participez aux prochains événements organisés par le Fonds de Promotion de la Santé",
  linkText = "Voir tous les événements",
  linkUrl = "/actualites#evenements"
}: EventsSectionProps) {
  // Fonction pour obtenir une image par défaut en fonction de l'index
  const getDefaultImage = (index: number): string => {
    return defaultEventImages[index % defaultEventImages.length];
  };

  // Les fonctions de date sont maintenant gérées par le backend via les computed fields
  // On garde des fallbacks simples au cas où
  const getDayBadge = (event: ArticleEvent) => event.dayBadge || "01";
  const getMonthBadge = (event: ArticleEvent) => event.monthBadge || "JAN";
  const getFormattedDate = (event: ArticleEvent) => event.eventMeta?.formattedDate || event.formattedDate || "Date à venir";

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-200 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-red-600 bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white" />
              Agenda
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-4">{title}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">{subtitle}</p>
        </div>

        {events.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">Aucun événement à venir pour le moment.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={event._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Image avec overlay */}
                <div className="relative h-56 bg-gradient-to-br from-red-100 to-pink-100 overflow-hidden">
                  {/* Badge de date avec design moderne */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-br from-[var(--danger)] to-red-600 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm">
                      <div className="text-center">
                        <span className="block text-2xl font-bold leading-none">{getDayBadge(event)}</span>
                        <span className="block text-sm font-medium mt-1">{getMonthBadge(event)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge catégorie */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-red-700 text-xs font-bold rounded-full shadow-md">
                      {event.category}
                    </span>
                  </div>

                  {/* Image avec effet de zoom */}
                  <Image
                    src={event.image || getDefaultImage(index)}
                    alt={event.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Overlay dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-red-700 transition-colors">
                    {event.title}
                  </h3>

                  {/* Informations avec icônes */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <CalendarDays className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{getFormattedDate(event)}</span>
                    </div>
                    {event.eventTime && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-pink-50 rounded-lg">
                          <Clock className="h-4 w-4 text-pink-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{event.eventTime}</span>
                      </div>
                    )}
                    {event.eventLocation && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{event.eventLocation}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {event.excerpt}
                  </p>

                  {/* Ligne décorative */}
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-pink-600 mb-4 transform group-hover:w-full transition-all duration-500"></div>

                  <Link
                    href={`/actualites/${event.slug}`}
                    className="inline-flex items-center gap-2 text-red-700 font-semibold group-hover:gap-3 transition-all"
                  >
                    En savoir plus
                    <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href={linkUrl}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-base font-semibold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {linkText}
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
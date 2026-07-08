"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Edit, 
  Trash2, 
  PlusCircle, 
  Search, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Tag
} from "lucide-react";

// Types pour les événements
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  status: "upcoming" | "past" | "draft";
  slug: string;
  day: string;
  month: string;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);

  // Simuler le chargement des données
  useEffect(() => {
    // Dans une implémentation réelle, ce serait un appel API
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Conférence Nationale sur la CSU",
        description: "Conférence nationale rassemblant les acteurs clés de la santé pour faire le point sur les avancées de la CSU en RDC et définir les prochaines priorités stratégiques.",
        date: "26-27 mai 2024",
        time: "09:00 - 17:00",
        location: "Hôtel Pullman, Kinshasa",
        category: "Conférence",
        imageUrl: "/images/evenements/conference-csu.jpg",
        status: "upcoming",
        slug: "/actualites/evenements/conference-nationale-csu",
        day: "26",
        month: "Mai"
      },
      {
        id: "2",
        title: "Atelier de formation des agents de santé",
        description: "Formation destinée aux agents de santé sur les protocoles de prise en charge des femmes enceintes et des nouveau-nés dans le cadre du programme de gratuité des soins.",
        date: "15-19 juin 2024",
        time: "08:30 - 16:00",
        location: "Centre de formation INRB, Kinshasa",
        category: "Formation",
        imageUrl: "/images/evenements/formation-agents.jpg",
        status: "upcoming",
        slug: "/actualites/evenements/atelier-formation-agents",
        day: "15",
        month: "Juin"
      },
      {
        id: "3",
        title: "Inauguration du Centre de santé modèle FPS",
        description: "Cérémonie d'inauguration du nouveau centre de santé modèle financé par le FPS pour servir de référence en matière de qualité des soins et de mise en œuvre de la CSU.",
        date: "10 juillet 2024",
        time: "10:00 - 12:30",
        location: "Quartier Binza, Kinshasa",
        category: "Inauguration",
        imageUrl: "/images/evenements/inauguration-centre.jpg",
        status: "upcoming",
        slug: "/actualites/evenements/inauguration-centre",
        day: "10",
        month: "Juil"
      },
      {
        id: "4",
        title: "Atelier sur les réformes du financement de la santé",
        description: "Atelier rassemblant les experts nationaux et internationaux pour discuter des réformes du financement de la santé en RDC.",
        date: "25 juillet 2024",
        time: "09:00 - 16:30",
        location: "Ministère de la Santé, Kinshasa",
        category: "Atelier",
        imageUrl: "/images/evenements/atelier-reformes.jpg",
        status: "draft",
        slug: "/actualites/evenements/atelier-reformes",
        day: "25",
        month: "Juil"
      },
      {
        id: "5",
        title: "Forum sur le financement de la santé",
        description: "Forum de discussion sur les stratégies de financement de la santé en République Démocratique du Congo, avec des experts nationaux et internationaux.",
        date: "15 mars 2024",
        time: "09:00 - 17:00",
        location: "Ministère de la Santé, Kinshasa",
        category: "Conférence",
        imageUrl: "/images/evenements/forum-financement.jpg",
        status: "past",
        slug: "/actualites/evenements/forum-financement",
        day: "15",
        month: "Mars"
      },
      {
        id: "6",
        title: "Consultation communautaire sur la CSU",
        description: "Consultation avec les communautés locales sur la mise en œuvre de la Couverture Santé Universelle dans la province du Kongo Central.",
        date: "10 janvier 2024",
        time: "10:00 - 15:00",
        location: "Matadi, Kongo Central",
        category: "Atelier",
        imageUrl: "/images/evenements/consultation-matadi.jpg",
        status: "past",
        slug: "/actualites/evenements/consultation-matadi",
        day: "10",
        month: "Jan"
      }
    ];
    
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 800);
  }, []);

  // Filtrer les événements en fonction du terme de recherche et du statut
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculer le nombre total de pages pour la pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  
  // Obtenir les événements pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fonction de suppression (simulée)
  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  // Fonction pour obtenir les classes du statut
  const getStatusClasses = (status: "upcoming" | "past" | "draft") => {
    switch(status) {
      case "upcoming": return "bg-green-100 text-green-800";
      case "past": return "bg-gray-100 text-gray-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      default: return "";
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: "upcoming" | "past" | "draft") => {
    switch(status) {
      case "upcoming": return "À venir";
      case "past": return "Passé";
      case "draft": return "Brouillon";
      default: return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des événements</h1>
        <Link
          href="/admin/events/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvel événement
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex-shrink-0">
              <select
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="upcoming">À venir</option>
                <option value="past">Passés</option>
                <option value="draft">Brouillons</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-600 mb-4"></div>
            <p className="text-gray-600">Chargement des événements...</p>
          </div>
        ) : (
          <>
            {currentItems.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {currentItems.map((event) => (
                  <div key={event.id} className="bg-white border rounded-lg shadow overflow-hidden flex flex-col">
                    <div className="flex md:flex-row flex-col">
                      <div className="md:w-1/3 relative h-48 md:h-auto">
                        <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-2 rounded-br-lg z-10">
                          <div className="text-center">
                            <span className="block text-xl font-bold">{event.day}</span>
                            <span className="block text-sm">{event.month}</span>
                          </div>
                        </div>
                        {event.imageUrl ? (
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400">
                            <Calendar className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-2/3 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(event.status)}`}>
                            {getStatusLabel(event.status)}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {event.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        
                        <div className="space-y-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Link
                          href={event.slug}
                          target="_blank"
                          className="p-1.5 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          title="Voir l'événement"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/events/edit/${event.id}`}
                          className="p-1.5 rounded-full text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                          title="Modifier l'événement"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-1.5 rounded-full text-red-600 hover:text-red-900 hover:bg-red-50"
                          title="Supprimer l'événement"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Link
                        href={`/admin/events/edit/${event.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Modifier
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600">Aucun événement trouvé</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 flex items-center justify-center border-t border-gray-200">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 
                        ? "text-gray-300" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === index + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } text-sm font-medium`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages 
                        ? "text-gray-300" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 
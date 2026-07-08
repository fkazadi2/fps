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
  CheckCircle2
} from "lucide-react";

// Types pour les programmes
interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  activities: string[];
  status: "active" | "planned" | "completed";
  slug: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  beneficiaries?: string;
}

export default function ProgrammesAdminPage() {
  const [programmes, setProgrammes] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  // Simuler le chargement des données
  useEffect(() => {
    // Dans une implémentation réelle, ce serait un appel API
    const mockProgrammes: Program[] = [
      {
        id: "1",
        title: "Éducation sanitaire et sensibilisation",
        description: "Programmes de sensibilisation et d'éducation pour améliorer les connaissances en matière de santé et promouvoir des comportements sains.",
        image: "/images/placeholder.jpg",
        activities: [
          "Campagnes d'information sur les maladies courantes",
          "Ateliers communautaires sur la santé",
          "Programmes scolaires d'éducation sanitaire",
          "Développement de matériels éducatifs adaptés"
        ],
        status: "active",
        slug: "/programmes/education-sanitaire",
        startDate: "2023-01-01",
        budget: "500,000 USD",
        beneficiaries: "Population générale"
      },
      {
        id: "2",
        title: "Prévention des maladies",
        description: "Initiatives visant à prévenir la propagation des maladies infectieuses et à réduire l'incidence des maladies non transmissibles.",
        image: "/images/placeholder.jpg",
        activities: [
          "Campagnes de vaccination",
          "Programmes de dépistage précoce",
          "Initiatives de lutte contre les maladies vectorielles",
          "Sensibilisation aux facteurs de risque des maladies chroniques"
        ],
        status: "active",
        slug: "/programmes/prevention-maladies",
        startDate: "2023-03-15",
        budget: "750,000 USD",
        beneficiaries: "Zones à risque sanitaire élevé"
      },
      {
        id: "3",
        title: "Promotion de la santé maternelle et infantile",
        description: "Programmes dédiés à l'amélioration de la santé des femmes enceintes, des mères et des enfants.",
        image: "/images/placeholder.jpg",
        activities: [
          "Éducation sur les soins prénatals",
          "Promotion de l'allaitement maternel",
          "Suivi de la croissance et du développement de l'enfant",
          "Sensibilisation à la nutrition infantile"
        ],
        status: "active",
        slug: "/programmes/sante-maternelle-infantile",
        startDate: "2023-02-10",
        budget: "600,000 USD",
        beneficiaries: "Femmes enceintes et jeunes enfants"
      },
      {
        id: "4",
        title: "Renforcement des capacités communautaires",
        description: "Initiatives visant à renforcer les capacités des communautés pour qu'elles puissent prendre en charge leur propre santé.",
        image: "/images/placeholder.jpg",
        activities: [
          "Formation des agents de santé communautaires",
          "Soutien aux groupes d'entraide",
          "Développement de projets communautaires",
          "Mobilisation communautaire pour la santé"
        ],
        status: "planned",
        slug: "/programmes/capacites-communautaires",
        startDate: "2024-07-01",
        budget: "450,000 USD",
        beneficiaries: "Communautés rurales"
      },
      {
        id: "5",
        title: "Programme de lutte contre le paludisme",
        description: "Initiative nationale visant à réduire l'incidence du paludisme dans les zones à forte prévalence.",
        image: "/images/placeholder.jpg",
        activities: [
          "Distribution de moustiquaires imprégnées d'insecticide",
          "Pulvérisation intradomiciliaire d'insecticides",
          "Formation des agents de santé au diagnostic et traitement",
          "Campagnes de sensibilisation communautaire"
        ],
        status: "active",
        slug: "/programmes/lutte-paludisme",
        startDate: "2023-04-15",
        endDate: "2025-04-14",
        budget: "1,200,000 USD",
        beneficiaries: "Zones endémiques de paludisme"
      },
      {
        id: "6",
        title: "Programme de nutrition scolaire",
        description: "Programme visant à améliorer l'état nutritionnel des enfants d'âge scolaire pour favoriser leur développement et leurs performances académiques.",
        image: "/images/placeholder.jpg",
        activities: [
          "Repas scolaires nutritifs",
          "Éducation nutritionnelle pour les élèves et les parents",
          "Jardins scolaires",
          "Suivi de l'état nutritionnel des enfants"
        ],
        status: "completed",
        slug: "/programmes/nutrition-scolaire",
        startDate: "2022-09-01",
        endDate: "2023-12-31",
        budget: "350,000 USD",
        beneficiaries: "Écoles primaires en zones défavorisées"
      }
    ];
    
    setTimeout(() => {
      setProgrammes(mockProgrammes);
      setLoading(false);
    }, 800);
  }, []);

  // Filtrer les programmes en fonction du terme de recherche et du statut
  const filteredProgrammes = programmes.filter(programme => {
    const matchesSearch = programme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       programme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || programme.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculer le nombre total de pages pour la pagination
  const totalPages = Math.ceil(filteredProgrammes.length / itemsPerPage);
  
  // Obtenir les programmes pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProgrammes.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fonction de suppression (simulée)
  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) {
      setProgrammes(programmes.filter(programme => programme.id !== id));
    }
  };

  // Fonction pour obtenir les classes du statut
  const getStatusClasses = (status: "active" | "planned" | "completed") => {
    switch(status) {
      case "active": return "bg-green-100 text-green-800";
      case "planned": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "";
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: "active" | "planned" | "completed") => {
    switch(status) {
      case "active": return "Actif";
      case "planned": return "Planifié";
      case "completed": return "Terminé";
      default: return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des programmes</h1>
        <Link
          href="/admin/programmes/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouveau programme
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
                placeholder="Rechercher un programme..."
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
                <option value="active">Actifs</option>
                <option value="planned">Planifiés</option>
                <option value="completed">Terminés</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-600 mb-4"></div>
            <p className="text-gray-600">Chargement des programmes...</p>
          </div>
        ) : (
          <>
            {currentItems.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {currentItems.map((programme) => (
                  <div key={programme.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/4">
                        <div className="relative h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                          {programme.image ? (
                            <Image
                              src={programme.image}
                              alt={programme.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-gray-400">Image non disponible</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="lg:w-3/4 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <h2 className="text-xl font-semibold text-gray-900">{programme.title}</h2>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(programme.status)}`}>
                            {getStatusLabel(programme.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{programme.description}</p>
                        
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Activités principales :</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {programme.activities.map((activity, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          {programme.startDate && (
                            <div>
                              <span className="font-medium">Début :</span> {programme.startDate}
                            </div>
                          )}
                          {programme.endDate && (
                            <div>
                              <span className="font-medium">Fin :</span> {programme.endDate}
                            </div>
                          )}
                          {programme.budget && (
                            <div>
                              <span className="font-medium">Budget :</span> {programme.budget}
                            </div>
                          )}
                          {programme.beneficiaries && (
                            <div>
                              <span className="font-medium">Bénéficiaires :</span> {programme.beneficiaries}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-auto pt-4 border-t">
                          <div className="flex space-x-2">
                            <Link
                              href={programme.slug}
                              target="_blank"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              title="Voir le programme"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </Link>
                            <Link
                              href={`/admin/programmes/edit/${programme.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                              title="Modifier le programme"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Link>
                            <button
                              onClick={() => handleDelete(programme.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm leading-5 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                              title="Supprimer le programme"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600">Aucun programme trouvé</p>
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
"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  MessageCircle,
  CheckCircle,
  Filter,
  X
} from "lucide-react";

// Types pour les messages
interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  status: "new" | "in_progress" | "resolved" | "spam";
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Simuler le chargement des données
  useEffect(() => {
    // Dans une implémentation réelle, ce serait un appel API
    const mockMessages: Message[] = [
      {
        id: "1",
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        phone: "+243 999 123 456",
        subject: "Demande d'informations sur le programme de financement",
        message: "Bonjour,\n\nJe souhaiterais obtenir plus d'informations sur les critères d'éligibilité pour bénéficier du programme de financement pour les centres de santé communautaires. Notre centre est situé à Kinshasa et nous souhaiterions améliorer nos services.\n\nMerci d'avance pour votre réponse.\n\nCordialement,\nJean Dupont",
        date: "2024-05-02 09:45",
        isRead: false,
        status: "new"
      },
      {
        id: "2",
        name: "Marie Kabange",
        email: "marie.k@example.com",
        phone: "+243 998 765 432",
        subject: "Candidature spontanée",
        message: "Madame, Monsieur,\n\nTitulaire d'un master en santé publique, je souhaite postuler pour rejoindre votre équipe. Je suis particulièrement intéressée par les programmes de sensibilisation que vous menez dans les zones rurales.\n\nVous trouverez mon CV en pièce jointe.\n\nCordialement,\nMarie Kabange",
        date: "2024-05-01 15:30",
        isRead: true,
        status: "resolved"
      },
      {
        id: "3",
        name: "Pierre Mutombo",
        email: "pierre.m@example.com",
        subject: "Proposition de partenariat",
        message: "Bonjour,\n\nNotre ONG travaille dans le domaine de la santé maternelle et infantile. Nous souhaiterions discuter d'un possible partenariat avec le FPS pour étendre nos activités dans la province du Kasaï.\n\nPouvons-nous organiser une réunion pour en discuter davantage ?\n\nCordialement,\nPierre Mutombo\nDirecteur ONG Santé pour Tous",
        date: "2024-04-30 11:20",
        isRead: true,
        status: "in_progress"
      },
      {
        id: "4",
        name: "Sophie Nzuzi",
        email: "sophie.n@example.com",
        phone: "+243 997 345 678",
        subject: "Problème d'accès à la documentation",
        message: "Bonjour,\n\nJ'essaie d'accéder aux documents sur la politique de santé publique sur votre site, mais le lien semble être brisé. Pourriez-vous résoudre ce problème ou m'envoyer directement les documents ?\n\nMerci,\nSophie Nzuzi",
        date: "2024-04-28 14:15",
        isRead: false,
        status: "new"
      },
      {
        id: "5",
        name: "David Lemba",
        email: "david.l@example.com",
        subject: "Demande d'interview pour article de presse",
        message: "Bonjour,\n\nJe suis journaliste au Journal de Kinshasa et je prépare un article sur le financement de la santé en RDC. Je souhaiterais interviewer un représentant du FPS sur les avancées et défis dans ce domaine.\n\nSerait-il possible d'organiser cet entretien dans les prochains jours ?\n\nCordialement,\nDavid Lemba\nJournaliste",
        date: "2024-04-25 10:05",
        isRead: true,
        status: "resolved"
      },
      {
        id: "6",
        name: "Spammer XYZ",
        email: "spam@example.com",
        subject: "Opportunité commerciale exclusive !!!",
        message: "OPPORTUNITÉ INCROYABLE POUR GAGNER DES MILLIONS !!! CONTACTEZ-NOUS MAINTENANT !!!",
        date: "2024-04-24 22:40",
        isRead: true,
        status: "spam"
      },
      {
        id: "7",
        name: "Claire Mbombo",
        email: "claire.m@example.com",
        phone: "+243 995 456 789",
        subject: "Question sur l'événement du 15 mai",
        message: "Bonjour,\n\nJe souhaite participer à la conférence sur la Couverture Santé Universelle prévue le 15 mai. Est-ce que l'inscription est encore ouverte ? Si oui, comment puis-je m'inscrire ?\n\nMerci,\nClaire Mbombo",
        date: "2024-04-22 09:30",
        isRead: true,
        status: "resolved"
      },
      {
        id: "8",
        name: "Thomas Kalala",
        email: "thomas.k@example.com",
        subject: "Rapport d'anomalie sur le site web",
        message: "Bonjour,\n\nJ'ai remarqué que certains liens sur votre page 'Programmes' ne fonctionnent pas correctement. Notamment, le lien vers la description du programme de lutte contre le paludisme renvoie à une page d'erreur.\n\nCordialement,\nThomas Kalala",
        date: "2024-04-20 16:15",
        isRead: false,
        status: "new"
      },
      {
        id: "9",
        name: "Isabelle Kashama",
        email: "isabelle.k@example.com",
        phone: "+243 994 567 890",
        subject: "Remerciements pour le soutien au centre de santé",
        message: "Cher FPS,\n\nJe tiens à vous remercier pour le soutien que vous avez apporté à notre centre de santé à Lubumbashi. Grâce à votre financement, nous avons pu améliorer significativement la qualité des soins offerts aux mères et aux enfants.\n\nBien cordialement,\nIsabelle Kashama\nDirectrice du Centre de Santé Maternelle de Lubumbashi",
        date: "2024-04-18 11:05",
        isRead: true,
        status: "resolved"
      },
      {
        id: "10",
        name: "Robert Lumumba",
        email: "robert.l@example.com",
        subject: "Demande de documentation sur les procédures de financement",
        message: "Bonjour,\n\nNotre association souhaite soumettre une demande de financement pour un projet de sensibilisation à l'hygiène dans les écoles rurales. Pourriez-vous nous envoyer la documentation détaillée sur les procédures à suivre et les critères d'évaluation ?\n\nMerci d'avance,\nRobert Lumumba\nCoordinateur de projets",
        date: "2024-04-15 14:40",
        isRead: true,
        status: "in_progress"
      }
    ];
    
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  }, []);

  // Filtrer les messages en fonction du terme de recherche et du statut
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculer le nombre total de pages pour la pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  
  // Obtenir les messages pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fonction pour marquer un message comme lu
  const markAsRead = (id: string) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, isRead: true } : message
    ));
  };

  // Fonction pour changer le statut d'un message
  const changeStatus = (id: string, status: "new" | "in_progress" | "resolved" | "spam") => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, status } : message
    ));
  };

  // Fonction pour supprimer un message
  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null);
    }
  };

  // Fonction pour supprimer les messages sélectionnés
  const deleteSelected = () => {
    setMessages(prev => prev.filter(message => !selectedIds.includes(message.id)));
    setSelectedIds([]);
    if (selectedMessage && selectedIds.includes(selectedMessage.id)) {
      setSelectedMessage(null);
    }
  };

  // Fonction pour afficher les détails d'un message
  const viewMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  // Fonction pour fermer les détails d'un message
  const closeMessage = () => {
    setSelectedMessage(null);
  };

  // Fonction pour basculer la sélection d'un message
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(messageId => messageId !== id)
        : [...prev, id]
    );
  };

  // Fonction pour sélectionner/désélectionner tous les messages
  const toggleSelectAll = () => {
    if (selectedIds.length === currentItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentItems.map(message => message.id));
    }
  };

  // Fonction pour obtenir les classes de statut
  const getStatusClasses = (status: "new" | "in_progress" | "resolved" | "spam") => {
    switch(status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "in_progress": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "spam": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: "new" | "in_progress" | "resolved" | "spam") => {
    switch(status) {
      case "new": return "Nouveau";
      case "in_progress": return "En cours";
      case "resolved": return "Résolu";
      case "spam": return "Spam";
      default: return status;
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>

      <div className="flex h-[calc(100vh-12rem)] bg-white shadow rounded-lg overflow-hidden">
        {/* Liste des messages */}
        <div className={`w-full ${selectedMessage ? "hidden md:block md:w-2/5" : "w-full"} border-r`}>
          <div className="p-4 border-b">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Rechercher dans les messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                    onChange={toggleSelectAll}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {selectedIds.length > 0 ? `${selectedIds.length} sélectionné(s)` : "Tout sélectionner"}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {selectedIds.length > 0 && (
                    <button
                      onClick={deleteSelected}
                      className="inline-flex items-center p-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  
                  <select
                    className="block py-1.5 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="new">Nouveaux</option>
                    <option value="in_progress">En cours</option>
                    <option value="resolved">Résolus</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-600 mb-4"></div>
              <p className="text-gray-600">Chargement des messages...</p>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 6rem)" }}>
                {currentItems.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {currentItems.map((message) => (
                      <li 
                        key={message.id}
                        className={`cursor-pointer ${message.isRead ? "bg-white" : "bg-blue-50"} hover:bg-gray-50 ${selectedMessage && selectedMessage.id === message.id ? "bg-gray-100" : ""}`}
                        onClick={() => viewMessage(message)}
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-2">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 rounded mt-1"
                                checked={selectedIds.includes(message.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleSelect(message.id);
                                }}
                              />
                              <div>
                                <h3 className={`text-sm font-medium ${message.isRead ? "text-gray-900" : "text-blue-700 font-semibold"}`}>
                                  {message.name}
                                </h3>
                                <p className="text-sm font-medium text-gray-900 truncate">{message.subject}</p>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-1">{message.message}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <p className="text-xs text-gray-500">{message.date.split(' ')[0]}</p>
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(message.status)}`}>
                                {getStatusLabel(message.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">Aucun message trouvé</p>
                  </div>
                )}
              </div>

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

        {/* Détails du message */}
        {selectedMessage && (
          <div className="w-full md:w-3/5 h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={closeMessage}
                  className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 mr-2"
                >
                  <ArrowUpRight className="h-5 w-5 transform rotate-180" />
                </button>
                <h2 className="text-lg font-medium text-gray-900">{selectedMessage.subject}</h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xl font-medium text-gray-900">{selectedMessage.name}</p>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{selectedMessage.email}</span>
                  </div>
                  {selectedMessage.phone && (
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedMessage.date}</span>
                  </div>
                  <div className="mt-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => changeStatus(selectedMessage.id, e.target.value as any)}
                      className={`mt-1 block py-1 px-2 text-sm border rounded-md ${getStatusClasses(selectedMessage.status)}`}
                    >
                      <option value="new">Nouveau</option>
                      <option value="in_progress">En cours</option>
                      <option value="resolved">Résolu</option>
                      <option value="spam">Spam</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex-grow overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-gray-800">{selectedMessage.message}</pre>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-4">
                <button
                  onClick={() => changeStatus(selectedMessage.id, "resolved")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer comme résolu
                </button>
                
                <button
                  onClick={() => changeStatus(selectedMessage.id, "spam")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Marquer comme spam
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
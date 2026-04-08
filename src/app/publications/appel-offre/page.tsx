import { FileText, Download, Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Link from "next/link";

export default function AppelOffrePage() {
  const appelOffres = [
    {
      id: 1,
      titre: "Fourniture de médicaments essentiels pour les centres de santé",
      reference: "AO/FPS/2024/001",
      datePublication: "15 Janvier 2024",
      dateLimite: "28 Février 2024",
      statut: "Ouvert",
      montant: "2,500,000 USD",
      lieu: "Kinshasa, RDC",
      description: "Appel d'offres pour la fourniture de médicaments essentiels destinés aux centres de santé partenaires du FPS dans 5 provinces prioritaires."
    },
    {
      id: 2,
      titre: "Acquisition d'équipements médicaux pour hôpitaux généraux",
      reference: "AO/FPS/2024/002",
      datePublication: "22 Janvier 2024",
      dateLimite: "15 Mars 2024",
      statut: "Ouvert",
      montant: "1,800,000 USD",
      lieu: "Lubumbashi, RDC",
      description: "Fourniture et installation d'équipements médicaux modernes pour 12 hôpitaux généraux de référence."
    },
    {
      id: 3,
      titre: "Services de formation du personnel de santé",
      reference: "AO/FPS/2024/003",
      datePublication: "05 Février 2024",
      dateLimite: "20 Mars 2024",
      statut: "Ouvert",
      montant: "450,000 USD",
      lieu: "Goma, RDC",
      description: "Prestation de services de formation continue pour le personnel de santé dans les provinces du Nord et Sud-Kivu."
    },
    {
      id: 4,
      titre: "Construction d'un centre de santé moderne",
      reference: "AO/FPS/2023/045",
      datePublication: "10 Décembre 2023",
      dateLimite: "25 Janvier 2024",
      statut: "Fermé",
      montant: "850,000 USD",
      lieu: "Mbuji-Mayi, RDC",
      description: "Construction clé en main d'un centre de santé moderne avec équipements complets dans la province du Kasaï-Oriental."
    }
  ];

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Appel d'offres"
          description="Consulter tous les appels d'offres en cours et passés du FPS pour participer à nos projets de développement sanitaire"
          icon={FileText}
          variant="rose"
          breadcrumbs={[
            { name: "Publications", href: "/publications" },
            { name: "Appels d'offres", href: "/publications/appel-offre" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={FileText}
          label="Passation de Marchés et Collaboration Institutionnelle"
          variant="purple"
        />

        {/* Filtres et statistiques */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">Appels d'offres disponibles</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {appelOffres.filter(ao => ao.statut === "Ouvert").length} ouverts
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Tous
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Ouverts
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Fermés
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Appels ouverts</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">5.75M</div>
                <div className="text-sm text-gray-600">USD en cours</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">45</div>
                <div className="text-sm text-gray-600">Jours restants</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Soumissions reçues</div>
              </div>
            </div>
          </div>

          {/* Liste des appels d'offres */}
          <div className="space-y-6">
            {appelOffres.map((ao) => (
              <div key={ao.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{ao.titre}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${ao.statut === "Ouvert"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                          }`}>
                          {ao.statut}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{ao.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>{ao.reference}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Publié: {ao.datePublication}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Limite: {ao.dateLimite}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{ao.lieu}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{ao.montant}</div>
                      <div className="space-y-2">
                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </button>
                        <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section informations pratiques */}
        <div className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment participer ?</h2>
              <p className="text-gray-600">Guide étape par étape pour soumissionner</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Télécharger le dossier</h3>
                <p className="text-gray-600">Téléchargez le dossier d'appel d'offres complet avec tous les documents requis</p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Préparer votre offre</h3>
                <p className="text-gray-600">Constituez votre dossier selon les critères spécifiés dans le cahier des charges</p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Soumettre avant la limite</h3>
                <p className="text-gray-600">Déposez votre offre avant la date limite à l'adresse indiquée</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-white rounded-lg p-6 inline-block">
                <h3 className="text-lg font-semibold mb-2">Besoin d'aide ?</h3>
                <p className="text-gray-600 mb-4">Contactez notre service des marchés publics</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span>📧 marches@fps.cd</span>
                  <span>📞 +243 819 115 812</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function EvenementsContactPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Événements"
          description="Participez à nos événements, conférences et rencontres sur la santé publique"
          icon={Calendar}
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" },
            { name: "Événements", href: "/contacts/evenements" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Calendar}
          label="Agenda des Conférences et Rencontres Professionnelles du FPS"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Événements à venir */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-8">Événements à venir</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-fps-primary mr-3" />
                  <span className="bg-fps-primary text-white px-3 py-1 rounded-full text-sm">À venir</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Conférence sur la Couverture Santé Universelle
                </h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>15 Mars 2024 - 09h00 à 17h00</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Hôtel Memling, Kinshasa</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>200 participants attendus</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Rencontre avec les acteurs de la santé pour discuter des avancées 
                  et défis de la CSU en RDC.
                </p>
                <button className="bg-fps-primary text-white px-6 py-2 rounded-md hover:bg-fps-secondary transition-colors">
                  S&apos;inscrire
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-fps-primary mr-3" />
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">Bientôt</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Atelier Médecine Traditionnelle
                </h3>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>22 Mars 2024 - 08h00 à 16h00</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Université de Kinshasa</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>100 participants</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Formation sur l&apos;intégration de la médecine traditionnelle 
                  dans le système de santé moderne.
                </p>
                <button className="bg-fps-primary text-white px-6 py-2 rounded-md hover:bg-fps-secondary transition-colors">
                  S&apos;inscrire
                </button>
              </div>
            </div>
          </div>

          {/* Événements récents */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-8">Événements récents</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">Terminé</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Célébration 23ème Journée Mondiale de la Santé
                </h3>
                <p className="text-sm text-gray-600 mb-2">7 Avril 2024</p>
                <p className="text-sm text-gray-700">
                  Événement de sensibilisation sur l&apos;importance de la santé publique.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">Terminé</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Lancement Programme Ambulances
                </h3>
                <p className="text-sm text-gray-600 mb-2">15 Février 2024</p>
                <p className="text-sm text-gray-700">
                  Inauguration officielle du système d&apos;ambulances à Kinshasa.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">Terminé</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Formation Transfusion Sanguine
                </h3>
                <p className="text-sm text-gray-600 mb-2">28 Janvier 2024</p>
                <p className="text-sm text-gray-700">
                  Session de formation pour 139 prestataires de santé.
                </p>
              </div>
            </div>
          </div>

          {/* Inscription aux événements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">S&apos;inscrire aux événements</h3>
            <p className="text-blue-700 mb-6">
              Restez informé de nos prochains événements et inscrivez-vous pour participer 
              aux discussions sur l&apos;avenir de la santé en RDC.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Types d&apos;événements</h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• Conférences nationales</li>
                  <li>• Ateliers de formation</li>
                  <li>• Séminaires techniques</li>
                  <li>• Rencontres partenaires</li>
                  <li>• Journées portes ouvertes</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Comment s&apos;inscrire</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">1</div>
                    <span className="text-blue-700">Consulter le calendrier</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">2</div>
                    <span className="text-blue-700">Cliquez sur &quot;S&apos;inscrire&quot;</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">3</div>
                    <span className="text-blue-700">Remplissez le formulaire</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">4</div>
                    <span className="text-blue-700">Recevez la confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
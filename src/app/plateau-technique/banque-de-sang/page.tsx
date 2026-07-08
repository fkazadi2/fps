import { Droplets, Users, Activity, DollarSign, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function BanqueDeSangPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Banque de sang"
          description="Formation aux bonnes pratiques transfusionnelles et campagnes de collecte de sang pour sauver des vies"
          icon={Droplets}
          variant="red"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Banque de sang", href: "/plateau-technique/banque-de-sang" }
          ]}
          backgroundImage="/images/banners/plateau-technique/banner-banque-sang.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Droplets}
          label="Collecte et Sécurisation des Dons de Sang"
          variant="red"
          image="/images/featured-images/plateau-technique/featured-banque-sang.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Réalisations chiffrées */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Réalisations à mi-parcours (2023-2024)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">139</h3>
                <p className="text-blue-700">Prestataires formés aux bonnes pratiques</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <Activity className="h-10 w-10 text-red-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-red-800 mb-2">155</h3>
                <p className="text-red-700">Campagnes de collecte réalisées</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">920K USD</h3>
                <p className="text-green-700">Budget total disponible</p>
                <p className="text-sm text-green-600 mt-1">168 850 USD déjà déboursés</p>
              </div>
            </div>
          </div>

          {/* Formations transfusionnelles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Formations aux bonnes pratiques transfusionnelles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">Modules de formation</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Techniques de collecte sécurisées
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tests de dépistage et analyses
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Conservation et stockage
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Procédures de transfusion
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Gestion des réactions transfusionnelles
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">Public cible</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Personnel médical</p>
                      <p className="text-sm text-gray-600">Médecins, infirmiers spécialisés</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Techniciens de laboratoire</p>
                      <p className="text-sm text-gray-600">Spécialistes en analyses sanguines</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Coordonnateurs</p>
                      <p className="text-sm text-gray-600">Gestionnaires de banques de sang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campagnes de collecte */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Campagnes de collecte de sang</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-red-800 mb-4">155 campagnes déjà réalisées</h3>
                <p className="text-red-700">
                  Des milliers de poches de sang collectées pour répondre aux besoins urgents des établissements de santé
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-red-800 mb-2">Zones urbaines</h4>
                  <p className="text-red-600">Kinshasa, Lubumbashi, Goma</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-red-800 mb-2">Zones rurales</h4>
                  <p className="text-red-600">Provinces prioritaires CSU</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-red-800 mb-2">Centres universitaires</h4>
                  <p className="text-red-600">Mobilisation étudiante</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact et objectifs */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact et objectifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Réduction de la mortalité</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Disponibilité accrue de sang sécurisé</li>
                  <li>• Réduction des hémorragies post-partum</li>
                  <li>• Meilleure prise en charge des urgences</li>
                  <li>• Transfusions sûres et efficaces</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Objectifs 2024-2025</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Former 200 prestataires supplémentaires</li>
                  <li>• Organiser 100 nouvelles campagnes</li>
                  <li>• Équiper 50 banques de sang</li>
                  <li>• Couvrir toutes les provinces</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
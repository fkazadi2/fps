import { Building, MapPin, TrendingUp, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function InfrastructuresPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Infrastructures sanitaires"
          description="Réhabilitation et construction de centres de santé, hôpitaux et structures sanitaires aux normes pour une couverture universelle"
          icon={Building}
          variant="orange"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Infrastructures", href: "/plateau-technique/infrastructures" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Building}
          label="Chantiers et Infrastructures de Santé en RDC"
          variant="blue"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* État actuel des infrastructures */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">État actuel des infrastructures en RDC</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Building className="h-10 w-10 text-blue-600 mb-3" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">13 316</h3>
                <p className="text-blue-700 mb-2">Centres de Santé</p>
                <p className="text-sm text-blue-600">Seulement 2 500 aux normes (19%)</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <Building className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">433</h3>
                <p className="text-green-700">Hôpitaux Généraux de Référence</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <Building className="h-10 w-10 text-purple-600 mb-3" />
                <h3 className="text-2xl font-bold text-purple-800 mb-2">649</h3>
                <p className="text-purple-700">Centres Hospitaliers</p>
              </div>
            </div>
          </div>

          {/* Défis majeurs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Défis majeurs identifiés</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-yellow-800">Concentration urbaine</h3>
                </div>
                <p className="text-yellow-700 mb-4">
                  <strong>60% des structures privées lucratives</strong> sont concentrées à Kinshasa, créant une inégalité d&apos;accès majeure.
                </p>
                <ul className="space-y-2 text-yellow-600">
                  <li>• Zones rurales sous-desservies</li>
                  <li>• Difficultés d&apos;accès aux soins spécialisés</li>
                  <li>• Coûts de transport prohibitifs</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-red-800">Zones prioritaires</h3>
                </div>
                <p className="text-red-700 mb-4">
                  <strong>36 zones de santé</strong> nécessitent une réhabilitation ou construction urgente d&apos;infrastructures.
                </p>
                <ul className="space-y-2 text-red-600">
                  <li>• Bâtiments vétustes ou endommagés</li>
                  <li>• Manque d&apos;équipements de base</li>
                  <li>• Absence d&apos;électricité/eau potable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Plan d'action */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Plan d&apos;action du FPS</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-fps-primary text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                  <h3 className="text-xl font-semibold text-fps-primary ml-4">Réhabilitation prioritaire</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Mise aux normes des 2 500 centres de santé existants avec financement ciblé.
                </p>
                <ul className="space-y-1 text-gray-600 ml-14">
                  <li>• Réfection des toitures et installations électriques</li>
                  <li>• Aménagement de blocs opératoires</li>
                  <li>• Installation de systèmes d&apos;assainissement</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-fps-primary text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                  <h3 className="text-xl font-semibold text-fps-primary ml-4">Construction nouvelles structures</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Édification de nouveaux centres dans les zones sous-desservies.
                </p>
                <ul className="space-y-1 text-gray-600 ml-14">
                  <li>• Centres de santé communautaires</li>
                  <li>• Postes de santé en zones rurales</li>
                  <li>• Maternités équipées</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-fps-primary text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                  <h3 className="text-xl font-semibold text-fps-primary ml-4">Normalisation et certification</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Certification de conformité aux standards nationaux et internationaux.
                </p>
                <ul className="space-y-1 text-gray-600 ml-14">
                  <li>• Audits de qualité des infrastructures</li>
                  <li>• Certification ISO des établissements</li>
                  <li>• Suivi continu des standards</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact attendu */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact attendu de nos investissements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Amélioration de l&apos;accès</h3>
                <p className="text-gray-700">Réduction des distances moyennes aux centres de santé</p>
              </div>
              <div className="text-center">
                <Building className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Qualité des soins</h3>
                <p className="text-gray-700">Structures conformes aux standards internationaux</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Équité territoriale</h3>
                <p className="text-gray-700">Répartition équilibrée des infrastructures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
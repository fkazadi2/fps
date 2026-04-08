import { ArrowRightLeft, Truck, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function SystemeReferencesPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Système des références"
          description="Organisation des transferts de patients, coordination entre niveaux de soins et optimisation du parcours de soins"
          icon={ArrowRightLeft}
          variant="violet"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Système des références", href: "/gouvernance-sante/systeme-references" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={ArrowRightLeft}
          label="Coordination des Transferts Médicaux et Ambulanciers"
          variant="purple"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Système ambulances opérationnel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">16</h3>
                <p className="text-green-700">Ambulances opérationnelles à Kinshasa</p>
              </div>
              <div className="text-center">
                <ArrowRightLeft className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">1 400+</h3>
                <p className="text-green-700">Transferts femmes et enfants réalisés</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">802K USD</h3>
                <p className="text-green-700">Budget géré par Croix-Rouge RDC</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-fps-primary mb-4">Niveaux de référence</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <div>
                    <p className="font-medium">Centres de Santé</p>
                    <p className="text-sm text-gray-600">Soins primaires et détection</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <div>
                    <p className="font-medium">Hôpitaux de Référence</p>
                    <p className="text-sm text-gray-600">Soins spécialisés</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-fps-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <div>
                    <p className="font-medium">Centres Hospitaliers</p>
                    <p className="text-sm text-gray-600">Soins de haute spécialité</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-fps-primary mb-4">Impact du système</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Réduction de la mortalité maternelle</li>
                <li>• Transferts d&apos;urgence rapides</li>
                <li>• Coordination inter-établissements</li>
                <li>• Optimisation des ressources</li>
                <li>• Suivi des patients</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
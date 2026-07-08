import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Users, Award, ArrowRightLeft, Microscope, HeartPulse } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function GouvernanceSantePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Gouvernance Santé"
          description="Renforcement du système de Santé"
          icon={HeartPulse}
          variant="slate"
          breadcrumbs={[
            { name: "Gouvernance de la Santé", href: "/gouvernance-sante" }
          ]}
          backgroundImage="/images/banners/gouvernance-sante/banner-gouvernance.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          image="/images/featured-images/gouvernance-sante/featured-gouvernance.jpg"
          variant="blue"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link href="/gouvernance-sante/capacitation" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Financement du renforcement des capacités des ressources humaines du secteur santé</h3>
              </div>
              <p className="text-gray-600">
                Identification des besoins nationaux, stratégies de financement et suivi du développement des ressources humaines en santé.
              </p>
            </Link>


            <Link href="/gouvernance-sante/systeme-references" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ArrowRightLeft className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Système des références</h3>
              </div>
              <p className="text-gray-600">
                Analyse des performances (ambulances, délais), évaluation des références et identification des contraintes opérationnelles.
              </p>
            </Link>

            <Link href="/gouvernance-sante/recherche-medicale" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Microscope className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Recherche en médecine</h3>
              </div>
              <p className="text-gray-600">
                Validation des recherches, intégration aux politiques de santé publique et partenariats universitaires.
              </p>
            </Link>
          </div>

          {/* Réalisations ambulances */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Réalisation phare : Système de transfert des patients
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">16</h3>
                  <p className="text-green-700">Ambulances opérationnelles à Kinshasa</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">1 400+</h3>
                  <p className="text-green-700">Transferts femmes et enfants réalisés</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">802K USD</h3>
                  <p className="text-green-700">Budget système géré par Croix-Rouge RDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
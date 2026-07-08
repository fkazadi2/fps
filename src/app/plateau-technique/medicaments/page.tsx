import { Pill, Package, DollarSign, Building, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function MedicamentsPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Financement en médicaments"
          description="Assurer la disponibilité des médicaments essentiels pour garantir l'accès aux soins de Santé pour tous."
          icon={Pill}
          variant="emerald"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Médicaments", href: "/plateau-technique/medicaments" }
          ]}
          backgroundImage="/images/banners/plateau-technique/banner-medicaments.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Pill}
          label="Logistique et Distribution de Médicaments"
          variant="green"
          image="/images/featured-images/plateau-technique/featured-medicaments.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Objectif principal */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-green-800">Objectif prioritaire</h2>
            </div>
            <p className="text-lg text-green-700 mb-4">
              <strong>Garantir la gratuité de l&apos;accouchement</strong> dans le cadre de la mise en œuvre de la Couverture Santé Universelle (CSU).
            </p>
            <p className="text-green-600">
              Cette initiative vise à réduire la mortalité maternelle et infantile en éliminant les barrières financières
              à l&apos;accès aux soins obstétricaux.
            </p>
          </div>

          {/* Réalisations chiffrées */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Réalisations à mi-parcours (2023-2024)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <DollarSign className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">7,2M USD</h3>
                <p className="text-blue-700">Financement total engagé</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Package className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">4,9M USD</h3>
                <p className="text-green-700">Déjà affectés</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <Building className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-purple-800 mb-2">333</h3>
                <p className="text-purple-700">ESS bénéficiaires</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <CheckCircle className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-orange-800 mb-2">6</h3>
                <p className="text-orange-700">Contrats signés</p>
              </div>
            </div>
          </div>

          {/* Stratégie d'approvisionnement */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">Médicaments essentiels couverts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Médicaments pour soins obstétricaux et néonataux
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Antibiotiques et antiseptiques
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Analgésiques et anti-inflammatoires
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Suppléments nutritionnels (fer, acide folique)
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Médicaments d&apos;urgence obstétricale
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Anti-cancéreux
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Anti-tuberculeux
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-fps-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Produits de Santé nutritionnels
                  </li>
                </ul>
              </div>


            </div>
          </div>

          {/* Impact attendu */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact attendu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">↓50%</div>
                <p className="text-gray-700">Réduction des coûts pour les ménages</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">+70%</div>
                <p className="text-gray-700">Augmentation des accouchements assistés</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">↓30%</div>
                <p className="text-gray-700">Réduction de la mortalité maternelle</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
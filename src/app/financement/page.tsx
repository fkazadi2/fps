import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { DollarSign } from "lucide-react";

export default function Financement() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Financement du FPS"
          description="Découvrez les différentes sources de financement, notre stratégie d'allocation des ressources et nos partenaires qui soutiennent la mission du FPS."
          icon={DollarSign}
          variant="emerald"
          breadcrumbs={[
            { name: "Financement", href: "/financement" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={DollarSign}
          label="Gestion Transparente et Optimisation des Ressources Financières"
          variant="green"
        />

        {/* Section: Sources de financement */}
        <section id="sources" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sources de financement</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Le Fonds de Promotion de la Santé (FPS) est financé par diverses sources pour assurer sa pérennité et son indépendance :
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Budget de l'État</h3>
                    <p className="text-gray-600">
                      Une dotation annuelle est allouée au FPS dans le cadre du budget national de la RDC, témoignant de l'engagement du gouvernement pour la santé publique.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Partenaires internationaux</h3>
                    <p className="text-gray-600">
                      Des organisations internationales et des bailleurs de fonds soutiennent nos programmes à travers des subventions et des financements dédiés.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Taxes spécifiques</h3>
                    <p className="text-gray-600">
                      Une partie des taxes prélevées sur certains produits (tabac, alcool) est affectée au financement des activités de promotion de la santé.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Contributions du secteur privé</h3>
                    <p className="text-gray-600">
                      Des entreprises du secteur privé contribuent à nos programmes dans le cadre de leurs actions de responsabilité sociale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Allocation des ressources */}
        <section id="allocation" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Allocation des ressources</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Le FPS alloue ses ressources selon des principes rigoureux de transparence, d'équité et d'efficacité :
                </p>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Priorisation des besoins</h3>
                    <p className="text-gray-600">
                      Les ressources sont allouées en priorité aux zones géographiques et aux populations les plus vulnérables, ainsi qu'aux problèmes de santé les plus urgents.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Programmes stratégiques</h3>
                    <p className="text-gray-600">
                      Une part importante du budget est consacrée aux programmes stratégiques alignés sur les objectifs nationaux de santé et la mise en œuvre de la CSU.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparence des processus</h3>
                    <p className="text-gray-600">
                      Les processus d'allocation sont transparents et documentés, avec des audits réguliers pour garantir la bonne utilisation des fonds.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Évaluation des résultats</h3>
                    <p className="text-gray-600">
                      Chaque programme financé fait l'objet d'une évaluation rigoureuse des résultats pour mesurer son impact et ajuster les allocations futures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Partenaires financiers */}
        <section id="partenaires" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Partenaires financiers</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Le FPS collabore avec de nombreux partenaires financiers qui soutiennent sa mission :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Gouvernement de la RDC</h3>
                    <p className="text-gray-600">
                      Principal soutien du FPS à travers le Ministère de la Santé Publique, Hygiène et Prévention.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Organisation Mondiale de la Santé</h3>
                    <p className="text-gray-600">
                      Soutien technique et financier pour divers programmes de santé publique.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Banque Mondiale</h3>
                    <p className="text-gray-600">
                      Financement de projets d'infrastructure sanitaire et de renforcement des capacités.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">UNICEF</h3>
                    <p className="text-gray-600">
                      Collaboration sur les programmes de santé maternelle et infantile.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Fonds Mondial</h3>
                    <p className="text-gray-600">
                      Partenaire pour la lutte contre le VIH/SIDA, la tuberculose et le paludisme.
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Agence Française de Développement</h3>
                    <p className="text-gray-600">
                      Soutien aux projets de développement des services de santé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
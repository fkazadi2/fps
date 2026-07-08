import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { PieChart } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function FinancementAllocation() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Allocation des ressources"
          description="Comment le FPS distribue ses ressources pour maximiser l'impact sur la santé publique en RDC."
          icon={PieChart}
          variant="green"
          breadcrumbs={[
            { name: "Financement", href: "/financement" },
            { name: "Allocation", href: "/financement/allocation" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={PieChart}
          label="Répartition Stratégique des Fonds et Impact Sanitaire en RDC"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  Le FPS alloue ses ressources selon des principes rigoureux de transparence, d'équité et d'efficacité. Notre processus d'allocation vise à maximiser l'impact des financements sur la santé publique tout en assurant une répartition équitable sur l'ensemble du territoire national.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Principes directeurs</h3>
                <div className="space-y-6 mb-10">
                  <div className="border-l-4 border-[var(--primary)] pl-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Priorisation des besoins</h4>
                    <p className="text-gray-600">
                      Les ressources sont allouées en priorité aux zones géographiques et aux populations les plus vulnérables, ainsi qu'aux problèmes de santé les plus urgents. Ce principe de priorisation permet de réduire les inégalités d'accès aux soins de santé et d'assurer une répartition équitable des ressources.
                    </p>
                  </div>
                  <div className="border-l-4 border-[var(--primary)] pl-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Programmes stratégiques</h4>
                    <p className="text-gray-600">
                      Une part importante du budget est consacrée aux programmes stratégiques alignés sur les objectifs nationaux de santé et la mise en œuvre de la CSU. Ces programmes sont sélectionnés en fonction de leur potentiel à générer un impact significatif sur les indicateurs de santé et à contribuer à la réalisation des Objectifs de Développement Durable liés à la santé.
                    </p>
                  </div>
                  <div className="border-l-4 border-[var(--primary)] pl-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Transparence des processus</h4>
                    <p className="text-gray-600">
                      Les processus d'allocation sont transparents et documentés, avec des audits réguliers pour garantir la bonne utilisation des fonds. Toutes les décisions d'allocation font l'objet d'une documentation détaillée et sont soumises à des mécanismes de contrôle interne et externe pour prévenir les risques de détournement ou d'utilisation inefficace des ressources.
                    </p>
                  </div>
                  <div className="border-l-4 border-[var(--primary)] pl-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Évaluation des résultats</h4>
                    <p className="text-gray-600">
                      Chaque programme financé fait l'objet d'une évaluation rigoureuse des résultats pour mesurer son impact et ajuster les allocations futures. Cette approche basée sur les données permet d'identifier les interventions les plus efficaces et d'optimiser l'allocation des ressources en fonction des résultats obtenus.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Répartition budgétaire</h3>
                <div className="bg-gray-50 p-6 rounded-lg mb-10">
                  <p className="text-gray-600 mb-4">
                    Pour l'année fiscale 2023-2024, le budget du FPS est réparti comme suit :
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-1/3 text-gray-700 font-medium">Santé maternelle et infantile</div>
                      <div className="w-2/3">
                        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute h-full bg-[var(--primary)] rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="ml-4 text-[var(--primary)] font-semibold">35%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3 text-gray-700 font-medium">Prévention des maladies</div>
                      <div className="w-2/3">
                        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute h-full bg-[var(--primary)] rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      <div className="ml-4 text-[var(--primary)] font-semibold">25%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3 text-gray-700 font-medium">Renforcement du système de santé</div>
                      <div className="w-2/3">
                        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute h-full bg-[var(--primary)] rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div className="ml-4 text-[var(--primary)] font-semibold">20%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3 text-gray-700 font-medium">Promotion de la santé</div>
                      <div className="w-2/3">
                        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute h-full bg-[var(--primary)] rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div className="ml-4 text-[var(--primary)] font-semibold">15%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3 text-gray-700 font-medium">Administration et gouvernance</div>
                      <div className="w-2/3">
                        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="absolute h-full bg-[var(--primary)] rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                      <div className="ml-4 text-[var(--primary)] font-semibold">5%</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Processus d'allocation des ressources</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">1</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Analyse des besoins</h4>
                    <p className="text-gray-600">
                      Identification des priorités sanitaires basée sur des données épidémiologiques, démographiques et socio-économiques.
                    </p>
                  </div>
                  
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">2</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Planification budgétaire</h4>
                    <p className="text-gray-600">
                      Élaboration d'un plan d'allocation aligné sur les objectifs stratégiques et les priorités identifiées.
                    </p>
                  </div>
                  
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">3</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Validation participative</h4>
                    <p className="text-gray-600">
                      Consultation des parties prenantes pour recueillir leurs avis et ajuster le plan d'allocation.
                    </p>
                  </div>
                  
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">4</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Mise en œuvre</h4>
                    <p className="text-gray-600">
                      Transfert des fonds aux programmes et projets selon le calendrier établi et les procédures approuvées.
                    </p>
                  </div>
                  
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">5</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Suivi et contrôle</h4>
                    <p className="text-gray-600">
                      Surveillance continue de l'utilisation des fonds et vérification de la conformité avec les procédures.
                    </p>
                  </div>
                  
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-full text-white flex items-center justify-center font-bold text-lg mb-4">6</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Évaluation et ajustement</h4>
                    <p className="text-gray-600">
                      Mesure des résultats obtenus et révision des allocations futures en fonction des performances.
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
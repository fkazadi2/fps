import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function FinancementSources() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Sources de financement"
          description="Découvrez les différentes sources qui permettent au Fonds de Promotion de la Santé de financer ses programmes et activités."
          icon={DollarSign}
          variant="green"
          breadcrumbs={[
            { name: "Financement", href: "/financement" },
            { name: "Sources", href: "/financement/sources" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={DollarSign}
          label="Mécanismes de Financement et Ressources du FPS"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  Le Fonds de Promotion de la Santé (FPS) est financé par diverses sources pour assurer sa pérennité et son indépendance. Cette diversification des sources de financement est essentielle pour garantir la stabilité des programmes et la résilience face aux fluctuations budgétaires.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Budget de l'État</h3>
                    <p className="text-gray-600">
                      Une dotation annuelle est allouée au FPS dans le cadre du budget national de la RDC, témoignant de l'engagement du gouvernement pour la santé publique. Cette allocation est inscrite dans la loi de finances et représente environ 30% du budget total du FPS.
                    </p>
                  </div>
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Partenaires internationaux</h3>
                    <p className="text-gray-600">
                      Des organisations internationales et des bailleurs de fonds soutiennent nos programmes à travers des subventions et des financements dédiés. Ces partenariats stratégiques permettent de financer des projets spécifiques comme la gratuité des soins pour les femmes enceintes et les enfants de moins de 5 ans.
                    </p>
                  </div>
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Taxes spécifiques</h3>
                    <p className="text-gray-600">
                      Une partie des taxes prélevées sur certains produits (tabac, alcool) est affectée au financement des activités de promotion de la santé. Ce mécanisme innovant permet de générer des ressources tout en contribuant à décourager la consommation de produits nocifs pour la santé.
                    </p>
                  </div>
                  <div className="bg-fps-primary-light p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Contributions du secteur privé</h3>
                    <p className="text-gray-600">
                      Des entreprises du secteur privé contribuent à nos programmes dans le cadre de leurs actions de responsabilité sociale. Ces contributions prennent différentes formes : dons financiers, fourniture d'équipements ou mise à disposition d'expertise technique.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[var(--primary)]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Répartition du financement (2023)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-[var(--primary)] text-2xl font-bold">30%</div>
                      <div className="text-gray-600">Budget national</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[var(--primary)] text-2xl font-bold">45%</div>
                      <div className="text-gray-600">Partenaires internationaux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[var(--primary)] text-2xl font-bold">15%</div>
                      <div className="text-gray-600">Taxes spécifiques</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[var(--primary)] text-2xl font-bold">10%</div>
                      <div className="text-gray-600">Secteur privé</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section supplémentaire */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Stratégie de mobilisation des ressources</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Pour assurer la pérennité de ses activités, le FPS a développé une stratégie de mobilisation des ressources reposant sur plusieurs piliers :
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fps-primary-light flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--primary)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p><span className="font-semibold">Diversification des sources :</span> Équilibrer les contributions entre fonds publics, privés et internationaux pour réduire la dépendance à une source unique.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fps-primary-light flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--primary)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p><span className="font-semibold">Transparence et redevabilité :</span> Garantir l'utilisation efficace et transparente des fonds pour renforcer la confiance des partenaires et donateurs.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fps-primary-light flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--primary)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p><span className="font-semibold">Partenariats stratégiques :</span> Développer des alliances avec des organisations partageant nos objectifs pour mutualiser les ressources et maximiser l'impact.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fps-primary-light flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[var(--primary)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <p><span className="font-semibold">Mécanismes innovants :</span> Explorer des approches novatrices de financement comme les partenariats public-privé et les mécanismes de financement basés sur les résultats.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
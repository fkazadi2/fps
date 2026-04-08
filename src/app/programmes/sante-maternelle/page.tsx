import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Baby } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function SanteMaternellePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Santé maternelle et infantile"
          description="Nos programmes dédiés à la protection et à l'amélioration de la santé des mères et des enfants en RDC."
          icon={Baby}
          variant="purple"
          breadcrumbs={[
            { name: "Programmes", href: "/programmes" },
            { name: "Santé Maternelle", href: "/programmes/sante-maternelle" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Baby}
          label="Protection et Soins pour les Mères et les Enfants Congolais"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  Le FPS considère la santé maternelle et infantile comme une priorité nationale. Nos programmes dans ce domaine visent à réduire la mortalité maternelle et infantile, améliorer l'accès aux soins prénataux et postnataux, et renforcer les capacités des structures de santé à fournir des services de qualité.
                </p>
                
                {/* Objectifs */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos objectifs</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Réduire la mortalité</h3>
                      <p className="text-gray-600">
                        Diminuer les taux de mortalité maternelle et infantile par l'amélioration de la qualité des soins et l'accès aux services essentiels.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <div className="w-12 h-12 bg-[var(--danger)] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
                      <h3 className="text-lg font-semibold text-white mb-2">Améliorer l'accès</h3>
                      <p className="text-white text-opacity-90">
                        Garantir que toutes les femmes enceintes et les jeunes enfants, même dans les zones rurales, aient accès à des soins de qualité.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
                      <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Renforcer la prévention</h3>
                      <p className="text-gray-700">
                        Promouvoir les pratiques préventives et les comportements favorables à la santé des mères et des enfants.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Programmes phares */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos programmes phares</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">1000 premiers jours</h3>
                      <p className="text-gray-600 mb-4">
                        Un programme intégré couvrant la période de la grossesse jusqu'aux deux ans de l'enfant, période critique pour son développement. Le programme comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Consultations prénatales gratuites et de qualité</li>
                        <li>Accouchements assistés par du personnel qualifié</li>
                        <li>Suivi postnatal régulier pour la mère et l'enfant</li>
                        <li>Promotion de l'allaitement maternel exclusif</li>
                        <li>Vaccination complète selon le calendrier national</li>
                        <li>Conseils nutritionnels adaptés</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-primary-light text-fps-primary rounded-full text-sm">250 centres de santé soutenus</span>
                        <span className="px-3 py-1 bg-fps-secondary text-white rounded-full text-sm ml-2">10 provinces couvertes</span>
                      </div>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3">Maternités sans risque</h3>
                      <p className="text-white text-opacity-90 mb-4">
                        Programme visant à améliorer la qualité des soins obstétricaux et néonataux dans les structures de santé. Les activités incluent :
                      </p>
                      <ul className="list-disc pl-5 text-white text-opacity-90 space-y-1">
                        <li>Équipement des maternités en matériel médical essentiel</li>
                        <li>Formation du personnel médical aux soins obstétricaux d'urgence</li>
                        <li>Mise en place de systèmes de référence efficaces</li>
                        <li>Amélioration des infrastructures (eau, électricité, stérilisation)</li>
                        <li>Soutien aux audits de décès maternels pour améliorer la qualité</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-[var(--danger)] bg-opacity-20 text-white rounded-full text-sm">120 maternités équipées</span>
                        <span className="px-3 py-1 bg-[var(--danger)] bg-opacity-20 text-white rounded-full text-sm ml-2">1500 professionnels formés</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-accent">
                      <h3 className="text-xl font-semibold text-[var(--accent)] mb-3">Prise en charge intégrée des maladies de l'enfant (PCIME)</h3>
                      <p className="text-gray-600 mb-4">
                        Approche intégrée pour améliorer la qualité des soins pédiatriques dans les centres de santé. Ce programme comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Formation du personnel de santé à la PCIME</li>
                        <li>Équipement des centres de santé en médicaments essentiels pédiatriques</li>
                        <li>Élaboration et diffusion de protocoles de soins standardisés</li>
                        <li>Supervision formative régulière des prestataires</li>
                        <li>Sensibilisation des familles aux signes de danger</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm">350 centres de santé participants</span>
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm ml-2">Réduction de 25% de la mortalité infanto-juvénile</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Approche communautaire */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre approche communautaire</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Groupes de soutien aux mères</h3>
                      <p className="text-gray-600">
                        Nous facilitons la création et l'animation de groupes de soutien où les mères peuvent partager leurs expériences, recevoir des conseils et s'entraider. Ces groupes jouent un rôle crucial dans la promotion de pratiques bénéfiques comme l'allaitement maternel et les soins appropriés aux enfants.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-white mb-3">Agents de santé communautaire</h3>
                      <p className="text-white text-opacity-90">
                        Nous formons et soutenons des agents de santé communautaire qui assurent le suivi des femmes enceintes et des enfants, fournissent des conseils de base, et orientent vers les structures de santé en cas de besoin. Ces agents constituent un lien essentiel entre les communautés et le système de santé.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent bg-opacity-10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Implication des leaders communautaires</h3>
                      <p className="text-gray-600">
                        Nous travaillons avec les chefs traditionnels, religieux et autres leaders d'opinion pour promouvoir des comportements favorables à la santé maternelle et infantile et mobiliser les communautés autour de ces enjeux.
                      </p>
                    </div>
                    
                    <div className="bg-fps-danger-light p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--danger)] mb-3">Éducation des hommes</h3>
                      <p className="text-gray-600">
                        Nous menons des activités spécifiques pour sensibiliser les hommes à l'importance de leur soutien pendant la grossesse, l'accouchement et les soins aux enfants, encourageant ainsi une participation plus active des pères.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg border-t-4 border-fps-primary">
                    <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">Participez à nos initiatives</h3>
                    <p className="text-gray-600 mb-4">
                      Vous souhaitez contribuer à l'amélioration de la santé maternelle et infantile en RDC? Contactez-nous pour découvrir comment vous pouvez vous engager.
                    </p>
                    <a href="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[var(--danger)] hover:bg-fps-danger-dark">
                      Nous contacter
                    </a>
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
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function CapacitesPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Renforcement des capacités"
          description="Nos programmes de formation et de soutien aux professionnels et structures de santé pour améliorer la qualité des services."
          icon={GraduationCap}
          variant="orange"
          breadcrumbs={[
            { name: "Programmes", href: "/programmes" },
            { name: "Renforcement des capacités", href: "/programmes/capacites" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={GraduationCap}
          label="Formation et Développement des Compétences du Personnel de Santé"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  Le renforcement des capacités est un axe stratégique essentiel du FPS pour améliorer durablement le système de santé congolais. Nos programmes visent à développer les compétences des professionnels de santé, à améliorer la gestion des structures sanitaires et à renforcer les institutions du secteur de la santé.
                </p>
                
                {/* Domaines d'intervention */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Domaines d'intervention</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Formation du personnel</h3>
                      <p className="text-gray-600">
                        Développement des compétences techniques et non techniques des professionnels de santé à tous les niveaux.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
                      <h3 className="text-lg font-semibold text-white mb-2">Gestion et leadership</h3>
                      <p className="text-white text-opacity-90">
                        Amélioration des capacités de gestion et de leadership des directeurs et responsables des structures sanitaires.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
                      <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Systèmes de santé</h3>
                      <p className="text-gray-700">
                        Renforcement des institutions et des systèmes pour améliorer la gouvernance, la coordination et la résilience du secteur.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Programmes phares */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos programmes phares</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Académie de Leadership en Santé</h3>
                      <p className="text-gray-600 mb-4">
                        Un programme de formation continue destiné aux cadres et dirigeants du secteur de la santé. Il comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Modules de leadership et management stratégique</li>
                        <li>Formation en gestion financière et des ressources humaines</li>
                        <li>Coaching individuel et mentorat par des experts</li>
                        <li>Développement de projets d'amélioration institutionnelle</li>
                        <li>Création de communautés de pratique et réseaux d'échange</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-primary-light text-fps-primary rounded-full text-sm">320 cadres formés</span>
                        <span className="px-3 py-1 bg-fps-secondary text-white rounded-full text-sm ml-2">26 provinces couvertes</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-secondary">
                      <h3 className="text-xl font-semibold text-[var(--secondary)] mb-3">Centres d'Excellence Clinique</h3>
                      <p className="text-gray-600 mb-4">
                        Développement de centres de référence spécialisés servant de pôles de formation et d'expertise. Ce programme comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Équipement de pointe pour les soins spécialisés</li>
                        <li>Formation avancée du personnel médical et paramédical</li>
                        <li>Élaboration de protocoles de soins standardisés</li>
                        <li>Supervision formative des structures environnantes</li>
                        <li>Recherche opérationnelle et innovation</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-secondary bg-opacity-10 text-fps-secondary rounded-full text-sm">8 centres opérationnels</span>
                        <span className="px-3 py-1 bg-fps-primary-light text-fps-primary rounded-full text-sm ml-2">5 spécialités médicales couvertes</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-accent">
                      <h3 className="text-xl font-semibold text-[var(--accent)] mb-3">Digitalisation de la santé</h3>
                      <p className="text-gray-600 mb-4">
                        Programme visant à renforcer l'utilisation des technologies numériques dans le système de santé. Les activités incluent :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Déploiement de systèmes d'information sanitaire</li>
                        <li>Formation du personnel à l'utilisation des outils numériques</li>
                        <li>Développement de la télémédecine dans les zones enclavées</li>
                        <li>Mise en place de systèmes de gestion électronique des médicaments</li>
                        <li>Collecte et analyse de données pour la prise de décision</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm">150 structures équipées</span>
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm ml-2">1200 professionnels formés</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Approche de formation */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre approche de formation</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Formation basée sur les compétences</h3>
                      <p className="text-gray-600">
                        Notre approche pédagogique met l'accent sur l'acquisition de compétences pratiques plutôt que de connaissances théoriques uniquement. Les formations incluent des simulations, des études de cas et des stages pratiques pour garantir l'application des connaissances.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary bg-opacity-10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--secondary)] mb-3">Suivi post-formation</h3>
                      <p className="text-gray-600">
                        Nous ne nous limitons pas à la formation initiale, mais mettons en place un système de suivi et d'accompagnement des apprenants dans leur milieu de travail pour faciliter l'application des compétences acquises et résoudre les difficultés rencontrées.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent bg-opacity-10 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--accent)] mb-3">Formation de formateurs</h3>
                      <p className="text-gray-600">
                        Pour garantir la durabilité et l'appropriation nationale, nous identifions et formons des formateurs locaux qui peuvent à leur tour former d'autres professionnels, créant ainsi un effet multiplicateur et réduisant la dépendance aux experts externes.
                      </p>
                    </div>
                    
                    <div className="bg-fps-danger-light p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[var(--danger)] mb-3">Plateforme d'apprentissage en ligne</h3>
                      <p className="text-gray-600">
                        Nous développons une plateforme numérique d'apprentissage permettant aux professionnels de santé d'accéder à des modules de formation à distance, réduisant ainsi les contraintes logistiques et permettant une formation continue accessible même dans les zones reculées.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Impact */}
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact de nos programmes</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <div className="text-3xl font-bold text-[var(--primary)] mb-2">+5,000</div>
                      <p className="text-gray-600">Professionnels formés</p>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <div className="text-3xl font-bold text-white mb-2">26</div>
                      <p className="text-white text-opacity-90">Provinces couvertes</p>
                    </div>
                    
                    <div className="bg-fps-accent p-6 rounded-lg">
                      <div className="text-3xl font-bold text-[var(--secondary)] mb-2">+30%</div>
                      <p className="text-gray-700">Amélioration de la qualité des soins</p>
                    </div>
                    
                    <div className="bg-fps-danger-light p-6 rounded-lg">
                      <div className="text-3xl font-bold text-[var(--danger)] mb-2">80%</div>
                      <p className="text-gray-600">Taux de rétention du personnel formé</p>
                    </div>
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
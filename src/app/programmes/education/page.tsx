import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function EducationPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Éducation sanitaire"
          description="Nos programmes d'éducation et de sensibilisation pour promouvoir des comportements favorables à la santé."
          icon={BookOpen}
          variant="orange"
          breadcrumbs={[
            { name: "Programmes", href: "/programmes" },
            { name: "Éducation", href: "/programmes/education" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={BookOpen}
          label="Sensibilisation et Éducation pour une Meilleure Santé Communautaire"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  L'éducation sanitaire constitue un pilier essentiel de notre action pour améliorer la santé publique en RDC. Nos programmes visent à fournir aux communautés les connaissances et les compétences nécessaires pour adopter des comportements favorables à la santé et prévenir les maladies.
                </p>
                
                {/* Approche */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre approche</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Sensibilisation ciblée</h3>
                      <p className="text-gray-600">
                        Nous développons des messages adaptés aux différents publics (enfants, femmes, hommes, personnes âgées) pour maximiser leur impact et leur pertinence.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
                      <h3 className="text-lg font-semibold text-white mb-2">Approche participative</h3>
                      <p className="text-white text-opacity-90">
                        Nous impliquons les communautés dans la conception et la mise en œuvre des programmes d'éducation sanitaire pour garantir leur appropriation et leur durabilité.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent p-6 rounded-lg">
                      <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
                      <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Canaux multiples</h3>
                      <p className="text-gray-700">
                        Nous utilisons divers canaux de communication (médias traditionnels, réseaux sociaux, activités communautaires) pour atteindre le plus grand nombre de personnes.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Programmes phares */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos programmes phares</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Écoles promotrices de santé</h3>
                      <p className="text-gray-600 mb-4">
                        Un programme intégré visant à faire des écoles des lieux privilégiés d'apprentissage et de pratique des comportements favorables à la santé. Les activités incluent :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Formation des enseignants aux principes de l'éducation à la santé</li>
                        <li>Intégration de modules sur la santé dans les programmes scolaires</li>
                        <li>Mise en place de clubs de santé animés par les élèves</li>
                        <li>Organisation de journées de sensibilisation thématiques</li>
                        <li>Amélioration des infrastructures sanitaires dans les écoles</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-primary-light text-fps-primary rounded-full text-sm">Plus de 500 écoles bénéficiaires</span>
                        <span className="px-3 py-1 bg-fps-secondary text-white rounded-full text-sm ml-2">Kinshasa, Kongo Central, Haut-Katanga</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-secondary">
                      <h3 className="text-xl font-semibold text-[var(--secondary)] mb-3">Campagnes médiatiques "Santé pour tous"</h3>
                      <p className="text-gray-600 mb-4">
                        Des campagnes médiatiques nationales sur des thèmes de santé prioritaires, diffusées via la radio, la télévision et les réseaux sociaux. Chaque campagne comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Spots radio et TV en langues nationales et locales</li>
                        <li>Émissions interactives avec participation des experts et du public</li>
                        <li>Contenus adaptés pour les réseaux sociaux</li>
                        <li>Distribution de supports imprimés (affiches, dépliants)</li>
                        <li>Mobilisation de personnalités influentes comme ambassadeurs</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-secondary bg-opacity-10 text-fps-secondary rounded-full text-sm">Couverture nationale</span>
                        <span className="px-3 py-1 bg-fps-secondary bg-opacity-10 text-fps-secondary rounded-full text-sm ml-2">4 campagnes thématiques par an</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-accent">
                      <h3 className="text-xl font-semibold text-[var(--accent)] mb-3">Relais communautaires de santé</h3>
                      <p className="text-gray-600 mb-4">
                        Formation et appui aux relais communautaires qui servent d'intermédiaires entre les services de santé et les communautés. Ce programme comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Sélection et formation de volontaires communautaires</li>
                        <li>Équipement en outils pédagogiques adaptés</li>
                        <li>Animations de séances d'éducation sanitaire dans les quartiers et villages</li>
                        <li>Organisation de visites à domicile pour les conseils personnalisés</li>
                        <li>Système de supervision et de motivation des relais</li>
                      </ul>
                      <div className="mt-4">
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm">2,500 relais actifs</span>
                        <span className="px-3 py-1 bg-fps-accent bg-opacity-20 text-[var(--secondary)] rounded-full text-sm ml-2">15 provinces couvertes</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thématiques */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Thématiques prioritaires</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-primary-light rounded-full mx-auto flex items-center justify-center text-fps-primary mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Hygiène</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-secondary bg-opacity-10 rounded-full mx-auto flex items-center justify-center text-fps-secondary mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Nutrition</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-accent bg-opacity-20 rounded-full mx-auto flex items-center justify-center text-[var(--secondary)] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Vaccination</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-danger-light rounded-full mx-auto flex items-center justify-center text-[var(--danger)] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Santé maternelle</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-primary-light rounded-full mx-auto flex items-center justify-center text-fps-primary mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Eau potable</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-secondary bg-opacity-10 rounded-full mx-auto flex items-center justify-center text-fps-secondary mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Maladies infectieuses</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-accent bg-opacity-20 rounded-full mx-auto flex items-center justify-center text-[var(--secondary)] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Santé sexuelle</h3>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-fps-danger-light rounded-full mx-auto flex items-center justify-center text-[var(--danger)] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Santé mentale</h3>
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
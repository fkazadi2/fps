import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Shield } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function PreventionPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Prévention des maladies"
          description="Nos stratégies pour prévenir les maladies transmissibles et non transmissibles en République Démocratique du Congo."
          icon={Shield}
          variant="green"
          breadcrumbs={[
            { name: "Programmes", href: "/programmes" },
            { name: "Prévention", href: "/programmes/prevention" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Shield}
          label="Stratégies de Prévention et Surveillance Épidémiologique en RDC"
          variant="blue"
        />

        {/* Contenu principal */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">
                  La prévention des maladies est un axe stratégique majeur du Fonds de Promotion de la Santé. Nous mettons en œuvre des programmes ciblés pour lutter contre les principales maladies qui affectent la population congolaise, en mettant l'accent sur les interventions coût-efficaces et à fort impact.
                </p>

                {/* Maladies transmissibles */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Lutte contre les maladies transmissibles</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-fps-primary-light rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fps-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Paludisme</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Le paludisme reste l'une des principales causes de morbidité et de mortalité en RDC. Notre programme de lutte contre le paludisme comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Distribution de moustiquaires imprégnées d'insecticide à longue durée d'action (MILDA)</li>
                        <li>Pulvérisation intra-domiciliaire dans les zones à haute transmission</li>
                        <li>Chimioprévention du paludisme saisonnier pour les enfants de moins de 5 ans</li>
                        <li>Renforcement des capacités de diagnostic et de traitement</li>
                      </ul>
                    </div>
                    
                    <div className="bg-fps-secondary p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-fps-secondary rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">VIH/SIDA</h3>
                      </div>
                      <p className="text-white text-opacity-90 mb-4">
                        Notre approche de lutte contre le VIH/SIDA s'articule autour de la stratégie internationale "90-90-90" avec des interventions ciblées :
                      </p>
                      <ul className="list-disc pl-5 text-white text-opacity-90 space-y-1">
                        <li>Promotion du dépistage volontaire et confidentiel</li>
                        <li>Prévention de la transmission mère-enfant (PTME)</li>
                        <li>Distribution de préservatifs et sensibilisation sur les comportements à risque</li>
                        <li>Soutien aux personnes vivant avec le VIH pour l'observance du traitement</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-fps-accent p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-fps-accent rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--secondary)]">Tuberculose</h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        La RDC fait partie des pays à forte charge de tuberculose. Notre programme de lutte contre la tuberculose comprend :
                      </p>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Détection active des cas dans les communautés à haut risque</li>
                        <li>Amélioration de l'accès au diagnostic par microscopie et GeneXpert</li>
                        <li>Soutien à l'observance du traitement par la stratégie DOTS</li>
                        <li>Prise en charge de la co-infection TB/VIH</li>
                      </ul>
                    </div>
                    
                    <div className="bg-fps-danger-light p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-fps-danger-light rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--danger)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--danger)]">Maladies tropicales négligées</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Nous soutenons les efforts de lutte contre les maladies tropicales négligées qui touchent particulièrement les populations vulnérables :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Campagnes de traitement de masse contre l'onchocercose, la schistosomiase et les géohelminthiases</li>
                        <li>Prise en charge des cas de trypanosomiase humaine africaine (maladie du sommeil)</li>
                        <li>Surveillance épidémiologique et contrôle des vecteurs</li>
                        <li>Sensibilisation des communautés sur les mesures préventives</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Maladies non transmissibles */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Prévention des maladies non transmissibles</h2>
                  
                  <p className="text-gray-600 mb-6">
                    Face à la transition épidémiologique en cours en RDC, nous développons des programmes de prévention des maladies non transmissibles (MNT) qui représentent une charge croissante de morbidité.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">Facteurs de risque ciblés</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-fps-primary-light rounded-full mx-auto flex items-center justify-center text-fps-primary mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Tabagisme</h4>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-fps-secondary bg-opacity-10 rounded-full mx-auto flex items-center justify-center text-fps-secondary mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Sédentarité</h4>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-fps-accent bg-opacity-20 rounded-full mx-auto flex items-center justify-center text-[var(--secondary)] mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Alcoolisme</h4>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-fps-danger-light rounded-full mx-auto flex items-center justify-center text-[var(--danger)] mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Alimentation</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Programme de détection précoce</h3>
                      <p className="text-gray-600 mb-4">
                        Nous soutenons la mise en place de services de dépistage des principaux facteurs de risque des MNT, notamment :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Mesure systématique de la pression artérielle et du taux de glycémie dans les centres de santé</li>
                        <li>Dépistage du cancer du col de l'utérus par inspection visuelle à l'acide acétique</li>
                        <li>Formation des agents de santé à la détection précoce des signes de MNT</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-[var(--secondary)] mb-3">Promotion des modes de vie sains</h3>
                      <p className="text-gray-600 mb-4">
                        Notre programme de promotion des modes de vie sains comprend diverses initiatives :
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        <li>Campagnes d'information sur les risques du tabagisme et de la consommation excessive d'alcool</li>
                        <li>Promotion de l'activité physique avec la création d'espaces adaptés dans les zones urbaines</li>
                        <li>Sensibilisation sur l'alimentation équilibrée et la réduction de la consommation de sel</li>
                        <li>Organisation de "journées santé" dans les communautés et les lieux de travail</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Approche intégrée */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Approche intégrée et communautaire</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-fps-primary-light p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Intégration des services</h3>
                      <p className="text-gray-600">
                        Nous favorisons l'intégration des services de prévention des différentes maladies pour optimiser les ressources et améliorer l'accès aux soins. Par exemple, les consultations prénatales incluent le dépistage du VIH, du paludisme et de l'hypertension.
                      </p>
                    </div>
                    
                    <div className="bg-fps-secondary bg-opacity-10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-[var(--secondary)] mb-3">Participation communautaire</h3>
                      <p className="text-gray-600">
                        Les communautés sont impliquées dans la planification et la mise en œuvre des activités de prévention. Nous formons des agents de santé communautaires qui servent de relais pour la sensibilisation et le suivi des interventions.
                      </p>
                    </div>
                    
                    <div className="bg-fps-accent bg-opacity-10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Innovation et adaptabilité</h3>
                      <p className="text-gray-600">
                        Nous intégrons les nouvelles technologies et approches, comme la santé mobile (mHealth) pour le suivi des patients et la diffusion de messages de prévention, adaptant nos interventions aux contextes spécifiques.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border-t-4 border-fps-primary">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact de nos programmes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-[var(--primary)] text-3xl font-bold">1,2M</div>
                        <p className="text-gray-600">Moustiquaires distribuées</p>
                      </div>
                      <div>
                        <div className="text-[var(--secondary)] text-3xl font-bold">500K</div>
                        <p className="text-gray-600">Personnes dépistées pour le VIH</p>
                      </div>
                      <div>
                        <div className="text-[var(--accent)] text-3xl font-bold">300+</div>
                        <p className="text-gray-600">Centres de santé équipés</p>
                      </div>
                      <div>
                        <div className="text-[var(--danger)] text-3xl font-bold">25%</div>
                        <p className="text-gray-600">Réduction des cas de paludisme</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-fps-primary-light rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--primary)] mb-3">Engagez-vous avec nous</h3>
                    <p className="text-gray-600 mb-4">
                      Vous souhaitez contribuer à nos efforts de prévention des maladies? Contactez-nous pour explorer les possibilités de partenariat ou de volontariat.
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
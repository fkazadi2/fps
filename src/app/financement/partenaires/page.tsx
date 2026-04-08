import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Handshake } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function FinancementPartenaires() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Partenaires financiers"
          description="Découvrez les organisations qui soutiennent financièrement les activités du Fonds de Promotion de la Santé."
          icon={Handshake}
          variant="green"
          breadcrumbs={[
            { name: "Financement", href: "/financement" },
            { name: "Partenaires", href: "/financement/partenaires" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Handshake}
          label="Collaboration et Partenariat Stratégique pour la Santé en RDC"
          variant="blue"
        />

        {/* Section: Partenaires institutionnels */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Partenaires institutionnels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-primary-light flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-3xl">RDC</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Gouvernement de la RDC</h3>
                  <p className="text-gray-600 mb-4">
                    Principal soutien du FPS à travers le Ministère de la Santé Publique, Hygiène et Prévention. Le gouvernement congolais s'est engagé à financer durablement les activités du FPS dans le cadre de sa politique nationale de santé.
                  </p>
                  <p className="text-gray-700 font-medium">
                    Contribution annuelle: 30% du budget total
                  </p>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-primary-light flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-lg">OMS</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Organisation Mondiale de la Santé</h3>
                  <p className="text-gray-600 mb-4">
                    Soutien technique et financier pour divers programmes de santé publique, notamment dans les domaines de la surveillance épidémiologique, de la préparation aux urgences sanitaires et du renforcement des systèmes de santé.
                  </p>
                  <p className="text-gray-700 font-medium">
                    Partenaire depuis: 2020
                  </p>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-48 bg-fps-primary-light flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-lg">UNICEF</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">UNICEF</h3>
                  <p className="text-gray-600 mb-4">
                    Collaboration sur les programmes de santé maternelle et infantile, avec un accent particulier sur la vaccination, la nutrition et l'accès à l'eau potable pour les populations vulnérables.
                  </p>
                  <p className="text-gray-700 font-medium">
                    Partenaire depuis: 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section: Bailleurs de fonds internationaux */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bailleurs de fonds internationaux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Banque Mondiale</h3>
                  <p className="text-gray-600">
                    Financement de projets d'infrastructure sanitaire et de renforcement des capacités à travers son programme de soutien au secteur de la santé en RDC.
                  </p>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Projets financés :</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Réhabilitation de centres de santé dans les zones rurales</li>
                    <li>Formation du personnel médical</li>
                    <li>Système d'information sanitaire</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Fonds Mondial</h3>
                  <p className="text-gray-600">
                    Partenaire pour la lutte contre le VIH/SIDA, la tuberculose et le paludisme, avec des financements ciblés pour les programmes de prévention et de traitement.
                  </p>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Projets financés :</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Distribution de moustiquaires imprégnées</li>
                    <li>Dépistage et prise en charge du VIH</li>
                    <li>Traitement de la tuberculose</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Agence Française de Développement</h3>
                  <p className="text-gray-600">
                    Soutien aux projets de développement des services de santé, avec un accent sur l'amélioration de la qualité des soins et l'accès aux médicaments essentiels.
                  </p>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Projets financés :</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Chaîne d'approvisionnement pharmaceutique</li>
                    <li>Amélioration de la qualité des soins</li>
                    <li>Santé sexuelle et reproductive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section: Secteur privé */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Partenaires du secteur privé</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Le FPS collabore également avec des entreprises du secteur privé qui s'engagent à soutenir la santé publique dans le cadre de leur politique de responsabilité sociale. Ces partenariats prennent diverses formes, allant du soutien financier direct à la contribution en nature.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="p-6 bg-fps-primary-light rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Secteur minier</h3>
                    <p className="text-gray-600 mb-4">
                      Plusieurs grandes entreprises minières opérant en RDC contribuent au financement des programmes de santé dans leurs zones d'exploitation, en particulier pour les services de santé communautaire et la prévention des maladies professionnelles.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Gécamines</span>
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Tenke Fungurume</span>
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Kibali Gold</span>
                    </div>
                  </div>
                  <div className="p-6 bg-fps-primary-light rounded-lg">
                    <h3 className="text-xl font-semibold text-[var(--primary)] mb-3">Télécommunications</h3>
                    <p className="text-gray-600 mb-4">
                      Les opérateurs de téléphonie mobile soutiennent les initiatives de santé numérique et de sensibilisation par SMS, contribuant à améliorer l'accès à l'information sanitaire dans les zones reculées.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Vodacom</span>
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Orange</span>
                      <span className="px-3 py-1 bg-fps-primary-light text-[var(--primary)] rounded-full text-sm">Airtel</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Devenir partenaire</h3>
                  <p className="text-gray-600 mb-6">
                    Le FPS est constamment à la recherche de nouveaux partenaires pour soutenir ses programmes et contribuer à l'amélioration de la santé publique en RDC. Si votre organisation souhaite collaborer avec nous, n'hésitez pas à nous contacter.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
                    Contactez-nous
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
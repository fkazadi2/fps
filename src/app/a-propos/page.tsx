import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { Building, Stethoscope, Leaf, Pill, Users2, HandCoins } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

// Rediriger vers la page dynamique qui sera gérée par le CMS
// Ce composant gère la page principale "À propos", tandis que les sous-pages
// (histoire, mission, gouvernance, juridique) restent des pages statiques
export default function AboutPage() {
  return (
    <MainLayout>
      <div className="w-full bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="À propos du FPS"
          description="Découvrez notre mission et notre vision pour l'amélioration de  qualité de santé de l'offre des soins et des services de santé en RDC"
          icon={Building}
          variant="teal"
          breadcrumbs={[
            { name: "Qui sommes-nous", href: "/a-propos" }
          ]}
          backgroundImage="/images/banners/qui-nous-sommes/banner_qui_sommes_nous.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          variant="blue"
          image="/images/522929587_663562896739316_7745634594645377162_n.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-5xl mx-auto px-4">
          <div>

            <div className="mt-12 mb-16">
              <h2 className="text-3xl font-extrabold text-[var(--primary)] mb-8 border-b-2 border-[var(--accent)] pb-2 inline-block">
                Notre histoire
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Le Fonds de Promotion de la Santé (FPS) a été créé en 2018 par la Loi n°18/035 du 13 décembre 2018 pour répondre aux défis persistants du financement de la santé en République Démocratique du Congo.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Né de la volonté de renforcer le système de santé congolais et d'améliorer l'accès aux soins pour tous, le FPS représente une innovation majeure dans le paysage sanitaire du pays. Depuis sa création, il a mobilisé des ressources significatives et mis en œuvre des programmes qui ont contribué à l'amélioration des indicateurs de santé dans plusieurs provinces.
              </p>
            </div>

            <div className="mt-12 mb-16">
              <h2 className="text-3xl font-extrabold text-[var(--primary)] mb-8 border-b-2 border-[var(--accent)] pb-2 inline-block">
                Notre mission
              </h2>
              <p className="text-lg text-gray-700 mb-8 font-medium">
                Le Fonds de Promotion de la Santé a notamment pour missions de :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mission 1 */}
                <div className="bg-white border-l-4 border-[var(--primary)] p-6 rounded-r-xl shadow-md hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[var(--primary)] mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Financer les projets d’infrastructures sanitaires, d’équipements médicaux ainsi que promouvoir la production locale des médicaments autre intrants spécifiques ;
                  </p>
                </div>

                {/* Mission 2 */}
                <div className="bg-white border-l-4 border-[var(--accent)] p-6 rounded-r-xl shadow-md hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-[var(--accent)] mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Financer la promotion de la médecine traditionnelle ;
                  </p>
                </div>

                {/* Mission 3 */}
                <div className="bg-white border-l-4 border-[var(--primary)] p-6 rounded-r-xl shadow-md hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[var(--primary)] mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Pill className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Financer l’approvisionnement en médicaments essentiels y compris les contraceptifs, les vaccins et autres intrants de santé publique ;
                  </p>
                </div>

                {/* Mission 4 */}
                <div className="bg-white border-l-4 border-[var(--accent)] p-6 rounded-r-xl shadow-md hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-[var(--accent)] mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Financer la gouvernance du secteur de la santé, la planification, le développement des ressources humaines du secteur de la santé ;
                  </p>
                </div>

                {/* Mission 5 */}
                <div className="bg-white border-l-4 border-[var(--primary)] p-6 rounded-r-xl shadow-md hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[var(--primary)] mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <HandCoins className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Subventionner les Etablissements de Services et Soins de Santé et Pharmaceutiques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation vers les sous-pages */}
          <div className="mt-10 mb-12 border-t border-b border-gray-200 py-8">
            <h3 className="text-xl font-semibold mb-6 text-fps-primary">Pages détaillées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/a-propos/histoire" className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-fps-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fps-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="text-center font-medium text-gray-800">Notre histoire</span>
              </Link>
              <Link href="/a-propos/mission" className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-fps-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fps-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span className="text-center font-medium text-gray-800">Mission et vision</span>
              </Link>
              <Link href="/a-propos/gouvernance" className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-fps-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fps-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <span className="text-center font-medium text-gray-800">Structure de gouvernance</span>
              </Link>
              <Link href="/a-propos/juridique" className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-fps-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fps-primary mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
                <span className="text-center font-medium text-gray-800">Cadre juridique</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
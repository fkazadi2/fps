import { Microscope, BookOpen, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function RechercheMedicalePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Recherche en médecine"
          description=""
          icon={Microscope}
          variant="blue"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Recherche en médecine", href: "/gouvernance-sante/recherche-medicale" }
          ]}
          backgroundImage="/images/banners/gouvernance-sante/banner-recherche.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          image="/images/featured-images/gouvernance-sante/featured-laboratoire.JPG"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-fps-primary mb-6 flex items-center">
              <Microscope className="h-8 w-8 mr-3" />
              Objectifs de la recherche en médecine
            </h3>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</span>
                <p className="text-lg">Promouvoir la valorisation des résultats de la recherche en médecine</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</span>
                <p className="text-lg">Contribuer à l'intégration des résultats de recherche dans les politiques de santé publique</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</span>
                <p className="text-lg">Développer des partenariats avec les universités, instituts de recherche et centres hospitaliers</p>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Innovation et développement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Solutions locales</h3>
                <p className="text-blue-600">Adaptées au contexte congolais</p>
              </div>
              <div className="text-center">
                <Microscope className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Recherche appliquée</h3>
                <p className="text-blue-600">Impact direct sur les politiques</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Documentation</h3>
                <p className="text-blue-600">Capitalisation des expériences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
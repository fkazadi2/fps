import { GraduationCap, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function CapacitationPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Financement du renforcement des capacités des ressources humaines du secteur santé"
          description=""
          icon={GraduationCap}
          variant="teal"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Capacitation", href: "/gouvernance-sante/capacitation" }
          ]}
          backgroundImage="/images/banners/gouvernance-sante/banner-capatitation.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          image="/images/featured-images/gouvernance-sante/featured-financement-capacitation.jpg"
          variant="teal"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white border-l-4 border-teal-500 shadow-sm rounded-r-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-fps-primary mb-6 flex items-center">
              <GraduationCap className="h-8 w-8 mr-3" />
              Missions de capacitation des ressources humaines
            </h3>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</span>
                <p className="text-lg">Identifier, analyser et prioriser les besoins nationaux en renforcement des capacités des RH.</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</span>
                <p className="text-lg">Elaborer et appuyer la mise en oeuvre des stratégies de financement du développement des RH en santé</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</span>
                <p className="text-lg">Participer au suivi du financement de la formation continue, de la spécialisation; le renforcement des capacités du personnel de santé</p>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Réalisations formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">139</h3>
                <p className="text-green-700">Prestataires formés aux bonnes pratiques transfusionnelles</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">333</h3>
                <p className="text-green-700">ESS avec personnel formé aux protocoles CSU</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">100%</h3>
                <p className="text-green-700">Personnel des ambulances certifié urgences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
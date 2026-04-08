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
          title="Capacitation du personnel"
          description="Formation continue, développement des compétences et certification du personnel de santé pour une meilleure qualité des soins"
          icon={GraduationCap}
          variant="purple"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Capacitation", href: "/gouvernance-sante/capacitation" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={GraduationCap}
          label="Formation et Perfectionnement du Personnel de Santé"
          variant="purple"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Programmes de formation</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Formation en soins obstétricaux d&apos;urgence</li>
                <li>• Gestion des médicaments essentiels</li>
                <li>• Bonnes pratiques transfusionnelles</li>
                <li>• Système d&apos;information sanitaire</li>
                <li>• Gestion administrative des ESS</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Certifications</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Certification en transfusion sanguine</li>
                <li>• Accréditation CSU</li>
                <li>• Formation continue obligatoire</li>
                <li>• Évaluation des compétences</li>
                <li>• Mise à jour des protocoles</li>
              </ul>
            </div>
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
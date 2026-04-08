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
          title="Recherche médicale"
          description="Promotion de la recherche en santé, études épidémiologiques et développement de solutions adaptées au contexte local"
          icon={Microscope}
          variant="blue"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Recherche médicale", href: "/gouvernance-sante/recherche-medicale" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Microscope}
          label="Innovation et Recherche Scientifique en Santé"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Microscope className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Domaines de recherche</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Épidémiologie des maladies tropicales</li>
                <li>• Efficacité des interventions CSU</li>
                <li>• Médecine traditionnelle et phytothérapie</li>
                <li>• Santé maternelle et infantile</li>
                <li>• Systèmes de santé</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Publications et études</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Rapports d&apos;évaluation CSU</li>
                <li>• Études d&apos;impact des programmes</li>
                <li>• Recherche opérationnelle</li>
                <li>• Collaboration universitaire</li>
                <li>• Partage des bonnes pratiques</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Innovation et développement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Solutions locales</h3>
                <p className="text-purple-600">Adaptées au contexte congolais</p>
              </div>
              <div className="text-center">
                <Microscope className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Recherche appliquée</h3>
                <p className="text-purple-600">Impact direct sur les politiques</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Documentation</h3>
                <p className="text-purple-600">Capitalisation des expériences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Users, BookOpen } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function FormationPraticiensPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Formation des praticiens"
          description="Programmes de formation et certification pour les praticiens de médecine traditionnelle"
          icon={GraduationCap}
          variant="green"
          breadcrumbs={[
            { name: "Médecine Traditionnelle", href: "/medecine-traditionnelle" },
            { name: "Formation", href: "/medecine-traditionnelle/formation-praticiens" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={GraduationCap}
          label="Professionnalisation et Renforcement des Compétences des Praticiens"
          variant="green"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Cursus de formation</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Anatomie et physiologie de base</li>
                <li>• Pharmacognosie traditionnelle</li>
                <li>• Diagnostic traditionnel</li>
                <li>• Préparation des remèdes</li>
                <li>• Éthique et déontologie</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibent text-fps-primary">Certification</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Examen théorique et pratique</li>
                <li>• Stage supervisé</li>
                <li>• Évaluation continue</li>
                <li>• Attestation officielle</li>
                <li>• Renouvellement périodique</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Objectifs de formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Standardisation</h3>
                <p className="text-green-600">Harmoniser les pratiques</p>
              </div>
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Professionnalisation</h3>
                <p className="text-green-600">Élever le niveau de compétence</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Intégration</h3>
                <p className="text-green-600">Collaboration avec système moderne</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
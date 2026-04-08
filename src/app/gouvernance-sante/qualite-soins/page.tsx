import { HeartPulse, Award, CheckCircle, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function QualiteSoinsPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Qualité des soins"
          description="Mise en place de standards de qualité, protocoles de soins et systèmes d'évaluation continue des performances"
          icon={HeartPulse}
          variant="violet"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Qualité des soins", href: "/gouvernance-sante/qualite-soins" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={HeartPulse}
          label="Excellence Clinique et Sécurité des Soins de Santé"
          variant="purple"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Standards de qualité</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Protocoles de soins standardisés</li>
                <li>• Certification ISO des établissements</li>
                <li>• Audits qualité réguliers</li>
                <li>• Indicateurs de performance</li>
                <li>• Amélioration continue</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Évaluation continue</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Satisfaction des patients</li>
                <li>• Taux de mortalité maternelle</li>
                <li>• Temps d&apos;attente</li>
                <li>• Efficacité des traitements</li>
                <li>• Sécurité des soins</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Objectifs qualité CSU</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Accessibilité</h3>
                <p className="text-blue-600">Soins de qualité pour tous</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Excellence</h3>
                <p className="text-blue-600">Standards internationaux</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Sécurité</h3>
                <p className="text-blue-600">Soins sans risque</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
import { Scale, FileText, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function ReglementationPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Réglementation"
          description="Cadre juridique et normes pour encadrer la pratique de la médecine traditionnelle en RDC"
          backgroundImage="/images/banners/medecine-traditionnelle/banner-reglementation.jpg"
          icon={Scale}
          variant="green"
          breadcrumbs={[
            { name: "Médecine Traditionnelle", href: "/medecine-traditionnelle" },
            { name: "Réglementation", href: "/medecine-traditionnelle/reglementation" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Scale}
          label="Encadrement Juridique et Normatif de la Médecine Traditionnelle"
          variant="green"
          image="/images/featured-images/medecine-traditionnelle/reglementation.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Cadre légal</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Loi sur la médecine traditionnelle</li>
                <li>• Décrets d&apos;application</li>
                <li>• Arrêtés ministériels</li>
                <li>• Normes de qualité</li>
                <li>• Procédures d&apos;homologation</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Protection et sécurité</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Contrôle qualité des produits</li>
                <li>• Certification des praticiens</li>
                <li>• Surveillance pharmacovigilance</li>
                <li>• Protection des patients</li>
                <li>• Éthique et déontologie</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Mission du FPS</h2>
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <p className="text-lg text-blue-700">
                <strong>Soutenir la médecine traditionnelle et la production locale pharmaceutique</strong> 
                dans le cadre de ses missions principales définies par décret en 2022.
              </p>
            </div>
            <p className="text-blue-600">
              Cette mission vise à valoriser les savoirs ancestraux, structurer les pratiques traditionnelles 
              et développer une industrie pharmaceutique locale adaptée aux besoins de la population congolaise.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
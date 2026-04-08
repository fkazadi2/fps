import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Leaf, FileText, GraduationCap, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function MedecineTraditionellePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Médecine traditionnelle"
          description="Soutien à la médecine traditionnelle et promotion de la production locale pharmaceutique"
          icon={Leaf}
          variant="green"
          breadcrumbs={[
            { name: "Médecine Traditionnelle", href: "/medecine-traditionnelle" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Leaf}
          label="Valorisation du Patrimoine et Pharmacopée Locale"
          variant="green"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Mission du FPS */}
          <div className="mb-12">
            <div className="bg-fps-primary-light p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-fps-primary mb-6">Mission du FPS</h2>
              <p className="text-lg text-gray-700">
                Le FPS est chargé de <strong>soutenir la médecine traditionnelle et la production locale pharmaceutique </strong>
                dans le cadre de ses missions principales définies par décret en 2022.
              </p>
            </div>
          </div>

          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Link href="/medecine-traditionnelle/reglementation" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Réglementation</h3>
              </div>
              <p className="text-gray-600">
                Cadre juridique et normes pour la pratique de la médecine traditionnelle.
              </p>
            </Link>

            <Link href="/medecine-traditionnelle/formation-praticiens" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Formation des praticiens</h3>
              </div>
              <p className="text-gray-600">
                Programmes de formation et certification des praticiens.
              </p>
            </Link>

            <Link href="/medecine-traditionnelle/promotion-initiatives" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Promotion des initiatives locales</h3>
              </div>
              <p className="text-gray-600">
                Soutien aux initiatives locales et développement pharmaceutique.
              </p>
            </Link>
          </div>

          {/* Enjeux et objectifs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Enjeux et objectifs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">
                  <Leaf className="inline h-6 w-6 mr-2" />
                  Valorisation du patrimoine
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Préservation des savoirs ancestraux</li>
                  <li>• Documentation des pratiques traditionnelles</li>
                  <li>• Recherche sur les plantes médicinales</li>
                  <li>• Protection de la biodiversité médicinale</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">
                  <TrendingUp className="inline h-6 w-6 mr-2" />
                  Développement économique
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Production locale de médicaments</li>
                  <li>• Création d&apos;emplois dans le secteur</li>
                  <li>• Réduction de la dépendance aux importations</li>
                  <li>• Accessibilité financière des traitements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact attendu */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact attendu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">50%</div>
                <p className="text-gray-700">Réduction des coûts de traitement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">1000+</div>
                <p className="text-gray-700">Praticiens formés et certifiés</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-fps-primary mb-2">80%</div>
                <p className="text-gray-700">Population ayant accès</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
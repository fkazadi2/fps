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
          description="Promouvoir  la médecine traditionnelle en RDC"
          backgroundImage="/images/banners/medecine-traditionnelle/banner-medecine-traditionnelle.jpg"
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
          image="/images/featured-images/medecine-traditionnelle/medecine-traditionnelle.jpg"
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
            <div className="bg-white border-l-4 border-green-500 shadow-sm rounded-r-lg p-8">
              <ul className="space-y-6 text-gray-700">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</span>
                  <p className="text-lg">Appuyer la mise en œuvre de la politique nationale de la médecine traditionnelle</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</span>
                  <p className="text-lg">Promouvoir la qualité, la sécurité et la traçabilité des produits, de la pharmacopée traditionnelle, fournir les normes de qualité pour les médicaments prioritaires et essentiels afin d'assurer leur sécurité et leur efficacité</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</span>
                  <p className="text-lg">Encourager la recherche scientifique sur la médecine traditionnelle</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">4</span>
                  <p className="text-lg">Appuyer la mise en place d'un registre national des praticiens connus et la production locale des médicaments à base des plantes</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">5</span>
                  <p className="text-lg">Financer une stratégie d'assurance qualité des produits et pratiques traditionnels en lien avec les autorités compétentes</p>
                </li>
              </ul>
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
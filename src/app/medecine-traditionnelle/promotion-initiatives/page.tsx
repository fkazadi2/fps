import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, Heart, Sprout, HandHeart, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function PromotionInitiativesPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Promotion des initiatives locales"
          description="Soutien aux communautés locales et valorisation des pratiques traditionnelles de santé"
          icon={TrendingUp}
          variant="green"
          breadcrumbs={[
            { name: "Médecine Traditionnelle", href: "/medecine-traditionnelle" },
            { name: "Promotion", href: "/medecine-traditionnelle/promotion-initiatives" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={TrendingUp}
          label="Soutien à la Production Locale et aux Initiatives Communautaires"
          variant="green"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Sprout className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Valorisation des savoirs</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Documentation des pratiques ancestrales</li>
                <li>• Recherche sur les plantes médicinales</li>
                <li>• Préservation des connaissances</li>
                <li>• Transmission intergénérationnelle</li>
                <li>• Création de jardins botaniques</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <HandHeart className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Soutien communautaire</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>• Financement des projets locaux</li>
                <li>• Formation des guérisseurs traditionnels</li>
                <li>• Équipement des centres de soins</li>
                <li>• Sensibilisation des communautés</li>
                <li>• Partenariats avec les chefs traditionnels</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-orange-800 mb-6">Impact des initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Heart className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Accès aux soins</h3>
                <p className="text-orange-600">Amélioration de l&apos;accessibilité</p>
              </div>
              <div className="text-center">
                <Sprout className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Biodiversité</h3>
                <p className="text-orange-600">Protection des ressources naturelles</p>
              </div>
              <div className="text-center">
                <HandHeart className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-orange-800 mb-2">Autonomie</h3>
                <p className="text-orange-600">Renforcement des capacités locales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
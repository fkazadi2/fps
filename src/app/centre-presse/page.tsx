import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { Calendar, Camera, Mic2 } from "lucide-react";

export default function CentrePressePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Centre de Presse"
          description="Actualités, événements et galerie média du Fonds de Promotion de la Santé"
          icon={Mic2}
          variant="blue"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Mic2}
          label="Communication et Relations Médias du FPS"
          variant="blue"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Restez informé de nos actualités
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Le Centre de Presse du FPS vous donne accès à toutes nos actualités, événements et ressources médias. 
              Découvrez nos réalisations phares, nos événements à venir et notre galerie photo.
            </p>
          </div>

          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/centre-presse/galerie" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Camera className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Galerie Photo</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Découvrez nos activités en images : dotations en médicaments, équipements, formations, 
                inaugurations de centres de santé et campagnes de collecte de sang.
              </p>
              <div className="text-fps-primary font-medium hover:text-fps-secondary">
                Voir la galerie →
              </div>
            </Link>

            <Link href="/centre-presse/evenements" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Événements</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Consulter notre agenda d&apos;événements : conférences sur la CSU, ateliers de formation, 
                inaugurations et rencontres avec nos partenaires.
              </p>
              <div className="text-fps-primary font-medium hover:text-fps-secondary">
                Voir les événements →
              </div>
            </Link>
          </div>

          {/* Section réalisations phares */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Nos réalisations phares (2023-2024)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Dotation en Médicaments</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>7,2 millions USD</strong> engagés pour 333 ESS
                </p>
                <p className="text-gray-600 text-sm">
                  Objectif : gratuité de l&apos;accouchement dans le cadre de la CSU
                </p>
              </div>

              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Équipements & Ambulances</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>4,47 millions USD</strong> d&apos;équipements
                </p>
                <p className="text-gray-600 text-sm">
                  Kits d&apos;accouchement, couveuses, lits hospitaliers
                </p>
              </div>

              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Système de transfert</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>16 ambulances</strong> opérationnelles
                </p>
                <p className="text-gray-600 text-sm">
                  Plus de 1 400 transferts de femmes et enfants réalisés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
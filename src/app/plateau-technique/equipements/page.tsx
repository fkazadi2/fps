import { Microscope, Package, DollarSign, Truck, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function EquipementsPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Financement et dotation en équipements"
          description="Kits d'accouchement, couveuses, lits hospitaliers et matériels de soins pour moderniser nos établissements de santé"
          icon={Microscope}
          variant="amber"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Équipements", href: "/plateau-technique/equipements" }
          ]}
          backgroundImage="/images/banners/plateau-technique/banner-equipements.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Microscope}
          label="Équipements Médicaux de Pointe pour la RDC"
          variant="blue"
          image="/images/featured-images/plateau-technique/featured-financement-equipements.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Réalisations chiffrées */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Réalisations (2023-2024)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <DollarSign className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-blue-800 mb-2">4,47M USD</h3>
                <p className="text-blue-700">Financement total estimé</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Truck className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">1,8M USD</h3>
                <p className="text-green-700">En cours de livraison</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <Package className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-purple-800 mb-2">400K USD</h3>
                <p className="text-purple-700">Cash versé aux ESS</p>
              </div>
            </div>
          </div>

          {/* Types d'équipements */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Types d&apos;équipements fournis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">
                  <Heart className="inline h-6 w-6 mr-2" />
                  Équipements médicaux
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kits d&apos;accouchement complets</li>
                  <li>• Couveuses pour nouveau-nés</li>
                  <li>• Moniteurs de signes vitaux</li>
                  <li>• Tables d&apos;accouchement</li>
                  <li>• Appareils d&apos;échographie</li>
                  <li>• Matériel de réanimation néonatale</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-fps-primary mb-4">
                  <Package className="inline h-6 w-6 mr-2" />
                  Équipements hospitaliers
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lits hospitaliers ajustables</li>
                  <li>• Matelas médicaux</li>
                  <li>• Draps et blouses médicales</li>
                  <li>• Chariots de soins</li>
                  <li>• Équipements de stérilisation</li>
                  <li>• Mobilier médical spécialisé</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact sur la qualité des soins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Amélioration des conditions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Réduction des risques lors des accouchements</li>
                  <li>• Meilleur confort pour les patientes</li>
                  <li>• Conditions de travail améliorées pour le personnel</li>
                  <li>• Conformité aux standards internationaux</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Bénéficiaires</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 229 ESS ont reçu des dotations cash</li>
                  <li>• Femmes enceintes et nouveau-nés prioritaires</li>
                  <li>• Personnel de santé formé à l&apos;utilisation</li>
                  <li>• Communautés des zones rurales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
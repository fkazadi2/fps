import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Building, Stethoscope, Truck, Activity, FileText } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function PlateauTechniquePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Plateau technique"
          description="Financement et modernisation des infrastructures sanitaires, équipements médicaux et médicaments essentiels"
          icon={Stethoscope}
          variant="blue"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Stethoscope}
          label="Modernisation et Équipement des Structures de Santé en RDC"
          variant="blue"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Diagnostic du système de santé en RDC
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-fps-primary-light p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-fps-primary mb-2">13 316</h3>
                <p className="text-gray-700">Centres de Santé</p>
                <p className="text-sm text-gray-600 mt-1">(seulement 2 500 aux normes)</p>
              </div>
              <div className="bg-fps-primary-light p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-fps-primary mb-2">433</h3>
                <p className="text-gray-700">Hôpitaux Généraux de Référence</p>
              </div>
              <div className="bg-fps-primary-light p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-fps-primary mb-2">649</h3>
                <p className="text-gray-700">Centres Hospitaliers</p>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-gray-700">
                <strong>Défi majeur :</strong> 60% des structures privées lucratives sont concentrées à Kinshasa. 
                Un besoin urgent de réhabilitation/construction existe dans 36 zones de santé.
              </p>
            </div>
          </div>

          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link href="/plateau-technique/infrastructures" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Infrastructures sanitaires</h3>
              </div>
              <p className="text-gray-600">
                Réhabilitation et construction de centres de santé, hôpitaux et structures sanitaires aux normes.
              </p>
            </Link>

            <Link href="/plateau-technique/medicaments" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Stethoscope className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Dotation en médicaments</h3>
              </div>
              <p className="text-gray-600">
                Approvisionnement en médicaments essentiels pour garantir la gratuité de l&apos;accouchement.
              </p>
            </Link>

            <Link href="/plateau-technique/equipements" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Dotation en équipements</h3>
              </div>
              <p className="text-gray-600">
                Kits d&apos;accouchement, couveuses, lits hospitaliers et matériels de soins.
              </p>
            </Link>

            <Link href="/plateau-technique/banque-de-sang" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Activity className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Banque de sang</h3>
              </div>
              <p className="text-gray-600">
                Formation aux bonnes pratiques transfusionnelles et campagnes de collecte de sang.
              </p>
            </Link>

            <Link href="/plateau-technique/classification-ess" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Classification des ESS</h3>
              </div>
              <p className="text-gray-600">
                Classification et normalisation des Établissements de Santé Soutenus.
              </p>
            </Link>
          </div>

          {/* Réalisations phares */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Nos réalisations (2023-2024)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Dotation en Médicaments Essentiels</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• <strong>7,2 millions USD</strong> engagés</li>
                  <li>• <strong>333 ESS</strong> bénéficiaires</li>
                  <li>• <strong>6 contrats</strong> signés</li>
                  <li>• Plus de <strong>4,9 millions USD</strong> déjà affectés</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Équipements et Matériels</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• <strong>4,47 millions USD</strong> d&apos;équipements</li>
                  <li>• <strong>1,8 million USD</strong> en cours de livraison</li>
                  <li>• <strong>400 000 USD</strong> versés en cash à 229 ESS</li>
                  <li>• Matériels non médicaux fournis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
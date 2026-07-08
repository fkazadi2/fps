import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Building, Stethoscope, Truck, Activity, MapPin, Building2, Hospital, FileSignature } from "lucide-react";
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
          backgroundImage="/images/banners/plateau-technique/banner-plateau-technique.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Stethoscope}
          label="Modernisation et Équipement des Structures de Santé en RDC"
          variant="blue"
          image="/images/featured-images/plateau-technique/featured-plateau.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-10 rounded-full bg-fps-primary"></div>
              <h2 className="text-2xl font-bold text-fps-primary">Plateau Technique</h2>
              <div className="h-1 flex-1 rounded-full bg-gray-100"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Card 1 – Zones de santé */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src="/images/plateau/zones-de-sante.jpg" alt="Zones de santé" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-fps-primary/90 via-fps-primary/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-4xl font-extrabold text-white drop-shadow-lg">516</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-white px-5 py-4 border-t-4 border-fps-primary">
                  <p className="font-semibold text-gray-800">Zones de santé</p>
                  <p className="text-xs text-gray-400 mt-0.5">Couverture nationale</p>
                </div>
              </div>

              {/* Card 2 – HGR */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src="/images/plateau/HGR.jpg" alt="Hôpitaux Généraux de Référence" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-800/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-4xl font-extrabold text-white drop-shadow-lg">393</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-white px-5 py-4 border-t-4 border-teal-600">
                  <p className="font-semibold text-gray-800">Hôpitaux Généraux de Référence</p>
                  <p className="text-xs text-gray-400 mt-0.5">HGR répertoriés</p>
                </div>
              </div>

              {/* Card 3 – Centres de santé de référence */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src="/images/plateau/centre-de-sante.jpg" alt="Centres de santé de référence" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-4xl font-extrabold text-white drop-shadow-lg">516</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <Hospital className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-white px-5 py-4 border-t-4 border-blue-600">
                  <p className="font-semibold text-gray-800">Centres de santé de référence</p>
                  <p className="text-xs text-gray-400 mt-0.5">À travers le pays</p>
                </div>
              </div>

              {/* Card 4 – Centres de santé */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src="/images/plateau/centres.jpg" alt="Centres de santé" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-4xl font-extrabold text-white drop-shadow-lg">8 266</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-white px-5 py-4 border-t-4 border-emerald-600">
                  <p className="font-semibold text-gray-800">Centres de santé</p>
                  <p className="text-xs text-gray-400 mt-0.5">Opérationnels en RDC</p>
                </div>
              </div>

              {/* Card 5 – Contrats signés (wide) */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2">
                <div className="relative h-52 overflow-hidden">
                  <img src="/images/plateau/contrats-signes.jpg" alt="Contrats signés" className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 flex items-end gap-6">
                    <div>
                      <p className="text-4xl font-extrabold text-white drop-shadow-lg">857</p>
                    </div>
                    <div className="text-white/80 text-sm pb-1 hidden sm:block">
                      <p>• 350 à Kinshasa</p>
                      <p>• 495 au Kongo central</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                    <FileSignature className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="bg-white px-5 py-4 border-t-4 border-gray-700">
                  <p className="font-semibold text-gray-800">Contrats signés</p>
                  <p className="text-xs text-gray-400 mt-0.5">Dont 350 à Kinshasa et 495 dans le Kongo central. Pour le Kasaï, le processus est en cours.</p>
                </div>
              </div>

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
                Réhabilitation et construction de centres de santé, hôpitaux et structures sanitaires qui répondent aux normes pour une meilleure qualité de soin.
              </p>
            </Link>

            <Link href="/plateau-technique/medicaments" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Stethoscope className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Financement en médicaments</h3>
              </div>
              <p className="text-gray-600">
                Assurer la disponibilité des médicaments essentiels pour garantir l'accès aux soins de Santé pour tous.
              </p>
            </Link>

            <Link href="/plateau-technique/equipements" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Financement et dotation en équipements</h3>
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

          </div>

          {/* Réalisations phares */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Nos réalisations (2023-2024)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Financement en médicaments Essentiels</h3>
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
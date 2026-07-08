import { Building, MapPin, TrendingUp, AlertTriangle, Building2, Hospital, Activity, FileSignature } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function InfrastructuresPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Infrastructures sanitaires"
          description="Réhabilitation et construction de centres de santé, hôpitaux et structures sanitaires qui répondent aux normes pour une couverture universelle pour une meilleure qualité de soin."
          icon={Building}
          variant="orange"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Infrastructures", href: "/plateau-technique/infrastructures" }
          ]}
          backgroundImage="/images/banners/plateau-technique/banner-infrastructures-sanitaires.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Building}
          label="Chantiers et Infrastructures de Santé en RDC"
          variant="blue"
          image="/images/featured-images/plateau-technique/featured-infrastructures-sanitaires.jpg"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* État actuel des infrastructures */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-10 rounded-full bg-fps-primary"></div>
              <h2 className="text-2xl font-bold text-fps-primary">État actuel des Infrastructures</h2>
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

          {/* Défis majeurs */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-yellow-800">Concentration urbaine</h3>
                </div>
                <p className="text-yellow-700 mb-4">
                  <strong>60% des structures privées lucratives</strong> sont concentrées à Kinshasa, créant une inégalité d&apos;accès majeure :
                </p>
                <ul className="space-y-2 text-yellow-600">
                  <li>• Zones rurales sous-desservies;</li>
                  <li>• Difficultés d&apos;accès aux soins spécialisés;</li>
                  <li>• Coûts de transport prohibitifs.</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-red-800">Zones prioritaires</h3>
                </div>
                <p className="text-red-700 mb-4">
                  <strong>36 zones de santé</strong> nécessitent une réhabilitation ou construction urgente d&apos;infrastructures :
                </p>
                <ul className="space-y-2 text-red-600">
                  <li>• Bâtiments vétustes ou endommagés;</li>
                  <li>• Manque d&apos;équipements de base;</li>
                  <li>• Absence d&apos;électricité/eau potable.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projets Phares */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Projets & Réalisations Phares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Projet 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src="/images/renaissance-mama-yemo-20240828.jpg"
                    alt="Renaissance Hôpital Mama Yemo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-fps-primary mb-2">Renaissance de l'Hôpital Mama Yemo</h3>
                  <p className="text-gray-600">Projet de réhabilitation et de modernisation pour offrir des soins aux standards internationaux.</p>
                </div>
              </div>

              {/* Projet 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src="/images/hopital-ciquantenaire.jpg"
                    alt="Centre Hospitalier Universitaire du Cinquantenaire"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-fps-primary mb-2">Centre Hospitalier Universitaire du Cinquantenaire</h3>
                  <p className="text-gray-600">Une infrastructure sanitaire de pointe au cœur de la capitale pour garantir une couverture de santé optimale.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan d'action */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Plan d&apos;action</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-fps-primary text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                  <h3 className="text-xl font-semibold text-fps-primary ml-4">Réhabilitation prioritaire</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Mise aux normes des 2 500 centres de santé existants avec financement ciblé :
                </p>
                <ul className="space-y-1 text-gray-600 ml-14">
                  <li>• Réfection des toitures et installations électriques;</li>
                  <li>• Aménagement de blocs opératoires;</li>
                  <li>• Installation de systèmes d&apos;assainissement.</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-fps-primary text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                  <h3 className="text-xl font-semibold text-fps-primary ml-4">Construction nouvelles structures</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  Édification de nouveaux centres dans les zones sous-desservies :
                </p>
                <ul className="space-y-1 text-gray-600 ml-14">
                  <li>• Centres de santé communautaires;</li>
                  <li>• Postes de santé en zones rurales;</li>
                  <li>• Maternités équipées.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Impact attendu */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Impact attendu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Amélioration de l&apos;accès</h3>
                <p className="text-gray-700">Réduction des distances moyennes aux centres de santé</p>
              </div>
              <div className="text-center">
                <Building className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Qualité des soins</h3>
                <p className="text-gray-700">Structures conformes aux standards internationaux</p>
              </div>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-fps-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Équité territoriale</h3>
                <p className="text-gray-700">Répartition équilibrée des infrastructures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
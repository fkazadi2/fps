import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, Heart, Sprout, HandHeart, TrendingUp, MapPin, Building2, Hospital, Activity, FileSignature } from "lucide-react";
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
          backgroundImage="/images/banners/medecine-traditionnelle/promotionn-initiative.jpg"
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
          image="/images/featured-images/medecine-traditionnelle/promotion.JPG"
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

          {/* Plateau Technique */}
          <div className="mt-16">
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
        </div>
      </div>
    </MainLayout>
  );
}
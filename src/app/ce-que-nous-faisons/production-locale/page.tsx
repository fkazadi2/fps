import { Factory, Activity, Package, DollarSign } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";

export default function ProductionLocalePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        <PageHeader
          title="Production Locale"
          description="Accroître les capacités de production des industries locales"
          icon={Factory}
          variant="teal"
          breadcrumbs={[
            { name: "Ce que nous faisons", href: "/ce-que-nous-faisons" },
            { name: "Production Locale", href: "/ce-que-nous-faisons/production-locale" }
          ]}
          backgroundImage="/images/banners/plateau-technique/banner-medicaments.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Objectif */}
          <div className="mb-12 bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-4">Objectif</h2>
            <p className="text-lg text-gray-700">
              Accroître les capacités de production des industries locales afin d'améliorer la disponibilité des médicaments et de réduire la dépendance aux importations.
            </p>
          </div>

          {/* Activités */}
          <div className="mb-12 bg-white border-l-4 border-teal-500 shadow-sm rounded-r-lg p-8">
            <h3 className="text-2xl font-bold text-fps-primary mb-6 flex items-center">
              <Activity className="h-8 w-8 mr-3" />
              Activités
            </h3>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</span>
                <p className="text-lg"><strong>Promouvoir le partenariat public privé dans le secteur de la production des médicaments :</strong> financer les industries pharmaceutiques privées ou étatiques exerçant en RDC</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</span>
                <p className="text-lg">Financer l'acquisition d'équipements et d'infrastructures de production pharmaceutique locale</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</span>
                <p className="text-lg">Soutenir la production et la distribution des médicaments essentiels prioritaires</p>
              </li>
            </ul>
          </div>

          {/* Débuté en 2023 à 2025 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Réalisations (Débuté en 2023 à 2025)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center">
                <Package className="h-12 w-12 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-teal-800 mb-2">10 Cycles</h3>
                <p className="text-teal-700 font-medium mb-4">D'approvisionnement en médicaments réalisés</p>
                <div className="text-sm text-teal-600 space-y-1">
                  <p>• 5 cycles pour Kinshasa</p>
                  <p>• 3 cycles pour le Kongo central</p>
                  <p>• 2 cycles pour le Kasaï Oriental</p>
                </div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center flex flex-col justify-center">
                <DollarSign className="h-12 w-12 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-teal-800 mb-2">105 472 294,98 $</h3>
                <p className="text-teal-700 font-medium">Coût total</p>
              </div>
            </div>
          </div>



        </div>
      </div>
    </MainLayout>
  );
}

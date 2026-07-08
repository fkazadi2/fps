import { ArrowRightLeft, Truck, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function SystemeReferencesPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Système des références"
          description=""
          icon={ArrowRightLeft}
          variant="blue"
          breadcrumbs={[
            { name: "Gouvernance Santé", href: "/gouvernance-sante" },
            { name: "Système des références", href: "/gouvernance-sante/systeme-references" }
          ]}
          backgroundImage="/images/banners/gouvernance-sante/banner-systeme-reference.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          image="/images/featured-images/gouvernance-sante/featured-syteme-reference.jpg"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-fps-primary mb-6 flex items-center">
              <ArrowRightLeft className="h-8 w-8 mr-3" />
              Objectifs du système de références
            </h3>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">1</span>
                <p className="text-lg">Analyser les performances opérationnelles des ambulances (utilisation efficiente, couverture par zone de santé, delais d'intervention, etc)</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">2</span>
                <p className="text-lg">Evaluer le système de référence et de contre-référence des cas</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">3</span>
                <p className="text-lg">Examiner la collaboration entre les parties prenantes (ESS/Etoile-bleu/Croix-rouge/ANICNS/FPS);</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 font-bold text-sm">4</span>
                <p className="text-lg">Identifier les contraintes et goulots d'étranglement dans le processus opérationnel</p>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Système ambulances opérationnel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">16</h3>
                <p className="text-green-700">Ambulances opérationnelles à Kinshasa</p>
              </div>
              <div className="text-center">
                <ArrowRightLeft className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">1 400+</h3>
                <p className="text-green-700">Transferts femmes et enfants réalisés</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">802K USD</h3>
                <p className="text-green-700">Budget géré par Croix-Rouge RDC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
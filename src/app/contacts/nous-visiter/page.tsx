"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone, Car } from "lucide-react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

// Importation dynamique pour éviter les erreurs SSR avec Leaflet
const InteractiveMapFPS = dynamic(() => import("@/components/ui/InteractiveMapFPS"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">Chargement de la carte...</div>
});

export default function NousVisiterPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Nous visiter"
          description="Informations pratiques pour vous rendre au siège du FPS à Kinshasa"
          icon={MapPin}
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" },
            { name: "Nous visiter", href: "/contacts/nous-visiter" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={MapPin}
          label="Emplacement Stratégique du Siège du FPS au Cœur de Kinshasa"
          variant="blue"
        />

        {/* Image placeholder */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-64 md:h-96 rounded-xl overflow-hidden relative bg-gradient-to-br from-blue-600 via-[var(--primary)] to-[var(--secondary)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 p-6">
                <div className="w-24 h-24 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-center">Photo bâtiment siège FPS</p>
                <p className="text-sm text-white/70 text-center mt-2">À remplacer par photo réelle de terrain</p>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-24 h-24 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-2xl font-semibold text-fps-primary">Adresse du siège</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Fonds de Promotion de la Santé (FPS)</h4>
                  <p className="text-gray-700">
                    16, Av. Lukusa,<br />
                    Imm Les Palmiers, Apt 2A,<br />
                    Kinshasa-Gombe, RDC
                  </p>
                </div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+243 819 115 812</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+243 981 210 031</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-2xl font-semibold text-fps-primary">Horaires d&apos;ouverture</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="text-gray-600">08h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Samedi</span>
                  <span className="text-gray-600">08h00 - 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-gray-600">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-blue-800">Accès et transport</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">En voiture</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Parking disponible sur site</li>
                  <li>• Accès par Boulevard du 30 Juin</li>
                  <li>• Proche de l&apos;Hôpital Mama Yemo</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Transport public</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Arrêt Cliniques Universitaires</li>
                  <li>• Lignes de bus 12, 15, 18</li>
                  <li>• Taxi-moto disponible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Carte interactive</h3>
            <p className="text-gray-600 mb-6 text-center">
              Localisez facilement nos bureaux sur le Boulevard du 30 juin
            </p>
            <InteractiveMapFPS height="400px" className="w-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
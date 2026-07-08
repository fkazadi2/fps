"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone, Car } from "lucide-react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Image from "next/image";
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
          backgroundImage="/images/location.jpg"
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" },
            { name: "Nous visiter", href: "/contacts/nous-visiter" }
          ]}
        />



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
                    Imm Les Palmiers, Apt 3B,<br />
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
                  <span className="text-gray-600">Fermé</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-gray-600">Fermé</span>
                </div>
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
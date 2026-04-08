import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Building } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function AdressesProvincesPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Nos adresses en provinces"
          description="Retrouvez les coordonnées de nos antennes provinciales à travers la RDC"
          icon={Building}
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" },
            { name: "Adresses Provinces", href: "/contacts/adresses-provinces" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Building}
          label="Décentralisation et Présence Nationale du FPS"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Siège principal */}
          <div className="bg-fps-primary-light border border-fps-primary rounded-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Building className="h-8 w-8 text-fps-primary mr-3" />
              <h2 className="text-2xl font-semibold text-fps-primary">Siège principal - Kinshasa</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Adresse</h3>
                <p className="text-gray-700 mb-4">
                  16, Av. Lukusa,<br />
                  Imm Les Palmiers, Apt 2A,<br />
                  Kinshasa-Gombe, RDC
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Contacts</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+243 819 115 812</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+243 981 210 031</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href="mailto:secretariat@fps.cd" className="hover:text-fps-primary">secretariat@fps.cd</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-fps-primary mb-8">Antennes provinciales</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Antenne Bas-Congo */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Bas-Congo</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Matadi</p>
                    <p className="text-sm text-gray-600">Avenue Kabinda, Quartier Nzadi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:matadi@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">matadi@fps.cd</a>
                </div>
              </div>
            </div>

            {/* Antenne Bandundu */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Bandundu</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Bandundu</p>
                    <p className="text-sm text-gray-600">Avenue Lumumba, Centre-ville</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:bandundu@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">bandundu@fps.cd</a>
                </div>
              </div>
            </div>

            {/* Antenne Équateur */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Équateur</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Mbandaka</p>
                    <p className="text-sm text-gray-600">Avenue Mobutu, Quartier Wangata</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:mbandaka@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">mbandaka@fps.cd</a>
                </div>
              </div>
            </div>

            {/* Antenne Kasaï Oriental */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Kasaï Oriental</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Mbuji-Mayi</p>
                    <p className="text-sm text-gray-600">Avenue Tshiamala, Quartier Dibindi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:mbujimayi@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">mbujimayi@fps.cd</a>
                </div>
              </div>
            </div>

            {/* Antenne Katanga */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Katanga</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Lubumbashi</p>
                    <p className="text-sm text-gray-600">Avenue Mobutu, Commune Lubumbashi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:lubumbashi@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">lubumbashi@fps.cd</a>
                </div>
              </div>
            </div>

            {/* Antenne Orientale */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-6 w-6 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Antenne Orientale</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Kisangani</p>
                    <p className="text-sm text-gray-600">Avenue Lumumba, Quartier Makiso</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">+243 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <a href="mailto:kisangani@fps.cd" className="text-sm text-gray-600 hover:text-fps-primary">kisangani@fps.cd</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Expansion du réseau</h3>
            <p className="text-blue-700 mb-4">
              Le FPS continue d&apos;étendre son réseau d&apos;antennes provinciales pour mieux servir
              la population congolaise dans toutes les provinces du pays.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Prochaines ouvertures</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Nord-Kivu (Goma)</li>
                  <li>• Sud-Kivu (Bukavu)</li>
                  <li>• Maniema (Kindu)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Services disponibles</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Information et orientation</li>
                  <li>• Suivi des projets locaux</li>
                  <li>• Coordination avec les ESS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
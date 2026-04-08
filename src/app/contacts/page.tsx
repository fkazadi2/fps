import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { MapPin, Mail, Building, Calendar, Phone } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function ContactsPage() {

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Contacts"
          description="Nous visiter, nous écrire ou participer à nos événements - Toutes les informations pour nous contacter"
          icon={Phone}
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Phone}
          label="Siège Social et Réseau National du FPS"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Contact principal */}
          <div className="bg-fps-primary-light p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Direction générale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Marius MIKA NYEMBO</h3>
                <p className="text-gray-700 mb-2">DGE du FPS</p>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  dg@fps.cd
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-fps-primary mb-3">Siège social</h3>
                <p className="text-gray-700">Fonds de Promotion de la Santé</p>
                <p className="text-gray-600">République Démocratique du Congo</p>
              </div>
            </div>
          </div>

          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Link href="/contacts/nous-visiter" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Nous visiter</h3>
              </div>
              <p className="text-gray-600">
                Adresses et horaires d&apos;ouverture de nos bureaux.
              </p>
            </Link>

            <Link href="/contacts/nous-ecrire" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Mail className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Nous écrire</h3>
              </div>
              <p className="text-gray-600">
                Formulaires de contact et adresses email par service.
              </p>
            </Link>

            <Link href="/contacts/adresses-provinces" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Nos adresses en provinces</h3>
              </div>
              <p className="text-gray-600">
                Représentations et antennes du FPS dans tout le pays.
              </p>
            </Link>

            <Link href="/contacts/evenements" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-xl font-semibold text-fps-primary">Événements</h3>
              </div>
              <p className="text-gray-600">
                Agenda des événements et rencontres publiques.
              </p>
            </Link>
          </div>

          {/* Informations pratiques */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">Informations pratiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Horaires d&apos;ouverture</h3>
                <p className="text-green-700">Lundi - Vendredi</p>
                <p className="text-green-600">8h00 - 16h00</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Services d&apos;urgence</h3>
                <p className="text-green-700">Système ambulances</p>
                <p className="text-green-600">Croix-Rouge RDC</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Partenaires</h3>
                <p className="text-green-700">FSS, PTF, OMS</p>
                <p className="text-green-600">Ministère de la Santé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
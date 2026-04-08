import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MessageSquare, User } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function NousEcrirePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Nous écrire"
          description="Contactez-nous pour toute question, suggestion ou demande d'information"
          icon={Mail}
          variant="slate"
          breadcrumbs={[
            { name: "Contacts", href: "/contacts" },
            { name: "Nous écrire", href: "/contacts/nous-ecrire" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Mail}
          label="Communication et Correspondance avec les Services du FPS"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-2xl font-semibold text-fps-primary">Formulaire de contact</h3>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                    placeholder="+243 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d&apos;information</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="financement">Financement</option>
                    <option value="plainte">Plainte ou réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-fps-primary text-white py-3 px-6 rounded-md hover:bg-fps-secondary transition-colors font-medium"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Coordonnées directes */}
            <div className="space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <User className="h-8 w-8 text-fps-primary mr-3" />
                  <h3 className="text-2xl font-semibold text-fps-primary">Contact direct</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">DGE</h4>
                    <p className="text-gray-700">Marius MIKA NYEMBO</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href="mailto:dg@fps.cd" className="hover:text-fps-primary">dg@fps.cd</a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Secrétariat</h4>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+243 819 115 812</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>+243 981 210 031</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href="mailto:secretariat@fps.cd" className="hover:text-fps-primary">secretariat@fps.cd</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">Temps de réponse</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Demandes urgentes : 24-48h</li>
                  <li>• Demandes d&apos;information : 2-5 jours</li>
                  <li>• Partenariats : 1-2 semaines</li>
                  <li>• Autres demandes : 5-10 jours</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Langues acceptées</h4>
                <p className="text-blue-700">
                  Nous traitons les demandes en français, lingala et anglais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
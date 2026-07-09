"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle, Mail, Phone, MessageSquare, Send, User } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function NousEcrirePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      setStatus({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "nous-ecrire",
          ...formData,
          subject: formData.category,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi du message.");
      }

      setStatus({
        type: "success",
        message: "Votre message a été envoyé avec succès.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Erreur lors de l'envoi du message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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


        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-8 w-8 text-fps-primary mr-3" />
                <h3 className="text-2xl font-semibold text-fps-primary">Formulaire de contact</h3>
              </div>

              {status.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${status.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
                  }`}>
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${status.type === "success" ? "text-green-800" : "text-red-800"}`}>
                    {status.message}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="write-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="write-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="write-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="write-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="write-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="write-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                    placeholder="+243 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="write-category" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="write-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d&apos;information</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="financement">Financement</option>
                    <option value="plainte">Plainte ou réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="write-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="write-message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fps-primary focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-fps-primary text-white py-3 px-6 rounded-md hover:bg-fps-secondary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
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

"use client";

import { useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  User,
  Building,
  Calendar,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    subject: "",
    message: ""
  });

  const [reclamationData, setReclamationData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    description: "",
    date: "",
    location: ""
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [reclamationStatus, setReclamationStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    trackingNumber: string;
  }>({ type: null, message: "", trackingNumber: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingReclamation, setIsSubmittingReclamation] = useState(false);

  // Générer un numéro de suivi pour les réclamations
  const generateTrackingNumber = () => {
    const prefix = "FPS-REC";
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires."
      });
      setIsSubmitting(false);
      return;
    }

    // Simulation d'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
      setFormStatus({
        type: "success",
        message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "general",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReclamationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReclamation(true);

    // Validation
    if (!reclamationData.name || !reclamationData.email || !reclamationData.description) {
      setReclamationStatus({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires.",
        trackingNumber: ""
      });
      setIsSubmittingReclamation(false);
      return;
    }

    // Génération du numéro de suivi
    const trackingNumber = generateTrackingNumber();

    // Simulation d'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
      setReclamationStatus({
        type: "success",
        message: `Votre réclamation a été enregistrée avec succès. Numéro de suivi: ${trackingNumber}`,
        trackingNumber: trackingNumber
      });
      setReclamationData({
        name: "",
        email: "",
        phone: "",
        type: "",
        description: "",
        date: "",
        location: ""
      });
      setIsSubmittingReclamation(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Contactez-nous"
          description="Nous sommes à votre écoute pour répondre à vos questions, recevoir vos suggestions ou traiter vos réclamations"
          icon={Mail}
          variant="slate"
          breadcrumbs={[
            { name: "Nous Contacter", href: "/contact" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Mail}
          label="Services de Communication et Support aux Usagers du FPS"
          variant="blue"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Informations de contact */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Adresse */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[var(--primary)]">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Notre adresse</h3>
                <p className="text-gray-600">
                  16, Av. Lukusa,<br />
                  Imm Les Palmiers, Apt 2A,<br />
                  Kinshasa-Gombe, RDC
                </p>
                <a
                  href="https://maps.google.com/?q=Boulevard+du+30+juin+Kinshasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-[var(--primary)] font-semibold hover:underline text-sm"
                >
                  Voir sur la carte
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[var(--primary)]">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-4">
                  secretariat@fps.cd
                </p>
                <a
                  href="mailto:secretariat@fps.cd"
                  className="inline-flex items-center text-[var(--primary)] font-semibold hover:underline text-sm"
                >
                  Envoyer un email
                  <Mail className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Téléphones */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[var(--primary)]">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Téléphones</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <a href="tel:+243819115812" className="hover:text-[var(--primary)] transition-colors">
                      +243 81 911 5812
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <a href="tel:+243981210031" className="hover:text-[var(--primary)] transition-colors">
                      +243 981 210 031
                    </a>
                  </p>
                </div>
                <a
                  href="tel:+243819115812"
                  className="inline-flex items-center text-[var(--primary)] font-semibold hover:underline text-sm"
                >
                  Appeler maintenant
                  <Phone className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Horaires d'ouverture</h3>
                  <p className="text-gray-600">
                    <strong>Lundi - Vendredi:</strong> 8h00 - 16h00<br />
                    <strong>Samedi - Dimanche:</strong> Fermé<br />
                    <strong>Jours fériés:</strong> Fermé
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Carte interactive */}
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-[var(--primary)]" />
                  Localisation
                </h2>
              </div>
              <div className="h-96 bg-gray-200 relative">
                {/* Carte Google Maps intégrée */}
                <iframe
                  src="https://www.google.com/maps?q=16,+Avenue+Lieutenant+Colonel+Lukusa,+Gombe,+Kinshasa,+RD+Congo&output=embed&zoom=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50 text-sm text-gray-600">
                <p>
                  <strong>Adresse complète:</strong> 16, Av. Lukusa, Imm Les Palmiers, Apt 2A, Kinshasa-Gombe, RDC
                </p>
              </div>
            </div>
          </section>

          {/* Formulaire de contact */}
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulaire de contact</h2>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
                </p>
              </div>

              {formStatus.type && (
                <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${formStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                  }`}>
                  {formStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${formStatus.type === "success" ? "text-green-800" : "text-red-800"
                    }`}>
                    {formStatus.message}
                  </p>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="+243 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none bg-white"
                        required
                      >
                        <option value="general">Question générale</option>
                        <option value="information">Demande d'information</option>
                        <option value="partnership">Partenariat</option>
                        <option value="media">Presse / Médias</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
                </div>
              </form>
            </div>
          </section>

          {/* Section Réclamations */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 rounded-xl shadow-lg p-8 border-2 border-red-100">
              <div className="text-center mb-8">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                    Réclamations
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Formulaire de réclamation</h2>
                <p className="text-gray-600">
                  Le FPS est à l'écoute et s'engage à traiter votre réclamation dans les meilleurs délais
                </p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800 font-semibold">
                    Délai de traitement: 5 à 10 jours ouvrables
                  </span>
                </div>
              </div>

              {reclamationStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${reclamationStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                  }`}>
                  <div className="flex items-start space-x-3">
                    {reclamationStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${reclamationStatus.type === "success" ? "text-green-800" : "text-red-800"
                        }`}>
                        {reclamationStatus.message}
                      </p>
                      {reclamationStatus.trackingNumber && (
                        <div className="mt-3 p-3 bg-white rounded-lg border-2 border-green-200">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Numéro de suivi:</p>
                          <p className="text-lg font-bold text-[var(--primary)] font-mono">
                            {reclamationStatus.trackingNumber}
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            Conservez ce numéro pour suivre l'évolution de votre réclamation
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleReclamationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reclamation-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="reclamation-name"
                      value={reclamationData.name}
                      onChange={(e) => setReclamationData({ ...reclamationData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="reclamation-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="reclamation-email"
                      value={reclamationData.email}
                      onChange={(e) => setReclamationData({ ...reclamationData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reclamation-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="reclamation-phone"
                      value={reclamationData.phone}
                      onChange={(e) => setReclamationData({ ...reclamationData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      placeholder="+243 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="reclamation-type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Type de réclamation
                    </label>
                    <select
                      id="reclamation-type"
                      value={reclamationData.type}
                      onChange={(e) => setReclamationData({ ...reclamationData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="service">Service non rendu</option>
                      <option value="delai">Délai non respecté</option>
                      <option value="qualite">Qualité insuffisante</option>
                      <option value="attitude">Attitude du personnel</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reclamation-date" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de l'incident
                    </label>
                    <input
                      type="date"
                      id="reclamation-date"
                      value={reclamationData.date}
                      onChange={(e) => setReclamationData({ ...reclamationData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="reclamation-location" className="block text-sm font-semibold text-gray-700 mb-2">
                      Lieu de l'incident
                    </label>
                    <input
                      type="text"
                      id="reclamation-location"
                      value={reclamationData.location}
                      onChange={(e) => setReclamationData({ ...reclamationData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      placeholder="Zone de santé, bureau, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reclamation-description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description détaillée de la réclamation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reclamation-description"
                    value={reclamationData.description}
                    onChange={(e) => setReclamationData({ ...reclamationData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    placeholder="Décrivez en détail votre réclamation..."
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingReclamation}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmittingReclamation ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Soumettre la réclamation
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Liens sociaux et WhatsApp (si disponibles) */}
          <section className="mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Suivez-nous</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {/* WhatsApp - Bouton flottant préparé */}
                <a
                  href="https://wa.me/243819115812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>

                {/* Placeholders pour réseaux sociaux - à activer si disponibles */}
                <a
                  href="https://www.facebook.com/p/Fonds-de-Promotion-de-la-Sant%25C3%25A9-FPS-100092568336168/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/company/fonds-de-promotion-de-la-sant%C3%A9-f-p-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  LinkedIn
                </a>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Suivez nos activités officielles sur les réseaux sociaux
              </p>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

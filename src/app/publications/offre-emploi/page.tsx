/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Briefcase, MapPin, Clock, Users, GraduationCap, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Image from "next/image";

export default function OffreEmploiPage() {
  const offresEmploi = [
    {
      id: 1,
      titre: "Avis de Recrutement Officiel - FPS",
      departement: "Multi-départements",
      lieu: "Kinshasa & Provinces",
      type: "CDI / CDD",
      niveau: "Divers profils",
      experience: "Selon profil",
      datePublication: "03 Avril 2026",
      dateLimite: "Voir PDF",
      salaire: "Selon grille barémique",
      description: "Appel à candidatures pour divers postes au sein du Fonds de Promotion de la Santé. Veuillez consulter le document officiel pour le détail des postes et les modalités de soumission.",
      pdfUrl: "/uploads/documents/FPS_AVIS DE RECRUTEMENT OFFICIEL 3 Avril 2026.pdf",
      requirements: [
        "Consulter l'avis de recrutement complet (PDF)",
        "Dossier de candidature complet",
        "Disponibilité immédiate souhaitée"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* 1. La Bannière (Après la navigation) */}
        <PageHeader
          title="Offres d'emploi"
          description="Rejoignez notre équipe et contribuez à l'amélioration du système de santé en République Démocratique du Congo"
          icon={Briefcase}
          variant="green"
          breadcrumbs={[
            { name: "Publications", href: "/publications" },
            { name: "Offre d'emploi", href: "/publications/offre-emploi" }
          ]}
        />

        {/* 2. L'Image à la Une (En deuxième position) */}
        <FeaturedImageBox
          variant="blue"
          image="/images/articles/celebration/1.jpg"
        />


        {/* 3. Section Retour (Optionnel, mais utile) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <Link
            href="/publications"
            className="inline-flex items-center text-gray-500 hover:text-[var(--primary)] font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux Publications
          </Link>
        </div>

        {/* Statistiques */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Opportunités de carrière</h2>
              <p className="text-gray-600">Découvrez nos postes disponibles dans différents domaines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Offre active</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">Document officiel</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">National</div>
                <div className="text-sm text-gray-600">Portée</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">En cours</div>
                <div className="text-sm text-gray-600">Statut</div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-gray-700">Filtrer par:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Tous les départements</option>
                <option>Plateau Technique</option>
                <option>Médecine Traditionnelle</option>
                <option>Administration</option>
                <option>Approvisionnement</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Toutes les villes</option>
                <option>Kinshasa</option>
                <option>Lubumbashi</option>
                <option>Goma</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Tous les types</option>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
              </select>
            </div>
          </div>

          {/* Liste des offres */}
          <div className="space-y-6">
            {offresEmploi.map((offre) => (
              <div key={offre.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{offre.titre}</h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {offre.type}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{offre.departement}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{offre.lieu}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{offre.niveau}</span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span>{offre.experience}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{offre.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Exigences principales:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {offre.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Publié le {offre.datePublication} • Date limite: {offre.dateLimite}</span>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="text-lg font-bold text-green-600 mb-2">{offre.salaire}</div>
                      <div className="text-sm text-gray-500 mb-4">par mois</div>
                      <div className="space-y-3">
                        <a
                          href={offre.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-bold shadow-md"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          Télécharger l'avis
                        </a>
                        <Link
                          href="/contact"
                          className="w-full bg-blue-50 text-blue-700 border border-blue-200 px-6 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center text-sm"
                        >
                          Nous contacter
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section avantages */}
        <div className="bg-green-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi rejoindre le FPS ?</h2>
              <p className="text-gray-600">Les avantages de travailler avec nous</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Impact social</h3>
                <p className="text-gray-600">Contribuez directement à l'amélioration de la santé publique en RDC</p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Formation continue</h3>
                <p className="text-gray-600">Développez vos compétences avec nos programmes de formation</p>
              </div>

              <div className="bg-white rounded-lg p-6 text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Évolution de carrière</h3>
                <p className="text-gray-600">Progressez dans un environnement professionnel stimulant</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-white rounded-lg p-6 inline-block">
                <h3 className="text-lg font-semibold mb-2">Candidature spontanée</h3>
                <p className="text-gray-600 mb-4">Envoyez votre CV même si aucun poste ne correspond actuellement</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span>📧 recrutement@fps.cd</span>
                  <span>📞 +243 981 210 031</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
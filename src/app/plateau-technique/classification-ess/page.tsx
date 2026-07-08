import { ClipboardList, Shield, Award, CheckCircle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function ClassificationESSPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Classification des ESS"
          description="Classification et normalisation des Établissements de Santé Soutenus pour garantir la qualité des services"
          icon={ClipboardList}
          variant="slate"
          breadcrumbs={[
            { name: "Plateau technique", href: "/plateau-technique" },
            { name: "Classification ESS", href: "/plateau-technique/classification-ess" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={ClipboardList}
          label="Normes et Standards de Qualité des ESS"
          variant="blue"
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Définition ESS */}
          <div className="mb-12">
            <div className="bg-fps-primary-light p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-fps-primary mb-4">Qu&apos;est-ce qu&apos;un ESS ?</h2>
              <p className="text-lg text-gray-700 mb-4">
                Un <strong>Établissement de Santé Soutenu (ESS)</strong> est une structure sanitaire bénéficiant 
                du financement et de l&apos;appui technique du FPS dans le cadre de la mise en œuvre de la CSU.
              </p>
              <p className="text-gray-600">
                Cette classification permet d&apos;assurer un suivi qualité, une répartition équitable des ressources 
                et une montée en gamme progressive des services offerts.
              </p>
            </div>
          </div>

          {/* Critères de classification */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Critères de classification</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-green-800">Critères techniques</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Infrastructure conforme aux normes</li>
                    <li>• Personnel qualifié disponible</li>
                    <li>• Équipements médicaux fonctionnels</li>
                    <li>• Système de gestion des déchets</li>
                    <li>• Approvisionnement en eau et électricité</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-blue-800">Critères de performance</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Taux de fréquentation minimum</li>
                    <li>• Indicateurs de qualité des soins</li>
                    <li>• Respect des protocoles CSU</li>
                    <li>• Système de rapportage fonctionnel</li>
                    <li>• Satisfaction des patients</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-xl font-semibold text-purple-800">Critères administratifs</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Statut légal de l&apos;établissement</li>
                    <li>• Licences et autorisations à jour</li>
                    <li>• Comptabilité transparente</li>
                    <li>• Conventions signées avec le FPS</li>
                    <li>• Respect des obligations contractuelles</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-orange-600 mr-3" />
                    <h3 className="text-xl font-semibold text-orange-800">Critères géographiques</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Localisation en zone prioritaire CSU</li>
                    <li>• Desserte de populations vulnérables</li>
                    <li>• Accessibilité géographique</li>
                    <li>• Complémentarité avec autres ESS</li>
                    <li>• Couverture des besoins locaux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Niveaux de classification */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Niveaux de classification</h2>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">★</div>
                  <h3 className="text-xl font-semibold text-green-800">ESS Niveau 1 - Excellence</h3>
                </div>
                <p className="text-green-700">
                  Établissements répondant à tous les critères avec distinction. Bénéficient du soutien maximal 
                  et servent de centres de référence pour la formation et l&apos;amélioration continue.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">A</div>
                  <h3 className="text-xl font-semibold text-blue-800">ESS Niveau 2 - Standard</h3>
                </div>
                <p className="text-blue-700">
                  Établissements répondant aux critères minimums requis. Bénéficient du soutien standard 
                  avec accompagnement pour l&apos;amélioration des services.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">B</div>
                  <h3 className="text-xl font-semibold text-yellow-800">ESS Niveau 3 - En amélioration</h3>
                </div>
                <p className="text-yellow-700">
                  Établissements partiellement conformes bénéficiant d&apos;un soutien conditionnel 
                  avec plan d&apos;amélioration et suivi renforcé.
                </p>
              </div>
            </div>
          </div>

          {/* Processus d'évaluation */}
          <div className="bg-fps-primary-light p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">Processus d&apos;évaluation</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-fps-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
                <h3 className="font-semibold text-fps-primary mb-2">Candidature</h3>
                <p className="text-sm text-gray-600">Dépôt de dossier par l&apos;établissement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-fps-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
                <h3 className="font-semibold text-fps-primary mb-2">Audit</h3>
                <p className="text-sm text-gray-600">Évaluation sur site par équipe technique</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-fps-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
                <h3 className="font-semibold text-fps-primary mb-2">Classification</h3>
                <p className="text-sm text-gray-600">Attribution du niveau selon scores</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-fps-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">4</div>
                <h3 className="font-semibold text-fps-primary mb-2">Suivi</h3>
                <p className="text-sm text-gray-600">Évaluation annuelle et accompagnement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
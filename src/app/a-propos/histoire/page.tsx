import Link from "next/link";
import { History, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function HistoirePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Notre histoire"
          description="Les étapes clés du développement du Fonds de Promotion de la Santé"
          icon={History}
          variant="blue"
          breadcrumbs={[
            { name: "Notre raison d'être", href: "/a-propos" },
            { name: "Histoire", href: "/a-propos/histoire" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={History}
          label="Archives et Étapes Historiques du FPS"
          variant="blue"
        />

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-fps-primary">Chronologie du FPS</h2>
            <p>Le Fonds de Promotion de la Santé a parcouru un chemin important depuis sa conception initiale jusqu'à son fonctionnement actuel. Voici les principales étapes de son développement.</p>

            <div className="my-8 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">2020 - Conception initiale</h3>
                <p>Élaboration du concept du Fonds de Promotion de la Santé par le Ministère de la Santé Publique pour répondre aux défis du financement de la santé en RDC.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">2021 - Études préparatoires</h3>
                <p>Réalisation d'études techniques et de consultations avec les parties prenantes pour définir le cadre institutionnel et opérationnel du FPS.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">Avril 2022 - Création officielle</h3>
                <p>Signature du décret présidentiel portant création, organisation et fonctionnement du Fonds de Promotion de la Santé en tant qu'établissement public.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">Août 2022 - Mise en place des structures</h3>
                <p>Nomination des organes de direction et de gestion, recrutement du personnel initial et mise en place des premières procédures opérationnelles.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">2023 - Début des opérations</h3>
                <p>Lancement des premiers programmes et initiatives financés par le FPS dans le cadre de la promotion de la santé et de la prévention des maladies.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-xl font-semibold mb-2">Aujourd'hui - Expansion et consolidation</h3>
                <p>Le FPS continue de se développer, d'étendre sa couverture géographique et de diversifier ses interventions pour améliorer la santé des populations congolaises et contribuer à l'atteinte de la Couverture Santé Universelle en RDC.</p>
              </div>
            </div>

            <div className="mt-12 bg-fps-primary-light p-6 rounded-lg">
              <blockquote className="italic text-lg">
                "Le Fonds de Promotion de la Santé représente une innovation majeure dans le financement de la santé en RDC. Il incarne l'engagement sollennel de notre Chef de l'État à garantir un accès équitable aux soins de santé de qualité pour tous les Congolais et à progresser vers la Couverture Santé Universelle en RDC."
              </blockquote>
              <p className="mt-4 font-semibold">Marius MIKA</p>
              <p className="text-sm text-gray-600">DGE, FPS</p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/a-propos" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-fps-primary hover:bg-fps-primary-dark">
              Retour à la page À propos
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
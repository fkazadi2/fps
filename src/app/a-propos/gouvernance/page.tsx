import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Organigramme from "@/components/ui/Organigramme";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function GouvernancePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Structure de gouvernance"
          description="Organisation interne pour une gestion efficace et transparente des ressources sanitaires"
          icon={Users}
          variant="indigo"
          breadcrumbs={[
            { name: "Notre raison d'être", href: "/a-propos" },
            { name: "Gouvernance", href: "/a-propos/gouvernance" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Users}
          label="Équipe de Gouvernance et Direction du FPS"
          variant="purple"
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-fps-primary">Organisation du FPS</h2>
            <p>Le FPS dispose d'une structure de gouvernance bien définie qui assure une répartition claire des responsabilités, une gestion efficace des ressources et une prise de décision transparente. Notre organigramme illustre l'organisation hiérarchique et fonctionnelle de l'institution.</p>
            
            {/* Ajout de l'organigramme interactif */}
            <div className="my-10 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
              <h3 className="text-xl font-semibold text-center text-fps-primary mb-6">Organigramme du FPS</h3>
              <Organigramme />
            </div>
            
            <div className="my-8 space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">CA (Conseil d'administration)</h3>
                <p>Organe suprême de décision, le CA définit les orientations stratégiques du FPS et supervise sa gestion. Il est composé de représentants des ministères concernés, de la société civile et des partenaires techniques et financiers.</p>
                <p className="mt-3"><strong>Principales responsabilités :</strong></p>
                <ul>
                  <li>Approbation des plans stratégiques et opérationnels</li>
                  <li>Validation des budgets et des rapports financiers</li>
                  <li>Supervision de la performance du FPS</li>
                  <li>Nomination du DGE</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Direction générale (DG & DGA)</h3>
                <p>La Direction générale est responsable de la gestion quotidienne du FPS. Elle met en œuvre les décisions du CA et coordonne les activités des différentes directions.</p>
                <p className="mt-3"><strong>Principales responsabilités :</strong></p>
                <ul>
                  <li>Exécution des plans stratégiques et opérationnels</li>
                  <li>Gestion des ressources humaines, financières et matérielles</li>
                  <li>Représentation du FPS auprès des partenaires</li>
                  <li>Coordination des directions techniques et d'appui</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Collège des Commissaires aux Comptes</h3>
                <p>Organe indépendant chargé du contrôle financier du FPS, le Collège des Commissaires aux Comptes veille à la régularité, la sincérité et la fidélité des comptes.</p>
                <p className="mt-3"><strong>Principales responsabilités :</strong></p>
                <ul>
                  <li>Vérification des comptes et des états financiers</li>
                  <li>Contrôle de la conformité des dépenses</li>
                  <li>Émission de rapports d'audit annuels</li>
                  <li>Recommandations pour améliorer la gestion financière</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6 text-fps-primary">Directions techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">DF (Direction des Finances)</h3>
                <p className="text-gray-600">Gère les ressources financières, assure la comptabilité, supervise les dépenses et prépare les rapports financiers.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">DRHGC (Direction Ressources Humaines)</h3>
                <p className="text-gray-600">S'occupe du recrutement, de la formation et du développement du personnel du FPS.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">DT (Direction Technique)</h3>
                <p className="text-gray-600">Développe et met en œuvre les programmes techniques du FPS, assure le suivi des infrastructures sanitaires.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-fps-primary">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">DGS (Direction Gouvernance en Santé)</h3>
                <p className="text-gray-600">Veille au renforcement du système de santé et à la promotion de la médecine traditionnelle.</p>
              </div>
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
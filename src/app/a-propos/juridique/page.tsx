import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function JuridiquePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Cadre juridique"
          description="Bases légales et réglementaires du Fonds de Promotion de la Santé en tant qu'établissement public"
          icon={Scale}
          variant="slate"
          breadcrumbs={[
            { name: "Notre raison d'être", href: "/a-propos" },
            { name: "Cadre Juridique", href: "/a-propos/juridique" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Scale}
          label="Textes de Loi et Décrets Fondateurs du FPS"
          variant="purple"
        />

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-fps-primary">Fondement légal</h2>
            <p>Le Fonds de Promotion de la Santé (FPS) est un établissement public à caractère administratif doté de la personnalité juridique. Sa création et son fonctionnement sont régis par un ensemble de textes légaux et réglementaires qui définissent son cadre d'action, ses responsabilités et ses prérogatives.</p>
            
            <div className="my-8 space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Décret n°19/13 du 25 novembre 2019</h3>
                <p>Portant création, organisation et fonctionnement du Fonds de Promotion de la Santé</p>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Points clés :</strong></p>
                  <ul className="mt-2">
                    <li>Création du FPS en tant qu'établissement public</li>
                    <li>Définition de la mission et des objectifs du FPS</li>
                    <li>Organisation structurelle et fonctionnelle</li>
                    <li>Modalités de financement et de gestion</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Arrêté ministériel n°1250/CAB/MIN/S/AQ/025/2020</h3>
                <p>Fixant les statuts du Fonds de Promotion de la Santé</p>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Points clés :</strong></p>
                  <ul className="mt-2">
                    <li>Définition détaillée des missions spécifiques</li>
                    <li>Composition et fonctionnement des organes de gouvernance</li>
                    <li>Régime financier et contrôle de gestion</li>
                    <li>Relations avec les autres institutions de santé</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Arrêté interministériel n°003/CAB/MIN/BUDGET et n°1250/CAB/MIN/S/AQ/045/2021</h3>
                <p>Portant modalités de mobilisation, de gestion et d'utilisation des ressources du FPS</p>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Points clés :</strong></p>
                  <ul className="mt-2">
                    <li>Sources de financement du FPS</li>
                    <li>Procédures de mobilisation des ressources</li>
                    <li>Mécanismes d'allocation des financements</li>
                    <li>Système de suivi et d'évaluation financière</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-fps-primary">Autres lois et règlements pertinents</h2>
            <ul className="bg-gray-50 p-6 rounded-lg">
              <li className="mb-3">
                <strong>Loi n°18/035 du 13 décembre 2018</strong> fixant les principes fondamentaux relatifs à l'organisation de la santé publique
              </li>
              <li className="mb-3">
                <strong>Loi n°11/011 du 13 juillet 2011</strong> relative aux finances publiques
              </li>
              <li className="mb-3">
                <strong>Décret n°13/063 du 11 décembre 2013</strong> portant création et organisation du Comité National de Pilotage du Secteur de la Santé
              </li>
              <li className="mb-3">
                <strong>Plan National de Développement Sanitaire (PNDS)</strong> définissant les priorités du secteur pour la période 2019-2022
              </li>
            </ul>
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
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import Organigramme from "@/components/ui/Organigramme";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Image from "next/image";
import HorizontalAutoScroll from "@/components/ui/HorizontalAutoScroll";

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
            { name: "Qui sommes-nous", href: "/a-propos" },
            { name: "Gouvernance", href: "/a-propos/gouvernance" }
          ]}
          backgroundImage="/images/banners/qui-nous-sommes/banner_structure_gouvernance.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Users}
          label="Équipe de Gouvernance et Direction du FPS"
          variant="purple"
          image="/images/featured-images/qui-sommes-nous/featured_stucture_de_gouvernance.jpg"
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
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Le Conseil d'Administration (CA)</h3>
                <p>Organe suprême de décision, le CA définit les orientations stratégiques du FPS et supervise sa gestion. Il est composé de représentants des ministères concernés, de la société civile et des partenaires techniques et financiers.</p>
                <p className="mt-3"><strong>Principales responsabilités :</strong></p>
                <ul>
                  <li>Approbation des plans stratégiques et opérationnels</li>
                  <li>Validation des budgets et des rapports financiers</li>
                  <li>Supervision de la performance du FPS</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-fps-primary mb-3">Direction générale (DGé & DGA)</h3>
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

            <h2 className="text-2xl font-bold mt-12 mb-6 text-fps-primary">Les membres du Conseil d'Administration</h2>
            <HorizontalAutoScroll innerClassName="flex gap-6 min-w-max snap-x snap-mandatory">
              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/pca-badibbanga-Patrick.jpeg"
                    alt="Dr. BADIBANGA SAMBUKA Patrick"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Président du Conseil d&apos;Administration
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. BADIBANGA SAMBUKA Patrick
                  </h3>
                </div>
              </div>

              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/dg-marius-nyembo.jpeg"
                    alt="MIKA NYEMBO Marius"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Directeur Général
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    MIKA NYEMBO Marius
                  </h3>
                </div>
              </div>

              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/dga-claudine.jpeg"
                    alt="Professeure TSHIMANGA MBUYI Claudine"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Directeur Général adjoint
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    Professeure TSHIMANGA MBUYI Claudine
                  </h3>
                </div>
              </div>

              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/025.jpeg"
                    alt="MOLE ATSHINAKOR Delaurent"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Administrateur
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    MOLE ATSHINAKOR Delaurent
                  </h3>
                </div>
              </div>

              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/0587.jpeg"
                    alt="KITHIMA SELEMANI Eric"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Administrateur
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    KITHIMA SELEMANI Eric
                  </h3>
                </div>
              </div>

              <div className="snap-start w-[280px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0">
                <div className="relative w-full aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/membres-ca/8967.jpeg"
                    alt="ILUNGA KABALE Michel"
                    fill
                    className="object-cover"
                    sizes="340px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[var(--danger)] uppercase tracking-wide mb-2">
                    Administrateur
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    ILUNGA KABALE Michel
                  </h3>
                </div>
              </div>
            </HorizontalAutoScroll>
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
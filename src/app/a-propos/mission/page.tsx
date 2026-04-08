/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import { FileText, Users, Building, TrendingUp, CheckCircle, Target, Heart, Handshake } from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export default function MissionPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Notre mission"
          description="Mobiliser, gérer et promouvoir efficacement les ressources pour la santé publique en RDC"
          icon={Target}
          variant="teal"
          breadcrumbs={[
            { name: "Notre raison d'être", href: "/a-propos" },
            { name: "Mission & Vision", href: "/a-propos/mission" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          icon={Target}
          label="Engagement Stratégique pour la Santé en RDC"
          variant="green"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Vision */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-8 md:p-12 border-2 border-[var(--accent)] shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--danger)] flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-4">
                    Notre vision
                  </h2>
                  <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
                    « Une RDC où la santé est financée de manière durable et équitable pour tous. »
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Nous aspirons à transformer le paysage sanitaire de la République Démocratique du Congo en instaurant un mécanisme de financement robuste, transparent et pérenne. Notre vision est celle d'une RDC où chaque citoyen, indépendamment de sa situation socio-économique ou de sa localisation géographique, a accès à des soins de santé de qualité sans subir de difficultés financières.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--danger)] bg-opacity-10 text-[var(--danger)] rounded-full text-sm font-semibold tracking-wide uppercase">
                  Notre Mission
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Mission du FPS
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-800 leading-relaxed mb-6">
                  Le <strong>Fonds de Promotion de la Santé (FPS)</strong> a pour mission de <strong className="text-[var(--primary)]">mobiliser, gérer et promouvoir efficacement les ressources pour la santé publique</strong>, conformément au <strong className="text-[var(--danger)]">Décret n°22/15 du 09 avril 2022</strong>.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Le FPS constitue un levier stratégique pour l'atteinte de la <strong>Couverture Santé Universelle (CSU)</strong>, priorité nationale inscrite dans la vision du Chef de l'État. Nous travaillons pour garantir que tous les Congolais aient accès à des services de santé de qualité sans subir de difficultés financières.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  En tant qu'établissement public, le FPS opère sous la <strong>tutelle du Ministère de la Santé</strong> et s'inscrit dans le cadre légal défini par le décret précité, garantissant ainsi la transparence, la redevabilité et l'efficacité dans la gestion des ressources sanitaires.
                </p>
              </div>
            </div>
          </section>

          {/* Cadre légal */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 border-l-4 border-[var(--primary)]">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--primary)] mb-4">
                    Cadre légal et juridique
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Décret n°22/15 du 09 avril 2022</h3>
                      <p className="text-gray-700">
                        Le FPS est créé et régit par le <strong>Décret n°22/15 du 09 avril 2022</strong>, qui définit son statut, ses missions, son organisation et son fonctionnement. Ce décret confère au FPS le statut d'établissement public doté de la personnalité juridique et de l'autonomie financière.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Tutelle ministérielle</h3>
                      <p className="text-gray-700">
                        Le FPS est placé sous la <strong>tutelle du Ministère de la Santé</strong>, qui assure la supervision de ses activités, valide ses orientations stratégiques et garantit la conformité de ses actions avec les politiques nationales de santé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Axes stratégiques */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--accent)] bg-opacity-10 text-[var(--accent)] rounded-full text-sm font-semibold tracking-wide uppercase">
                  Nos Axes Stratégiques
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Les quatre piliers de notre action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quatre axes stratégiques qui guident toutes nos interventions pour un impact durable sur la santé publique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Axe 1 */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[var(--primary)] transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
                      Mobilisation des ressources internes et externes
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Le FPS mobilise activement des ressources financières additionnelles provenant de sources internes (contributions locales, taxes sanitaires) et externes (partenaires internationaux, bailleurs de fonds) pour renforcer le financement du secteur de la santé.
                    </p>
                  </div>
                </div>
              </div>

              {/* Axe 2 */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[var(--danger)] transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
                      Soutien aux zones de santé pour l'accès aux soins
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Le FPS apporte un soutien direct aux zones de santé pour améliorer l'accès aux soins de qualité. Cela inclut le financement d'infrastructures, la dotation en médicaments et équipements, et le renforcement des capacités du personnel de santé.
                    </p>
                  </div>
                </div>
              </div>

              {/* Axe 3 */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[var(--accent)] transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
                      Promotion des comportements sains et de la prévention
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Le FPS développe et finance des programmes de prévention et de promotion de la santé pour encourager les comportements sains au sein des communautés. Cela inclut la sensibilisation, l'éducation sanitaire et la mobilisation communautaire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Axe 4 */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[var(--secondary)] transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-3">
                      Partenariat et plaidoyer avec les acteurs du secteur santé
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Le FPS développe des partenariats stratégiques avec les acteurs publics, privés et de la société civile du secteur santé. Nous menons également des actions de plaidoyer pour promouvoir des politiques favorables à la santé publique et à la CSU.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact chiffré - OBLIGATOIRE */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--danger)] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wide uppercase">
                      Notre Impact
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                    Résultats et impact chiffré
                  </h2>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto">
                    Des résultats concrets qui témoignent de notre engagement pour la santé publique en RDC
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 mb-4 mx-auto">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extrabold mb-2">5M+</div>
                      <div className="text-white/90">Personnes couvertes</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 mb-4 mx-auto">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extrabold mb-2">650+</div>
                      <div className="text-white/90">Centres de santé partenaires</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 mb-4 mx-auto">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extrabold mb-2">26</div>
                      <div className="text-white/90">Provinces couvertes</div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 mb-4 mx-auto">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-extrabold mb-2">85%</div>
                      <div className="text-white/90">Taux de satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Projets phares */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">Projets phares et résultats d'impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2">Programme de dotation en médicaments</h4>
                      <p className="text-white/90 text-sm mb-2">
                        <strong>Résultat:</strong> Plus de 500 zones de santé équipées en médicaments essentiels en 2023
                      </p>
                      <p className="text-white/80 text-xs">
                        Impact: Réduction de 40% des ruptures de stock dans les zones ciblées
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-2">Renforcement des capacités du personnel</h4>
                      <p className="text-white/90 text-sm mb-2">
                        <strong>Résultat:</strong> Formation de 2,500 agents de santé en 2023
                      </p>
                      <p className="text-white/80 text-xs">
                        Impact: Amélioration de la qualité des soins dans 85% des structures partenaires
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 text-center text-white/80 text-sm italic">
                    * Les données chiffrées sont mises à jour trimestriellement. Dernière mise à jour: Janvier 2024
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valeurs */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--danger)] bg-opacity-10 text-[var(--primary)] rounded-full text-sm font-semibold tracking-wide uppercase">
                  Nos Valeurs
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Les valeurs qui nous guident
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">Universalité</h3>
                </div>
                <p className="text-gray-700">
                  Nous œuvrons pour que tous les Congolais, sans distinction, puissent bénéficier d'un accès équitable aux soins de santé de qualité.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">Durabilité</h3>
                </div>
                <p className="text-gray-700">
                  Nous nous engageons à mettre en place des mécanismes de financement pérennes pour garantir la continuité des services de santé.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">Innovation</h3>
                </div>
                <p className="text-gray-700">
                  Nous encourageons l'innovation dans les approches et solutions pour relever les défis sanitaires complexes de la RDC.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--primary)]">Collaboration</h3>
                </div>
                <p className="text-gray-700">
                  Nous croyons à la force du partenariat et de la collaboration entre tous les acteurs du secteur de la santé.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">En savoir plus sur nos actions</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez nos programmes, nos publications et nos résultats concrets sur le terrain
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/programmes"
                className="px-8 py-4 bg-white text-[var(--primary)] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Nos programmes
              </Link>
              <Link
                href="/publications"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Télécharger un rapport
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Contactez-nous
              </Link>
            </div>
          </section>

          {/* Navigation */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/a-propos"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-semibold rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            >
              ← Retour à la page À propos
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

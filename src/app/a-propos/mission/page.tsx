/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import {
  FileText, Users, Building, TrendingUp, CheckCircle, Target, Heart, Handshake,
  Stethoscope, Leaf, Pill, Users2, HandCoins, Wallet, Wrench, Award, Ambulance,
  Receipt, Droplets, Construction, ShieldCheck, Landmark, HeartHandshake, Coins, Globe
} from "lucide-react";

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
            { name: "Qui sommes-nous", href: "/a-propos" },
            { name: "Mission & Vision", href: "/a-propos/mission" }
          ]}
          backgroundImage="/images/banners/qui-nous-sommes/banner_mission.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          variant="green"
          image="/images/featured-images/qui-sommes-nous/featured_misison.jpg"
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
                <span className="px-4 py-2 bg-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
                  Notre Engagement
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Mission du FPS
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                Le Fonds de Promotion de la Santé a notamment pour missions de :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { icon: Stethoscope, text: "Financer les projets d’infrastructures sanitaires, d’équipements médicaux ainsi que promouvoir la production locale des médicaments autre intrants spécifiques ;", color: "blue" },
                { icon: Leaf, text: "Financer la promotion de la médecine traditionnelle ;", color: "yellow" },
                { icon: Pill, text: "Financer l’approvisionnement en médicaments essentiels y compris les contraceptifs, les vaccins et autres intrants de santé publique ;", color: "blue" },
                { icon: Users2, text: "Financer la gouvernance du secteur de la santé, la planification, le développement des ressources humaines du secteur de la santé ;", color: "yellow" },
                { icon: HandCoins, text: "Subventionner les Etablissements de Services et Soins de Santé et Pharmaceutiques.", color: "blue" }
              ].map((m, i) => (
                <div key={i} className={`bg-white border-l-4 ${m.color === 'blue' ? 'border-[var(--primary)]' : 'border-[var(--accent)]'} p-6 rounded-r-xl shadow-md hover:shadow-xl transition-all group`}>
                  <div className={`w-12 h-12 ${m.color === 'blue' ? 'bg-blue-50 text-[var(--primary)]' : 'bg-yellow-50 text-[var(--accent)]'} rounded-lg flex items-center justify-center mb-4`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">{m.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NOS ATTRIBUTIONS DANS LE PROGRAMME DE LA GRATUITE DES ACCOUCHEMENTS */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-8 border-b border-white/20 pb-4">
                  Nos attributions dans le programme de la gratuité des accouchements
                </h2>
                <p className="text-lg text-blue-100 mb-10 leading-relaxed max-w-4xl">
                  Le Fonds de Promotion de la Santé charriera les financements destinés à améliorer et à promouvoir l’offre des soins et services de santé. À ce titre, dans le cadre du Programme de la prise en charge gratuite de la Femme enceinte, de l’Accouchement et du Nouveau-né, le FPS a la charge de :
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: Wallet, title: "Financement des pré-requis", text: "Payer aux établissements de soins les fonds pour le pré requis pour recevoir dignement les parturientes et leurs bébés." },
                    { icon: Wrench, title: "Dotation technique", text: "Doter les Etablissements de soins en matériel, équipements et consommables nécessaires." },
                    { icon: Award, title: "Bonus qualité", text: "Payer le bonus qualité aux établissements de soins méritants après évaluation." },
                    { icon: Ambulance, title: "Logistique d'urgence", text: "Mettre à disposition une logistique de transfert (30 ambulances dont 10 pédiatriques) avec gestionnaire dédié." },
                    { icon: Receipt, title: "Gestion des factures", text: "Payer les factures des médicaments requis directement par le FPS." },
                    { icon: Droplets, title: "Disponibilité de sang", text: "Assurer en permanence la disponibilité de sang de qualité dans les Etablissements sous programme." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--accent)] mb-1">{item.title}</h4>
                        <p className="text-sm text-blue-50 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Axes d’intervention */}
          <section id="nos-axes" className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--accent)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
                  Stratégie Opérationnelle
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Axes d’intervention
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                L’amélioration de la qualité de l’offre des services et des soins de santé au travers le FPS passe par :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Construction, title: "Infrastructures sanitaires", text: "La construction et la réhabilitation des infrastructures sanitaires", color: "blue", href: "/plateau-technique/infrastructures" },
                { icon: Wrench, title: "Financement et dotation en équipements", text: "Le financement et la dotation des ESS en matériels médicaux et non médicaux", color: "yellow", href: "/plateau-technique/equipements" },
                { icon: Pill, title: "Financement en médicaments", text: "Le financement en médicaments éssentiels", color: "blue", href: "/plateau-technique/medicaments" },
                { icon: Users, title: "Financement du renforcement des capacités des ressources humaines du secteur santé", text: "Le renforcement des capacités des ressources humaines du secteur de la santé", color: "yellow", href: "/gouvernance-sante/capacitation" },
                { icon: Leaf, title: "Recherche en médecine", text: "La promotion de la médecine traditionnelle", color: "blue", href: "/medecine-traditionnelle" },
                { icon: ShieldCheck, title: "Système des références", text: "Pilotage opérationnel du système de santé publique.", color: "yellow", href: "/gouvernance-sante" }
              ].map((axe, i) => (
                <Link
                  key={i}
                  href={axe.href}
                  className={`group block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-b-4 ${axe.color === 'blue' ? 'border-[var(--primary)]' : 'border-[var(--accent)]'} transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className={`w-14 h-14 rounded-xl ${axe.color === 'blue' ? 'bg-blue-50 text-[var(--primary)]' : 'bg-yellow-50 text-[var(--accent)]'} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                    <axe.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{axe.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {axe.text}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Sources de financement */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[var(--primary)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
                  Pérennité Financière
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-6">
                Sources de financement
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
                L’Etat congolais reconnaît au FPS les sources de financements suivantes :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Catégorie 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[var(--primary)] hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--primary)] shadow-inner">
                    <Landmark className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Les pouvoirs publics</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "La dotation initiale pour son démarrage ;",
                    "Les subventions."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Catégorie 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[var(--accent)] hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center text-[var(--accent)] shadow-inner">
                    <HeartHandshake className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contributions & Solidarité</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Les contributions des communautés, de la solidarité nationale et internationale ;",
                    "Les libéralités, dons et legs de diverses sources."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[var(--accent)] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Catégorie 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[var(--primary)] hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[var(--primary)] shadow-inner">
                    <Coins className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Les ressources propres</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    "Les financements innovants de la santé ;",
                    "Une quotité de redevances minières dévolues au pouvoir central ;",
                    "Une taxe de la promotion de la santé fixée à deux pourcent de la valeur CIF des marchandises à l’importation ;",
                    "Une quotité des droits d’accises prélevées sur les produits nocifs à la santé.",
                    "Une quotité de 2% sur les cotisations des régimes d’assurance maladie collectée par le Fonds de Solidarité de la Santé ;",
                    "Les placements, les produits d’exploitation et les recettes diverses."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700 list-none">
                      <CheckCircle className="w-5 h-5 text-[var(--primary)] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </div>
              </div>

              {/* Catégorie 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[var(--accent)] hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center text-[var(--accent)] shadow-inner">
                    <Globe className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Partenaires & Emprunts</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Les partenaires agrées : Les financements de la coopération bi-multinationale destinés à l’amélioration de l’offre et de la qualité des services et des soins de santé ;",
                    "Les emprunts locaux et/ou extérieurs."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[var(--accent)] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Valeurs */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--danger)] bg-opacity-10 text-white rounded-full text-sm font-semibold tracking-wide uppercase">
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
              Découvrez nos publications et nos résultats concrets sur le terrain
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/publications"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Télécharger nos rapports d'activités
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

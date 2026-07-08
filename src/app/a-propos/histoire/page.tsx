"use client";

import Link from "next/link";
import Image from "next/image";
import { History, ArrowLeft, Calendar, Award, Star, TrendingUp, Building2, CheckCircle2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "2020",
    title: "Conception initiale",
    description: "Élaboration du concept du Fonds de Promotion de la Santé par le Ministère de la Santé Publique pour répondre aux défis du financement de la santé en RDC.",
    icon: Building2,
    side: "left"
  },
  {
    year: "2021",
    title: "Études préparatoires",
    description: "Réalisation d'études techniques et de consultations avec les parties prenantes pour définir le cadre institutionnel et opérationnel du FPS.",
    icon: TrendingUp,
    side: "right"
  },
  {
    year: "Avril 2022",
    title: "Création officielle",
    description: "Signature du décret présidentiel portant création, organisation et fonctionnement du Fonds de Promotion de la Santé en tant qu'établissement public.",
    icon: Award,
    side: "left"
  },
  {
    year: "Août 2022",
    title: "Mise en place des structures",
    description: "Nomination des organes de direction et de gestion, recrutement du personnel initial et mise en place des premières procédures opérationnelles.",
    icon: Star,
    side: "right"
  },
  {
    year: "2023",
    title: "Début des opérations",
    description: "Lancement des premiers programmes et initiatives financés par le FPS dans le cadre de la promotion de la santé et de la prévention des maladies.",
    icon: CheckCircle2,
    side: "left"
  },
  {
    year: "Aujourd'hui",
    title: "Expansion et consolidation",
    description: "Le FPS continue de se développer, d'étendre sa couverture géographique et de diversifier ses interventions pour l'atteinte de la Couverture Santé Universelle.",
    icon: TrendingUp,
    side: "right"
  }
];

export default function HistoirePage() {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Notre histoire"
          description="Les étapes clés du développement du Fonds de Promotion de la Santé"
          icon={History}
          variant="blue"
          breadcrumbs={[
            { name: "Qui sommes-nous", href: "/a-propos" },
            { name: "Histoire", href: "/a-propos/histoire" }
          ]}
          backgroundImage="/images/banners/qui-nous-sommes/banner-notre-histoire.jpg"
        />

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Section Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-[var(--primary)] mb-6">Chronologie du FPS</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Le Fonds de Promotion de la Santé a parcouru un chemin important depuis sa conception initiale jusqu'à son fonctionnement actuel. 
              Voici les principales étapes de son développement structurant.
            </p>
          </div>

          {/* 3. Chronologie Style Arbre Généalogique */}
          <div className="relative">
            {/* Ligne centrale (Le tronc) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-fps-primary-light to-transparent"></div>

            <div className="space-y-12 relative">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: event.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center ${event.side === "right" ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Bloc de contenu */}
                  <div className={`flex-1 w-full md:w-1/2 ${event.side === "left" ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                    <div className={`p-6 rounded-2xl shadow-xl border-2 transition-all group ${
                      index % 2 === 0 
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white" 
                        : "bg-[var(--accent)] border-[var(--accent)] text-[var(--primary)]"
                    }`}>
                      <div className={`flex items-center mb-3 ${event.side === "left" ? "md:justify-end" : ""}`}>
                        <span className={`font-black text-2xl tracking-tighter mr-3 ${
                          index % 2 === 0 ? "text-blue-100" : "text-[var(--primary)]"
                        }`}>{event.year}</span>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          index % 2 === 0 
                            ? "bg-white/20 text-white group-hover:bg-white group-hover:text-[var(--primary)]" 
                            : "bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white"
                        }`}>
                          <event.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${index % 2 === 0 ? "text-white" : "text-[var(--primary)]"}`}>{event.title}</h3>
                      <p className={`leading-relaxed text-sm md:text-base ${
                        index % 2 === 0 ? "text-blue-50" : "text-[var(--primary)]/80"
                      }`}>{event.description}</p>
                    </div>
                  </div>

                  {/* Nœud central */}
                  <div className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-white border-4 z-10 ${
                    index % 2 === 0 ? "border-[var(--primary)]" : "border-[var(--accent)]"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${index % 2 === 0 ? "bg-[var(--primary)]" : "bg-[var(--accent)]"}`}></div>
                  </div>

                  {/* Espaceur pour le côté opposé */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Section Citation DG avec Image */}
          <section className="mt-32">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-blue-100">
              {/* Éléments décoratifs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 opacity-20 rounded-full -mr-32 -mt-32"></div>
              
              <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                {/* Photo du DG */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-fps-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-2xl">
                    <Image 
                      src="/images/dg-marius.jpg"
                      alt="Marius MIKA NYEMBO - DGE FPS"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Citation */}
                <div className="flex-1">
                  <div className="mb-6">
                    <svg className="h-12 w-12 text-fps-primary opacity-30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <blockquote className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed mb-6">
                    "Le Fonds de Promotion de la Santé représente une innovation majeure dans le financement de la santé en RDC. Il incarne l'engagement sollennel de notre Chef de l'État à garantir un accès équitable aux soins de santé de qualité pour tous les Congolais et à progresser vers la Couverture Santé Universelle en RDC."
                  </blockquote>
                  <div>
                    <p className="text-2xl font-bold text-fps-primary">Marius MIKA NYEMBO</p>
                    <p className="text-red-600 font-medium">Directeur Général du Fonds de Promotion de la Santé (FPS)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bouton de retour */}
          <div className="mt-20 flex justify-center">
            <Link 
              href="/Qui sommes-nous" 
              className="inline-flex items-center px-8 py-4 bg-fps-primary text-white font-bold rounded-xl hover:bg-fps-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Retour à l'essentiel
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
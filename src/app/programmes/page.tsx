import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { ArrowRight, Layout } from "lucide-react";

export const metadata = {
  title: "Nos programmes | Fonds de Promotion de la Santé (FPS)",
  description: "Découvrez les programmes de promotion de la santé mis en œuvre par le FPS en République Démocratique du Congo.",
};

const programs = [
  {
    id: 1,
    title: "Éducation sanitaire et sensibilisation",
    description: "Programmes de sensibilisation et d'éducation pour améliorer les connaissances en matière de santé et promouvoir des comportements sains.",
    image: "/images/placeholder.jpg",
    activities: [
      "Campagnes d'information sur les maladies courantes",
      "Ateliers communautaires sur la santé",
      "Programmes scolaires d'éducation sanitaire",
      "Développement de matériels éducatifs adaptés"
    ]
  },
  {
    id: 2,
    title: "Prévention des maladies",
    description: "Initiatives visant à prévenir la propagation des maladies infectieuses et à réduire l'incidence des maladies non transmissibles.",
    image: "/images/placeholder.jpg",
    activities: [
      "Campagnes de vaccination",
      "Programmes de dépistage précoce",
      "Initiatives de lutte contre les maladies vectorielles",
      "Sensibilisation aux facteurs de risque des maladies chroniques"
    ]
  },
  {
    id: 3,
    title: "Promotion de la santé maternelle et infantile",
    description: "Programmes dédiés à l'amélioration de la santé des femmes enceintes, des mères et des enfants.",
    image: "/images/placeholder.jpg",
    activities: [
      "Éducation sur les soins prénatals",
      "Promotion de l'allaitement maternel",
      "Suivi de la croissance et du développement de l'enfant",
      "Sensibilisation à la nutrition infantile"
    ]
  },
  {
    id: 4,
    title: "Renforcement des capacités communautaires",
    description: "Initiatives visant à renforcer les capacités des communautés pour qu'elles puissent prendre en charge leur propre santé.",
    image: "/images/placeholder.jpg",
    activities: [
      "Formation des agents de santé communautaires",
      "Soutien aux groupes d'entraide",
      "Développement de projets communautaires",
      "Mobilisation communautaire pour la santé"
    ]
  }
];

export default function ProgramsPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Nos programmes"
          description="Découvrez les initiatives et programmes mis en œuvre par le FPS pour promouvoir la santé en République Démocratique du Congo."
          icon={Layout}
          variant="blue"
          breadcrumbs={[
            { name: "Nos Programmes", href: "/programmes" }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Layout}
          label="Programmes d'Intervention et de Promotion de la Santé"
          variant="blue"
        />
      </div>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <div 
                key={program.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12`}
              >
                <div className="md:w-2/5 flex-shrink-0">
                  <div className="h-64 md:h-full rounded-lg overflow-hidden relative bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--danger)] group">
                    {/* Placeholder moderne avec gradient et icône */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-6">
                      <div className="w-20 h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-center">Photo du programme</p>
                      <p className="text-xs text-white/60 text-center mt-1">À remplacer par photo réelle</p>
                    </div>
                    {/* Pattern décoratif */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5">
                  <h2 className="text-2xl font-bold text-[var(--primary)]">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    {program.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900">Activités principales :</h3>
                    <ul className="mt-2 space-y-2">
                      {program.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="flex-shrink-0 mt-1">
                            <svg className="h-5 w-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="ml-3 text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Collaboration */}
      <section className="bg-fps-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--primary)]">Collaboration et partenariats</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Le FPS travaille en étroite collaboration avec divers partenaires pour maximiser l'impact de ses programmes de promotion de la santé.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[var(--danger)] hover:bg-fps-danger-dark transition-all duration-300"
              >
                Devenir partenaire <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 
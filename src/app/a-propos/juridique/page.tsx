import Link from "next/link";
import { Scale, ArrowLeft, Download, FileText, Gavel, ExternalLink, ShieldCheck } from "lucide-react";
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
            { name: "Qui sommes-nous", href: "/a-propos" },
            { name: "Cadre Juridique", href: "/a-propos/juridique" }
          ]}
          backgroundImage="/images/banners/qui-nous-sommes/banner_cadre_juridique.jpg"
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox 
          icon={Scale}
          label="Textes de Loi et Décrets Fondateurs du FPS"
          variant="purple"
          image="/images/featured-images/qui-sommes-nous/featured_cadre_juridique.jpg"
        />

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="prose max-w-none">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-fps-primary">Fondement légal</h2>
              <div className="w-20 h-1.5 bg-[var(--danger)] mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Le Fonds de Promotion de la Santé (FPS) est régi par un ensemble de textes légaux et réglementaires 
                fondateurs qui définissent son cadre d'action, ses responsabilités et son intégration dans le système de santé national.
              </p>
            </div>
            
            <div className="my-8 space-y-4">
              {[
                {
                  title: "Constitution de la RDC",
                  desc: "Vu la Constitution, telle que modifiée par la loi n° 11/002 du 20 janvier 2011 portant révision de certains articles de la Constitution de la RDC du 18 février 2006, spécialement en son article 92.",
                  link: "/uploads/documents/Constitution%20de%20la%20RDC.pdf"
                },
                {
                  title: "Loi n° 18/035 du 13 décembre 2018",
                  desc: "Vu la loi n° 18/035 du 13 décembre 2018 fixant les principes fondamentaux relatifs à l’organisation de la santé publique, spécialement en son article 128.",
                  link: "/uploads/documents/Loi%2018%3A035.pdf"
                },
                {
                  title: "Décret n° 22/15 du 09 avril 2022",
                  desc: "Vu le Décret n° 22/15 du 09 avril 2022 portant organisation et fonctionnement d’un établissement public dénommé Fonds de Promotion de la Santé, « FPS » en sigle.",
                  link: "/uploads/documents/Decrets Journal FPS.pdf" 
                },
                {
                  title: "Ordonnance n° 21/032 du 1er juin 2021",
                  desc: "Vu l’ordonnance n° 21/032 du 1er juin 2021 portant création, organisation et fonctionnement du Conseil National de la Couverture Santé Universelle.",
                  link: "/uploads/documents/830.06.21-Ordonnance-du-1er-juin-2021_CNCSU.pdf"
                },
                {
                  title: "Ordonnance-loi n° 23/006 du 3 mars 2023",
                  desc: "Vu l’ordonnance-loi n° 23/006 du 3 mars 2023 modifiant et complétant la loi n° 18/035 du 13 décembre 2018.",
                  link: "/uploads/documents/loi_csu_23_006_du_03_mars_2023.pdf"
                },
                {
                  title: "Décret n° 25/028 de janvier 2025",
                  desc: "Vu le Décret n° 25/028 du [date peu lisible] janvier 2025 fixant les modalités de perception et d’affectation de la taxe de promotion de la santé.",
                  link: "/uploads/documents/Décret FPS TPS-1.pdf"
                },
                {
                  title: "Arrêté interministériel du 21 janvier 2026",
                  desc: "Arrêté interministériel n°1250/Cab/Min/SPHPS/SEM/ARR/CJG/OBM/01/2026 et n°001/Cab/Min/Fin/DF du 21 janvier 2026, portant mesures d'exécution du decret n°25/028 du 17 juillet 2025 fixant les modalités de perception et d'affectation de la Taxe pour la Promotion de la Santé, TPS en sigle.",
                  link: null
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-fps-primary transition-colors shadow-sm group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-fps-primary group-hover:bg-fps-primary group-hover:text-white transition-colors">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700 leading-relaxed text-base italic m-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/a-propos" className="inline-flex items-center justify-center px-8 py-4 border-2 border-fps-primary text-fps-primary font-bold rounded-2xl hover:bg-fps-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Retour à la page À propos
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
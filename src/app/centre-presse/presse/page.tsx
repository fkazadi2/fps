import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { getArticles } from "@/lib/data/articles";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { Calendar, ChevronRight, Search, FileText, Newspaper } from "lucide-react";

export const revalidate = 600;

export default async function Communiques() {
  const articles = await getArticles(50, 'communique');

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Presse & Communiqués"
          description="Consultez les dernières annonces et déclarations officielles du Fonds de Promotion de la Santé"
          backgroundImage="/images/banners/centre-presse/presse.jpg"
          icon={Newspaper}
          variant="blue"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" },
            { name: "Communiqués", href: "/centre-presse/presse" }
          ]}
        />



        {/* Liste des communiqués */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {articles.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-lg font-medium text-gray-900">Aucun communiqué trouvé</h3>
                <p className="mt-2 text-sm text-gray-500">Les communiqués officiels seront affichés ici dès leur publication.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {articles.map((article) => (
                  <div key={article._id} className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
                    <div className="lg:flex">
                      <div className="lg:w-2/3 p-8">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2 text-[var(--primary)]" />
                          <span>{article.formattedDate || article.publishedAt}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[var(--primary)] transition-colors">
                          <Link href={`/actualites/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                            Communiqué
                          </span>
                          <Link href={`/actualites/${article.slug}`} className="inline-flex items-center text-[var(--primary)] font-bold hover:text-[var(--accent)] group">
                            Lire l'article <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                      <div className="lg:w-1/3 relative min-h-[200px]">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-fps-primary-light flex items-center justify-center">
                            <FileText className="w-16 h-16 text-[var(--primary)] opacity-20" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-md">
                          <span className="text-xs font-bold text-[var(--primary)] uppercase">Officiel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
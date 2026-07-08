import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, Newspaper } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import { getArticleBySlug } from "@/lib/data/articles";

export const revalidate = 3600; // ISR: Revalider chaque heure

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Utilisation de la date pré-calculée (Optimisation Phase 4)
    const formattedDate = article.formattedDate || article.publishedAt || "";

    return (
        <MainLayout>
            <article className="bg-white min-h-screen pb-20">
                {/* 1. La Bannière */}
                <PageHeader
                    title={article.title}
                    description={article.excerpt}
                    icon={Newspaper}
                    variant={article.category === 'evenement' ? 'purple' : 'blue'}
                    breadcrumbs={[
                        { name: "Actualités", href: "/actualites" },
                        { name: article.title, href: `/actualites/${slug}` }
                    ]}
                />

                {/* 2. L'Image à la Une */}
                <FeaturedImageBox
                    image={article.image}
                    variant={article.category === 'evenement' ? 'purple' : 'blue'}
                />

                {/* Meta details (Date, Auteur) */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-20">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-3 ${article.category === 'evenement'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                                }`}>
                                {(article.category || 'Article').toUpperCase()}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formattedDate}
                        </div>

                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Direction FPS
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="prose prose-lg prose-blue mx-auto max-w-none"
                        // Injection sécurisée du HTML (attention aux XSS si contenu utilisateur non-admin)
                        // Le contenu vient de l'admin (confiance), on peut l'injecter.
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags / Footer Article */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-gray-500 text-sm">
                            Fonds de Promotion de la Santé (FPS)
                        </div>
                        <button className="flex items-center text-gray-500 hover:text-[#005bb0] transition-colors">
                            <Share2 className="w-5 h-5 mr-2" />
                            Partager cet article
                        </button>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}

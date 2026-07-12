import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, Newspaper } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import SocialShareButtons from "@/components/ui/SocialShareButtons";
import { getArticleBySlug } from "@/lib/data/articles";

export const revalidate = 3600; // ISR: Revalider chaque heure

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Utilisation de la date pré-calculée (Optimisation Phase 4)
    const formattedDate = article.formattedDate || article.publishedAt || "";
    const articleImages = Array.isArray(article.images) && article.images.length > 0
        ? article.images
        : article.image
            ? [{ src: article.image, alt: article.title }]
            : [];

    return (
        <MainLayout>
            <article className="bg-white min-h-screen pb-20">
                {/* 1. La Bannière */}
                <PageHeader
                    title={article.title}
                    icon={Newspaper}
                    variant={article.category === 'evenement' ? 'purple' : 'blue'}
                    breadcrumbs={[
                        { name: "Actualités", href: "/actualites" },
                        { name: article.title, href: `/actualites/${slug}` }
                    ]}
                />

                {/* 2. L'Image à la Une */}
                <FeaturedImageBox
                    image={articleImages[0]?.src || article.image}
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
                        className="prose prose-lg prose-blue mx-auto max-w-none [&_p]:mb-6 [&_p]:leading-8 [&_p:last-child]:mb-0"
                        // Injection sécurisée du HTML (attention aux XSS si contenu utilisateur non-admin)
                        // Le contenu vient de l'admin (confiance), on peut l'injecter.
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {articleImages.length > 1 && (
                        <section className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Galerie photos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {articleImages.map((image: { src: string; alt?: string }, index: number) => (
                                    <div
                                        key={`${image.src}-${index}`}
                                        className="relative h-56 rounded-xl overflow-hidden shadow-md bg-gray-100"
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt || article.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Tags / Footer Article */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-gray-500 text-sm">
                            Fonds de Promotion de la Santé (FPS)
                        </div>
                        <SocialShareButtons title={article.title} path={`/actualites/${slug}`} />
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}

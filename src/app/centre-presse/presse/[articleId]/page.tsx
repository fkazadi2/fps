import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Newspaper } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedImageBox from '@/components/ui/FeaturedImageBox';
import SocialShareButtons from '@/components/ui/SocialShareButtons';
import connectDB from '@/lib/mongodb';
import Article from '@/lib/models/Article';

// Désactivation ISR — contenu stable, mise à jour à chaque déploiement
export const revalidate = 3600; // 1 heure

// Génération des slugs connus au build time
export async function generateStaticParams() {
  try {
    await connectDB();
    const articles = await Article.find({ published: true })
      .select('slug')
      .lean();
    return articles.map((a: any) => ({ articleId: a.slug }));
  } catch {
    // Fallback sur les slugs hardcodés si la DB est inaccessible au build
    return [
      { articleId: 'celebration-de-la-23e-journee' },
      { articleId: 'rdc-csu-mise-en-oeuvre' },
      { articleId: 'celebration-3eme-anniversaire-fps' },
    ];
  }
}

interface ArticlePageProps {
  params: Promise<{
    articleId: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;

  // Lecture depuis MongoDB (Server Component — pas de localStorage)
  let article: any = null;
  try {
    await connectDB();
    article = await Article.findOne({ slug: articleId, published: true }).lean();
  } catch (error) {
    console.error('[ArticlePage] Erreur DB:', error);
  }

  if (!article) {
    notFound();
  }

  // Galerie d'images (champ images[] ou image principale)
  const images: { src: string; alt: string }[] = article.images?.length
    ? article.images
    : article.image
      ? [{ src: article.image, alt: article.title }]
      : [];

  // Date affichable : champ date stocké en DB, ou formatage de publishedAt
  const displayDate = article.date
    || (article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      : '');

  return (
    <MainLayout>
      <article className="bg-white min-h-screen pb-20">
        {/* 1. La Bannière */}
        <PageHeader
          title={article.title}
          description={article.excerpt || "Communiqué de presse officiel du Fonds de Promotion de la Santé"}
          icon={Newspaper}
          variant="red-dark"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" },
            { name: "Espace Presse", href: "/centre-presse/presse" },
            { name: article.title, href: `/centre-presse/presse/${articleId}` }
          ]}
        />

        {/* 2. L'Image à la Une */}
        <FeaturedImageBox
          image={images[0]?.src}
          variant="red"
        />

        {/* Meta details (Date, Catégorie, Auteur) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-20">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full inline-flex items-center">
                <Tag className="h-3 w-3 mr-1" /> {article.category}
              </span>
            </div>

            {displayDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {displayDate}
              </div>
            )}

            {article.author && (
              <div className="flex items-center italic">
                Par {article.author}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link
              href="/centre-presse/presse"
              className="inline-flex items-center text-sm text-gray-500 hover:text-red-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux communiqués
            </Link>
          </div>

        {/* Contenu de l'article */}
        <div
          className="prose prose-lg max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Galerie d'images (si plus d'une image) */}
        {images.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Galerie photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt || article.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liens de partage et de navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <SocialShareButtons title={article.title} path={`/centre-presse/presse/${articleId}`} />

            <div>
              <Link
                href="/centre-presse/presse"
                className="px-6 py-2 border border-gray-300 rounded-md text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
              >
                Plus d&apos;actualités
              </Link>
            </div>
          </div>
        </div>
      </div>
      </article>
    </MainLayout>
  );
}

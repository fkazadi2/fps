import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Newspaper } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedImageBox from '@/components/ui/FeaturedImageBox';
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
  params: {
    articleId: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = params;

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
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Partager : </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://fps.gouv.cd/centre-presse/presse/${articleId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                aria-label="Partager sur Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://fps.gouv.cd/centre-presse/presse/${articleId}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900"
                aria-label="Partager sur LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

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
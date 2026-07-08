import { notFound } from 'next/navigation';
import { FileText } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageRenderer from '@/components/ui/PageRenderer';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedImageBox from '@/components/ui/FeaturedImageBox';
import SubpageNavigation from '@/components/ui/SubpageNavigation';
import { getPageBySlug } from '@/lib/data/pages';

interface DynamicPageProps {
  params: {
    slug: string;
  };
}

// Page dynamique connectée à MongoDB
export default async function DynamicPage({ params }: DynamicPageProps) {
  // Attendre les paramètres (Next.js 15+)
  const { slug } = await params;

  // Récupérer les données de la page via le Data Layer
  const pageData = await getPageBySlug(slug);

  // Si la page n'existe pas, afficher la page 404
  if (!pageData) {
    notFound();
  }

  return (
    <MainLayout>

      {/* 1. La Bannière */}
      <PageHeader
        title={pageData.banner?.title || pageData.title}
        description={pageData.banner?.subtitle}
        icon={FileText}
        variant="blue"
        breadcrumbs={[
          { name: pageData.title, href: `/${slug}` }
        ]}
      />

      {/* 2. L'Image à la Une */}
      <FeaturedImageBox
        image={pageData.banner?.imageUrl}
        variant="blue"
      />

      {/* Contenu de la page */}
      <div className={getLayoutClass(pageData.layout)}>
        <main className="prose max-w-none mb-12">
          {/* Si pas de bannière, afficher le titre principal */}
          {!pageData.banner?.enabled && (
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{pageData.title}</h1>
          )}

          {/* Contenu HTML de base (Legacy ou simple) */}
          {pageData.content && (
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
          )}

          {/* Rendu des composants dynamiques (Nouveau système de blocs) */}
          {pageData.components && pageData.components.length > 0 && (
            <PageRenderer components={pageData.components} />
          )}

          {/* Afficher les liens vers les sous-pages sur la page à propos (Hardcodé pour l'instant ou à rendre dynamique) */}
          {slug === 'a-propos' && <SubpageNavigation />}
        </main>

        {/* Sidebar pour le layout avec sidebar */}
        {pageData.layout === 'sidebar' && renderSidebar()}
      </div>
    </MainLayout>
  );
}

// Fonction utilitaire pour obtenir les classes CSS du layout
function getLayoutClass(layout: string): string {
  const classes = {
    standard: 'max-w-5xl mx-auto px-4 py-8',
    'full-width': 'w-full px-4 py-8',
    sidebar: 'max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-[1fr_300px] gap-8',
    landing: 'w-full'
  };

  return classes[layout as keyof typeof classes] || classes.standard;
}

// Fonction utilitaire pour obtenir la classe CSS de hauteur de bannière
function getBannerHeightClass(height: string = 'medium'): string {
  const classes = {
    small: 'h-40 md:h-60',
    medium: 'h-60 md:h-80',
    large: 'h-80 md:h-[30rem]'
  };

  return classes[height as keyof typeof classes] || classes.medium;
}

// Fonction pour rendre la sidebar
function renderSidebar() {
  return (
    <aside className="sidebar bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
      <ul className="space-y-2">
        <li><Link href="/a-propos" className="text-[var(--primary)] hover:underline">À propos</Link></li>
        <li><Link href="/programmes" className="text-[var(--primary)] hover:underline">Programmes</Link></li>
        <li><Link href="/financement" className="text-[var(--primary)] hover:underline">Financement</Link></li>
        <li><Link href="/documentation" className="text-[var(--primary)] hover:underline">Documentation</Link></li>
        <li><Link href="/actualites" className="text-[var(--primary)] hover:underline">Actualités</Link></li>
        <li><Link href="/contact" className="text-[var(--primary)] hover:underline">Contact</Link></li>
      </ul>

      <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium mb-2">Besoin d&apos;aide?</h4>
        <p className="text-sm text-gray-600 mb-4">Contactez-nous pour toute question concernant nos programmes ou pour obtenir plus d&apos;informations.</p>
        <Link
          href="/contact"
          className="inline-block px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded hover:bg-[var(--primary-dark)] transition-colors"
        >
          Nous contacter
        </Link>
      </div>
    </aside>
  );
}
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Camera, Images } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedImageBox from '@/components/ui/FeaturedImageBox';

export const revalidate = 3600; // 1 heure

// Données des albums stockées en statique (en attendant un modèle MongoDB Album)
// Ces albums contiennent des photos locales dans /public/images/albums/
const albumsData: Record<string, {
  title: string;
  date: string;
  description: string;
  photos: { id: string; src: string; alt: string; caption?: string }[];
}> = {
  'reunion-dg-hebdomadaire-dga': {
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    date: '05 mai 2025',
    description: 'Réunion hebdomadaire de la Direction générale du FPS sous la conduite de sa DGA, Professeure Claudine Tshimanga.',
    photos: [
      {
        id: 'reunion-dg-hebdomadaire-dga-1',
        src: '/images/albums/album1/01.jpg',
        alt: 'Réunion de la Direction générale sous la conduite de la DGA',
        caption: 'Professeure Claudine Tshimanga dirigeant la réunion hebdomadaire'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-2',
        src: '/images/albums/album1/495355173_601736906255249_6749656125338518196_n.jpg',
        alt: 'Participants à la réunion de la Direction générale',
        caption: "Équipe de direction pendant les discussions"
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-3',
        src: '/images/albums/album1/495467965_601736722921934_7215218402358744623_n.jpg',
        alt: 'Séance de travail à la Direction générale',
        caption: 'Analyse des dossiers en cours'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-4',
        src: '/images/albums/album1/495110069_601736726255267_4654519226464166977_n.jpg',
        alt: 'Discussion entre les cadres du FPS',
        caption: 'Échange sur les projets prioritaires'
      },
      {
        id: 'reunion-dg-hebdomadaire-dga-5',
        src: '/images/albums/album1/494639974_601736622921944_5814473378881736652_n.jpg',
        alt: 'Vue générale de la réunion de la Direction',
        caption: "Coordination des activités hebdomadaires"
      }
    ]
  },
  'reunion-hebdomadaire-dg-fps': {
    title: 'Réunion hebdomadaire de la Direction générale du FPS',
    date: '07 avril 2025',
    description: 'Réunion hebdomadaire de la Direction générale du FPS par Professeure Claudine Tshimanga, DGA.',
    photos: [
      {
        id: 'reunion-hebdomadaire-dg-fps-1',
        src: '/images/albums/album2/01.jpg',
        alt: 'Réunion de coordination hebdomadaire',
        caption: 'La DGA présentant les objectifs de la semaine'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-2',
        src: '/images/albums/album2/488909830_579644991797774_1772670195890762873_n.jpg',
        alt: 'Équipe de direction en concertation',
        caption: 'Analyse des résultats des programmes en cours'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-3',
        src: '/images/albums/album2/488912023_579645075131099_660984792756912370_n.jpg',
        alt: 'Cadres du FPS en réunion',
        caption: "Discussion sur l'allocation des ressources"
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-4',
        src: '/images/albums/album2/488917061_579644915131115_2945468185851778057_n.jpg',
        alt: "Présentation des rapports d'activités",
        caption: 'Revue des indicateurs de performance'
      },
      {
        id: 'reunion-hebdomadaire-dg-fps-5',
        src: '/images/albums/album2/489571909_579645045131102_8758764895091984017_n.jpg',
        alt: 'Session de planification stratégique',
        caption: "Élaboration du plan d'action mensuel"
      }
    ]
  }
};

// Génération des chemins statiques
export async function generateStaticParams() {
  return Object.keys(albumsData).map(albumId => ({ albumId }));
}

interface AlbumPageProps {
  params: {
    albumId: string;
  };
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = params;

  const album = albumsData[albumId];

  if (!album) {
    notFound();
  }

  const photos = album.photos || [];

  return (
    <MainLayout>
      {/* 1. La Bannière */}
      <PageHeader
        title={album.title}
        description={album.description}
        icon={Images}
        variant="red"
        breadcrumbs={[
          { name: "Centre de Presse", href: "/centre-presse" },
          { name: "Galerie Photos", href: "/centre-presse/galerie" },
          { name: album.title, href: `/centre-presse/galerie/${albumId}` }
        ]}
      />

      {/* 2. L'Image à la Une */}
      <FeaturedImageBox
        image={photos[0]?.src}
        variant="red"
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Infos album */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center text-gray-600">
            <span className="font-semibold text-gray-900 mr-2">Date :</span>
            <span>{album.date}</span>
            <span className="mx-3 text-gray-300">|</span>
            <span className="font-semibold text-gray-900 mr-2">Nombre de photos :</span>
            <span>{photos.length} photos</span>
          </div>

          <Link
            href="/centre-presse/galerie"
            className="inline-flex items-center text-[var(--primary)] font-bold hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la galerie
          </Link>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0">
                <Image
                  src={photo.src}
                  alt={photo.alt || "Photo d'album"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 text-white">
                  <p className="text-sm">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
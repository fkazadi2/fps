import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Camera, Images } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/layout/PageHeader';
import FeaturedImageBox from '@/components/ui/FeaturedImageBox';
import { getAlbums, dateAlbum } from '@/lib/data/albums';

export const revalidate = 60;

// Génération des chemins connus au build ; les nouveaux albums sont créés à la première visite
export async function generateStaticParams() {
  return (await getAlbums()).map(a => ({ albumId: a.id }));
}

interface AlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;

  const album = (await getAlbums()).find(a => a.id === albumId);

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
            <span>{dateAlbum(album.date)}</span>
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
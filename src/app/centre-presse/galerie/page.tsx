import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Search, Calendar, Filter, Camera } from "lucide-react";
import { getAlbums, dateAlbum } from "@/lib/data/albums";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";

export const revalidate = 60;

export default async function Galerie() {
  const albums = await getAlbums();

  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader 
          title="Galerie photo"
          description="Découvrez en images les événements et activités du FPS à travers la République Démocratique du Congo"
          backgroundImage="/images/banners/centre-presse/galerie-photo.jpg"
          icon={Camera}
          variant="rose"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" },
            { name: "Galerie", href: "/centre-presse/galerie" }
          ]}
        />



        {/* Section de filtrage */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
                    placeholder="Rechercher dans la galerie..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Toutes les années</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <select className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm rounded-md">
                  <option value="">Toutes les catégories</option>
                  <option value="evenements">Événements</option>
                  <option value="activites">Activités de terrain</option>
                  <option value="formations">Formations</option>
                  <option value="inaugurations">Inaugurations</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Albums photo récents */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[var(--primary)] sm:text-4xl">
                Galerie photos
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Découvrez nos activités en images
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {albums.map(album => (
              <div key={album.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    <div className="flex items-center text-white mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{dateAlbum(album.date)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{album.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">
                    {album.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/20 text-[var(--secondary)]">
                      <Camera className="h-3 w-3 mr-1" />
                      {album.photos.length} photos
                    </span>
                    <Link href={`/centre-presse/galerie/${album.id}`} className="text-[var(--primary)] font-medium hover:text-[var(--accent)]">
                      Voir l'album
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  &larr; Précédent
                </button>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center justify-center w-8 h-8 border border-[var(--primary)] bg-[var(--primary)] text-white rounded-md">1</button>
                  <button className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">2</button>
                  <button className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">3</button>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors">
                  Suivant &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 
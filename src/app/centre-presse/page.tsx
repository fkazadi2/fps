import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, Camera, Mic2 } from "lucide-react";

export default function CentrePressePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* 1. La Bannière */}
        <PageHeader
          title="Centre de Presse"
          description="Actualités, événements et galerie média du Fonds de Promotion de la Santé"
          backgroundImage="/images/banners/centre-presse/centre-presse.jpg"
          icon={Mic2}
          variant="blue"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" }
          ]}
        />

        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Navigation vers les sous-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Communiqués", 
                tag: "Presse",
                href: "/centre-presse/presse", 
                img: "/images/articles/rdc-csu-mise-en-oeuvre/1.jpg", 
                icon: Mic2, 
                desc: "Consultez les dernières annonces et déclarations officielles du Fonds de Promotion de la Santé." 
              },
              { 
                title: "Galerie Photo", 
                tag: "Médiathèque",
                href: "/centre-presse/galerie", 
                img: "/images/articles/celebration/1.jpg", 
                icon: Camera, 
                desc: "Découvrez nos activités en images : dotations, équipements, formations et inaugurations." 
              },
              { 
                title: "Événements", 
                tag: "Agenda",
                href: "/centre-presse/evenements", 
                img: "/images/articles/celebration-de-la-23e-journee/1.jpg", 
                icon: Calendar, 
                desc: "Consultez notre agenda d'événements : conférences, ateliers et rencontres partenaires." 
              },
              {
                title: "Direction de communication",
                tag: "Équipe",
                href: "/centre-presse/direction-de-communication",
                img: "/images/articles/celebration/2.jpg",
                icon: Mic2,
                desc: "Découvrez l’équipe de communication du FPS : profils, fonctions et contacts."
              }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href} 
                className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg mr-3">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[10px]">{item.tag}</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-auto flex items-center text-blue-600 font-bold text-sm">
                    <span>Voir plus</span>
                    <div className="ml-2 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Section réalisations phares */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-fps-primary mb-6">
              Nos réalisations phares (2023-2024)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Financement en médicaments</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>7,2 millions USD</strong> engagés pour 333 ESS
                </p>
                <p className="text-gray-600 text-sm">
                  Objectif : gratuité de l&apos;accouchement dans le cadre de la CSU
                </p>
              </div>

              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Équipements & Ambulances</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>4,47 millions USD</strong> d&apos;équipements
                </p>
                <p className="text-gray-600 text-sm">
                  Kits d&apos;accouchement, couveuses, lits hospitaliers
                </p>
              </div>

              <div className="bg-fps-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fps-primary mb-2">Système de transfert</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>16 ambulances</strong> opérationnelles
                </p>
                <p className="text-gray-600 text-sm">
                  Plus de 1 400 transferts de femmes et enfants réalisés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
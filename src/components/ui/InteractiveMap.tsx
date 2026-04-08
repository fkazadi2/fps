"use client";

import { useState, useEffect } from "react";
import { MapPin, Map } from "lucide-react";
import dynamic from "next/dynamic";

// Données des régions d'intervention (Mise à jour officielle 2026)
const regions = [
  { 
    id: 1, 
    name: "Kinshasa", 
    coordinates: [-4.4419, 15.2663], 
    projects: 15, 
    beneficiaries: "1.5M", 
    focus: "Siège & Santé Publique",
    description: "Coordination nationale et programmes de santé maternelle et infantile dans la capitale."
  },
  { 
    id: 2, 
    name: "Lubumbashi", 
    coordinates: [-11.6642, 27.4799], 
    projects: 10, 
    beneficiaries: "950K", 
    focus: "Infrastructures",
    description: "Renforcement du plateau technique et gestion des urgences sanitaires dans le Haut-Katanga."
  },
  { 
    id: 3, 
    name: "Kolwezi", 
    coordinates: [-10.7180, 25.4680], 
    projects: 7, 
    beneficiaries: "420K", 
    focus: "Santé Communautaire",
    description: "Amélioration des soins de santé primaires dans les zones minières du Lualaba."
  },
  { 
    id: 4, 
    name: "Mbuji-Mayi", 
    coordinates: [-6.1500, 23.6000], 
    projects: 8, 
    beneficiaries: "680K", 
    focus: "Équipements",
    description: "Dotation des structures sanitaires en équipements modernes dans le Kasaï Oriental."
  },
  { 
    id: 5, 
    name: "Kananga", 
    coordinates: [-5.8960, 22.4160], 
    projects: 6, 
    beneficiaries: "510K", 
    focus: "Vaccination",
    description: "Programmes de vaccination élargis et lutte contre les maladies infectieuses au Kasaï Central."
  },
  { 
    id: 6, 
    name: "Kisangani", 
    coordinates: [0.5170, 25.1900], 
    projects: 9, 
    beneficiaries: "740K", 
    focus: "Province Orientale",
    description: "Support logistique et médicaments essentiels pour la zone forestière de la Tshopo."
  },
  { 
    id: 7, 
    name: "Bandundu", 
    coordinates: [-3.3130, 17.3750], 
    projects: 5, 
    beneficiaries: "350K", 
    focus: "Accès Rural",
    description: "Développement des infrastructures sanitaires rurales dans la province du Kwilu."
  },
  { 
    id: 8, 
    name: "Kikwit", 
    coordinates: [-5.0340, 18.8160], 
    projects: 4, 
    beneficiaries: "280K", 
    focus: "Maternité",
    description: "Centre d'excellence pour la santé maternelle et néonatale dans le Kwilu."
  },
  { 
    id: 9, 
    name: "Matadi", 
    coordinates: [-5.8270, 13.4440], 
    projects: 6, 
    beneficiaries: "310K", 
    focus: "Santé Infantile",
    description: "Amélioration de la nutrition et soins pédiatriques dans le Kongo Central."
  }
];

// Chargement dynamique de la carte pour éviter les erreurs de SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] bg-red-50 rounded-xl flex items-center justify-center">
      <div className="animate-pulse text-[var(--danger)]">Chargement de la carte...</div>
    </div>
  )
});

export default function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleRegionClick = (regionId: number) => {
    setActiveRegion(activeRegion === regionId ? null : regionId);
  };
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--danger)] opacity-5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-6">
            Nos zones d'intervention
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Le FPS est présent dans toutes les provinces de la RDC pour garantir un accès équitable aux soins de santé
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-full max-w-5xl relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform transition-all duration-500">
              <MapComponent 
                regions={regions} 
                activeRegion={activeRegion} 
                onRegionClick={handleRegionClick} 
              />
            </div>
            
            {/* Légende centrée comme sur la capture */}
            <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-base font-bold text-gray-900 tracking-tight">26 Provinces couvertes</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
                <div className="w-3 h-3 bg-[#FFC107] rounded-full"></div>
                <span className="text-base font-bold text-gray-900 tracking-tight">650+ Centres de santé</span>
              </div>
            </div>
          </div>
          
          {/* Détails de la région (affichés seulement si une région est sélectionnée, plus bas) */}
          {activeRegion && (
            <div className="mt-12 w-full max-w-3xl animate-slideUp">
              <div className="bg-gradient-to-br from-[var(--danger)] to-[var(--primary)] rounded-3xl p-8 shadow-2xl text-white">
                {regions.filter(r => r.id === activeRegion).map(region => (
                  <div key={region.id} className="space-y-6">
                    <div className="flex items-center gap-4 pb-4 border-b border-white/30">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-bold">{region.name}</h3>
                    </div>
                    <p className="text-xl text-white/90 leading-relaxed">{region.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                        <span className="block text-white/70 text-sm">Projets</span>
                        <span className="text-2xl font-bold">{region.projects}</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                        <span className="block text-white/70 text-sm">Bénéficiaires</span>
                        <span className="text-2xl font-bold">{region.beneficiaries}</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                        <span className="block text-white/70 text-sm">Focus</span>
                        <span className="text-lg font-bold">{region.focus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 
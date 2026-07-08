"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuration des icônes Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface InteractiveMapFPSProps {
  height?: string;
  className?: string;
}

export default function InteractiveMapFPS({ height = '400px', className = '' }: InteractiveMapFPSProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Coordonnées de 16, Av. Lukusa, Imm Les Palmiers, Gombe, Kinshasa
    const fpsLocation: [number, number] = [-4.3033, 15.3051];

    // Initialiser la carte sans le contrôle d'attribution (supprime le texte et le logo Leaflet)
    const map = L.map(mapContainerRef.current, {
      attributionControl: false
    }).setView(fpsLocation, 16);

    // Ajouter les tuiles OpenStreetMap sans attribution
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19,
    }).addTo(map);

    // Ajouter un marqueur pour le FPS
    const marker = L.marker(fpsLocation).addTo(map);

    // Popup avec informations
    marker.bindPopup(`
      <div class="p-2">
        <h3 class="font-semibold text-lg mb-2">Fonds de Promotion de la Santé</h3>
        <p class="text-sm mb-1"><strong>Adresse :</strong></p>
        <p class="text-sm mb-2">
          16, Av. Lukusa,<br/>
          Imm Les Palmiers, Apt 3B,<br/>
          Kinshasa-Gombe, RDC
        </p>
        <p class="text-sm mb-1"><strong>Téléphones :</strong></p>
        <p class="text-sm mb-1">+243 81 911 5812</p>
        <p class="text-sm mb-2">+243 981 210 031</p>
        <p class="text-sm">
          <strong>Email :</strong> 
          <a href="mailto:secretariat@fps.cd" class="text-blue-600 hover:underline">secretariat@fps.cd</a>
        </p>
      </div>
    `);

    // Ouvrir le popup par défaut
    marker.openPopup();

    mapRef.current = map;

    // Nettoyage
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainerRef}
        style={{ height, width: '100%' }}
        className="rounded-lg border border-gray-300 shadow-sm"
      />
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded text-xs text-gray-600">
        📍 Cliquez sur le marqueur pour plus d&apos;informations
      </div>
    </div>
  );
} 
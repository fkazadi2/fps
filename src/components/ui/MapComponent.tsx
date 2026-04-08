"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Types pour nos props
interface Region {
  id: number;
  name: string;
  coordinates: number[];
  projects: number;
  beneficiaries: string;
  focus: string;
  description: string;
}

interface MapComponentProps {
  regions: Region[];
  activeRegion: number | null;
  onRegionClick: (regionId: number) => void;
}

// Composant pour centrer la carte sur la région active
function ChangeMapView({ center }: { center: [number, number] }) {
  // Désactivé pour garder la vue globale de la RDC comme sur la capture
  return null;
}

export default function MapComponent({ regions, activeRegion, onRegionClick }: MapComponentProps) {
  const [loaded, setLoaded] = useState(false);
  const [redMarkerIcon, setRedMarkerIcon] = useState<L.Icon | null>(null);
  const [activeMarkerIcon, setActiveMarkerIcon] = useState<L.Icon | null>(null);
  
  useEffect(() => {
    setLoaded(true);
    
    // Injecter les styles CSS de Leaflet
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
      link.integrity = "sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==";
      link.crossOrigin = "";
      
      if (!document.querySelector('link[href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"]')) {
        document.head.appendChild(link);
      }
    }
    
    // Créer l'icône de marqueur rouge
    if (L.Icon) {
      // Marqueur rouge standard
      const redMarker = new L.Icon({
        iconUrl: '/images/marker-icon-red.png',
        shadowUrl: '/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      // Marqueur rouge plus grand pour la région active
      const activeMarker = new L.Icon({
        iconUrl: '/images/marker-icon-red.png',
        shadowUrl: '/images/marker-shadow.png',
        iconSize: [30, 46],
        iconAnchor: [15, 46],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      setRedMarkerIcon(redMarker);
      setActiveMarkerIcon(activeMarker);
    }
  }, []);
  
  // Obtenir les coordonnées du centre
  const activeRegionData = activeRegion ? regions.find(r => r.id === activeRegion) : null;
  const centerCoords: [number, number] = activeRegionData 
    ? [activeRegionData.coordinates[0], activeRegionData.coordinates[1]]
    : [-4.322447, 15.307045]; // Centré sur Kinshasa par défaut
  
  if (!loaded || !redMarkerIcon || !activeMarkerIcon) {
    return (
      <div className="w-full h-[500px] bg-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-blue-600">Chargement de la carte...</div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[500px]">
      <MapContainer 
        center={[-2.5, 23.5]} 
        zoom={5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ChangeMapView center={centerCoords} />
        
        {regions.map((region) => (
          <Marker 
            key={region.id}
            position={[region.coordinates[0], region.coordinates[1]] as [number, number]}
            icon={redMarkerIcon}
            eventHandlers={{
              click: () => {
                onRegionClick(region.id);
              }
            }}
          >
            <Tooltip 
              permanent 
              direction="bottom" 
              offset={[0, 10]}
              className="bg-transparent border-none shadow-none text-gray-800 font-bold text-xs"
            >
              {region.name}
            </Tooltip>
            <Popup>
              <div className="text-center p-1">
                <strong className="text-[var(--danger)]">{region.name}</strong>
                <div className="text-sm text-gray-600">{region.projects} projets actifs</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 
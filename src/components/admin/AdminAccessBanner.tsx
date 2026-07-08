"use client";

import { useState } from "react";

export default function AdminAccessBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 relative">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-800"
        aria-label="Fermer la notification"
      >
        ✕
      </button>
      <p className="font-bold">Mode d'accès libre activé</p>
      <p>L'authentification est temporairement désactivée pour faciliter le développement. Tous les utilisateurs peuvent accéder au CMS.</p>
    </div>
  );
} 
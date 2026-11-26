"use client";

import { createContext, useContext } from "react";
import type { Annonce } from "@/lib/data/accueil";
import statique from "@/lib/data/accueil-statique.json";

// Les annonces sont lues côté serveur (layout) puis transmises à l'en-tête, qui est un composant client
const Contexte = createContext<Annonce[]>(statique.annonces);

export const useAnnonces = () => useContext(Contexte);

export default function AnnoncesProvider({ annonces, children }: { annonces: Annonce[]; children: React.ReactNode }) {
    return <Contexte.Provider value={annonces}>{children}</Contexte.Provider>;
}

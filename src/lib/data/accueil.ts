import { cache } from "react";
import statique from "./accueil-statique.json";
import { lireWordPress } from "./wordpress";

export type Diapo = {
    id: number; title: string; description: string; image: string; buttonText: string; buttonLink: string;
    secondaryButtonText?: string; secondaryButtonLink?: string;
};
export type Annonce = { id: string; texte: string; lien: string };

export const getDiapos = cache(async () => (await lireWordPress<Diapo>("diapos")) ?? (statique.diapos as Diapo[]));
export const getAnnonces = cache(async () => (await lireWordPress<Annonce>("annonces")) ?? (statique.annonces as Annonce[]));

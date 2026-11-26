import { cache } from "react";
import statiques from "./publications-statiques.json";
import { lireWordPress } from "./wordpress";

export type OffreEmploi = {
    id: string; titre: string; departement: string; lieu: string; type: string; niveau: string; experience: string;
    datePublication: string; dateLimite: string; salaire: string; description: string; pdfUrl: string; requirements: string[];
};
export type AppelOffre = {
    id: string; titre: string; reference: string; datePublication: string; dateLimite: string; statut: string;
    montant: string; lieu: string; description: string; fileUrl?: string;
};
export type DocumentPublie = {
    id: string; title: string; category: string; date: string; description: string; fileUrl: string;
    fileSize: string; format: string; downloads: number;
};

// WordPress s'il répond (même avec une liste vide), sinon le contenu d'origine du site
export const getOffres = cache(async () => (await lireWordPress<OffreEmploi>("offres")) ?? (statiques.offres as OffreEmploi[]));
export const getAppels = cache(async () => (await lireWordPress<AppelOffre>("appels")) ?? (statiques.appels as AppelOffre[]));
export const getDocuments = cache(async () => (await lireWordPress<DocumentPublie>("documents")) ?? (statiques.documents as DocumentPublie[]));

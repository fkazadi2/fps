import { cache } from "react";
import albumsStatiques from "./albums-statiques.json";
import { wordpressActif, lireWordPress } from "./wordpress";
export { dateAlbum } from "./dates-albums";

export type PhotoAlbumSite = {
    id: string;
    title: string;
    description: string;
    date: string; // JJ/MM/AAAA
    coverImage: string;
    photos: { id: string; src: string; alt: string; caption?: string }[];
};

const cle = (a: PhotoAlbumSite) => a.date.split("/").reverse().join("");

/** Albums du plus récent au plus ancien : WordPress s'il répond, sinon les albums d'origine. */
export const getAlbums = cache(async (): Promise<PhotoAlbumSite[]> => {
    const wp = wordpressActif ? await lireWordPress<PhotoAlbumSite>("albums") : null;
    return [...(wp ?? (albumsStatiques as PhotoAlbumSite[]))].sort((a, b) => cle(b).localeCompare(cle(a)));
});

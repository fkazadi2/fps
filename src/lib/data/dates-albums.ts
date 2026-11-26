/** « 05/05/2025 » devient « 05 mai 2025 ». */
export function dateAlbum(date: string): string {
    const [jour, mois, annee] = date.split("/");
    const noms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    return noms[Number(mois) - 1] ? `${jour} ${noms[Number(mois) - 1]} ${annee}` : date;
}

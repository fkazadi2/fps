/**
 * Lecture des actualités depuis WordPress (mode « headless »).
 * Actif seulement si WORDPRESS_URL est défini ; sinon le site lit MongoDB comme avant.
 * L'API est fournie par wp-content/mu-plugins/fps-actualites.php.
 */
const base = process.env.WORDPRESS_URL?.replace(/\/$/, "");

export const wordpressActif = Boolean(base);

/** Lit une liste publiée par WordPress. null seulement s'il est absent ou injoignable. */
export async function lireWordPress<T>(liste: "articles" | "albums" | "offres" | "appels" | "documents" | "diapos" | "annonces"): Promise<T[] | null> {
    if (!base) return null;
    try {
        const reponse = await fetch(`${base}/wp-json/fps/v1/${liste}`, {
            next: { revalidate: 60 },
            signal: AbortSignal.timeout(15000),
        });
        if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
        const elements = await reponse.json();
        if (!Array.isArray(elements)) throw new Error(`réponse inattendue (${liste})`);
        return elements;
    } catch (error) {
        console.warn("WordPress injoignable, retour aux données actuelles :", error instanceof Error ? error.message : error);
        return null;
    }
}

/** Articles publiés, du plus récent au plus ancien. */
export async function lireArticlesWordPress(): Promise<any[] | null> {
    const articles = await lireWordPress<any>("articles");
    return articles && articles.sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

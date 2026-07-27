import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { cache } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MOCK_ARTICLES } from "./mock-data";

const normalizeMatadiImagePath = (src: string) =>
    src.replace(/^\/images\/articles\/fps-matadi-csu\/(.+)\.jpeg$/, "/images/articles/fps-matadi-csu/$1.jpg");

// Fonction utilitaire pour formater les articles
function formatArticle(article: any) {
    const dateObj = new Date(article.publishedAt || article.createdAt);
    const images = Array.isArray(article.images)
        ? article.images.map((image: any) => ({
            ...image,
            src: typeof image.src === "string" ? normalizeMatadiImagePath(image.src) : image.src
        }))
        : article.images;

    return {
        ...article,
        _id: article._id.toString(),
        image: typeof article.image === "string" ? normalizeMatadiImagePath(article.image) : article.image,
        images,
        createdAt: article.createdAt?.toISOString ? article.createdAt.toISOString() : article.createdAt,
        updatedAt: article.updatedAt?.toISOString ? article.updatedAt.toISOString() : article.updatedAt,
        publishedAt: article.publishedAt?.toISOString ? article.publishedAt.toISOString() : article.publishedAt,
        createdBy: article.createdBy?.toString(),
        updatedBy: article.updatedBy?.toString(),

        // Computed fields
        formattedDate: format(dateObj, 'd MMMM yyyy', { locale: fr }),
        dayBadge: format(dateObj, 'dd'),
        monthBadge: format(dateObj, 'MMM', { locale: fr }).toUpperCase().replace('.', ''),

        // Champs événements
        eventStartDate: article.eventStartDate?.toISOString ? article.eventStartDate.toISOString() : article.eventStartDate,
        eventEndDate: article.eventEndDate?.toISOString ? article.eventEndDate.toISOString() : article.eventEndDate,

        ...(article.category === 'evenement' && {
            eventMeta: {
                formattedDate: (() => {
                    if (!article.eventStartDate) return null;
                    const start = new Date(article.eventStartDate);
                    const end = article.eventEndDate ? new Date(article.eventEndDate) : null;
                    if (end && start.getTime() !== end.getTime()) {
                        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
                            return `${format(start, 'd')} - ${format(end, 'd MMMM yyyy', { locale: fr })}`;
                        }
                        return `${format(start, 'd MMM', { locale: fr })} - ${format(end, 'd MMM yyyy', { locale: fr })}`;
                    }
                    return format(start, 'd MMMM yyyy', { locale: fr });
                })(),
                time: article.eventTime || null,
                location: article.eventLocation || null,
                isUpcoming: article.eventStartDate ? new Date(article.eventStartDate) > new Date() : false
            }
        })
    };
}

export const getArticles = cache(async (limit = 50, category?: string) => {
    try {
        await connectDB();
        const query: any = { published: true };
        if (category && category !== "all") {
            query.category = category;
        }

        const articles = await Article.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .limit(limit)
            .lean();

        if (!articles || articles.length === 0) throw new Error("Aucun article en DB");
        
        return articles.map(formatArticle);
    } catch (error) {
        console.warn("⚠️ Mode Resilience : Utilisation des articles MOCKS suite à une erreur DB.");
        let filteredMocks = MOCK_ARTICLES;
        if (category && category !== "all") {
            filteredMocks = MOCK_ARTICLES.filter(a => a.category === category);
        }
        return filteredMocks.slice(0, limit).map(formatArticle);
    }
});

export const getArticleBySlug = cache(async (slug: string) => {
    try {
        await connectDB();
        const cleanSlug = slug.replace("/actualites/", "").replace(/^\//, "");
        const article = await Article.findOne({
            slug: cleanSlug,
            published: true
        }).lean();

        if (!article) {
            // Check in mocks
            const mock = MOCK_ARTICLES.find(a => a.slug === cleanSlug);
            if (mock) return formatArticle(mock);
            return null;
        }

        return formatArticle(article);
    } catch (error) {
        console.warn(`⚠️ Mode Resilience : Recherche de l'article [${slug}] dans les MOCKS.`);
        const cleanSlug = slug.replace("/actualites/", "").replace(/^\//, "");
        const mock = MOCK_ARTICLES.find(a => a.slug === cleanSlug);
        return mock ? formatArticle(mock) : null;
    }
});

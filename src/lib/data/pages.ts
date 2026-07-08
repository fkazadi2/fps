import connectDB from "@/lib/mongodb";
import Page from "@/lib/models/Page";
import { cache } from "react";
import { MOCK_PAGES } from "./mock-data";

// Types
export interface PageData {
    _id: string;
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    status: 'published' | 'draft';
    layout: 'standard' | 'full-width' | 'sidebar' | 'landing';
    banner?: {
        enabled: boolean;
        imageUrl?: string;
        title?: string;
        subtitle?: string;
        height: 'small' | 'medium' | 'large';
    };
    components?: any[];
    createdAt?: string;
    updatedAt?: string;
}

export const getPageBySlug = cache(async (slug: string): Promise<PageData | null> => {
    try {
        await connectDB();

        let searchSlug = slug;
        if (!slug.startsWith('/')) {
            searchSlug = `/${slug}`;
        }

        const page = await Page.findOne({
            slug: searchSlug,
            status: 'published'
        }).lean();

        if (!page) {
            // Check in mocks
            const mock = (MOCK_PAGES as any)[searchSlug];
            if (mock) return mock as PageData;
            return null;
        }

        return {
            ...page,
            _id: page._id.toString(),
            status: (page as any).status || 'published',
            layout: (page as any).layout || 'standard',
            content: typeof page.content === 'string' ? page.content : JSON.stringify(page.content),
            createdAt: page.createdAt?.toISOString ? page.createdAt.toISOString() : page.createdAt,
            updatedAt: page.updatedAt?.toISOString ? page.updatedAt.toISOString() : page.updatedAt,
        } as any;
    } catch (error) {
        console.warn(`⚠️ Mode Resilience : Utilisation de la page MOCK pour [${slug}].`);
        let searchSlug = slug;
        if (!slug.startsWith('/')) {
            searchSlug = `/${slug}`;
        }
        const mock = (MOCK_PAGES as any)[searchSlug];
        return mock ? mock as PageData : null;
    }
});

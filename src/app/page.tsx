// Server Component wrapper for homepage
import HomeClient from './HomeClient';
import connectDB from '@/lib/mongodb';
import HomepageSection from '@/lib/models/HomepageSection';
import { getArticles } from '@/lib/data/articles';
import { getAlbums } from '@/lib/data/albums';
import { getDiapos } from '@/lib/data/accueil';

export const revalidate = 60; // Revalider toutes les minutes (ISR)

/**
 * Homepage - Server Component
 * Récupère les données de la homepage directement depuis la base de données
 */
export default async function Home() {
    try {
        // Récupérer les sections, les articles et les événements en parallèle
        // La base des sections peut être injoignable sans priver l'accueil des actualités
        let sections: any[] = [];
        try {
            await connectDB();
            sections = await HomepageSection.find({ active: true }).sort({ displayOrder: 1 }).lean();
        } catch (e) {
            console.warn("⚠️ Mode Resilience : Impossible de charger les sections de la Homepage depuis la DB.");
        }

        const [latestNews, upcomingEvents, albums, diapos] = await Promise.all([
            getArticles(9, 'communique'),
            getArticles(3, 'evenement'),
            getAlbums(),
            getDiapos()
        ]);

        // Transformer les sections pour le format attendu par HomeClient
        const content: Record<string, any> = {};
        const sectionsVisibility: Record<string, boolean> = {};

        sections.forEach((section: any) => {
            const keyMapping: Record<string, string> = {
                'hero_slider': 'heroSlider',
                'stats': 'stats',
                'mission': 'mission',
                'features': 'features',
                'csu_progress': 'csuProgress',
                'partners': 'partners',
                'testimonials': 'testimonials',
                'cta': 'cta',
                'map': 'interactiveMap'
            };

            const frontendKey = keyMapping[section.sectionType] || section.sectionType;
            content[frontendKey] = section.content;
            sectionsVisibility[frontendKey] = section.active;
        });

        const homepageContent = {
            ...content,
            sectionsVisibility: {
                heroSlider: sectionsVisibility.heroSlider ?? true,
                mission: sectionsVisibility.mission ?? true,
                stats: sectionsVisibility.stats ?? true,
                map: sectionsVisibility.interactiveMap ?? true,
                csuProgress: sectionsVisibility.csuProgress ?? true,
                news: true,
                mediaGallery: true,
                events: true,
                partners: sectionsVisibility.partners ?? true,
                testimonials: sectionsVisibility.testimonials ?? true,
                cta: sectionsVisibility.cta ?? true
            }
        };

        return (
            <HomeClient
                latestNews={latestNews}
                upcomingEvents={upcomingEvents}
                albums={albums.slice(0, 6)}
                diapos={diapos}
                initialSections={homepageContent}
            />
        );
    } catch (error) {
        console.error('Error in Homepage Server Component:', error);
        // Fallback vide au cas où
        return <HomeClient />;
    }
}

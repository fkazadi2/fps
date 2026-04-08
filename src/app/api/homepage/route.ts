import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomepageSection from '@/lib/models/HomepageSection';
import { getArticles } from '@/lib/data/articles';

/**
 * GET /api/homepage
 * 
 * Récupère TOUTES les données de la homepage en une seule requête:
 * - Sections configurables (Hero, Stats, Mission, etc.) depuis HomepageSection
 * - Dernières actualités (3 communiqués)
 * - Prochains événements (3 événements)
 * 
 * Utilisé par le Server Component page.tsx pour pre-render la homepage
 */
export async function GET() {
    try {
        await connectDB();

        // Récupérer toutes les sections actives, triées par ordre d'affichage
        const sections = await HomepageSection
            .find({ active: true })
            .sort({ displayOrder: 1 })
            .lean();

        // Récupérer les articles et événements en parallèle
        const [latestNews, upcomingEvents] = await Promise.all([
            getArticles(3, 'communique'),
            getArticles(3, 'evenement')
        ]);

        const content: Record<string, any> = {};
        const sectionsVisibility: Record<string, boolean> = {};
        const sectionsConfig: Record<string, { key: string; id: string; type: string }> = {};

        sections.forEach(section => {
            // Mapping du sectionType vers les clés attendues par le frontend
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

            // Stocker les métadonnées pour l'admin
            sectionsConfig[frontendKey] = {
                key: section.key,
                id: section._id.toString(),
                type: section.sectionType
            };
        });

        // Retourner structure complète pour homepage
        return NextResponse.json({
            success: true,
            data: {
                // Sections configurables
                ...content,

                // Données dynamiques
                news: latestNews,
                events: upcomingEvents,

                // Visibilité des sections
                sectionsVisibility: {
                    heroSlider: sectionsVisibility.heroSlider ?? true,
                    mission: sectionsVisibility.mission ?? true,
                    stats: sectionsVisibility.stats ?? true,
                    map: sectionsVisibility.interactiveMap ?? true,
                    csuProgress: sectionsVisibility.csuProgress ?? true,
                    news: true, // Toujours afficher si articles disponibles
                    mediaGallery: true,
                    events: true, // Toujours afficher si événements disponibles
                    partners: sectionsVisibility.partners ?? true,
                    testimonials: sectionsVisibility.testimonials ?? true,
                    cta: sectionsVisibility.cta ?? true
                }
            },
            config: sectionsConfig, // Métadonnées pour l'admin
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[GET /api/homepage] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch homepage data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/homepage
 * 
 * Met à jour une section spécifique de la homepage
 * Body: {
 *   key: string,           // Ex: 'homepage_hero'
 *   content: object,       // Nouveau contenu JSON
 *   active?: boolean,      // Visibilité
 *   displayOrder?: number  // Ordre d'affichage
 * }
 */
export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { key, content, active, displayOrder } = body;

        if (!key) {
            return NextResponse.json(
                { success: false, error: 'Missing required field: key' },
                { status: 400 }
            );
        }

        // Préparer les champs à mettre à jour
        const updateFields: any = { updatedAt: new Date() };
        if (content !== undefined) updateFields.content = content;
        if (active !== undefined) updateFields.active = active;
        if (displayOrder !== undefined) updateFields.displayOrder = displayOrder;

        // Mettre à jour ou créer la section
        const section = await HomepageSection.findOneAndUpdate(
            { key },
            { $set: updateFields },
            {
                new: true,  // Retourner le document mis à jour
                upsert: false  // Ne pas créer automatiquement
            }
        );

        if (!section) {
            return NextResponse.json(
                { success: false, error: `Section not found: ${key}` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: section,
            message: 'Section updated successfully'
        });

    } catch (error) {
        console.error('[PUT /api/homepage] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update homepage section',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

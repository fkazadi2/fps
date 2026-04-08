import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page from '@/lib/models/Page';

// GET: Récupérer toutes les pages
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');

        // Construire le filtre
        const filter: any = {};
        if (published === 'true') {
            filter.published = true;
        } else if (published === 'false') {
            filter.published = false;
        }

        // Récupérer les pages avec tri — utiliser toJSON() pour transformer _id en id
        const pagesRaw = await Page.find(filter)
            .sort({ createdAt: -1 })
            .exec();

        const pages = pagesRaw.map(p => p.toJSON());

        return NextResponse.json({
            success: true,
            pages,
            count: pages.length
        }, { status: 200 });

    } catch (error: any) {
        console.error('Erreur GET /api/pages:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération des pages',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// POST: Créer une nouvelle page
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        // Validation des données requises
        if (!body.slug || !body.title || !body.content) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Données manquantes (slug, title, content requis)'
                },
                { status: 400 }
            );
        }

        // Vérifier si le slug existe déjà
        const existingPage = await Page.findOne({ slug: body.slug });
        if (existingPage) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Une page avec le slug "${body.slug}" existe déjà`
                },
                { status: 409 }
            );
        }

        // Créer la page
        const page = await Page.create(body);

        return NextResponse.json({
            success: true,
            page: page.toJSON(),
            message: 'Page créée avec succès'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Erreur POST /api/pages:', error);

        // Gestion des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Erreur de validation',
                    details: Object.values(error.errors).map((e: any) => e.message)
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la création de la page',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

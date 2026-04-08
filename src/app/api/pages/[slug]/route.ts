import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page from '@/lib/models/Page';

// GET: Récupérer une page par slug ou ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();
        const { slug } = await params;

        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        const query = isObjectId ? { _id: slug } : { slug: slug };

        const pageDoc = await Page.findOne(query).exec();

        if (!pageDoc) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page non trouvée'
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            page: pageDoc.toJSON()
        }, { status: 200 });

    } catch (error: any) {
        // params is awaited, but if error happens before, slug is not defined here.
        // We can't log slug easily if await params failed, but usually it doesn't fail.
        console.error(`Erreur GET /api/pages:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération de la page',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// PUT: Mettre à jour une page
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();
        const { slug } = await params;

        const body = await request.json();

        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        const query = isObjectId ? { _id: slug } : { slug: slug };

        // Mettre à jour la page
        const page = await Page.findOneAndUpdate(
            query,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!page) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page non trouvée'
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            page: page.toJSON(),
            message: 'Page mise à jour avec succès'
        }, { status: 200 });

    } catch (error: any) {
        console.error(`Erreur PUT /api/pages:`, error);

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

        // Erreur de duplicité (ex: slug déjà pris)
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Une page avec ce slug existe déjà'
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la mise à jour de la page',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// DELETE: Supprimer une page
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();
        const { slug } = await params;

        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        const query = isObjectId ? { _id: slug } : { slug: slug };

        const page = await Page.findOneAndDelete(query);

        if (!page) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Page non trouvée'
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Page supprimée avec succès',
                deletedPage: page.toJSON()
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error(`Erreur DELETE /api/pages:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la suppression de la page',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

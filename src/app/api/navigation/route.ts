import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NavigationMenu from '@/lib/models/NavigationMenu';

/**
 * GET /api/navigation?location=header
 * 
 * Récupère le menu de navigation par location
 * Query params:
 *   - location: 'header' | 'footer' | 'mobile' | 'sidebar'
 */
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location') || 'header';

        // Récupérer le menu pour cette location
        const menu = await NavigationMenu
            .findOne({ location, active: true })
            .lean();

        if (!menu) {
            return NextResponse.json({
                success: false,
                error: `No navigation menu found for location: ${location}`
            }, { status: 404 });
        }

        // Trier les items par ordre
        const sortedItems = menu.items
            .sort((a, b) => a.order - b.order)
            .map(item => ({
                ...item,
                submenu: item.submenu.sort((a, b) => a.order - b.order)
            }));

        return NextResponse.json({
            success: true,
            data: {
                key: menu.key,
                location: menu.location,
                items: sortedItems
            }
        });

    } catch (error) {
        console.error('[GET /api/navigation] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch navigation menu',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/navigation
 * 
 * Met à jour un menu de navigation
 * Body: {
 *   key: string,
 *   items: NavigationMenuItem[]
 * }
 */
export async function PUT(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { key, items } = body;

        if (!key) {
            return NextResponse.json(
                { success: false, error: 'Missing required field: key' },
                { status: 400 }
            );
        }

        // Mettre à jour le menu
        const menu = await NavigationMenu.findOneAndUpdate(
            { key },
            {
                $set: {
                    items,
                    updatedAt: new Date()
                }
            },
            { new: true }
        );

        if (!menu) {
            return NextResponse.json(
                { success: false, error: `Navigation menu not found: ${key}` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: menu,
            message: 'Navigation menu updated successfully'
        });

    } catch (error) {
        console.error('[PUT /api/navigation] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update navigation menu',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

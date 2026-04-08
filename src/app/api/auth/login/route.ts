import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        // Validation des données
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email et mot de passe requis'
                },
                { status: 400 }
            );
        }

        // Trouver l'utilisateur par email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email ou mot de passe incorrect'
                },
                { status: 401 }
            );
        }

        // Vérifier le mot de passe
        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email ou mot de passe incorrect'
                },
                { status: 401 }
            );
        }

        // Vérifier les droits admin
        if (!user.isAdmin) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Accès administrateur requis'
                },
                { status: 403 }
            );
        }

        // Retourner les infos utilisateur (sans mot de passe grâce au toJSON)
        const userResponse = user.toJSON();

        return NextResponse.json({
            success: true,
            user: userResponse
        }, { status: 200 });

    } catch (error: any) {
        console.error('Erreur POST /api/auth/login:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la connexion',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

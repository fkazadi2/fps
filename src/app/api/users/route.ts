import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
// Note: Dans une vraie implémentation NextAuth, on importerait authOptions
// import { authOptions } from "@/lib/auth"; 

export async function GET(request: Request) {
    try {
        // Vérification basique de sécurité (à renforcer avec NextAuth session)
        // const session = await getServerSession(authOptions);
        // if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

        await connectDB();

        // Récupérer tous les utilisateurs sans le champ password
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return NextResponse.json(
            { error: "Erreur serveur lors de la récupération des utilisateurs" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Vérification sécurité
        // const session = await getServerSession(authOptions);
        // if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

        await connectDB();

        const body = await request.json();
        const { name, email, password, isAdmin } = body;

        // Validation basique
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nom, email et mot de passe requis" },
                { status: 400 }
            );
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Un utilisateur avec cet email existe déjà" },
                { status: 400 }
            );
        }

        // Créer l'utilisateur
        // Le password sera hashé automatiquement via le hook pre-save du modèle User
        const newUser = await User.create({
            name,
            email,
            password,
            isAdmin: isAdmin || false,
        });

        // Retourner l'utilisateur sans le mot de passe
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            createdAt: newUser.createdAt,
        };

        return NextResponse.json(userResponse, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        return NextResponse.json(
            { error: "Erreur serveur lors de la création de l'utilisateur" },
            { status: 500 }
        );
    }
}

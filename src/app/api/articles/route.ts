import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const status = searchParams.get("status");
        const limit = parseInt(searchParams.get("limit") || "50");

        const query: any = {};
        if (category && category !== "all") query.category = category;
        if (status && status !== "all") {
            if (status === "published") query.published = true;
            if (status === "draft") query.published = false;
        }

        const articles = await Article.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Erreur récupération articles:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // const session = await getServerSession(authOptions);
        // if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

        await connectDB();
        const body = await request.json();

        // Génération automatique du slug si non fourni
        if (!body.slug && body.title) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
        }

        const newArticle = await Article.create(body);
        return NextResponse.json(newArticle, { status: 201 });
    } catch (error: any) {
        console.error("Erreur création article:", error);
        // Gestion erreur duplicata slug
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Un article avec ce slug existe déjà" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: error.message || "Erreur serveur" },
            { status: 500 }
        );
    }
}

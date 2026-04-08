import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        // Empêcher la modification du mot de passe via cette route simples
        // Pour changer le mot de passe, on créerait une route dédiée ou une logique spécifique
        const { password, ...updateData } = body;

        // Si on veut permettre le changement de mot de passe, il faudrait le gérer spécifiquement
        // car le hook pre-save de Mongoose ne se déclenche par défaut que sur .save() et pas sur findOneAndUpdate
        // Sauf si on récupère le user, on modifie, et on save()

        let user;

        if (password) {
            // Logique pour changement de mot de passe
            user = await User.findById(id);
            if (!user) {
                return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
            }

            user.name = updateData.name || user.name;
            user.email = updateData.email || user.email;
            if (updateData.isAdmin !== undefined) user.isAdmin = updateData.isAdmin;
            if (updateData.image !== undefined) user.image = updateData.image;
            user.password = password; // Le hook pre-save hachera
            await user.save();
        } else {
            // Mise à jour simple sans mot de passe
            user = await User.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select("-password");
        }

        if (!user) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Erreur mise à jour utilisateur:", error);

        // Gestion erreur duplication (ex: email unique)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Cet email est déjà utilisé par un autre compte." },
                { status: 409 }
            );
        }

        // Gestion erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e: any) => e.message).join(', ');
            return NextResponse.json(
                { error: messages },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: "Erreur serveur lors de la mise à jour",
                details: error.message
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        // Empêcher la suppression du dernier admin ? (Optionnel mais recommandé)

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { error: "Utilisateur non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur suppression utilisateur:", error);
        return NextResponse.json(
            { error: "Erreur serveur lors de la suppression" },
            { status: 500 }
        );
    }
}

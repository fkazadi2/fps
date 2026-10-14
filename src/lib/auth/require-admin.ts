import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

/**
 * Vérifie que l'appelant est un administrateur connecté (session NextAuth).
 * Renvoie une réponse 401 à retourner telle quelle, ou null si l'accès est autorisé.
 *
 * Usage dans une route API :
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { success: false, error: "Non autorisé" },
      { status: 401 }
    );
  }

  return null;
}

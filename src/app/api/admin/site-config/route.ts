import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { uploadImage, deleteImage } from "@/lib/storage";
import { getSiteConfig, updateSiteConfig } from "@/lib/cms/local-storage";

// GET - Obtenir la configuration du site
export async function GET() {
  try {
    const config = await getSiteConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Erreur lors de la récupération de la config:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la configuration" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour la configuration du site
export async function PUT(request: NextRequest) {
  try {
    // Vérification d'authentification désactivée pour simplifier
    const data = await request.json();
    
    // Mettre à jour la configuration
    const config = await updateSiteConfig(data);
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la config:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la configuration" },
      { status: 500 }
    );
  }
}

// POST - Pour télécharger le favicon ou le logo
export async function POST(request: NextRequest) {
  try {
    // Vérification d'authentification désactivée pour simplifier
    const formData = await request.formData();
    const imageType = formData.get('type') as string; // 'favicon' ou 'logo'
    const file = formData.get('file') as File;
    
    if (!file || !imageType) {
      return NextResponse.json(
        { error: "Fichier ou type manquant" },
        { status: 400 }
      );
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    // Télécharger l'image avec le service de stockage flexible
    const { url, publicId } = await uploadImage(
      base64Image, 
      {
        folder: imageType === 'favicon' ? 'favicons' : 'logos',
        fileType: file.type
      }
    );
    
    // Supprimer l'ancienne image si nécessaire
    const previousPublicId = formData.get('previousPublicId') as string;
    if (previousPublicId) {
      await deleteImage(previousPublicId);
    }
    
    // Mettre à jour la configuration
    const config = await getSiteConfig();
    
    // Mettre à jour l'URL selon le type
    if (imageType === 'favicon') {
      config.faviconUrl = url;
    } else if (imageType === 'logo') {
      config.logoUrl = url;
    }
    
    await updateSiteConfig(config);
    
    return NextResponse.json({
      url,
      publicId,
      message: `${imageType === 'favicon' ? 'Favicon' : 'Logo'} mis à jour avec succès`
    });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléchargement de l'image" },
      { status: 500 }
    );
  }
} 
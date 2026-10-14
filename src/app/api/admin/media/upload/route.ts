import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { requireAdmin } from '@/lib/auth/require-admin';

// Extension imposée d'après le type d'image : on ne garde jamais celle de l'envoyeur
// (sinon un fichier "page.html" déclaré "image/png" serait servi comme HTML)
const extensions: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};

export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!extensions[file.type]) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, GIF ou WebP.' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale: 5MB.' },
        { status: 400 }
      );
    }

    // Créer un nom de fichier unique
    const timestamp = Date.now();
    const baseName = path.parse(file.name).name.replace(/[^a-zA-Z0-9-]/g, '_');
    const fileName = `${timestamp}_${baseName}.${extensions[file.type]}`;
    
    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Sauvegarder le fichier
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);

    // URL publique du fichier
    const fileUrl = `/uploads/${fileName}`;

    // Sauvegarder les métadonnées dans localStorage côté client
    // (en production, cela serait en base de données)
    const mediaData = {
      id: timestamp.toString(),
      filename: fileName,
      originalName: file.name,
      url: fileUrl,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      url: fileUrl,
      media: mediaData
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
} 
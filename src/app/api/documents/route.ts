import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DocumentModel from '@/lib/models/Document';

export async function GET() {
  try {
    await connectDB();
    const documents = await DocumentModel.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des documents:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de la récupération des documents.' },
      { status: 500 }
    );
  }
}

/**
 * Service de stockage de fichiers flexible
 * Prend en charge le stockage local ou Cloudinary selon la configuration
 */

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from './cloudinary';

// Type de stockage (local ou cloudinary)
const USE_LOCAL_STORAGE = process.env.USE_LOCAL_STORAGE === 'true';
const LOCAL_STORAGE_PATH = process.env.LOCAL_STORAGE_PATH || './public/uploads';

// Assurer que le chemin se réfère au dossier public
const getPublicPath = (filePath: string): string => {
  // Si le chemin commence par ./public, supprimer cette partie pour l'URL
  return filePath.replace(/^\.\/public/, '');
};

/**
 * Télécharge une image
 * @param file Le fichier à télécharger (base64 ou buffer)
 * @param options Options de téléchargement
 * @returns Objet contenant l'URL et l'ID de l'image
 */
export async function uploadImage(
  file: string | Buffer,
  options: {
    folder?: string;
    fileName?: string;
    fileType?: string;
  } = {}
) {
  const { folder = 'general', fileName, fileType = 'image/png' } = options;

  // Mode stockage local
  if (USE_LOCAL_STORAGE) {
    try {
      // Créer le dossier s'il n'existe pas
      const folderPath = path.join(process.cwd(), LOCAL_STORAGE_PATH.replace(/^\.\//, ''), folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Générer un nom de fichier unique
      const uniqueFileName = fileName || `${uuidv4()}.${fileType.split('/')[1] || 'png'}`;
      const filePath = path.join(folderPath, uniqueFileName);

      // Écrire le fichier
      let fileData;
      if (typeof file === 'string' && file.startsWith('data:')) {
        // Cas d'un fichier base64
        const matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error('Format de fichier base64 invalide');
        }
        fileData = Buffer.from(matches[2], 'base64');
      } else if (Buffer.isBuffer(file)) {
        // Cas d'un Buffer
        fileData = file;
      } else if (typeof file === 'string') {
        // Cas d'une chaîne simple
        fileData = Buffer.from(file);
      } else {
        throw new Error('Format de fichier non pris en charge');
      }

      // Écrire le fichier
      fs.writeFileSync(filePath, fileData);

      // Construire l'URL publique
      const publicPath = getPublicPath(filePath.replace(process.cwd(), '.'));
      const publicId = `${folder}/${uniqueFileName}`;

      return {
        url: publicPath,
        publicId: publicId
      };
    } catch (error) {
      console.error('Erreur lors du stockage local:', error);
      throw error;
    }
  } 
  // Mode Cloudinary
  else {
    try {
      // Vérifier si cloudinary est configuré
      if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error('Cloudinary n\'est pas configuré');
      }

      // Upload à Cloudinary
      const result = await cloudinary.uploader.upload(
        file as string,
        {
          folder: `fps_website/${folder}`,
          resource_type: 'auto',
        }
      );

      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      console.error('Erreur lors du téléchargement sur Cloudinary:', error);
      throw error;
    }
  }
}

/**
 * Supprime une image
 * @param publicId L'ID public de l'image à supprimer
 */
export async function deleteImage(publicId: string) {
  // Mode stockage local
  if (USE_LOCAL_STORAGE) {
    try {
      const [folder, fileName] = publicId.split('/');
      const filePath = path.join(
        process.cwd(),
        LOCAL_STORAGE_PATH.replace(/^\.\//, ''),
        folder,
        fileName
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression locale:', error);
      throw error;
    }
  } 
  // Mode Cloudinary
  else {
    try {
      if (!process.env.CLOUDINARY_CLOUD_NAME) {
        throw new Error('Cloudinary n\'est pas configuré');
      }
      
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Erreur lors de la suppression sur Cloudinary:', error);
      throw error;
    }
  }
} 
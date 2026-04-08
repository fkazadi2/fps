import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;

/**
 * Télécharge une image sur Cloudinary
 * @param file Le fichier à télécharger
 * @param folder Le dossier de destination sur Cloudinary
 * @returns Objet contenant l'URL et l'ID public de l'image
 */
export async function uploadImage(file: string, folder = 'fps_website') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Erreur lors du téléchargement sur Cloudinary:', error);
    throw error;
  }
}

/**
 * Supprime une image de Cloudinary
 * @param publicId L'ID public de l'image à supprimer
 */
export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Erreur lors de la suppression sur Cloudinary:', error);
    throw error;
  }
} 
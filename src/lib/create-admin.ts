/**
 * Script pour créer un administrateur dans le stockage local
 * Exécuter avec: npx ts-node create-admin.ts
 */

import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { getItem, setItem } from "./cms/local-storage";

async function createAdminUser() {
  try {
    // Vérifier si un administrateur existe déjà
    const existingAdmin = getItem('users', 'admin');
    
    if (existingAdmin) {
      console.log("Un administrateur existe déjà dans le stockage local");
      return;
    }
    
    // Créer un nouvel administrateur
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const newAdmin = {
      id: uuidv4(),
      name: "Administrateur FPS",
      email: "admin@fps.gouv.cd",
      password: hashedPassword,
      isAdmin: true
    };
    
    setItem('users', 'admin', newAdmin);
    
    console.log("Administrateur créé avec succès");
    console.log("Email: admin@fps.gouv.cd");
    console.log("Mot de passe: admin123");
    console.log("IMPORTANT: Changez ce mot de passe après la première connexion");
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur:", error);
  } finally {
    process.exit(0);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  createAdminUser();
}

export { createAdminUser }; 
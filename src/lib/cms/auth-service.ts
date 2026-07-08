/**
 * Service d'authentification utilisant localStorage
 */

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { getItem, setItem, getAllItems } from './local-storage';

// Interface pour les données utilisateur
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Initialiser les utilisateurs par défaut
 */
export function initializeDefaultUsers(): void {
  const users = getAllItems<User>('users');
  
  // Si aucun utilisateur n'existe, créer un admin par défaut
  if (users.length === 0) {
    createDefaultAdmin();
  }
}

/**
 * Créer un utilisateur admin par défaut
 */
async function createDefaultAdmin(): Promise<User> {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin: User = {
    id: uuidv4(),
    name: 'Administrateur FPS',
    email: 'admin@fps.gouv.cd',
    password: hashedPassword,
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  setItem('users', admin.id, admin);
  console.log('✅ Compte administrateur créé avec succès');
  console.log('Email: admin@fps.gouv.cd');
  console.log('Mot de passe: admin123');
  
  return admin;
}

/**
 * Vérifier les identifiants d'un utilisateur
 */
export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const users = getAllItems<User>('users');
  const user = users.find(u => u.email === email);
  
  if (!user) return null;
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) return null;
  
  return user;
}

/**
 * Obtenir un utilisateur par son email
 */
export function getUserByEmail(email: string): User | null {
  const users = getAllItems<User>('users');
  return users.find(user => user.email === email) || null;
}

/**
 * Obtenir un utilisateur par son ID
 */
export function getUserById(id: string): User | null {
  return getItem<User>('users', id);
}

/**
 * Créer un nouvel utilisateur
 */
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}): Promise<User> {
  // Vérifier si l'email existe déjà
  const existingUser = getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('Cet email est déjà utilisé');
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const newUser: User = {
    id: uuidv4(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    isAdmin: userData.isAdmin || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  setItem('users', newUser.id, newUser);
  
  return newUser;
}

/**
 * Mettre à jour un utilisateur
 */
export async function updateUser(
  id: string,
  updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<User | null> {
  const user = getUserById(id);
  
  if (!user) return null;
  
  // Si le mot de passe est fourni, le hacher
  let password = user.password;
  if (updates.password) {
    password = await bcrypt.hash(updates.password, 10);
  }
  
  const updatedUser: User = {
    ...user,
    ...updates,
    password,
    updatedAt: new Date().toISOString()
  };
  
  setItem('users', id, updatedUser);
  
  return updatedUser;
}

/**
 * Changer le mot de passe d'un utilisateur
 */
export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  const user = getUserById(id);
  
  if (!user) return false;
  
  // Vérifier l'ancien mot de passe
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) return false;
  
  // Mettre à jour le mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const updatedUser: User = {
    ...user,
    password: hashedPassword,
    updatedAt: new Date().toISOString()
  };
  
  setItem('users', id, updatedUser);
  
  return true;
} 
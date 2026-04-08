# Système de Gestion de Contenu (CMS) - FPS

Ce document explique comment configurer et utiliser le système d'administration du site web du Fonds de Promotion de la Santé (FPS).

## Configuration

### Prérequis
- Node.js (v18+)
- MongoDB (base de données)
- Compte Cloudinary (pour le stockage d'images)

### Variables d'environnement
Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

```
# Base de données MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fps_database?retryWrites=true&w=majority

# NextAuth Secret (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=votre_secret_ici
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (pour le stockage des images)
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### Création du compte administrateur
Pour créer un compte administrateur initial, exécutez:

```bash
npx ts-node src/lib/create-admin.ts
```

Cela créera un compte avec les identifiants suivants:
- Email: admin@fps.gouv.cd
- Mot de passe: admin123

**Important**: Changez ce mot de passe dès votre première connexion.

## Utilisation du CMS

### Connexion
1. Accédez à `/admin/login`
2. Connectez-vous avec vos identifiants administrateur

### Gestion du Favicon et Logo
1. Accédez à `/admin/site`
2. Dans la section "Favicon et logo", vous pouvez télécharger:
   - Un favicon (formats ICO, PNG, SVG recommandés)
   - Un logo (formats PNG, JPG recommandés)
3. Cliquez sur "Télécharger le favicon/logo" pour finaliser le téléchargement

### Gestion des informations du site
1. Accédez à `/admin/site`
2. Modifiez les informations:
   - Nom du site
   - Description du site
   - Informations de contact
   - Liens vers les réseaux sociaux
3. Cliquez sur "Enregistrer les modifications" pour sauvegarder

### Autres sections d'administration
Le CMS comprend les sections suivantes:
- Pages: Gestion des pages du site
- Actualités: Gestion des articles d'actualités
- Médias: Gestion de la bibliothèque de médias
- Événements: Gestion des événements
- Programmes: Gestion des programmes du FPS
- Utilisateurs: Gestion des utilisateurs du CMS
- Messages: Gestion des messages de contact

## Architecture technique

Le CMS est construit avec:
- Next.js (App Router)
- MongoDB (via Mongoose)
- NextAuth.js pour l'authentification
- Cloudinary pour le stockage des images
- Tailwind CSS pour l'interface

## Sécurité
- Tous les mots de passe sont hashés avec bcrypt
- Les routes d'administration sont protégées par authentification
- Seuls les utilisateurs avec le rôle "admin" peuvent accéder au CMS

## Support

Pour toute question ou assistance, veuillez contacter le développeur du site web. 
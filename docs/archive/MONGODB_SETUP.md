# ⚠️ IMPORTANT: Configuration MongoDB Required

Avant de pouvoir utiliser l'API MongoDB, vous devez:

## 1. Créer un compte MongoDB Atlas (Gratuit)

1. Allez sur https://www.mongodb.com/cloud/atlas/register
2. Créez un compte gratuit
3.  Créez un cluster M0 (gratuit)
4. Créez un utilisateur database (exemple: fps_admin)
5. Configurez Network Access: 0.0.0.0/0 (autoriser toutes les IPs pour le développement)

## 2. Obtenir votre Connection String

Dans MongoDB Atlas:
- Cliquez sur "Connect"
- Choisissez "Connect your application"
- Copiez la connection string qui ressemble à:
  ```
  mongodb+srv://fps_admin:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

## 3. Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://fps_admin:VOTRE_MOT_DE_PASSE@cluster.xxxxx.mongodb.net/fps_website?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genere_avec_commande_ci_dessous

# Cloudinary (déjà configuré)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

**Générer NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## 4. Créer l'utilisateur admin

```bash
npm run create-admin
```

Cela créera l'utilisateur:
- Email: admin@fps.gouv.cd
- Password: admin123

## 5. Tester la connexion

Redémarrez le serveur de développement:
```bash
npm run dev
```

Vous devriez voir dans les logs:
```
✅ MongoDB connecté avec succès
📦 Database: fps_website
```

## 6. Migrer les données (optionnel)

Si vous avez des données dans localStorage que vous voulez migrer:

1. Ouvrez `scripts/migrate-to-mongodb.ts`
2. Remplacez `localStorageData` par vos vraies données
3. Exécutez:
   ```bash
   npm run migrate
   ```

## 7. Se connecter au CMS

Allez sur: http://localhost:3000/admin/auth/login

- Email: admin@fps.gouv.cd
- Password: admin123

## Résolution de problèmes

### Erreur: "MONGODB_URI not defined"
- Vérifiez que `.env.local` existe
- Vérifiez que MONGODB_URI est bien défini
- Redémarrez le serveur

### Erreur de connexion MongoDB
- Vérifiez que Network Access autorise votre IP (ou 0.0.0.0/0)
- Vérifiez le mot de passe dans la connection string
- Vérifiez que le cluster est bien démarré

### Erreur: "Cannot find module '@tanstack/react-query-devtools'"
- C'est normal si l'installation n'est pas terminée
- Attendez la fin de: `npm install @tanstack/react-query-devtools`

# Installation MongoDB Local (macOS)

## Étape 1: Installation avec Homebrew

```bash
# Installer MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community@7.0

# Démarrer MongoDB
brew services start mongodb-community@7.0
```

## Étape 2: Vérifier Installation

```bash
# Vérifier que MongoDB tourne
brew services list | grep mongodb

# Tester connexion
mongosh
```

## Étape 3: Configuration .env.local

Créez `.env.local` à la racine avec:

```bash
# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/fps_website

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret_genere_avec_openssl

# Cloudinary (déjà configuré)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### Générer NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Étape 4: Créer Admin

```bash
npm run create-admin
```

Vous devriez voir:
```
✅ MongoDB connecté avec succès
📦 Database: fps_website
✅ Utilisateur admin créé avec succès!
📧 Email: admin@fps.gouv.cd
🔑 Password: admin123
```

## Étape 5: Tester

```bash
# Redémarrer serveur dev
npm run dev
```

Allez sur: http://localhost:3000/admin/auth/login

---

## Migration vers Production (Plus tard)

### Quand vous serez prêt pour fps.cd:

1. **Créer MongoDB Atlas** (gratuit)
2. **Changer .env.production:**
   ```bash
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fps_website
   ```
3. **Migrer données:**
   ```bash
   # Export local
   mongodump --uri="mongodb://localhost:27017/fps_website" --out=./backup
   
   # Import Atlas
   mongorestore --uri="mongodb+srv://..." ./backup
   ```

**C'est tout ! Le code reste identique.** ✅

---

## Commandes Utiles

```bash
# Démarrer MongoDB
brew services start mongodb-community@7.0

# Arrêter MongoDB
brew services stop mongodb-community@7.0

# Redémarrer MongoDB
brew services restart mongodb-community@7.0

# Voir les logs
tail -f /opt/homebrew/var/log/mongodb/mongo.log

# Ouvrir MongoDB shell
mongosh

# Voir les bases de données
mongosh --eval "show dbs"

# Voir les collections
mongosh fps_website --eval "show collections"
```

---

## Dépannage

### Erreur: "command not found: brew"

Installez Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Erreur: "Cannot connect to MongoDB"

```bash
# Vérifier si MongoDB tourne
brew services list | grep mongodb

# Si pas démarré
brew services start mongodb-community@7.0

# Vérifier les logs
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

### Erreur: Port 27017 déjà utilisé

```bash
# Voir ce qui utilise le port
lsof -i :27017

# Tuer le processus si nécessaire
kill -9 <PID>
```

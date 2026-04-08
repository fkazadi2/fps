# 🐳 MongoDB avec Docker Desktop (100% Local)

**Pourquoi cette solution:**
- ✅ Aucun service externe (Atlas, etc.)
- ✅ Contrôle total
- ✅ Même config que le VPS production
- ✅ Données sur votre Mac
- ✅ Fonctionne malgré macOS 13

---

## Étape 1: Installer Docker Desktop (5 min)

1. **Télécharger Docker Desktop:**
   - https://www.docker.com/products/docker-desktop

2. **Installer l'application** (glisser dans Applications)

3. **Lancer Docker Desktop**
   - Attendre que l'icône Docker soit verte (en haut)

4. **Vérifier installation:**
   ```bash
   docker --version
   ```
   Devrait afficher: `Docker version 20.x.x`

---

## Étape 2: Créer docker-compose.yml (1 min)

Créez ce fichier à la racine du projet:

**Fichier: `/Users/mac/fps-website-2025/fps-website-20250707/docker-compose.yml`**

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: fps_mongodb_dev
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./backup:/backup
    environment:
      MONGO_INITDB_ROOT_USERNAME: fps_admin
      MONGO_INITDB_ROOT_PASSWORD: fps_secure_2026
      MONGO_INITDB_DATABASE: fps_website

volumes:
  mongodb_data:
    driver: local
```

---

## Étape 3: Démarrer MongoDB (1 commande)

```bash
cd /Users/mac/fps-website-2025/fps-website-20250707
docker-compose up -d
```

**Résultat:**
```
✓ Container fps_mongodb_dev  Started
```

---

## Étape 4: Vérifier MongoDB Tourne

```bash
docker ps
```

Vous devez voir:
```
CONTAINER ID   IMAGE       STATUS         PORTS                      NAMES
abc123...      mongo:7.0   Up 10 seconds  0.0.0.0:27017->27017/tcp   fps_mongodb_dev
```

---

## Étape 5: Mettre à Jour .env.local

**Fichier: `.env.local`**

```bash
# MongoDB Local via Docker
MONGODB_URI=mongodb://fps_admin:fps_secure_2026@localhost:27017/fps_website?authSource=admin

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tFB0Ecoj0olnIaKML/xUll2+CH/JlDovE/o4cwMVtG4=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

---

## Étape 6: Créer l'Admin (1 commande)

```bash
npm run create-admin
```

**Résultat attendu:**
```
🔄 Connexion à MongoDB...
✅ MongoDB connecté avec succès
📦 Database: fps_website
✅ Utilisateur admin créé avec succès!
📧 Email: admin@fps.gouv.cd
🔑 Password: admin123
```

---

## Étape 7: Tester le Login

1. **Redémarrer Next.js:**
   ```bash
   npm run dev
   ```

2. **Allez sur:** http://localhost:3000/admin/auth/login

3. **Connectez-vous:**
   - Email: `admin@fps.gouv.cd`
   - Password: `admin123`

✅ **Succès!** Vous êtes connecté avec votre propre base de données locale !

---

## 🔧 Commandes Utiles

```bash
# Démarrer MongoDB
docker-compose up -d

# Arrêter MongoDB
docker-compose down

# Voir les logs
docker logs fps_mongodb_dev

# Accéder au shell MongoDB
docker exec -it fps_mongodb_dev mongosh -u fps_admin -p fps_secure_2026

# Backup manuel
docker exec fps_mongodb_dev mongodump --uri="mongodb://fps_admin:fps_secure_2026@localhost:27017/fps_website?authSource=admin" --out=/backup

# Voir les données (volumes)
docker volume ls
```

---

## 🚀 Pour le VPS (Plus Tard)

**Exactement la même chose !**

1. Copier le même `docker-compose.yml` sur le VPS
2. `docker-compose up -d`
3. Changer `.env.production`:
   ```bash
   MONGODB_URI=mongodb://fps_admin:fps_secure_2026@localhost:27017/fps_website?authSource=admin
   ```

**Zéro différence !** 🎯

---

## ✅ Avantages de Cette Solution

| Aspect | Docker Local | Atlas Cloud |
|--------|--------------|-------------|
| **Services externes** | ❌ Aucun | ✅ MongoDB Inc. |
| **Contrôle** | ✅ Total | ⚠️ Limité |
| **Données** | ✅ Votre Mac | ⚠️ Cloud US |
| **Limite stockage** | ✅ Disque Mac | ⚠️ 512 MB |
| **Production ready** | ✅ Même config | ⚠️ Migration |
| **Coût** | €0 | €0 |
| **Setup** | 5 min | 5 min |

**→ Docker = Autonomie totale !**

---

## 💡 Architecture Finale

```
DEV (Votre Mac):
Next.js → MongoDB Docker (localhost:27017)

PROD (VPS fps.cd):
Next.js → MongoDB Docker (localhost:27017)
```

**Même code, même config, zéro service externe !** ✅

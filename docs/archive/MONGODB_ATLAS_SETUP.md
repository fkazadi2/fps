# 🚀 Configuration MongoDB Atlas - Guide Rapide (5 min)

**Pourquoi Atlas au lieu de local :**
- ❌ Installation locale échouée (macOS 13 trop ancien pour Homebrew)
- ✅ Atlas fonctionne immédiatement
- ✅ Déjà prêt pour production fps.cd
-✅ Gratuit à vie (M0)
- ✅ Backup automatique

---

## Étape 1: Créer Compte (2 min)

1. Allez sur https://www.mongodb.com/cloud/atlas/register
2. **Créez un compte** (Email + Mot de passe OU Google)
3. Remplissez le formulaire:
   - Prénom/Nom
   - Organisation: "FPS"
   - Projet: "fps-website"

## Étape 2: Créer Cluster Gratuit (1 min)

1. Après inscription, cliquez **"Build a Database"**
2. Sélectionnez **"M0 FREE"** (gratuit à vie)
3. Provider: **AWS**
4. Region: **Frankfurt (eu-central-1)** (proche de RDC)
5. Cluster Name: **"fps-cluster"**
6. Cliquez **"Create Cluster"**

⏰ Création: 1-3 minutes

## Étape 3: Créer Utilisateur Database (30 sec)

Pendant que le cluster se crée:

1. Aller dans **Security > Database Access**
2. Cliquez **"Add New Database User"**
3. **Username:** `fps_admin`
4. **Password:** Générez un mot de passe fort (NOTEZ-LE !)
   - Exemple: `CHANGE_ME_ATLAS`
5. Database User Privileges: **"Read and write to any database"**
6. Cliquez **"Add User"**

## Étape 4: Autoriser Accès Réseau (30 sec)

1. Aller dans **Security > Network Access**
2. Cliquez **"Add IP Address"**
3. Cliquez **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Pour dev seulement, on sécurisera en prod
4. Cliquez **"Confirm"**

## Étape 5: Obtenir Connection String (1 min)

1. Retournez à **Database** (menu gauche)
2. Cliquez **"Connect"** sur votre cluster
3. Choisissez **"Connect your application"**
4. Driver: **Node.js**
5. Version: **6.0 or later**
6. **Copiez la connection string**

Elle ressemble à:
```
mongodb+srv://fps_admin:<password>@fps-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

⚠️ **IMPORTANT:** Remplacez `<password>` par votre vrai mot de passe !

---

## Étape 6: Configurer .env.local

Ouvrez `/Users/mac/fps-website-2025/fps-website-20250707/.env.local`

**Remplacez la ligne MONGODB_URI:**

```bash
# AVANT (local - ne marche pas)
MONGODB_URI=mongodb://localhost:27017/fps_website

# APRÈS (Atlas - votre vraie connection string)
MONGODB_URI=mongodb+srv://fps_admin:CHANGE_ME_ATLAS@fps-cluster.xxxxx.mongodb.net/fps_website?retryWrites=true&w=majority
```

⚠️ **Changez:**
- `CHANGE_ME_ATLAS` → Votre vrai mot de passe
- `xxxxx` → Votre vrai ID cluster

**Exemple complet:**
```bash
MONGODB_URI=mongodb+srv://fps_admin:CHANGE_ME_ATLAS@fps-cluster.a1b2c.mongodb.net/fps_website?retryWrites=true&w=majority
```

---

## Étape 7: Tester la Connexion

Maintenant on teste !

```bash
npm run create-admin
```

**Résultat attendu :**
```
🔄 Connexion à MongoDB...
✅ MongoDB connecté avec succès
📦 Database: fps_website
✅ Utilisateur admin créé avec succès!
📧 Email: admin@fps.gouv.cd
🔑 Password: admin123
```

✅ **SI vous voyez ça = SUCCÈS !**

---

## Étape 8: Tester le Login

1. **Redémarrez Next.js:**
   ```bash
   # Ctrl+C puis
   npm run dev
   ```

2. **Allez sur:** http://localhost:3000/admin/auth/login

3. **Connectez-vous:**
   - Email: `admin@fps.gouv.cd`
   - Password: `admin123`

4. **Si ça marche:** Vous serez redirigé vers le dashboard ! 🎉

---

## ❌ Dépannage

### Erreur: "MONGODB_URI not defined"
- Vérifiez que `.env.local` existe
- Redémarrez `npm run dev`

### Erreur: "MongoServerError: bad auth"
- Mot de passe incorrect dans MONGODB_URI
- Vérifiez le mot de passe dans MongoDB Atlas
- Pas de caractères spéciaux non-encodés (%, @, etc.)

### Erreur: "Could not connect to any servers"
- Network Access pas configuré
- Allez dans Security > Network Access
- Ajoutez 0.0.0.0/0

### Erreur: "Cannot find module"
- `npm install` pour réinstaller dépendances

---

## ✅ Une Fois que Ça Marche

**Prochaines étapes (1-2h):**
1. ✅ MongoDB Atlas configuré
2. ✅ Admin créé et login fonctionne
3. ⏳ Adapter les autres composants admin
4. ⏳ Tester CRUD complet
5. ⏳ Tests multi-utilisateurs

**Appelez-moi quand vous avez fini la configuration Atlas !** 🚀

---

## 💡 Avantages Atlas vs Local

| Aspect | Local (échec) | Atlas |
|--------|---------------|-------|
| **Installation** | ❌ Échouée | ✅ 5 min |
| **Compatible** | ❌ macOS 13 | ✅ Tous OS |
| **Production** | ⚠️ Migration nécessaire | ✅ Déjà prêt |
| **Backup** | ❌ Manuel | ✅ Automatique |
| **Coût** | €0 | €0 (M0) |
| **Maintenance** | ⚠️ Vous | ✅ MongoDB |

**Résultat: Atlas est MIEUX pour votre cas !**

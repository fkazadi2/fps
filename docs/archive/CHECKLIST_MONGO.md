# 🚀 Checklist MongoDB Docker Local

## ✅ Déjà Fait
- [x] Docker installé (v27.5.1)
- [x] `docker-compose.yml` créé
- [x] `.env.local` configuré

## 🔄 À Faire Maintenant

### 1. Démarrer Docker Desktop (1 min)
- [ ] Ouvrir l'application Docker Desktop
- [ ] Attendre que l'icône soit verte (en haut)

### 2. Lancer MongoDB (1 commande)
```bash
docker-compose up -d
```

Résultat attendu:
```
✓ Container fps_mongodb_dev  Started
```

### 3. Vérifier MongoDB Tourne (1 commande)
```bash
docker ps
```

Vous devez voir:
```
CONTAINER ID   IMAGE       STATUS         PORTS                      NAMES
abc123...      mongo:7.0   Up 5 seconds   0.0.0.0:27017->27017/tcp   fps_mongodb_dev
```

### 4. Créer l'Utilisateur Admin (1 commande)
```bash
npm run create-admin
```

Résultat attendu:
```
✅ MongoDB connecté avec succès
✅ Utilisateur admin créé avec succès!
📧 Email: admin@fps.gouv.cd
🔑 Password: admin123
```

### 5. Tester le Login (1 min)

Allez sur: http://localhost:3000/admin/auth/login

Connectez-vous:
- Email: `admin@fps.gouv.cd`
- Password: `admin123`

✅ **Si ça marche:** Vous verrez le dashboard admin !

---

## 🎯 Ensuite (1-2h)

Une fois MongoDB configuré:
- [ ] Adapter les autres composants admin
- [ ] Tester CRUD pages complet
- [ ] Tester multi-utilisateurs (2 navigateurs)

**Total: CMS 100% fonctionnel !**

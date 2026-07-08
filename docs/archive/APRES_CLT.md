# Étapes Après Installation MongoDB

Une fois que les Command Line Tools sont installés, suivez ces étapes:

## 1. Réinstaller MongoDB (1 commande)

```bash
brew install mongodb-community@7.0
```

Cette fois ça devrait marcher car les CLT seront installés.

## 2. Démarrer MongoDB (1 commande)

```bash
brew services start mongodb-community@7.0
```

## 3. Vérifier que MongoDB tourne

```bash
brew services list | grep mongodb
```

Vous devriez voir:
```
mongodb-community@7.0  started
```

## 4. Créer l'utilisateur admin (1 commande)

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
⚠️  IMPORTANT: Changez ce mot de passe en production!
```

## 5. Redémarrer le serveur Next.js

```bash
# Ctrl+C pour arrêter npm run dev
npm run dev
```

## 6. Tester le login

Allez sur: http://localhost:3000/admin/auth/login

**Identifiants:**
- Email: `admin@fps.gouv.cd`
- Password: `admin123`

Si ça marche, vous serez redirigé vers `/admin/dashboard` ! ✅

## 7. Si ça ne marche pas

**Vérifier MongoDB:**
```bash
mongosh
```

Si vous entrez dans le shell MongoDB, c'est que ça marche.

**Vérifier les logs:**
```bash
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

## 8. Prochaines Étapes

Une fois MongoDB fonctionnel, je vais:
- ✅ Adapter tous les composants admin
- ✅ Tester CRUD complet
- ✅ Tester multi-utilisateurs
- ✅ Migration données localStorage → MongoDB

**Temps restant: 2-3 heures max** 🚀

---

**Appelez-moi dès que les CLT sont installés et je continue !**

# Guide d'utilisation du CMS FPS en local

Ce guide vous explique comment configurer et utiliser le CMS du site FPS en environnement de développement local, sans dépendre de services externes comme Cloudinary ou MongoDB Atlas.

## Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) installé localement
- Avoir cloné le repo et installé les dépendances avec `npm install`

## Démarrage rapide (méthode recommandée)

Pour démarrer rapidement avec le CMS en local, nous avons créé un script qui fait tout pour vous:

```bash
npm run dev:local
```

Ce script automatise les étapes suivantes:
1. Vérifie que MongoDB est installé
2. Configure le projet (crée `.env.local` et les dossiers nécessaires)
3. Démarre MongoDB si ce n'est pas déjà fait
4. Lance le serveur de développement Next.js

## Configuration manuelle (alternative)

Si vous préférez configurer manuellement:

1. Installer les dépendances:
```bash
npm install
```

2. Configurer l'environnement local:
```bash
npm run setup-local
```

3. Démarrer MongoDB manuellement selon votre système d'exploitation

4. Démarrer le serveur de développement:
```bash
npm run dev
```

## Accès au CMS

Une fois le serveur démarré, le CMS est accessible à:
- http://localhost:3000/admin/login

### Identifiants de connexion

Lors de la première connexion, un compte administrateur sera créé automatiquement:
- Email: `admin@fps.gouv.cd`
- Mot de passe: `admin123`

**Important**: Pour des raisons de sécurité, changez ce mot de passe dès votre première connexion.

## Fonctionnalités disponibles en local

Toutes les fonctionnalités du CMS fonctionnent en local:

1. **Paramètres du site** - Gérer le favicon, le logo, le nom et la description du site
2. **Pages** - Gestion des pages statiques
3. **Actualités** - Gestion des articles d'actualités
4. **Événements** - Gestion des événements
5. **Médias** - Bibliothèque de médias (images, documents)
6. **Programmes** - Gestion des programmes du FPS
7. **Utilisateurs** - Gestion des utilisateurs administrateurs

## Architecture technique en local

### Stockage des images

En mode local, les images sont stockées dans le dossier `public/uploads` du projet:
- `favicons` - Pour les favicons
- `logos` - Pour les logos du site
- `general` - Pour les images ordinaires

### Base de données

Le CMS utilise MongoDB en local. La base de données est nommée `fps_database` et contient les collections suivantes:
- `users` - Comptes administrateurs
- `siteconfigs` - Configuration générale du site
- (Autres collections selon les besoins)

Vous pouvez gérer la base de données avec:
- [MongoDB Compass](https://www.mongodb.com/products/compass) (interface graphique)
- [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/) (ligne de commande)

## Déploiement en production

Pour le déploiement en production, il est recommandé d'utiliser des services comme:
- MongoDB Atlas pour la base de données
- Cloudinary pour le stockage d'images
- Vercel ou Netlify pour l'hébergement

Suivez les instructions dans le fichier `README_CMS.md` pour la configuration en production.

## Dépannage

Si vous rencontrez des problèmes:

1. **MongoDB n'est pas accessible**
   - Vérifiez que MongoDB est démarré (utilisez `systemctl status mongod` sur Linux ou `brew services list` sur macOS)

2. **Erreurs de connexion à la base de données**
   - Vérifiez le fichier `.env.local` et assurez-vous que l'URL de connexion est correcte
   - Assurez-vous que le port 27017 est disponible (port par défaut de MongoDB)

3. **Problèmes d'upload d'images**
   - Vérifiez que les dossiers dans `public/uploads` ont les bonnes permissions
   - Vérifiez que `USE_LOCAL_STORAGE=true` est défini dans `.env.local`

4. **Problèmes d'authentification**
   - Si vous ne pouvez pas vous connecter, supprimez la collection `users` dans MongoDB et redémarrez le serveur
   - La prochaine connexion créera automatiquement un nouvel utilisateur administrateur 
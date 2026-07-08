# Guide d'utilisation du CMS FPS avec localStorage

Ce guide explique comment utiliser le CMS du site FPS en mode localStorage, sans dépendance à MongoDB.

## Présentation

Cette version du CMS FPS utilise le localStorage du navigateur comme système de stockage de données, éliminant la nécessité d'avoir MongoDB installé. Cette approche est idéale pour :

- Le développement local rapide
- Les démonstrations du site
- Les environnements où l'installation d'une base de données n'est pas possible

## Démarrage rapide

1. Clonez le repository et installez les dépendances :
   ```bash
   git clone https://github.com/votre-organisation/fps-website.git
   cd fps-website
   npm install
   ```

2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

3. Accédez au site à l'adresse :
   ```
   http://localhost:3000
   ```

4. Accédez au CMS :
   ```
   http://localhost:3000/admin/login
   ```

5. Connectez-vous avec les identifiants par défaut :
   - Email : `admin@fps.gouv.cd`
   - Mot de passe : `admin123`

## Fonctionnalités disponibles

Toutes les fonctionnalités principales du CMS sont disponibles avec le stockage localStorage :

1. **Gestion des pages**
   - Création, édition et suppression de pages
   - Support complet des composants (texte, galerie, statistiques, etc.)
   - Pages À propos et leurs sous-pages

2. **Administration des utilisateurs**
   - Gestion des comptes utilisateurs
   - Modification des mots de passe

3. **Configuration du site**
   - Modification des informations du site (nom, description)
   - Gestion des logos et favicons

## Comment fonctionnent les données

Les données sont stockées dans le localStorage du navigateur sous forme de collections :

- `fps_cms_pages` : Toutes les pages du site
- `fps_cms_users` : Comptes utilisateurs
- `fps_cms_site_config` : Configuration générale du site
- `fps_cms_media` : Médiathèque (images, documents)

### Persistance des données

- Les données sont sauvegardées dans votre navigateur et persistent entre les sessions
- Chaque navigateur a son propre stockage, les données ne sont pas partagées entre navigateurs ou utilisateurs
- En cas de suppression des données de navigation, les données par défaut seront réinitialisées

## Personnalisation des données par défaut

Pour modifier les données par défaut chargées lors de l'initialisation :

1. Modifiez le fichier `src/lib/cms/page-service.ts` pour les pages
2. Modifiez le fichier `src/lib/cms/auth-service.ts` pour les utilisateurs
3. Modifiez le fichier `src/lib/cms/local-storage.ts` pour la configuration du site

## Limitations du localStorage

- **Capacité limitée** : 5-10 Mo selon les navigateurs
- **Stockage local** : Données limitées à un seul navigateur sur un seul appareil
- **Pas de requêtes complexes** : Pas de filtrage ou tri sophistiqué comme dans une base de données

## Passer à MongoDB

Si vous souhaitez ultérieurement utiliser MongoDB :

1. Assurez-vous d'avoir MongoDB installé et configuré
2. Modifiez le fichier `.env.local` pour définir `USE_LOCAL_STORAGE=false`
3. Définissez `MONGODB_URI` avec l'URL de connexion à votre base de données
4. Redémarrez l'application

## Exportation des données

Pour exporter les données du localStorage (pour sauvegarde ou migration vers MongoDB) :

1. Ouvrez la console de développement dans votre navigateur (F12)
2. Exécutez les commandes suivantes :

```javascript
// Exporter toutes les pages
const pages = JSON.parse(localStorage.getItem("fps_cms_pages"));
console.log(JSON.stringify(pages, null, 2));

// Exporter tous les utilisateurs
const users = JSON.parse(localStorage.getItem("fps_cms_users"));
console.log(JSON.stringify(users, null, 2));

// Exporter la configuration du site
const config = JSON.parse(localStorage.getItem("fps_cms_site_config"));
console.log(JSON.stringify(config, null, 2));
```

## Dépannage

### Réinitialiser les données

Si vous rencontrez des problèmes avec les données stockées, vous pouvez les réinitialiser :

1. Ouvrez la console de développement dans votre navigateur (F12)
2. Exécutez :
   ```javascript
   // Supprimer toutes les données du CMS
   Object.keys(localStorage).forEach(key => {
     if (key.startsWith('fps_cms_')) {
       localStorage.removeItem(key);
     }
   });
   // Rafraîchir la page pour réinitialiser les données par défaut
   location.reload();
   ```

### Pages non chargées

Si les pages ne s'affichent pas correctement :

1. Vérifiez que le script d'initialisation fonctionne correctement
2. Inspectez le contenu du localStorage dans les outils de développement du navigateur
3. Consultez la console pour les erreurs éventuelles

---

Pour toute question ou problème, veuillez contacter l'équipe de développement du site FPS. 
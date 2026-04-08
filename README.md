# FPS Website (Version localStorage)

Site web du Fonds de Promotion de la Santé (FPS) de la République Démocratique du Congo, avec un CMS intégré utilisant localStorage pour le stockage des données (sans base de données requise).

## Caractéristiques

- Site web informatif avec pages dynamiques
- Système de gestion de contenu (CMS) intégré
- Stockage des données dans le localStorage du navigateur (pas de MongoDB requis)
- Authentification simplifiée
- Interface d'administration complète

## Technologies

- [Next.js 15.3](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- LocalStorage pour le stockage de données côté client
- TypeScript pour le typage statique

## Démarrage rapide

1. Cloner ce dépôt :
```bash
git clone https://github.com/votre-organisation/fps-website.git
cd fps-website
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Démarrer le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Accès au CMS

Accédez à l'interface d'administration via :
[http://localhost:3000/admin/auth/login](http://localhost:3000/admin/auth/login)

**Identifiants par défaut** :
- Email : `admin@fps.gouv.cd`
- Mot de passe : `admin123`

## Stockage des données avec localStorage

Cette version du site utilise localStorage pour le stockage des données, ce qui présente plusieurs avantages :

- **Pas de base de données requise** : Aucune installation ou configuration de MongoDB nécessaire
- **Déploiement simplifié** : Fonctionne sur n'importe quel hébergement statique
- **Développement facilité** : Parfait pour les environnements de test et de développement

Pour plus d'informations sur l'utilisation du localStorage, consultez :
- [Guide d'utilisation du CMS avec localStorage](./README_LOCALSTORAGE_CMS.md)
- [Documentation de migration MongoDB vers localStorage](./MIGRATION_MONGODB_LOCALSTORAGE.md)

## Structure du projet

```
fps-website/
├── public/              # Fichiers statiques (images, etc.)
├── src/
│   ├── app/             # Routes Next.js App Router
│   │   ├── admin/       # Interface d'administration
│   │   ├── api/         # API routes
│   │   └── [...]/       # Pages du site public
│   ├── components/      # Composants React réutilisables
│   ├── lib/             # Utilitaires et services
│   │   └── cms/         # Services de gestion de contenu avec localStorage
│   └── styles/          # Styles globaux
└── package.json         # Dépendances et scripts
```

## Fonctionnalités du CMS

- Gestion des pages du site (création, modification, suppression)
- Édition de composants dynamiques (texte, images, statistiques, etc.)
- Gestion des utilisateurs administrateurs
- Configuration du site (nom, logo, informations de contact)
- Stockage persistant entre les sessions (localStorage)

## Limitations de localStorage

- Stockage limité à 5-10 Mo selon les navigateurs
- Données stockées localement sur chaque appareil (pas de synchronisation)
- Pour un usage en production avec beaucoup de données, considérez revenir à MongoDB

## Contribution

Les contributions à ce projet sont les bienvenues. N'hésitez pas à soumettre des pull requests.

## Licence

Ce projet est sous licence [insérer le type de licence].

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

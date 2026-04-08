# Migration de MongoDB vers localStorage

Ce document décrit les modifications apportées pour remplacer MongoDB par localStorage comme système de stockage de données pour le CMS du site FPS.

## Résumé des changements

Nous avons implémenté un système complet de stockage côté client en utilisant le localStorage du navigateur comme alternative à MongoDB. Cette approche permet d'utiliser le CMS sans dépendance à une base de données externe, simplifiant le déploiement et le développement.

## Nouveaux composants

### 1. Service de stockage localStorage (`/src/lib/cms/local-storage.ts`)

Ce service fournit une API complète pour interagir avec localStorage :
- Gestion de collections (pages, utilisateurs, configuration du site)
- Opérations CRUD (création, lecture, mise à jour, suppression)
- Gestion des données structurées avec typage TypeScript

### 2. Service de gestion des pages (`/src/lib/cms/page-service.ts`)

Ce service gère les pages du site en utilisant localStorage :
- Initialisation de pages par défaut
- Recherche par slug ou ID
- Opérations CRUD sur les pages
- Données prédéfinies pour les pages "À propos" et leurs sous-pages

### 3. Service d'authentification (`/src/lib/cms/auth-service.ts`)

Remplace l'authentification basée sur MongoDB :
- Gestion des utilisateurs dans localStorage
- Création d'un utilisateur admin par défaut
- Vérification des identifiants
- Opérations sur les comptes utilisateurs

### 4. Point d'entrée central (`/src/lib/cms/index.ts`)

Coordonne l'initialisation du CMS :
- Initialise le stockage localStorage
- Charge les données par défaut
- Exporte toutes les fonctions des services

## Modifications du rendu des pages

### Page dynamique par slug (`/src/app/[slug]/page.tsx`)

- Adaptée pour utiliser localStorage côté client
- Comportement hybride :
  - Côté serveur : utilise des données mockées
  - Côté client : utilise localStorage
- Préserve le rendu des sous-pages de la section "À propos"

### Layout principal (`/src/app/layout.tsx`)

- Ajout d'un script pour initialiser le CMS côté client
- Chargement des données dans localStorage au premier rendu

## Avantages de cette approche

1. **Développement simplifié**
   - Pas besoin d'installer/configurer MongoDB
   - Pas de connexion à une base de données externe

2. **Déploiement facilité**
   - Fonctionne sans infrastructure de base de données
   - Solution entièrement frontale

3. **Expérience utilisateur préservée**
   - Interface d'édition toujours opérationnelle
   - Même structure de données qu'avec MongoDB

4. **Persistance des données**
   - Les modifications sont sauvegardées entre les sessions de navigation
   - Données préchargées pour éviter un site vide

## Limitations

1. **Stockage limité**
   - Le localStorage est limité à environ 5-10 MB selon les navigateurs
   - Adapté principalement au développement et aux démos

2. **Synchronisation**
   - Les données restent locales à chaque navigateur
   - Pas de partage entre utilisateurs ou appareils

3. **Sécurité**
   - Les données sont stockées en clair dans le navigateur
   - À utiliser pour le développement, pas en production avec des données sensibles

## Utilisation

Pour utiliser le site avec localStorage :
1. Aucune configuration spéciale n'est nécessaire
2. Au premier chargement, les données par défaut sont automatiquement initialisées
3. L'accès au CMS se fait comme avant via `/admin/login`
4. Identifiants par défaut : admin@fps.gouv.cd / admin123

## Migration vers une base de données

Pour revenir à une solution avec base de données :
1. Développer des API pour exporter les données de localStorage
2. Importer ces données dans MongoDB ou autre base de données
3. Désactiver l'initialisation de localStorage et réactiver les services MongoDB

---

*Note: Cette implémentation est conçue comme une solution temporaire de développement et de démo, et non comme un remplacement permanent de MongoDB dans un environnement de production.* 
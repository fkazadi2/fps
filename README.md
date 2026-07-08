# FPS Website

Site web du Fonds de Promotion de la Sante (FPS) de la Republique Democratique du Congo.

Le projet est une application Next.js avec une interface publique, un espace d'administration, des contenus media, et une configuration MongoDB pour le developpement local via Docker.

## Technologies

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- MongoDB / Mongoose
- NextAuth
- Cloudinary
- Docker Compose pour MongoDB en local

## Demarrage local

1. Installer les dependances :

```bash
npm install
```

2. Creer les fichiers d'environnement locaux :

```bash
cp .env.local.example .env.local
cp .env.docker.example .env
```

3. Modifier les valeurs sensibles dans `.env.local` et `.env`.

4. Demarrer MongoDB avec Docker :

```bash
docker compose up -d
```

5. Lancer le site :

```bash
npm run dev
```

6. Ouvrir l'application :

[http://localhost:3000](http://localhost:3000)

## Scripts utiles

```bash
npm run dev        # serveur de developpement
npm run build      # build de production
npm run start      # serveur de production apres build
npm run lint       # verification ESLint
npm run typecheck  # verification TypeScript
```

## Docker

Le fichier `docker-compose.yml` lance uniquement MongoDB pour le developpement local. L'application Next.js continue de tourner avec Node.js sur la machine locale.

Variables Docker attendues dans `.env` :

```bash
MONGODB_PORT=27017
MONGO_INITDB_ROOT_USERNAME=fps_admin
MONGO_INITDB_ROOT_PASSWORD=change_me_locally
MONGO_INITDB_DATABASE=fps_website
```

L'URL MongoDB correspondante pour `.env.local` est :

```bash
MONGODB_URI=mongodb://fps_admin:change_me_locally@localhost:27017/fps_website?authSource=admin
```

## Variables d'environnement

Ne jamais publier `.env`, `.env.local`, ni les secrets de production. Les fichiers suivis par Git sont seulement des exemples :

- `.env.local.example`
- `.env.docker.example`

Variables principales :

- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Structure

```text
fps-website/
├── docker-compose.yml
├── public/
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── package.json
└── README.md
```

## Publication GitHub

Le depot cible est :

[https://github.com/fkazadi2/fps](https://github.com/fkazadi2/fps)

Avant publication :

```bash
npm run lint
npm run typecheck
npm run build
```

Puis publier via une branche dediee et une pull request.

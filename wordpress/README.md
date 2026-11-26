# WordPress du FPS (outil de saisie)

Le site fps.cd reste en Next.js ; il lit ses contenus dans ce WordPress quand `WORDPRESS_URL` est défini
(`WORDPRESS_URL=http://127.0.0.1:8081` dans `.env.local`). Sans cette ligne, ou si WordPress est injoignable,
le site affiche les contenus d'origine enregistrés dans le code.

Contenus gérés : actualités, événements, albums photo, offres d'emploi, appels d'offres, documents,
diapositives et annonces de l'accueil.

- `mu-plugins/` : types de contenu et API `/wp-json/fps/v1/...`
- `docker-compose.yml`, `php.ini` : conteneurs, écoute sur 127.0.0.1:8081 seulement
- `installer.sh` : première installation sur le serveur (dans `/opt/fps-wordpress`)
- `sauvegarder.sh` : sauvegarde nocturne

Accès à l'administration depuis un poste ayant un accès SSH :

    ssh -N -L 8081:127.0.0.1:8081 fps-mail

puis http://localhost:8081/wp-admin/ (fermer d'abord le WordPress local s'il occupe le port 8081).

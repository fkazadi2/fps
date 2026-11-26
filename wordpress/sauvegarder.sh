#!/usr/bin/env bash
# Sauvegarde nocturne de WordPress (base + médias + modules), 7 jours conservés.
# Le dossier est sous /mnt/maildata/backups : la copie hors serveur de 4 h l'emporte avec le reste.
set -euo pipefail
cd /opt/fps-wordpress
DEST=/mnt/maildata/backups/wordpress
JOUR="$DEST/wp-$(date +%F-%H%M)"
umask 077
mkdir -p "$JOUR"
docker compose exec -T db sh -c 'mariadb-dump --single-transaction -uroot -p"$MARIADB_ROOT_PASSWORD" wordpress' | gzip > "$JOUR/base.sql.gz"
tar -czf "$JOUR/contenus.tar.gz" wp-content/uploads wp-content/mu-plugins
cp docker-compose.yml php.ini .env "$JOUR/"
find "$DEST" -mindepth 1 -maxdepth 1 -type d -name 'wp-*' -mtime +7 -exec rm -rf {} +
echo "Sauvegarde WordPress : $JOUR"

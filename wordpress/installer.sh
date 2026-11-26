#!/usr/bin/env bash
# Installe WordPress sur le serveur, isolé de la messagerie. Ne touche ni à fps.cd ni à nginx.
# Usage : sudo bash installer.sh   (depuis le dossier du paquet : base.sql et uploads présents)
set -euo pipefail
SRC="$(cd "$(dirname "$0")" && pwd)"
DEST=/opt/fps-wordpress

[ "$(id -u)" = 0 ] || { echo "Lancez avec sudo."; exit 1; }
[ -f "$SRC/base.sql" ] && [ -d "$SRC/uploads" ] || { echo "Paquet incomplet (base.sql, uploads)."; exit 1; }
if [ -e "$DEST" ]; then echo "$DEST existe déjà : rien n'a été modifié."; exit 1; fi
if ss -ltn | grep -q '127.0.0.1:8081 '; then echo "Le port 8081 est occupé."; exit 1; fi

echo "1/5 Fichiers..."
install -d -m 755 "$DEST" "$DEST/wp-content" "$DEST/wp-content/mu-plugins"
install -m 644 "$SRC/docker-compose.yml" "$SRC/php.ini" "$DEST/"
install -m 750 "$SRC/sauvegarder.sh" "$DEST/"
install -m 644 "$SRC"/mu-plugins/*.php "$DEST/wp-content/mu-plugins/"
cp -R "$SRC/uploads" "$DEST/wp-content/"
( umask 077; printf 'DB_PASSWORD=%s\nDB_ROOT_PASSWORD=%s\n' "$(openssl rand -hex 24)" "$(openssl rand -hex 24)" > "$DEST/.env" )
chown -R 33:33 "$DEST/wp-content"

echo "2/5 Démarrage des conteneurs (téléchargement des images la première fois)..."
cd "$DEST"
docker compose up -d

echo "3/5 Import des contenus..."
docker compose exec -T db sh -c 'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" wordpress' < "$SRC/base.sql"

echo "4/5 Vérification..."
ok=0
for _ in $(seq 1 60); do
  if curl -fsS -m 10 http://127.0.0.1:8081/wp-json/fps/v1/articles >/dev/null 2>&1; then ok=1; break; fi
  sleep 2
done
[ "$ok" = 1 ] || { echo "L'API ne répond pas. Journal : docker compose logs --tail 40 wordpress"; exit 1; }
for liste in articles albums offres appels documents diapos annonces; do
  n=$(curl -fsS -m 30 "http://127.0.0.1:8081/wp-json/fps/v1/$liste" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))')
  echo "   $liste : $n"
done

echo "5/5 Sauvegarde nocturne (3 h 15)..."
echo '15 3 * * * root /opt/fps-wordpress/sauvegarder.sh >> /var/log/fps-wordpress-backup.log 2>&1' > /etc/cron.d/fps-wordpress-backup
"$DEST/sauvegarder.sh"
rm -f "$SRC/base.sql"
echo "=== WORDPRESS INSTALLÉ (accessible uniquement depuis le serveur, 127.0.0.1:8081)"

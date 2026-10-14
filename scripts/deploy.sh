#!/usr/bin/env bash
# Déploiement du site fps.cd sur le serveur (dépôt dans /var/www/fps, pm2 "fps").
#
#   bash scripts/deploy.sh          déploie la dernière version de main
#   bash scripts/deploy.sh --check  vérifications préalables seulement (ne change rien)
#
# Sauvegarde la version en ligne HORS du projet, compile, redémarre, teste le site
# et revient automatiquement à la version précédente si une étape échoue.
set -uo pipefail

APP_DIR=/var/www/fps
BACKUP_DIR="$HOME/fps-next.bak"   # hors du projet : Tailwind 4 analyse tout dossier non ignoré
PM2_NAME=fps
BASE_URL=http://127.0.0.1:3000
LOG=/tmp/fps-build.log

cd "$APP_DIR" || { echo "Dossier $APP_DIR introuvable."; exit 1; }

fail() { echo "ABANDON : $1 (rien n'a été modifié)"; exit 1; }

restore() {
  echo "!!! $1 : retour à la version précédente"
  rm -rf .next && cp -a "$BACKUP_DIR" .next && pm2 restart "$PM2_NAME" >/dev/null
  echo "Version précédente restaurée (build $(cat .next/BUILD_ID))."
  exit 1
}

http() { curl -s -o /dev/null -m 15 -w '%{http_code}' "$@"; }

# 1. Vérifications préalables
[ -f .next/BUILD_ID ] || fail "pas de version en ligne valide (.next/BUILD_ID absent)"
for d in .next?*; do
  [ -d "$d" ] && fail "le dossier $d est dans le projet : Tailwind l'analyserait. Déplacez-le hors de $APP_DIR"
done
[ -z "$(git status --porcelain -- src)" ] || fail "modifications locales dans src/ sur le serveur"
git fetch -q origin main || fail "impossible de joindre GitHub"
git merge-base --is-ancestor HEAD origin/main || fail "la branche locale a divergé de origin/main"

if [ "${1:-}" = "--check" ]; then
  echo "Vérifications OK. Version en ligne : $(git log --oneline -1 HEAD)"
  echo "À déployer : $(git log --oneline HEAD..origin/main | wc -l) commit(s)"
  exit 0
fi

# 2. Mise à jour du code
git merge -q --ff-only origin/main || fail "mise à jour du code impossible"
echo "Code : $(git log --oneline -1)"

# 3. Sauvegarde de la version en ligne, hors du projet
rm -rf "$BACKUP_DIR" && cp -a .next "$BACKUP_DIR" || fail "sauvegarde impossible"
echo "Sauvegarde : $BACKUP_DIR (build $(cat "$BACKUP_DIR/BUILD_ID"))"

# 4. Compilation
echo "Compilation (2 à 3 minutes)..."
npm run build > "$LOG" 2>&1 || { tail -30 "$LOG"; restore "compilation échouée (journal : $LOG)"; }

# 5. Redémarrage
pm2 restart "$PM2_NAME" >/dev/null || restore "redémarrage pm2 échoué"

# 6. Tests du site ; le moindre échec déclenche le retour arrière
for _ in $(seq 1 30); do [ "$(http "$BASE_URL/")" = 200 ] && break; sleep 1; done
[ "$(http "$BASE_URL/")" = 200 ] || restore "page d'accueil en erreur"
css=$(curl -s -m 15 "$BASE_URL/" | grep -oE '/_next/static/[^"]+\.css' | head -1)
[ -n "$css" ] && [ "$(http "$BASE_URL$css")" = 200 ] || restore "feuille de style en erreur"
[ "$(http "$BASE_URL/api/articles")" = 200 ] || restore "API articles en erreur"
[ "$(http -X PUT -H 'Content-Type: application/json' -d '{}' "$BASE_URL/api/navigation")" = 401 ] \
  || restore "API d'écriture non protégée"

echo "=== DÉPLOYÉ ET VÉRIFIÉ (build $(cat .next/BUILD_ID))"

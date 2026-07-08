#!/bin/bash

# Définir le nom du fichier zip
ZIP_NAME="fps-website-$(date +%Y%m%d).zip"

# Se positionner à la racine du projet
cd "$(dirname "$0")/.." || exit 1

# Créer le zip en excluant les dossiers et fichiers non nécessaires
zip -r "$ZIP_NAME" . \
    -x "node_modules/*" \
    -x ".git/*" \
    -x ".next/*" \
    -x "*.zip" \
    -x ".env*" \
    -x ".DS_Store" \
    -x "*.log"

echo "Archive créée: $ZIP_NAME" 
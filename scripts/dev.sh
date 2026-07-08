#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Démarrage du CMS FPS en mode développement ===${NC}"

# Vérifier si MongoDB est installé
if ! command -v mongod &> /dev/null; then
    echo -e "${RED}MongoDB n'est pas installé ou n'est pas dans votre PATH${NC}"
    echo -e "${YELLOW}Veuillez installer MongoDB:${NC}"
    echo "- Sur macOS: brew install mongodb-community"
    echo "- Sur Ubuntu: sudo apt install mongodb"
    echo "- Sur Windows: Téléchargez depuis https://www.mongodb.com/try/download/community"
    exit 1
fi

# Configuration du projet si nécessaire
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Configuration initiale du projet...${NC}"
    node scripts/setup-local.js
fi

# Vérifier si MongoDB est en cours d'exécution
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}MongoDB n'est pas en cours d'exécution. Tentative de démarrage...${NC}"
    
    # Essai de démarrage selon la plateforme
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start mongodb-community || mongod --config /usr/local/etc/mongod.conf --fork
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start mongod || sudo service mongod start
    else
        # Windows ou autre
        echo -e "${RED}Impossible de démarrer MongoDB automatiquement sur votre système${NC}"
        echo -e "${YELLOW}Veuillez démarrer MongoDB manuellement puis relancer ce script${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}MongoDB démarré avec succès${NC}"
else
    echo -e "${GREEN}MongoDB est déjà en cours d'exécution${NC}"
fi

# Démarrer le serveur Next.js
echo -e "${BLUE}Démarrage du serveur Next.js...${NC}"
echo -e "${YELLOW}Le CMS sera accessible à: http://localhost:3000/admin/login${NC}"
echo -e "${YELLOW}Identifiants: admin@fps.gouv.cd / admin123${NC}"

# Démarrer le serveur
npm run dev 
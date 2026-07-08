# 🖼️ OPTIMISATIONS IMAGES - FPS WEBSITE

**Date:** 23 Janvier 2026

## ✅ OPTIMISATIONS DÉJÀ EN PLACE

### 1. Configuration Next.js
- ✅ Formats optimisés activés: AVIF et WebP
- ✅ Tailles d'images responsive configurées
- ✅ Compression activée
- ✅ Cache TTL configuré (60 secondes)

### 2. Composant Image de Next.js
Tous les composants utilisent déjà `next/image` qui fournit automatiquement:
- ✅ Conversion automatique en WebP/AVIF
- ✅ Lazy loading par défaut (sauf si `priority={true}`)
- ✅ Responsive images avec srcset
- ✅ Optimisation de la taille
- ✅ Placeholder blur optionnel

## 📋 VÉRIFICATIONS À FAIRE

### Images avec priority={true} (chargement immédiat)
Ces images doivent être optimisées manuellement avant upload:
- Hero slider (première slide uniquement)
- Logo dans le header
- Images critiques au-dessus de la ligne de flottaison

### Images avec loading="lazy" (chargement différé)
Toutes les autres images sont automatiquement lazy-loaded:
- Galerie média
- Actualités
- Événements
- Partenaires
- Sections en bas de page

## 🔧 RECOMMANDATIONS POUR LE CLIENT

### Avant upload des images réelles:

1. **Compression des images:**
   - Utiliser un outil comme TinyPNG, ImageOptim, ou Squoosh
   - Cible: < 200KB par image pour web
   - Format: JPG pour photos, PNG pour logos avec transparence

2. **Dimensions recommandées:**
   - Hero slider: 1920x1080px (16:9)
   - Cartes actualités: 800x600px (4:3)
   - Galerie: 1200x800px (3:2)
   - Logos partenaires: 400x200px max

3. **Noms de fichiers:**
   - Utiliser des noms descriptifs: `projet-dotation-mbuji-mayi-2024.jpg`
   - Éviter les espaces et caractères spéciaux
   - Utiliser des tirets au lieu d'espaces

## 📊 PERFORMANCE ATTENDUE

Avec ces optimisations:
- **Temps de chargement initial:** < 2 secondes
- **LCP (Largest Contentful Paint):** < 2.5 secondes
- **CLS (Cumulative Layout Shift):** < 0.1
- **Taille totale des images:** Réduite de 60-80%

## 🚀 PROCHAINES ÉTAPES

1. Remplacer les images placeholder par les images réelles fournies par le client
2. Vérifier les Core Web Vitals après déploiement
3. Ajuster la qualité d'image si nécessaire (actuellement défaut Next.js)

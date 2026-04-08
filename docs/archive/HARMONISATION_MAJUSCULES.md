# 📝 HARMONISATION MAJUSCULES/MINUSCULES - FPS WEBSITE

**Date:** 23 Janvier 2026

## 📋 RÈGLES D'HARMONISATION

### ✅ MAJUSCULES (Toujours en majuscules)

1. **Acronymes et sigles:**
   - **DGE** (Directeur Général Exécutif)
   - **CA** (Conseil d'Administration)
   - **FPS** (Fonds de Promotion de la Santé)
   - **RDC** (République Démocratique du Congo)
   - **CSU** (Couverture Santé Universelle)
   - **OMS** (Organisation Mondiale de la Santé)
   - **UNICEF** (Fonds des Nations unies pour l'enfance)
   - **USAID** (United States Agency for International Development)

2. **Noms propres:**
   - Noms de personnes: **Marius MIKA NYEMBO**
   - Noms de lieux: **Mbuji-Mayi**, **Kasaï-Oriental**
   - Noms d'institutions: **Ministère de la Santé**

### ✅ MINUSCULES (Toujours en minuscules sauf début de phrase)

1. **Fonctions et titres:**
   - directeur général (quand utilisé comme nom commun)
   - conseil d'administration (quand utilisé comme nom commun)
   - zones de santé
   - établissement public
   - personnel de santé

2. **Termes génériques:**
   - projets de terrain
   - bénéficiaires
   - dotations
   - partenaires

## 🔍 EXEMPLES D'UTILISATION CORRECTE

### ✅ CORRECT:
- "Le **DGE** du FPS, Marius MIKA NYEMBO, préside le **CA**."
- "Le **directeur général** a présenté le rapport au **conseil d'administration**."
- "Le **FPS** œuvre pour la **CSU** en **RDC**."
- "Les **zones de santé** bénéficient des dotations du **FPS**."

### ❌ INCORRECT:
- "Le dge du fps préside le ca." (tout en minuscules)
- "Le Directeur Général préside le Conseil d'Administration." (majuscules inutiles)
- "Le Fps œuvre pour la Csu en Rdc." (majuscules partielles)

## 📊 AUDIT DES FICHIERS CLÉS

### Fichiers vérifiés et corrigés:
- ✅ `src/app/a-propos/mission/page.tsx` - Conforme
- ✅ `src/app/page.tsx` - Conforme
- ✅ `src/app/publications/page.tsx` - Conforme
- ✅ `src/app/contact/page.tsx` - Conforme
- ✅ `src/components/ui/HeroSlider.tsx` - Conforme

### Fichiers à vérifier manuellement:
- `src/app/contacts/**` - Pages contacts existantes
- `src/app/financement/page.tsx` - Vérifier mentions DGE/CA
- Tous les fichiers de contenu CMS

## 🎯 RÈGLES SPÉCIFIQUES PAR CONTEXTE

### Dans les titres et en-têtes:
- Utiliser la casse appropriée selon les règles ci-dessus
- Les titres peuvent avoir des majuscules pour l'emphase, mais respecter les acronymes

### Dans les textes de contenu:
- Toujours respecter les règles d'acronymes (DGE, CA, FPS, RDC, CSU)
- Utiliser minuscules pour les termes génériques

### Dans les formulaires et labels:
- Respecter les règles standard
- Les labels peuvent utiliser la casse appropriée pour la lisibilité

## ✅ CHECKLIST DE VALIDATION

Avant publication, vérifier:
- [ ] Tous les acronymes (DGE, CA, FPS, RDC, CSU) sont en majuscules
- [ ] Les termes génériques (directeur général, conseil d'administration) sont en minuscules
- [ ] Les noms propres sont correctement capitalisés
- [ ] Cohérence dans tous les fichiers du site

## 🔧 OUTILS DE VÉRIFICATION

Pour vérifier automatiquement:
```bash
# Rechercher les occurrences potentielles
grep -r "directeur général\|conseil d'administration\|DGE\|CA" src/ --ignore-case
```

## 📝 NOTES IMPORTANTES

- Cette harmonisation doit être appliquée lors de la création de nouveaux contenus
- Les contenus existants dans le CMS doivent être vérifiés manuellement
- Former l'équipe éditoriale sur ces règles pour maintenir la cohérence

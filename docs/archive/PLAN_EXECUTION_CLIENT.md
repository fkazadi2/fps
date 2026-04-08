# 📋 PLAN D'EXÉCUTION - AMÉLIORATIONS SITE FPS
**Date:** 23 Janvier 2026  
**Client:** Fonds de Promotion de la Santé (FPS)

---

## 🎯 OBJECTIF GLOBAL
Transformer le site pour refléter un établissement public transparent, engagé et ancré sur le terrain, avec des contenus enrichis, des visuels réels et une meilleure accessibilité.

---

## 📦 PHASE 1: DESIGN VISUEL & CONTENU HOMEPAGE (Priorité HAUTE)

### 1.1 Hero Section - Bannière dynamique avec slogan ⚠️ AJUSTEMENT TRANSVERSAL
**Fichiers:** 
- `src/components/ui/HeroSlider.tsx`
- `src/components/ui/NewsHighlights.tsx`
- `src/components/ui/MediaGallery.tsx`
- `src/components/ui/EventsSection.tsx`
- `src/components/ui/PartnersSection.tsx`
- Toutes les pages de programmes

**Actions:**
- ✅ Ajouter un slogan institutionnel visible sur chaque slide
- ✅ **PLAN TRANSVERSAL:** Remplacer images génériques par placeholders photos réelles dans TOUTES les sections:
  - Hero slider
  - Actualités (NewsHighlights)
  - Galerie média
  - Événements
  - Partenaires
  - Pages programmes
- ✅ Ajouter une zone d'upload pour images réelles dans l'admin
- ✅ Créer système de gestion d'images avec catégories (terrain, équipes, bénéficiaires, projets)

**Slogan proposé:** "Une RDC où la santé est financée de manière durable et équitable pour tous"

### 1.2 Section Mission - Enrichissement complet ⚠️ AJUSTEMENTS DÉTAILLÉS
**Fichiers:** 
- `src/app/page.tsx` (section homepage)
- `src/app/a-propos/mission/page.tsx` (page dédiée)

**Actions OBLIGATOIRES:**
1. **Ajouter le cadre légal COMPLET:**
   - Décret n°22/15 du 09 avril 2022 (texte complet du décret)
   - **Tutelle ministérielle** (nommer explicitement le ministère de tutelle)
   - Cadre juridique de référence

2. **Restructurer avec le texte client EXACT:**
   ```
   Vision: Une RDC où la santé est financée de manière durable et équitable pour tous.
   
   Mission: Mobiliser, gérer et promouvoir efficacement les ressources pour la santé publique, 
   conformément au Décret n°22/15 du 09 avril 2022.
   
   Axes stratégiques (nommés explicitement comme demandé):
   1. Mobilisation des ressources internes et externes
   2. Soutien aux zones de santé pour l'accès aux soins
   3. Promotion des comportements sains et de la prévention
   4. Partenariat et plaidoyer avec les acteurs du secteur santé
   ```

3. **Ajouter section "Impact chiffré" OBLIGATOIRE:**
   - Projets phares avec résultats chiffrés (OBLIGATOIRE, pas optionnel)
   - Témoignages de bénéficiaires
   - Photos réelles de terrain
   - Métriques de performance (personnes couvertes, zones de santé soutenues, etc.)

4. **Harmoniser majuscules/minuscules (AUDIT GLOBAL):**
   - **MAJUSCULES:** DGE, CA, FPS, RDC, CSU (partout dans le site)
   - **Minuscules:** directeur général, conseil d'administration, zones de santé
   - **Action:** Audit complet de TOUTES les pages + correction systématique

### 1.3 Ajouter des CTA (Call-To-Action) clairs
**Fichier:** `src/app/page.tsx`  
**Actions:**
- ✅ Ajouter bouton "Contactez-nous" dans hero section
- ✅ Ajouter bouton "Télécharger un rapport" dans section Publications
- ✅ Ajouter bouton "Faire un don" (si applicable) dans section Financement
- ✅ Ajouter CTA dans section Mission vers page détaillée

---

## 📦 PHASE 2: PUBLICATIONS - Restructuration complète (Priorité HAUTE)

### 2.1 Page Publications principale
**Fichier:** `src/app/publications/page.tsx`  
**Actions:**
1. **Organiser par catégories:**
   - Rapports annuels de performance
   - Documents de gouvernance (statuts, règlements, plan stratégique)
   - Bulletins/Infolettres
   - Appels d'offres
   - Offres d'emploi

2. **Mettre en avant les 3 dernières publications:**
   - Section "Publications récentes" en haut de page
   - Design avec badges "Nouveau" ou "Récent"
   - Tri automatique par date décroissante

3. **Ajouter section "Voix du terrain":**
   - Témoignages de bénéficiaires
   - Reportages photo/vidéo des activités
   - Équipes FPS en action dans zones rurales
   - Activités de sensibilisation

4. **Ajouter section "Résultats tangibles":**
   - Dotations réalisées (chiffres, photos)
   - Projets financés avec impact
   - Statistiques de performance

### 2.2 Page Rapports & Documentations
**Fichier:** `src/app/publications/rapports-documentations/page.tsx`  
**Actions:**
- ✅ Améliorer le filtrage par type de document
- ✅ Ajouter recherche par mots-clés
- ✅ Améliorer l'affichage des métadonnées (date, taille, téléchargements)
- ✅ Ajouter preview PDF si possible

---

## 📦 PHASE 3: PAGE CONTACT & RÉCLAMATIONS (Priorité MOYENNE)

### 3.1 Créer page Contact complète
**Fichier:** `src/app/contact/page.tsx` (NOUVEAU)  
**Actions:**
1. **Formulaire de contact en ligne:**
   - Champs: Nom, Email, Téléphone, Sujet, Message
   - Catégories: Question générale, Réclamation, Demande d'information, Partenariat
   - Validation et envoi par email

2. **Carte interactive:**
   - Intégrer Google Maps ou OpenStreetMap
   - Afficher adresse: Avenue Lumumba, Mbuji-Mayi
   - Marqueur avec infos de contact

3. **Informations de contact:**
   - Email: secretariat@fps.cd
   - Téléphone: +243 999 999 999
   - Adresse physique
   - Horaires: Lun-Ven 8h-16h

4. **Liens sociaux (si applicable):**
   - WhatsApp (bouton flottant)
   - Facebook, Twitter, LinkedIn (si disponibles)

5. **Section "Réclamations":**
   - Formulaire dédié pour réclamations
   - Numéro de suivi automatique
   - Délai de traitement affiché

---

## 📦 PHASE 4: OPTIMISATION TECHNIQUE (Priorité MOYENNE)

### 4.1 Optimisation des images
**Actions:**
- ✅ Convertir toutes les images en WebP
- ✅ Ajouter lazy loading sur toutes les images
- ✅ Implémenter responsive images (srcset)
- ✅ Compresser les images existantes
- ✅ Ajouter dimensions explicites pour éviter CLS

**Fichiers à modifier:**
- Tous les composants utilisant `next/image`
- Configuration Next.js pour optimisation automatique

### 4.2 Performance
- ✅ Vérifier Core Web Vitals
- ✅ Optimiser les fonts (preload)
- ✅ Minifier CSS/JS
- ✅ Vérifier le cache des assets statiques

---

## 📦 PHASE 5: MODULE ACTUALITÉS - Mise à jour régulière (Priorité BASSE)

### 5.1 Améliorer section Actualités homepage ⚠️ SOURCE DE VÉRITÉ
**Fichier:** `src/components/ui/NewsHighlights.tsx`  
**Actions:**
- ✅ Ajouter badge "Nouveau" pour articles récents (< 7 jours)
- ✅ Améliorer le design des cartes avec photos réelles
- ✅ Ajouter filtres par catégorie
- ✅ Ajouter pagination si > 6 articles
- ✅ **Définir source de vérité:** CMS localStorage / API / Admin panel
- ✅ Créer routine d'édition régulière (documentation pour équipe)

### 5.2 Page Actualités complète
**Fichier:** `src/app/actualites/page.tsx`  
**Actions:**
- ✅ Liste complète avec pagination
- ✅ Filtres par catégorie et date
- ✅ Recherche par mots-clés
- ✅ Partage social sur chaque article

---

## 📦 PHASE 6: ACCESSIBILITÉ & UX (Priorité BASSE)

### 6.1 Accessibilité
- ✅ Ajouter attributs ARIA manquants
- ✅ Améliorer contraste des couleurs
- ✅ Ajouter navigation au clavier
- ✅ Ajouter skip links

### 6.2 UX
- ✅ Ajouter breadcrumbs sur toutes les pages
- ✅ Améliorer messages d'erreur formulaires
- ✅ Ajouter confirmations d'actions (téléchargements, envois)
- ✅ Améliorer messages de chargement

---

## 📊 ORDRE D'EXÉCUTION RECOMMANDÉ

### Sprint 1 (Semaine 1) - CRITIQUE
1. ✅ Phase 1.2: Enrichir section Mission (cadre légal, axes stratégiques)
2. ✅ Phase 1.3: Ajouter CTA clairs
3. ✅ Phase 2.1: Restructurer Publications

### Sprint 2 (Semaine 2) - IMPORTANT
4. ✅ Phase 1.1: Bannière dynamique avec slogan
5. ✅ Phase 2.2: Améliorer page Rapports
6. ✅ Phase 3.1: Créer page Contact complète

### Sprint 3 (Semaine 3) - AMÉLIORATION
7. ✅ Phase 4.1: Optimisation images
8. ✅ Phase 5.1: Améliorer Actualités
9. ✅ Phase 6.1: Accessibilité

---

## 📝 NOTES IMPORTANTES

### Contenu à fournir par le client:
- [ ] Photos réelles de projets de terrain
- [ ] Photos d'équipes FPS en action
- [ ] Témoignages de bénéficiaires
- [ ] Rapports annuels récents (PDF)
- [ ] Documents de gouvernance (statuts, règlements)
- [ ] Coordonnées exactes (adresse, téléphone, email)
- [ ] Liens réseaux sociaux (si disponibles)
- [ ] Exemples concrets de projets phares avec résultats chiffrés

### Harmonisation texte (AUDIT GLOBAL OBLIGATOIRE):
- **MAJUSCULES:** DGE, CA, FPS, RDC, CSU (à vérifier sur TOUTES les pages)
- **Minuscules:** directeur général, conseil d'administration, zones de santé
- **Action:** Créer script de vérification + correction manuelle si nécessaire
- **Fichiers à auditer:** Tous les fichiers `.tsx`, `.ts`, `.md` du projet

### Priorités client:
1. **Mission:** Plus détaillée, structurée, avec cadre légal et impact chiffré
2. **Publications:** Organisées par type, récentes mises en avant, téléchargement clair
3. **Contact:** Formulaire en ligne, carte interactive, réclamations

---

## ✅ CHECKLIST FINALE

- [ ] Section Mission enrichie avec cadre légal et axes stratégiques
- [ ] Publications organisées par type avec 3 dernières mises en avant
- [ ] Page Contact créée avec formulaire et carte interactive
- [ ] CTA ajoutés sur toutes les sections clés
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Slogan ajouté dans hero section
- [ ] Harmonisation majuscules/minuscules effectuée
- [ ] Section "Voix du terrain" ajoutée dans Publications
- [ ] Section "Résultats tangibles" ajoutée
- [ ] Formulaire de réclamations créé
- [ ] Performance vérifiée et optimisée

---

**Prêt à démarrer l'implémentation?** 🚀

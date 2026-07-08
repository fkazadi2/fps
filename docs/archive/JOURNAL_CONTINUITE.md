# 📓 Journal de Continuité — Site FPS (fps-website-20250707)

> Maintenu automatiquement à chaque session. Dernière mise à jour : **2026-02-25 09:20**

---

## 🎯 Objectif Global du Projet

Migrer l'intégralité des données mock/codées en dur + localStorage vers **MongoDB** pour obtenir un CMS admin entièrement opérationnel, sans dépendance frontend au stockage navigateur.

**Stack :** Next.js 14 (App Router) · MongoDB 7.0 (Docker local) · Mongoose · React Query · TypeScript

---

## ✅ Sessions Précédentes — Ce qui est Terminé

### Infrastructure Backend
- [x] MongoDB Docker opérationnel (`fps_mongodb_dev` sur port 27017)
- [x] `src/lib/mongodb.ts` — connexion Mongoose avec cache global
- [x] Modèles Mongoose créés : `Article`, `Page`, `User`, `HomepageSection`, `NavigationMenu`
- [x] APIs RESTful créées :
  - `GET/POST /api/articles` — liste + création
  - `GET/PUT/DELETE /api/articles/[id]` — CRUD complet
  - `GET/POST /api/pages` — liste + création
  - `GET/PUT/DELETE /api/pages/[id]` — CRUD complet
  - `GET/PUT /api/homepage` — sections homepage
  - `GET/PUT /api/navigation` — menus header/footer
- [x] Utilisateur admin créé en DB : `admin@fps.gouv.cd` / `admin123`

### Frontend Public
- [x] `src/app/page.tsx` — lecture directe DB (plus de fetch interne vers /api/homepage)
- [x] `src/app/actualites/page.tsx` — Server Component lisant MongoDB (ISR 10min)
- [x] `src/app/actualites/[slug]/page.tsx` — page de détail article  
- [x] `src/app/centre-presse/presse/page.tsx` — migré vers MongoDB
- [x] `src/app/centre-presse/evenements/page.tsx` — migré vers MongoDB
- [x] `src/lib/data/articles.ts` — `getArticles()` avec computed fields (formattedDate, dayBadge, monthBadge)

### Données Restaurées
- [x] 6 articles de test ensemencés dans MongoDB (3 communiqués + 3 événements)

### Admin (partiel)
- [x] `/admin/posts/page.tsx` — utilise `useArticles()` hook React Query ✅
- [x] `/admin/posts/new` — formulaire création article ✅ (à vérifier)
- [x] `/admin/posts/edit/[id]` — formulaire édition ✅ (à vérifier)

---

## 🔴 Ce qui Reste à Faire (Priorité Décroissante)

### PRIORITÉ 1 — Migration des vrais articles FPS ✅ TERMINÉ
- [x] Migrer les **3 vrais articles FPS** vers MongoDB
- [x] Corriger `[articleId]/page.tsx` → Server Component MongoDB

### PRIORITÉ 2 — Admin fonctionnel complet
- [x] `/admin/posts/` — useArticles() React Query ✅
- [x] `/admin/posts/new` — useCreateArticle() ✅
- [x] `/admin/posts/edit/[id]` — useUpdateArticle() ✅
- [x] `/admin/pages/` — usePagesManager() ✅
- [x] `/admin/pages/new` — useCreatePage() ✅
- [x] `/admin/pages/edit/[id]` — useUpdatePage() ✅ (corrigé signature)
- [x] `/admin/dashboard` — statistiques depuis MongoDB ✅

### PRIORITÉ 3 — Nettoyage du localStorage
- [x] `newsService.ts` — plus importé nulle part dans /app ✅
- [x] `galerie/[albumId]` — plus de photoAlbumService ✅
- [ ] Supprimer physiquement `src/lib/services/newsService.ts` et `photoAlbumService.ts` (optionnel)
- [ ] Supprimer ou archiver `src/lib/cms/` (localStorage CMS — plus utilisé dans les pages)

### PRIORITÉ 4 — Sécurité & Production
- [ ] Middleware de protection des routes `/admin/*` (vérification JWT/session)
- [ ] Sécuriser les routes API POST/PUT/DELETE
- [ ] `npm run build` sans erreurs

---

## ⚡ Prochaine Action Immédiate

**Middleware auth** pour protéger `/admin/*` + sécuriser APIs POST/PUT/DELETE.
Optionnellement : supprimer physiquement les fichiers localStorage devenus orphelins.

---

## 🚫 Blocages / Risques

| Blocage | Statut | Solution |
|---------|--------|----------|
| `ts-node` ne charge pas `.env.local` automatiquement | Actif | Passer `MONGODB_URI=...` en préfixe de commande |
| `newsService.ts` encore importé dans `[articleId]/page.tsx` | Actif | Supprimer après migration des articles |
| Images des articles stockées en local `/public/images/` | Aucun risque | Conserver les paths, compatibles avec `<Image>` |
| Bug dans `posts/page.tsx` ligne 118 : `filteredUsers` au lieu de `filteredPosts` | Bug TypeScript | À corriger |

---

## 🏗️ Décisions Techniques

| Décision | Valeur choisie | Justification |
|----------|---------------|---------------|
| Catégorie articles | `communique` / `evenement` | Convention établie, utilisée par getArticles() |
| Lien article detail | `/actualites/[slug]` | URL principale pour tous les articles |
| Lien ancien (compatibilité) | `/centre-presse/presse/[articleId]` | À migrer vers /actualites/[slug] |
| ISR accueil | `revalidate = 60 secondes` | Équilibre fraîcheur/perf |
| ISR actualités | `revalidate = 600 secondes` | Articles moins fréquents |
| `page.tsx` | Accès direct DB (Mongoose) | Plus stable que fetch(/api/homepage) |
| Computed fields | Calculés dans `getArticles()` | Simplifie le frontend |

---

## 📁 Fichiers Principaux Concernés

```
src/
├── app/
│   ├── page.tsx                          ✅ DB directe
│   ├── [slug]/page.tsx                   ❓ À vérifier
│   ├── actualites/
│   │   ├── page.tsx                      ✅ DB
│   │   └── [slug]/page.tsx               ✅ DB
│   ├── centre-presse/
│   │   ├── presse/
│   │   │   ├── page.tsx                  ✅ DB
│   │   │   └── [articleId]/page.tsx      ❌ localStorage + fallback hardcodé
│   │   └── evenements/page.tsx           ✅ DB
│   ├── admin/
│   │   ├── posts/page.tsx                ✅ useArticles()
│   │   ├── posts/new/page.tsx            ❓ À vérifier
│   │   ├── posts/edit/[id]/page.tsx      ❓ À vérifier
│   │   ├── pages/                        ❓ Probablement localStorage
│   │   └── dashboard/page.tsx            ❓ Probablement mock
│   └── api/
│       ├── articles/route.ts             ✅
│       ├── articles/[id]/route.ts        ✅
│       ├── pages/route.ts                ✅
│       └── homepage/route.ts             ✅
├── lib/
│   ├── data/articles.ts                  ✅ getArticles() avec computed fields
│   ├── hooks/useArticles.ts              ✅ React Query
│   ├── models/Article.ts                 ✅
│   ├── models/Page.ts                    ✅
│   └── services/newsService.ts           ❌ localStorage — à supprimer
└── scripts/
    ├── reseed-articles.ts                ✅ 6 articles de test
    └── migrate-to-mongodb.ts             ⚠️ Template vide (à compléter)
```

---

## 📊 État d'avancement

| Domaine | Avancement |
|---------|-----------|
| Infrastructure MongoDB | `████████████` 100% |
| APIs Backend | `████████████` 100% |
| Frontend Public | `██████████░░` 85% |
| Admin CMS | `████████████` 100% |
| Migration données réelles | `████████████` 100% |
| Nettoyage localStorage | `████████░░░░` 70% |
| Sécurité/Production | `██░░░░░░░░░░` 15% |

---

*Journal auto-maintenu — Ne pas effacer manuellement*

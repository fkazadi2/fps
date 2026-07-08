# 🎯 Nouveau Design Header & Navigation FPS

## Vue d'ensemble

Un **header moderne et professionnel** avec **mega menus** incluant des placeholders d'images pour une navigation intuitive et attrayante.

---

## 🎨 Structure du Header

### 1️⃣ **Bande Supérieure** (Topbar)

#### Design
- Fond: `gradient-to-r from-white via-gray-50 to-white`
- Bordure inférieure: 2px jaune (`border-[var(--accent)]`)
- Hauteur: `py-4` (16px)

#### Éléments

**Logo FPS**:
```
┌─────────────────────────────────────┐
│ [Logo FPS]  Fonds de Promotion...   │
│   (60px)    République Démocra...   │
└─────────────────────────────────────┘
```

**Effets**:
- Halo lumineux bleu au survol
- Logo avec ring blanc (4px)
- Scale 105% au survol
- Texte en dégradé bleu→rouge

**Coordonnées** (droite):
- Email avec icône dans boîte bleue
- Téléphone avec icône dans boîte verte
- Hover: fond coloré léger (blue-50, green-50)
- Icons scale 110% au survol

**Bouton Contacts**:
- Dégradé rouge: `from-[var(--danger)] to-red-600`
- Rounded-xl avec shadow-lg
- Emoji 📞 intégré
- Chevron animé (rotation 180°)
- Scale 105% au survol

---

### 2️⃣ **Bande de Navigation** (Navbar)

#### Design
- Fond: `gradient-to-r from-[var(--primary)] via-blue-700 to-[var(--secondary)]`
- Shadow: `shadow-lg`
- Padding: `px-4 py-3`

#### Menu Items

**Structure**:
```css
[Accueil] [Notre raison d'être ▼] [Plateau technique ▼] ...
   ━━━        ━━━━━━━━━━━━━━━
  (actif)         (hover)
```

**États**:
- Normal: Texte blanc, font-bold
- Hover: `bg-white/10` + `text-[var(--accent)]`
- Actif: `bg-white/10` + ligne dégradée en bas
- Chevron rotation: 0° → 180°

**Ligne indicateur actif**:
- Hauteur: 4px (`h-1`)
- Dégradé: `from-[var(--accent)] to-orange-400`
- Rounded top: `rounded-t-full`

---

### 3️⃣ **Mega Menus** ⭐ NOUVEAU

#### Structure Globale

```
┌─────────────────────────────────────────────────────────┐
│  [Titre Section]                                        │
│  Découvrez nos services et initiatives                  │
│─────────────────────────────────────────────────────────│
│  ┌──────────┐  [Nom]              ┌──────────┐  [Nom]  │
│  │ [IMAGE]  │  Description...     │ [IMAGE]  │  Desc.  │
│  │  [1]     │  Découvrir →        │  [2]     │  Déc.→  │
│  └──────────┘                     └──────────┘          │
│  ┌──────────┐  [Nom]              ┌──────────┐  [Nom]  │
│  │ [IMAGE]  │  Description...     │ [IMAGE]  │  Desc.  │
│  │  [3]     │  Découvrir →        │  [4]     │  Déc.→  │
│  └──────────┘                     └──────────┘          │
└─────────────────────────────────────────────────────────┘
```

#### Spécifications

**Container**:
- Largeur: `max-w-3xl` (768px)
- Position: Centré sous le menu
- Fond: Blanc
- Bordure: 2px jaune (`border-[var(--accent)]`)
- Shadow: `shadow-2xl`
- Rounded: `rounded-2xl`
- Animation: `slideDown` (0.3s)

**En-tête**:
- Titre: `text-xl font-bold text-[var(--primary)]`
- Sous-titre: `text-sm text-gray-600`
- Séparateur: `border-b-2 border-gray-100`

**Grille**:
- Layout: `grid-cols-2` (2 colonnes)
- Gap: `gap-4` (16px)

**Cartes des sous-menus**:

**Structure d'une carte**:
```
┌────────────────────────────────┐
│ ┌──────┐  Titre du sous-menu   │
│ │IMAGE │  En savoir plus...    │
│ │  1   │  Découvrir →           │
│ └──────┘                        │
└────────────────────────────────┘
```

**Placeholder Image**:
- Dimensions: `w-20 h-20` (80x80px)
- Dégradé: `from-[var(--primary)] to-[var(--danger)]`
- Icône: SVG photo blanc (opacity 50%)
- Badge numéro: Cercle blanc en haut à droite
- Hover: Scale 110%

**Contenu**:
- Titre: `font-bold` noir → bleu au survol
- Description: `text-xs text-gray-600` (2 lignes max)
- Lien "Découvrir": Apparaît au survol avec flèche animée

**Effets au Survol**:
1. Fond: Transparent → `from-blue-50 to-purple-50`
2. Bordure: Transparent → `border-[var(--accent)]` (2px)
3. Image: Scale 110%
4. Titre: Noir → Bleu
5. Lien: Opacity 0 → 100%
6. Flèche: Translation X +4px

---

### 4️⃣ **Dropdown Contacts**

#### Design
- Largeur: `w-64` (256px)
- Fond: Blanc
- Bordure: 2px jaune
- Rounded: `rounded-xl`
- Shadow: `shadow-2xl`

#### Items (3 options)

**Structure**:
```
┌────────────────────────────────┐
│ [📍] Nous visiter              │
│ [✉️] Nous écrire              │
│ [🗺️] Commissions provinciales FPS│
└────────────────────────────────┘
```

**Chaque item**:
- Icône: Boîte colorée (bleu, vert, violet)
- Texte: `font-semibold`
- Hover: Fond dégradé + icône change de couleur
- Transition: `transition-all`

**Couleurs par item**:
1. Nous visiter: Bleu (`from-blue-50 to-blue-100`)
2. Nous écrire: Vert (`from-green-50 to-green-100`)
3. Adresses: Violet (`from-purple-50 to-purple-100`)

---

### 5️⃣ **Menu Mobile** 📱

#### Design Général
- Fond: `gradient-to-br from-white via-gray-50 to-blue-50`
- Largeur: Full mobile, `sm:max-w-sm` (384px)
- Shadow: `shadow-2xl`
- Slide: De droite vers gauche

#### Header Mobile
```
┌────────────────────────────────┐
│ [Logo FPS]  FPS        [✕]     │
│             Menu               │
└────────────────────────────────┘
```

**Bouton fermer**:
- Dégradé rouge avec X blanc
- Rounded-xl
- Scale 110% au survol

#### Section Contacts (Mobile)

**Design**:
```
┌────────────────────────────────┐
│ [📞] Contacts            [▼]   │
└────────────────────────────────┘
  ├─ [📍] Nous visiter
  ├─ [✉️] Nous écrire
  └─ [🗺️] Nos adresses...
```

- Badge fond: `from-red-50 to-red-100`
- Bordure: `border-red-200` (2px)
- Sous-items: Cartes blanches avec icônes

#### Menu Items (Mobile)

**Avec sous-menu**:
```
┌────────────────────────────────┐
│ ● Notre raison d'être     [▼]  │
└────────────────────────────────┘
  ├─ [1] Notre histoire
  ├─ [2] Nos missions
  └─ [3] Organisation
```

**Sans sous-menu**:
```
┌────────────────────────────────┐
│ ● Accueil                      │
└────────────────────────────────┘
```

**États**:
- Normal: Fond blanc, bordure grise
- Actif: Dégradé bleu, texte blanc
- Sous-menu actif: Dégradé bleu, texte blanc

**Sous-items**:
- Badge numéro circulaire (1, 2, 3...)
- Fond blanc ou dégradé bleu si actif
- Animation `slideDown` à l'ouverture

---

## 🎨 Palette de Couleurs

### Dégradés du Header

```css
/* Topbar */
background: linear-gradient(to right, #ffffff, #f9fafb, #ffffff);

/* Navbar */
background: linear-gradient(to right, var(--primary), #1d4ed8, var(--secondary));

/* Bouton Contacts */
background: linear-gradient(to right, var(--danger), #dc2626);

/* Logo texte */
background: linear-gradient(to right, var(--primary), var(--danger));
background-clip: text;

/* Mega menu hover */
background: linear-gradient(to right, rgb(239 246 255), rgb(243 232 255));

/* Mobile fond */
background: linear-gradient(to bottom right, #ffffff, #f9fafb, rgb(239 246 255));
```

### Couleurs des Icônes

| Élément | Couleur |
|---------|---------|
| Email | Bleu (from-blue-500 to-blue-600) |
| Téléphone | Vert (from-green-500 to-green-600) |
| Nous visiter | Bleu (blue-600) |
| Nous écrire | Vert (green-600) |
| Adresses | Violet (purple-600) |

---

## 🎭 Animations

### 1. slideDown

```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Utilisé pour**:
- Mega menus
- Dropdown contacts
- Sous-menus mobiles

**Durée**: 0.3s ease-out

### 2. Rotation Chevron

```css
transform: rotate(0deg) → rotate(180deg)
transition: transform 0.3s
```

**Utilisé pour**:
- Indicateurs de dropdown
- Menus avec sous-menus

### 3. Scale & Hover

```css
/* Logo */
transform: scale(1) → scale(1.05)

/* Icônes coordonnées */
transform: scale(1) → scale(1.1)

/* Images mega menu */
transform: scale(1) → scale(1.1)

/* Boutons */
transform: scale(1) → scale(1.05)
```

**Durée**: 300ms

---

## 📱 Responsive Breakpoints

### Desktop (lg: 1024px+)
✅ Mega menus visibles  
✅ Coordonnées visibles  
✅ Navigation horizontale  
✅ Grille 2 colonnes dans mega menus  

### Tablette (md: 768px - 1024px)
✅ Coordonnées visibles  
⚠️ Menu mobile actif  
❌ Mega menus cachés  

### Mobile (< 768px)
❌ Coordonnées cachées  
✅ Menu hamburger  
✅ Menu slide-in  
✅ Navigation verticale  

---

## 🎯 Fonctionnalités Clés

### Mega Menus

**Ouverture**:
- Hover sur menu item
- Délai avant fermeture: 500ms
- Reste ouvert si souris dans le menu

**Fermeture**:
- Mouse leave du menu ET sous-menu
- Clic en dehors
- Clic sur un lien

**Annulation**:
- Clearance des timeouts
- Gestion propre de la mémoire

### Menu Mobile

**Ouverture**:
- Clic sur hamburger
- Animation slide depuis droite
- Overlay semi-transparent

**Navigation**:
- Accordion pour sous-menus
- Un seul sous-menu ouvert à la fois
- Animation smooth

**Fermeture**:
- Clic sur X
- Clic sur overlay
- Clic sur un lien

---

## 💡 Bonnes Pratiques Appliquées

### Accessibilité ♿

✅ **Aria-labels** sur tous les boutons  
✅ **Focus visible** sur navigation clavier  
✅ **Semantic HTML** (nav, header)  
✅ **Alt texts** sur images  
✅ **Sr-only** pour textes accessibles  

### Performance ⚡

✅ **Animations GPU** (transform, opacity)  
✅ **Lazy loading** images  
✅ **Debounce** sur hover  
✅ **useRef** pour timeouts stables  
✅ **Conditional rendering** mobile/desktop  

### UX 🎯

✅ **Délai hover** (500ms) pour UX fluide  
✅ **Feedback visuel** immédiat  
✅ **États actifs** clairs  
✅ **Indicateurs** de sous-menus  
✅ **Transitions** douces  

---

## 🔧 Personnalisation

### Modifier les Couleurs

```css
/* Header gradient */
from-[var(--primary)] via-blue-700 to-[var(--secondary)]

/* Remplacer par: */
from-[VOTRE_COULEUR] via-[VOTRE_COULEUR] to-[VOTRE_COULEUR]
```

### Ajouter un Item de Menu

```javascript
{
  name: "Nouveau Menu",
  href: "/nouveau-menu",
  submenu: [
    { name: "Sous-menu 1", href: "/nouveau-menu/sub1" },
    { name: "Sous-menu 2", href: "/nouveau-menu/sub2" },
  ],
}
```

### Modifier les Placeholders

Les placeholders actuels sont des dégradés avec icônes SVG.

Pour ajouter de vraies images:

```jsx
<Image
  src="/images/menu-items/[nom].jpg"
  alt={subItem.name}
  fill
  className="object-cover"
/>
```

---

## 📊 Comparaison Avant/Après

### Avant
- Header simple blanc
- Navigation bleue basique
- Dropdowns simples (liste)
- Pas d'images
- Menu mobile standard
- Peu d'animations

### Après
- Header avec dégradés ✨
- Navigation moderne avec gradients 🎨
- **Mega menus avec images** 🖼️
- Placeholders créatifs 🎨
- Menu mobile redesigné 📱
- 10+ animations fluides 🎭
- Feedback visuel partout 🎯
- Design institutionnel maintenu 🏛️

---

## 🎉 Résultat Final

### Ce qui rend ce header unique

🎨 **Créatif** - Mega menus avec images  
🏛️ **Institutionnel** - Professionnalisme préservé  
⚡ **Performant** - Animations optimisées  
♿ **Accessible** - WCAG conforme  
📱 **Responsive** - Parfait sur tous les écrans  
🎭 **Animé** - Interactions fluides  
🎯 **Intuitif** - Navigation claire  

---

## 🚀 Utilisation

```bash
# Le header est automatiquement utilisé dans MainLayout
# Aucune configuration nécessaire
npm run dev
```

Le header est **fixed** en haut de page avec `z-50` pour rester toujours visible.

---

**Développé avec passion pour le Fonds de Promotion de la Santé** 🇨🇩

*Design moderne et professionnel - Janvier 2026*

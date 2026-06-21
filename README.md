# 🛒 e-joutia

### Application Mobile de Petites Annonces — React Native & Expo

[![Expo](https://img.shields.io/badge/Expo-~54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Formik](https://img.shields.io/badge/Formik-2.4.6-2496ED?style=for-the-badge)](https://formik.org)

> **Projet de Développement Mobile**
> Réalisé par **Chaimae ZAKI** & **Alae JAAOUANI**

---

## 📋 Table des matières

1. [Présentation du projet](#-présentation-du-projet)
2. [Fonctionnalités](#-fonctionnalités)
3. [Architecture du projet](#️-architecture-du-projet)
4. [Modélisation](#-modélisation)
5. [Design System](#-design-system)
6. [Technologies & dépendances](#-technologies--dépendances)
7. [Statistiques du projet](#-statistiques-du-projet)
8. [Installation & lancement](#-installation--lancement)
9. [Validation des formulaires](#-validation-des-formulaires)
10. [Permissions natives](#-permissions-natives)
11. [Équipe](#-équipe)

---

## 🎯 Présentation du projet

**e-joutia** est une application mobile cross-platform (Android, iOS & Web) développée avec **React Native**, **Expo** et **TypeScript**, simulant une plateforme de petites annonces à la marocaine. L'utilisateur peut parcourir un catalogue d'objets, publier sa propre annonce avec photos (caméra ou galerie), remplir un formulaire validé en temps réel, puis consulter le résultat final dans une page de détail au style "marketplace premium".

### Objectifs pédagogiques

- Maîtriser la navigation **React Navigation** (Native Stack) et le passage de paramètres typés entre écrans
- Construire des **formulaires robustes** avec **Formik** + **Yup** (validation synchrone, messages d'erreur en français)
- Gérer l'**upload multi-photos** natif (caméra + galerie) avec `expo-image-picker` et construction d'un objet `FormData`
- Concevoir une **librairie de composants réutilisables** (Input, Button, CategoryPicker, ImagePicker)
- Appliquer un **design system** cohérent (couleurs, typographie, espacements) basé sur `lucide-react-native`

---

## ✨ Fonctionnalités

### 🏠 Accueil (`HomeScreen`)

- Barre de recherche + bouton de filtres (UI)
- Bandeau "Maroc" avec badge de localisation
- Bannière promotionnelle (hero) incitant à publier une annonce
- 4 catégories rapides illustrées par icônes colorées (Électronique, Vêtements, Maison, Livres)
- Grille de produits récents (2 colonnes) avec image, catégorie, titre, prix et localisation
- Bouton d'action flottant **"Créer une annonce"**

### 📝 Publication d'annonce (`PublishAdScreen`)

- Formulaire complet géré par **Formik**, validé par un schéma **Yup**
- Champs : titre, prix (DH), catégorie, état du produit, description détaillée
- Sélecteur de catégorie et d'état type **bottom-sheet** (modal natif)
- Composant photo dédié : prise via **caméra** ou import **galerie multi-sélection**
- Limite de **5 photos**, première photo marquée comme "Principale"
- Suppression individuelle d'une photo déjà ajoutée
- Demande de permissions caméra / galerie avec alertes explicites
- Construction d'un objet **FormData** (champs texte + fichiers images) prêt pour un envoi API
- Overlay de chargement animé pendant la "soumission" (simulation réseau de 2s)

### ✅ Confirmation (`SuccessScreen`)

- Écran de succès avec icône check animée
- Récapitulatif de l'annonce (titre en exergue, catégorie, prix, nombre de photos)
- Actions rapides : voir l'annonce publiée, retour à l'accueil, créer une nouvelle annonce

### 📄 Détail d'annonce (`AdDetailScreen`)

- Carrousel photo horizontal avec pagination et indicateur "x / y"
- Badges de statut ("En ligne"), catégorie et état (couleur dynamique selon l'état)
- Prix formaté en Dirhams (`fr-MA`)
- Tableau de spécifications (catégorie, état, prix, nombre de photos) avec icônes
- Actions : modifier l'annonce, retour à l'accueil

---

## 🏗️ Architecture du projet

```
e-joutia-mobile/
├── App.tsx                     # Point d'entrée — NavigationContainer + Stack
├── app.json                    # Configuration Expo (nom, icônes, permissions)
├── babel.config.js
├── tsconfig.json
├── package.json
└── src/
    ├── components/              # Composants UI réutilisables
    │   ├── Button.tsx           # Bouton (primary / secondary / danger) + loading state
    │   ├── Input.tsx            # Champ de texte avec label + gestion d'erreur
    │   ├── CategoryPicker.tsx   # Sélecteur modal (catégorie / état du produit)
    │   └── ImagePicker.tsx      # Upload photo (caméra + galerie, max 5, suppression)
    ├── screens/                  # Écrans de l'application
    │   ├── HomeScreen.tsx        # Accueil — catégories + annonces récentes
    │   ├── PublishAdScreen.tsx  # Formulaire de publication (Formik + Yup)
    │   ├── SuccessScreen.tsx    # Confirmation de publication
    │   └── AdDetailScreen.tsx   # Détail de l'annonce + carrousel photo
    ├── theme/
    │   └── colors.ts            # Palette de couleurs centralisée
    └── types/
        └── index.ts             # Types partagés (AdData, RootStackParamList)
```

---

## 📐 Modélisation

### Flux de navigation

```
                         App.tsx (Root)
              NavigationContainer + Native Stack
                            │
        ┌───────────────────┼────────────────────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
  ┌───────────┐      ┌──────────────┐      ┌────────────┐     ┌───────────────┐
  │HomeScreen │ ───▶ │PublishAdScreen│ ───▶│SuccessScreen│ ──▶│AdDetailScreen │
  │(Home)     │      │(Publish)      │     │(Success)    │    │(AdDetail)     │
  └───────────┘      └──────────────┘      └────────────┘     └───────────────┘
       ▲                                          │                    │
       └──────────────────────────────────────────┴────────────────────┘
                     retour Accueil / Nouvelle annonce
```

### Modèle de données (`AdData`)

```ts
AdData {
  title       : string   // Titre de l'annonce (max 50 caractères)
  description : string   // Description détaillée (min 10 caractères)
  price       : string   // Prix en Dirhams (DH)
  category    : string   // Électronique | Vêtements | Maison | Livres | Autre
  condition   : string   // Neuf | Comme neuf | Bon état | Correct
}
```

### Paramètres de navigation (`RootStackParamList`)

```ts
RootStackParamList {
  Home     : undefined
  Publish  : undefined
  Success  : { ad: AdData; images: string[] }
  AdDetail : { ad: AdData; images: string[] }
}
```

---

## 🎨 Design System

### Palette de couleurs (`src/theme/colors.ts`)

| Token           | Valeur                       | Usage                                |
| --------------- | ----------------------------- | ------------------------------------- |
| `primary`       | `hsl(28, 90%, 50%)` (orange)  | Boutons, prix, titres d'app, CTA      |
| `primaryLight`  | `rgba(249, 115, 22, 0.1)`     | Badges, fonds actifs                  |
| `background`    | `#f8fafc`                     | Fond général de l'app                 |
| `card` / `white` | `#ffffff`                    | Fond des cartes                       |
| `cardBorder`    | `#e2e8f0`                     | Bordures, séparateurs                 |
| `text`          | `#0f172a`                     | Texte principal                       |
| `textSecondary` | `#475569`                     | Texte secondaire                      |
| `textMuted`     | `#94a3b8`                     | Placeholders, labels discrets         |
| `success` / `successLight` | `#10b981` / transparent | Confirmations, statut "En ligne" |
| `error` / `errorLight`     | `#ef4444` / transparent | Messages de validation           |

### Iconographie

Toutes les icônes proviennent de **`lucide-react-native`** (style outline cohérent) : `Search`, `Sliders`, `Plus`, `MapPin`, `Camera`, `Tag`, `Sparkles`, `Coins`, `Pencil`, `CheckCircle2`, `Eye`, `ArrowLeft`, `ChevronDown`, `Check`, `X`...

---

## 🔧 Technologies & dépendances

### Core

| Technologie  | Version    | Rôle                              |
| ------------ | ----------- | ---------------------------------- |
| React Native | `0.81.5`   | Framework mobile cross-platform    |
| Expo         | `^54.0.0`  | Toolchain & APIs natives           |
| React        | `19.1.0`   | Bibliothèque UI                    |
| TypeScript   | `~5.9.2`   | Typage statique                    |

### Navigation

| Bibliothèque                     | Version    | Rôle                       |
| --------------------------------- | ----------- | --------------------------- |
| `@react-navigation/native`        | `^6.1.17`  | Conteneur de navigation     |
| `@react-navigation/native-stack`  | `^6.9.26`  | Pile d'écrans native        |
| `react-native-screens`            | `~4.16.0`  | Optimisation des écrans     |
| `react-native-safe-area-context`  | `~5.6.0`   | Gestion des zones sûres     |

### Formulaires & validation

| Bibliothèque | Version   | Rôle                                  |
| ------------ | ---------- | -------------------------------------- |
| `formik`     | `^2.4.6`  | Gestion d'état et de soumission de formulaire |
| `yup`        | `^1.4.0`  | Schéma de validation                   |

### UI & médias

| Bibliothèque             | Version    | Rôle                              |
| ------------------------- | ----------- | ---------------------------------- |
| `lucide-react-native`     | `^0.379.0` | Bibliothèque d'icônes SVG          |
| `react-native-svg`        | `15.12.1`  | Rendu SVG (requis par lucide)      |
| `expo-image-picker`       | `~17.0.11` | Accès caméra & galerie photo       |
| `expo-status-bar`        | `~3.0.9`   | Gestion de la barre de statut      |
| `react-native-web`        | `^0.21.0`  | Support du mode `expo start --web` |

---

## 📊 Statistiques du projet

### Lignes de code par fichier

```
Fichier                       Lignes
─────────────────────────────────────
AdDetailScreen.tsx                361
ImagePicker.tsx                   353
HomeScreen.tsx                    352
PublishAdScreen.tsx               295
CategoryPicker.tsx                206
SuccessScreen.tsx                 240
Button.tsx                        113
Input.tsx                          69
App.tsx                            31
colors.ts                          23
types/index.ts                     20
─────────────────────────────────────
TOTAL                           2 063
```

### Écrans & composants

```
4 écrans       (Home, Publish, Success, AdDetail)
4 composants   (Button, Input, CategoryPicker, ImagePicker)
5 catégories   (Électronique, Vêtements, Maison, Livres, Autre)
4 états produit (Neuf, Comme neuf, Bon état, Correct)
5 photos max   par annonce
```

---

## 🚀 Installation & lancement

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Expo Go](https://expo.dev/go) installé sur smartphone (Android ou iOS)
- Téléphone et PC connectés au **même réseau WiFi**

### Étapes

```bash
# 1. Se placer dans le dossier du projet
cd e-joutia-mobile

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement Expo
npm start
```

### Lancer sur un appareil

1. Ouvrir **Expo Go** sur le smartphone
2. Scanner le **QR Code** affiché dans le terminal
3. L'application se charge automatiquement

### Commandes disponibles

| Commande          | Description                          |
| ------------------ | ------------------------------------- |
| `npm start`        | Démarre le serveur de développement   |
| `npm run android`  | Lance directement sur émulateur/appareil Android |
| `npm run ios`      | Lance directement sur simulateur/appareil iOS    |
| `npm run web`      | Lance la version web (`react-native-web`) |
| `npm run ts:check` | Vérifie les types TypeScript (`tsc`)  |

---

## 🛡️ Validation des formulaires

Schéma **Yup** appliqué sur l'écran de publication (`PublishAdScreen`) :

| Champ         | Règle                                              |
| -------------- | --------------------------------------------------- |
| `title`        | Obligatoire, 50 caractères maximum                  |
| `description`  | Obligatoire, 10 caractères minimum                  |
| `price`        | Obligatoire, nombre entre `0.01` et `99999.99`      |
| `category`     | Obligatoire, parmi les 5 catégories prédéfinies     |
| `condition`    | Obligatoire, parmi les 4 états prédéfinis           |
| `images`       | Au moins **1 photo** obligatoire (max 5)            |

Chaque champ affiche un message d'erreur contextuel en français, uniquement après que l'utilisateur a interagi avec le champ (`touched`).

---

## 🔐 Permissions natives

Configurées via le plugin `expo-image-picker` dans `app.json` :

| Permission | Message affiché à l'utilisateur                                              |
| ----------- | ------------------------------------------------------------------------------ |
| Galerie     | "L'application a besoin d'accéder à vos photos pour publier des annonces."    |
| Caméra      | "L'application a besoin d'accéder à votre caméra pour prendre des photos de vos objets." |

---

## 👥 Équipe

| Rôle                      | Nom                  |
| -------------------------- | --------------------- |
| 👩‍💻 Développeuse           | **Chaimae ZAKI**      |
| 👨‍💻 Développeur            | **Alae JAAOUANI**     |

---

**e-joutia** — Développé avec ❤️ par **Chaimae ZAKI** & **Alae JAAOUANI**

[![Made with React Native](https://img.shields.io/badge/Made_with-React_Native-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)
[![Powered by Expo](https://img.shields.io/badge/Powered_by-Expo-000020?style=flat-square&logo=expo)](https://expo.dev)

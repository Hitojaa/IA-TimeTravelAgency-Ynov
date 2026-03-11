# ⏳ TimeTravel Agency — Webapp Interactive

> Projet pédagogique M1 Digital & IA — Ynov Campus

Webapp moderne et interactive pour une agence de voyage temporel fictive, développée avec IA générative (Claude Code + Groq API).

---

## ✨ Features implémentées

### Phase 1 — Architecture
- ✅ Page d'accueil avec hero section animée (particules, étoiles, effets)
- ✅ Présentation de l'agence (Section "À propos")
- ✅ CTA vers les destinations

### Phase 2 — Interface
- ✅ Galerie des 3 destinations en cards interactives (Paris 1889, Crétacé −65M, Florence 1504)
- ✅ Informations détaillées, prix, highlights par destination
- ✅ Animations Framer Motion (scroll reveal, hover effects, transitions)
- ✅ Design responsive mobile-first
- ✅ Thème sombre avec accents dorés (design luxe)

### Phase 3 — Intelligence Artificielle
- ✅ **Agent conversationnel** — Chatbot IA intégré propulsé par Groq
  - Widget flottant bas-droite
  - Conversation multi-tours avec contexte
  - Suggestions de questions
  - Personnalité définie (expert voyages temporels)
- ✅ **Quiz de personnalité** (Exercice 3.2 optionnel)
  - 4 questions pour recommander la destination idéale
  - Score calculé côté client
  - Description personnalisée générée par l'IA

### Phase 4 — Open Source & Déploiement
- ✅ Documentation complète (ce README)
- ✅ Code versionné sur GitHub
- ✅ Déployable sur Vercel en 1 clic

---

## 🛠️ Stack Technique

| Catégorie | Technologie |
|-----------|-------------|
| Frontend | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styles | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Icônes | Lucide React |
| Backend API | Vercel Serverless Functions (Node.js) |
| IA Chatbot | Groq API — modèle `llama-3.3-70b` |
| Déploiement | Vercel |

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js 18+
- Un compte Vercel (gratuit)
- Une clé API Groq ([console.groq.com](https://console.groq.com))

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd IA-TimeTravelAgency-Ynov
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env et ajouter votre clé GROQ_API_KEY
```

### 4. Lancer en développement
```bash
npm run dev
# Utilise `vercel dev` qui lance à la fois le frontend Vite et les API serverless
# Accès : http://localhost:3000
```

> **Note** : `vercel dev` nécessite `vercel` CLI installé (`npm i -g vercel`) et d'être connecté (`vercel login`).
> Pour le frontend seul (sans chatbot) : `npm run vite`

### 5. Build production
```bash
npm run build
```

---

## 🚀 Déploiement sur Vercel

### Option A — Interface web (recommandé)
1. Pusher le code sur GitHub
2. Aller sur [vercel.com](https://vercel.com) → "Add New Project"
3. Importer le repo GitHub
4. Dans "Environment Variables", ajouter :
   - `GROQ_API_KEY` = votre clé API
5. Cliquer "Deploy" 🎉

### Option B — CLI
```bash
npm install -g vercel
vercel login
vercel --prod
# Puis ajouter la variable dans vercel.com/[projet]/settings/environment-variables
```

---

## 📁 Structure du projet

```
├── api/
│   └── chat.ts              # API serverless — chatbot Groq
├── public/
│   |── favicon.svg          # Icône de l'app
│   └── images/              # Images IA
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation fixe avec scroll effect
│   │   ├── Hero.tsx         # Hero avec particules animées
│   │   ├── About.tsx        # Présentation de l'agence
│   │   ├── Destinations.tsx # Section grille des destinations
│   │   ├── DestinationCard.tsx # Card individuelle par destination
│   │   ├── Quiz.tsx         # Quiz de personnalité IA
│   │   ├── Chatbot.tsx      # Widget chatbot flottant
│   │   └── Footer.tsx       # Pied de page
│   ├── data/
│   │   ├── destinations.ts  # Données des 3 destinations
│   │   └── quiz.ts          # Questions et scoring du quiz
│   ├── types.ts             # Types TypeScript
│   ├── App.tsx              # Composant racine
│   ├── main.tsx             # Point d'entrée React
│   └── index.css            # Styles globaux + Tailwind
├── index.html               # Template HTML
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── vercel.json              # Config déploiement Vercel
└── .env.example             # Template variables d'environnement
```

---

## 🤖 IA Utilisées

| Usage | Outil / Modèle |
|-------|----------------|
| Génération du code | Claude Code (Anthropic) |
| Chatbot temps réel | Groq — modèle `llama-3.3-70b` |
| Quiz — recommandation IA | Groq — modèle `llama-3.3-70b` |

---

## 🖼️ Images

Les images des destinations sont actuellement hébergées sur Unsplash.
Pour utiliser tes propres images générées par IA, place-les dans le dossier `public/images/` et mets à jour les URLs dans `src/data/destinations.ts`.

---

## 🎨 Design System

- **Fond** : `#0a0a0f` (noir profond)
- **Accents** : `#d4a857` (or) → `#f0c879` (or clair)
- **Typographie** : Playfair Display (serif) + Inter (sans-serif)
- **Effets** : Glassmorphism, particules CSS, scroll reveal

---

## 📄 Licence

Projet pédagogique — M1 Digital & IA, Ynov Campus.
Code open source sous licence MIT.

---

## 👥 Équipe

Projet réalisé dans le cadre du module IA générative — Ynov Campus 2024/2025.

| Nom | Prénom |
|-----|--------|
| ISNARD | Sacha |
| ROLLAND | Dylan |
| GONZALEZ | Anthony |
| HADDADA | Yassine |

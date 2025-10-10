# E-commerce Project

![screenshot](./app/assets/screenshot.png)

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.1.3-blue?logo=nuxt&logoColor=white"/>
</p>

**Objectif** : développer un site de suivi de films et de séries.  
**Durée du projet** : 4 jours

Le site inclut :

- Connexion à Betaseries
- Routes accessibles uniquement aux utilisateurs connectés
- Affichage des films et séries
- Barre de recherche
- Détail des films et redirections vers Betaseries

## Sommaire

1. [Installation](#-installation)
2. [Démarrage](#-démarrage)
3. [Pistes d’amélioration](#-pistes-damélioration)
4. [Collaborateurs](#-collaborateurs)

---

## 🔧 Installation

1. Cloner le dépôt :

   ```bash
   git clone git@github.com:EpitechWebAcademiePromo2026/W-SPE-502-MAR-2-1-previously-lea.ballester.git
   git checkout main
   ```

2. Installer nuxt et les dépendances :

   ```bash
   # npm
    npm install
    # pnpm
    pnpm install
    # yarn
    yarn install
    # bun
    bun install
   ```

   Cette étape peut prendre quelques minutes.

3. Créer un compte Betaseries :

[Rendez-vous sur le site de Betaseries et créez votre compte.](https://www.betaseries.com/en/registration)

Attention, ne créez pas de compte avec google (la redirection de Betaseries ne prend pas en compte ce type de connexion.)

## Démarrage

```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn dev
# bun
bun run dev
```

Le projet est alors accessible sur :

- `http://localhost:3000`

## Pistes d’amélioration

- Ajouter un profil utilisateur
- Pouvoir ajouter des films et séries à son profil
- Gestion des amis
- Tri des contenus qui n'ont pas tous les champs renseignés (titre, images, etc)

## Collaborateurs

- [Stefan-Paris Paduraru]
- [Léa Ballester]

# Cassis

## Description

CASSIS permet de protéger une ressource derrière une url racourcie qui peut être déchiffrée par un utilisateur possédant les droits sur le lien. Ces ressources peuvent être des url ou du texte (bientot)
Pour créer ces ressources, une interface graphique et une api sont proposées. Cette interface graphique permet aussi de visualiser les ressources proposées ainsi que quelques statistiques comme le nombre de visites.

## Table des matières

- Technologies
- Installation
- Docker
- Utilisation

## Technologies

Framework: Nuxt
Database: MongoDB

## Installation

### Prérequis

- Node.js
- MongoDB
- [Service EirbAuth / Roulade (pour l'authentification)](https://github.com/Eirbware/roulade.eirb.fr)

> Il est recommandé d'utiliser l'image docker de roulade pour simplifier l'installation.

### Créer une base de données MongoDB

> Peut être fait en local ou sur un service cloud comme MongoDB Atlas
> Il est pratique d'utiliser un client comme MongoDB Compass pour visualiser les données

### Configuration

Copier le fichier `.env.example` en `.env` et remplir les variables d'environnement

```bash
cp .env.example .env
```

### Installer les dépendances

```bash
npm install
```

## Démarrer le serveur de développement

```bash
npm run dev
```

## Docker

### Variables d'environnement

Docker utilise des variables d'environnement un peu différentes de celles utilisées en local.
Pour deployer avec docker on peut remplacer les variables d'environnement dans le fichier `.env` par des variables d'environnement docker et eventuellement les adapter.

```bash
cp .env.docker .env
```

### Démarrer le serveur

On peut ensuite lancer le serveur avec docker compose.

```bash
docker compose up --detach
```

### Arrêter le serveur

```bash
docker compose down
```

## Utilisation

> Comming soon

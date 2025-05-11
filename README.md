# YouTube Transcript App

![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

Une application web moderne construite avec Next.js permettant d'extraire et d'afficher les transcriptions de vidéos YouTube à partir d'une simple URL.

## 🌟 Fonctionnalités

- ✅ Extraction des transcriptions de vidéos YouTube
- ✅ Interface utilisateur élégante et responsive avec Tailwind CSS et Shadcn UI
- ✅ Lecture intégrée de la vidéo source
- ✅ Copie facile de la transcription vers le presse-papiers
- ✅ Gestion des erreurs et des cas limites
- ✅ Architecture moderne basée sur Next.js App Router

## 🛠️ Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React avec App Router
- [TypeScript](https://www.typescriptlang.org/) - Pour un code typé et robuste
- [Tailwind CSS](https://tailwindcss.com/) - Pour le styling
- [Shadcn UI](https://ui.shadcn.com/) - Composants UI réutilisables
- [YouTube Transcript API](https://www.npmjs.com/package/youtube-transcript) - Pour extraire les transcriptions

## 📋 Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn

## 🚀 Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/ubdaa/youtube-transcript-app.git
cd youtube-transcript-app
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Lancez le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

## 📖 Comment utiliser l'application

1. Accédez à la page d'accueil de l'application
2. Entrez l'URL complète d'une vidéo YouTube dans le champ de saisie
   (ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
3. Cliquez sur "Récupérer la transcription"
4. La transcription s'affichera avec la vidéo intégrée en dessous
5. Utilisez le bouton "Copier" pour copier la transcription dans votre presse-papiers

## 📁 Structure du projet

```
src/
├── app/
│   ├── api/
│   │   └── transcript/
│   │       └── route.ts      # API endpoint pour récupérer les transcriptions
│   ├── globals.css           # Styles globaux
│   ├── layout.tsx            # Layout principal de l'application
│   └── page.tsx              # Page d'accueil
├── components/
│   ├── ui/                   # Composants Shadcn UI
│   ├── transcript-form.tsx   # Formulaire pour entrer l'URL
│   └── transcript-display.tsx # Affichage de la transcription
└── lib/
    └── utils.ts              # Fonctions utilitaires (extraction de l'ID vidéo, etc.)
```

## ⚠️ Limitations

- L'application ne peut extraire que les transcriptions des vidéos qui ont des sous-titres activés par le créateur.
- Certaines vidéos peuvent avoir des restrictions qui empêchent l'accès aux transcriptions.
- Une connexion Internet est nécessaire pour que l'application fonctionne correctement.

## 🔧 Personnalisation

### Thème

Pour personnaliser le thème de l'application, vous pouvez modifier les variables CSS dans `src/app/globals.css` ou ajuster les configurations de Tailwind dans `tailwind.config.js`.

### Langues

Par défaut, l'application tente de récupérer les transcriptions dans la langue principale de la vidéo. Pour ajouter le support de langues spécifiques, vous devrez modifier la fonction dans `src/app/api/transcript/route.ts`.

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE).

---

Créé par [ubdaa](https://github.com/ubdaa) - 2025
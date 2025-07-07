# CareerPath AI - Application de Reconversion Professionnelle

Une application web moderne qui utilise l'intelligence artificielle pour générer des parcours de formation personnalisés selon les objectifs de reconversion professionnelle.

## 🚀 Fonctionnalités

- **Analyse de CV** : Téléchargement et analyse automatique des compétences
- **Parcours personnalisé** : Génération de parcours via l'API OpenAI
- **Recommandations de formations** : Cours suggérés sur les meilleures plateformes
- **Export PDF** : Sauvegarde du parcours généré
- **Interface moderne** : Design responsive et intuitive
- **Formulaire guidé** : Saisie simplifiée des informations

## 🛠 Technologies

### Frontend
- React 18 avec TypeScript
- Tailwind CSS pour le styling
- Lucide React pour les icônes
- html2canvas + jsPDF pour l'export PDF

### Backend
- Node.js + Express
- OpenAI API (GPT-3.5)
- CORS pour les requêtes cross-origin
- Middleware de gestion des fichiers

## 📦 Installation

1. **Cloner le projet**
```bash
git clone [repository-url]
cd career-path-ai
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```

4. **Configurer l'API OpenAI**
Ajoutez votre clé API OpenAI dans le fichier `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

## 🚀 Démarrage

### Mode développement
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

### Mode production
```bash
npm run build
npm start
```

## 🔧 Structure du projet

```
career-path-ai/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── CVForm.tsx
│   │   ├── CareerPath.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   └── main.tsx
├── server/
│   └── index.js
├── public/
└── package.json
```

## 🎯 Utilisation

1. **Accueil** : Présentation du service et démarrage
2. **Formulaire** : Saisie du CV et objectif professionnel
3. **Génération** : Traitement via l'IA OpenAI
4. **Résultats** : Affichage du parcours personnalisé
5. **Export** : Téléchargement PDF du parcours

## 🔐 Sécurité

- Validation des données côté client et serveur
- Limitation des requêtes API
- Gestion des erreurs et exceptions
- Variables d'environnement pour les clés sensibles

## 📊 Performance

- Composants React optimisés
- Lazy loading des librairies lourdes
- Gestion d'état locale minimale
- Bundle optimisé avec Vite

## 🌐 Déploiement

L'application peut être déployée sur :
- Netlify (frontend)
- Heroku (backend)
- Vercel (fullstack)
- AWS/GCP (production)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement
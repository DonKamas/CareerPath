import express from 'express';
import cors from 'cors';
import multer from 'multer';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration multer pour l'upload de fichiers
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('text/')) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non supporté'), false);
    }
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Route pour analyser le CV et générer le parcours
app.post('/api/generate-career-path', async (req, res) => {
  try {
    const { currentJob, targetJob, experience, skills, timeline } = req.body;
    
    if (!currentJob || !targetJob) {
      return res.status(400).json({ 
        error: 'Les champs "poste actuel" et "objectif professionnel" sont requis' 
      });
    }

    // Construction du prompt pour OpenAI
    const prompt = `
    En tant qu'expert en reconversion professionnelle, créez un parcours de formation personnalisé pour cette transition de carrière :

    Profil actuel :
    - Poste actuel : ${currentJob}
    - Expérience : ${experience || 'Non spécifiée'}
    - Compétences actuelles : ${skills || 'Non spécifiées'}
    
    Objectif :
    - Poste visé : ${targetJob}
    - Délai souhaité : ${timeline || 'Non spécifié'}

    Veuillez fournir une réponse structurée en JSON avec les éléments suivants :
    {
      "analysis": "Analyse de la transition (2-3 phrases)",
      "skills_gap": ["Compétence 1 à acquérir", "Compétence 2 à acquérir", "..."],
      "learning_path": [
        {
          "phase": "Phase 1 : Fondamentaux",
          "duration": "2-3 mois",
          "courses": [
            {
              "title": "Nom du cours",
              "provider": "Plateforme (Coursera, Udemy, etc.)",
              "duration": "Durée estimée",
              "level": "Débutant/Intermédiaire/Avancé",
              "description": "Description courte"
            }
          ]
        }
      ],
      "timeline": "Durée totale estimée",
      "tips": ["Conseil 1", "Conseil 2", "..."]
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Vous êtes un expert en reconversion professionnelle et formation. Répondez uniquement en JSON valide."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content;
    
    try {
      const careerPath = JSON.parse(responseText);
      res.json({ success: true, data: careerPath });
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      res.status(500).json({ 
        error: 'Erreur lors du traitement de la réponse IA',
        details: responseText 
      });
    }

  } catch (error) {
    console.error('Erreur API OpenAI:', error);
    
    if (error.code === 'insufficient_quota') {
      res.status(402).json({ 
        error: 'Quota API OpenAI dépassé. Veuillez réessayer plus tard.' 
      });
    } else if (error.code === 'invalid_api_key') {
      res.status(401).json({ 
        error: 'Clé API OpenAI invalide.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Erreur lors de la génération du parcours',
        details: error.message 
      });
    }
  }
});

// Gestion des erreurs multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Fichier trop volumineux (max 5MB)' });
    }
  }
  res.status(500).json({ error: error.message });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur le port ${port}`);
  console.log(`📡 API disponible sur http://localhost:${port}`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  ATTENTION: Variable OPENAI_API_KEY non définie');
  }
});
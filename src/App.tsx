import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CVForm from './components/CVForm';
import CareerPath from './components/CareerPath';
import Footer from './components/Footer';

export interface CVData {
  cvText: string;
  careerObjective: string;
  currentRole: string;
  experience: string;
}

export interface GeneratedPath {
  analysis: string;
  missingSkills: string[];
  recommendedCourses: Array<{
    title: string;
    platform: string;
    duration: string;
    difficulty: string;
    description: string;
    url?: string;
  }>;
  timeline: string;
  totalDuration: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'home' | 'form' | 'results'>('home');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [generatedPath, setGeneratedPath] = useState<GeneratedPath | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartProcess = () => {
    setCurrentStep('form');
  };

  const handleCVSubmission = async (data: CVData) => {
    setIsLoading(true);
    setCvData(data);
    
    try {
      // Map the frontend data to match backend expectations
      const requestData = {
        skills: data.cvText, // Map cvText to skills as expected by backend
        careerObjective: data.careerObjective,
        currentRole: data.currentRole,
        experience: data.experience
      };

      const response = await fetch('/api/generate-career-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Try to get specific error message from backend
        let errorMessage = 'Erreur lors de la génération du parcours';
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = `Erreur ${response.status}: ${errorText}`;
            } else {
              errorMessage = `Erreur ${response.status}: ${response.statusText}`;
            }
          } catch (textError) {
            errorMessage = `Erreur ${response.status}: ${response.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setGeneratedPath(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      
      // Display specific error message to user
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      alert(`Erreur: ${errorMessage}\n\nVérifiez que votre clé API OpenAI est configurée correctement dans le fichier .env`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setCvData(null);
    setGeneratedPath(null);
  };

  const handleNewAnalysis = () => {
    setCurrentStep('form');
    setGeneratedPath(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onBackToHome={handleBackToHome} showBackButton={currentStep !== 'home'} />
      
      <main className="pt-16">
        {currentStep === 'home' && (
          <Hero onStartProcess={handleStartProcess} />
        )}
        
        {currentStep === 'form' && (
          <CVForm 
            onSubmit={handleCVSubmission} 
            isLoading={isLoading}
            onBack={() => setCurrentStep('home')}
          />
        )}
        
        {currentStep === 'results' && generatedPath && cvData && (
          <CareerPath 
            cvData={cvData}
            generatedPath={generatedPath}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
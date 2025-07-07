import React from 'react';
import { ArrowRight, Brain, Target, BookOpen, Award } from 'lucide-react';

interface HeroProps {
  onStartProcess: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartProcess }) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Transformez votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}carrière
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez votre parcours de reconversion personnalisé grâce à l'intelligence artificielle. 
            Analysez vos compétences actuelles et obtenez un plan de formation sur mesure.
          </p>
          <button
            onClick={onStartProcess}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto space-x-3"
          >
            <span>Commencer mon analyse</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Analyse IA</h3>
            <p className="text-gray-600">
              Notre IA analyse vos compétences actuelles et identifie les gaps à combler
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Objectif Clair</h3>
            <p className="text-gray-600">
              Définissez précisément votre objectif professionnel et votre domaine cible
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Formations</h3>
            <p className="text-gray-600">
              Recevez une liste de formations adaptées sur les meilleures plateformes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Plan Structuré</h3>
            <p className="text-gray-600">
              Obtenez un planning détaillé avec timeline et jalons de progression
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Comment ça fonctionne ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partagez votre CV</h3>
              <p className="text-gray-600">
                Déposez votre CV ou remplissez le formulaire avec vos compétences actuelles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Définissez votre objectif</h3>
              <p className="text-gray-600">
                Indiquez le métier ou domaine vers lequel vous souhaitez vous orienter
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recevez votre parcours</h3>
              <p className="text-gray-600">
                Obtenez votre plan de formation personnalisé et exportez-le en PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { Upload, User, Target, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { CVData } from '../App';

interface CVFormProps {
  onSubmit: (data: CVData) => void;
  isLoading: boolean;
  onBack: () => void;
}

const CVForm: React.FC<CVFormProps> = ({ onSubmit, isLoading, onBack }) => {
  const [formData, setFormData] = useState<CVData>({
    cvText: '',
    careerObjective: '',
    currentRole: '',
    experience: ''
  });

  const [inputMethod, setInputMethod] = useState<'text' | 'form'>('form');

  const careerObjectives = [
    'Développeur Web/Mobile',
    'Data Scientist',
    'UX/UI Designer',
    'Chef de projet digital',
    'Expert en cybersécurité',
    'Consultant DevOps',
    'Product Manager',
    'Marketing Digital',
    'Autre (à préciser)'
  ];

  const experienceLevels = [
    '0-2 ans',
    '3-5 ans',
    '5-10 ans',
    '10+ ans'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currentRole.trim() || !formData.careerObjective.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onSubmit(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          cvText: e.target?.result as string
        }));
      };
      reader.readAsText(file);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Partagez vos informations
          </h2>

          {/* Input Method Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setInputMethod('form')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                inputMethod === 'form' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Formulaire guidé
            </button>
            <button
              onClick={() => setInputMethod('text')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                inputMethod === 'text' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CV libre
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {inputMethod === 'text' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Poste actuel *
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                    placeholder="Ex: Comptable, Professeur, Commercial..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Objectif professionnel *
                  </label>
                  <select
                    value={formData.careerObjective}
                    onChange={(e) => setFormData(prev => ({ ...prev, careerObjective: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez votre objectif</option>
                    {careerObjectives.map(objective => (
                      <option key={objective} value={objective}>{objective}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Collez votre CV ou téléchargez un fichier
                  </label>
                  <textarea
                    value={formData.cvText}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvText: e.target.value }))}
                    placeholder="Collez le contenu de votre CV ici..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-file"
                    />
                    <label
                      htmlFor="cv-file"
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger un fichier
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Poste actuel *
                  </label>
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                    placeholder="Ex: Comptable, Professeur, Commercial..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Expérience professionnelle
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre expérience</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-2" />
                    Objectif professionnel *
                  </label>
                  <select
                    value={formData.careerObjective}
                    onChange={(e) => setFormData(prev => ({ ...prev, careerObjective: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez votre objectif</option>
                    {careerObjectives.map(objective => (
                      <option key={objective} value={objective}>{objective}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Compétences et expériences clés
                  </label>
                  <textarea
                    value={formData.cvText}
                    onChange={(e) => setFormData(prev => ({ ...prev, cvText: e.target.value }))}
                    placeholder="Décrivez vos principales compétences, formations et expériences..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Génération en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Générer mon parcours</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CVForm;
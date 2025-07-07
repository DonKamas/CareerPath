import React from 'react';
import { Heart, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">CareerPath AI</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Transformez votre carrière avec l'intelligence artificielle. 
              Obtenez des parcours de formation personnalisés adaptés à vos objectifs.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>pour votre réussite professionnelle</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Fonctionnalités</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Analyse de CV</li>
              <li>Parcours personnalisé</li>
              <li>Recommandations IA</li>
              <li>Export PDF</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Guide d'utilisation</li>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 CareerPath AI. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Confidentialité
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Users, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
  showBackButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBackToHome, showBackButton }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBackToHome}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CareerPath AI</h1>
                <p className="text-sm text-gray-600">Votre parcours de reconversion</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm text-gray-600">Powered by OpenAI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
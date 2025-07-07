import React, { useRef } from 'react';
import { Download, RefreshCw, CheckCircle, Clock, ExternalLink, BookOpen, Target, Award } from 'lucide-react';
import { CVData, GeneratedPath } from '../App';

interface CareerPathProps {
  cvData: CVData;
  generatedPath: GeneratedPath;
  onNewAnalysis: () => void;
}

const CareerPath: React.FC<CareerPathProps> = ({ cvData, generatedPath, onNewAnalysis }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (contentRef.current) {
      // Import dynamically to avoid build issues
      const html2canvas = await import('html2canvas');
      const jsPDF = await import('jspdf');
      
      const canvas = await html2canvas.default(contentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`parcours-formation-${cvData.careerObjective.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'débutant':
        return 'text-green-600 bg-green-100';
      case 'intermédiaire':
        return 'text-orange-600 bg-orange-100';
      case 'avancé':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Votre parcours de formation
              </h2>
              <p className="text-gray-600">
                Objectif : <span className="font-semibold text-blue-600">{cvData.careerObjective}</span>
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExportPDF}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Exporter PDF</span>
              </button>
              <button
                onClick={onNewAnalysis}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Nouvelle analyse</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content for PDF Export */}
        <div ref={contentRef} className="bg-white">
          {/* Analysis Summary */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-blue-600" />
              Analyse de votre profil
            </h3>
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{generatedPath.analysis}</p>
            </div>
            
            {/* Missing Skills */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Compétences à développer</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {generatedPath.missingSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  Durée totale
                </h4>
                <p className="text-2xl font-bold text-green-600">{generatedPath.totalDuration}</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Timeline
                </h4>
                <p className="text-gray-700">{generatedPath.timeline}</p>
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
              Formations recommandées
            </h3>
            <div className="space-y-6">
              {generatedPath.recommendedCourses.map((course, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {course.platform}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className={`text-sm px-3 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>
                    </div>
                    {course.url && (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6 mt-8">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Parcours généré avec succès !</h3>
              <p className="text-green-700 mt-1">
                Votre plan de formation personnalisé est prêt. N'hésitez pas à l'exporter en PDF pour le conserver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPath;
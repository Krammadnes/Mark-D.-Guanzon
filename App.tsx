import React, { useState, useCallback } from 'react';
import { CV } from './components/CV';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { CVData } from './types';
import { generateCVSummary } from './services/geminiService';

const initialCVData: CVData = {
  name: 'Mark D. Guanzon',
  title: 'Data Entry & Retyping Specialist',
  contact: {
    email: 'markguanzon57@gmail.com',
    phone: '+639453792346',
    location: 'Remote',
  },
  summary: 'Click the button above to generate a professional summary with AI!',
  experience: [
    {
      title: 'Data Entry Specialist',
      company: 'Self-Employed (Freelance)',
      period: '2021 - Present (3 years)',
      description: 'Provided high-quality data entry, data cleansing, and document retyping services for various clients. Maintained a 99.8% accuracy rate and consistently met tight deadlines. Managed client communication, project scoping, and invoicing independently.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Information Technology (BSIT)',
      institution: 'Tech University',
      period: '4th Year',
    },
  ],
  skills: [
    'Touch Typing (80+ WPM)',
    'Microsoft Office Suite',
    'Google Workspace',
    'Data Accuracy & Verification',
    'Confidentiality',
    'Time Management',
  ],
};

const App: React.FC = () => {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const summary = await generateCVSummary();
      setCvData(prevData => ({ ...prevData, summary }));
    } catch (err) {
      setError('Failed to generate summary. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center my-8">
          <button
            onClick={handleGenerateSummary}
            disabled={isLoading}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Generate Professional Summary
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="my-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}

        <main>
          <CV data={cvData} />
        </main>

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Generated with Gemini API and React. Styled with Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
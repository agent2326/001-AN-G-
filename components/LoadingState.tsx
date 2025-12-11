import React, { useState, useEffect } from 'react';
import { Stars } from 'lucide-react';

interface LoadingStateProps {
  steps: string[];
}

const LoadingState: React.FC<LoadingStateProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500); // Change step every 2.5 seconds

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gold-200 blur-3xl opacity-30 animate-pulse rounded-full w-32 h-32 mx-auto"></div>
        <Stars className="relative text-gold-300 animate-spin-slow" size={48} strokeWidth={1} />
      </div>
      
      <h3 className="text-2xl font-serif italic text-stone-800 mb-4 transition-all duration-500 ease-in-out">
        {steps[currentStep]}
      </h3>
      
      <div className="w-64 h-1 bg-stone-100 rounded-full overflow-hidden mt-4">
        <div 
            className="h-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-200 animate-shimmer"
            style={{ width: '100%' }}
        />
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
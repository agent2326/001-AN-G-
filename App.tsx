import React, { useState } from 'react';
import Header from './components/Header';
import VisionForm from './components/VisionForm';
import VisionResult from './components/VisionResult';
import LoadingState from './components/LoadingState';
import HistoryGallery, { HistoryItem } from './components/HistoryGallery';
import { VisionFormData, AspectRatio, PosterTheme, PosterStyle, PosterBackground, CollageTechnique, Language, LightEffect, CollageArtist, CompositionLayout } from './types';
import { generateVisionBoard } from './services/geminiService';
import { Layout, Image as ImageIcon } from 'lucide-react';
import { translations } from './translations';

const DEFAULT_FORM_DATA: VisionFormData = {
  textTop: '',
  mainText: '',
  secondaryText: '',
  subText: '',
  textBottom: '',
  compositionLayout: CompositionLayout.CLASSIC_MAGAZINE,
  // Legacy
  tagline: '',
  
  // Initialize with empty values to keep "Selected Tokens" clean on start
  theme: '' as PosterTheme, 
  collageTechnique: CollageTechnique.NO_COLLAGE,
  collageArtist: CollageArtist.NO_ARTIST,
  keywords: '',
  aesthetic: '' as PosterStyle,
  atmosphere: [], 
  lightEffect: LightEffect.NO_EFFECT,
  aspectRatio: AspectRatio.PORTRAIT,
  referenceImage: undefined,
  secondReferenceImage: undefined,
};

type ViewMode = 'form' | 'result';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewMode>('form');
  const [language, setLanguage] = useState<Language>('ru');
  
  const t = translations[language];

  // State is lifted here to persist data when going back from result
  const [formData, setFormData] = useState<VisionFormData>(DEFAULT_FORM_DATA);

  const handleFormChange = (newData: VisionFormData) => {
    setFormData(newData);
  };

  const handleFormSubmit = async (data: VisionFormData) => {
    setLoading(true);
    setError(null);
    setResultImage(null); 
    setFormData(data);

    try {
      const { image, prompt } = await generateVisionBoard(data);
      setResultImage(image);
      setLastPrompt(prompt);
      setHistory(prev => [{ image, prompt }, ...prev]); // Add to history with prompt
      setActiveView('result');
    } catch (err) {
      setError(t.error_msg);
      console.error(err);
      setActiveView('form'); // Stay on form if error
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
      handleFormSubmit(formData);
  };

  // Switch to form view without deleting the image
  const handleEdit = () => {
    setActiveView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to result view if image exists
  const handleShowResult = () => {
    if (resultImage) {
        setActiveView('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-stone-800 font-sans selection:bg-gold-200 selection:text-stone-900 pb-20">
      
      <div className="flex justify-end p-4 max-w-7xl mx-auto">
        <div className="bg-white/50 backdrop-blur-sm rounded-full p-1 flex gap-1 border border-stone-200">
            {(['ru', 'ua', 'en'] as Language[]).map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase transition-all ${
                        language === lang 
                        ? 'bg-stone-800 text-white shadow-sm' 
                        : 'text-stone-400 hover:text-stone-600'
                    }`}
                >
                    {lang}
                </button>
            ))}
        </div>
      </div>

      <Header title={t.header_title} subtitle={t.header_subtitle} />

      <main className="max-w-7xl mx-auto px-4 pt-4">
        
        {/* Navigation Tabs - Only visible if we have a result */}
        {resultImage && !loading && (
            <div className="flex justify-center mb-8 animate-fade-in">
                <div className="bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border-stone-200 flex gap-1 shadow-sm">
                    <button
                        onClick={handleEdit}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                            activeView === 'form' 
                            ? 'bg-stone-800 text-[#FDFBF7] shadow-md' 
                            : 'text-stone-500 hover:text-stone-800 hover:bg-white/50'
                        }`}
                    >
                        <Layout size={14} />
                        {t.settings}
                    </button>
                    <button
                        onClick={handleShowResult}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                            activeView === 'result' 
                            ? 'bg-stone-800 text-[#FDFBF7] shadow-md' 
                            : 'text-stone-500 hover:text-stone-800 hover:bg-white/50'
                        }`}
                    >
                        <ImageIcon size={14} />
                        {t.result}
                    </button>
                </div>
            </div>
        )}

        {error && (
            <div className="max-w-lg mx-auto mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-center font-serif italic">
                {error}
            </div>
        )}

        {loading ? (
             <LoadingState steps={t.steps} />
        ) : (
            <>
                {/* Form View */}
                <div className={activeView === 'form' ? 'block animate-fade-in' : 'hidden'}>
                     {!resultImage && (
                        <div className="text-center mb-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-serif text-stone-700 mb-4">
                            {t.intro_title}
                        </h2>
                        <p className="text-stone-500 font-light leading-relaxed">
                            {t.intro_desc}
                        </p>
                        </div>
                     )}
                     <VisionForm 
                        data={formData} 
                        onChange={handleFormChange} 
                        onSubmit={handleFormSubmit} 
                        isLoading={loading} 
                        language={language}
                        t={t}
                     />
                </div>

                {/* Result View */}
                <div className={activeView === 'result' && resultImage ? 'block' : 'hidden'}>
                    {resultImage && (
                        <VisionResult 
                            imageUrl={resultImage} 
                            formData={formData}
                            promptUsed={lastPrompt}
                            onRegenerate={handleRegenerate}
                            t={t}
                        />
                    )}
                </div>
            </>
        )}

        {/* History Gallery */}
        <HistoryGallery items={history} title={t.history_title} language={language} />

      </main>

      {/* Background decoration elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold-300/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[30%] bg-gold-200/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[50%] h-[50%] bg-stone-200/10 rounded-full blur-[150px]"></div>
      </div>

    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Download, Eraser, Loader2, X, Check, Image as ImageIcon, Type, Copy, Maximize2, AlertCircle } from 'lucide-react';
import { translations } from '../translations';
import { removeTextFromImage } from '../services/geminiService';

export interface HistoryItem {
    image: string;
    prompt: string;
}

interface HistoryGalleryProps {
  items: HistoryItem[];
  title: string;
  language?: 'ru' | 'ua' | 'en'; 
}

const HistoryGallery: React.FC<HistoryGalleryProps> = ({ items, title, language = 'ru' }) => {
  const [cleaningIndex, setCleaningIndex] = useState<number | null>(null);
  const [selectionIndex, setSelectionIndex] = useState<number | null>(null); 
  const [cleanImage, setCleanImage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const t = translations[language]; 

  if (items.length === 0) return null;

  const handleDownload = (url: string, prefix = 'history') => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `anna-vision-${prefix}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCleanText = async (img: string, index: number, mode: 'text_only' | 'remove_all') => {
    if (cleaningIndex !== null) return; 
    setSelectionIndex(null); 
    setCleaningIndex(index);
    setCleanImage(null);
    setError(null);

    try {
        const cleaned = await removeTextFromImage(img, mode);
        setCleanImage(cleaned);
    } catch (e) {
        console.error("Failed to clean text", e);
        setError("Failed to edit image. The server might be busy.");
        // Clear error after 3 seconds
        setTimeout(() => setError(null), 3000);
    } finally {
        setCleaningIndex(null); 
    }
  };

  const closeCleanModal = () => {
    setCleanImage(null);
    setCleaningIndex(null);
    setError(null);
  };

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
        <div className="w-full max-w-7xl mx-auto mt-20 px-4 animate-fade-in">
        <h3 className="text-2xl font-serif text-stone-800 mb-8 text-center italic flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-stone-300"></span>
            {title}
            <span className="h-[1px] w-12 bg-stone-300"></span>
        </h3>
        
        {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-xl text-center flex items-center justify-center gap-2 text-sm">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, idx) => (
            <div key={idx} className="relative group aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
                <img 
                src={item.image} 
                alt={`History ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity flex flex-col items-center justify-center gap-2 ${selectionIndex === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    
                    {selectionIndex === idx ? (
                         // Selection Mode (Text vs All)
                         <div className="flex flex-col gap-2 p-2 bg-white/90 backdrop-blur-md rounded-xl animate-fade-in-up mx-4">
                            <button
                                onClick={() => handleCleanText(item.image, idx, 'text_only')}
                                className="flex items-center gap-2 text-xs font-medium px-3 py-2 hover:bg-gold-100 rounded-lg text-stone-700 transition-colors w-full text-left"
                            >
                                <Type size={14} />
                                {t.clean_option_text}
                            </button>
                            <div className="h-[1px] bg-stone-200 w-full" />
                            <button
                                onClick={() => handleCleanText(item.image, idx, 'remove_all')}
                                className="flex items-center gap-2 text-xs font-medium px-3 py-2 hover:bg-gold-100 rounded-lg text-stone-700 transition-colors w-full text-left"
                            >
                                <ImageIcon size={14} />
                                {t.clean_option_all}
                            </button>
                            <button 
                                onClick={() => setSelectionIndex(null)}
                                className="mt-1 text-[10px] text-stone-400 hover:text-stone-600 text-center"
                            >
                                Cancel
                            </button>
                         </div>
                    ) : (
                        // Standard Hover Buttons
                        <div className="grid grid-cols-2 gap-2">
                             {/* Expand */}
                             <button 
                                onClick={() => setExpandedImage(item.image)}
                                className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                                title="Expand"
                            >
                                <Maximize2 size={16} />
                            </button>

                            {/* Download */}
                            <button 
                                onClick={() => handleDownload(item.image, 'original')}
                                className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                                title={t.btn_download}
                            >
                                <Download size={16} />
                            </button>
                            
                            {/* Copy Prompt */}
                            <button 
                                onClick={() => handleCopyPrompt(item.prompt, idx)}
                                className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                                title={t.btn_copy}
                            >
                                {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                            </button>

                            {/* Eraser */}
                            <button 
                                onClick={() => setSelectionIndex(idx)}
                                disabled={cleaningIndex !== null}
                                className="bg-white/20 backdrop-blur-md hover:bg-gold-400/80 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                                title={t.btn_clean_options}
                            >
                                {cleaningIndex === idx ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Eraser size={16} />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Expanded Image Modal (Lightbox) */}
        {expandedImage && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setExpandedImage(null)}>
                <button 
                    onClick={() => setExpandedImage(null)}
                    className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                >
                    <X size={32} />
                </button>
                <img 
                    src={expandedImage} 
                    alt="Expanded" 
                    className="max-w-full max-h-screen object-contain shadow-2xl rounded-sm"
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
        )}

        {/* Clean Image Modal */}
        {cleanImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
                    <button 
                        onClick={closeCleanModal}
                        className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <h4 className="text-xl font-serif text-stone-800 mb-4 text-center">
                        {t.clean_success} <Check size={18} className="inline text-green-500 ml-2" />
                    </h4>

                    <div className="rounded-xl overflow-hidden mb-6 border border-stone-200 shadow-inner bg-stone-50">
                        <img src={cleanImage} alt="Cleaned" className="w-full h-auto max-h-[60vh] object-contain" />
                    </div>

                    <button
                        onClick={() => handleDownload(cleanImage, 'clean')}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-[#FDFBF7] font-serif py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={18} />
                        {t.btn_download_clean}
                    </button>
                </div>
            </div>
        )}
    </>
  );
};

export default HistoryGallery;
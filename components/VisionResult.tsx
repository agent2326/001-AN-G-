import React, { useState } from 'react';
import { Download, Heart, Copy, Check, Repeat2 } from 'lucide-react';
import { AspectRatio, VisionFormData, PosterStyle } from '../types';

interface VisionResultProps {
  imageUrl: string;
  formData: VisionFormData;
  promptUsed: string;
  onRegenerate: () => void;
  t: any;
}

const VisionResult: React.FC<VisionResultProps> = ({ imageUrl, formData, promptUsed, onRegenerate, t }) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    // Determine style index for filename
    const styles = Object.values(PosterStyle);
    const styleIndex = styles.indexOf(formData.aesthetic) + 1;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    // Format: manifestation-style-X-[timestamp].png
    link.download = `manifestation-style-${styleIndex}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptUsed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case AspectRatio.SQUARE: return 'aspect-square';
      case AspectRatio.PORTRAIT: return 'aspect-[3/4]';
      case AspectRatio.LANDSCAPE: return 'aspect-[4/3]';
      case AspectRatio.STORY: return 'aspect-[9/16]';
      case AspectRatio.CINEMATIC: return 'aspect-video'; // 16:9
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-2xl border border-stone-100">
        
        <div className={`relative rounded-[2rem] overflow-hidden bg-stone-100 ${getAspectRatioClass(formData.aspectRatio)} group mx-auto`}>
          <img 
            src={imageUrl} 
            alt="Generated Vision Board" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          <button
            onClick={handleDownload}
            className="col-span-1 md:col-span-2 bg-stone-800 hover:bg-stone-700 text-[#FDFBF7] font-serif py-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Download size={18} />
            <span>{t.btn_download}</span>
          </button>
          
          <button
            onClick={onRegenerate}
            className="bg-stone-100 hover:bg-gold-100 hover:text-gold-900 text-stone-600 font-sans font-medium py-3 rounded-full transition-all flex items-center justify-center gap-2 border border-transparent hover:border-gold-200"
          >
            <Repeat2 size={16} />
            <span>{t.btn_regenerate}</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-sans font-medium py-3 rounded-full transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? t.btn_copied : t.btn_copy}</span>
          </button>
        </div>

        <div className="mt-6 text-center">
            <p className="text-stone-400 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Heart size={12} className="fill-gold-300 text-gold-300" />
                Created with Soul & Beauty Vision
                <Heart size={12} className="fill-gold-300 text-gold-300" />
            </p>
        </div>

      </div>
    </div>
  );
};

export default VisionResult;
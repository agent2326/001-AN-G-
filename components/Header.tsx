import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="w-full py-8 px-4 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-2 text-gold-400">
        <Sparkles size={20} strokeWidth={1.5} />
        <span className="uppercase tracking-[0.2em] text-xs font-sans">Soul & Beauty Poster Creator</span>
        <Sparkles size={20} strokeWidth={1.5} />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif text-stone-800 italic leading-tight">
        {title}
      </h1>
      <div className="h-[1px] w-24 bg-gold-300 mt-6 mb-2"></div>
      <p className="text-stone-500 font-serif text-sm italic">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;
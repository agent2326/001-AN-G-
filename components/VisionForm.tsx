import React, { useRef, useState, useMemo } from 'react';
import { PosterStyle, PosterBackground, AspectRatio, VisionFormData, PosterTheme, CollageTechnique, Language, LightEffect, CollageArtist, CompositionLayout } from '../types';
import { Wand2, ImagePlus, X, Type, LayoutTemplate, Scissors, UserPlus, Trash2, User, Plus, Sparkles, Sun, Bot, Palette, ChevronDown, ArrowRight } from 'lucide-react';
import { optionTranslations } from '../translations';
import { suggestCreativeDetails, autoConfigureForm } from '../services/geminiService';

interface VisionFormProps {
  data: VisionFormData;
  onChange: (data: VisionFormData) => void;
  onSubmit: (data: VisionFormData) => void;
  isLoading: boolean;
  language: Language;
  t: any;
}

const VisionForm: React.FC<VisionFormProps> = ({ data, onChange, onSubmit, isLoading, language, t }) => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const [customAtmosphere, setCustomAtmosphere] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isAssistantWorking, setIsAssistantWorking] = useState(false);
  
  // Sections state - Default Concept open
  const [openSections, setOpenSections] = useState({
      concept: true,
      typography: false,
      visual: false,
      photos: false
  });

  // Accordion Logic: Open selected, close others
  const toggleSection = (section: keyof typeof openSections) => {
      setOpenSections(prev => {
          const isCurrentlyOpen = prev[section];
          return {
              concept: section === 'concept' ? !isCurrentlyOpen : false,
              typography: section === 'typography' ? !isCurrentlyOpen : false,
              visual: section === 'visual' ? !isCurrentlyOpen : false,
              photos: section === 'photos' ? !isCurrentlyOpen : false
          };
      });
  };

  // Explicitly open a section (used for Next buttons)
  const openSection = (section: keyof typeof openSections) => {
    setOpenSections({
        concept: section === 'concept',
        typography: section === 'typography',
        visual: section === 'visual',
        photos: section === 'photos'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Logic to reset dependent fields
    if (name === 'collageTechnique' && value === CollageTechnique.NO_COLLAGE) {
         onChange({ ...data, [name]: value, collageArtist: CollageArtist.NO_ARTIST });
         return;
    }

    onChange({ ...data, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'referenceImage' | 'secondReferenceImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [fieldName]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (fieldName: 'referenceImage' | 'secondReferenceImage') => {
    onChange({ ...data, [fieldName]: undefined });
    if (fieldName === 'referenceImage' && fileInputRef1.current) fileInputRef1.current.value = '';
    if (fieldName === 'secondReferenceImage' && fileInputRef2.current) fileInputRef2.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  // Helper to translate options
  const getOptionLabel = (value: string) => {
    if (!value) return '';
    if (language === 'ru') return value;
    const translation = optionTranslations[value];
    if (translation && language === 'en') return translation.en;
    if (translation && language === 'ua') return translation.ua;
    return value;
  };

  // --- Style Grouping Logic (Memoized) ---
  const styleGroups = useMemo<Record<string, PosterStyle[]>>(() => ({
    [t.style_minimal]: [
        PosterStyle.TRUE_MINIMALISM, PosterStyle.JAPANDI, PosterStyle.ORGANIC_MINIMALISM,
        PosterStyle.SOFT_MINIMALISM, PosterStyle.MONOCHROME_MINIMAL, PosterStyle.SCANDINAVIAN,
        PosterStyle.WABI_SABI, PosterStyle.MINIMALIST_LINES, PosterStyle.BAUHAUS, PosterStyle.SURREAL_MINIMALISM
    ],
    [t.style_luxury]: [
        PosterStyle.OLD_MONEY, PosterStyle.VOGUE_EDITORIAL, PosterStyle.ROYAL_CORE, 
        PosterStyle.STREET_LUXE, PosterStyle.HIGH_TECH, PosterStyle.ART_DECO
    ],
    [t.style_art]: [
        PosterStyle.CLASSIC_OIL, PosterStyle.WATERCOLOR_DREAM, PosterStyle.SPIRITUAL_ART,
        PosterStyle.ETHEREAL
    ],
    [t.style_retro]: [
        PosterStyle.RETRO_FILM, PosterStyle.DARK_ACADEMIA, PosterStyle.NEO_NOIR,
        PosterStyle.VAPORWAVE, PosterStyle.GRUNGE_90S
    ],
    [t.style_fantasy]: [
        PosterStyle.BOHO_CHIC, PosterStyle.CYBER_FAIRY, PosterStyle.BARBIE_CORE,
        PosterStyle.COTTAGE_CORE, PosterStyle.SOFT_DREAM
    ]
  }), [t]);

  // --- Atmosphere Grouping Logic (Memoized) ---
  const atmosphereGroups = useMemo<Record<string, PosterBackground[]>>(() => ({
    [t.group_luxury]: [
        PosterBackground.LUXURY_VILLA, PosterBackground.PRIVATE_JET, PosterBackground.YACHT_LIFE, 
        PosterBackground.FASHION_RUNWAY, PosterBackground.INFINITY_POOL, PosterBackground.ROOF_PARTY, 
        PosterBackground.VINTAGE_CAR, PosterBackground.OPERA_HOUSE, PosterBackground.AMALFI_COAST,
        PosterBackground.NYC_LOFT, PosterBackground.PALACE_OF_VERSAILLES
    ],
    [t.group_minimal]: [
        PosterBackground.WHITE_CYCLORAMA, PosterBackground.BEIGE_PLASTER, PosterBackground.SHADOW_PLAY,
        PosterBackground.CONCRETE_MINIMAL, PosterBackground.FROSTED_GLASS, PosterBackground.CLEAR_SKY,
        PosterBackground.PAPER_SHEET, PosterBackground.SILK_DRAPE, PosterBackground.WATER_SURFACE
    ],
    [t.group_nature]: [
        PosterBackground.NATURE_RETREAT, PosterBackground.BEACH_CLUB, PosterBackground.DESERT_DUNES,
        PosterBackground.UNDERWATER_WORLD, PosterBackground.SNOWY_PEAK, PosterBackground.TROPICAL_JUNGLE,
        PosterBackground.ZEN_GARDEN
    ],
    [t.group_city]: [
        PosterBackground.CITY_LIGHTS, PosterBackground.PARIS_CAFE, PosterBackground.NEON_TOKYO,
        PosterBackground.MARS_COLONY, PosterBackground.CYBER_BUNKER
    ],
    [t.group_art]: [
        PosterBackground.ART_STUDIO, PosterBackground.COZY_HOME, PosterBackground.BOTANICAL_GARDEN,
        PosterBackground.ANCIENT_LIBRARY, PosterBackground.MUSEUM_GALLERY
    ],
    [t.group_abstract]: [
        PosterBackground.ABSTRACT_AURA, PosterBackground.COSMIC_VOID, PosterBackground.FLUID_MARBLE,
        PosterBackground.HOLOGRAPHIC_FOIL, PosterBackground.NOISE_GRADIENT, PosterBackground.GEOMETRIC_PATTERNS,
        PosterBackground.FLORAL_PATTERN, PosterBackground.SILK_TEXTURE, PosterBackground.GOLD_DUST,
        PosterBackground.PRISM_LIGHT, PosterBackground.SMOKE_MIST, PosterBackground.CHROME_LIQUID,
        PosterBackground.CRYSTAL_CAVE
    ]
  }), [t]);

  // --- Layout Grouping Logic (Memoized) ---
  const layoutGroups = useMemo<Record<string, CompositionLayout[]>>(() => ({
    [t.layout_classic]: [
        CompositionLayout.CLASSIC_MAGAZINE, CompositionLayout.MINIMAL_CORNER, 
        CompositionLayout.FRAME_BORDER, CompositionLayout.SPLIT_SCREEN,
        CompositionLayout.ELEGANT_SCRIPT, CompositionLayout.MINIMAL_SANS
    ],
    [t.layout_modern]: [
        CompositionLayout.SWISS_GRID, CompositionLayout.TYPOGRAPHIC_CENTER,
        CompositionLayout.BOLD_CONDENSED, CompositionLayout.MAGAZINE_BOTTOM
    ],
    [t.layout_artistic]: [
        CompositionLayout.CHAOTIC_PUNK, CompositionLayout.OVERLAPPING_LAYERS,
        CompositionLayout.SCATTERED_LETTERS, CompositionLayout.CIRCULAR_EMBLEM,
        CompositionLayout.DIAGONAL_DYNAMIC, CompositionLayout.TYPEWRITER_AESTHETIC
    ],
    [t.layout_experimental]: [
        CompositionLayout.TEXT_MASK, CompositionLayout.NEON_SIGN,
        CompositionLayout.VERTICAL_ORIENTAL, CompositionLayout.BARCODE_DATA
    ]
  }), [t]);

  const handleAtmosphereSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !data.atmosphere.includes(value)) {
      onChange({ ...data, atmosphere: [...data.atmosphere, value] });
    }
  };

  const handleCustomAtmosphereKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customAtmosphere.trim()) {
        const val = customAtmosphere.trim();
        if (!data.atmosphere.includes(val)) {
             onChange({ ...data, atmosphere: [...data.atmosphere, val] });
        }
        setCustomAtmosphere('');
      }
    }
  };

  const removeAtmosphere = (item: string) => {
    onChange({ ...data, atmosphere: data.atmosphere.filter(i => i !== item) });
  };

  // --- Random Magic Logic ---
  const handleRandomDetails = async () => {
    if (isSuggesting) return;
    setIsSuggesting(true);
    const suggested = await suggestCreativeDetails(data.theme, data.aesthetic, data.atmosphere);
    onChange({ ...data, keywords: suggested });
    setIsSuggesting(false);
  };

  // --- Assistant Logic ---
  const handleAssistant = async () => {
    if (isAssistantWorking) return;
    setIsAssistantWorking(true);
    // Open Concept and Visual for better visibility of changes
    setOpenSections({ 
        concept: true, 
        typography: false,
        visual: true,
        photos: false
    });
    
    // Fallback theme if empty
    const themeToUse = data.theme || PosterTheme.SELF_LOVE;
    
    const settings = await autoConfigureForm(themeToUse);
    
    onChange({
        ...data,
        theme: themeToUse,
        aesthetic: (settings.aesthetic as PosterStyle) || data.aesthetic,
        atmosphere: (settings.atmosphere as string[]) || data.atmosphere,
        lightEffect: (settings.lightEffect as LightEffect) || data.lightEffect,
        collageTechnique: (settings.collageTechnique as CollageTechnique) || data.collageTechnique,
        collageArtist: (settings.collageArtist as CollageArtist) || data.collageArtist,
        compositionLayout: (settings.compositionLayout as CompositionLayout) || data.compositionLayout,
        keywords: settings.keywords || data.keywords
    });
    setIsAssistantWorking(false);
  };

  const hasSelectedTokens = data.theme || data.aesthetic || data.atmosphere.length > 0;

  // Helper for Next Button
  const NextButton = ({ target, label }: { target: keyof typeof openSections, label?: string }) => (
    <button
        type="button"
        onClick={() => openSection(target)}
        className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-50 py-3 rounded-xl transition-colors border border-dashed border-stone-200"
    >
        {label || t.next_step || 'Next Step'} <ArrowRight size={14} />
    </button>
  );

  // Helper to get classes for the section container
  const getSectionContainerClass = (isOpen: boolean) => {
    return `border-b border-stone-100 transition-all duration-500 ease-in-out ${
        isOpen 
        ? 'bg-white rounded-3xl border shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border-gold-200/50 my-4 pb-2' 
        : 'bg-transparent border-transparent hover:bg-white/30 rounded-xl my-1'
    }`;
  };

  // Helper for the header styling
  const getHeaderClass = (isOpen: boolean) => {
      return `w-full flex items-center justify-between gap-2 transition-all duration-300 px-4 py-4 rounded-xl ${
          isOpen ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'
      }`;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/60 backdrop-blur-md p-4 md:p-6 rounded-[2.5rem] border border-stone-100 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.1)]">
      
      {/* Token Tape (Selected Items Summary) */}
      {hasSelectedTokens && (
        <div className="mb-6 space-y-2 animate-fade-in-up px-2">
            <div className="flex items-center gap-2 text-stone-400">
                <Sparkles size={12} />
                <span className="text-[10px] uppercase tracking-widest font-bold">{t.tokens_label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {/* Theme Chip */}
                {data.theme && (
                    <div className="bg-gold-100/50 border border-gold-200 text-gold-900 text-xs py-1 px-3 rounded-full flex items-center gap-1">
                        <span className="font-medium truncate max-w-[100px]">{getOptionLabel(data.theme)}</span>
                    </div>
                )}
                {/* Style Chip */}
                {data.aesthetic && (
                    <div className="bg-stone-100 border border-stone-200 text-stone-700 text-xs py-1 px-3 rounded-full flex items-center gap-1">
                        <span className="font-medium truncate max-w-[100px]">{getOptionLabel(data.aesthetic)}</span>
                    </div>
                )}
                {/* Atmosphere Chips */}
                {data.atmosphere.map((item, idx) => (
                    <button 
                        key={idx} 
                        type="button"
                        onClick={() => removeAtmosphere(item)}
                        className="bg-gold-300/10 border border-gold-300/30 text-stone-800 text-xs py-1 px-3 rounded-full flex items-center gap-1 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors group"
                    >
                        <span className="truncate max-w-[100px]">{getOptionLabel(item)}</span>
                        <X size={10} className="text-stone-400 group-hover:text-red-500" />
                    </button>
                ))}
            </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="font-sans">
        
        {/* Section: Theme (Concept) */}
        <div className={getSectionContainerClass(openSections.concept)}>
            <button
                type="button"
                onClick={() => toggleSection('concept')}
                className={getHeaderClass(openSections.concept)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${openSections.concept ? 'bg-gold-100/50 text-gold-600' : 'bg-transparent'}`}>
                        <LayoutTemplate size={18} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">{t.concept_label}</span>
                </div>
                 <div className="flex items-center gap-2">
                    {/* Assistant Button in Header */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAssistant();
                        }}
                        className={`cursor-pointer text-xs bg-gradient-to-r from-stone-800 to-stone-700 hover:from-stone-700 hover:to-stone-600 text-[#FDFBF7] px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-md ${isAssistantWorking ? 'opacity-70' : ''}`}
                    >
                        {isAssistantWorking ? (
                            <span className="animate-pulse">{t.assistant_generating}</span>
                        ) : (
                            <>
                                <Bot size={14} />
                                {t.assistant_btn}
                            </>
                        )}
                    </div>
                    <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${openSections.concept ? 'rotate-180 text-gold-400' : ''}`} 
                    />
                </div>
            </button>
          
            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openSections.concept ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0">
                        <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                        {t.theme_label}
                        </label>
                        <div className="relative">
                        <select
                            name="theme"
                            value={data.theme}
                            onChange={handleChange}
                            className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-5 py-4 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-sm font-medium"
                        >
                            <option value="" disabled>{t.select_placeholder}</option>
                            {Object.values(PosterTheme).map((theme) => (
                            <option key={theme} value={theme}>{getOptionLabel(theme)}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                            <ChevronDown size={14} />
                        </div>
                        </div>
                        
                        {/* Next Button */}
                        <NextButton target="typography" />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Typography */}
        <div className={getSectionContainerClass(openSections.typography)}>
           <button
             type="button"
             onClick={() => toggleSection('typography')}
             className={getHeaderClass(openSections.typography)}
           >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${openSections.typography ? 'bg-gold-100/50 text-gold-600' : 'bg-transparent'}`}>
                        <Type size={18} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">{t.text_label}</span>
                </div>
                <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${openSections.typography ? 'rotate-180 text-gold-400' : ''}`} 
                />
           </button>

            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openSections.typography ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0 space-y-4">
                        {/* Typography Layout Selector (Grouped) */}
                        <div>
                            <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                            {t.text_layout_label}
                            </label>
                            <div className="relative">
                            <select
                                name="compositionLayout"
                                value={data.compositionLayout}
                                onChange={handleChange}
                                className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs"
                            >
                                {Object.entries(layoutGroups).map(([groupLabel, items]) => (
                                    <optgroup key={groupLabel} label={groupLabel}>
                                        {(items as CompositionLayout[]).map((layout) => (
                                            <option key={layout} value={layout}>{getOptionLabel(layout)}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                <ChevronDown size={14} />
                            </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            {/* Top Caption */}
                            <input
                                type="text"
                                name="textTop"
                                value={data.textTop || ''}
                                onChange={handleChange}
                                placeholder={t.text_top_placeholder}
                                className="w-full text-center bg-[#FDFBF7] border-b border-stone-100 px-4 py-2 text-stone-500 text-xs tracking-widest uppercase placeholder-stone-300 focus:outline-none focus:border-gold-200 transition-all"
                            />
                            
                            {/* Main Headline */}
                            <input
                                type="text"
                                name="mainText"
                                value={data.mainText || ''}
                                onChange={handleChange}
                                placeholder={t.text_main_placeholder}
                                className="w-full text-center bg-[#FDFBF7] border border-stone-200 rounded-xl px-5 py-3 text-stone-900 font-serif text-lg placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all"
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                                {/* Secondary Headline (Headline 2) */}
                                <input
                                    type="text"
                                    name="secondaryText"
                                    value={data.secondaryText || ''}
                                    onChange={handleChange}
                                    placeholder={t.text_secondary_placeholder}
                                    className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2 text-stone-700 italic font-serif text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all"
                                />
                                
                                {/* Subtitle */}
                                <input
                                    type="text"
                                    name="subText"
                                    value={data.subText || ''}
                                    onChange={handleChange}
                                    placeholder={t.text_sub_placeholder}
                                    className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2 text-stone-700 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all"
                                />
                            </div>
                            
                            {/* Bottom Caption */}
                            <input
                                type="text"
                                name="textBottom"
                                value={data.textBottom || ''}
                                onChange={handleChange}
                                placeholder={t.text_bottom_placeholder}
                                className="w-full text-center bg-[#FDFBF7] border-t border-stone-100 px-4 py-2 text-stone-500 text-[10px] tracking-widest uppercase placeholder-stone-300 focus:outline-none focus:border-gold-200 transition-all"
                            />
                        </div>

                        <NextButton target="visual" />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Style & Atmosphere */}
        <div className={getSectionContainerClass(openSections.visual)}>
           <button
             type="button"
             onClick={() => toggleSection('visual')}
             className={getHeaderClass(openSections.visual)}
           >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${openSections.visual ? 'bg-gold-100/50 text-gold-600' : 'bg-transparent'}`}>
                        <Wand2 size={18} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">{t.visual_label}</span>
                </div>
                <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${openSections.visual ? 'rotate-180 text-gold-400' : ''}`} 
                />
           </button>

            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openSections.visual ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0 space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                                {t.style_label}
                                </label>
                                <div className="relative">
                                <select
                                    name="aesthetic"
                                    value={data.aesthetic}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs"
                                >
                                    <option value="" disabled>{t.select_placeholder}</option>
                                    {/* Grouped Styles */}
                                    {Object.entries(styleGroups).map(([groupLabel, items]) => (
                                        <optgroup key={groupLabel} label={groupLabel}>
                                            {(items as PosterStyle[]).map((style) => (
                                                <option key={style} value={style}>{getOptionLabel(style)}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                    <ChevronDown size={14} />
                                </div>
                                </div>
                            </div>

                            {/* Multi-Select Atmosphere with Grouping */}
                            <div>
                                <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                                {t.atmosphere_label}
                                </label>
                                <div className="space-y-2">
                                    {/* Presets Dropdown - Controlled to always reset */}
                                    <div className="relative">
                                        <select
                                            onChange={handleAtmosphereSelect}
                                            value=""
                                            className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs"
                                        >
                                            <option value="" disabled>{t.atmosphere_placeholder}</option>
                                            
                                            {/* Render OptGroups */}
                                            {Object.entries(atmosphereGroups).map(([groupLabel, items]) => (
                                                <optgroup key={groupLabel} label={groupLabel}>
                                                    {(items as PosterBackground[]).map((bg) => (
                                                        <option key={bg} value={bg}>{getOptionLabel(bg)}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                            
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                            <Plus size={14} />
                                        </div>
                                    </div>
                                    
                                    {/* Custom Input */}
                                    <input
                                        type="text"
                                        value={customAtmosphere}
                                        onChange={(e) => setCustomAtmosphere(e.target.value)}
                                        onKeyDown={handleCustomAtmosphereKeyDown}
                                        placeholder={t.atmosphere_placeholder}
                                        className="w-full bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-2 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Light Effects */}
                            <div>
                                <label className="block text-stone-500 text-xs font-medium mb-2 ml-2 flex items-center gap-1.5">
                                <Sun size={12} className="text-gold-400" />
                                {t.light_label}
                                </label>
                                <div className="relative">
                                <select
                                    name="lightEffect"
                                    value={data.lightEffect}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs"
                                >
                                    {Object.values(LightEffect).map((effect) => (
                                    <option key={effect} value={effect}>{getOptionLabel(effect)}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                    <ChevronDown size={14} />
                                </div>
                                </div>
                            </div>

                        </div>

                        {/* Collage Technique Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-2 ml-2 pr-2">
                                <div className="flex items-center gap-1.5">
                                    <Scissors size={12} className="text-stone-400" />
                                    <label className="block text-stone-500 text-xs font-medium">
                                    {t.collage_label}
                                    </label>
                                </div>
                                {data.collageTechnique !== CollageTechnique.NO_COLLAGE && (
                                    <button 
                                        type="button" 
                                        onClick={() => onChange({ ...data, collageTechnique: CollageTechnique.NO_COLLAGE, collageArtist: CollageArtist.NO_ARTIST })}
                                        className="text-[10px] text-red-400 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                                    >
                                        <Trash2 size={10} />
                                        {t.collage_disable}
                                    </button>
                                )}
                            </div>
                            
                            <div className="relative mb-3">
                                <select
                                name="collageTechnique"
                                value={data.collageTechnique}
                                onChange={handleChange}
                                className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs font-medium"
                                >
                                {Object.values(CollageTechnique).map((tech, index) => (
                                    <option key={tech} value={tech}>
                                        {index === 0 ? t.collage_none : `${tech}`}
                                    </option>
                                ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>

                            {/* Collage Artist Selector (New) */}
                            {data.collageTechnique !== CollageTechnique.NO_COLLAGE && (
                                <div className="relative animate-fade-in-up">
                                    <label className="block text-stone-500 text-xs font-medium mb-1 ml-2 flex items-center gap-1">
                                        <Palette size={10} />
                                        {t.collage_artist_label}
                                    </label>
                                    <select
                                    name="collageArtist"
                                    value={data.collageArtist}
                                    onChange={handleChange}
                                    className="w-full appearance-none bg-[#FDFBF7] border border-stone-200 rounded-2xl px-4 py-2 text-stone-600 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all cursor-pointer text-xs"
                                    >
                                    {Object.values(CollageArtist).map((artist) => (
                                        <option key={artist} value={artist}>{getOptionLabel(artist)}</option>
                                    ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400 top-5">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Keywords with Random Button */}
                        <div>
                            <div className="flex items-center justify-between mb-2 ml-2 pr-2">
                                <label className="block text-stone-500 text-xs font-medium">
                                {t.keywords_label}
                                </label>
                                <button
                                    type="button"
                                    onClick={handleRandomDetails}
                                    disabled={isSuggesting}
                                    className="text-[10px] bg-gold-100 hover:bg-gold-200 text-gold-800 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors disabled:opacity-50"
                                >
                                    <Sparkles size={10} />
                                    {isSuggesting ? '...' : t.random_btn}
                                </button>
                            </div>
                            <input
                            type="text"
                            name="keywords"
                            value={data.keywords}
                            onChange={handleChange}
                            placeholder={t.keywords_placeholder}
                            className="w-full bg-[#FDFBF7] border border-stone-200 rounded-2xl px-5 py-3 text-stone-800 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-200 focus:border-transparent transition-all"
                            />
                        </div>

                        <NextButton target="photos" />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Ratio & Ref */}
        <div className={getSectionContainerClass(openSections.photos)}>
            <button
                type="button"
                onClick={() => toggleSection('photos')}
                className={getHeaderClass(openSections.photos)}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full transition-colors ${openSections.photos ? 'bg-gold-100/50 text-gold-600' : 'bg-transparent'}`}>
                        <ImagePlus size={18} />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">{t.photo_label}</span>
                </div>
                <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${openSections.photos ? 'rotate-180 text-gold-400' : ''}`} 
                />
           </button>
          
            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${openSections.photos ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-0">
                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {Object.values(AspectRatio).map((ratio) => (
                            <button
                                key={ratio}
                                type="button"
                                onClick={() => onChange({ ...data, aspectRatio: ratio })}
                                className={`py-2 rounded-xl text-[10px] md:text-xs font-medium transition-all ${
                                data.aspectRatio === ratio
                                    ? 'bg-gold-200 text-stone-800 ring-2 ring-gold-300 ring-offset-1'
                                    : 'bg-[#FDFBF7] text-stone-600 border border-stone-200 hover:border-gold-200'
                                }`}
                            >
                                {ratio}
                            </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Reference 1 */}
                            <div>
                                <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                                {t.hero1_label}
                                </label>
                                {!data.referenceImage ? (
                                <div 
                                    onClick={() => fileInputRef1.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold-400 hover:bg-gold-50/50 transition-all group p-4 text-center"
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef1}
                                        onChange={(e) => handleFileChange(e, 'referenceImage')} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                    <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <User className="text-stone-400 group-hover:text-gold-400 transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-stone-600 text-xs font-medium group-hover:text-stone-800 transition-colors">{t.hero1_upload}</span>
                                        <span className="block text-stone-400 text-[10px] mt-1">{t.hero1_sub}</span>
                                    </div>
                                </div>
                                ) : (
                                <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-stone-200 group shadow-md">
                                    <img 
                                    src={data.referenceImage} 
                                    alt="Reference" 
                                    className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />
                                    <button 
                                    type="button"
                                    onClick={() => clearImage('referenceImage')}
                                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-gold-100 text-stone-600 transition-colors shadow-sm"
                                    >
                                    <X size={14} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-[10px] text-stone-800 font-medium shadow-sm flex items-center gap-1">
                                    <User size={10} />
                                    Герой 1
                                    </div>
                                </div>
                                )}
                            </div>

                            {/* Reference 2 */}
                            <div>
                                <label className="block text-stone-500 text-xs font-medium mb-2 ml-2">
                                {t.hero2_label}
                                </label>
                                {!data.secondReferenceImage ? (
                                <div 
                                    onClick={() => fileInputRef2.current?.click()}
                                    className="w-full h-32 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gold-400 hover:bg-gold-50/50 transition-all group p-4 text-center"
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef2}
                                        onChange={(e) => handleFileChange(e, 'secondReferenceImage')} 
                                        accept="image/*" 
                                        className="hidden" 
                                    />
                                    <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <UserPlus className="text-stone-400 group-hover:text-gold-400 transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-stone-600 text-xs font-medium group-hover:text-stone-800 transition-colors">{t.hero2_upload}</span>
                                        <span className="block text-stone-400 text-[10px] mt-1">{t.hero2_sub}</span>
                                    </div>
                                </div>
                                ) : (
                                <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-stone-200 group shadow-md">
                                    <img 
                                    src={data.secondReferenceImage} 
                                    alt="Second Reference" 
                                    className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors" />
                                    <button 
                                    type="button"
                                    onClick={() => clearImage('secondReferenceImage')}
                                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-gold-100 text-stone-600 transition-colors shadow-sm"
                                    >
                                    <X size={14} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-lg text-[10px] text-stone-800 font-medium shadow-sm flex items-center gap-1">
                                    <UserPlus size={10} />
                                    Герой 2
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isAssistantWorking}
          className="w-full mt-4 bg-stone-800 hover:bg-stone-700 text-[#FDFBF7] font-serif italic text-lg py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            t.btn_generating
          ) : isAssistantWorking ? (
            t.assistant_generating
          ) : (
            <>
              <span>{t.btn_generate}</span>
              <Wand2 size={18} className="group-hover:rotate-12 transition-transform" />
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default VisionForm;
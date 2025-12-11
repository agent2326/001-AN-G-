

export type Language = 'ru' | 'ua' | 'en';

export enum PosterTheme {
  SELF_LOVE = 'Любовь к себе & Самоценность',
  ABUNDANCE = 'Финансовое Изобилие & Роскошь',
  TRAVEL = 'Путешествия & Свобода',
  CAREER = 'Карьера & Личный Бренд',
  RELATIONSHIPS = 'Отношения & Любовь',
  HEALTH = 'Здоровье & Тело (Wellness)',
  CREATIVITY = 'Творчество & Поток',
  NEW_ERA = 'Новая Эра (Manifestation)',
  BALANCE = 'Баланс & Спокойствие',
  ENERGY = 'Энергия & Ресурс',
  CONFIDENCE = 'Уверенность & Сила',
  DREAMS = 'Мечты & Визуализация',
  // New
  DARK_FEMININE = 'Dark Feminine Energy (Роковая, Магнетизм)',
  LIGHT_FEMININE = 'Light Feminine Energy (Нежность, Забота)',
  HIGH_PRIESTESS = 'High Priestess (Интуиция, Магия, Таро)',
  QUANTUM_LEAP = 'Quantum Leap (Квантовый Скачок)',
  BOSS_ENERGY = 'Boss Energy (Лидерство, Власть)',
  MOTHERHOOD = 'Motherhood (Материнство, Создание)',
  MINDFULNESS = 'Mindfulness (Осознанность, Дзен)',
  LUXURY_LIFESTYLE = 'Luxury Lifestyle (Гедонизм, Комфорт)'
}

export enum CollageTechnique {
  NO_COLLAGE = 'Без коллажа (Classic Photo)',
  PAINT_OVERLAY = 'Paint Overlay (Мазки краски поверх фото)',
  GOLD_LEAF = 'Gold Leaf & Kintsugi (Золотая поталь, сусальное золото)',
  OUTLINE_DRAWING = 'Outline & Doodles (Обводка линий, дудлы)',
  CUT_OUT = 'Cut-Out / Paper Cut',
  PHOTO_MASHUP = 'Photo Mashup',
  DIGITAL_SCRAPBOOK = 'Digital Scrapbook',
  NEO_VINTAGE = 'Neo-Vintage Collage',
  SURREAL = 'Surreal Collage',
  MINIMAL_CUT = 'Minimal Cut Composition',
  GLITCH = 'Glitch Collage',
  BRUTALISM = 'Brutalism Collage',
  CUT_FRAME = 'Cut-Frame Collage',
  MIXED_MEDIA = 'Mixed Media Collage',
  POP_ART = 'Pop-Art Collage',
  EDITORIAL = 'Editorial Collage',
  GRUNGE = 'Grunge Collage',
  DADA = 'Dada Collage',
  RETRO_FUTURISM = 'Retro-Futurism Collage',
  ACID_GRAPHIC = 'Acid Graphic Collage',
  HYPERPOP = 'Hyperpop Collage',
  ABSTRACT_GEO = 'Abstract Geometric Collage',
  MONOCHROME = 'Monochrome Collage',
  THREE_D_MIX = '3D Render + Photo Collage',
  RIPPED_PAPER = 'Ripped Paper Edges (Рваные края бумаги)',
  SCOTCH_TAPE = 'Scotch Tape Overlay (Скотч, пленка)',
  POLAROID_SCATTER = 'Polaroid Scatter (Рассыпанные полароиды)',
  RANSOM_NOTE = 'Ransom Note Text (Буквы из газет)',
  DOUBLE_EXPOSURE = 'Double Exposure (Двойная экспозиция)',
  HALFTONE_DOTS = 'Halftone Dots (Газетная печать, точки)',
  VHS_GLITCH = 'VHS Glitch (Помехи, сдвиг каналов, шум)',
  STENCIL_ART = 'Stencil Art (Трафареты, краска)',
  CRUMPLED_PAPER = 'Crumpled Paper Texture (Помятая бумага)',
  NEGATIVE_SPACE = 'Negative Space Cut (Вырезанные силуэты)',
  FABRIC_PATCHWORK = 'Fabric Patchwork (Ткань, швы, лоскуты)',
  KINTSUGI_GOLD = 'Kintsugi Gold (Золотые трещины)',
  BLUEPRINT_SKETCH = 'Blueprint & Sketch (Чертежи, наброски)',
  XRAY_VISION = 'X-Ray Vision (Рентген эффект)',
  PIXEL_SORTING = 'Pixel Sorting (Растягивание пикселей)',
  SCANNER_DISTORTION = 'Scanner Distortion (Искажение сканера)',
  STICKER_BOMB = 'Sticker Bomb (Много стикеров)',
  HAND_DRAWN_DOODLES = 'Hand Drawn Doodles (Рисунки поверх фото)',
  TYPOGRAPHIC_PORTRAIT = 'Typographic Portrait (Портрет из текста)',
  PHOTO_MOSAIC = 'Photo Mosaic (Мозаика из фото)'
}

export enum CollageArtist {
  NO_ARTIST = 'Без привязки к автору',
  // Classic & Dada
  HANNAH_HOCH = 'Hannah Höch (Дадаизм, винтаж, странные фигуры)',
  RAOUL_HAUSMANN = 'Raoul Hausmann (Фотомонтаж, механика)',
  MAN_RAY = 'Man Ray (Сюрреализм, рейография)',
  HENRI_MATISSE = 'Henri Matisse (Декупаж, яркие вырезки)',
  // Modern & Pop
  ANDY_WARHOL = 'Andy Warhol (Поп-арт, шелкография, повторения)',
  BARBARA_KRUGER = 'Barbara Kruger (Красный фон, белый текст, лозунги)',
  DAVID_CARSON = 'David Carson (Гранж, сломанная типографика)',
  TERRY_GILLIAM = 'Terry Gilliam (Монти Пайтон, сюрреалистичная анимация)',
  // Contemporary
  EUGENIA_LOLI = 'Eugenia Loli (Винтаж + Космос, поп-сюрреализм)',
  JOE_WEBB = 'Joe Webb (Аналоговый коллаж, космос, ретро)',
  BETH_HOECKEL = 'Beth Hoeckel (Пейзажи, люди на краю)',
  FRANK_MOTH = 'Frank Moth (Ретро-футуризм, цветы, неон)'
}

export enum LightEffect {
  NO_EFFECT = 'Без доп. эффектов',
  // Cinematic / Movie
  GOD_RAYS = 'God Rays (Солнечные лучи, объёмный свет)',
  ANAMORPHIC_FLARE = 'Anamorphic Lens Flare (Синие горизонтальные блики, кино)',
  VOLUMETRIC_FOG = 'Volumetric Fog & Haze (Объемный туман, загадочность)',
  REMBRANDT = 'Rembrandt Lighting (Классический свет, тени, драма)',
  FILM_NOIR = 'Film Noir Shadows (Жалюзи, жесткие тени, ЧБ эстетика)',
  DOUBLE_COLOR = 'Double Color Exposure (Синий + Красный свет)',
  // Aesthetic
  PRISM_REFRACTION = 'Prism Refraction (Радужные блики, призма)',
  LIGHT_LEAKS = 'Film Light Leaks (Засветы пленки, оранжевые блики)',
  GOLDEN_HOUR = 'Golden Hour Glow (Золотой закатный свет)',
  NEON_HALO = 'Neon Halo (Неоновое свечение, контурный свет)',
  DREAMY_HAZE = 'Dreamy Haze (Мягкая дымка, эффект сна)',
  SPARKLES_GLITTER = 'Sparkles & Glitter (Блестки, сияние, боке)',
  STUDIO_SPOTLIGHT = 'Studio Spotlight (Жесткий свет прожектора)',
  CHROMATIC_ABERRATION = 'Chromatic Aberration (Сдвиг цветов, 3D эффект)',
  VINTAGE_GRAIN = 'Heavy Film Grain (Зернистость, шум)'
}

export enum CompositionLayout {
  // Classic
  CLASSIC_MAGAZINE = 'Classic Vogue Cover (Текст поверх героя)',
  MINIMAL_CORNER = 'Minimal Corner (Текст мелко в углу)',
  FRAME_BORDER = 'Frame & Border (Текст в рамке вокруг фото)',
  SPLIT_SCREEN = 'Split Screen (Фото / Текст)',
  ELEGANT_SCRIPT = 'Elegant Script Overlay (Рукописный текст поверх)',
  MINIMAL_SANS = 'Minimal Clean Sans (Чистый гротеск)',

  // Modern & Bold
  SWISS_GRID = 'Swiss Grid (Сетка, модерн, чистота)',
  TYPOGRAPHIC_CENTER = 'Big Bold Center (Текст - главный герой)',
  BOLD_CONDENSED = 'Bold Condensed (Узкий жирный шрифт, плакат)',
  MAGAZINE_BOTTOM = 'Magazine Headline Bottom (Заголовок внизу)',
  
  // Artistic
  CHAOTIC_PUNK = 'Chaotic Punk (Текст разбросан)',
  OVERLAPPING_LAYERS = 'Overlapping Layers (Текст за и перед объектом)',
  SCATTERED_LETTERS = 'Scattered Letters (Буквы разлетаются)',
  CIRCULAR_EMBLEM = 'Circular Text (Текст по кругу)',
  DIAGONAL_DYNAMIC = 'Diagonal Dynamic (Текст по диагонали)',
  TYPEWRITER_AESTHETIC = 'Typewriter Style (Печатная машинка)',
  
  // Experimental
  TEXT_MASK = 'Text Mask (Фото внутри букв)',
  NEON_SIGN = 'Neon Sign Typography (Светящийся неон)',
  VERTICAL_ORIENTAL = 'Vertical Oriental (Вертикальный столбец)',
  BARCODE_DATA = 'Barcode & Technical Data (Технические надписи)'
}

export enum PosterStyle {
  // Luxury & Fashion
  OLD_MONEY = 'Old Money (Роскошь, минимализм, бежевый)',
  VOGUE_EDITORIAL = 'Vogue Editorial (Глянец, fashion-позы, контраст)',
  ROYAL_CORE = 'Royal Core (Золото, барокко, дворцы)',
  STREET_LUXE = 'Street Luxe (Стритвир, граффити, бетон, высокая мода)',
  HIGH_TECH = 'High-Tech Future (Стекло, металл, голограммы, чистота)',
  ART_DECO = 'Art Deco (Геометрия, золото, 20-е годы, джаз)',

  // Minimalism & Clean (Expanded)
  TRUE_MINIMALISM = 'True Minimalism (Чистота, пустота, воздух)',
  JAPANDI = 'Japandi (Япония + Скандинавия, дерево, камень)',
  ORGANIC_MINIMALISM = 'Organic Minimalism (Органические формы, природа)',
  SOFT_MINIMALISM = 'Soft Minimalism (Теплые тона, уют, мягкий свет)',
  MONOCHROME_MINIMAL = 'Monochrome Minimal (Один цвет, текстуры)',
  SCANDINAVIAN = 'Scandinavian (Светлое дерево, простота, уют)',
  WABI_SABI = 'Wabi-Sabi (Несовершенство, земляные тона, текстура)',
  MINIMALIST_LINES = 'Minimalist Line Art (Линии, абстракция, чистота)',
  BAUHAUS = 'Bauhaus (Геометрия, функция, основные цвета)',
  SURREAL_MINIMALISM = 'Surreal Minimalism (Парящие объекты, пустыня, чистота)',

  // Art & Abstract
  CLASSIC_OIL = 'Classic Oil Painting (Мазки кисти, холст, классика)',
  WATERCOLOR_DREAM = 'Watercolor Dream (Акварель, потеки, легкость)',
  SPIRITUAL_ART = 'Spiritual Art (Аура, кристаллы, космос, градиенты)',
  ETHEREAL = 'Ethereal (Эфирный, сказочный, дымка, ангелы)',
  
  // Retro & Vintage
  RETRO_FILM = 'Retro Film (Пленка 90-х, зерно, теплый свет)',
  DARK_ACADEMIA = 'Dark Academia (Библиотека, твид, осень, тайны)',
  NEO_NOIR = 'Neo-Noir (Контраст, тени, неон, дождь)',
  VAPORWAVE = 'Vaporwave (80-е, пальмы, градиенты, статуи)',
  GRUNGE_90S = '90s Grunge (Потертости, клетка, небрежность)',

  // Fantasy & Nature
  BOHO_CHIC = 'Boho Chic (Бали, природа, свобода)',
  CYBER_FAIRY = 'Cyber Fairy (Y2K, неон, цифровое искусство)',
  BARBIE_CORE = 'Barbie Core (Ярко-розовый, гламур, пластик)',
  COTTAGE_CORE = 'Cottage Core (Полевые цветы, пикник, уют, лето)',
  SOFT_DREAM = 'Soft Dream (Пастель, облака, нежность)'
}

export enum PosterBackground {
  LUXURY_VILLA = 'Luxury Villa (Интерьеры, мрамор, бассейн)',
  NATURE_RETREAT = 'Nature Retreat (Лес, горы, озеро)',
  CITY_LIGHTS = 'City Lights (Небоскребы, огни, движение)',
  ART_STUDIO = 'Art Studio (Холсты, краски, творческий беспорядок)',
  COZY_HOME = 'Cozy Home (Камин, книги, плед)',
  BEACH_CLUB = 'Beach Club (Море, песок, закат)',
  PARIS_CAFE = 'Paris Cafe (Уличное кафе, цветы, архитектура)',
  DESERT_DUNES = 'Desert Dunes (Пустыня, закат, песок)',
  BOTANICAL_GARDEN = 'Botanical Garden (Оранжерея, зелень, стекло)',
  PRIVATE_JET = 'Private Jet (Кожаный салон, иллюминатор, небо)',
  YACHT_LIFE = 'Yacht Life (Океан, палуба, белый цвет)',
  ANCIENT_LIBRARY = 'Ancient Library (Книжные полки, пыль, свитки)',
  FASHION_RUNWAY = 'Fashion Runway (Подиум, софиты, вспышки)',
  INFINITY_POOL = 'Infinity Pool (Бассейн без края, горизонт)',
  NEON_TOKYO = 'Neon Tokyo (Киберпанк город, дождь, вывески)',
  ROOF_PARTY = 'Roof Party (Крыша небоскреба, вечеринка, ночь)',
  UNDERWATER_WORLD = 'Underwater World (Рифы, лучи света, пузырьки)',
  MARS_COLONY = 'Mars Colony (Красный песок, футуризм, купола)',
  CRYSTAL_CAVE = 'Crystal Cave (Кристаллы, свечение, пещера)',
  VINTAGE_CAR = 'Vintage Car Interior (Кожа, руль, ретро панель)',
  OPERA_HOUSE = 'Opera House (Театр, бархат, ложа, люстра)',
  SNOWY_PEAK = 'Snowy Peak (Горы, снег, чистое небо, солнце)',
  
  // New Locations
  AMALFI_COAST = 'Amalfi Coast (Италия, лимоны, море, скалы)',
  NYC_LOFT = 'NYC Loft (Кирпич, большие окна, индустриальный шик)',
  ZEN_GARDEN = 'Zen Garden (Бонсай, камни, песок, гармония)',
  CYBER_BUNKER = 'Cyber Bunker (Бетон, серверы, неон, провода)',
  PALACE_OF_VERSAILLES = 'Versailles Palace (Зеркала, золото, рококо)',
  MUSEUM_GALLERY = 'Modern Art Gallery (Белые стены, минимализм)',
  TROPICAL_JUNGLE = 'Tropical Jungle (Лианы, водопад, экзотика)',
  
  // Abstracts & Patterns
  ABSTRACT_AURA = 'Abstract Aura (Градиенты, размытие, цветной свет)',
  COSMIC_VOID = 'Cosmic Void (Космос, звезды, туманности)',
  FLUID_MARBLE = 'Fluid Marble (Жидкий мрамор, разводы краски)',
  HOLOGRAPHIC_FOIL = 'Holographic Foil (Голография, переливы, металл)',
  NOISE_GRADIENT = 'Noise Gradient (Зернистый градиент, шум)',
  GEOMETRIC_PATTERNS = 'Geometric Patterns (Линии, фигуры, сетка)',
  FLORAL_PATTERN = 'Floral Pattern (Обои, много цветов, паттерн)',
  SILK_TEXTURE = 'Silk & Satin (Шелк, складки ткани, блеск)',
  GOLD_DUST = 'Gold Dust Overlay (Золотая пыль, боке)',
  PRISM_LIGHT = 'Prism Light (Преломление света, радуга)',
  SMOKE_MIST = 'Smoke & Mist (Дым, туман, таинственность)',
  CHROME_LIQUID = 'Chrome Liquid (Жидкий хром, 3D металл)',

  // Minimalist & Clean
  WHITE_CYCLORAMA = 'White Cyclorama (Белый фон, студия, воздух)',
  BEIGE_PLASTER = 'Beige Plaster (Бежевая штукатурка, тепло)',
  SHADOW_PLAY = 'Shadow Play (Тени растений на стене)',
  CONCRETE_MINIMAL = 'Concrete Minimal (Серый бетон, чистота)',
  FROSTED_GLASS = 'Frosted Glass (Матовое стекло, размытие)',
  CLEAR_SKY = 'Clear Sky (Чистое небо, градиент, свобода)',
  PAPER_SHEET = 'Clean Paper (Лист бумаги, текстура)',
  SILK_DRAPE = 'Silk Drape (Шелковая ткань, складки)',
  WATER_SURFACE = 'Water Surface (Гладь воды, спокойствие)'
}

export enum AspectRatio {
  SQUARE = '1:1',
  PORTRAIT = '3:4',
  LANDSCAPE = '4:3',
  STORY = '9:16',
  CINEMATIC = '16:9'
}

export interface VisionFormData {
  textTop?: string;       
  mainText?: string;      
  secondaryText?: string; 
  subText?: string;       
  textBottom?: string;    
  tagline?: string;       
  compositionLayout: CompositionLayout; // New

  theme: PosterTheme;
  collageTechnique: CollageTechnique;
  collageArtist: CollageArtist; // New
  keywords: string;
  aesthetic: PosterStyle;
  atmosphere: string[];
  lightEffect: LightEffect;
  aspectRatio: AspectRatio;
  referenceImage?: string;
  secondReferenceImage?: string;
}
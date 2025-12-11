import { GoogleGenAI, Type } from "@google/genai";
import { VisionFormData, CollageTechnique, LightEffect, PosterTheme, PosterStyle, PosterBackground, CollageArtist, CompositionLayout } from "../types";

// Helper to get a fresh AI instance
const getAiInstance = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVisionBoard = async (data: VisionFormData): Promise<{ image: string; prompt: string }> => {
  try {
    const ai = getAiInstance();
    const isCollage = data.collageTechnique !== CollageTechnique.NO_COLLAGE;
    
    // Combine atmosphere array into a string description
    const atmosphereDesc = data.atmosphere.length > 0 ? data.atmosphere.join(", ") : "Neutral, clean studio background";
    
    // Fallbacks for empty fields if user didn't select them
    const themeToUse = data.theme || "Aesthetic Art & Inspiration";
    const aestheticToUse = data.aesthetic || "Modern Minimalist Luxury";

    // Determine lighting instruction based on LightEffect enum
    const lightInstruction = data.lightEffect !== LightEffect.NO_EFFECT 
        ? `LIGHTING & FX OVERLAY (CRITICAL): Apply the "${data.lightEffect}" effect prominently. 
           Ensure the lighting enhances the mood and blends organically with the composition.`
        : `LIGHTING: Cinematic, volumetric, or studio lighting matching the atmosphere.`;

    // Artist Reference Instruction
    const artistInstruction = data.collageArtist !== CollageArtist.NO_ARTIST 
        ? `ARTIST STYLE REFERENCE: Channel the visual style of ${data.collageArtist}. Copy their signature composition, color grading, and texture usage.`
        : '';

    // Specific Collage Instructions
    let specificTechniqueDetails = "";
    if (data.collageTechnique === CollageTechnique.PAINT_OVERLAY) {
        specificTechniqueDetails = "Use bold ACRYLIC BRUSH STROKES or OIL PAINT textures painted DIRECTLY OVER the photograph. The strokes should be expressive, artistic, and partially cover or frame the subject.";
    } else if (data.collageTechnique === CollageTechnique.GOLD_LEAF) {
        specificTechniqueDetails = "Apply GOLD LEAF (Kintsugi style) textures, golden cracks, and metallic foil overlays on top of the image. The gold should look realistic and reflective.";
    } else if (data.collageTechnique === CollageTechnique.OUTLINE_DRAWING) {
        specificTechniqueDetails = "Add HAND-DRAWN WHITE OUTLINES, doodles, and sketches over the photo. The style should be like a fashion illustration or diary sketch overlay.";
    }

    // Optimized English instructions for Art Direction
    const techniqueInstruction = isCollage 
      ? `ARTISTIC TECHNIQUE: SOPHISTICATED COLLAGE & MIXED MEDIA (${data.collageTechnique}).
         - INSTRUCTION: Create a high-fashion collage. Use layering, texture blending, ripped paper edges, tape overlays, or digital glitch effects as specified by the technique.
         - SPECIFIC DETAILS: ${specificTechniqueDetails}
         - ARTIST REFERENCE: ${artistInstruction}
         - COMPOSITION: Abstract yet balanced. Combine elements artistically, avoiding a simple "cut and paste" look. Aim for a gallery-quality contemporary art piece.`
      : `ARTISTIC TECHNIQUE: HIGH-END CINEMATIC PHOTOGRAPHY or HYPER-REALISTIC 3D ART.
         - INSTRUCTION: Do NOT create a collage. Create a seamless, single-scene composition with depth of field, realistic lighting, and consistent texture.
         - VIBE: Editorial fashion shot or luxury lifestyle photography.`;

    // Typography Logic
    const hasText = (data.mainText?.trim() || data.subText?.trim() || data.textTop?.trim() || data.textBottom?.trim() || data.secondaryText?.trim() || data.tagline?.trim());

    // Layout Instruction
    const layoutInstruction = `TEXT COMPOSITION LAYOUT: ${data.compositionLayout}. 
    Make the typography part of the art. Do not just place it randomly. 
    Follow the rules of this layout style strictly.`;

    const typographyInstruction = hasText 
      ? `
      2. TYPOGRAPHY (STRICT REQUIREMENT):
         - YOU MUST RENDER THE FOLLOWING TEXT EXACTLY AS WRITTEN.
         - The text must be legible, stylish, and integrated into the artwork (not just floating on top).
         - ${layoutInstruction}
         
         TEXT LAYOUT:
         ${data.textTop ? `- TOP CAPTION (Small, centered at very top): "${data.textTop}"` : ''}
         ${data.mainText ? `- MAIN HEADLINE 1 (Large, Prominent, Elegant Serif/Display): "${data.mainText}"` : ''}
         ${data.secondaryText ? `- HEADLINE 2 (Medium, Artistic/Script or Contrast Font): "${data.secondaryText}"` : ''}
         ${data.subText ? `- SUBTITLE (Clean Sans-Serif, smaller): "${data.subText}"` : ''}
         ${data.textBottom ? `- BOTTOM CAPTION (Minimalist, footer/date): "${data.textBottom}"` : ''}
         ${(!data.textBottom && data.tagline) ? `- TAGLINE: "${data.tagline}"` : ''} 
         
         - Font Style: Expensive Serif or Clean Sans-Serif. Use mixed typography for high-end magazine look.
      `
      : `
      2. TYPOGRAPHY:
         - DO NOT INCLUDE ANY TEXT, WORDS, OR LETTERS.
         - Create a purely visual art piece.
      `;

    let prompt = `
      ROLE: You are a world-class Visionary Art Director and Graphic Designer for a luxury lifestyle magazine (like Vogue, Kinfolk, or Dazed).
      TASK: Create a breathtaking, trendy DIGITAL ART POSTER or VISION BOARD.

      1. CORE CONCEPT & THEME: ${themeToUse}
         - Interpret this theme with deep symbolism, emotional resonance, and high vibration.

      ${typographyInstruction}

      3. VISUAL ELEMENTS:
         - Key Objects/Details: ${data.keywords}
         - Aesthetic Style: ${aestheticToUse}
         - Atmosphere/Background Mix: ${atmosphereDesc}
         - ${techniqueInstruction}
         - ${lightInstruction}

      4. CREATIVE DIRECTION:
         - Color Palette: Harmonious, sophisticated, premium color grading.
         - Quality: 8k resolution, highly detailed, sharp focus, award-winning composition.
         - Mood: Soulful, inspiring, magnetic, and aesthetic.
    `;

    // Prompt building for images with English logic
    if (data.referenceImage && data.secondReferenceImage) {
        prompt += `\n
        REFERENCE IMAGES INSTRUCTION:
        - You are provided with TWO reference images.
        - IMAGE 1 (First Input): This is the MAIN SUBJECT and STYLE REFERENCE (color grading, lighting).
        - IMAGE 2 (Second Input): This is the SECOND SUBJECT.
        - GOAL: Create a composition where BOTH subjects (or their artistic representations) interact harmoniously.
        - The style should be cohesive, blending both figures into the scene described above.`;
    } else if (data.referenceImage) {
      prompt += `\n
      REFERENCE IMAGE INSTRUCTION:
      - Use the provided image as the VISUAL ANCHOR (Main Subject).
      - Preserve the key features/likeness of the subject.
      - RE-IMAGINE the surroundings and styling to match the "${aestheticToUse}" aesthetic perfectly.
      - Apply the requested collage or photographic effects to this subject.`;
    } else {
        prompt += `\n
        NO REFERENCE IMAGE PROVIDED:
        - Generate a completely original masterpiece from scratch.
        - Create a stunning, imaginary subject or scene that perfectly embodies the "${themeToUse}" theme.`;
    }

    const parts: any[] = [{ text: prompt }];

    // Helper to process image data
    const processImage = (base64String: string) => {
        const [metadata, base64Data] = base64String.split(',');
        const mimeType = metadata.match(/:(.*?);/)?.[1] || 'image/png';
        return {
            inlineData: {
                mimeType: mimeType,
                data: base64Data
            }
        };
    };

    // Add images to parts in correct order
    if (data.referenceImage) {
        parts.push(processImage(data.referenceImage));
    }
    if (data.secondReferenceImage) {
        parts.push(processImage(data.secondReferenceImage));
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: parts
      },
      config: {
        imageConfig: {
          aspectRatio: data.aspectRatio
        }
      }
    });

    // Extract image from parts
    if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                return {
                    image: `data:image/png;base64,${base64EncodeString}`,
                    prompt: prompt
                };
            }
        }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Poster Generation Error:", error);
    throw error;
  }
};

/**
 * Suggests creative keywords/details based on current selection
 */
export const suggestCreativeDetails = async (
    theme: string, 
    style: string, 
    atmospheres: string[]
): Promise<string> => {
    try {
        const ai = getAiInstance();
        const prompt = `
          Context: A user is creating a vision board/poster.
          Theme: ${theme || 'General'}
          Style: ${style || 'Aesthetic'}
          Atmosphere: ${atmospheres.join(', ') || 'Neutral'}
          
          Task: Suggest 5 distinct, highly aesthetic, and specific visual objects or details that would perfectly fit this combination. 
          Return ONLY the 5 items separated by commas. Do not add any introductory text. 
          Example output: "vintage champagne glass, silk ribbon, white roses, pearl necklace, golden hour sunlight"
          Keep it in English for better image generation accuracy.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text?.trim() || "flowers, luxury car, sunlight, magazine, coffee";
    } catch (e) {
        console.error("Suggestion error", e);
        return "flowers, sunlight, art, luxury, dreams"; // Fallback
    }
};

/**
 * Helper to clean JSON string from Markdown code blocks
 */
const cleanJsonString = (str: string): string => {
    return str.replace(/```json\n?|\n?```/g, '').trim();
};

/**
 * Auto-configures the form based on the selected Theme (Assistant)
 */
export const autoConfigureForm = async (theme: PosterTheme): Promise<Partial<VisionFormData>> => {
    try {
        const ai = getAiInstance();
        const prompt = `
            Act as a professional Art Director.
            Theme: "${theme}"
            
            Task: Select the best possible matching settings for this theme from the provided ENUM lists.
            
            Available Styles: ${Object.values(PosterStyle).join(', ')}
            Available Atmosphere: ${Object.values(PosterBackground).join(', ')}
            Available LightEffects: ${Object.values(LightEffect).join(', ')}
            Available CollageTechniques: ${Object.values(CollageTechnique).join(', ')}
            Available CollageArtists: ${Object.values(CollageArtist).join(', ')}
            Available CompositionLayouts: ${Object.values(CompositionLayout).join(', ')}

            Return a valid JSON object with:
            - aesthetic (string, must be one of the Styles)
            - atmosphere (array of strings, pick 1-2 best matches from Atmosphere)
            - lightEffect (string, pick 1 best match from LightEffects)
            - collageTechnique (string, pick 1 best match from CollageTechniques)
            - collageArtist (string, pick 1 best match from CollageArtists)
            - compositionLayout (string, pick 1 best match from CompositionLayouts)
            - keywords (string, 5 specific items separated by commas)
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const rawText = response.text || '{}';
        const cleanedText = cleanJsonString(rawText);
        const json = JSON.parse(cleanedText);
        
        return {
            aesthetic: json.aesthetic,
            atmosphere: json.atmosphere,
            lightEffect: json.lightEffect,
            collageTechnique: json.collageTechnique,
            collageArtist: json.collageArtist,
            compositionLayout: json.compositionLayout,
            keywords: json.keywords
        };

    } catch (e) {
        console.error("Auto config error", e);
        return {};
    }
}

/**
 * Re-generates the image without text/typography OR without the subject
 */
export const removeTextFromImage = async (base64Image: string, mode: 'text_only' | 'remove_all' = 'text_only'): Promise<string> => {
    try {
        const ai = getAiInstance();
        const [metadata, base64Data] = base64Image.split(',');
        const mimeType = metadata.match(/:(.*?);/)?.[1] || 'image/png';

        let instruction = "";
        
        if (mode === 'remove_all') {
            instruction = `
                TASK: REMOVE THE MAIN SUBJECT/PERSON AND ALL TEXT.
                INSTRUCTIONS:
                1. Identify the main person or character in the image.
                2. Identify all text.
                3. ERASE BOTH COMPLETELY.
                4. INPAINT the empty areas with the existing background texture, scenery, or atmosphere.
                5. The result should be a clean background (scenery/texture) without the person or text.
            `;
        } else {
            instruction = `
                TASK: EDIT THIS IMAGE TO REMOVE TEXT BUT PRESERVE EVERYTHING ELSE.
                INSTRUCTIONS:
                1. Identify all text, typography, letters, and numbers.
                2. ERASE ONLY THE LETTERS/CHARACTERS.
                3. IMPORTANT: KEEP the main subject (person), lighting, style, colors, and composition EXACTLY the same.
            `;
        }

        const prompt = `
            ${instruction}
            OUTPUT: The edited image.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    },
                    { text: prompt }
                ]
            }
        });

        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
        }
        throw new Error("No image generated");

    } catch (error) {
        console.error("Removal Error:", error);
        throw error;
    }
};
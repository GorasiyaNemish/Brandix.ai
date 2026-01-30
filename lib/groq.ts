import Groq from 'groq-sdk';
import { brandKitSchema } from './schema';
import type { BrandKit } from './types';

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate a complete brand kit using Llama 3 via Groq Cloud
 */
export async function generateBrandKit(businessDescription: string): Promise<BrandKit> {
    const prompt = `You are a Senior Brand Architect with expertise in creating memorable brand identities. Generate a complete, professional brand identity based on the following business description.

Business Description: "${businessDescription}"

Create a brand identity that is:
- Memorable and unique
- Professional and modern
- Aligned with the business concept
- Visually appealing with harmonious colors

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):

{
  "brandName": "A creative, memorable brand name (2-3 words max, catchy and unique)",
  "tagline": "A punchy, compelling tagline (5-10 words that capture the essence)",
  "mission": "A clear 2-sentence mission statement that defines purpose and value proposition",
  "personality": ["keyword1", "keyword2", "keyword3"],
  "colorPalette": {
    "primary": "#hexcode",
    "secondary": "#hexcode",
    "accent": "#hexcode"
  },
  "logoPrompt": "Detailed image generation prompt: minimalist vector logo, flat design, white background, high contrast, professional typography, [describe the visual concept that represents the brand - be specific about shapes, symbols, style]"
}

Important guidelines:
- Brand name should be unique, not generic
- Tagline should be punchy and memorable
- Mission should be inspiring and clear
- Personality keywords should be single adjectives (e.g., "innovative", "trustworthy", "bold")
- Colors should be harmonious and appropriate for the industry (use actual hex codes like #3B82F6)
- Logo prompt should be detailed and specific for AI image generation (100+ characters)

Return ONLY the JSON object, nothing else.`;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional brand architect. You ONLY respond with valid JSON objects. Never include markdown formatting, code blocks, or explanatory text.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            model: 'llama-3.3-70b-versatile', // Fast and powerful (production model)
            temperature: 0.8, // Creative but consistent
            max_tokens: 1000,
            response_format: { type: 'json_object' }, // Enforce JSON response
        });

        const responseText = completion.choices[0]?.message?.content;

        if (!responseText) {
            throw new Error('No response from Groq API');
        }

        // Parse JSON response
        let brandData: any;
        try {
            brandData = JSON.parse(responseText);
        } catch (parseError) {
            console.error('Failed to parse JSON:', responseText);
            throw new Error('Invalid JSON response from AI');
        }

        // Validate against schema
        const validatedBrand = brandKitSchema.parse(brandData);

        // Add timestamp
        const brandKit: BrandKit = {
            ...validatedBrand,
            createdAt: new Date().toISOString(),
        };

        return brandKit;
    } catch (error) {
        console.error('Error generating brand kit:', error);

        if (error instanceof Error) {
            throw new Error(`Brand generation failed: ${error.message}`);
        }

        throw new Error('Brand generation failed: Unknown error');
    }
}

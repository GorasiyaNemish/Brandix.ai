/**
 * Pollinations.ai integration for AI image generation
 * Uses server-side proxy to keep API key secure
 */

interface ImageGenerationOptions {
    width?: number;
    height?: number;
    model?: string;
    seed?: number;
}

/**
 * Generate a logo URL using our secure proxy endpoint
 * The API key is kept secure on the server side
 * @param logoPrompt - The text prompt for logo generation
 * @param options - Optional configuration for image generation
 * @returns URL for the generated image (via our proxy)
 */
export function generateLogoUrl(logoPrompt: string, options: ImageGenerationOptions = {}): string {
    const {
        width = 512,
        height = 512,
        model = 'flux',
        seed = -1, // -1 for random
    } = options;

    // Use our internal API proxy to keep the API key secure
    // This prevents the API key from being exposed in the browser
    const params = new URLSearchParams({
        prompt: logoPrompt,
        model,
        width: width.toString(),
        height: height.toString(),
        seed: seed.toString(),
    });

    return `/api/image?${params.toString()}`;
}

/**
 * Generate multiple logo variations
 * @param logoPrompt - The text prompt for logo generation
 * @param count - Number of variations to generate
 * @param options - Optional configuration for image generation
 * @returns Array of URLs for generated images
 */
export function generateLogoVariations(
    logoPrompt: string,
    count: number = 3,
    options: ImageGenerationOptions = {}
): string[] {
    const variations: string[] = [];

    for (let i = 0; i < count; i++) {
        variations.push(generateLogoUrl(logoPrompt, {
            ...options,
            seed: i, // Different seed for each variation
        }));
    }

    return variations;
}

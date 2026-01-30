/**
 * Pollinations.ai integration for free AI image generation
 * No API key required - uses URL-based generation
 */

export function generateLogoUrl(logoPrompt: string): string {
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(logoPrompt);

    // Pollinations.ai URL format
    // Parameters: width, height, nologo (removes watermark), seed (for consistency)
    const baseUrl = 'https://image.pollinations.ai/prompt';
    const params = new URLSearchParams({
        width: '512',
        height: '512',
        nologo: 'true',
        enhance: 'true', // Enhance prompt quality
    });

    return `${baseUrl}/${encodedPrompt}?${params.toString()}`;
}

/**
 * Alternative: Generate multiple logo variations
 */
export function generateLogoVariations(logoPrompt: string, count: number = 3): string[] {
    const variations: string[] = [];

    for (let i = 0; i < count; i++) {
        const encodedPrompt = encodeURIComponent(logoPrompt);
        const params = new URLSearchParams({
            width: '512',
            height: '512',
            nologo: 'true',
            seed: String(i), // Different seed for variations
        });

        variations.push(`https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`);
    }

    return variations;
}

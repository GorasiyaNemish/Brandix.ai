import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy endpoint for Pollinations.ai image generation
 * This keeps the API key secure on the server side
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const prompt = searchParams.get('prompt');
        const width = searchParams.get('width') || '512';
        const height = searchParams.get('height') || '512';
        const model = searchParams.get('model') || 'flux';
        const seed = searchParams.get('seed') || '-1';

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Get API key from server-side environment variable
        const apiKey = process.env.POLLINATIONS_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured. Please add POLLINATIONS_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        // Build Pollinations.ai URL
        const encodedPrompt = encodeURIComponent(prompt);

        // Build params - only include supported parameters
        const params = new URLSearchParams({
            model,
            width,
            height,
            seed,
            key: apiKey, // API key is only used server-side
        });

        const imageUrl = `https://gen.pollinations.ai/image/${encodedPrompt}?${params.toString().replace(/key=[^&]+/, 'key=***')}`;

        console.log('🎨 Generating image...');
        console.log('  Prompt:', prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''));
        console.log('  Model:', model);
        console.log('  Size:', `${width}x${height}`);
        console.log('  Seed:', seed);
        console.log('  URL (sanitized):', imageUrl);

        // Fetch the image from Pollinations.ai
        const response = await fetch(`https://gen.pollinations.ai/image/${encodedPrompt}?${params.toString()}`, {
            headers: {
                'User-Agent': 'Brandix.ai/1.0',
            },
        });

        if (!response.ok) {
            console.error('❌ Pollinations.ai error:', response.status, response.statusText);
            const errorText = await response.text().catch(() => 'No error details');
            console.error('Error details:', errorText);
            console.error('Request URL (sanitized):', imageUrl);
            return NextResponse.json(
                { error: `Image generation failed: ${response.statusText}`, details: errorText },
                { status: response.status }
            );
        }

        console.log('✅ Image generated successfully');
        console.log('  Content-Type:', response.headers.get('content-type'));
        console.log('  Content-Length:', response.headers.get('content-length') || 'unknown');

        // Get the image data
        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Return the image with appropriate headers
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
            },
        });
    } catch (error) {
        console.error('Error generating image:', error);
        return NextResponse.json(
            { error: 'Failed to generate image' },
            { status: 500 }
        );
    }
}

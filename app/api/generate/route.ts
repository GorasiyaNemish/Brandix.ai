import { NextRequest, NextResponse } from 'next/server';
import { generateBrandKit } from '@/lib/groq';
import { generateLogoUrl } from '@/lib/pollinations';
import { generateRequestSchema } from '@/lib/schema';
import type { GenerateResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        const validation = generateRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid input: ' + validation.error.errors[0].message,
                } as GenerateResponse,
                { status: 400 }
            );
        }

        const { description } = validation.data;

        // Check for API key
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Server configuration error: GROQ_API_KEY not set',
                } as GenerateResponse,
                { status: 500 }
            );
        }

        // Generate brand kit using Groq (Llama 3)
        const brandKit = await generateBrandKit(description);

        // Generate logo URL using Pollinations.ai
        const logoUrl = generateLogoUrl(brandKit.logoPrompt);
        console.log('Generated logo URL:', logoUrl);
        console.log('Logo prompt:', brandKit.logoPrompt);
        brandKit.logoUrl = logoUrl;

        // Return success response
        return NextResponse.json({
            success: true,
            brandKit,
        } as GenerateResponse);

    } catch (error) {
        console.error('Error in /api/generate:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            } as GenerateResponse,
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}

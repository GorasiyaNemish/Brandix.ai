import { z } from 'zod';

// Hex color validation
const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color');

// Brand kit schema for validation
export const brandKitSchema = z.object({
    brandName: z.string().min(1).max(100),
    tagline: z.string().min(5).max(150),
    mission: z.string().min(10).max(500),
    personality: z.tuple([
        z.string().min(1).max(50),
        z.string().min(1).max(50),
        z.string().min(1).max(50),
    ]),
    colorPalette: z.object({
        primary: hexColorSchema,
        secondary: hexColorSchema,
        accent: hexColorSchema,
    }),
    logoPrompt: z.string().min(20).max(1000),
    logoUrl: z.string().url().optional(),
    createdAt: z.string().optional(),
});

// Input validation schema
export const generateRequestSchema = z.object({
    description: z.string().min(10).max(1000),
});

export type BrandKitSchema = z.infer<typeof brandKitSchema>;
export type GenerateRequestSchema = z.infer<typeof generateRequestSchema>;

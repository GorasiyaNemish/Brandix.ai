export interface BrandKit {
    brandName: string;
    tagline: string;
    mission: string;
    personality: [string, string, string];
    colorPalette: {
        primary: string;
        secondary: string;
        accent: string;
    };
    logoPrompt: string;
    logoUrl?: string;
    createdAt?: string;
}

export interface GenerateRequest {
    description: string;
}

export interface GenerateResponse {
    success: boolean;
    brandKit?: BrandKit;
    error?: string;
}

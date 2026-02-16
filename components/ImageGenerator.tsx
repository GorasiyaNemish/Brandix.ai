'use client';

import { useState, useEffect } from 'react';
import type { BrandKit } from '@/lib/types';
import { generateLogoUrl } from '@/lib/pollinations';

interface ImageGeneratorProps {
    brandKit: BrandKit;
    onImagesChange?: (imageUrls: string[]) => void;
}

interface GeneratedImage {
    id: string;
    url: string;
    prompt: string; // User's custom prompt (for display)
    fullPrompt: string; // Full prompt with brand context (for retry)
    isLoading?: boolean;
    hasError?: boolean;
}

export default function ImageGenerator({ brandKit, onImagesChange }: ImageGeneratorProps) {
    const [images, setImages] = useState<GeneratedImage[]>([]);
    const [customPrompt, setCustomPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Notify parent component when images change
    useEffect(() => {
        if (onImagesChange) {
            const imageUrls = images.filter(img => !img.hasError).map(img => img.url);
            onImagesChange(imageUrls);
        }
    }, [images, onImagesChange]);

    const generateImage = async () => {
        console.log('🚀 Generate Image button clicked');
        console.log('Current images count:', images.length);
        console.log('Custom prompt:', customPrompt);

        if (images.length >= 3) {
            console.warn('⚠️ Maximum images reached');
            alert('Maximum 3 images allowed');
            return;
        }

        if (!customPrompt.trim()) {
            console.warn('⚠️ Empty prompt');
            alert('Please enter what kind of image you want');
            return;
        }

        setIsGenerating(true);
        console.log('✅ Starting image generation...');

        try {
            // Combine brand context with user's custom prompt
            const fullPrompt = `${customPrompt}, brand style: ${brandKit.personality.join(', ')}, colors: ${brandKit.colorPalette.primary}, ${brandKit.colorPalette.secondary}, ${brandKit.colorPalette.accent}`;

            console.log('📝 Full prompt created:', fullPrompt.substring(0, 100) + '...');

            // Generate a valid seed (must be <= 2147483647 for Pollinations.ai API)
            const seed = Math.floor(Date.now() % 2147483647);

            // Use the same helper function as logo generation
            // This keeps the implementation consistent and maintainable
            const imageUrl = generateLogoUrl(fullPrompt, {
                width: 512,
                height: 512,
                model: 'flux',
                seed: seed,
            });

            console.log('🎨 Image URL generated:', imageUrl);

            const newImage: GeneratedImage = {
                id: Date.now().toString(),
                url: imageUrl,
                prompt: customPrompt, // For display
                fullPrompt: fullPrompt, // For retry with brand context
                isLoading: true,
                hasError: false,
            };

            console.log('📦 New image object created:', {
                id: newImage.id,
                prompt: newImage.prompt,
                url: newImage.url,
                isLoading: newImage.isLoading
            });

            setImages([...images, newImage]);
            console.log('✅ Image added to state, new count:', images.length + 1);

            setCustomPrompt('');
            console.log('✅ Prompt cleared');
        } catch (err) {
            console.error('❌ Failed to generate image:', err);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsGenerating(false);
            console.log('✅ Generation complete, isGenerating set to false');
        }
    };

    const removeImage = (id: string) => {
        setImages(images.filter(img => img.id !== id));
    };

    const handleImageLoad = (id: string) => {
        console.log('✅ Image loaded successfully:', id);
        setImages(images.map(img =>
            img.id === id ? { ...img, isLoading: false, hasError: false } : img
        ));
    };

    const handleImageError = (id: string, url: string) => {
        console.error('❌ Image failed to load:', id);
        console.error('Failed URL:', url);
        setImages(images.map(img =>
            img.id === id ? { ...img, isLoading: false, hasError: true } : img
        ));
    };

    const retryImage = (id: string) => {
        console.log('🔄 Retrying image:', id);

        // Find the image to retry
        const imageToRetry = images.find(img => img.id === id);
        if (!imageToRetry) return;

        // Generate a valid seed (must be <= 2147483647 for Pollinations.ai API)
        const seed = Math.floor(Date.now() % 2147483647);

        // Use the same helper function as initial generation
        // This ensures consistency and uses the full prompt with brand context
        const newUrl = generateLogoUrl(imageToRetry.fullPrompt, {
            width: 512,
            height: 512,
            model: 'flux',
            seed: seed,
        });

        console.log('Retrying with full prompt:', imageToRetry.fullPrompt.substring(0, 100) + '...');
        console.log('New URL:', newUrl);

        setImages(images.map(img =>
            img.id === id ? { ...img, url: newUrl, isLoading: true, hasError: false } : img
        ));
    };

    const downloadImage = async (url: string, prompt: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${brandKit.brandName.replace(/\s+/g, '-').toLowerCase()}-${prompt.replace(/\s+/g, '-').toLowerCase()}.png`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a);
        } catch (err) {
            console.error('Failed to download image:', err);
        }
    };

    return (
        <div style={{ marginTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }}>
                Generate Brand Images
            </h3>
            <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-lg)',
            }}>
                Create custom images for your brand. Your brand's personality and colors will be automatically applied. ({images.length}/3 images)
            </p>

            {/* Input Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-xl)',
            }}>
                <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isGenerating && images.length < 3 && generateImage()}
                    placeholder="e.g., modern office workspace, product packaging, social media banner..."
                    disabled={isGenerating || images.length >= 3}
                    style={{
                        flex: 1,
                        padding: 'var(--spacing-md)',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-base)',
                        outline: 'none',
                        transition: 'all var(--transition-base)',
                    }}
                />
                <button
                    onClick={generateImage}
                    disabled={isGenerating || images.length >= 3 || !customPrompt.trim()}
                    className="btn btn-primary"
                    style={{
                        minWidth: '140px',
                        opacity: (isGenerating || images.length >= 3 || !customPrompt.trim()) ? 0.5 : 1,
                        cursor: (isGenerating || images.length >= 3 || !customPrompt.trim()) ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isGenerating ? (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                                <circle cx="12" cy="12" r="10" opacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Generate Image
                        </>
                    )}
                </button>
            </div>

            {/* Generated Images Grid */}
            {
                images.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: 'var(--spacing-lg)',
                    }}>
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="glass-card"
                                style={{
                                    padding: 'var(--spacing-md)',
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    marginBottom: 'var(--spacing-md)',
                                    background: 'var(--color-bg-secondary)',
                                    position: 'relative',
                                }}>
                                    {image.isLoading && !image.hasError && (
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            zIndex: 1,
                                        }}>
                                            <div className="spinner" style={{ borderTopColor: 'var(--color-primary)' }}></div>
                                        </div>
                                    )}
                                    {image.hasError ? (
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            flexDirection: 'column',
                                            gap: 'var(--spacing-md)',
                                            padding: 'var(--spacing-md)',
                                        }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="12" />
                                                <line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>Failed to load</p>
                                            <button
                                                onClick={() => retryImage(image.id)}
                                                className="btn btn-secondary"
                                                style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--spacing-xs) var(--spacing-sm)' }}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    ) : (
                                        <img
                                            src={image.url}
                                            alt={image.prompt}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                            referrerPolicy="no-referrer"
                                            onLoad={() => handleImageLoad(image.id)}
                                            onError={() => handleImageError(image.id, image.url)}
                                        />
                                    )}
                                </div>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: 'var(--spacing-md)',
                                    lineHeight: 1.4,
                                }}>
                                    {image.prompt}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-sm)',
                                }}>
                                    <button
                                        onClick={() => downloadImage(image.url, image.prompt)}
                                        className="btn btn-secondary"
                                        style={{
                                            flex: 1,
                                            fontSize: 'var(--font-size-sm)',
                                            padding: 'var(--spacing-sm)',
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download
                                    </button>
                                    <button
                                        onClick={() => removeImage(image.id)}
                                        className="btn btn-secondary"
                                        style={{
                                            fontSize: 'var(--font-size-sm)',
                                            padding: 'var(--spacing-sm)',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            borderColor: 'var(--color-error)',
                                            color: 'var(--color-error)',
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div >
    );
}

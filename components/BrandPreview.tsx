'use client';

import { useState } from 'react';
import type { BrandKit } from '@/lib/types';
import ColorPalette from './ColorPalette';
import LogoPreview from './LogoPreview';
import ImageGenerator from './ImageGenerator';
import { downloadBrandKitAsZip } from '@/lib/downloadUtils';

interface BrandPreviewProps {
    brandKit: BrandKit;
}

export default function BrandPreview({ brandKit }: BrandPreviewProps) {
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadZip = async () => {
        setIsDownloading(true);
        try {
            await downloadBrandKitAsZip(brandKit, generatedImages);
        } catch (error) {
            console.error('Failed to download ZIP:', error);
            alert('Failed to download brand kit. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="glass-card animate-slide-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>

            {/* Brand Name */}
            <div className="text-center mb-4">
                <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                    {brandKit.brandName}
                </h1>
                <p style={{
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                    marginBottom: 'var(--spacing-lg)',
                }}>
                    {brandKit.tagline}
                </p>
            </div>

            {/* Mission Statement */}
            <div className="mb-4" style={{
                padding: 'var(--spacing-lg)',
                background: 'var(--gradient-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
            }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)', color: 'var(--color-text)' }}>
                    Mission
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                    {brandKit.mission}
                </p>
            </div>

            {/* Personality Keywords */}
            <div className="mb-4">
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                    Brand Personality
                </h3>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                    {brandKit.personality.map((keyword, index) => (
                        <span key={index} className="badge" style={{
                            fontSize: 'var(--font-size-base)',
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            background: 'var(--gradient-surface)',
                            borderColor: 'var(--color-primary)',
                        }}>
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>

            {/* Color Palette */}
            <div className="mb-4">
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                    Color Palette
                </h3>
                <ColorPalette colors={brandKit.colorPalette} />
            </div>

            {/* Logo Preview */}
            {brandKit.logoUrl && (
                <div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                        Logo Preview
                    </h3>
                    <LogoPreview
                        logoUrl={brandKit.logoUrl}
                        logoPrompt={brandKit.logoPrompt}
                        brandName={brandKit.brandName}
                    />
                </div>
            )}

            {/* Image Generator */}
            <ImageGenerator brandKit={brandKit} onImagesChange={setGeneratedImages} />

            {/* Download ZIP Button */}
            <div style={{ marginTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)' }}>
                <button
                    onClick={handleDownloadZip}
                    disabled={isDownloading}
                    className="btn btn-primary"
                    style={{
                        marginTop: 'var(--spacing-xl)',
                        width: '100%',
                        fontSize: 'var(--font-size-base)',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--spacing-md)',
                        opacity: isDownloading ? 0.7 : 1,
                        cursor: isDownloading ? 'wait' : 'pointer',
                    }}
                >
                    {isDownloading ? (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                                <circle cx="12" cy="12" r="10" opacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                            </svg>
                            Preparing Download...
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download Brand Kit (ZIP)
                        </>
                    )}
                </button>
                <p style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    marginTop: 'var(--spacing-sm)',
                }}>
                    Includes brand info, logo{generatedImages.length > 0 ? `, and ${generatedImages.length} image${generatedImages.length > 1 ? 's' : ''}` : ''}
                </p>
            </div>
        </div>
    );
}

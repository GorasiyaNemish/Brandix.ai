'use client';

import { useState, useEffect } from 'react';

interface LogoPreviewProps {
    logoUrl: string;
    logoPrompt: string;
    brandName: string;
}

export default function LogoPreview({ logoUrl, logoPrompt, brandName }: LogoPreviewProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string>('');

    useEffect(() => {
        console.log('LogoPreview - Logo URL:', logoUrl);
        // Reset states when URL changes
        setIsLoading(true);
        setHasError(false);
        setErrorDetails('');
    }, [logoUrl]);

    const handleDownload = async () => {
        try {
            const response = await fetch(logoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${brandName.replace(/\s+/g, '-').toLowerCase()}-logo.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    border: '2px solid var(--color-border)',
                }}
            >
                {isLoading && !hasError && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 255, 255, 0.9)',
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div className="spinner" style={{ margin: '0 auto', borderTopColor: 'var(--color-primary)' }}></div>
                            <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                Generating logo...
                            </p>
                        </div>
                    </div>
                )}

                {hasError ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            flexDirection: 'column',
                            gap: 'var(--spacing-md)',
                            padding: 'var(--spacing-xl)',
                            textAlign: 'center',
                        }}
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)' }}>Failed to load logo</p>
                        {errorDetails && (
                            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', wordBreak: 'break-all', maxWidth: '100%' }}>
                                {errorDetails}
                            </p>
                        )}
                        <button
                            onClick={() => {
                                setHasError(false);
                                setIsLoading(true);
                            }}
                            className="btn btn-secondary"
                            style={{ fontSize: 'var(--font-size-sm)' }}
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <img
                        src={logoUrl}
                        alt={`${brandName} logo`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: 'var(--spacing-xl)',
                        }}
                        referrerPolicy="no-referrer"
                        onLoad={() => {
                            console.log('Logo loaded successfully:', logoUrl);
                            setIsLoading(false);
                        }}
                        onError={(e) => {
                            const error = `Failed to load image from: ${logoUrl}`;
                            console.error('Logo loading error:', error, e);
                            setErrorDetails(error);
                            setIsLoading(false);
                            setHasError(true);
                        }}
                    />
                )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <button
                    onClick={handleDownload}
                    className="btn btn-secondary"
                    disabled={isLoading || hasError}
                    style={{ flex: 1 }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Logo
                </button>
            </div>

            <details style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                    Logo Generation Prompt
                </summary>
                <p style={{
                    padding: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-md)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'monospace',
                    fontSize: 'var(--font-size-xs)',
                    lineHeight: 1.6,
                }}>
                    {logoPrompt}
                </p>
            </details>
        </div>
    );
}

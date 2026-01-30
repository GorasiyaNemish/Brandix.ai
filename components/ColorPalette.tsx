'use client';

import { useState } from 'react';

interface ColorPaletteProps {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const copyToClipboard = async (color: string, name: string) => {
        try {
            await navigator.clipboard.writeText(color);
            setCopiedColor(name);
            setTimeout(() => setCopiedColor(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const colorEntries = [
        { name: 'Primary', value: colors.primary },
        { name: 'Secondary', value: colors.secondary },
        { name: 'Accent', value: colors.accent },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)' }}>
            {colorEntries.map(({ name, value }) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <div
                        className="color-swatch"
                        style={{ backgroundColor: value }}
                        onClick={() => copyToClipboard(value, name)}
                        title={`Click to copy ${value}`}
                    >
                        {copiedColor === name && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    color: 'white',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 600,
                                    animation: 'fade-in 0.2s ease',
                                }}
                            >
                                ✓ Copied!
                            </div>
                        )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)' }}>
                            {name}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                            {value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

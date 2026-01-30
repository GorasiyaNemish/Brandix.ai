'use client';

import { useState } from 'react';

interface BrandInputProps {
    onGenerate: (description: string) => void;
    isLoading: boolean;
}

export default function BrandInput({ onGenerate, isLoading }: BrandInputProps) {
    const [description, setDescription] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
        setCharCount(value.length);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim().length >= 10 && !isLoading) {
            onGenerate(description);
        }
    };

    const examplePrompts = [
        'A sustainable coffee shop focused on local communities and organic beans',
        'Modern fitness app for busy professionals with AI-powered workout plans',
        'Eco-friendly fashion brand using recycled materials and ethical manufacturing',
        'AI-powered mental health platform for teenagers and young adults',
    ];

    const handleExampleClick = (example: string) => {
        setDescription(example);
        setCharCount(example.length);
    };

    return (
        <div className="glass-card animate-fade-in">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="description" className="input-label">
                        Describe Your Business
                    </label>
                    <textarea
                        id="description"
                        className="textarea-field"
                        placeholder="e.g., A sustainable coffee shop focused on local communities and organic beans..."
                        value={description}
                        onChange={handleChange}
                        maxLength={1000}
                        disabled={isLoading}
                        style={{ minHeight: '140px' }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)'
                    }}>
                        <span>
                            {charCount < 10 ? 'Minimum 10 characters' : 'Ready to generate'}
                        </span>
                        <span>{charCount} / 1000</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={charCount < 10 || isLoading}
                    style={{ width: '100%', fontSize: 'var(--font-size-lg)' }}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Generating Your Brand...
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            Generate Brand Kit
                        </>
                    )}
                </button>
            </form>

            {/* Example Prompts */}
            <div className="mt-3">
                <p className="input-label mb-1">Try an example:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {examplePrompts.map((example, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleExampleClick(example)}
                            disabled={isLoading}
                            style={{
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-secondary)',
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                transition: 'all var(--transition-base)',
                                textAlign: 'left',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                                e.currentTarget.style.color = 'var(--color-text)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                e.currentTarget.style.color = 'var(--color-text-secondary)';
                            }}
                        >
                            {example}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

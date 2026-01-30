'use client';

import { useState } from 'react';
import BrandInput from '@/components/BrandInput';
import BrandPreview from '@/components/BrandPreview';
import type { BrandKit, GenerateResponse } from '@/lib/types';

export default function Home() {
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (description: string) => {
    setIsLoading(true);
    setError(null);
    setBrandKit(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate brand kit');
      }

      if (data.brandKit) {
        setBrandKit(data.brandKit);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-content">
      <div className="container">
        {/* Header */}
        <header className="text-center mb-4" style={{ marginBottom: 'var(--spacing-3xl)' }}>

          <h1 style={{
            fontSize: 'var(--font-size-5xl)',
            marginBottom: 'var(--spacing-md)',
            lineHeight: 1.1,
          }}>
            Brandix.ai
          </h1>

          <p style={{
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Generate complete brand identities in seconds. AI-powered brand names, taglines, color palettes, and logos—all in structured JSON format.
          </p>
        </header>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: brandKit ? 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' : '1fr',
          gap: 'var(--spacing-2xl)',
          maxWidth: brandKit ? '100%' : '800px',
          margin: '0 auto',
        }}>
          {/* Input Section */}
          <div>
            <BrandInput onGenerate={handleGenerate} isLoading={isLoading} />

            {/* Error Display */}
            {error && (
              <div className="glass-card animate-fade-in" style={{
                marginTop: 'var(--spacing-lg)',
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'var(--color-error)',
              }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <h3 style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-sm)' }}>
                      Generation Failed
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {error}
                    </p>
                    {error.includes('GROQ_API_KEY') && (
                      <p style={{
                        marginTop: 'var(--spacing-md)',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                      }}>
                        💡 Make sure to add your Groq API key to <code style={{
                          background: 'rgba(0,0,0,0.3)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontFamily: 'monospace',
                        }}>.env.local</code>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            {!brandKit && !isLoading && (
              <div className="glass-card animate-fade-in" style={{
                marginTop: 'var(--spacing-2xl)',
                animationDelay: '0.2s',
              }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)' }}>
                  What You Get
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  {[
                    { icon: '🎯', title: 'Brand Name', desc: 'Creative, memorable name for your business' },
                    { icon: '💬', title: 'Tagline', desc: 'Punchy, compelling tagline that captures your essence' },
                    { icon: '🎨', title: 'Color Palette', desc: 'Harmonious 3-color palette with hex codes' },
                    { icon: '🖼️', title: 'Logo Design', desc: 'AI-generated logo with professional styling' },
                    { icon: '📸', title: 'Image Creation', desc: 'Generate up to 3 brand-relevant images on demand' },
                  ].map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      gap: 'var(--spacing-md)',
                      padding: 'var(--spacing-md)',
                      background: 'var(--color-surface)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      transition: 'all var(--transition-base)',
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}>
                      <span style={{ fontSize: 'var(--font-size-2xl)' }}>{feature.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-xs)' }}>
                          {feature.title}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {brandKit && (
            <div>
              <BrandPreview brandKit={brandKit} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: 'var(--spacing-3xl)',
          paddingTop: 'var(--spacing-2xl)',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}>
          <div style={{
            display: 'inline-block',
            padding: 'var(--spacing-sm) var(--spacing-lg)',
            background: 'var(--gradient-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            ✨ Powered by Llama 3 & Pollinations.ai
          </div>
          <p>
            Built with ❤️ by <a style={{ color: 'var(--color-text-muted)', fontWeight: 600 }} href="https://portfolio-nemish-gorasiya.vercel.app/" target="_blank" rel="noopener noreferrer">Nemish Gorasiya</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

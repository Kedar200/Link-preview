'use client';
import { useRef, useEffect } from 'react';

interface HeroProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function Hero({ onSubmit, loading }: HeroProps) {
  return (
    <section className="relative z-10 pt-20 pb-14 px-4 text-center">
      {/* Live pill tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-mono"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)' }}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
        See before you share
      </div>

      {/* Headline */}
      <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-5"
        style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
        Your link,{' '}
        <span style={{ color: '#e8ff47' }}>everywhere</span>
        {' '}at once.
      </h1>

      {/* Subtext */}
      <p className="font-mono text-sm sm:text-base leading-relaxed mx-auto mb-10"
        style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>
        Paste any URL and instantly see exactly how it looks on WhatsApp, Twitter, LinkedIn, Slack, Discord and Instagram — before anyone else does.
      </p>
    </section>
  );
}

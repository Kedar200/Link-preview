'use client';
import { useState } from 'react';
import type { OGData } from '@/types';
import type { Platform, PlatformConfig } from '@/types';
import WhatsAppPreview from './previews/WhatsAppPreview';
import TwitterPreview from './previews/TwitterPreview';
import LinkedInPreview from './previews/LinkedInPreview';
import SlackPreview from './previews/SlackPreview';
import DiscordPreview from './previews/DiscordPreview';
import InstagramPreview from './previews/InstagramPreview';
import EmptyCard from './ui/EmptyCard';

const PLATFORMS: PlatformConfig[] = [
  { id: 'whatsapp', name: 'WhatsApp', color: '#25d366', dotColor: '#25d366' },
  { id: 'twitter', name: 'Twitter / X', color: '#1d9bf0', dotColor: '#1d9bf0' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0a66c2', dotColor: '#0a66c2' },
  { id: 'slack', name: 'Slack', color: '#611f69', dotColor: '#ecb22e' },
  { id: 'discord', name: 'Discord', color: '#5865f2', dotColor: '#5865f2' },
  { id: 'instagram', name: 'Instagram', color: '#e1306c', dotColor: '#e1306c' },
];

function PreviewContent({ platform, data }: { platform: Platform; data: OGData }) {
  switch (platform) {
    case 'whatsapp': return <WhatsAppPreview data={data} />;
    case 'twitter': return <TwitterPreview data={data} />;
    case 'linkedin': return <LinkedInPreview data={data} />;
    case 'slack': return <SlackPreview data={data} />;
    case 'discord': return <DiscordPreview data={data} />;
    case 'instagram': return <InstagramPreview data={data} />;
  }
}

interface PlatformCardProps {
  config: PlatformConfig;
  data: OGData | null;
  index: number;
}

function PlatformCard({ config, data, index }: PlatformCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(data.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border card-animate"
      style={{
        background: '#111111',
        borderColor: 'rgba(255,255,255,0.07)',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: config.dotColor }} />
          <span className="text-xs font-syne font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(255,255,255,0.8)' }}>
            {config.name}
          </span>
        </div>
        {data && (
          <button
            onClick={handleCopy}
            title="Copy URL"
            className="p-1.5 rounded-lg transition-all"
            style={{
              background: copied ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
              color: copied ? '#4ade80' : 'rgba(255,255,255,0.3)',
            }}
          >
            {copied ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Preview content */}
      <div className="p-3">
        {data ? (
          <PreviewContent platform={config.id} data={data} />
        ) : (
          <EmptyCard platformName={config.name} platformColor={config.color} />
        )}
      </div>
    </div>
  );
}

interface PlatformGridProps {
  data: OGData | null;
  loading: boolean;
}

import ShimmerCard from './ui/ShimmerCard';

export default function PlatformGrid({ data, loading }: PlatformGridProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6 pb-12 max-w-6xl mx-auto">
      {/* Localhost badge */}
      {data?.isLocalhost && (
        <div
          className="flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-xl mb-6 fade-in"
          style={{
            background: 'rgba(74,222,128,0.07)',
            border: '1px solid rgba(74,222,128,0.2)',
            color: '#4ade80',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          This URL is processed entirely in your browser. Nothing leaves your machine.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? PLATFORMS.map((_, i) => <ShimmerCard key={i} />)
          : PLATFORMS.map((platform, i) => (
              <PlatformCard key={platform.id} config={platform} data={data} index={i} />
            ))
        }
      </div>
    </section>
  );
}

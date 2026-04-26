'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { data: OGData; }

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function DiscordPreview({ data }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const desc = truncate(data.description, 120);
  const avatarLetter = (data.siteName || data.domain || 'D').slice(0, 1).toUpperCase();

  return (
    <div className="rounded-xl p-3" style={{ background: '#313338' }}>
      {/* Message */}
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg,#5865f2,#7289da)', color: '#fff' }}>
          {avatarLetter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold" style={{ color: '#00b0f4' }}>{truncate(data.siteName || data.domain, 18)}</span>
            <span className="text-xs" style={{ color: '#72767d' }}>Today at 12:34 PM</span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: '#dcddde' }}>
            Found something interesting {data.domain && `on ${data.domain}`} 🔗
          </p>

          {/* Embed */}
          <div className="mt-2 rounded overflow-hidden flex" style={{ borderLeft: '4px solid #5865f2', background: '#2b2d31', maxWidth: 400 }}>
            <div className="p-3 flex-1 min-w-0">
              {data.siteName && (
                <p className="text-xs mb-1" style={{ color: '#b9bbbe' }}>{data.siteName}</p>
              )}
              {title && (
                <a href="#" className="text-sm font-bold hover:underline" style={{ color: '#5865f2' }}>
                  {title}
                </a>
              )}
              {desc && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#b9bbbe' }}>{desc}</p>}
              {data.image && !imgError ? (
                <img
                  src={data.image}
                  alt=""
                  className="mt-3 rounded-lg object-cover"
                  style={{ maxHeight: 140, maxWidth: '100%' }}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="mt-3 rounded-lg flex items-center justify-center" style={{ height: 90, background: '#1e1f22' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5865f222" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

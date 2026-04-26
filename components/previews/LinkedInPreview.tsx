'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { data: OGData; }

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function LinkedInPreview({ data }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const desc = truncate(data.description, 120);
  const avatarLetter = (data.siteName || data.domain || 'L').slice(0, 1).toUpperCase();
  const postTexts = [
    'This is a great resource — worth adding to your toolkit.',
    'Sharing this with my network. Really valuable stuff here.',
    'Came across this today and thought it was worth sharing.',
  ];
  const postText = postTexts[Math.abs((data.domain.charCodeAt(0) || 0) % postTexts.length)];

  return (
    <div className="rounded-xl p-3 space-y-3" style={{ background: '#1b1f23' }}>
      {/* Post header */}
      <div className="flex items-start gap-2.5">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg,#0a66c2,#004182)', color: '#fff' }}>
          {avatarLetter}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-white">{truncate(data.siteName || data.domain, 20)}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full border text-xs" style={{ borderColor: '#0a66c2', color: '#0a66c2' }}>1st</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: '#8f9fb2' }}>Just now</span>
            <span style={{ color: '#8f9fb2' }}>·</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8f9fb2" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{postText}</p>
        </div>
        <button className="text-lg" style={{ color: 'rgba(255,255,255,0.3)' }}>···</button>
      </div>

      {/* Link card */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#2a2f35' }}>
        {data.image && !imgError ? (
          <img src={data.image} alt="" className="w-full object-cover" style={{ maxHeight: 150 }} onError={() => setImgError(true)} />
        ) : (
          <div className="w-full flex items-center justify-center" style={{ height: 100, background: '#161b21' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a2f35" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </div>
        )}
        <div className="px-3 py-2.5" style={{ background: '#1f2428' }}>
          {title && <p className="text-sm font-semibold text-white leading-snug">{title}</p>}
          {desc && <p className="text-xs mt-0.5 leading-snug" style={{ color: '#8f9fb2' }}>{desc}</p>}
          <p className="text-xs mt-1 uppercase tracking-wide font-mono" style={{ color: '#8f9fb2' }}>{data.domain}</p>
        </div>
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between text-xs" style={{ color: '#8f9fb2' }}>
        <span>👍 ❤️ 💡  234</span>
        <span>18 comments</span>
      </div>
    </div>
  );
}

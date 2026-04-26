'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { data: OGData; }

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function TwitterPreview({ data }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const tweetTexts = [
    'Just found this and it\'s genuinely great 👀',
    'This is worth your time, promise 🔗',
    'Sharing this because it actually made me think 💭',
    'Can\'t stop thinking about this one →',
  ];
  const tweetText = tweetTexts[Math.abs(data.domain.charCodeAt(0) % tweetTexts.length)];
  const handle = `@${data.domain.replace(/\./g, '_').slice(0, 12)}`;
  const displayName = data.siteName || data.domain;
  const avatarLetter = displayName.slice(0, 1).toUpperCase();

  return (
    <div className="rounded-xl p-3 space-y-3" style={{ background: '#000' }}>
      {/* Fake tweet */}
      <div className="flex gap-2.5">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg,#1d9bf0,#0d6eaf)', color: '#fff' }}>
          {avatarLetter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{truncate(displayName, 16)}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C1.63 9.33.75 10.57.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.53.8-3.91c1.31-.67 2.2-1.91 2.2-3.34z"/><path d="M10.54 15.85l-3.76-4.38 1.52-1.31 2.12 2.47 4.21-4.83 1.61 1.41z" fill="#fff"/></svg>
            <span className="text-xs" style={{ color: '#536471' }}>{handle} · just now</span>
          </div>
          <p className="text-sm mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.9)' }}>{tweetText}</p>
          {/* Link card */}
          <div className="mt-2.5 rounded-2xl overflow-hidden border cursor-pointer hover:bg-white hover:bg-opacity-5 transition-colors" style={{ borderColor: '#2f3336' }}>
            {data.image && !imgError ? (
              <img src={data.image} alt="" className="w-full object-cover" style={{ maxHeight: 160 }} onError={() => setImgError(true)} />
            ) : (
              <div className="w-full flex items-center justify-center" style={{ height: 100, background: '#16202a' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f3336" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              </div>
            )}
            <div className="px-3 py-2.5">
              <p className="text-xs" style={{ color: '#536471' }}>{data.domain}</p>
              {title && <p className="text-sm font-medium text-white leading-snug mt-0.5">{title}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-around pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {['💬 4', '🔁 12', '❤️ 87', '📤'].map((a, i) => (
          <span key={i} className="text-xs" style={{ color: '#536471' }}>{a}</span>
        ))}
      </div>
    </div>
  );
}

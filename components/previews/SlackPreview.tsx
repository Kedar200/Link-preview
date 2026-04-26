'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { data: OGData; }

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

const SLACK_COLORS = ['#e01e5a', '#ecb22e', '#2eb67d', '#36c5f0'];

export default function SlackPreview({ data }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const desc = truncate(data.description, 120);
  const avatarColor = SLACK_COLORS[Math.abs((data.domain.charCodeAt(0) || 0) % SLACK_COLORS.length)];

  return (
    <div className="rounded-xl p-3" style={{ background: '#1a1d21', fontFamily: 'DM Mono, monospace' }}>
      {/* Message row */}
      <div className="flex gap-2.5">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: avatarColor, color: '#fff' }}>
          {(data.siteName || 'U').slice(0, 1).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-white">{truncate(data.siteName || data.domain, 20)}</span>
            <span className="text-xs" style={{ color: '#6b7280' }}>Today at 12:34 PM</span>
          </div>
          <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Check this out 👉 <a href="#" className="text-blue-400 underline text-sm">{data.url ? data.url.slice(0, 40) + (data.url.length > 40 ? '…' : '') : data.domain}</a>
          </p>

          {/* Unfurl block */}
          <div className="mt-2 flex gap-0 rounded overflow-hidden" style={{ borderLeft: '4px solid #611f69' }}>
            <div className="pl-3 pt-2 pb-2 pr-2 flex-1 min-w-0" style={{ background: '#222529' }}>
              <p className="text-xs font-bold text-white mb-0.5">{data.siteName || data.domain}</p>
              {title && (
                <a href="#" className="text-sm font-semibold hover:underline" style={{ color: '#1d9bd1' }}>
                  {title}
                </a>
              )}
              {desc && <p className="text-xs mt-1 leading-relaxed" style={{ color: '#9ca3af' }}>{desc}</p>}
              {data.image && !imgError && (
                <img
                  src={data.image}
                  alt=""
                  className="mt-2 rounded object-cover"
                  style={{ maxHeight: 120, maxWidth: '100%' }}
                  onError={() => setImgError(true)}
                />
              )}
              {(!data.image || imgError) && (
                <div className="mt-2 rounded flex items-center justify-center" style={{ height: 80, background: '#1a1d21' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#611f6944" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { data: OGData; }

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function InstagramPreview({ data }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const username = data.domain.replace(/\./g, '_').slice(0, 16);
  const avatarLetter = (data.siteName || data.domain || 'I').slice(0, 1).toUpperCase();

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#000' }}>
      {/* Post header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          {/* Avatar with gradient ring */}
          <div className="p-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#000', outline: '2px solid #000' }}>
              <span className="text-white text-xs font-bold">{avatarLetter}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">{username}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Sponsored</p>
          </div>
        </div>
        <button style={{ color: 'rgba(255,255,255,0.7)' }}>···</button>
      </div>

      {/* Image */}
      <div className="relative" style={{ aspectRatio: '1/1', background: '#121212', overflow: 'hidden' }}>
        {data.image && !imgError ? (
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
            </svg>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>No image</p>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3 px-3 py-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
        </svg>
      </div>

      {/* Link banner */}
      <div className="flex items-center justify-between px-3 py-2.5" style={{ background: '#121212', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="min-w-0 flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{data.domain}</p>
          {title && <p className="text-xs font-semibold text-white truncate mt-0.5">{title}</p>}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" className="flex-shrink-0 ml-2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}

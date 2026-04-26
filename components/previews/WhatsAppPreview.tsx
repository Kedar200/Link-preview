'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { 
  data: OGData;
  theme?: 'light' | 'dark';
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function WhatsAppPreview({ data, theme = 'dark' }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const desc = truncate(data.description, 120);

  const isDark = theme === 'dark';
  
  // Background colors based on theme
  const cardBg = isDark ? 'bg-[#024a3c]' : 'bg-[#cfebba]';
  const imgFallbackBg = isDark ? 'bg-[#01352a]' : 'bg-[#bfe3a2]';
  const titleColor = isDark ? 'text-[#e9edef]' : 'text-black';
  const descColor = isDark ? 'text-[#8ea59f]' : 'text-[#54656f]';
  const domainColor = isDark ? 'text-[#e9edef]' : 'text-black';

  return (
    <div className={`rounded-[10px] overflow-hidden flex flex-col ${cardBg}`}>
      {/* Image */}
      {data.image && !imgError ? (
        <img
          src={data.image}
          alt=""
          className="w-full object-cover"
          style={{ maxHeight: 160 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`w-full flex items-center justify-center ${imgFallbackBg}`} style={{ height: 160 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      )}
      
      {/* Text Content */}
      <div className="p-3">
        {title && <p className={`text-[15px] font-semibold ${titleColor} leading-snug mb-1`}>{title}</p>}
        {desc && <p className={`text-[14px] ${descColor} leading-snug mb-3 line-clamp-3`}>{desc}</p>}
        
        {/* Domain Row */}
        <div className="flex items-center gap-1.5 opacity-90">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={domainColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span className={`text-[13px] ${domainColor} font-medium`}>{data.domain}</span>
        </div>
      </div>
    </div>
  );
}

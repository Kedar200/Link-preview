'use client';
import { useState } from 'react';
import type { OGData } from '@/types';

interface Props { 
  data: OGData;
  theme?: 'light' | 'dark';
}

// WhatsApp silently drops OG images larger than ~300 KB
const WHATSAPP_IMAGE_SIZE_LIMIT = 600 * 1024; // 600 KB

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function WhatsAppPreview({ data, theme = 'dark' }: Props) {
  const [imgError, setImgError] = useState(false);
  const title = truncate(data.title || data.domain || 'Untitled', 60);
  const desc = truncate(data.description, 120);

  const isDark = theme === 'dark';

  // Check if image exceeds WhatsApp's size limit
  const imageTooLarge =
    data.imageSize != null && data.imageSize > WHATSAPP_IMAGE_SIZE_LIMIT;
  const showImage = !!data.image && !imgError && !imageTooLarge;
  
  // Background colors based on theme
  const cardBg = isDark ? 'bg-[#024a3c]' : 'bg-[#cfebba]';
  const titleColor = isDark ? 'text-[#e9edef]' : 'text-black';
  const descColor = isDark ? 'text-[#8ea59f]' : 'text-[#54656f]';
  const domainColor = isDark ? 'text-[#e9edef]' : 'text-black';

  return (
    <div className={`rounded-[10px] overflow-hidden flex flex-col transition-all duration-300 ${cardBg}`}>
      {/* Image – only rendered if within WhatsApp's size limit */}
      {showImage && (
        <img
          src={data.image}
          alt=""
          className="w-full h-auto object-contain bg-black/5"
          onError={() => setImgError(true)}
        />
      )}
      
      {/* Text Content */}
      <div className="p-3.5">
        {title && <p className={`text-[16px] font-semibold ${titleColor} leading-snug mb-1.5`}>{title}</p>}
        {desc && <p className={`text-[15px] ${descColor} leading-snug mb-3 line-clamp-3`}>{desc}</p>}
        
        {/* Domain Row */}
        <div className="flex items-center gap-1.5 opacity-90">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={domainColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span className={`text-[14px] ${domainColor} font-medium`}>{data.domain}</span>
        </div>
      </div>
    </div>
  );
}


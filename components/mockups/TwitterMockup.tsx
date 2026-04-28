'use client';
import React from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';

interface Props {
  data: OGData | null;
  loading: boolean;
  theme: 'light' | 'dark';
}

function truncate(s: string, n: number) {
  return s?.length > n ? s.slice(0, n) + '...' : s;
}

export default function TwitterMockup({ data, loading, theme }: Props) {
  const isDark = theme === 'dark';
  
  const bgMain = isDark ? 'bg-black' : 'bg-white';
  const textMain = isDark ? 'text-[#e7e9ea]' : 'text-[#0f1419]';
  const textMuted = isDark ? 'text-[#71767b]' : 'text-[#536471]';
  const borderCol = isDark ? 'border-[#2f3336]' : 'border-[#eff3f4]';
  const iconFill = isDark ? '#e7e9ea' : '#0f1419';
  const mutedFill = isDark ? '#71767b' : '#536471';
  const blueColor = '#1d9bf0';
  const blueBg = 'bg-[#1d9bf0]';

  return (
    <PhoneShell bgApp={bgMain}>
      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-7 pt-3 text-[14px] font-semibold z-40 transition-all duration-300 ${bgMain} ${textMain}`}>
        <span className="pl-1">1:04</span>
        <div className={`flex items-center gap-1.5 opacity-90 pr-1`}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M15.5 0.5C15.5 0.5 12.5 4 8 4C3.5 4 0.5 0.5 0.5 0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M2 3L8 9L14 3" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v4h2v-4h2v-2H2v2zm2-6h2v-6h-2v6zm0-8h2v-2h-2v2zm14 12h2v-4h2v-2h-6v2h2v4zm-2-6h2v-6h-2v6zm0-8h2v-2h-2v2zm-4 14h2v-4h-2v4zm0-6h2v-6h-2v6zm0-8h2v-2h-2v2z"/></svg>
          <span className="text-[12px] font-bold">88</span>
        </div>
      </div>

      {/* Top Header */}
      <div className={`px-4 pb-1 flex items-center justify-between z-40 transition-all duration-300 ${bgMain}`}>
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className={`flex items-center justify-center ${textMain}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z"/></svg>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-[15px] ${textMain}`}>Upgrade</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={iconFill}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b transition-all duration-300 ${borderCol} z-40 ${bgMain}`}>
        <div className="flex-1 flex justify-center cursor-pointer">
          <div className={`py-3 font-bold text-[15px] ${textMain} relative`}>
            For you
            <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-full ${blueBg}`}></div>
          </div>
        </div>
        <div className="flex-1 flex justify-center cursor-pointer">
          <div className={`py-3 font-medium text-[15px] ${textMuted}`}>
            Following
          </div>
        </div>
      </div>

      {/* Feed Content — 3 tweets: above / main card / below */}
      <div className={`flex-1 overflow-hidden scrollbar-hide z-20 pb-16 transition-all duration-300 ${bgMain}`}>
        
        {/* Tweet 1 — ABOVE */}
        <div className={`px-4 py-3 border-b ${borderCol} flex gap-3`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/100?img=68" alt="Raja" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              <span className={`font-bold text-[15px] ${textMain}`}>Raja</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={blueColor} className="flex-shrink-0"><path d="M22.25 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.342-.1.69-.1 1.05 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25s2.816-.916 3.337-2.25c.416.164.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.36-.035-.708-.1-1.05 1.106-.704 1.846-1.99 1.846-3.45z"/><path d="M10.23 15.6l-3.32-3.3c-.3-.3-.3-.78 0-1.08.3-.3.78-.3 1.08 0l2.25 2.24 6.17-6.17c.3-.3.78-.3 1.08 0 .3.3.3.78 0 1.08l-6.71 6.71c-.15.15-.35.22-.54.22-.2 0-.4-.07-.55-.2z" fill="white"/></svg>
              <span className={`text-[15px] ${textMuted} truncate`}>@yesofficialraja</span>
              <span className={`text-[15px] ${textMuted} flex-shrink-0`}>· 6h</span>
            </div>
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.4]`}>What Indian food is this ?</div>
            <div className={`flex items-center gap-5 mt-2 ${textMuted} text-[13px]`}>
              <span>💬 12</span><span>🔄 8</span><span>❤️ 342</span>
            </div>
          </div>
        </div>

        {/* Tweet 2 — MAIN CARD (center) */}
        <div className={`px-4 py-3 border-b ${borderCol} flex gap-3`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/100?img=11" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 min-w-0">
                <span className={`font-bold text-[15px] ${textMain}`}>Kedar</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={blueColor} className="flex-shrink-0"><path d="M22.25 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.342-.1.69-.1 1.05 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25s2.816-.916 3.337-2.25c.416.164.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.36-.035-.708-.1-1.05 1.106-.704 1.846-1.99 1.846-3.45z"/><path d="M10.23 15.6l-3.32-3.3c-.3-.3-.3-.78 0-1.08.3-.3.78-.3 1.08 0l2.25 2.24 6.17-6.17c.3-.3.78-.3 1.08 0 .3.3.3.78 0 1.08l-6.71 6.71c-.15.15-.35.22-.54.22-.2 0-.4-.07-.55-.2z" fill="white"/></svg>
                <span className={`text-[15px] ${textMuted} truncate`}>@kedardeshmukh</span>
                <span className={`text-[15px] ${textMuted} flex-shrink-0`}>· 26s</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={mutedFill} className="flex-shrink-0 ml-2"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
            </div>
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.4]`}>Just shipped my new link preview tool 🚀</div>
            <div className="mt-2.5">
              {data ? (
                <>
                  {data.image ? (
                    /* === Large image card === */
                    <div className={`rounded-2xl overflow-hidden relative border ${borderCol}`}>
                      <img src={data.image} alt="Preview" className="w-full aspect-[1.91/1] object-cover" />
                      {data.title && (
                        <div className="absolute bottom-2 left-2 right-2 flex pointer-events-none">
                          <div className="bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded text-[13px] truncate max-w-full">{truncate(data.title, 45)}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* === Compact card (no image) — matches real X/Twitter === */
                    <div className={`rounded-2xl overflow-hidden border ${borderCol} flex items-stretch`}>
                      {/* Thumbnail / icon area */}
                      <div className={`w-[72px] flex-shrink-0 flex items-center justify-center ${isDark ? 'bg-[#16181c]' : 'bg-[#f0f3f4]'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={mutedFill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18M9 21V9" />
                        </svg>
                      </div>
                      {/* Text area */}
                      <div className={`flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-center gap-0.5 ${isDark ? 'bg-[#16181c]' : 'bg-[#f7f9f9]'}`}>
                        <span className={`text-[13px] ${textMuted} leading-tight`}>{data.domain?.toLowerCase() || data.siteName?.toLowerCase()}</span>
                        {data.title && (
                          <span className={`text-[15px] ${textMain} leading-snug truncate font-normal`}>{truncate(data.title, 50)}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {data.image && (data.siteName || data.domain) && (
                    <div className={`text-[13px] ${textMuted} mt-1.5`}>From {data.siteName?.toLowerCase() || data.domain?.toLowerCase()}</div>
                  )}
                </>
              ) : loading ? (
                 <div className={`rounded-2xl w-full aspect-[1.91/1] ${isDark ? 'bg-[#16181c]' : 'bg-gray-200'} animate-pulse`}></div>
              ) : (
                 <div className={`rounded-2xl w-full aspect-[1.91/1] border ${borderCol} flex items-center justify-center ${isDark ? 'bg-[#16181c]' : 'bg-[#f7f9f9]'}`}>
                   <span className={textMuted}>Waiting for link...</span>
                 </div>
              )}
            </div>
            <div className={`flex items-center gap-5 mt-2.5 ${textMuted} text-[13px]`}>
              <span>💬 7</span><span>🔄 41</span><span>❤️ 901</span><span>📊 36.4K</span>
            </div>
          </div>
        </div>

        {/* Tweet 3 — BELOW */}
        <div className={`px-4 py-3 border-b ${borderCol} flex gap-3`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/100?img=33" alt="Sam" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 min-w-0">
              <span className={`font-bold text-[15px] ${textMain}`}>Sam</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={blueColor} className="flex-shrink-0"><path d="M22.25 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.342-.1.69-.1 1.05 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25s2.816-.916 3.337-2.25c.416.164.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.36-.035-.708-.1-1.05 1.106-.704 1.846-1.99 1.846-3.45z"/><path d="M10.23 15.6l-3.32-3.3c-.3-.3-.3-.78 0-1.08.3-.3.78-.3 1.08 0l2.25 2.24 6.17-6.17c.3-.3.78-.3 1.08 0 .3.3.3.78 0 1.08l-6.71 6.71c-.15.15-.35.22-.54.22-.2 0-.4-.07-.55-.2z" fill="white"/></svg>
              <span className={`text-[15px] ${textMuted} truncate`}>@sam_tech</span>
              <span className={`text-[15px] ${textMuted} flex-shrink-0`}>· 2h</span>
            </div>
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.4]`}>A guide on optimizing social media meta tags for better engagement 🧵</div>
            <div className={`flex items-center gap-5 mt-2 ${textMuted} text-[13px]`}>
              <span>💬 24</span><span>🔄 156</span><span>❤️ 2.1K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute right-4 bottom-20 z-50">
        <div className={`w-[56px] h-[56px] rounded-full ${blueBg} flex items-center justify-center shadow-lg`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"/></svg>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`absolute bottom-0 inset-x-0 border-t transition-all duration-300 ${borderCol} ${bgMain} z-40 flex items-center justify-around px-2 pb-6 pt-2`}>
        {/* Home - Active */}
        <div className="p-2 relative flex items-center justify-center">
           <svg width="26" height="26" viewBox="0 0 24 24" fill={iconFill}><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/></svg>
        </div>
        {/* Search */}
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={mutedFill} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        {/* Grok / Quill */}
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={mutedFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
        </div>
        {/* Notifications with badge */}
        <div className="p-2 relative">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={mutedFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
           <div className={`absolute top-0.5 right-0 w-[18px] h-[18px] ${blueBg} rounded-full border-2 ${isDark ? 'border-black' : 'border-white'} flex items-center justify-center text-white text-[10px] font-bold`}>2</div>
        </div>
        {/* Messages */}
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={mutedFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>
      
    </PhoneShell>
  );
}

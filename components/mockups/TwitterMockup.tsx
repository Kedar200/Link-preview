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
  const isDark = theme === 'dark'; // Responsive to theme prop now
  
  const bgMain = isDark ? 'bg-black' : 'bg-white';
  const textMain = isDark ? 'text-[#e7e9ea]' : 'text-[#0f1419]';
  const textMuted = isDark ? 'text-[#71767b]' : 'text-[#536471]';
  const borderCol = isDark ? 'border-[#2f3336]' : 'border-[#eff3f4]';
  const blueColor = '#1d9bf0';
  const blueBg = 'bg-[#1d9bf0]';

  return (
    <PhoneShell bgApp={bgMain}>
      {/* Top Header */}
      <div className={`pt-2 px-4 flex items-center justify-between z-40 transition-all duration-300 ${bgMain}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className={`w-8 h-8 flex items-center justify-center ${textMain}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z"/></svg>
        </div>
        <div>
          <button className={`px-4 py-1.5 rounded-full border font-bold text-[14px] ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b transition-all duration-300 ${borderCol} mt-2 z-40 ${bgMain}`}>
        <div className="flex-1 flex justify-center hover:bg-white/5 cursor-pointer">
          <div className={`py-3.5 font-bold text-[15px] ${textMain} relative`}>
            For you
            <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-full ${blueBg}`}></div>
          </div>
        </div>
        <div className="flex-1 flex justify-center hover:bg-white/5 cursor-pointer">
          <div className={`py-3.5 font-medium text-[15px] ${textMuted}`}>
            Following
          </div>
        </div>
      </div>

      {/* Show posts banner */}
      <div className={`py-3 border-b transition-all duration-300 ${borderCol} text-center font-normal text-[15px] ${bgMain} z-30 cursor-pointer`} style={{ color: blueColor }}>
        Show 28 posts
      </div>

      {/* Feed Content */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide z-20 pb-20 transition-all duration-300 ${bgMain}`}>
        
        {/* Main Tweet */}
        <div className={`p-4 border-b ${borderCol} flex gap-3`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/100?img=11" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <span className={`font-bold text-[15px] ${textMain} truncate max-w-[120px]`}>Alex</span>
                <span className={`text-[15px] ${textMuted} truncate`}>@alex</span>
                <span className={`text-[15px] ${textMuted}`}>· 26s</span>
              </div>
              <div className={`flex items-center gap-2 ${textMuted}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11H8v-2h8v2z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
              </div>
            </div>

            {/* Tweet Text */}
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.35]`}>
              This new link preview tool is exactly what I've been looking for. The generated cards look incredible!
            </div>

            {/* Link Preview */}
            <div className="mt-3">
              {data ? (
                <>
                  <div className={`rounded-2xl overflow-hidden relative border ${borderCol}`}>
                    {data.image ? (
                       <img src={data.image} alt="Preview" className="w-full aspect-[1.91/1] object-cover" />
                    ) : (
                       <div className={`w-full aspect-[1.91/1] flex items-center justify-center ${isDark ? 'bg-[#16181c]' : 'bg-[#f7f9f9]'}`}>
                         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={textMuted} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                       </div>
                    )}
                    
                    {/* Floating Title Pill */}
                    {data.title && (
                      <div className="absolute bottom-2 left-2 right-2 flex pointer-events-none">
                        <div className="bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded text-[13px] font-medium truncate max-w-full">
                          {truncate(data.title, 50)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Domain Text */}
                  {(data.siteName || data.domain) && (
                    <div className={`text-[13px] ${textMuted} mt-1.5 px-0.5`}>
                      From {data.siteName?.toLowerCase() || data.domain?.toLowerCase()}
                    </div>
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

            {/* Action Bar */}
            <div className={`flex justify-between items-center mt-3 ${textMuted} pr-2`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              <div className="flex items-center gap-4">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Second Tweet */}
        <div className={`p-4 border-b ${borderCol} flex gap-3`}>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/100?img=68" alt="How To AI" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <span className={`font-bold text-[15px] ${textMain} truncate`}>Sam</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={blueColor} className="flex-shrink-0 mt-0.5"><path d="M22.25 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.342-.1.69-.1 1.05 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25s2.816-.916 3.337-2.25c.416.164.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.36-.035-.708-.1-1.05 1.106-.704 1.846-1.99 1.846-3.45z"/><path d="M10.23 15.6l-3.32-3.3c-.3-.3-.3-.78 0-1.08.3-.3.78-.3 1.08 0l2.25 2.24 6.17-6.17c.3-.3.78-.3 1.08 0 .3.3.3.78 0 1.08l-6.71 6.71c-.15.15-.35.22-.54.22-.2 0-.4-.07-.55-.2z" fill="white"/></svg>
                <span className={`text-[15px] ${textMuted} truncate`}>@sam_tech</span>
                <span className={`text-[15px] ${textMuted}`}>· 2h</span>
              </div>
              <div className={`flex items-center gap-2 ${textMuted}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11H8v-2h8v2z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
              </div>
            </div>
            
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.35]`}>
              Just dropped: A comprehensive guide on optimizing your social media meta tags for better engagement and click-through rates. Thread 🧵
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute right-4 bottom-20 z-50">
        <div className={`w-[56px] h-[56px] rounded-full ${blueBg} flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#1a8cd8] transition-colors`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"/></svg>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`absolute bottom-0 inset-x-0 h-[50px] border-t transition-all duration-300 ${borderCol} ${bgMain} z-40 flex items-center justify-around pb-1`}>
        <div className="p-2 relative flex items-center justify-center">
           <svg width="26" height="26" viewBox="0 0 24 24" fill={textMain}><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" fill={textMain}/></svg>
           {/* Active Indicator */}
           <div className={`absolute bottom-0 w-1.5 h-1.5 rounded-full ${blueBg}`}></div>
        </div>
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="6.5"/></svg>
        </div>
        <div className="p-2 relative">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
           {/* Badge */}
           <div className={`absolute top-1.5 right-1 w-4 h-4 ${blueBg} rounded-full border-[1.5px] border-black flex items-center justify-center text-white text-[10px] font-bold`}>2</div>
        </div>
        <div className="p-2">
           <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={textMain} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>
      
    </PhoneShell>
  );
}

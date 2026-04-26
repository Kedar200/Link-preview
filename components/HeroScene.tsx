'use client';
import { useState } from 'react';
import type { OGData } from '@/types';
import UrlInput from './UrlInput';
import WhatsAppPreview from './previews/WhatsAppPreview';

function PhoneMockup({ data, loading, theme }: { data: OGData | null; loading: boolean; theme: 'light' | 'dark' }) {
  const isDark = theme === 'dark';
  
  // Theme Variables
  const bgApp = isDark ? 'bg-[#0b141a]' : 'bg-[#efeae2]';
  const bgHeader = isDark ? 'bg-[#0b141a]' : 'bg-[#ffffff]';
  const textTitle = isDark ? 'text-[#e9edef]' : 'text-black';
  const textSub = isDark ? 'text-[#8696a0]' : 'text-[#54656f]';
  const borderHeader = isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]';
  const iconColor = isDark ? '#8696a0' : '#54656f';
  const headerIconColor = isDark ? 'currentColor' : '#54656f';
  
  const bgIncoming = isDark ? 'bg-[#202c33]' : 'bg-[#ffffff]';
  const textIncoming = isDark ? 'text-[#e9edef]' : 'text-[#111b21]';
  const bgOutgoing = isDark ? 'bg-[#005c4b]' : 'bg-[#e1f6cb]';
  
  const bgDate = isDark ? 'bg-[#182229]' : 'bg-[#ffffff]';
  
  const bgInputBar = isDark ? 'bg-[#0b141a]' : 'bg-[#ffffff]';
  const bgInputPill = isDark ? 'bg-[#1f2c34]' : 'bg-[#f0f2f5]';
  const inputBorder = isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-transparent';
  
  const micIconFill = isDark ? '#0b141a' : '#ffffff';

  return (
    <div 
      className={`relative w-[390px] h-[844px] flex-shrink-0 ${bgApp} rounded-[55px] border-[16px] border-black overflow-hidden flex flex-col pointer-events-auto shadow-2xl`}
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      
      {/* Hardware Buttons */}
      <div className="absolute -left-[19px] top-[150px] w-[3px] h-[35px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[19px] top-[210px] w-[3px] h-[65px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[19px] top-[290px] w-[3px] h-[65px] bg-black rounded-l-md z-0" />
      <div className="absolute -right-[19px] top-[240px] w-[3px] h-[95px] bg-black rounded-r-md z-0" />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-[24px] z-50 flex items-center justify-end px-5">
        <div className="w-3 h-3 rounded-full bg-[#111] shadow-inner border border-white/5"></div>
      </div>

      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-7 pt-3 text-[14px] font-semibold z-40 ${bgHeader} ${textTitle}`}>
        <span className="pl-1">12:45</span>
        <div className={`flex items-center gap-1.5 opacity-90 pr-1 ${isDark ? '' : 'text-black'}`}>
          <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className={`${bgHeader} flex items-center px-3 py-3 gap-2 z-30 shadow-sm border-b ${borderHeader}`}>
        <div className={`flex items-center cursor-pointer`} style={{ color: headerIconColor }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0 ml-1">
            <img src="https://i.pravatar.cc/100?img=47" alt="Manas" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 ml-2">
          <div className={`font-semibold text-[17px] leading-tight tracking-wide ${textTitle}`}>Manas</div>
        </div>
        <div className="flex items-center gap-6 pr-2" style={{ color: headerIconColor }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto relative p-3 flex flex-col gap-3 scrollbar-hide z-20 pb-4`}>
        <div 
          className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-10' : 'opacity-10 invert'}`} 
          style={{ 
            backgroundImage: 'url("/wa-bg.png")', 
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'repeat-y'
          }} 
        ></div>
        
        <div className="flex justify-center z-10 mt-1">
          <span className={`${bgDate} ${textSub} font-medium text-[11px] px-3 py-1.5 rounded-lg shadow-sm`}>Yesterday</span>
        </div>

        {/* Fake Incoming Message - Sticker */}
        <div className={`${bgIncoming} ${textIncoming} text-[15px] p-2 rounded-xl rounded-tl-none shadow-sm self-start max-w-[85%] relative z-10 mt-2`}>
          <div className="w-24 h-24 bg-black/10 rounded flex items-center justify-center mb-1">
            <span className="text-3xl">🐹</span>
          </div>
          <div className={`text-[10px] ${textSub} text-right mt-1`}>11:27 pm</div>
        </div>

        <div className="flex justify-center z-10 mt-2">
          <span className={`${bgDate} ${textSub} font-medium text-[11px] px-3 py-1.5 rounded-lg shadow-sm`}>Today</span>
        </div>

        {/* Real Message (Preview) */}
        <div className={`${bgOutgoing} p-1.5 rounded-xl rounded-tr-none shadow-sm self-end w-[95%] relative z-10 mt-2`}>
          <div className={`absolute top-0 -right-2 w-3 h-3 ${bgOutgoing}`} style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
          
          {data ? (
            <div className="rounded-[10px] overflow-hidden">
              <div className="scale-[0.98] transform-gpu origin-top">
                <WhatsAppPreview data={data} theme={theme} />
              </div>
              <div className="px-2 pt-0.5 pb-1 flex justify-end gap-1 items-center">
                <span className={`text-[10px] ${textSub}`}>12:33 pm</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53bdeb" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          ) : loading ? (
             <div className={`h-32 ${isDark ? 'bg-black/20' : 'bg-black/5'} animate-pulse rounded-[10px] border border-[rgba(255,255,255,0.05)] flex items-center justify-center`}>
                <span className={`${textSub} text-xs`}>Generating preview...</span>
             </div>
          ) : (
            <div className={`p-4 ${isDark ? 'bg-black/20' : 'bg-white/50'} rounded-[10px] border border-[rgba(255,255,255,0.05)] text-center text-sm ${textSub} italic`}>
               Waiting for you to paste a link...
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className={`${bgInputBar} p-2 flex items-end gap-2 z-30 pb-3 relative`}>
        <div className={`flex-1 ${bgInputPill} rounded-[24px] min-h-[50px] px-3.5 py-2.5 flex items-center text-[16px] gap-3.5 ml-1 border ${inputBorder}`}>
          {/* Smiley Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 10l.01 0" />
            <path d="M15 10l.01 0" />
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          </svg>
          
          {/* Input Text */}
          <div className="flex-1 flex items-center">
            <span className={`${textSub} text-[17px] leading-none mt-0.5`}>Message</span>
            <span className="w-0.5 h-5 bg-[#00a884] ml-0.5 animate-pulse rounded-full"></span>
          </div>

          {/* Paperclip Icon (Upright) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 transform -rotate-45 sm:rotate-0">
             <path d="M10.5 15.5v-6.5a1.5 1.5 0 0 1 3 0v7.5a3 3 0 0 1 -6 0v-8.5a4.5 4.5 0 0 1 9 0v7.5" />
          </svg>

          {/* Rupee Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M14.5 8.5h-5h1.5a2.5 2.5 0 0 1 0 5h-1.5l3.5 4" />
            <path d="M9.5 11h5" />
          </svg>

          {/* Camera Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M5 7h2.5l1.5 -2h6l1.5 2h2.5a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        </div>
        
        {/* Mic Button */}
        <div className="w-[50px] h-[50px] bg-[#00a884] rounded-full flex justify-center items-center flex-shrink-0 mr-1 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={micIconFill}>
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.76 6.43 6 6.92V21h2v-3.08c3.24-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className={`${bgInputBar} h-8 flex justify-center items-center pb-3 z-30 pt-1`}>
        <div className="w-[140px] h-[5px] bg-[#8696a0] rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

interface HeroSceneProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  data: OGData | null;
  error: string | null;
  hasSearched: boolean;
}

export default function HeroScene({ onSubmit, loading, data, error }: HeroSceneProps) {
  const [phoneTheme, setPhoneTheme] = useState<'light'|'dark'>('light');

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Content Area */}
      <div className="relative z-20 w-full lg:w-[45%] flex flex-col justify-start px-6 sm:px-12 xl:px-20 pt-20 pb-16 lg:pb-32 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-syne font-bold text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6 text-white max-w-[500px]">
            See how your links appear everywhere.
          </h1>

          <p className="font-mono text-base leading-relaxed mb-10 text-[rgba(255,255,255,0.7)] max-w-[420px]">
            Instantly generate pixel-perfect previews for major social platforms. Ensure your content always looks its best before you hit publish.
          </p>

          <div className="w-full max-w-[480px]">
            <UrlInput onSubmit={onSubmit} loading={loading} />
          </div>

          {error && !loading && (
            <p className="mt-4 text-sm text-red-400 font-mono fade-in">{error}</p>
          )}
        </div>
      </div>

      {/* Right Content Area (Phone Mockup) */}
      <div className="relative z-10 w-full lg:w-[55%] flex items-start lg:items-center justify-center p-4 lg:p-12 pb-20 lg:pb-12 pointer-events-none pt-12 lg:pt-0">
        
        <div className="relative flex flex-col items-center justify-center">
          {/* Theme Toggle */}
          <div className="absolute top-2 lg:top-12 -right-4 lg:-right-10 z-50 pointer-events-auto">
            <button 
              onClick={() => setPhoneTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 shadow-xl"
              aria-label="Toggle theme"
              title={`Switch to ${phoneTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {phoneTheme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>

          <div className="pointer-events-auto transform scale-[0.55] sm:scale-75 md:scale-[0.85] lg:scale-[0.85] origin-top mt-4 lg:mt-0 mb-[-380px] sm:mb-[-210px] md:mb-[-126px] lg:mb-[-126px]">
            <PhoneMockup data={data} loading={loading} theme={phoneTheme} />
          </div>
        </div>
      </div>

    </div>
  );
}

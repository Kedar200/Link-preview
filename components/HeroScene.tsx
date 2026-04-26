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
    <div className={`relative w-full max-w-[330px] mx-auto h-[680px] ${bgApp} rounded-[48px] border-[14px] border-black overflow-hidden flex flex-col pointer-events-auto transform transition-transform duration-300`}>
      
      {/* Hardware Buttons */}
      <div className="absolute -left-[16px] top-[110px] w-[3px] h-[30px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[16px] top-[160px] w-[3px] h-[60px] bg-black rounded-l-md z-0" />
      <div className="absolute -left-[16px] top-[230px] w-[3px] h-[60px] bg-black rounded-l-md z-0" />
      <div className="absolute -right-[16px] top-[180px] w-[3px] h-[80px] bg-black rounded-r-md z-0" />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50 flex items-center justify-end px-5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] shadow-inner border border-white/5"></div>
      </div>

      {/* Status bar */}
      <div className={`h-9 w-full flex items-center justify-between px-6 pt-2 text-[12px] font-semibold z-40 ${bgHeader} ${textTitle}`}>
        <span className="pl-1">12:45</span>
        <div className={`flex items-center gap-1.5 opacity-90 pr-1 ${isDark ? '' : 'text-black'}`}>
          <svg width="14" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="16" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className={`${bgHeader} flex items-center px-2 py-2 gap-1.5 z-30 shadow-sm border-b ${borderHeader}`}>
        <div className={`flex items-center cursor-pointer`} style={{ color: headerIconColor }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden flex-shrink-0 ml-1">
            <img src="https://i.pravatar.cc/100?img=47" alt="Pranav Khude" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 ml-2">
          <div className={`font-semibold text-[16px] leading-tight tracking-wide ${textTitle}`}>Pranav Khude</div>
          {/* Omitted "online" based on the new screenshot */}
        </div>
        <div className="flex items-center gap-5 pr-2" style={{ color: headerIconColor }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto relative p-3 flex flex-col gap-3 scrollbar-hide z-20 pb-4`}>
        <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${!isDark && 'opacity-40'}`} style={{ backgroundImage: isDark ? 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' : 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
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
      <div className={`${bgInputBar} p-1.5 flex items-end gap-1.5 z-30 pb-2 relative`}>
        <div className={`flex-1 ${bgInputPill} rounded-[24px] min-h-[46px] px-3 py-2 flex items-center text-[15px] gap-3 ml-1 border ${inputBorder}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <span className={`${textSub} flex-1 text-[16px]`}>Message</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" className="-rotate-45 transform origin-center"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
        <div className="w-[46px] h-[46px] bg-[#00a884] rounded-full flex justify-center items-center flex-shrink-0 mr-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill={micIconFill}><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.39-.9.88v2.06c0 2.68-2.24 4.89-5.01 4.89s-5.01-2.21-5.01-4.89v-2.06c0-.49-.41-.88-.9-.88s-.9.39-.9.88v2.06c0 3.53 2.76 6.43 6.21 6.84V20H8.38c-.48 0-.88.39-.88.88s.4.88.88.88h7.24c.48 0 .88-.39.88-.88s-.4-.88-.88-.88h-3.11v-2.14c3.45-.41 6.21-3.31 6.21-6.84v-2.06c0-.49-.41-.88-.9-.88z"/></svg>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className={`${bgInputBar} h-8 flex justify-center items-center pb-2 z-30 pt-1`}>
        <div className="w-[120px] h-[4px] bg-[#8696a0] rounded-full opacity-60"></div>
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
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col items-center justify-center p-4 lg:p-12 pb-20 lg:pb-12 pointer-events-none">
        
        {/* Theme Toggle */}
        <div className="pointer-events-auto flex items-center bg-black/30 p-1.5 rounded-full mb-6 backdrop-blur-md border border-white/10 shadow-xl">
          <button 
            onClick={() => setPhoneTheme('light')}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${phoneTheme === 'light' ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'}`}
          >
            Light Theme
          </button>
          <button 
            onClick={() => setPhoneTheme('dark')}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${phoneTheme === 'dark' ? 'bg-[#0b141a] text-white shadow-sm border border-white/10' : 'text-white/70 hover:text-white'}`}
          >
            Dark Theme
          </button>
        </div>

        <PhoneMockup data={data} loading={loading} theme={phoneTheme} />
      </div>

    </div>
  );
}

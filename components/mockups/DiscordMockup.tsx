'use client';
import React from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';

interface Props {
  data: OGData | null;
  loading: boolean;
  theme: 'light' | 'dark';
}

export default function DiscordMockup({ data, loading, theme }: Props) {
  const isDark = theme === 'dark';
  
  // Base Discord Theme Colors
  const bgMain = isDark ? 'bg-[#313338]' : 'bg-[#ffffff]';
  const bgServerHeader = isDark ? 'bg-[#111214]' : 'bg-[#e3e5e8]';
  const bgHeader = isDark ? 'bg-[#313338]' : 'bg-[#f2f3f5]';
  const textMain = isDark ? 'text-[#dbdee1]' : 'text-[#313338]';
  const textTitle = isDark ? 'text-[#f2f3f5]' : 'text-[#060607]';
  const textMuted = isDark ? 'text-[#949ba4]' : 'text-[#5c5e66]';
  
  const bgEmbed = isDark ? 'bg-[#2b2d31]' : 'bg-[#f2f3f5]';
  const bgInput = isDark ? 'bg-[#383a40]' : 'bg-[#ebedef]';
  const bgCode = isDark ? 'bg-[#1e1f22]' : 'bg-[#e3e5e8]';
  
  const linkColor = isDark ? 'text-[#00a8fc]' : 'text-[#006ce7]';
  const dividerCol = isDark ? 'bg-[#3f4147]' : 'bg-[#e3e5e8]';

  return (
    <PhoneShell bgApp={bgMain}>
      {/* Topmost Server Header */}
      <div className={`h-11 w-full flex items-center justify-between px-4 pt-1 text-[13px] font-bold z-40 ${bgServerHeader} ${textMuted} border-b ${isDark ? 'border-[#1e1f22]' : 'border-[#d1d3d6]'}`}>
        <div className="flex-1"></div>
        <div className={`flex items-center gap-1.5 ${textTitle}`}>
          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
             <img src="https://github.com/Kedar200.png" alt="Server" className="w-full h-full object-cover" />
          </div>
          LinkPeek
        </div>
        <div className="flex-1 flex justify-end gap-3 opacity-80">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
        </div>
      </div>

      {/* Channel Header */}
      <div className={`flex items-center px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${bgHeader} z-30`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={textTitle}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <div className="flex items-center ml-4 gap-2 flex-1 min-w-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={textMuted}><path d="M10.59 4l-1.63 7H4.5v2h4.03l-1.16 5H3.5v2h3.41l-1.63 7h2.24l1.63-7h4.43l-1.63 7h2.24l1.63-7h4.43v-2h-4.03l1.16-5h3.86v-2h-3.41l1.63-7h-2.24l-1.63 7h-4.43l1.63-7H10.59zm3.56 9h-4.43l1.16-5h4.43l-1.16 5z"/></svg>
          <div className={`font-bold text-[16px] leading-tight ${textTitle}`}>general</div>
          <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#4f545c]' : 'bg-[#99aab5]'}`}></div>
          <div className={`text-[14px] ${linkColor} truncate`}>Share your cool links here!</div>
        </div>
        <div className="flex items-center gap-4 text-[#666]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={textMuted}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm3.2 2.8C18.15 13.28 17.13 13 16 13c-1.13 0-2.15.28-3.2.8.71 1.05 1.2 2.29 1.2 3.7v1.5h6v-1.5c0-1.41-.49-2.65-1.2-3.7z"/></svg>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto px-1 py-2 flex flex-col gap-0 scrollbar-hide z-20 ${bgMain}`}>
        
        {/* Fake Message 1 */}
        <div className="flex gap-3 px-3 py-1 mt-2 hover:bg-black/5">
          <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden mt-0.5 shadow-sm bg-[#ff7300] flex items-center justify-center text-xl">
             🔥
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className={`font-medium text-[15px] text-[#f38a1d]`}>Alex</span>
              <span className={`bg-[#313338] border ${isDark ? 'border-[#3f4147]' : 'border-[#d1d3d6]'} rounded px-1 text-[10px] font-bold ${textMuted} flex items-center gap-0.5`}><span className="text-[10px]">💻</span> DEV</span>
              <span className="text-[14px]">🤖</span>
              <span className={`text-[12px] ${textMuted} ml-0.5`}>2/8/26, 8:20 AM</span>
            </div>
            <div className={`text-[15px] ${textMain} mt-0.5 leading-[1.35]`}>
              Has anyone checked out this new tool?
            </div>
            <div className={`text-[15px] ${textMain} mt-1 leading-[1.35]`}>
              It creates these beautiful social media previews instantly.
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex items-center my-4 px-3">
          <div className={`flex-1 h-px ${dividerCol}`}></div>
          <span className={`px-2 text-[12px] font-semibold ${textMuted}`}>March 7, 2026</span>
          <div className={`flex-1 h-px ${dividerCol}`}></div>
        </div>

        {/* Fake Message 2 (with our link) */}
        <div className="flex gap-3 px-3 py-1 hover:bg-black/5">
          <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden mt-0.5">
            <img src="https://i.pravatar.cc/100?img=33" alt="cainb" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className={`font-medium text-[15px] text-[#d126cc]`}>Sam</span>
              <span className={`bg-[#313338] border ${isDark ? 'border-[#3f4147]' : 'border-[#d1d3d6]'} rounded px-1 text-[10px] font-bold ${textMuted} flex items-center gap-0.5`}><span className="text-[#3ba55c]">✦</span> MOD</span>
              <span className={`text-[12px] ${textMuted} ml-0.5`}>3/7/26, 11:09 PM</span>
            </div>
            <div className={`text-[15px] ${textMain} mt-0.5 leading-[1.35] whitespace-pre-wrap break-words`}>
              <span className={`${bgCode} px-1.5 py-0.5 rounded font-mono text-[13px]`}>https://linkpeek.com</span> &lt;- Yeah, I've been using it for all my projects recently. <br/>
              <span className={`${linkColor} hover:underline cursor-pointer`}>{data?.url || 'https://linkpeek.com/demo'}</span>
            </div>

            {/* Link Preview (Discord Embed) */}
            {data ? (
              <div className={`mt-2 rounded-[4px] overflow-hidden ${bgEmbed} max-w-[340px] flex border-l-4 border-transparent`} style={{ borderLeftColor: isDark ? '#202225' : '#e3e5e8' }}>
                <div className="flex-1 p-3">
                  <div className={`text-[12px] ${textMuted} mb-1 font-semibold`}>{data?.siteName || data?.domain || 'LinkPeek'}</div>
                  <div className={`text-[15px] font-bold ${linkColor} leading-tight mb-2 hover:underline cursor-pointer`}>{data?.title || 'LinkPeek - Social Media Previews'}</div>
                  {data.description && <div className={`text-[14px] ${textMain} leading-snug mb-3`}>{data.description}</div>}
                  {data.image && (
                    <div className="rounded-md overflow-hidden">
                      <img src={data.image} alt="Preview" className="max-w-full h-auto object-cover max-h-[200px] rounded-md" />
                    </div>
                  )}
                </div>
              </div>
            ) : loading ? (
              <div className={`mt-2 rounded-[4px] overflow-hidden ${bgEmbed} max-w-[340px] flex border-l-4 border-transparent`} style={{ borderLeftColor: isDark ? '#202225' : '#e3e5e8' }}>
                <div className="flex-1 p-3 animate-pulse">
                  <div className={`h-3 w-1/4 rounded ${isDark ? 'bg-[#3f4147]' : 'bg-gray-300'} mb-2`}></div>
                  <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-[#3f4147]' : 'bg-gray-300'} mb-3`}></div>
                  <div className={`h-[120px] w-full rounded ${isDark ? 'bg-[#3f4147]' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            ) : (
              <div className={`mt-2 rounded-[4px] p-3 text-[13px] ${textMuted} italic ${bgEmbed} max-w-[340px] border-l-4 border-transparent`} style={{ borderLeftColor: isDark ? '#202225' : '#e3e5e8' }}>
                Waiting for link...
              </div>
            )}

            <div className={`text-[15px] ${textMain} mt-2 leading-[1.35]`}>
              <span className={`${bgCode} px-1.5 py-0.5 rounded font-mono text-[13px]`}>The meta tags</span> are generated flawlessly.
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex items-center my-4 px-3">
          <div className={`flex-1 h-px ${dividerCol}`}></div>
          <span className={`px-2 text-[12px] font-semibold ${textMuted}`}>March 8, 2026</span>
          <div className={`flex-1 h-px ${dividerCol}`}></div>
        </div>

        {/* Fake Message 3 */}
        <div className="flex gap-3 px-3 py-1 hover:bg-black/5 relative">
          <div className="absolute left-6 top-2 w-[22px] h-4 border-l-2 border-t-2 border-[#4f545c] rounded-tl-lg" style={{ top: '14px', height: '14px' }}></div>
          <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden mt-4 shadow-sm bg-[#ff7300] flex items-center justify-center text-xl z-10">
             🔥
          </div>
          <div className="flex-1 min-w-0">
            {/* Reply thread */}
            <div className="flex items-center gap-1.5 ml-0 mb-0.5 z-10 relative mt-0.5">
              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                <img src="https://i.pravatar.cc/100?img=33" alt="Sam" className="w-full h-full object-cover" />
              </div>
              <span className={`font-semibold text-[13px] text-[#d126cc]`}>@Sam</span>
              <span className={`bg-[#313338] border ${isDark ? 'border-[#3f4147]' : 'border-[#d1d3d6]'} rounded px-1 text-[9px] font-bold ${textMuted} flex items-center gap-0.5`}><span className="text-[#3ba55c]">✦</span> MOD</span>
              <span className={`text-[13px] ${textMuted} truncate`}><span className={`${bgCode} px-1 py-px rounded font-mono text-[11px]`}>The meta tags</span> are generated flawlessly.</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`font-medium text-[15px] text-[#f38a1d]`}>Alex</span>
              <span className={`bg-[#313338] border ${isDark ? 'border-[#3f4147]' : 'border-[#d1d3d6]'} rounded px-1 text-[10px] font-bold ${textMuted} flex items-center gap-0.5`}><span className="text-[10px]">💻</span> DEV</span>
              <span className="text-[14px]">🤖</span>
              <span className={`text-[12px] ${textMuted} ml-0.5`}>3/8/26, 3:04 AM</span>
            </div>
            <div className={`text-[15px] ${textMain} mt-0.5 leading-[1.35]`}>
              That looks incredibly useful, I'll definitely give it a try!
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className={`px-3 py-2 ${bgMain} z-30 pb-6 relative`}>
        <div className={`flex items-center gap-3 ${bgInput} rounded-[24px] min-h-[44px] px-3 border border-transparent shadow-sm`}>
          <button className={`w-6 h-6 rounded-full ${isDark ? 'bg-[#4f545c]' : 'bg-[#b9bbbe]'} text-${isDark ? '[#383a40]' : 'white'} flex items-center justify-center flex-shrink-0`}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#383a40' : '#ffffff'} strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          
          <div className="flex-1 flex items-center h-full">
            <span className={`text-[15px] ${textMuted}`}>Message #general</span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={textMuted}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 1.5 8.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
             <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={textMuted}><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm-3-4v2h8V7H8z"/></svg>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={isDark ? 'text-[#4f545c]' : 'text-[#b9bbbe]'}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
        <div className={`w-[130px] h-[4px] rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
      </div>
    </PhoneShell>
  );
}

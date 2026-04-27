'use client';
import React, { useMemo } from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';

interface Props {
  data: OGData | null;
  loading: boolean;
  theme: 'light' | 'dark';
}

const NAMES = [
  'Jordan Smith',
  'Alex Rivera',
  'Taylor Morgan',
  'Casey Wright',
  'Riley Cooper',
  'Jamie Dawson',
  'Quinn Campbell',
  'Skyler Reed',
  'Morgan Page',
  'Avery Hayes'
];

export default function SlackMockup({ data, loading, theme }: Props) {
  const isDark = theme === 'dark';
  
  const randomName = useMemo(() => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);

  const bgApp = isDark ? 'bg-[#1a1d21]' : 'bg-[#ffffff]';
  const textMain = isDark ? 'text-[#d1d2d3]' : 'text-[#1d1c1d]';
  const textTitle = isDark ? 'text-[#ffffff]' : 'text-[#1d1c1d]';
  const textMuted = isDark ? 'text-[#ababad]' : 'text-[#616061]';
  const headerBg = isDark ? 'bg-[#1a1d21]' : 'bg-[#ffffff]';
  const borderCol = isDark ? 'border-[#3a3b3c]' : 'border-[#e2e2e2]';
  const linkCol = isDark ? 'text-[#1d9bd1]' : 'text-[#0b4d9c]';
  
  const proBg = isDark ? 'bg-[#3b2b13]' : 'bg-[#f4ebe1]';
  const proText = isDark ? 'text-[#ffffff]' : 'text-[#1d1c1d]';
  const proBadge = 'bg-[#a333c8] text-white'; // the little purple PRO badge

  return (
    <PhoneShell bgApp={bgApp}>
      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-7 pt-3 text-[14px] font-semibold z-40 ${headerBg} ${textTitle}`}>
        <span className="pl-1">11:21</span>
        <div className="flex items-center gap-1.5 opacity-90 pr-1">
          <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className={`flex items-center px-4 py-2 border-b ${borderCol} ${headerBg} z-30`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={textTitle}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <div className="flex items-center ml-4 gap-2.5">
          <div className="w-9 h-9 rounded-md bg-gray-200 overflow-hidden flex-shrink-0 relative">
            <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2bac76] rounded-full border-[1.5px] border-[#1a1d21]"></div>
          </div>
          <div>
            <div className={`font-bold text-[15px] leading-tight ${textTitle} flex items-center gap-1`}>
              {randomName} (you)
            </div>
            <div className={`text-[12px] font-medium flex items-center gap-1 ${isDark ? 'text-[#2bac76]' : 'text-[#007a5a]'}`}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span className={textMuted}>active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 scrollbar-hide z-20 ${bgApp}`}>
        
        {/* Intro text */}
        <p className={`text-[15px] ${textMain} leading-snug pr-4 mt-2`}>
          This is your private sandbox for testing link previews and sharing curated assets with the marketing team.
        </p>

        {/* PRO Banner */}
        <div className={`mt-2 p-3.5 rounded-xl ${proBg} flex items-start gap-3`}>
          <div className={`${proBadge} text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] mt-0.5 flex-shrink-0 tracking-wide`}>PRO</div>
          <div className={`text-[14px] leading-snug ${proText}`}>
            Messages and files older than 90 days are hidden on your current subscription.<br />
            <span className={`text-[#1d9bd1] font-medium mt-1 inline-block`}>Start a free trial</span>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex justify-center my-2 relative">
          <div className={`absolute inset-0 flex items-center`}>
             <div className={`w-full h-[1px] ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#e2e2e2]'}`}></div>
          </div>
          <span className={`px-4 text-[12px] font-bold z-10 ${bgApp} ${textTitle} rounded-full border ${isDark ? 'border-[#3a3b3c]' : 'border-[#e2e2e2]'} py-1 shadow-sm`}>Today</span>
        </div>

        {/* Link Message */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=60" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-4 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className={`font-bold text-[15px] ${textTitle}`}>{randomName.toUpperCase()}</span>
              <span className={`text-[12px] ${textMuted}`}>23:21</span>
            </div>
            
            <p className={`text-[15px] mt-0.5 ${linkCol} underline-offset-2 hover:underline`}>
              {data?.url || 'https://youtube.com'}
            </p>

            {/* Slack Link Preview Attachment */}
            {(data || !loading) && (
              <div className="mt-2 flex">
                <div className={`w-[4px] flex-shrink-0 rounded-full mr-3 ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#dddddd]'}`}></div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <img src={`https://www.google.com/s2/favicons?domain=${data?.domain || 'client-portal.com'}&sz=32`} className="w-3.5 h-3.5 rounded-sm" />
                    <span className={`text-[12px] font-bold ${textTitle}`}>{data?.siteName || data?.domain || 'Client Portal'}</span>
                  </div>
                  <div className={`font-bold text-[15px] mt-1 leading-tight ${textTitle}`}>{data?.title || 'Q3 Strategy Deck & Assets'}</div>
                  <div className={`text-[14px] mt-1 leading-snug ${textMain}`}>
                    {data?.description || 'Review the final slides and download the accompanying brand assets before the client review.'}
                  </div>
                  
                  <div className="mt-2 rounded-lg overflow-hidden border border-[rgba(0,0,0,0.1)] inline-block max-w-[260px]">
                    <img 
                      src={data?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
                      alt="Preview" 
                      className="w-full object-cover max-h-[160px]" 
                    />
                  </div>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="mt-2 flex animate-pulse">
                 <div className={`w-[4px] flex-shrink-0 rounded-full mr-3 ${isDark ? 'bg-[#3a3b3c]' : 'bg-[#dddddd]'}`}></div>
                 <div className="flex-1 pt-1 space-y-2">
                   <div className={`h-3 w-1/4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                   <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                   <div className={`h-10 w-full rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                 </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`px-4 py-3 ${headerBg} flex items-center gap-3 z-30 pb-6 relative border-t ${borderCol}`}>
        <button className={`w-8 h-8 rounded-full border ${isDark ? 'border-[#555] text-[#ababad]' : 'border-[#999] text-[#616061]'} flex items-center justify-center flex-shrink-0`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div className={`flex-1 ${isDark ? 'bg-[#222529] border-[#3a3b3c]' : 'bg-[#f8f8f8] border-[#dddddd]'} border rounded-xl h-[44px] px-4 flex items-center`}>
          <span className={`text-[15px] ${textMuted}`}>Jot something down</span>
        </div>
        <button className={`${textMuted} flex-shrink-0 pr-1`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
        <div className={`w-[130px] h-[4px] rounded-full ${isDark ? 'bg-gray-400' : 'bg-gray-800'}`} />
      </div>
    </PhoneShell>
  );
}

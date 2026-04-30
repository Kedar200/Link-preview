'use client';
import React, { forwardRef } from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';

interface Props {
  data: OGData | null;
  loading: boolean;
  theme: 'light' | 'dark';
}

const InstagramMockup = forwardRef<HTMLDivElement, Props>(function InstagramMockup({ data, loading, theme }, ref) {
  const isDark = theme === 'dark';
  
  // App-specific Theme Variables
  const bgApp = isDark ? 'bg-[#000000]' : 'bg-[#ffffff]';
  const textPrimary = isDark ? 'text-white' : 'text-black';
  const textSecondary = isDark ? 'text-[#8e8e8e]' : 'text-[#8e8e8e]';
  
  const bgIncoming = isDark ? 'bg-[#262626]' : 'bg-[#efefef]';
  const bgOutgoing = isDark ? 'bg-[#7000ff]' : 'bg-[#3797f0]';
  const textOutgoing = 'text-white';
  
  const bgCard = isDark ? 'bg-[#1c1c1c]' : 'bg-[#f5f5f5]';
  const borderCard = isDark ? 'border-white/5' : 'border-black/5';

  return (
    <PhoneShell ref={ref} bgApp={bgApp}>
      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-8 pt-3 text-[14px] font-bold z-40 transition-all duration-300 ${bgApp} ${textPrimary}`}>
        <span className="pl-1">12:10</span>
        <div className="flex items-center gap-1 pr-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          <span className="text-[13px] font-bold tracking-tighter">93</span>
        </div>
      </div>

      {/* Header */}
      <div className={`${bgApp} flex items-center px-4 py-2 gap-3 z-30 border-b transition-all duration-300 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className={textPrimary}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </div>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img src="/avatars/avatar-sudhanshu.jpg" alt="Sudhanshu" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className={`font-bold text-[16px] leading-tight ${textPrimary}`}>Sudhanshu</div>
            <div className={`text-[12px] opacity-50 ${textPrimary}`}>sudhanshub_999</div>
          </div>
        </div>
        <div className={`flex items-center gap-5 pr-1 flex-shrink-0 ${textPrimary}`}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </div>
      </div>

      {/* Chat Area — scrollable with hidden scrollbar */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide relative px-4 flex flex-col gap-3 z-20 pb-3 transition-all duration-300`}>
        
        {/* IG DM Profile Intro (shown at top of new convos) */}
        <div className="flex flex-col items-center pt-6 pb-2 gap-1">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black/5">
            <img src="/avatars/avatar-sudhanshu.jpg" alt="Sudhanshu" className="w-full h-full object-cover" />
          </div>
          <div className={`font-bold text-[16px] ${textPrimary} mt-1`}>Sudhanshu</div>
          <div className={`text-[13px] ${textSecondary}`}>sudhanshub_999 · Instagram</div>
          <div className={`text-[13px] ${textSecondary}`}>1,247 followers · 89 posts</div>
          <button className={`mt-2 px-5 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-300 ${isDark ? 'bg-[#363636] text-white' : 'bg-[#efefef] text-black'}`}>
            View Profile
          </button>
        </div>

        {/* Date Divider */}
        <div className="flex justify-center my-1">
          <span className={`${textSecondary} font-semibold text-[11px] tracking-wide uppercase`}>Today 12:08 AM</span>
        </div>

        {/* Spacer to push messages toward bottom */}
        <div className="flex-1" />

        {/* Incoming: asking about topic */}
        <div className="flex items-end gap-2.5 max-w-[85%]">
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
            <img src="/avatars/avatar-sudhanshu.jpg" alt="Sudhanshu" className="w-full h-full object-cover" />
          </div>
          <div className={`${bgIncoming} ${textPrimary} px-4 py-2 rounded-[20px] text-[15px] transition-all duration-300`}>
            Bro share me your project url.
          </div>
        </div>

        {/* Outgoing: sharing context */}
        <div className={`${bgOutgoing} ${textOutgoing} px-4 py-2 rounded-[20px] self-end max-w-[80%] text-[15px] transition-all duration-300`}>
          Check this out 👇
        </div>

        {/* Outgoing: Link Preview Card */}
        <div className="flex flex-col gap-1.5 items-end">
          <div className={`w-[88%] ${bgCard} rounded-[22px] overflow-hidden border transition-all duration-300 ${borderCard} shadow-lg`}>
            {data ? (
              <div className="flex flex-col">
                {/* Image */}
                <div className="w-full bg-[#121212] overflow-hidden aspect-[16/9]">
                  {data.image ? (
                    <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/></svg>
                    </div>
                  )}
                </div>
                {/* Title & Description */}
                <div className="px-3.5 py-2.5 flex flex-col gap-0.5">
                  <h4 className={`text-[14px] font-bold ${textPrimary} leading-snug line-clamp-2`}>{data.title || data.domain}</h4>
                  <p className={`text-[12px] leading-[1.35] ${textSecondary} line-clamp-2`}>
                    {data.description || 'No description available.'}
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="aspect-video w-full animate-pulse bg-white/5 flex items-center justify-center">
                <span className={textSecondary}>Generating preview...</span>
              </div>
            ) : (
              <div className="p-8 text-center italic text-sm opacity-40">Waiting for link...</div>
            )}
          </div>

          {/* Outgoing URL Bubble */}
          <div className={`${bgOutgoing} ${textOutgoing} px-4 py-2 rounded-[20px] text-[13px] leading-snug transition-all duration-300 max-w-[90%] min-w-0 overflow-hidden`} style={{ wordBreak: 'break-all' }}>
            {data?.url || 'https://getlinkpeek.com'}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`${bgApp} px-3 py-2 flex items-center gap-2 z-30 relative transition-all duration-300 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="w-10 h-10 bg-[#0095f6] rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
        
        <div className={`flex-1 ${isDark ? 'bg-[#121212]' : 'bg-[#f0f2f5]'} rounded-[22px] h-[42px] px-4 flex items-center text-[15px] gap-3 border transition-all duration-300 ${isDark ? 'border-white/10' : 'border-transparent'}`}>
          <span className={`${textSecondary} flex-1`}>Message...</span>
          <div className={`flex items-center gap-3.5 ${isDark ? 'text-white/50' : 'text-[#8e8e8e]'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className={`${bgApp} h-7 flex justify-center items-center pb-2 z-30 transition-all duration-300`}>
        <div className="w-[130px] h-[4px] bg-[#8e8e8e] rounded-full opacity-40"></div>
      </div>
    </PhoneShell>
  );
});

InstagramMockup.displayName = 'InstagramMockup';
export default InstagramMockup;

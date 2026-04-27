'use client';
import React from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';

interface Props {
  data: OGData | null;
  loading: boolean;
}

export default function LinkedInMockup({ data, loading }: Props) {
  const bgApp = 'bg-white';
  const textMain = 'text-gray-900';
  const textSub = 'text-gray-500';

  return (
    <PhoneShell bgApp={bgApp}>
      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-7 pt-3 text-[14px] font-semibold z-40 bg-white ${textMain}`}>
        <span className="pl-1">11:20</span>
        <div className="flex items-center gap-1.5 opacity-90 pr-1">
          <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center px-4 py-2 border-b border-gray-100 bg-white z-30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <div className="flex-1 ml-4">
          <div className="font-semibold text-[16px] leading-tight text-gray-900">Alex</div>
          <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mt-0.5">
            <div className="w-2 h-2 rounded-full border border-green-600 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-green-600"></div>
            </div>
            Mobile • 3m ago
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#666]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6 scrollbar-hide z-20 bg-white">
        
        {/* SUNDAY Divider */}
        <div className="flex items-center my-1 mt-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-[11px] font-bold text-gray-500 tracking-widest uppercase">SUNDAY</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Kedar: Deleted message */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=12" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">Sam</span>
              <span className="text-[12px] text-gray-500">• (He/Him) • 11:19 PM</span>
            </div>
            <div className="mt-1.5 inline-block bg-[#f3f2ef] rounded-lg px-3 py-1.5 border border-gray-200">
              <span className="text-[14px] text-gray-600 italic">This message has been deleted.</span>
            </div>
          </div>
        </div>

        {/* Pranav: ? */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Pranav" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">Alex</span>
              <svg width="14" height="14" viewBox="0 0 24 24" className="text-gray-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
              <span className="text-[12px] text-gray-500">• 11:32 PM</span>
            </div>
            <p className="text-[15px] mt-1 text-gray-800 leading-snug">?</p>
          </div>
        </div>

        {/* Kedar: Nothing was testing... */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=12" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">Sam</span>
              <span className="text-[12px] text-gray-500">• (He/Him) • 11:35 PM</span>
            </div>
            <p className="text-[15px] mt-1 text-gray-800 leading-snug">Nothing was testing somwthing</p>
          </div>
        </div>

        {/* TODAY Divider */}
        <div className="flex items-center my-1">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-[11px] font-bold text-gray-500 tracking-widest uppercase">TODAY</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Pranav: Oh, OK */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Pranav" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">Alex</span>
              <svg width="14" height="14" viewBox="0 0 24 24" className="text-gray-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
              <span className="text-[12px] text-gray-500">• 7:33 AM</span>
            </div>
            <p className="text-[15px] mt-1 text-gray-800 leading-snug">Oh, OK</p>
          </div>
        </div>

        {/* Link Message */}
        <div className="flex gap-3 relative">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=12" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-10">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-[15px] text-gray-900">Sam</span>
              <span className="text-[12px] text-gray-500">• (He/Him) • 10:25 PM</span>
            </div>
            
            <p className="text-[15px] mt-1 font-medium text-[#0a66c2] break-all leading-snug underline underline-offset-2">
              {data?.url || 'https://medium.com/@kedardeshmukh2003/i-tried-building-a-pinterest-style-masonry-grid-in-react-it-was-harder-than-i-expected-e7dfa85e9e6e'}
            </p>

            {/* LinkedIn DM Link Preview Card */}
            {(data || !loading) && (
              <div className="mt-3 border border-gray-200 rounded-[8px] overflow-hidden flex flex-col bg-white shadow-sm max-w-[280px]">
                <div className="w-full h-[140px] bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200">
                  <img 
                    src={data?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-3 bg-[#f3f2ef]/30">
                  <div className="font-bold text-[14px] text-gray-900 leading-tight line-clamp-2">
                    {data?.title || 'I Tried Building a Pinterest-Style Masonry Grid in React'}
                  </div>
                  <div className="text-[12px] text-gray-500 mt-1">
                    {data?.domain || 'medium.com'}
                  </div>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="mt-3 border border-gray-200 rounded-[8px] overflow-hidden flex flex-col bg-white shadow-sm max-w-[280px] animate-pulse">
                <div className="w-full h-[140px] bg-gray-200"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            )}

            {/* Read status */}
            <div className="absolute right-0 bottom-6 flex flex-col items-center gap-1">
               <div className="w-4 h-4 rounded-full overflow-hidden border border-white">
                  <img src="https://i.pravatar.cc/100?img=11" alt="status" className="w-full h-full object-cover" />
               </div>
               <svg width="14" height="14" viewBox="0 0 24 24" className="text-gray-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="px-3 py-2 border-t border-gray-200 bg-white z-30 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-[#f3f2ef] rounded-lg h-[44px] px-3">
          <span className="flex-1 text-gray-500 text-[15px]">Write a message...</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
        </div>
        
        <div className="flex items-center justify-between px-1 pb-4">
          <div className="flex items-center gap-5 text-gray-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            <div className="text-[12px] font-bold border border-gray-600 rounded px-0.5 leading-none py-0.5">GIF</div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 font-bold text-[15px]">Send</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 h-1 inset-x-0 flex justify-center z-50">
        <div className="w-[130px] h-[4px] bg-gray-300 rounded-full" />
      </div>
    </PhoneShell>
  );
}

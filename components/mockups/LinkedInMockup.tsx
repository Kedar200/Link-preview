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
      <div className="flex items-center px-4 py-2.5 border-b border-gray-200 bg-white z-30 shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <div className="flex-1 ml-4">
          <div className="font-semibold text-[16px] leading-tight text-gray-900">Pranav Khude</div>
          <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Mobile • 2h ago
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#666]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 scrollbar-hide z-20 bg-white">
        
        {/* Fake top message */}
        <div className="flex gap-3 mt-[-40px]">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=11" alt="Pranav" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[15px] text-gray-900">Pranav Khude</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#666"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span className="text-[12px] text-gray-500 ml-1">9:51 AM</span>
            </div>
            <div className="mt-1">
              <div className="text-[32px] leading-none">👍</div>
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-[11px] font-semibold text-gray-500 tracking-wider">SEP 21, 2025</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Shared Post Message */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=60" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-semibold text-[15px] text-gray-900">Kedar Deshmukh</span>
              <span className="bg-[#0a66c2] text-white text-[9px] font-bold px-1 rounded-sm">in</span>
              <span className="text-[13px] text-gray-600">(He/Him)</span>
              <span className="text-[12px] text-gray-500 ml-1">• 11:55 AM</span>
            </div>
            
            <div className="mt-2 border border-gray-200 rounded-lg p-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img src="https://i.pravatar.cc/100?img=33" alt="Ansh" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-[14px] leading-tight text-gray-900">Ansh... • 2nd</div>
                      <div className="text-[12px] text-gray-500 mt-0.5">ML @ Zomato</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                        7mo • Edited • <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-[#0a66c2] font-semibold text-[14px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> Follow
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-gray-800 mt-3 leading-snug">
                You're in an ML Engineer interview at Google, and the interviewer asks:... <span className="text-gray-500">more</span>
              </p>
            </div>
            <div className="flex justify-end mt-1">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-white">
                <img src="https://i.pravatar.cc/100?img=60" alt="Seen" />
              </div>
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-[11px] font-semibold text-gray-500 tracking-wider">TODAY</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Link Message */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img src="https://i.pravatar.cc/100?img=60" alt="Kedar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-semibold text-[15px] text-gray-900">Kedar Deshmukh</span>
              <span className="bg-[#0a66c2] text-white text-[9px] font-bold px-1 rounded-sm">in</span>
              <span className="text-[13px] text-gray-600">(He/Him)</span>
              <span className="text-[12px] text-gray-500 ml-1">• 11:19 PM</span>
            </div>
            
            <p className="text-[15px] mt-1 font-medium text-[#0a66c2] underline underline-offset-2">
              {data?.url || 'https://youtube.com'}
            </p>

            {/* LinkedIn DM Link Preview Card */}
            {data ? (
              <div className="mt-3 border border-gray-300 rounded-[12px] flex overflow-hidden max-w-[280px]">
                <div className="w-[100px] h-[100px] flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden border-r border-gray-200">
                  {data.image ? (
                     <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-center bg-white min-w-0">
                  <div className="font-bold text-[14px] text-gray-900 truncate">{data.title || data.domain || 'Untitled'}</div>
                  <div className="text-[12px] text-gray-500 mt-1 truncate">{data.domain}</div>
                </div>
              </div>
            ) : loading ? (
              <div className="mt-3 border border-gray-200 rounded-[12px] flex overflow-hidden max-w-[280px] h-[100px] bg-gray-50 animate-pulse">
                <div className="w-[100px] h-full bg-gray-200 border-r border-gray-200"></div>
                <div className="flex-1 p-3 flex flex-col justify-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <div className="mt-3 border border-gray-200 rounded-[12px] p-4 text-center text-gray-500 text-sm italic bg-gray-50 max-w-[280px]">
                Waiting for link...
              </div>
            )}
            
            <div className="flex justify-end mt-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="px-3 py-3 border-t border-gray-200 flex items-center gap-3 bg-white z-30 pb-6 relative">
        <button className="w-8 h-8 rounded-full border border-[#0a66c2] flex items-center justify-center text-[#0a66c2] flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <div className="flex-1 bg-[#f3f2ef] rounded-xl h-[42px] px-4 flex items-center">
          <span className="text-gray-500 text-[15px]">Write a message...</span>
        </div>
        <button className="text-gray-500 flex-shrink-0 pr-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
        <div className="w-[130px] h-[4px] bg-gray-300 rounded-full" />
      </div>
    </PhoneShell>
  );
}

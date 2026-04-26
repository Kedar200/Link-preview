'use client';
import React from 'react';
import type { OGData } from '@/types';
import PhoneShell from './PhoneShell';
import TwitterPreview from '../previews/TwitterPreview';
import DiscordPreview from '../previews/DiscordPreview';
import InstagramPreview from '../previews/InstagramPreview';
import LinkedInPreview from '../previews/LinkedInPreview';
import SlackPreview from '../previews/SlackPreview';

interface Props {
  data: OGData | null;
  loading: boolean;
  theme: 'light' | 'dark';
  app: string;
}

export default function GenericMockup({ data, loading, theme, app }: Props) {
  const isDark = theme === 'dark';
  const bgApp = isDark ? 'bg-black' : 'bg-white';
  const headerText = isDark ? 'text-white' : 'text-black';
  const headerBg = isDark ? 'bg-black' : 'bg-[#f0f2f5]';

  return (
    <PhoneShell bgApp={bgApp}>
      {/* Status bar */}
      <div className={`h-12 w-full flex items-center justify-between px-6 pt-2 text-[12px] font-semibold z-40 ${headerBg} ${headerText} tracking-tight`}>
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="16" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      <div className={`flex-1 flex flex-col pt-8 pb-10 px-4 overflow-y-auto scrollbar-hide z-20 ${bgApp}`}>
        {data ? (
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {app === 'twitter' && <TwitterPreview data={data} />}
            {app === 'discord' && <DiscordPreview data={data} />}
            {app === 'instagram' && <InstagramPreview data={data} />}
            {app === 'linkedin' && <LinkedInPreview data={data} />}
            {app === 'slack' && <SlackPreview data={data} />}
          </div>
        ) : loading ? (
          <div className={`w-full h-48 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'} animate-pulse flex items-center justify-center`}>
            <span className={isDark ? 'text-white/40' : 'text-black/40'}>Loading...</span>
          </div>
        ) : (
          <div className={`w-full h-48 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'} flex items-center justify-center border border-dashed ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <span className={isDark ? 'text-white/40' : 'text-black/40'}>Waiting for link...</span>
          </div>
        )}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
        <div className={`w-[130px] h-[4px] ${isDark ? 'bg-white' : 'bg-black'} rounded-full`} />
      </div>
    </PhoneShell>
  );
}

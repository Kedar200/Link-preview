'use client';
import { useState } from 'react';
import type { OGData } from '@/types';
import UrlInput from './UrlInput';
import ExportToFigma from './ExportToFigma';
import WhatsAppMockup from './mockups/WhatsAppMockup';
import LinkedInMockup from './mockups/LinkedInMockup';
import SlackMockup from './mockups/SlackMockup';
import DiscordMockup from './mockups/DiscordMockup';
import TwitterMockup from './mockups/TwitterMockup';
import GenericMockup from './mockups/GenericMockup';

function PhoneMockup({ data, loading, theme, app }: { data: OGData | null; loading: boolean; theme: 'light' | 'dark', app: string }) {
  if (app === 'whatsapp') return <WhatsAppMockup data={data} loading={loading} theme={theme} />;
  if (app === 'linkedin') return <LinkedInMockup data={data} loading={loading} />;
  if (app === 'slack') return <SlackMockup data={data} loading={loading} theme={theme} />;
  if (app === 'discord') return <DiscordMockup data={data} loading={loading} theme={theme} />;
  if (app === 'twitter') return <TwitterMockup data={data} loading={loading} theme={theme} />;
  return <GenericMockup data={data} loading={loading} theme={theme} app={app} />;
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
  const [app, setApp] = useState<'whatsapp' | 'twitter' | 'linkedin' | 'slack' | 'discord' | 'instagram'>('whatsapp');

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Content Area */}
      <div className="relative z-20 w-full lg:w-[45%] flex flex-col justify-start px-6 sm:px-12 xl:px-20 pt-20 pb-16 lg:pb-32 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="h1 mb-10 text-white max-w-[800px]">
            Elevate your links<span className="text-[rgba(255,255,255,0.45)]">. Curate with clarity.</span>
          </h1>

          <p className="body-lg mb-14 text-[rgba(255,255,255,0.7)] max-w-[540px]">
            Transform raw URLs into elegant, professional previews before you share them.
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
          {/* Phone Mockup */}
          <div className="relative pointer-events-auto transform scale-[0.55] sm:scale-75 md:scale-[0.85] lg:scale-[0.85] origin-top mt-4 lg:mt-0 mb-[-380px] sm:mb-[-210px] md:mb-[-126px] lg:mb-[-126px]">
            <PhoneMockup data={data} loading={loading} theme={phoneTheme} app={app} />
          </div>

          {/* Vertical Controls Dock */}
          <div className="pointer-events-auto absolute top-[60%] sm:top-1/2 -right-8 sm:-right-12 md:-right-24 -translate-y-1/2 flex flex-col items-center gap-4 z-50 bg-[#111a15]/80 backdrop-blur-md p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
            {/* App Switcher */}
            <div className="flex flex-col items-center gap-2 py-2">
              {[
                { id: 'whatsapp', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, name: 'WhatsApp' },
                { id: 'twitter', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91C1.63 9.33.75 10.57.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.53.8-3.91c1.31-.67 2.2-1.91 2.2-3.34z"/><path d="M10.54 15.85l-3.76-4.38 1.52-1.31 2.12 2.47 4.21-4.83 1.61 1.41z" fill="currentColor"/></svg>, name: 'X' },
                { id: 'linkedin', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, name: 'LinkedIn' },
                { id: 'slack', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>, name: 'Slack' },
                { id: 'discord', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>, name: 'Discord' },
              ].map(item => (
                <div key={item.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setApp(item.id as any)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      app === item.id 
                        ? 'bg-[#dde6e1] text-[#1a2b21] shadow-[0_10px_25px_rgba(26,43,33,0.2)] scale-110' 
                        : 'text-white/40 hover:text-white/80 hover:bg-white/10'
                    }`}
                    title={item.name}
                  >
                    {item.icon}
                  </button>
                </div>
              ))}
            </div>

            <div className="w-8 h-px bg-white/10 my-1" />

            {/* Theme Toggle */}
            <button 
              onClick={() => setPhoneTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-transparent text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 select-none"
              aria-label="Toggle theme"
              title={`Switch to ${phoneTheme === 'light' ? 'dark' : 'light'} mode`}
            >
              {phoneTheme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

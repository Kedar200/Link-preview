'use client';
import { useState } from 'react';
import type { OGData } from '@/types';
import UrlInput from './UrlInput';
import ExportToFigma from './ExportToFigma';
import { LOCALHOST_COMPANION_NEEDED } from '@/hooks/useOGFetch';
import WhatsAppMockup from './mockups/WhatsAppMockup';
import LinkedInMockup from './mockups/LinkedInMockup';
import SlackMockup from './mockups/SlackMockup';
import DiscordMockup from './mockups/DiscordMockup';
import TwitterMockup from './mockups/TwitterMockup';
import InstagramMockup from './mockups/InstagramMockup';
import GenericMockup from './mockups/GenericMockup';

function PhoneMockup({ data, loading, theme, app }: { data: OGData | null; loading: boolean; theme: 'light' | 'dark', app: string }) {
  if (app === 'whatsapp') return <WhatsAppMockup data={data} loading={loading} theme={theme} />;
  if (app === 'linkedin') return <LinkedInMockup data={data} loading={loading} />;
  if (app === 'slack') return <SlackMockup data={data} loading={loading} theme={theme} />;
  if (app === 'discord') return <DiscordMockup data={data} loading={loading} theme={theme} />;
  if (app === 'twitter') return <TwitterMockup data={data} loading={loading} theme={theme} />;
  if (app === 'instagram') return <InstagramMockup data={data} loading={loading} theme={theme} />;
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
            Design the click.<span className="text-[rgba(255,255,255,0.45)]"> Master the preview.</span>
          </h1>

          <p className="body-lg mb-14 text-[rgba(255,255,255,0.7)] max-w-[540px]">
            The ultimate sandbox for social sharing. Render high-fidelity mockups, test localhost without tunnels, and export pixel-perfect layouts directly to Figma.
          </p>

          <div className="w-full max-w-[480px]">
            <UrlInput onSubmit={onSubmit} loading={loading} />
          </div>

          {error && !loading && error === LOCALHOST_COMPANION_NEEDED && (
            <div className="mt-6 p-5 rounded-2xl bg-[#0d1a13] border border-[#2f4a3a]/60 fade-in max-w-[480px]">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-lg leading-none mt-0.5">🔗</span>
                <div>
                  <p className="text-sm font-inter font-[600] text-white mb-1">Local Companion Required</p>
                  <p className="text-xs font-inter text-white/50 leading-relaxed">
                    To preview localhost URLs from the deployed app, run our tiny companion in your terminal:
                  </p>
                </div>
              </div>
              <div className="bg-black/40 rounded-xl px-4 py-3 font-mono text-[13px] text-[#22c55e] flex items-center justify-between gap-2">
                <code>npx linkpeek-local</code>
                <button
                  onClick={() => { navigator.clipboard.writeText('npx linkpeek-local'); }}
                  className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                  title="Copy command"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
              </div>
              <p className="text-[10px] font-mono text-white/25 mt-2 tracking-wide">
                Zero config • No tunnels • Works in 2 seconds
              </p>
            </div>
          )}

          {error && !loading && error !== LOCALHOST_COMPANION_NEEDED && (
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
                { id: 'whatsapp', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, name: 'WhatsApp' },
                { id: 'twitter', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z"/></svg>, name: 'X' },
                { id: 'instagram', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, name: 'Instagram' },
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

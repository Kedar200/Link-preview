'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import HeroScene from '@/components/HeroScene';
import AuditInsights from '@/components/AuditInsights';
import SeoPreviewSection from '@/components/SeoPreviewSection';
import LocalhostPreviewSection from '@/components/LocalhostPreviewSection';
import TestimonialsBento from '@/components/TestimonialsBento';
import FaqSection from '@/components/FaqSection';
import HomeAnswerSections from '@/components/HomeAnswerSections';
import Footer from '@/components/Footer';
import ProductHuntWidget from '@/components/ProductHuntWidget';
import { useOGFetch } from '@/hooks/useOGFetch';
import { trackUrlChecked, trackEvent } from '@/lib/analytics';

const DEFAULT_URL = 'https://www.getlinkpeek.com';
const SITE_URL = 'https://www.getlinkpeek.com';

export default function HomePage() {
  const { data, loading, error, fetch } = useOGFetch();
  const [hasSearched, setHasSearched] = useState(false);

  const [animState, setAnimState] = useState<'init' | 'idle' | 'zoom-input' | 'typing' | 'zoom-out-mid' | 'zoom-phone' | 'switching' | 'done'>('init');
  const [typedUrl, setTypedUrl] = useState('');
  const [buttonHighlighted, setButtonHighlighted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [demoApp, setDemoApp] = useState<'whatsapp' | 'twitter' | 'linkedin' | 'slack' | 'discord' | 'instagram'>('whatsapp');

  const isAnimating = animState !== 'done' && animState !== 'init';

  const hasFetchedRef = useRef(false);
  const doFetch = useCallback((url = DEFAULT_URL, shouldTrack = false) => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      setHasSearched(true);
      if (shouldTrack) trackUrlChecked(url);
      fetch(url);
    }
  }, [fetch]);

  const skipAnimation = useCallback(() => {
    setAnimState('done');
    setTypedUrl('');
    setButtonHighlighted(false);
    setShowCursor(false);
    trackEvent('skip_tutorial');
    doFetch();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingDone', 'true');
    }
  }, [doFetch]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParam = new URLSearchParams(window.location.search).get('url');
    if (urlParam) {
      setAnimState('done');
      doFetch(urlParam, true);
      return;
    }
    
    if (window.innerWidth < 1024 || localStorage.getItem('onboardingDone')) {
      setAnimState('done');
      doFetch();
      return;
    }
    
    setAnimState('idle');
    let cancelled = false;
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const APPS = ['twitter', 'instagram', 'linkedin', 'slack', 'discord', 'whatsapp'] as const;

    const run = async () => {
      await sleep(1000);
      if (cancelled) return;
      
      setAnimState('zoom-input');
      await sleep(1500);
      if (cancelled) return;
      
      setShowCursor(true);
      setAnimState('typing');
      for (let i = 1; i <= DEFAULT_URL.length; i++) {
        if (cancelled) return;
        setTypedUrl(DEFAULT_URL.slice(0, i));
        await sleep(50 + Math.random() * 50);
      }
      
      await sleep(300);
      if (cancelled) return;
      
      setButtonHighlighted(true);
      await sleep(400);
      if (cancelled) return;
      
      setButtonHighlighted(false);
      setShowCursor(false);
      
      doFetch();
      
      setAnimState('zoom-out-mid');
      await sleep(1000);
      if (cancelled) return;
      
      setAnimState('zoom-phone');
      await sleep(1500);
      if (cancelled) return;
      
      setAnimState('switching');
      for (const nextApp of APPS) {
        if (cancelled) return;
        setDemoApp(nextApp as any);
        await sleep(1000);
      }
      
      if (cancelled) return;
      skipAnimation();
      localStorage.setItem('onboardingDone', 'true');
    };
    
    run();
    return () => { cancelled = true; };
  }, [doFetch, skipAnimation]);

  const handleSubmit = async (url: string) => {
    setHasSearched(true);
    trackUrlChecked(url);
    await fetch(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      {isAnimating && (
        <button 
          onClick={skipAnimation}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-2.5 bg-[#111a15]/80 hover:bg-[#111a15] text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.4)] animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter text-sm font-medium cursor-pointer flex items-center gap-2"
        >
          Skip Animation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      )}

      {/* Split Hero Wrapper */}
      <div className="relative flex flex-col overflow-hidden">
        <div 
          className="relative flex flex-col w-full"
          style={{
            transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center center',
            ...(animState === 'zoom-input' || animState === 'typing' 
                  ? { transform: 'scale(1.6) translate(15%, -10%)' } 
                  : { transform: 'scale(1) translate(0%, 0%)' }) // Removed zoom for phone state
          }}
        >
          {/* Global Horizontal Split Background for Hero */}
          <div className="absolute inset-0 flex flex-col z-0 pointer-events-none overflow-hidden">
            <div className="h-[60vh] min-h-[600px] w-full bg-[#1a2b21] lg:min-h-[620px]"></div>
            <div className="flex-1 w-full bg-[#f4f0e6]"></div>
          </div>

          <div className="relative z-10 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col relative z-20">
              <HeroScene
                onSubmit={handleSubmit}
                loading={loading}
                data={data}
                error={error}
                hasSearched={hasSearched}
                isAnimating={isAnimating}
                animState={animState}
                typedUrl={typedUrl}
                buttonHighlighted={buttonHighlighted}
                showCursor={showCursor}
                demoApp={demoApp}
              />
            </main>
          </div>
        </div>
      </div>

      <AuditInsights data={data} loading={loading} />
      <SeoPreviewSection />
      <LocalhostPreviewSection />
      <TestimonialsBento />
      <HomeAnswerSections />
      <FaqSection />
      <Footer />
      <ProductHuntWidget />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is LinkPeek?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'LinkPeek is a free Open Graph preview tool that lets developers test how their links appear on WhatsApp, LinkedIn, X, Slack, Discord and Instagram. It also supports localhost URLs, so developers can debug social previews before deploying or using ngrok.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can LinkPeek test Open Graph tags on localhost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. LinkPeek supports localhost URLs so developers can preview Open Graph tags, Twitter cards, and social cards before deployment without using ngrok.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which link preview platforms does LinkPeek support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'LinkPeek previews WhatsApp, LinkedIn, X, Slack, Discord, Instagram, and generic Open Graph or Twitter Card metadata.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Free Open Graph Preview Tool for WhatsApp, LinkedIn, X & Localhost',
            url: SITE_URL,
            isPartOf: {
              '@type': 'WebSite',
              name: 'LinkPeek',
              url: SITE_URL,
            },
            about: {
              '@type': 'SoftwareApplication',
              name: 'LinkPeek',
              applicationCategory: 'DeveloperApplication',
              description:
                'LinkPeek is a free web application for previewing Open Graph tags, Twitter cards, and platform-specific link previews across WhatsApp, LinkedIn, X, Slack, Discord and Instagram, including localhost URLs.',
            },
          }),
        }}
      />
    </div>
  );
}

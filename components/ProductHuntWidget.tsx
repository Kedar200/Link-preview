'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ProductHuntWidget() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // to avoid hydration mismatch if needed, though mostly for the scroll event
    const handleScroll = () => {
      // Disappear when scrolled past the hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <a 
      href="https://www.producthunt.com/products/linkpeek?launch=linkpeek"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('producthunt_widget_clicked')}
      className={`fixed bottom-6 left-[50%] -translate-x-1/2 z-[90] flex items-center gap-2.5 bg-white/30 backdrop-blur-2xl backdrop-saturate-150 px-4 py-1.5 rounded-full border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:bg-white/40 hover:shadow-[0_8px_32px_rgba(218,85,47,0.3)] hover:border-white/80 hover:-translate-y-1 transition-all duration-500
        ${isScrolled ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      aria-label="LinkPeek on Product Hunt"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-5 h-5 shrink-0">
        <g fill="none" fillRule="evenodd">
          <path fill="#FF6154" d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"></path>
          <path fill="#FFF" d="M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14"></path>
        </g>
      </svg>
      <span className="text-[13px] font-semibold text-gray-800 whitespace-nowrap tracking-tight">
        Live on Product Hunt
      </span>
    </a>
  );
}

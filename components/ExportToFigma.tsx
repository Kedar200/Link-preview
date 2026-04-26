'use client';
import { useState, useCallback } from 'react';
import type { OGData } from '@/types';
import { copyForFigma } from '@/lib/figma-clipboard';

interface Props {
  data: OGData | null;
  theme: 'light' | 'dark';
  disabled?: boolean;
}

type State = 'idle' | 'copying' | 'done' | 'error';

export default function ExportToFigma({ data, theme, disabled }: Props) {
  const [state, setState] = useState<State>('idle');

  const handleCopy = useCallback(async () => {
    if (disabled || state !== 'idle') return;
    setState('copying');
    try {
      await copyForFigma(data, theme);
      setState('done');
      setTimeout(() => setState('idle'), 3000);
    } catch (err) {
      console.error('Copy for Figma failed:', err);
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  }, [data, theme, disabled, state]);

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || state === 'copying'}
      className={`
        group inline-flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-medium
        transition-all duration-300 ease-out select-none whitespace-nowrap
        ${state === 'done'
          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
          : state === 'error'
          ? 'bg-red-500/15 text-red-300 border border-red-500/20'
          : state === 'copying'
          ? 'bg-white/5 text-white/40 cursor-wait border border-white/[0.04]'
          : disabled
          ? 'bg-white/[0.04] text-white/25 cursor-not-allowed border border-white/[0.04]'
          : 'bg-white/[0.07] text-white/80 hover:text-white hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-sm'
        }
      `}
      aria-label="Copy for Figma"
    >
      {state === 'copying' ? (
        <>
          <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="32" strokeLinecap="round" />
          </svg>
          <span>Copying…</span>
        </>
      ) : state === 'done' ? (
        <>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied! Paste in Figma ⌘V</span>
        </>
      ) : state === 'error' ? (
        <span>Copy failed — try again</span>
      ) : (
        <>
          {/* Figma logo */}
          <svg width="14" height="14" viewBox="0 0 38 57" fill="none" className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
          </svg>
          <span>Copy for Figma</span>
        </>
      )}
    </button>
  );
}

'use client';
import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { normalizeUrl, isLocalhostUrl } from '@/lib/detect';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  animatedValue?: string;
  showCursor?: boolean;
  isButtonHighlighted?: boolean;
}

export default function UrlInput({ onSubmit, loading, animatedValue, showCursor, isButtonHighlighted }: UrlInputProps) {
  const [value, setValue] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCursor && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    } else if (!showCursor && inputRef.current) {
      inputRef.current.blur();
    }
  }, [showCursor]);

  const handleChange = (v: string) => {
    setValue(v);
    try {
      setIsLocal(isLocalhostUrl(normalizeUrl(v)));
    } catch {
      setIsLocal(false);
    }
  };

  const handleSubmit = () => {
    const url = normalizeUrl(value);
    if (!url) return;
    onSubmit(url);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const displayValue = animatedValue !== undefined ? animatedValue : value;

  return (
    <div className="relative z-10 w-full">
      <div className="w-full">
        {/* Input container */}
        <div
          className="flex items-center rounded-2xl border transition-all input-glow shadow-2xl"
          style={{
            background: '#ffffff',
            borderColor: 'var(--mist)',
            padding: '8px 8px 8px 24px',
          }}
        >
          {/* Link icon */}
          <svg className="flex-shrink-0 mr-4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2.5" opacity="0.6">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>

          {/* Input */}
          <input
            ref={inputRef}
            id="url-input"
            type="url"
            value={displayValue}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Paste your URL here..."
            autoComplete="off"
            spellCheck={false}
            readOnly={animatedValue !== undefined}
            className="flex-1 bg-transparent outline-none body-md min-w-0"
            style={{
              color: 'var(--deep-forest)',
            }}
          />

          {/* Preview button */}
          <button
            id="preview-btn"
            onClick={handleSubmit}
            disabled={(!displayValue.trim() && !isButtonHighlighted) || loading || animatedValue !== undefined}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl transition-all label-sm flex-shrink-0 shadow-lg ${isButtonHighlighted ? 'scale-105 shadow-2xl brightness-110 ring-4 ring-emerald-500/30' : 'hover:shadow-xl active:scale-95'}`}
            style={{
              background: isButtonHighlighted ? 'var(--deep-forest)' : (!displayValue.trim() || loading ? 'rgba(26, 43, 33, 0.05)' : 'var(--deep-forest)'),
              color: isButtonHighlighted ? 'var(--mist)' : (!displayValue.trim() || loading ? 'var(--sage)' : 'var(--mist)'),
              cursor: (!displayValue.trim() && !isButtonHighlighted) || loading || animatedValue !== undefined ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                Scanning…
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </>
            ) : (
              <>
                Preview
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

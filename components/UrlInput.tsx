'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { normalizeUrl, isLocalhostUrl } from '@/lib/detect';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [value, setValue] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="relative z-10 w-full">
      <div className="w-full">
        {/* Input container */}
        <div
          className="flex items-center rounded-2xl border transition-all input-glow shadow-xl"
          style={{
            background: '#f4f0e6',
            borderColor: 'rgba(0,0,0,0.05)',
            padding: '8px 8px 8px 20px',
          }}
        >
          {/* Link icon */}
          <svg className="flex-shrink-0 mr-3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>

          {/* Input */}
          <input
            ref={inputRef}
            id="url-input"
            type="url"
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Paste your URL here (e.g., https://yo...)"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-base font-mono min-w-0"
            style={{
              fontFamily: 'DM Mono, monospace',
              color: '#111111',
            }}
          />

          {/* Preview button */}
          <button
            id="preview-btn"
            onClick={handleSubmit}
            disabled={!value.trim() || loading}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all font-syne flex-shrink-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              background: !value.trim() || loading ? 'rgba(200,90,68,0.5)' : '#c85a44',
              color: '#ffffff',
              cursor: !value.trim() || loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                Loading…
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              </>
            ) : (
              <>
                Preview
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

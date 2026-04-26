'use client';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>HTML — paste in your &lt;head&gt; tag</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg transition-all"
          style={{
            background: copied ? 'rgba(74, 222, 128, 0.12)' : 'rgba(255,255,255,0.06)',
            color: copied ? '#4ade80' : 'rgba(255,255,255,0.6)',
            border: '1px solid',
            borderColor: copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)',
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { AuditResult, AuditIssue, OGData } from '@/types';
import ScoreBar from './ui/ScoreBar';
import CodeBlock from './ui/CodeBlock';
import WhatsAppPreview from './previews/WhatsAppPreview';

const PLATFORM_COLORS: Record<string, string> = {
  whatsapp: '#25d366',
  twitter: '#1d9bf0',
  linkedin: '#0a66c2',
  slack: '#ecb22e',
  discord: '#5865f2',
  instagram: '#e1306c',
};

function IssueItem({ issue }: { issue: AuditIssue }) {
  const colors = {
    error: { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)', icon: '#ef4444', text: '#991b1b', detail: '#b91c1c' },
    warning: { bg: 'rgba(250,204,21,0.15)', border: 'rgba(250,204,21,0.4)', icon: '#eab308', text: '#854d0e', detail: '#a16207' },
    success: { bg: 'rgba(74,222,128,0.2)', border: 'rgba(74,222,128,0.4)', icon: '#22c55e', text: '#166534', detail: '#15803d' },
  };
  const c = colors[issue.severity];

  const icons = {
    error: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    warning: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    success: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  };

  return (
    <div
      className="flex gap-3 p-3 rounded-xl"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <span style={{ color: c.icon, flexShrink: 0, marginTop: 1 }}>{icons[issue.severity]}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold" style={{ color: c.text }}>{issue.message}</p>
        {issue.detail && (
          <p className="text-xs font-mono mt-0.5 leading-relaxed" style={{ color: c.detail }}>{issue.detail}</p>
        )}
      </div>
    </div>
  );
}

function PhoneMockup({ data }: { data: OGData | null }) {
  return (
    <div className="relative w-full max-w-[340px] mx-auto h-[640px] bg-white rounded-[44px] shadow-2xl border-[12px] border-black overflow-hidden flex flex-col pointer-events-auto mt-8 transform hover:scale-[1.02] transition-transform duration-300">
      
      {/* Physical Phone Buttons */}
      <div className="absolute -left-[14px] top-[100px] w-[3px] h-[26px] bg-[#1a1a1a] rounded-l-md z-0" />
      <div className="absolute -left-[14px] top-[140px] w-[3px] h-[40px] bg-[#1a1a1a] rounded-l-md z-0" />
      <div className="absolute -left-[14px] top-[190px] w-[3px] h-[40px] bg-[#1a1a1a] rounded-l-md z-0" />
      <div className="absolute -right-[14px] top-[160px] w-[3px] h-[60px] bg-[#1a1a1a] rounded-r-md z-0" />

      {/* Dynamic Island */}
      <div className="absolute top-2 inset-x-0 flex justify-center z-50">
        <div className="w-[110px] h-[28px] bg-black rounded-full flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full shadow-inner" />
        </div>
      </div>
      
      {/* Status bar */}
      <div className="h-12 w-full flex items-center justify-between px-6 pt-2 text-[12px] font-semibold z-40 bg-[#f0f2f5] text-black tracking-tight">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <svg width="16" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* WhatsApp Header */}
      <div className="bg-[#f0f2f5] flex items-center px-2 py-2 gap-3 border-b border-gray-200 z-30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div className="flex-1 font-semibold text-[15px] text-black">
          WhatsApp
        </div>
        <div className="flex items-center gap-4 text-[#007aff]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#efeae2] relative p-3 flex flex-col gap-3 scrollbar-hide z-20">
        {/* WhatsApp Background Pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        {/* Today Badge */}
        <div className="flex justify-center z-10 mt-1">
          <span className="bg-white text-[#54656f] font-medium text-[11px] px-3 py-1.5 rounded-lg shadow-sm">Today</span>
        </div>

        {/* Security Message */}
        <div className="bg-[#fff3c4] text-[#54656f] text-[12px] p-2 rounded-lg shadow-sm text-center z-10 mx-2 leading-snug">
          🔒 Messages and calls are end-to-end encrypted. Ensure your content always looks its best before you hit publish.
        </div>

        {/* Main Preview Bubble */}
        <div className="bg-[#e1f6cb] p-1.5 rounded-xl rounded-tr-none shadow-sm self-end w-[85%] relative z-10 mt-1">
          {/* Bubble Tail */}
          <div className="absolute top-0 -right-2 w-3 h-3 bg-[#e1f6cb]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
          
          <div className="flex justify-between items-end px-1.5 pt-0.5 pb-1">
            <span className="text-[#0369a1] text-[14px] leading-tight break-all">
              {data?.url || 'https://your.site.com/'}
            </span>
            <span className="text-[10px] text-[#54656f] ml-2 flex-shrink-0">7:26 PM ✓✓</span>
          </div>
          
          {data ? (
            <div className="mt-0.5 rounded-[10px] overflow-hidden border border-[rgba(0,0,0,0.06)] bg-[#cfebba]">
              <div className="scale-[0.98] transform-gpu origin-top">
                <WhatsAppPreview data={data} />
              </div>
              <div className="px-2 py-1 flex justify-end">
                <span className="text-[10px] text-[#54656f]">9:58 PM ✓✓</span>
              </div>
            </div>
          ) : (
             <div className="mt-0.5 h-24 bg-black/5 animate-pulse rounded-[10px] border border-[rgba(0,0,0,0.06)]"></div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] p-2.5 flex items-center gap-2 z-30 pb-4 pt-3 relative">
        <div className="flex-1 bg-white rounded-full h-[38px] px-3 flex items-center text-[15px] gap-2.5 shadow-sm border border-gray-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <span className="text-[#8696a0] flex-1">Message</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
        <div className="w-[38px] h-[38px] bg-[#00a884] rounded-full flex justify-center items-center shadow-sm flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.39-.9.88v2.06c0 2.68-2.24 4.89-5.01 4.89s-5.01-2.21-5.01-4.89v-2.06c0-.49-.41-.88-.9-.88s-.9.39-.9.88v2.06c0 3.53 2.76 6.43 6.21 6.84V20H8.38c-.48 0-.88.39-.88.88s.4.88.88.88h7.24c.48 0 .88-.39.88-.88s-.4-.88-.88-.88h-3.11v-2.14c3.45-.41 6.21-3.31 6.21-6.84v-2.06c0-.49-.41-.88-.9-.88z"/></svg>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
        <div className="w-[130px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

interface AuditPanelProps {
  audit: AuditResult;
  data: OGData | null;
}

export default function AuditPanel({ audit, data }: AuditPanelProps) {
  const [showFix, setShowFix] = useState(false);

  const imageIssues = audit.issues.filter(i => i.category === 'image');
  const textIssues = audit.issues.filter(i => i.category === 'text');
  const techIssues = audit.issues.filter(i => i.category === 'technical');

  const errorCount = audit.issues.filter(i => i.severity === 'error').length;
  const warnCount = audit.issues.filter(i => i.severity === 'warning').length;

  return (
    <section className="relative z-10 px-4 sm:px-6 pb-16 max-w-6xl mx-auto fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold font-syne text-[#111]" style={{ fontFamily: 'Syne, sans-serif' }}>What needs fixing</h2>
          <p className="text-xs font-mono mt-1" style={{ color: 'rgba(0,0,0,0.5)' }}>
            {errorCount > 0 ? `${errorCount} issue${errorCount !== 1 ? 's' : ''} found` : 'Looking good overall'}
            {warnCount > 0 && ` · ${warnCount} suggestion${warnCount !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Issues column */}
        <div className="lg:col-span-3 space-y-6">
          {imageIssues.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(0,0,0,0.4)' }}>Image</h3>
              <div className="space-y-2">
                {imageIssues.map(i => <IssueItem key={i.id} issue={i} />)}
              </div>
            </div>
          )}
          {textIssues.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(0,0,0,0.4)' }}>Title & Description</h3>
              <div className="space-y-2">
                {textIssues.map(i => <IssueItem key={i.id} issue={i} />)}
              </div>
            </div>
          )}
          {techIssues.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'rgba(0,0,0,0.4)' }}>Technical</h3>
              <div className="space-y-2">
                {techIssues.map(i => <IssueItem key={i.id} issue={i} />)}
              </div>
            </div>
          )}

          {/* Fix generator */}
          <div
            className="rounded-2xl p-5 shadow-lg border border-[rgba(0,0,0,0.05)] bg-[#111]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold font-syne text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Fix it instantly</h3>
                <p className="text-xs font-mono mt-0.5 text-gray-400">
                  Copy these tags and paste them into your site's &lt;head&gt;
                </p>
              </div>
              <button
                id="generate-fix-btn"
                onClick={() => setShowFix(!showFix)}
                className="px-4 py-2 rounded-xl text-sm font-bold font-syne transition-all"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: showFix ? 'rgba(232,255,71,0.15)' : '#e8ff47',
                  color: showFix ? '#e8ff47' : '#080808',
                  border: showFix ? '1px solid rgba(232,255,71,0.3)' : 'none',
                }}
              >
                {showFix ? 'Hide' : 'Generate Fix'}
              </button>
            </div>
            {showFix && (
              <div className="fade-in">
                <CodeBlock code={audit.fixTags} />
              </div>
            )}
          </div>
        </div>

        {/* Scores & Phone column */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-5 shadow-xl border border-[#111] bg-[#111] sticky top-6">
            <h3 className="text-sm font-bold font-syne mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Platform scores</h3>
            <div className="space-y-4">
              {audit.scores.map((s, i) => (
                <ScoreBar
                  key={s.platform}
                  platform={s.label}
                  score={s.score}
                  color={PLATFORM_COLORS[s.platform] || '#888'}
                  reason={s.reason}
                  delay={i * 0.1}
                />
              ))}
            </div>

            {/* Render the Phone Mockup Below the Scores */}
            <PhoneMockup data={audit.data} />
          </div>
        </div>
      </div>
    </section>
  );
}

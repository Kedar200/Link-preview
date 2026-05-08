'use client';
import { useState, useMemo, useEffect } from 'react';
import type { OGData } from '@/types';
import { runAudit, type AuditResult, type Severity } from '@/lib/auditEngine';

// ─── Typing animation hook ──────────────────────────────────────────────────
function useTypingReveal(text: string, speed = 12, startDelay = 400) {
  const [revealed, setRevealed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || revealed >= text.length) return;
    const timer = setTimeout(() => setRevealed(r => r + 1), speed);
    return () => clearTimeout(timer);
  }, [started, revealed, text.length, speed]);

  return started ? text.slice(0, revealed) : '';
}

// ─── Severity emoji ──────────────────────────────────────────────────────────
const severityEmoji: Record<Severity, string> = {
  critical: '🔴',
  warning: '🟡',
  info: '💡',
  pass: '✅',
};

// ─── Build the conversational message ────────────────────────────────────────
function buildChatMessage(audit: AuditResult): string {
  const issues = audit.findings.filter(f => f.severity !== 'pass');

  if (issues.length === 0) {
    return "I scanned your page across all 7 platforms — everything looks great! ✨ No missing tags, no sizing issues, no truncation problems. Your link previews are ready to shine.";
  }

  const criticals = issues.filter(f => f.severity === 'critical');
  const warnings = issues.filter(f => f.severity === 'warning');
  const infos = issues.filter(f => f.severity === 'info');

  let msg = `I found ${issues.length} thing${issues.length > 1 ? 's' : ''} to fix:\n\n`;

  // Group by severity for natural reading
  const groups: { label: string; items: typeof issues }[] = [];
  if (criticals.length > 0) groups.push({ label: 'critical', items: criticals });
  if (warnings.length > 0) groups.push({ label: 'warning', items: warnings });
  if (infos.length > 0) groups.push({ label: 'tip', items: infos });

  for (const group of groups) {
    for (const item of group.items) {
      msg += `${severityEmoji[item.severity]} ${item.plain}\n`;
    }
  }

  if (audit.findings.some(f => f.fix)) {
    msg += `\nHit the button below to copy a ready-made prompt for your AI coding assistant.`;
  }

  return msg.trim();
}

// ─── Build a Claude Code / AI fix prompt ─────────────────────────────────────
function buildFixPrompt(audit: AuditResult): string {
  const issues = audit.findings.filter(f => f.severity !== 'pass');
  const fixes = audit.findings.filter(f => f.fix);

  let prompt = `Fix the following Open Graph / social meta tag issues in my project's <head>. Here's what's wrong and the exact tags to add or update:\n\n`;

  for (const issue of issues) {
    const severity = issue.severity.toUpperCase();
    prompt += `[${severity}] ${issue.plain}\n`;
    if (issue.fix) {
      prompt += `  Fix: ${issue.fix}\n`;
    }
    prompt += `  Affects: ${issue.platforms.join(', ')}\n\n`;
  }

  if (fixes.length > 0) {
    prompt += `Here are all the meta tags to add inside <head>:\n\n${audit.generatedTags}\n\n`;
  }

  prompt += `Please find the file where <head> or meta tags are defined and apply these fixes. Keep existing meta tags that aren't mentioned above.`;

  return prompt.trim();
}

// ─── Inline fix block inside a chat message ──────────────────────────────────
function InlineFix({ finding }: { finding: ReturnType<typeof runAudit>['findings'][0] }) {
  const [copied, setCopied] = useState(false);
  if (!finding.fix) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(finding.fix!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="chat-inline-fix">
      <div className="chat-fix-header">
        <span className="chat-fix-tag">{finding.tag}</span>
        <button onClick={handleCopy} className="chat-fix-copy">
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <code className="chat-fix-code">{finding.fix}</code>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
interface AuditInsightsProps {
  data: OGData | null;
  loading: boolean;
}

export default function AuditInsights({ data, loading }: AuditInsightsProps) {
  const [copiedAll, setCopiedAll] = useState(false);

  const audit: AuditResult | null = useMemo(() => {
    if (!data) return null;
    return runAudit(data);
  }, [data]);

  const chatMessage = useMemo(() => {
    if (!audit) return '';
    return buildChatMessage(audit);
  }, [audit]);

  const typedMessage = useTypingReveal(chatMessage, 10, 500);
  const isTypingDone = typedMessage.length >= chatMessage.length;

  const handleCopyPrompt = () => {
    if (!audit) return;
    navigator.clipboard.writeText(buildFixPrompt(audit));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // ─── Empty state ───────────────────────────────────────────────────────
  if (!data && !loading) {
    return (
      <section id="audit-insights" className="audit-section">
        <div className="audit-container">
          <div className="audit-section-header card-animate">
            <div className="audit-header-dot" />
            <h2 className="h2 tracking-tighter text-[#1a2b21]">
              The Audit. <br />
              <span className="text-[#4f6f5b]/50">Deep insights.</span>
            </h2>
          </div>

          {/* Chat empty state */}
          <div className="chat-window chat-empty-window card-animate">
            <div className="chat-window-chrome">
              <div className="chat-avatar chat-avatar-ai">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/></svg>
              </div>
              <div className="chat-window-meta">
                <span className="chat-window-name">LinkPeek AI</span>
                <span className="chat-window-status">Waiting for URL…</span>
              </div>
            </div>
            <div className="chat-body chat-body-empty">
              <div className="chat-bubble chat-bubble-ai">
                <p className="chat-bubble-text">Paste a URL above and I&apos;ll scan it across 7 platforms. I&apos;ll tell you exactly what&apos;s wrong and give you copy-paste fixes.</p>
                <span className="chat-bubble-time">—</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Loading state — typing indicator ──────────────────────────────────
  if (loading || !audit) {
    return (
      <section id="audit-insights" className="audit-section">
        <div className="audit-container">
          <div className="audit-section-header card-animate">
            <div className="audit-header-dot audit-pulse" />
            <h2 className="h2 tracking-tighter text-[#1a2b21]">
              The Audit. <br />
              <span className="text-[#4f6f5b]/50">Deep insights.</span>
            </h2>
          </div>

          <div className="chat-window card-animate">
            <div className="chat-window-chrome">
              <div className="chat-avatar chat-avatar-ai">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/></svg>
              </div>
              <div className="chat-window-meta">
                <span className="chat-window-name">LinkPeek AI</span>
                <span className="chat-window-status chat-status-typing">Scanning…</span>
              </div>
            </div>
            <div className="chat-body">
              <div className="chat-bubble chat-bubble-ai">
                <div className="chat-typing-indicator">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Results — the chat message ────────────────────────────────────────
  const issues = audit.findings.filter(f => f.severity !== 'pass');
  const fixableFindings = audit.findings.filter(f => f.fix);
  const hasIssues = issues.length > 0;
  const hasFixes = fixableFindings.length > 0;

  return (
    <section id="audit-insights" className="audit-section">
      <div className="audit-container">
        {/* Section Header */}
        <div className="audit-section-header card-animate">
          <div className="audit-header-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            The Audit. <br />
            <span className="text-[#4f6f5b]/50">Deep insights.</span>
          </h2>
        </div>

        {/* Chat Window */}
        <div className="chat-window fade-in">
          {/* Chrome bar */}
          <div className="chat-window-chrome">
            <div className="chat-avatar chat-avatar-ai">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/></svg>
            </div>
            <div className="chat-window-meta">
              <span className="chat-window-name">LinkPeek AI</span>
              <span className="chat-window-status">
                {hasIssues ? `${issues.length} issue${issues.length > 1 ? 's' : ''} found` : 'All clear ✓'}
              </span>
            </div>
            {!hasIssues && <span className="chat-status-badge chat-badge-green">Healthy</span>}
            {hasIssues && <span className="chat-status-badge chat-badge-red">{issues.length}</span>}
          </div>

          {/* Chat body */}
          <div className="chat-body">
            {/* AI Message */}
            <div className="chat-bubble chat-bubble-ai">
              <p className="chat-bubble-text chat-bubble-text-pre">{typedMessage}{!isTypingDone && <span className="chat-cursor" />}</p>
              <span className="chat-bubble-time">{timeStr}</span>
            </div>

            {/* Fix blocks — appear after typing finishes */}
            {isTypingDone && hasFixes && (
              <div className="chat-fixes-section fade-in">
                {fixableFindings.map(f => (
                  <InlineFix key={f.id} finding={f} />
                ))}

                {/* Copy AI prompt button */}
                <button onClick={handleCopyPrompt} className="chat-copy-all-btn">
                  {copiedAll ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                      Prompt copied — paste in your AI assistant!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                      Copy AI fix prompt
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

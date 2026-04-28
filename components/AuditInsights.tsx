'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import type { OGData } from '@/types';
import { runAudit, type AuditResult, type Severity, type PlatformScore } from '@/lib/auditEngine';

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value, duration]);
  return <>{display}</>;
}

// ─── Grade ring ──────────────────────────────────────────────────────────────
function GradeRing({ score, grade }: { score: number; grade: string }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? '#22c55e' : score >= 55 ? '#eab308' : '#ef4444';
  const bgColor = score >= 80 ? 'rgba(34,197,94,0.08)' : score >= 55 ? 'rgba(234,179,8,0.08)' : 'rgba(239,68,68,0.08)';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full" style={{ background: bgColor, filter: 'blur(20px)' }} />
      <svg width="160" height="160" className="audit-ring-svg">
        {/* Track */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(79,111,91,0.12)" strokeWidth="8" />
        {/* Progress */}
        <circle
          cx="80" cy="80" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="audit-ring-progress"
          style={{ '--ring-offset': `${circumference}px`, '--ring-target': `${offset}px` } as React.CSSProperties}
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-inter font-[700] tracking-tight" style={{ color }}>
          <AnimatedNumber value={score} />
        </span>
        <span className="text-xs font-mono tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(79,111,91,0.6)' }}>
          Grade {grade}
        </span>
      </div>
    </div>
  );
}

// ─── Severity badge ──────────────────────────────────────────────────────────
function SeverityBadge({ severity }: { severity: Severity }) {
  const config: Record<Severity, { bg: string; text: string; label: string; dot: string }> = {
    critical: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', label: 'Critical', dot: '#ef4444' },
    warning:  { bg: 'rgba(234,179,8,0.1)',  text: '#ca8a04', label: 'Warning',  dot: '#eab308' },
    info:     { bg: 'rgba(59,130,246,0.1)',  text: '#3b82f6', label: 'Info',     dot: '#3b82f6' },
    pass:     { bg: 'rgba(34,197,94,0.1)',   text: '#16a34a', label: 'Pass',     dot: '#22c55e' },
  };
  const c = config[severity];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.08em] font-[500]"
      style={{ background: c.bg, color: c.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {c.label}
    </span>
  );
}

// ─── Platform SVG Icons ──────────────────────────────────────────────────────
function PlatformIcon({ platform }: { platform: string }) {
  const cls = "w-6 h-6 flex-shrink-0";
  const fill = "#4f6f5b";
  switch (platform) {
    case 'whatsapp':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'slack':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      );
    case 'discord':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill={fill}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    default:
      return <span className="text-xl w-6 text-center">{platform}</span>;
  }
}

// ─── Platform score bar ──────────────────────────────────────────────────────
function PlatformBar({ platform, delay }: { platform: PlatformScore; delay: number }) {
  const color = platform.score >= 80 ? '#22c55e' : platform.score >= 55 ? '#eab308' : '#ef4444';
  const bgColor = platform.score >= 80 ? 'rgba(34,197,94,0.12)' : platform.score >= 55 ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)';

  const displayName: Record<string, string> = {
    whatsapp: 'WhatsApp', twitter: 'X (Twitter)', linkedin: 'LinkedIn',
    slack: 'Slack', discord: 'Discord', instagram: 'Instagram',
  };

  return (
    <div className="group flex items-center gap-4 py-3 px-4 rounded-2xl transition-all duration-300 hover:bg-[#dde6e1]/30 cursor-default">
      <span className="w-8 flex items-center justify-center flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
        <PlatformIcon platform={platform.platform} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-inter font-[500] text-[#1a2b21]">{displayName[platform.platform] || platform.platform}</span>
          <span className="text-xs font-mono tabular-nums" style={{ color }}>{platform.score}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: bgColor }}>
          <div
            className="h-full rounded-full score-fill"
            style={{
              background: `linear-gradient(90deg, ${color}cc, ${color})`,
              '--score-width': `${platform.score}%`,
              '--delay': `${delay * 0.12}s`,
            } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Finding row ─────────────────────────────────────────────────────────────
function FindingRow({ finding, index }: { finding: ReturnType<typeof runAudit>['findings'][0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="audit-finding-row group border-b last:border-b-0 py-4 cursor-pointer transition-colors duration-200 hover:bg-[#dde6e1]/20"
      style={{ animationDelay: `${index * 0.05}s`, borderColor: 'rgba(79,111,91,0.08)' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3 px-1">
        <div className="mt-0.5 flex-shrink-0">
          <SeverityBadge severity={finding.severity} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-inter text-[#1a2b21] leading-relaxed">{finding.plain}</p>
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-xs font-mono text-[#4f6f5b]/60 mb-1">{finding.technical}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {finding.platforms.map(p => (
                <span key={p} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#1a2b21]/5 text-[#4f6f5b]/70">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`text-[#4f6f5b]/30 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Tab type ────────────────────────────────────────────────────────────────
type Tab = 'overview' | 'findings' | 'fix';

// ─── Main Component ──────────────────────────────────────────────────────────
interface AuditInsightsProps {
  data: OGData | null;
  loading: boolean;
}

export default function AuditInsights({ data, loading }: AuditInsightsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');

  const audit: AuditResult | null = useMemo(() => {
    if (!data) return null;
    return runAudit(data);
  }, [data]);

  const handleCopy = () => {
    if (!audit) return;
    navigator.clipboard.writeText(audit.generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data && !loading) {
    return (
      <section id="audit-insights" className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f0e6]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 card-animate flex items-baseline gap-4">
            <div className="w-4 h-4 rounded-full bg-[#1a2b21] shadow-[0_0_15px_rgba(26,43,33,0.3)]" />
            <h2 className="h2 tracking-tighter text-[#1a2b21]">
              The Audit. <br />
              <span className="text-[#4f6f5b]/50">Deep insights.</span>
            </h2>
          </div>

          {/* Empty State */}
          <div className="relative rounded-[2.5rem] border border-[#4f6f5b]/10 bg-gradient-to-br from-[#dde6e1]/20 to-[#dde6e1]/5 p-16 flex flex-col items-center justify-center text-center min-h-[420px]">
            <div className="w-20 h-20 rounded-full bg-[#1a2b21]/5 flex items-center justify-center mb-8">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4f6f5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="2" />
                <path d="M9 14l2 2 4-4" />
              </svg>
            </div>
            <h3 className="h3 text-[#1a2b21]/70 mb-3">Enter a URL to start</h3>
            <p className="body-md text-[#4f6f5b]/50 max-w-md">
              Paste any link above and we&apos;ll scan 50+ metadata points across 6 platforms — with plain-English recommendations.
            </p>

            {/* Decorative feature chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {['50+ Checks', '6 Platforms', 'Plain English', 'Fix Generator'].map((label, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-[#1a2b21]/5 text-[#4f6f5b]/50 border border-[#4f6f5b]/8">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading || !audit) {
    return (
      <section id="audit-insights" className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f0e6]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 card-animate flex items-baseline gap-4">
            <div className="w-4 h-4 rounded-full bg-[#1a2b21] shadow-[0_0_15px_rgba(26,43,33,0.3)] audit-pulse" />
            <h2 className="h2 tracking-tighter text-[#1a2b21]">
              Scanning<span className="audit-dots" />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-[2rem] p-8 h-48 shimmer bg-[#dde6e1]/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const criticals = audit.findings.filter(f => f.severity === 'critical');
  const warnings = audit.findings.filter(f => f.severity === 'warning');
  const infos = audit.findings.filter(f => f.severity === 'info');
  const passes = audit.findings.filter(f => f.severity === 'pass');

  const filteredFindings = filterSeverity === 'all'
    ? audit.findings.filter(f => f.severity !== 'pass')
    : audit.findings.filter(f => f.severity === filterSeverity);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'findings', label: 'Findings', count: audit.findings.filter(f => f.severity !== 'pass').length },
    { id: 'fix', label: 'Fix Generator' },
  ];

  return (
    <section id="audit-insights" className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f0e6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 card-animate flex items-baseline gap-4">
          <div className="w-4 h-4 rounded-full bg-[#1a2b21] shadow-[0_0_15px_rgba(26,43,33,0.3)]" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            The Audit. <br />
            <span className="text-[#4f6f5b]/50">Deep insights.</span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mb-10 p-1 bg-[#dde6e1]/30 rounded-2xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-inter font-[500] transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#1a2b21] text-[#f4f0e6] shadow-[0_4px_15px_rgba(26,43,33,0.2)]'
                  : 'text-[#4f6f5b] hover:text-[#1a2b21] hover:bg-[#dde6e1]/40'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#1a2b21]/10 text-[#4f6f5b]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── OVERVIEW TAB ─────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="fade-in">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
              {/* Grade Card */}
              <div className="md:col-span-4 rounded-[2.5rem] border border-[#4f6f5b]/10 bg-gradient-to-br from-white/60 to-[#dde6e1]/20 p-10 flex flex-col items-center justify-center card-animate">
                <GradeRing score={audit.overall} grade={audit.grade} />
                <p className="mt-6 text-sm font-inter text-[#4f6f5b]/60 text-center">
                  Overall Health Score
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    <span className="text-[#4f6f5b]/60">{passes.length} passed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[#4f6f5b]/60">{criticals.length + warnings.length} issues</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Checks', value: audit.totalChecks, icon: '🔍', color: '#1a2b21' },
                  { label: 'Critical', value: criticals.length, icon: '🚨', color: '#ef4444' },
                  { label: 'Warnings', value: warnings.length, icon: '⚠️', color: '#eab308' },
                  { label: 'Passed', value: passes.length, icon: '✅', color: '#22c55e' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-[2rem] border border-[#4f6f5b]/8 bg-white/40 p-6 flex flex-col items-center justify-center text-center card-animate" style={{ animationDelay: `${i * 0.08}s` }}>
                    <span className="text-2xl mb-2">{stat.icon}</span>
                    <span className="text-2xl font-inter font-[700] tabular-nums" style={{ color: stat.color }}>
                      <AnimatedNumber value={stat.value} duration={800} />
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#4f6f5b]/50 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Scores */}
            <div className="rounded-[2.5rem] border border-[#4f6f5b]/10 bg-white/40 p-8 md:p-10 card-animate" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-inter font-[600] text-[#1a2b21]">Per-Platform Scores</h3>
                <span className="text-xs font-mono text-[#4f6f5b]/40">6 PLATFORMS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {audit.platforms.map((p, i) => (
                  <PlatformBar key={p.platform} platform={p} delay={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── FINDINGS TAB ─────────────────────────────────────────────── */}
        {activeTab === 'findings' && (
          <div className="fade-in">
            {/* Severity filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { id: 'all' as const, label: 'All Issues', count: audit.findings.filter(f => f.severity !== 'pass').length },
                { id: 'critical' as const, label: 'Critical', count: criticals.length },
                { id: 'warning' as const, label: 'Warnings', count: warnings.length },
                { id: 'info' as const, label: 'Info', count: infos.length },
                { id: 'pass' as const, label: 'Passed', count: passes.length },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterSeverity(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                    filterSeverity === f.id
                      ? 'bg-[#1a2b21] text-[#f4f0e6] border-[#1a2b21]'
                      : 'bg-white/40 text-[#4f6f5b]/60 border-[#4f6f5b]/10 hover:border-[#4f6f5b]/30'
                  }`}
                >
                  {f.label} <span className="ml-1 opacity-60">{f.count}</span>
                </button>
              ))}
            </div>

            {/* Findings list */}
            <div className="rounded-[2.5rem] border border-[#4f6f5b]/10 bg-white/40 overflow-hidden">
              <div className="p-6 md:p-8">
                {filteredFindings.length === 0 ? (
                  <div className="py-12 text-center">
                    <span className="text-4xl mb-4 block">🎉</span>
                    <p className="text-sm font-inter text-[#4f6f5b]/60">
                      {filterSeverity === 'all' ? 'No issues found — your meta tags are perfect!' : `No ${filterSeverity} issues found.`}
                    </p>
                  </div>
                ) : (
                  filteredFindings.map((finding, i) => (
                    <FindingRow key={finding.id} finding={finding} index={i} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── FIX GENERATOR TAB ────────────────────────────────────────── */}
        {activeTab === 'fix' && (
          <div className="fade-in">
            <div className="rounded-[2.5rem] border border-[#4f6f5b]/10 bg-gradient-to-br from-[#1a2b21] to-[#2f4a3a] p-8 md:p-12 relative overflow-hidden">
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-inter font-[600] text-white mb-2">Generated Meta Tags</h3>
                    <p className="text-sm font-inter text-white/40">
                      {audit.findings.filter(f => f.fix).length > 0
                        ? `${audit.findings.filter(f => f.fix).length} fixes ready — paste into your <head> tag`
                        : 'All essential meta tags are already present!'}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-inter font-[500] hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    {copied ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                        Copy Tags
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-2xl bg-black/30 border border-white/5 p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-[#22c55e]/80 leading-relaxed whitespace-pre-wrap break-all">
                    {audit.generatedTags}
                  </pre>
                </div>

                {/* Quick summary of what each fix does */}
                {audit.findings.filter(f => f.fix).length > 0 && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {audit.findings.filter(f => f.fix).map((f, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                          background: f.severity === 'critical' ? '#ef4444' : f.severity === 'warning' ? '#eab308' : '#3b82f6'
                        }} />
                        <div>
                          <span className="text-xs font-mono text-white/30 uppercase tracking-wider">{f.tag}</span>
                          <p className="text-sm text-white/70 mt-0.5">{f.plain}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

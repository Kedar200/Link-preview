'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { OGData } from '@/types';
import { normalizeUrl } from '@/lib/detect';
import { runAudit, type AuditFinding, type AuditResult } from '@/lib/auditEngine';

type RowStatus = 'queued' | 'scanning' | 'done' | 'error';

interface BulkRow {
  url: string;
  status: RowStatus;
  data?: OGData;
  audit?: AuditResult;
  error?: string;
}

const MAX_URLS = 100;
const CONCURRENCY = 5;
const EXAMPLE_URLS = [
  'https://www.getlinkpeek.com',
  'https://www.getlinkpeek.com/blog/open-graph-meta-tags-guide',
  'https://www.getlinkpeek.com/tools/open-graph-preview-tool',
].join('\n');

const platformLabels: Record<string, string> = {
  whatsapp: 'WA',
  twitter: 'X',
  linkedin: 'In',
  slack: 'Slack',
  discord: 'Discord',
  instagram: 'IG',
};

function parseUrls(input: string) {
  const seen = new Set<string>();
  const invalid: string[] = [];
  const urls = input
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => normalizeUrl(part))
    .filter((url) => {
      try {
        new URL(url);
        if (seen.has(url)) return false;
        seen.add(url);
        return true;
      } catch {
        invalid.push(url);
        return false;
      }
    });

  return {
    urls: urls.slice(0, MAX_URLS),
    ignoredCount: Math.max(0, urls.length - MAX_URLS),
    invalid,
  };
}

function issueWeight(finding: AuditFinding) {
  if (finding.severity === 'critical') return 0;
  if (finding.severity === 'warning') return 1;
  if (finding.severity === 'info') return 2;
  return 3;
}

function getMainIssue(audit?: AuditResult) {
  if (!audit) return '';
  return audit.findings
    .filter((finding) => finding.severity !== 'pass')
    .sort((a, b) => issueWeight(a) - issueWeight(b))[0]?.plain || 'No major issues found';
}

function getRowLabel(row: BulkRow) {
  if (row.status === 'queued') return 'Queued';
  if (row.status === 'scanning') return 'Scanning';
  if (row.status === 'error') return 'Failed';
  if (!row.audit) return 'Done';

  const criticals = row.audit.findings.filter((finding) => finding.severity === 'critical').length;
  const warnings = row.audit.findings.filter((finding) => finding.severity === 'warning').length;

  if (criticals > 0) return 'Critical';
  if (warnings > 0) return 'Warning';
  return 'Passed';
}

function statusClass(label: string) {
  if (label === 'Passed') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (label === 'Warning') return 'bg-amber-50 text-amber-800 border-amber-200';
  if (label === 'Critical' || label === 'Failed') return 'bg-red-50 text-red-700 border-red-200';
  return 'bg-[#ecf6ed] text-[#4f6f5b] border-[#c2c8c1]';
}

function scoreClass(score: number) {
  if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (score >= 70) return 'bg-amber-50 text-amber-800 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function csvEscape(value: string | number) {
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export default function BulkLinkPreviewChecker() {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState('');

  const summary = useMemo(() => {
    const finished = rows.filter((row) => row.status === 'done' || row.status === 'error');
    const failed = rows.filter((row) => row.status === 'error').length;
    const critical = rows.filter((row) =>
      row.audit?.findings.some((finding) => finding.severity === 'critical')
    ).length;
    const passed = rows.filter((row) => row.audit && getRowLabel(row) === 'Passed').length;
    const average = finished.length
      ? Math.round(
          rows.reduce((sum, row) => sum + (row.audit?.overall ?? 0), 0) /
            Math.max(1, rows.filter((row) => row.audit).length)
        )
      : 0;

    return { total: rows.length, finished: finished.length, failed, critical, passed, average };
  }, [rows]);

  async function scanOne(url: string, rowIndex: number) {
    setRows((current) =>
      current.map((row, index) => (index === rowIndex ? { ...row, status: 'scanning' } : row))
    );

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const json = await response.json();

      if (json.error && !json.title && !json.domain) {
        throw new Error(json.error);
      }

      const data = json as OGData;
      const audit = runAudit(data);

      setRows((current) =>
        current.map((row, index) =>
          index === rowIndex
            ? { url, status: 'done', data, audit, error: json.error || undefined }
            : row
        )
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Could not scan this URL.';
      setRows((current) =>
        current.map((row, index) =>
          index === rowIndex ? { url, status: 'error', error: errorMessage } : row
        )
      );
    }
  }

  async function handleScan() {
    const parsed = parseUrls(input);
    if (parsed.urls.length === 0) {
      setMessage('Paste at least one valid URL to run a bulk scan.');
      return;
    }

    setRows(parsed.urls.map((url) => ({ url, status: 'queued' })));
    setMessage(
      [
        parsed.invalid.length ? `${parsed.invalid.length} invalid URL skipped.` : '',
        parsed.ignoredCount ? `${parsed.ignoredCount} URLs ignored after the ${MAX_URLS} URL limit.` : '',
      ]
        .filter(Boolean)
        .join(' ')
    );
    setIsScanning(true);

    let nextIndex = 0;
    const workers = Array.from({ length: Math.min(CONCURRENCY, parsed.urls.length) }, async () => {
      while (nextIndex < parsed.urls.length) {
        const rowIndex = nextIndex;
        nextIndex += 1;
        await scanOne(parsed.urls[rowIndex], rowIndex);
      }
    });

    await Promise.all(workers);
    setIsScanning(false);
  }

  function exportCsv() {
    const headers = [
      'URL',
      'Status',
      'Overall Score',
      'Grade',
      'Critical Issues',
      'Warnings',
      'Main Issue',
      'WhatsApp',
      'X',
      'LinkedIn',
      'Slack',
      'Discord',
      'Instagram',
    ];

    const body = rows.map((row) => {
      const audit = row.audit;
      const platformScore = (platform: string) =>
        audit?.platforms.find((item) => item.platform === platform)?.score ?? '';

      return [
        row.url,
        getRowLabel(row),
        audit?.overall ?? '',
        audit?.grade ?? '',
        audit?.findings.filter((finding) => finding.severity === 'critical').length ?? '',
        audit?.findings.filter((finding) => finding.severity === 'warning').length ?? '',
        row.error || getMainIssue(audit),
        platformScore('whatsapp'),
        platformScore('twitter'),
        platformScore('linkedin'),
        platformScore('slack'),
        platformScore('discord'),
        platformScore('instagram'),
      ].map(csvEscape).join(',');
    });

    const blob = new Blob([[headers.join(','), ...body].join('\n')], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linkpeek-bulk-scan-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="bulk-checker" className="space-y-6">
      <section className="rounded-lg border border-[#c2c8c1] bg-white p-5 sm:p-7 shadow-sm">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
          <div>
            <p className="label-sm text-[#4f6f5b] mb-3">Bulk scanner</p>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-[#1a2b21]">
              Paste launch URLs and find broken previews in one pass.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-7 text-[#424843] max-w-[720px]">
              Scan up to {MAX_URLS} public URLs at once. LinkPeek audits each page and summarizes
              the platforms that need attention before you share the campaign.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-[#ecf6ed] p-4">
              <span className="label-sm text-[#4f6f5b]">Limit</span>
              <strong className="mt-2 block text-2xl text-[#1a2b21]">{MAX_URLS}</strong>
            </div>
            <div className="rounded-lg bg-[#ecf6ed] p-4">
              <span className="label-sm text-[#4f6f5b]">Parallel</span>
              <strong className="mt-2 block text-2xl text-[#1a2b21]">{CONCURRENCY}</strong>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={'https://example.com\nhttps://example.com/blog/post\nhttps://example.com/pricing'}
            className="min-h-[180px] w-full resize-y rounded-lg border border-[#c2c8c1] bg-[#fbfaf5] p-4 font-mono text-sm leading-6 text-[#1a2b21] outline-none transition-colors focus:border-[#4f6f5b] focus:bg-white"
            spellCheck={false}
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleScan}
                disabled={isScanning}
                className="inline-flex justify-center rounded-lg bg-[#1a2b21] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2f4a3a] disabled:cursor-wait disabled:opacity-60"
              >
                {isScanning ? 'Scanning URLs...' : 'Run bulk scan'}
              </button>
              <button
                type="button"
                onClick={() => setInput(EXAMPLE_URLS)}
                disabled={isScanning}
                className="inline-flex justify-center rounded-lg border border-[#c2c8c1] px-5 py-3 text-sm font-semibold text-[#1a2b21] transition-colors hover:bg-[#ecf6ed] disabled:opacity-60"
              >
                Use sample URLs
              </button>
            </div>
            <p className="text-xs leading-5 text-[#4f6f5b]">
              One URL per line. CSV-style comma-separated URLs also work.
            </p>
          </div>
          {message && <p className="mt-3 text-sm text-[#4f6f5b]">{message}</p>}
        </div>
      </section>

      {rows.length > 0 && (
        <section className="rounded-lg border border-[#c2c8c1] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#c2c8c1] bg-[#fbfaf5] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="label-sm text-[#4f6f5b] mb-2">Scan results</p>
                <h2 className="text-2xl font-semibold text-[#1a2b21]">
                  {summary.finished}/{summary.total} URLs checked
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <SummaryCard label="Passed" value={summary.passed} />
                <SummaryCard label="Critical" value={summary.critical} />
                <SummaryCard label="Failed" value={summary.failed} />
                <SummaryCard label="Avg score" value={summary.average || '-'} />
              </div>
              <button
                type="button"
                onClick={exportCsv}
                disabled={!rows.some((row) => row.status === 'done' || row.status === 'error')}
                className="rounded-lg bg-[#dde6e1] px-5 py-3 text-sm font-semibold text-[#1a2b21] transition-colors hover:bg-[#c9d8d1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-left">
              <thead className="bg-[#f4f0e6] text-xs uppercase tracking-[0.05em] text-[#4f6f5b]">
                <tr>
                  <th className="px-5 py-4 font-semibold">URL</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Score</th>
                  <th className="px-5 py-4 font-semibold">Platforms</th>
                  <th className="px-5 py-4 font-semibold">Main issue</th>
                  <th className="px-5 py-4 font-semibold">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c8c1]/60">
                {rows.map((row) => {
                  const label = getRowLabel(row);
                  return (
                    <tr key={row.url} className="align-top">
                      <td className="px-5 py-4">
                        <span className="block max-w-[300px] truncate text-sm font-semibold text-[#1a2b21]">
                          {row.url}
                        </span>
                        {row.data?.domain && (
                          <span className="mt-1 block text-xs text-[#4f6f5b]">{row.data.domain}</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(label)}`}>
                          {label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {row.audit ? (
                          <div>
                            <strong className="text-xl text-[#1a2b21]">{row.audit.overall}</strong>
                            <span className="ml-2 text-xs font-semibold text-[#4f6f5b]">{row.audit.grade}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-[#4f6f5b]">-</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        {row.audit ? (
                          <div className="flex flex-wrap gap-2 max-w-[260px]">
                            {row.audit.platforms
                              .filter((platform) => platform.platform !== 'facebook')
                              .map((platform) => (
                                <span
                                  key={platform.platform}
                                  className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${scoreClass(platform.score)}`}
                                  title={`${platform.platform}: ${platform.score}`}
                                >
                                  {platformLabels[platform.platform] || platform.platform} {platform.score}
                                </span>
                              ))}
                          </div>
                        ) : (
                          <span className="text-sm text-[#4f6f5b]">{row.status === 'scanning' ? 'Checking...' : '-'}</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="max-w-[340px] text-sm leading-6 text-[#424843]">
                          {row.error || getMainIssue(row.audit) || 'Waiting to scan'}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/?url=${encodeURIComponent(row.url)}`}
                          className="inline-flex rounded-lg border border-[#c2c8c1] px-3 py-2 text-xs font-semibold text-[#1a2b21] no-underline transition-colors hover:bg-[#ecf6ed]"
                        >
                          Open mockup
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[#c2c8c1] bg-white px-4 py-3">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#4f6f5b]">
        {label}
      </span>
      <strong className="mt-1 block text-xl text-[#1a2b21]">{value}</strong>
    </div>
  );
}

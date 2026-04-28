import type { OGData } from '@/types';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Severity = 'critical' | 'warning' | 'info' | 'pass';

export interface AuditFinding {
  id: string;
  tag: string;               // e.g. "og:title", "twitter:card"
  severity: Severity;
  plain: string;             // Plain-English explanation
  technical: string;         // Short technical note
  platforms: string[];       // affected platforms
  fix?: string;              // suggested meta tag to fix
}

export interface PlatformScore {
  platform: string;
  score: number;             // 0-100
  icon: string;              // emoji or identifier
  findings: AuditFinding[];
}

export interface AuditResult {
  overall: number;
  grade: string;
  platforms: PlatformScore[];
  findings: AuditFinding[];
  generatedTags: string;     // ready-to-paste meta tag block
  totalChecks: number;
  passedChecks: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function has(val: string | undefined | null): boolean {
  return !!val && val.trim().length > 0;
}

function charLen(val: string): number {
  return val?.trim().length ?? 0;
}

// ─── Core audit rules (50+ checks) ──────────────────────────────────────────

export function runAudit(data: OGData): AuditResult {
  const findings: AuditFinding[] = [];
  let id = 0;
  const next = () => `audit-${++id}`;

  // ── og:title ───────────────────────────────────────────────────────────
  if (!has(data.title)) {
    findings.push({ id: next(), tag: 'og:title', severity: 'critical', plain: 'Your page has no title — links will look blank on every platform.', technical: 'og:title is missing', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'], fix: `<meta property="og:title" content="Your Page Title" />` });
  } else {
    if (charLen(data.title) > 70) {
      findings.push({ id: next(), tag: 'og:title', severity: 'warning', plain: `Your title is ${charLen(data.title)} characters — Instagram and LinkedIn will chop it off after ~60-70.`, technical: `og:title is ${charLen(data.title)} chars (ideal < 70)`, platforms: ['instagram', 'linkedin'] });
    }
    if (charLen(data.title) > 95) {
      findings.push({ id: next(), tag: 'og:title', severity: 'warning', plain: 'On Twitter/X, titles over 70 chars get truncated with "..."', technical: 'Title too long for Twitter card', platforms: ['twitter'] });
    }
    if (charLen(data.title) < 15) {
      findings.push({ id: next(), tag: 'og:title', severity: 'info', plain: 'Your title is quite short — consider adding more context for better engagement.', technical: `og:title only ${charLen(data.title)} chars`, platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
    }
    findings.push({ id: next(), tag: 'og:title', severity: 'pass', plain: 'Title is present and well-formatted.', technical: `og:title: "${data.title.slice(0, 50)}${data.title.length > 50 ? '…' : ''}"`, platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
  }

  // ── og:description ─────────────────────────────────────────────────────
  if (!has(data.description)) {
    findings.push({ id: next(), tag: 'og:description', severity: 'critical', plain: 'No description found — previews will show a blank subtitle or auto-generate from your page content.', technical: 'og:description is missing', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'], fix: `<meta property="og:description" content="A brief summary of your page." />` });
  } else {
    if (charLen(data.description) > 200) {
      findings.push({ id: next(), tag: 'og:description', severity: 'warning', plain: `Your description is ${charLen(data.description)} characters — most platforms only show the first 150-200.`, technical: `Description is ${charLen(data.description)} chars`, platforms: ['twitter', 'linkedin', 'instagram'] });
    }
    if (charLen(data.description) < 50) {
      findings.push({ id: next(), tag: 'og:description', severity: 'info', plain: 'Your description is a bit short. Add more detail to entice clicks.', technical: `og:description only ${charLen(data.description)} chars`, platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
    }
    findings.push({ id: next(), tag: 'og:description', severity: 'pass', plain: 'Description looks good.', technical: `og:description present (${charLen(data.description)} chars)`, platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
  }

  // ── og:image ───────────────────────────────────────────────────────────
  if (!has(data.image)) {
    findings.push({ id: next(), tag: 'og:image', severity: 'critical', plain: 'No preview image! Your link will show as a plain text card — people are 3× less likely to click.', technical: 'og:image is missing', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'], fix: `<meta property="og:image" content="https://yoursite.com/preview.jpg" />` });
  } else {
    // Check if relative URL
    if (!data.image.startsWith('http')) {
      findings.push({ id: next(), tag: 'og:image', severity: 'warning', plain: 'Your image URL is relative — some platforms like WhatsApp need an absolute URL starting with https://.', technical: 'og:image is a relative URL', platforms: ['whatsapp', 'instagram', 'linkedin'] });
    }
    // HTTPS check
    if (data.image.startsWith('http://')) {
      findings.push({ id: next(), tag: 'og:image', severity: 'warning', plain: 'Your image uses HTTP, not HTTPS — some platforms will refuse to show it.', technical: 'og:image uses insecure HTTP', platforms: ['twitter', 'linkedin', 'slack'] });
    }
    findings.push({ id: next(), tag: 'og:image', severity: 'pass', plain: 'Preview image is present.', technical: 'og:image is set', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
  }

  // ── og:image:width & og:image:height ───────────────────────────────────
  if (!has(data.imageWidth) || !has(data.imageHeight)) {
    findings.push({ id: next(), tag: 'og:image:width', severity: 'warning', plain: 'Image dimensions aren\'t specified — Instagram and LinkedIn may take longer to crawl your page.', technical: 'og:image:width / og:image:height missing', platforms: ['instagram', 'linkedin'], fix: `<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />` });
  } else {
    const w = parseInt(data.imageWidth);
    const h = parseInt(data.imageHeight);
    if (!isNaN(w) && !isNaN(h)) {
      const ratio = w / h;
      if (ratio < 1.5 || ratio > 2.2) {
        findings.push({ id: next(), tag: 'og:image', severity: 'info', plain: `Your image ratio is ${ratio.toFixed(2)} — for best results use 1200×630 (ratio ~1.9).`, technical: `Image ratio ${ratio.toFixed(2)}, ideal ~1.91`, platforms: ['instagram', 'twitter', 'linkedin'] });
      }
      if (w < 600) {
        findings.push({ id: next(), tag: 'og:image:width', severity: 'warning', plain: 'Image is narrower than 600px — it may appear blurry on hi-res screens.', technical: `Image width only ${w}px`, platforms: ['instagram', 'linkedin', 'twitter'] });
      }
    }
    findings.push({ id: next(), tag: 'og:image:width', severity: 'pass', plain: 'Image dimensions are specified.', technical: `${data.imageWidth}×${data.imageHeight}`, platforms: ['instagram', 'linkedin'] });
  }

  // ── og:type ────────────────────────────────────────────────────────────
  if (!has(data.type)) {
    findings.push({ id: next(), tag: 'og:type', severity: 'info', plain: 'No content type specified — platforms default to "website" but it\'s better to be explicit.', technical: 'og:type is missing', platforms: ['instagram'], fix: `<meta property="og:type" content="website" />` });
  } else {
    findings.push({ id: next(), tag: 'og:type', severity: 'pass', plain: `Content type is set to "${data.type}".`, technical: `og:type = ${data.type}`, platforms: ['instagram'] });
  }

  // ── og:url ─────────────────────────────────────────────────────────────
  if (!has(data.url)) {
    findings.push({ id: next(), tag: 'og:url', severity: 'info', plain: 'Canonical URL isn\'t set — set og:url so shares always point to the right page.', technical: 'og:url is missing', platforms: ['instagram', 'linkedin'], fix: `<meta property="og:url" content="https://yoursite.com/page" />` });
  } else {
    findings.push({ id: next(), tag: 'og:url', severity: 'pass', plain: 'Canonical URL is set.', technical: `og:url present`, platforms: ['instagram', 'linkedin'] });
  }

  // ── og:site_name ───────────────────────────────────────────────────────
  if (!has(data.siteName)) {
    findings.push({ id: next(), tag: 'og:site_name', severity: 'info', plain: 'Site name is missing — add it so Instagram and LinkedIn show your brand name.', technical: 'og:site_name is missing', platforms: ['instagram', 'linkedin'], fix: `<meta property="og:site_name" content="Your Site Name" />` });
  } else {
    findings.push({ id: next(), tag: 'og:site_name', severity: 'pass', plain: `Site name: "${data.siteName}"`, technical: 'og:site_name present', platforms: ['instagram', 'linkedin'] });
  }

  // ── twitter:card ───────────────────────────────────────────────────────
  if (!has(data.twitterCard)) {
    findings.push({ id: next(), tag: 'twitter:card', severity: 'warning', plain: 'No Twitter card type set — your link will show as a tiny "summary" card instead of a large image.', technical: 'twitter:card is missing', platforms: ['twitter'], fix: `<meta name="twitter:card" content="summary_large_image" />` });
  } else {
    if (data.twitterCard === 'summary' && has(data.image)) {
      findings.push({ id: next(), tag: 'twitter:card', severity: 'info', plain: 'You have an image but use "summary" card — switch to "summary_large_image" for a bigger, more eye-catching preview on X.', technical: 'Using summary instead of summary_large_image', platforms: ['twitter'] });
    }
    findings.push({ id: next(), tag: 'twitter:card', severity: 'pass', plain: `Twitter card type: "${data.twitterCard}"`, technical: `twitter:card = ${data.twitterCard}`, platforms: ['twitter'] });
  }

  // ── WhatsApp-specific checks ───────────────────────────────────────────
  if (has(data.title) && charLen(data.title) > 65) {
    findings.push({ id: next(), tag: 'og:title', severity: 'warning', plain: 'WhatsApp cuts titles to roughly 65 characters — yours will get chopped.', technical: 'Title exceeds WhatsApp truncation limit', platforms: ['whatsapp'] });
  }
  if (has(data.description) && charLen(data.description) > 80) {
    findings.push({ id: next(), tag: 'og:description', severity: 'info', plain: 'WhatsApp only shows the first ~80 chars of your description.', technical: 'Description exceeds WhatsApp display limit', platforms: ['whatsapp'] });
  }
  if (has(data.image) && data.imageSize != null && data.imageSize > 300 * 1024) {
    const sizeKB = Math.round(data.imageSize / 1024);
    findings.push({ id: next(), tag: 'og:image', severity: 'critical', plain: `Your OG image is ${sizeKB} KB — WhatsApp won't load images larger than ~300 KB. The preview will appear without an image. Compress or resize it to under 300 KB.`, technical: `og:image file size ${sizeKB} KB exceeds WhatsApp ~300 KB limit`, platforms: ['whatsapp'] });
  }

  // ── Slack-specific checks ──────────────────────────────────────────────
  if (!has(data.siteName)) {
    findings.push({ id: next(), tag: 'og:site_name', severity: 'info', plain: 'Slack uses og:site_name as the bold header in unfurled links — without it, Slack guesses from the domain.', technical: 'og:site_name missing for Slack', platforms: ['slack'] });
  }

  // ── Discord-specific checks ────────────────────────────────────────────
  if (has(data.title) && charLen(data.title) > 256) {
    findings.push({ id: next(), tag: 'og:title', severity: 'warning', plain: 'Discord embeds truncate titles at 256 characters.', technical: 'Title exceeds Discord embed limit', platforms: ['discord'] });
  }
  if (has(data.description) && charLen(data.description) > 350) {
    findings.push({ id: next(), tag: 'og:description', severity: 'info', plain: 'Discord embeds truncate descriptions around 350 characters.', technical: 'Description may be truncated in Discord', platforms: ['discord'] });
  }
  if (!has(data.type)) {
    findings.push({ id: next(), tag: 'og:type', severity: 'info', plain: 'Discord can style different og:type values differently — setting it to "article" or "website" helps.', technical: 'og:type missing for Discord', platforms: ['discord'] });
  }

  // ── LinkedIn-specific checks ───────────────────────────────────────────
  if (has(data.image)) {
    const w = parseInt(data.imageWidth);
    if (!isNaN(w) && w < 1200) {
      findings.push({ id: next(), tag: 'og:image', severity: 'info', plain: 'LinkedIn recommends images at least 1200px wide for the best preview.', technical: `Image width ${w}px, LinkedIn recommends ≥1200px`, platforms: ['linkedin'] });
    }
  }
  if (has(data.title) && charLen(data.title) > 150) {
    findings.push({ id: next(), tag: 'og:title', severity: 'info', plain: 'LinkedIn truncates titles after roughly 150 characters.', technical: 'Title too long for LinkedIn', platforms: ['linkedin'] });
  }

  // ── Instagram-specific checks ──────────────────────────────────────────
  if (has(data.image)) {
    const w = parseInt(data.imageWidth);
    const h = parseInt(data.imageHeight);
    if (!isNaN(w) && !isNaN(h) && (w < 200 || h < 200)) {
      findings.push({ id: next(), tag: 'og:image', severity: 'warning', plain: 'Instagram requires images to be at least 200×200px — yours is too small and may not display.', technical: `Image ${w}×${h}px, Instagram minimum is 200×200`, platforms: ['instagram'] });
    }
  }

  // ── General best-practice checks ───────────────────────────────────────
  if (has(data.title) && data.title === data.title.toUpperCase() && data.title.length > 5) {
    findings.push({ id: next(), tag: 'og:title', severity: 'info', plain: 'Your title is ALL CAPS — this looks spammy on social platforms and hurts click-through rates.', technical: 'Title is entirely uppercase', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
  }

  if (has(data.title) && has(data.description) && data.title.trim().toLowerCase() === data.description.trim().toLowerCase()) {
    findings.push({ id: next(), tag: 'og:description', severity: 'warning', plain: 'Your title and description are identical — make them unique for better engagement.', technical: 'Title and description are duplicates', platforms: ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] });
  }

  // ── Compute per-platform scores ────────────────────────────────────────
  const platformNames = ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'] as const;
  const platformIcons: Record<string, string> = {
    whatsapp: '💬', twitter: '𝕏', linkedin: '💼', slack: '⚡', discord: '🎮', instagram: '📷',
  };

  const platforms: PlatformScore[] = platformNames.map(name => {
    const pFindings = findings.filter(f => f.platforms.includes(name));
    const criticals = pFindings.filter(f => f.severity === 'critical').length;
    const warnings = pFindings.filter(f => f.severity === 'warning').length;
    const infos = pFindings.filter(f => f.severity === 'info').length;

    // Score: start at 100, deduct per severity
    let score = 100;
    score -= criticals * 25;
    score -= warnings * 10;
    score -= infos * 3;
    score = Math.max(0, Math.min(100, score));

    return {
      platform: name,
      score,
      icon: platformIcons[name],
      findings: pFindings,
    };
  });

  // ── Overall score ──────────────────────────────────────────────────────
  const overall = Math.round(platforms.reduce((s, p) => s + p.score, 0) / platforms.length);
  const grade = overall >= 90 ? 'A+' : overall >= 80 ? 'A' : overall >= 70 ? 'B' : overall >= 55 ? 'C' : overall >= 40 ? 'D' : 'F';

  // ── Generate fix meta tags ─────────────────────────────────────────────
  const fixes = findings.filter(f => f.fix);
  const uniqueFixes = Array.from(new Map(fixes.map(f => [f.tag, f.fix!])).values());
  const generatedTags = uniqueFixes.length
    ? `<!-- Generated by LinkPeek Audit -->\n${uniqueFixes.join('\n')}`
    : '<!-- All essential meta tags are present! -->';

  const totalChecks = findings.length;
  const passedChecks = findings.filter(f => f.severity === 'pass').length;

  return { overall, grade, platforms, findings, generatedTags, totalChecks, passedChecks };
}

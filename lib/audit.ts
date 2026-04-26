import type { OGData, AuditResult, AuditIssue, PlatformScore, Platform } from '@/types';

export function runAudit(data: OGData): AuditResult {
  const issues: AuditIssue[] = [];

  // --- Image checks ---
  if (!data.image) {
    issues.push({
      id: 'no-image',
      severity: 'error',
      category: 'image',
      message: 'Your link has no image.',
      detail: 'WhatsApp, Twitter and LinkedIn will show a blank card without a preview image.',
    });
  } else {
    if (data.image.startsWith('http://')) {
      issues.push({
        id: 'insecure-image',
        severity: 'error',
        category: 'image',
        message: 'Your image URL is not secure.',
        detail: 'Most platforms will block images loaded over HTTP. Switch to HTTPS.',
      });
    }
    if (data.image.match(/\.svg(\?|$)/i)) {
      issues.push({
        id: 'svg-image',
        severity: 'warning',
        category: 'image',
        message: 'Your image is in SVG format.',
        detail: 'Twitter does not support SVG images. Use PNG or JPG instead.',
      });
    }
    if (data.imageWidth && data.imageHeight) {
      const w = parseInt(data.imageWidth, 10);
      const h = parseInt(data.imageHeight, 10);
      if (w < 1200 || h < 627) {
        issues.push({
          id: 'small-image',
          severity: 'warning',
          category: 'image',
          message: 'Your image is too small for LinkedIn.',
          detail: `Your image is ${w}×${h}px. LinkedIn needs at least 1200×627 pixels for a full-width preview.`,
        });
      }
    }
  }

  // --- Text checks ---
  if (!data.title) {
    issues.push({
      id: 'no-title',
      severity: 'error',
      category: 'text',
      message: 'Your link has no title.',
      detail: 'Platforms will show the raw URL instead of a readable name.',
    });
  } else if (data.title.length > 60) {
    issues.push({
      id: 'long-title',
      severity: 'warning',
      category: 'text',
      message: 'Your title is too long for Twitter.',
      detail: `It will be cut off after 60 characters. Current length: ${data.title.length} characters.`,
      cutoffIndex: 60,
    });
  }

  if (!data.description) {
    issues.push({
      id: 'no-description',
      severity: 'warning',
      category: 'text',
      message: 'No description found.',
      detail: 'Your preview will look incomplete on most platforms.',
    });
  } else if (data.description.length > 120) {
    issues.push({
      id: 'long-description',
      severity: 'warning',
      category: 'text',
      message: 'Your description is too long.',
      detail: `It will be cut off after 120 characters. Current length: ${data.description.length} characters.`,
      cutoffIndex: 120,
    });
  }

  // --- Technical checks ---
  const hasAnyOGTag = data.title || data.description || data.image || data.siteName;
  if (!hasAnyOGTag) {
    issues.push({
      id: 'no-og-tags',
      severity: 'error',
      category: 'technical',
      message: 'This page has no sharing tags set up at all.',
      detail: 'Adding Open Graph tags will dramatically improve how your link appears when shared.',
    });
  }

  if (!data.twitterCard) {
    issues.push({
      id: 'no-twitter-card',
      severity: 'warning',
      category: 'technical',
      message: 'Twitter card type not specified.',
      detail: 'Twitter will guess how to display your link. Add a twitter:card tag for consistent results.',
    });
  }

  // Check for possible login wall (very limited heuristic)
  if (
    data.title.toLowerCase().includes('login') ||
    data.title.toLowerCase().includes('sign in') ||
    data.title.toLowerCase().includes('log in')
  ) {
    issues.push({
      id: 'login-wall',
      severity: 'warning',
      category: 'technical',
      message: 'This page may be behind a login.',
      detail: 'Platforms cannot read private pages. Only public pages get rich previews.',
    });
  }

  // Add passing items
  if (data.image && !issues.find(i => i.id === 'insecure-image' || i.id === 'svg-image')) {
    issues.push({
      id: 'image-ok',
      severity: 'success',
      category: 'image',
      message: 'You have a preview image.',
      detail: 'Great — your link will show an image on most platforms.',
    });
  }
  if (data.title && !issues.find(i => i.id === 'long-title')) {
    issues.push({
      id: 'title-ok',
      severity: 'success',
      category: 'text',
      message: 'Your title looks good.',
      detail: `"${data.title.slice(0, 50)}${data.title.length > 50 ? '…' : ''}"`,
    });
  }
  if (data.twitterCard) {
    issues.push({
      id: 'twitter-card-ok',
      severity: 'success',
      category: 'technical',
      message: 'Twitter card type is set.',
      detail: `Card type: ${data.twitterCard}`,
    });
  }

  const scores = computeScores(data, issues);
  const fixTags = generateFixTags(data, issues);

  return { issues, scores, fixTags };
}

function computeScores(data: OGData, issues: AuditIssue[]): PlatformScore[] {
  const platforms: Platform[] = ['whatsapp', 'twitter', 'linkedin', 'slack', 'discord', 'instagram'];

  const hasImage = !!data.image && !issues.find(i => i.id === 'insecure-image');
  const hasTitle = !!data.title;
  const hasDesc = !!data.description;
  const titleOk = hasTitle && data.title.length <= 60;
  const descOk = hasDesc && data.description.length <= 120;
  const hasTwitterCard = !!data.twitterCard;
  const imageOk = hasImage && !issues.find(i => i.id === 'svg-image');

  const scoreMap: Record<Platform, () => { score: number; reason?: string }> = {
    whatsapp: () => {
      let s = 100;
      if (!hasImage) { s -= 35; }
      if (!hasTitle) { s -= 35; }
      if (!hasDesc) { s -= 15; }
      const reason = !hasImage ? 'No image — WhatsApp will show a text-only card.' :
        !hasTitle ? 'No title found.' : undefined;
      return { score: Math.max(0, s), reason };
    },
    twitter: () => {
      let s = 100;
      if (!imageOk) s -= 30;
      if (!hasTitle) s -= 30;
      if (!titleOk) s -= 15;
      if (!hasTwitterCard) s -= 15;
      if (!descOk) s -= 10;
      const reason = !imageOk ? 'No valid image.' :
        !hasTwitterCard ? 'Twitter card type not set.' :
        !titleOk ? 'Title is too long and will be cut off.' : undefined;
      return { score: Math.max(0, s), reason };
    },
    linkedin: () => {
      let s = 100;
      if (!hasImage) s -= 40;
      if (!hasTitle) s -= 30;
      if (!hasDesc) s -= 20;
      const imgSmall = issues.find(i => i.id === 'small-image');
      if (imgSmall) s -= 15;
      const reason = !hasImage ? 'No image — LinkedIn previews rely heavily on images.' :
        imgSmall ? 'Image too small — LinkedIn may not show it.' :
        !hasDesc ? 'No description found.' : undefined;
      return { score: Math.max(0, s), reason };
    },
    slack: () => {
      let s = 100;
      if (!hasImage) s -= 25;
      if (!hasTitle) s -= 35;
      if (!hasDesc) s -= 20;
      const reason = !hasTitle ? 'No title for Slack to display.' : !hasDesc ? 'No description.' : undefined;
      return { score: Math.max(0, s), reason };
    },
    discord: () => {
      let s = 100;
      if (!hasImage) s -= 30;
      if (!hasTitle) s -= 30;
      if (!hasDesc) s -= 20;
      const reason = !hasTitle ? 'Discord needs a title to create an embed.' : undefined;
      return { score: Math.max(0, s), reason };
    },
    instagram: () => {
      let s = 100;
      if (!hasImage) s -= 50;
      if (!hasTitle) s -= 30;
      const reason = !hasImage ? 'Instagram is very visual — no image means almost no preview.' : undefined;
      return { score: Math.max(0, s), reason };
    },
  };

  return platforms.map(p => {
    const { score, reason } = scoreMap[p]();
    return { platform: p, score, label: platformLabel(p), reason };
  });
}

function platformLabel(p: Platform): string {
  const map: Record<Platform, string> = {
    whatsapp: 'WhatsApp',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
    slack: 'Slack',
    discord: 'Discord',
    instagram: 'Instagram',
  };
  return map[p];
}

function generateFixTags(data: OGData, issues: AuditIssue[]): string {
  const title = data.title || 'Your Page Title';
  const desc = data.description.slice(0, 160) || 'A short description of your page.';
  const image = data.image || 'https://yourdomain.com/og-image.png';
  const url = data.url || 'https://yourdomain.com';
  const siteName = data.siteName || 'Your Site';

  return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="description" content="${desc}" />

<!-- Open Graph / Social Media -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${image}" />`;
}

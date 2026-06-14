export const DEFAULT_SITE_URL = 'https://www.getlinkpeek.com';

function normalizeSiteUrl(url: string) {
  const cleanUrl = url.replace(/\/$/, '');

  if (cleanUrl === 'https://getlinkpeek.com') {
    return DEFAULT_SITE_URL;
  }

  return cleanUrl;
}

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicitUrl) {
    return normalizeSiteUrl(explicitUrl);
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (vercelUrl) {
    return normalizeSiteUrl(`https://${vercelUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`);
  }

  return DEFAULT_SITE_URL;
}

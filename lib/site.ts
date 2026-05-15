export const DEFAULT_SITE_URL = 'https://getlinkpeek.com';

export function getSiteUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicitUrl) {
    return explicitUrl.replace(/\/$/, '');
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (vercelUrl) {
    return `https://${vercelUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  }

  return DEFAULT_SITE_URL;
}

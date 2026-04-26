import type { OGData } from '@/types';
import { extractDomain } from './detect';

function makeAbsolute(url: string, base: string): string {
  if (!url) return '';
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

export function parseOGFromHTML(html: string, sourceUrl: string): OGData {
  // We parse with regex on client side (Cheerio is server-only)
  const getMeta = (property: string): string => {
    const patterns = [
      new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return m[1].trim();
    }
    return '';
  };

  const getMetaName = (name: string): string => {
    const patterns = [
      new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'),
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return m[1].trim();
    }
    return '';
  };

  const getTitle = (): string => {
    const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return m ? m[1].trim() : '';
  };

  const ogTitle = getMeta('og:title');
  const twitterTitle = getMeta('twitter:title');
  const pageTitle = getTitle();

  const ogDesc = getMeta('og:description');
  const twitterDesc = getMeta('twitter:description');
  const metaDesc = getMetaName('description');

  const ogImage = getMeta('og:image');
  const twitterImage = getMeta('twitter:image');

  const rawImage = ogImage || twitterImage;
  const absoluteImage = rawImage ? makeAbsolute(rawImage, sourceUrl) : '';

  return {
    title: ogTitle || twitterTitle || pageTitle || '',
    description: ogDesc || twitterDesc || metaDesc || '',
    image: absoluteImage,
    siteName: getMeta('og:site_name') || extractDomain(sourceUrl),
    domain: extractDomain(sourceUrl),
    imageWidth: getMeta('og:image:width'),
    imageHeight: getMeta('og:image:height'),
    type: getMeta('og:type'),
    twitterCard: getMeta('twitter:card') || getMetaName('twitter:card'),
    url: sourceUrl,
    isLocalhost: false,
  };
}

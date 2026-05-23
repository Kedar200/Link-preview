import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — LinkPeek | Open Graph Tips, OG Image Guides & Link Preview Fixes',
  description:
    'Learn how to fix broken link previews, optimize OG images for every platform, and master Open Graph meta tags. Expert guides from the LinkPeek team.',
  keywords: [
    'Open Graph blog',
    'link preview tips',
    'OG image guide',
    'fix link preview',
    'social media meta tags',
    'WhatsApp preview fix',
    'Twitter card guide',
    'LinkedIn preview help',
  ],
  alternates: {
    canonical: `${getSiteUrl()}/blog`,
  },
  openGraph: {
    title: 'Blog — LinkPeek',
    description:
      'Expert guides on fixing link previews, optimizing OG images, and mastering Open Graph meta tags for every social platform.',
    type: 'website',
    url: `${getSiteUrl()}/blog`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkPeek Blog — Open Graph & Link Preview Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — LinkPeek',
    description:
      'Expert guides on fixing link previews, optimizing OG images, and mastering Open Graph tags.',
    images: ['/og-image.png'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

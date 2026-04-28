import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://linkpeek-steel.vercel.app/'
  ),
  title: 'LinkPeek — See your link before you share it',
  description:
    'Instantly preview how your link looks on WhatsApp, Twitter/X, LinkedIn, Slack, Discord and Instagram. Fix sharing issues before anyone sees them.',
  keywords: ['og preview', 'link preview', 'open graph checker', 'social media preview', 'meta tags'],
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'LinkPeek — See your link before you share it',
    description: 'Preview and fix your link previews across 6 platforms instantly.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkPeek — Preview your links across WhatsApp, Twitter, LinkedIn, Slack, Discord and Instagram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkPeek — See your link before you share it',
    description: 'Preview and fix your link previews across 6 platforms instantly.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

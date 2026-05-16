import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'LinkPeek - Open Graph Preview Tool & Link Preview Checker',
  description:
    'Check Open Graph previews, OG images, Twitter cards, LinkedIn previews, and WhatsApp link previews before you publish or share your URL.',
  keywords: [
    'Open Graph preview tool',
    'social media link preview tool',
    'link preview checker',
    'OG image preview',
    'Twitter card preview',
    'LinkedIn preview checker',
    'WhatsApp link preview checker',
    'Open Graph checker',
    'social media preview',
    'meta tags',
  ],
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'LinkPeek - Open Graph Preview Tool & Link Preview Checker',
    description:
      'Preview Open Graph images, Twitter cards, LinkedIn previews, WhatsApp link previews, Slack, Discord, and Instagram cards before you share.',
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
    site: '@KedarDe02887131',
    title: 'LinkPeek - Open Graph Preview Tool',
    description:
      'Check OG images, Twitter cards, LinkedIn previews, and WhatsApp link previews before you publish.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        {children}

        {/* Global Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LinkPeek",
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "applicationSubCategory": "Open Graph preview tool",
              "description": "Open Graph preview tool and social media link preview checker for testing OG images, Twitter cards, LinkedIn previews, WhatsApp link previews, Slack, Discord, and Instagram cards before publishing.",
              "featureList": [
                "Open Graph preview checker",
                "OG image preview",
                "Twitter card preview",
                "LinkedIn preview checker",
                "WhatsApp link preview checker",
                "Social media link preview audit"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LinkPeek",
              "url": "https://getlinkpeek.com/"
            })
          }}
        />
      </body>
    </html>
  );
}

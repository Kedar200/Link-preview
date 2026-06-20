import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'LinkPeek - Open Graph Preview Tool & Link Preview Checker',
  description:
    'Preview pixel-perfect social card mockups and audit Open Graph tags for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram before publishing.',
  alternates: {
    canonical: siteUrl,
  },
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
    'pixel-perfect social card mockups',
    'high-fidelity link preview mockups',
    'meta tags',
  ],
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'LinkPeek - Open Graph Preview Tool & Link Preview Checker',
    description:
      'Preview high-fidelity social card mockups for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram, then audit the meta tags behind them.',
    type: 'website',
    url: siteUrl,
    siteName: 'LinkPeek',
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
      'Preview pixel-perfect social card mockups and audit Open Graph tags before you publish.',
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
              "url": siteUrl,
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "applicationSubCategory": "Open Graph preview tool",
              "description": "Open Graph preview tool and social media link preview checker for testing high-fidelity social card mockups, OG images, Twitter cards, LinkedIn previews, WhatsApp link previews, Slack, Discord, and Instagram cards before publishing.",
              "featureList": [
                "Open Graph preview checker",
                "Pixel-perfect social card mockups",
                "High-fidelity app UI replicas",
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
              },
              "sameAs": [
                "https://github.com/Kedar200/Link-preview"
              ]
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
              "url": siteUrl
            })
          }}
        />
      </body>
    </html>
  );
}

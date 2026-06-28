import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Open Graph Preview Tool | Test WhatsApp, LinkedIn & X Link Previews',
  description:
    'Preview how your links look on WhatsApp, LinkedIn, X, Slack, Discord and Instagram. Test Open Graph tags, Twitter cards and localhost URLs without ngrok.',
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
    'test Open Graph localhost',
    'preview OG tags localhost',
    'Open Graph localhost without ngrok',
    'WhatsApp OG image not showing',
    'clear WhatsApp link preview cache',
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
    title: 'Open Graph Preview Tool | Test WhatsApp, LinkedIn & X Link Previews',
    description:
      'Preview how your links look on WhatsApp, LinkedIn, X, Slack, Discord and Instagram. Test Open Graph tags, Twitter cards and localhost URLs without ngrok.',
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
    title: 'Open Graph Preview Tool | LinkPeek',
    description:
      'Test WhatsApp, LinkedIn, X, Slack, Discord, Instagram, Twitter Cards, and localhost Open Graph previews without ngrok.',
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
              "@type": ["SoftwareApplication", "WebApplication"],
              "name": "LinkPeek",
              "url": siteUrl,
              "alternateName": "GetLinkPeek",
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "applicationSubCategory": "Open Graph preview tool",
              "description": "LinkPeek is a free web application for previewing Open Graph tags, Twitter cards, and platform-specific link previews across WhatsApp, LinkedIn, X, Slack, Discord and Instagram, including localhost URLs.",
              "featureList": [
                "Open Graph preview checker",
                "Pixel-perfect social card mockups",
                "High-fidelity app UI replicas",
                "OG image preview",
                "Twitter card preview",
                "LinkedIn preview checker",
                "WhatsApp link preview checker",
                "Slack link preview checker",
                "Discord link preview checker",
                "Localhost Open Graph preview without ngrok",
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
              "url": siteUrl,
              "description": "Free Open Graph preview tool for testing WhatsApp, LinkedIn, X, Slack, Discord, Instagram, Twitter Card, and localhost link previews."
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LinkPeek",
              "url": siteUrl,
              "logo": `${siteUrl}/icon.png`,
              "sameAs": ["https://github.com/Kedar200/Link-preview"],
              "description": "LinkPeek builds free developer tools for Open Graph, Twitter Card, social card, and localhost link preview debugging."
            })
          }}
        />
      </body>
    </html>
  );
}

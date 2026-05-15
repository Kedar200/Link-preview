import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
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
    site: '@KedarDe02887131',
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
              "description": "Instantly preview and audit your Open Graph meta tags across 6 platforms.",
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

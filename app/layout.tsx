import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkPeek — See your link before you share it',
  description:
    'Instantly preview how your link looks on WhatsApp, Twitter/X, LinkedIn, Slack, Discord and Instagram. Fix sharing issues before anyone sees them.',
  keywords: ['og preview', 'link preview', 'open graph checker', 'social media preview', 'meta tags'],
  openGraph: {
    title: 'LinkPeek — See your link before you share it',
    description: 'Preview and fix your link previews across 6 platforms instantly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkPeek — See your link before you share it',
    description: 'Preview and fix your link previews across 6 platforms instantly.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

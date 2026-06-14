import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteUrl } from '@/lib/site';
import { seoToolPages } from '@/lib/seo-pages';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'Free Social Link Preview Tools | LinkPeek',
  description:
    'Free Open Graph, link preview, WhatsApp preview, Twitter card, LinkedIn preview, and localhost social card testing tools from LinkPeek.',
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: 'Free Social Link Preview Tools | LinkPeek',
    description:
      'Preview and audit social cards for Open Graph, WhatsApp, Twitter/X, LinkedIn, Slack, Discord, Instagram-style cards, and localhost URLs.',
    type: 'website',
    url: `${siteUrl}/tools`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkPeek social link preview tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Social Link Preview Tools | LinkPeek',
    description: 'Preview and audit Open Graph and social media link cards before publishing.',
    images: ['/og-image.png'],
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      <div className="bg-[#1a2b21] text-white">
        <Header />
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-14 pb-20">
          <p className="label-sm text-white/55 mb-5">LinkPeek tools</p>
          <h1 className="h1 max-w-[900px]">
            Free social link preview tools for every publishing workflow.
          </h1>
          <p className="body-lg text-white/70 max-w-[680px] mt-8">
            Test Open Graph tags, social card images, platform previews, and localhost URLs before
            your page is shared in feeds, chats, communities, and launch posts.
          </p>
          <Link
            href="/"
            className="inline-flex mt-10 px-5 py-3 rounded-lg bg-[#dde6e1] text-[#1a2b21] font-semibold text-sm no-underline hover:bg-white transition-colors"
          >
            Open the preview checker
          </Link>
        </section>
      </div>

      <main className="flex-1">
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seoToolPages.map((page) => (
              <Link
                key={page.slug}
                href={`/tools/${page.slug}`}
                className="group block rounded-lg border border-[#c2c8c1] bg-white p-6 no-underline shadow-sm transition-all hover:border-[#4f6f5b] hover:shadow-md"
              >
                <p className="label-sm text-[#4f6f5b] mb-4">{page.heroLabel}</p>
                <h2 className="font-headline-lg text-2xl text-[#1a2b21] font-semibold leading-tight">
                  {page.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#424843]">{page.description}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[#4f6f5b] group-hover:text-[#1a2b21]">
                  View tool page
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'LinkPeek Tools',
            description: metadata.description,
            url: `${siteUrl}/tools`,
            hasPart: seoToolPages.map((page) => ({
              '@type': 'WebPage',
              name: page.title,
              url: `${siteUrl}/tools/${page.slug}`,
              description: page.description,
            })),
          }),
        }}
      />
    </div>
  );
}

import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BulkLinkPreviewChecker from '@/components/BulkLinkPreviewChecker';
import { getSiteUrl } from '@/lib/site';
import { getSeoToolPage, seoToolPages } from '@/lib/seo-pages';
import { blogPosts } from '@/lib/blog-data';

export async function generateStaticParams() {
  return seoToolPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoToolPage(slug);

  if (!page) return {};

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tools/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      type: 'website',
      url,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${page.title} by LinkPeek`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function SeoToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === 'localhost-link-preview') {
    redirect('/tools/localhost-og-preview');
  }

  const page = getSeoToolPage(slug);

  if (!page) notFound();

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tools/${page.slug}`;
  const isBulkChecker = page.slug === 'bulk-link-preview-checker';
  const relatedTools = page.relatedToolSlugs
    .map((relatedSlug) => getSeoToolPage(relatedSlug))
    .filter(Boolean);
  const relatedBlogs = page.relatedBlogSlugs
    .map((relatedSlug) => blogPosts.find((post) => post.slug === relatedSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      <div className="bg-[#1a2b21] text-white">
        <Header />
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-12 pb-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.05em] text-white/45">
            <Link href="/" className="text-white/60 no-underline hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="text-white/60 no-underline hover:text-white">
              Tools
            </Link>
            <span>/</span>
            <span className="text-white/80">{page.title}</span>
          </nav>
          <p className="label-sm text-white/55 mb-5">{page.heroLabel}</p>
          <h1 className="h1 max-w-[900px]">{page.title}</h1>
          <p className="body-lg text-white/70 max-w-[720px] mt-8">{page.description}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href={isBulkChecker ? '#bulk-checker' : '/'}
              className="inline-flex justify-center px-5 py-3 rounded-lg bg-[#dde6e1] text-[#1a2b21] font-semibold text-sm no-underline hover:bg-white transition-colors"
            >
              {page.primaryCta}
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center px-5 py-3 rounded-lg border border-white/20 text-white font-semibold text-sm no-underline hover:bg-white/10 transition-colors"
            >
              Read preview guides
            </Link>
          </div>
        </section>
      </div>

      <main className="flex-1">
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 py-12 pb-0">
          {isBulkChecker ? (
            <BulkLinkPreviewChecker />
          ) : (
            <div className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div>
                  <p className="label-sm text-[#4f6f5b] mb-4">Live checker</p>
                  <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                    Test a URL in the {page.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#424843]">{page.intro}</p>
                </div>
                <form
                  action="/"
                  method="get"
                  className="rounded-lg border border-[#d7ddd5] bg-[#f8f5ed] p-5"
                >
                  <label
                    htmlFor="url"
                    className="block text-xs font-mono uppercase tracking-[0.05em] text-[#4f6f5b]"
                  >
                    URL to preview
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="url"
                      name="url"
                      type="url"
                      placeholder="https://example.com/page"
                      className="min-h-12 flex-1 rounded-lg border border-[#c2c8c1] bg-white px-4 text-sm text-[#1a2b21] outline-none focus:border-[#4f6f5b]"
                      required
                    />
                    <button
                      type="submit"
                      className="min-h-12 rounded-lg bg-[#1a2b21] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2f4a3a]"
                    >
                      {page.primaryCta}
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-[#424843]">
                    Opens the full LinkPeek previewer with WhatsApp, LinkedIn, X, Slack,
                    Discord, Instagram, Open Graph, and Twitter Card checks.
                  </p>
                </form>
              </div>
            </div>
          )}
        </section>

        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 py-16">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
            <div className="space-y-8">
              {page.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm"
                >
                  <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[#424843]">{section.body}</p>
                  <ul className="mt-6 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-[#141e18]">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4f6f5b]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                  How to use this {page.targetKeyword}
                </h2>
                <ol className="mt-6 space-y-4">
                  {page.steps.map((step, index) => (
                    <li key={step} className="flex gap-4 text-sm leading-6 text-[#141e18]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2b21] font-mono text-xs text-white">
                        {index + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                  Common issues this page helps debug
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {page.commonIssues.map((issue) => (
                    <div key={issue.title} className="rounded-lg bg-[#ecf6ed] p-5">
                      <h3 className="text-base font-semibold text-[#1a2b21]">{issue.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#424843]">{issue.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-[#c2c8c1]/60">
                  {page.faqs.map((faq) => (
                    <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                      <h3 className="text-base font-semibold text-[#1a2b21]">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#424843]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {relatedBlogs.length > 0 && (
                <section className="rounded-lg border border-[#c2c8c1] bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="font-headline-lg text-3xl text-[#1a2b21] font-semibold leading-tight">
                    Related developer guides
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {relatedBlogs.map((post) => (
                      <Link
                        key={post!.slug}
                        href={`/blog/${post!.slug}`}
                        className="block rounded-lg bg-[#f8f5ed] p-5 text-[#1a2b21] no-underline transition-colors hover:bg-[#ecf6ed]"
                      >
                        <span className="label-sm text-[#4f6f5b]">{post!.category}</span>
                        <strong className="mt-2 block text-base leading-6">{post!.title}</strong>
                        <span className="mt-2 block text-sm leading-6 text-[#424843]">
                          {post!.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="rounded-lg border border-[#c2c8c1] bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <p className="label-sm text-[#4f6f5b] mb-4">Also useful</p>
              <div className="space-y-3">
                {relatedTools
                  .map((toolPage) => (
                    <Link
                      key={toolPage!.slug}
                      href={`/tools/${toolPage!.slug}`}
                      className="block rounded-lg bg-[#ecf6ed] px-4 py-3 text-sm font-semibold text-[#1a2b21] no-underline hover:bg-[#dde6e1] transition-colors"
                    >
                      {toolPage!.title}
                    </Link>
                  ))}
              </div>
              <Link
                href="/"
                className="mt-6 block rounded-lg bg-[#1a2b21] px-4 py-3 text-center text-sm font-semibold text-white no-underline hover:bg-[#2f4a3a] transition-colors"
              >
                Run a live scan
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: page.title,
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                url,
                description: page.description,
                isPartOf: {
                  '@type': 'WebSite',
                  name: 'LinkPeek',
                  url: siteUrl,
                },
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: page.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: siteUrl,
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Tools',
                    item: `${siteUrl}/tools`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: page.title,
                    item: url,
                  },
                ],
              },
              {
                '@type': 'HowTo',
                name: `How to use ${page.title}`,
                description: page.description,
                step: page.steps.map((step, index) => ({
                  '@type': 'HowToStep',
                  position: index + 1,
                  text: step,
                })),
              },
            ],
          }),
        }}
      />
    </div>
  );
}

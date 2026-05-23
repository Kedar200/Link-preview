import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getAllSlugs } from '@/lib/blog-data';
import { getSiteUrl } from '@/lib/site';
import CopyButton from '@/components/CopyButton';

/* ─── Static params for ISR ─── */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Dynamic Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const siteUrl = getSiteUrl();

  return {
    title: `${post.title} — LinkPeek Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-image.png'],
    },
  };
}

/* ─── Premium Markdown-ish renderer ─── */
function renderContent(raw: string) {
  const lines = raw.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let listItems: string[] = [];
  let tableRows: string[][] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = '';

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="blog-list list-none pl-6 my-4">
          {listItems.map((item, idx) => (
            <li
              key={idx}
              className="relative mb-2.5 pl-3 text-on-surface/90 text-base leading-relaxed before:content-[''] before:absolute before:left-[-12px] before:top-[10px] before:w-[6px] before:height-[6px] before:rounded-full before:bg-sage-accent before:opacity-60"
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
            />
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function flushTable() {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);
      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto rounded-xl border border-outline-variant shadow-sm bg-surface-bright/30">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-surface-container-low font-semibold text-xs text-on-surface">
              <tr>
                {header.map((cell, ci) => (
                  <th key={ci} className="p-3 border-b border-outline-variant font-semibold" dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell.trim()) }} />
                ))}
              </tr>
            </thead>
            <tbody className="font-body-md text-on-surface-variant">
              {body.map((row, ri) => (
                <tr key={ri} className="hover:bg-surface-container-low/30 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 border-b border-outline-variant/60 border-r border-outline-variant/40 last:border-r-0" dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell.trim()) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  }

  function inlineMarkdown(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="font-mono text-xs bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant/40 text-sage-accent font-semibold">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-sage-accent hover:text-primary font-semibold underline decoration-sage-accent/30 underline-offset-4 transition-all" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/❌/g, '<span class="text-error mr-1">❌</span>')
      .replace(/✅/g, '<span class="text-sage-accent mr-1">✅</span>');
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        const fullCodeString = codeLines.join('\n');
        elements.push(
          <div key={`code-${elements.length}`} className="my-6 rounded-xl overflow-hidden border border-outline-variant shadow-sm">
            <div className="bg-surface-container-high px-4 py-2 font-mono text-xs text-on-surface-variant flex justify-between items-center border-b border-outline-variant">
              <span className="uppercase tracking-wider font-semibold text-[10px] text-outline">{codeLang || 'code'}</span>
              <CopyButton code={fullCodeString} />
            </div>
            <pre className="p-4 overflow-x-auto bg-deep-forest text-surface-variant m-0 leading-relaxed font-mono text-xs">
              <code>{fullCodeString}</code>
            </pre>
          </div>
        );
        codeLines = [];
        codeLang = '';
        inCodeBlock = false;
        i++;
        continue;
      }
      flushList();
      flushTable();
      inCodeBlock = true;
      codeLang = line.slice(3).trim();
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      flushTable();
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushList();
      flushTable();
      elements.push(<hr key={`hr-${elements.length}`} className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent" />);
      i++;
      continue;
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      const cells = line.trim().slice(1, -1).split('|');
      // Skip separator rows
      if (cells.every((c) => /^[\s\-:]+$/.test(c))) {
        i++;
        continue;
      }
      tableRows.push(cells);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList();
      flushTable();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="font-headline-md text-xl sm:text-2xl text-deep-forest mt-8 mb-4 font-semibold"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.slice(4)) }}
        />
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      flushTable();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="font-headline-lg text-2xl sm:text-3xl text-deep-forest mt-10 mb-4 font-semibold border-b border-outline-variant/40 pb-2 scroll-margin-top-20"
          id={line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.slice(3)) }}
        />
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      flushTable();
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          className="my-6 pl-5 border-l-4 border-sage-accent bg-surface-container-low/40 py-3 pr-4 rounded-r-xl italic font-body-lg text-on-surface/90"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line.slice(2)) }}
        />
      );
      i++;
      continue;
    }

    // Checklist items
    if (line.match(/^- \[[ x]\] /)) {
      flushTable();
      const checked = line.startsWith('- [x] ');
      const text = line.replace(/^- \[[ x]\] /, '');
      listItems.push(
        `<span class="flex items-center gap-2 ${checked ? 'text-sage-accent' : 'text-on-surface-variant'}">${
          checked
            ? '<svg class="w-4 h-4 shrink-0 text-sage-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
            : '<span class="w-4 h-4 rounded border border-outline-variant inline-block shrink-0"></span>'
        } ${text}</span>`
      );
      i++;
      continue;
    }

    // List items
    if (line.match(/^[-*] /)) {
      flushTable();
      listItems.push(line.slice(2));
      i++;
      continue;
    }
    if (line.match(/^\d+\. /)) {
      flushTable();
      listItems.push(line.replace(/^\d+\.\s/, ''));
      i++;
      continue;
    }

    // Paragraph
    flushList();
    flushTable();
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="font-body-md text-on-surface-variant mb-4 leading-relaxed text-base"
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }}
      />
    );
    i++;
  }

  flushList();
  flushTable();
  return elements;
}

/* ─── Page Component ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Find related posts (exclude current)
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const authorInitials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md relative">
      {/* ─── TopNavBar (Unified Brand Header with Home Page) ─── */}
      <nav className="relative z-30 w-full bg-[#1a2b21] border-b border-white/5 py-4">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo with eye-slit monogram */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkPeek logo">
              <rect width="64" height="64" rx="14" fill="#2f4a3a"/>
              <path d="M14 12 H22 V44 H34 V52 H14 Z" fill="#f4f0e6"/>
              <path d="M30 12 H38 V52 H30 V12 Z" fill="#f4f0e6"/>
              <path d="M38 12 H44 Q54 12 54 24 Q54 36 44 36 H38 V28 H43 Q46 28 46 24 Q46 20 43 20 H38 V12 Z" fill="#f4f0e6"/>
              <ellipse cx="44" cy="24" rx="4.5" ry="2.8" fill="#2f4a3a"/>
              <circle cx="45" cy="24" r="1.2" fill="#f4f0e6"/>
            </svg>
            <span className="text-xl font-bold tracking-tight text-white">LinkPeek</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/10 transition-all label-sm no-underline"
            >
              Tool
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-white bg-white/10 label-sm no-underline font-semibold"
            >
              Blog
            </Link>
            <a
              href="https://github.com/Kedar200/Link-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/10 transition-all label-sm group no-underline"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80 group-hover:text-white transition-colors">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Article Hero (Cohesive brand header section) ─── */}
      <section className="bg-[#1a2b21] pb-24 pt-16 relative overflow-hidden text-surface-cream">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,111,91,0.2) 0%, transparent 70%)'
        }} />
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/blog"
              className="font-label-md text-xs text-on-tertiary-container hover:text-white transition-colors no-underline flex items-center gap-1.5 font-semibold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Journal
            </Link>
            <span className="text-on-tertiary-container/30">/</span>
            <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary font-label-md text-xs font-semibold">{post.category}</span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-white leading-tight font-bold mb-5">
            {post.title}
          </h1>
          <p className="text-on-tertiary-container opacity-85 font-body-lg text-base sm:text-lg leading-relaxed max-w-[700px] mb-8">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs border border-white/5">
                {authorInitials}
              </div>
              <div>
                <span className="block text-white font-semibold">{post.author.name}</span>
                <span className="block text-on-tertiary-container/60 text-xs font-mono">{post.author.role}</span>
              </div>
            </div>
            <div className="h-6 w-px bg-white/15 hidden sm:block" />
            <div className="flex items-center gap-4 text-on-tertiary-container/80">
              <span className="font-body-sm text-xs">
                {new Date(post.updatedAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </span>
              <span className="opacity-30">·</span>
              <span className="font-body-sm text-xs flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-80">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Article Content (Overlapping the banner nicely with grid-paper background) ─── */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 sm:px-12 py-12 relative z-20 -mt-12 grid-paper-bg rounded-t-3xl border-t border-outline-variant/30">
        <article className="max-w-[800px] mx-auto w-full pt-4 pb-20">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-md p-6 sm:p-10 md:p-12">
            <div className="blog-content">
              {renderContent(post.content)}
            </div>
          </div>

          {/* ─── Keywords / Tags ─── */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/60 text-on-surface-variant font-label-md text-xs font-semibold"
              >
                #{kw}
              </span>
            ))}
          </div>

          {/* ─── Related Posts ─── */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-outline-variant pt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="font-headline-md text-xl text-deep-forest font-bold">Continue Reading</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="block no-underline group"
                  >
                    <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:shadow-md hover:border-sage-accent hover:-translate-y-0.5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{rp.heroEmoji}</span>
                          <span className="px-2.5 py-0.5 rounded bg-surface-container text-sage-accent font-label-md text-[10px] font-semibold">{rp.category}</span>
                        </div>
                        <h4 className="font-headline-lg text-lg text-deep-forest font-semibold leading-snug group-hover:text-sage-accent transition-colors">{rp.title}</h4>
                      </div>
                      <span className="block mt-4 font-body-sm text-xs text-on-surface-variant font-medium flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-75">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        {rp.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-surface-cream w-full py-12 border-t border-outline-variant mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-headline-md text-xl font-bold text-primary">LinkPeek</span>
            <span className="font-body-sm text-xs text-on-surface-variant">© 2026 LinkPeek API. All rights reserved.</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary hover:underline transition-all duration-200 no-underline font-semibold">Privacy Policy</Link>
            <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary hover:underline transition-all duration-200 no-underline font-semibold">Terms of Service</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary hover:underline transition-all duration-200 no-underline font-semibold">Security</Link>
            <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary hover:underline transition-all duration-200 no-underline font-semibold">Status</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary hover:underline transition-all duration-200 no-underline font-semibold">Contact Support</Link>
          </div>
        </div>
      </footer>

      {/* ─── Article Structured Data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: 'https://getlinkpeek.com/og-image.png',
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'LinkPeek',
              url: 'https://getlinkpeek.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://getlinkpeek.com/icon.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://getlinkpeek.com/blog/${post.slug}`,
            },
            keywords: post.keywords.join(', '),
          }),
        }}
      />

      {/* ─── FAQ Structured Data (for AEO) ─── */}
      {post.content.includes('**Q:') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: extractFAQs(post.content),
            }),
          }}
        />
      )}
    </div>
  );
}

/* ─── Extract FAQ schema from content ─── */
function extractFAQs(content: string) {
  const faqRegex = /\*\*Q:\s*(.+?)\*\*\s*\n\s*A:\s*(.+?)(?=\n\n|\n\*\*Q:|$)/g;
  const faqs: Array<{ '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }> = [];
  let match;
  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({
      '@type': 'Question',
      name: match[1].trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: match[2].trim(),
      },
    });
  }
  return faqs;
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getAllSlugs } from '@/lib/blog-data';
import { getSiteUrl } from '@/lib/site';

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

/* ─── Simple Markdown-ish renderer ─── */
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
        <ul key={`list-${elements.length}`} className="blog-list">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
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
        <div key={`table-${elements.length}`} className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                {header.map((cell, ci) => (
                  <th key={ci} dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell.trim()) }} />
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell.trim()) }} />
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
      .replace(/`(.+?)`/g, '<code class="blog-inline-code">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/❌/g, '<span class="blog-emoji-cross">❌</span>')
      .replace(/✅/g, '<span class="blog-emoji-check">✅</span>');
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${elements.length}`} className="blog-code-block">
            <div className="blog-code-header">
              <span>{codeLang || 'code'}</span>
            </div>
            <pre><code>{codeLines.join('\n')}</code></pre>
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
      elements.push(<hr key={`hr-${elements.length}`} className="blog-hr" />);
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
          className="blog-h3"
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
          className="blog-h2"
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
          className="blog-blockquote"
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
        `<span class="blog-checklist-item ${checked ? 'checked' : ''}">${checked ? '✓' : '○'} ${text}</span>`
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
        className="blog-p"
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      {/* ─── Header ─── */}
      <header className="relative z-10 w-full bg-[#1a2b21]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
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
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/10 transition-all label-sm no-underline"
            >
              Tool
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-white bg-white/10 label-sm no-underline"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── Article Hero ─── */}
      <section className="bg-[#1a2b21] pb-24 pt-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,111,91,0.2) 0%, transparent 70%)'
        }} />
        <div className="max-w-[780px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/blog"
              className="label-sm text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.8)] transition-colors no-underline flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Blog
            </Link>
            <span className="text-[rgba(255,255,255,0.2)]">/</span>
            <span className="px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.12)] text-[rgba(34,197,94,0.85)] label-sm">{post.category}</span>
          </div>
          <h1 className="font-inter font-[600] text-white leading-[1.12] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            {post.title}
          </h1>
          <p className="mt-4 text-[rgba(255,255,255,0.5)] font-inter text-base leading-relaxed max-w-[600px]">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2f4a3a] flex items-center justify-center text-[rgba(244,240,230,0.8)] font-inter font-bold text-xs">
                LP
              </div>
              <div>
                <span className="block text-[rgba(255,255,255,0.75)] font-inter text-sm font-medium">{post.author.name}</span>
                <span className="block text-[rgba(255,255,255,0.3)] font-mono text-xs">{post.author.role}</span>
              </div>
            </div>
            <div className="h-5 w-px bg-[rgba(255,255,255,0.1)]" />
            <span className="label-sm text-[rgba(255,255,255,0.35)]">
              {new Date(post.updatedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </span>
            <span className="label-sm text-[rgba(255,255,255,0.25)]">·</span>
            <span className="label-sm text-[rgba(255,255,255,0.35)]">{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <article className="max-w-[780px] mx-auto px-6 sm:px-12 w-full -mt-12 relative z-20 pb-20">
        <div className="bg-white rounded-[1.5rem] border border-[rgba(26,43,33,0.06)] shadow-[0_4px_30px_rgba(26,43,33,0.06)] p-8 sm:p-12 md:p-14">
          <div className="blog-content">
            {renderContent(post.content)}
          </div>
        </div>

        {/* ─── Keywords / Tags ─── */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.keywords.slice(0, 6).map((kw) => (
            <span
              key={kw}
              className="px-3 py-1.5 rounded-full bg-[rgba(221,230,225,0.5)] border border-[rgba(79,111,91,0.1)] text-[rgba(26,43,33,0.5)] label-sm"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* ─── Related Posts ─── */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#1a2b21] shadow-[0_0_12px_rgba(26,43,33,0.2)]" />
              <span className="label-sm text-[rgba(79,111,91,0.6)]">Continue Reading</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="block no-underline group"
                >
                  <div className="rounded-[1.25rem] border border-[rgba(79,111,91,0.12)] bg-white p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(26,43,33,0.08)] hover:-translate-y-0.5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{rp.heroEmoji}</span>
                      <span className="label-sm text-[rgba(79,111,91,0.5)]">{rp.category}</span>
                    </div>
                    <h4 className="font-inter font-[600] text-[#1a2b21] text-[15px] leading-[1.35]">{rp.title}</h4>
                    <span className="block mt-2 label-sm text-[rgba(79,111,91,0.35)]">{rp.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* ─── Footer ─── */}
      <footer
        className="relative z-10 border-t py-8 px-4"
        style={{ borderColor: 'rgba(0,0,0,0.05)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-sm text-[#4f6f5b]">
            LinkPeek — free forever, open source
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21] no-underline">
              Home
            </Link>
            <Link href="/blog" className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21] no-underline">
              Blog
            </Link>
            <a
              href="https://github.com/Kedar200/Link-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21]"
            >
              GitHub
            </a>
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

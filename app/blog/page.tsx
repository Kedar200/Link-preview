import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

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

      {/* ─── Hero Section ─── */}
      <section className="bg-[#1a2b21] pb-20 pt-10 relative overflow-hidden">
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,111,91,0.25) 0%, transparent 70%)'
        }} />
        <div className="max-w-[1100px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="label-sm text-[rgba(255,255,255,0.5)]">LinkPeek Blog</span>
          </div>
          <h1 className="font-inter font-[500] text-white leading-[1.08] tracking-[-0.02em]" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Open Graph Guides,<br/>
            <span className="text-[rgba(255,255,255,0.45)]">Link Preview Tips</span>
          </h1>
          <p className="mt-5 text-[rgba(255,255,255,0.55)] font-inter text-lg max-w-[560px] leading-relaxed">
            Expert articles on fixing broken previews, optimizing OG images for every platform, and making your links look perfect everywhere they&rsquo;re shared.
          </p>
        </div>
      </section>

      {/* ─── Featured Post ─── */}
      <section className="max-w-[1100px] mx-auto px-6 sm:px-12 w-full -mt-10 relative z-20">
        <Link
          href={`/blog/${featured.slug}`}
          className="block no-underline group"
        >
          <article className="blog-featured-card rounded-[1.5rem] border border-[rgba(26,43,33,0.08)] bg-white overflow-hidden shadow-[0_8px_40px_rgba(26,43,33,0.08)] transition-all duration-500 hover:shadow-[0_16px_60px_rgba(26,43,33,0.14)] hover:-translate-y-1">
            <div className="flex flex-col md:flex-row">
              {/* Image placeholder with gradient */}
              <div className="md:w-[45%] min-h-[260px] relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #1a2b21, #2f4a3a 40%, #4f6f5b)'
              }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[80px] opacity-80 transition-transform duration-500 group-hover:scale-110">{featured.heroEmoji}</span>
                </div>
                {/* Badge */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-[rgba(244,240,230,0.15)] backdrop-blur-md border border-[rgba(244,240,230,0.1)]">
                  <span className="label-sm text-[rgba(244,240,230,0.85)]">Featured</span>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[rgba(34,197,94,0.08)] text-[#16a34a] label-sm">{featured.category}</span>
                  <span className="label-sm text-[rgba(79,111,91,0.5)]">{featured.readTime}</span>
                </div>
                <h2 className="font-inter font-[600] text-[#1a2b21] leading-[1.2] tracking-[-0.01em]" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>
                  {featured.title}
                </h2>
                <p className="mt-3 text-[rgba(26,43,33,0.6)] font-inter text-[15px] leading-[1.65] line-clamp-3">
                  {featured.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#1a2b21] font-inter font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Read article</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* ─── Post Grid ─── */}
      <section className="max-w-[1100px] mx-auto px-6 sm:px-12 w-full py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#1a2b21] shadow-[0_0_12px_rgba(26,43,33,0.2)]" />
          <span className="label-sm text-[rgba(79,111,91,0.6)]">All Articles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block no-underline group"
            >
              <article
                className="blog-grid-card h-full rounded-[1.25rem] border border-[rgba(79,111,91,0.12)] bg-white overflow-hidden transition-all duration-400 hover:shadow-[0_12px_40px_rgba(26,43,33,0.1)] hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Card Header */}
                <div className="h-[160px] relative overflow-hidden" style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #2f4a3a, #1a2b21 60%)'
                    : 'linear-gradient(135deg, #1a2b21, #4f6f5b)'
                }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[56px] opacity-70 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-90">{post.heroEmoji}</span>
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-30">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f4f0e6]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f4f0e6]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f4f0e6]" />
                  </div>
                </div>
                {/* Card Body */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[rgba(221,230,225,0.5)] text-[rgba(26,43,33,0.65)] label-sm">{post.category}</span>
                    <span className="label-sm text-[rgba(79,111,91,0.4)]">{post.readTime}</span>
                  </div>
                  <h3 className="font-inter font-[600] text-[#1a2b21] text-[17px] leading-[1.35] tracking-[-0.01em] mb-2.5">
                    {post.title}
                  </h3>
                  <p className="text-[rgba(26,43,33,0.55)] font-inter text-[14px] leading-[1.6] line-clamp-2 flex-1">
                    {post.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="label-sm text-[rgba(79,111,91,0.4)]">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[rgba(26,43,33,0.1)] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:bg-[#1a2b21] group-hover:border-[#1a2b21] group-hover:text-[#f4f0e6] transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="max-w-[1100px] mx-auto px-6 sm:px-12 w-full pb-20">
        <div className="rounded-[1.5rem] bg-[#1a2b21] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 30% 80%, rgba(79,111,91,0.3), transparent 50%), radial-gradient(circle at 70% 20%, rgba(47,74,58,0.4), transparent 50%)'
          }} />
          <div className="relative z-10">
            <h2 className="font-inter font-[500] text-white text-2xl md:text-3xl leading-[1.2] tracking-[-0.01em]">
              Test Your Link Previews Now
            </h2>
            <p className="mt-3 text-[rgba(255,255,255,0.5)] font-inter text-base max-w-[440px] mx-auto leading-relaxed">
              Preview how your links appear on WhatsApp, Twitter, LinkedIn, Slack, Discord &amp; Instagram — all at once.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full bg-[#f4f0e6] text-[#1a2b21] font-inter font-semibold text-sm no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              Open LinkPeek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

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

      {/* ─── Blog List Structured Data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'LinkPeek Blog',
            description: 'Expert guides on Open Graph meta tags, link preview optimization, and social media sharing.',
            url: 'https://getlinkpeek.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'LinkPeek',
              url: 'https://getlinkpeek.com',
            },
            blogPost: blogPosts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              url: `https://getlinkpeek.com/blog/${post.slug}`,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              author: {
                '@type': 'Person',
                name: post.author.name,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

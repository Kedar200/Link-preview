'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get dynamic categories list with post counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // Filter posts dynamically
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCode = (e: React.MouseEvent, code: string, id: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

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

      {/* ─── Hero Section (Cohesive brand header section) ─── */}
      <section className="bg-[#1a2b21] pb-24 pt-12 relative overflow-hidden text-surface-cream">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,111,91,0.25) 0%, transparent 70%)'
        }} />
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="label-sm text-[rgba(255,255,255,0.5)] tracking-wide font-semibold">LinkPeek Technical Journal</span>
          </div>
          <h1 className="font-headline-xl text-4xl sm:text-5xl text-white leading-tight font-bold mb-4">
            Technical Journal
          </h1>
          <p className="mt-4 text-[rgba(255,255,255,0.55)] font-body-lg text-base sm:text-lg max-w-[640px] leading-relaxed">
            Deep dives into Open Graph architecture, social rendering performance, and engineering practices behind high-fidelity link preview generation.
          </p>
        </div>
      </section>

      {/* ─── Main Content Area (Overlapping the banner nicely) ─── */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 sm:px-12 py-12 relative z-20 -mt-12 grid-paper-bg rounded-t-3xl border-t border-outline-variant/30">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          
          {/* ─── Journal Feed List ─── */}
          <div className="md:col-span-8 flex flex-col gap-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => {
                const authorInitials = post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2);

                return (
                  <article
                    key={post.slug}
                    className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 hover:border-sage-accent transition-all duration-300 blog-grid-card hover:shadow-md"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Metadata Column */}
                    <aside className="md:w-1/4 shrink-0 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-outline-variant pb-4 md:pb-0 md:pr-6 text-sm">
                      <div>
                        <p className="font-label-md text-xs text-outline mb-1 uppercase tracking-wider font-semibold">Published</p>
                        <time className="font-body-sm text-on-surface">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <div>
                        <p className="font-label-md text-xs text-outline mb-1 uppercase tracking-wider font-semibold">Author</p>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-sage-accent">
                            {authorInitials}
                          </div>
                          <span className="font-body-sm text-on-surface">{post.author.name}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-label-md text-xs text-outline mb-1 uppercase tracking-wider font-semibold">Read Time</p>
                        <span className="font-body-sm text-on-surface flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-outline">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {post.readTime}
                        </span>
                      </div>
                      <div className="mt-auto pt-2">
                        <button
                          onClick={() => setSelectedCategory(post.category === selectedCategory ? null : post.category)}
                          className={`inline-block px-2.5 py-1 rounded text-xs font-semibold tracking-wide transition-all ${
                            selectedCategory === post.category
                              ? 'bg-sage-accent text-on-primary'
                              : 'bg-surface-container-low text-sage-accent hover:bg-surface-container-high'
                          }`}
                        >
                          {post.category}
                        </button>
                      </div>
                    </aside>

                    {/* Content Column */}
                    <div className="md:w-3/4 flex flex-col justify-between">
                      <div>
                        <h2 className="font-headline-lg text-2xl sm:text-3xl text-deep-forest mb-3 font-semibold leading-snug">
                          <Link href={`/blog/${post.slug}`} className="hover:text-sage-accent transition-colors no-underline">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed text-sm">
                          {post.description}
                        </p>

                        {/* Dynamically Injected Interactive Widgets for specific articles */}
                        {post.slug === 'og-image-size-guide-2026' && (
                          <div className="mb-5 rounded-lg overflow-hidden border border-outline-variant shadow-sm bg-surface-bright/50">
                            <table className="w-full text-left border-collapse">
                              <thead className="bg-surface-container-low font-semibold text-xs text-on-surface">
                                <tr>
                                  <th className="p-3 border-b border-outline-variant font-semibold">Platform</th>
                                  <th className="p-3 border-b border-outline-variant font-semibold">Max File Size</th>
                                  <th className="p-3 border-b border-outline-variant font-semibold">Golden Size</th>
                                </tr>
                              </thead>
                              <tbody className="font-code-md text-xs text-on-surface-variant">
                                <tr className="hover:bg-surface-container-low/30 transition-colors">
                                  <td className="p-3 border-b border-outline-variant border-r border-outline-variant/60 font-medium text-deep-forest">WhatsApp</td>
                                  <td className="p-3 border-b border-outline-variant border-r border-outline-variant/60">600 KB</td>
                                  <td className="p-3 border-b border-outline-variant text-sage-accent font-semibold">1200 × 630 px</td>
                                </tr>
                                <tr className="hover:bg-surface-container-low/30 transition-colors">
                                  <td className="p-3 border-r border-outline-variant/60 font-medium text-deep-forest">Facebook</td>
                                  <td className="p-3 border-r border-outline-variant/60">8 MB</td>
                                  <td className="p-3 text-sage-accent font-semibold">1200 × 630 px</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}

                        {post.slug === 'whatsapp-link-preview-not-working' && (
                          <div className="mb-5 rounded-lg overflow-hidden border border-outline-variant shadow-sm">
                            <div className="bg-surface-container-high px-4 py-2 font-mono text-xs text-on-surface-variant flex justify-between items-center border-b border-outline-variant">
                              <span>whatsapp_tags.html</span>
                              <button
                                onClick={(e) =>
                                  handleCopyCode(
                                    e,
                                    `<meta property="og:image" content="https://yoursite.com/og-image.jpg" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />`,
                                    'whatsapp-code'
                                  )
                                }
                                className="text-sage-accent hover:text-primary transition-colors flex items-center gap-1 font-semibold cursor-pointer text-xs"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                                {copiedId === 'whatsapp-code' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <pre className="font-mono text-xs bg-deep-forest text-surface-variant p-4 m-0 overflow-x-auto leading-relaxed">
                              <code>{`<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`}</code>
                            </pre>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 font-label-md text-sm text-sage-accent hover:text-primary font-bold no-underline transition-all hover:gap-2 mt-4"
                      >
                        Read Full Analysis
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-12 text-center shadow-sm">
                <span className="text-4xl">🔍</span>
                <h3 className="font-headline-md text-xl text-deep-forest mt-4 mb-2 font-bold">No Articles Found</h3>
                <p className="font-body-md text-on-surface-variant text-sm max-w-md mx-auto">
                  We couldn&rsquo;t find any posts matching &ldquo;{searchQuery}&rdquo;{selectedCategory && ` in Category "${selectedCategory}"`}. Try refining your search parameters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-6 bg-sage-accent text-on-primary font-semibold text-sm px-5 py-2 rounded-lg hover:bg-primary transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* ─── Sidebar Area ─── */}
          <aside className="md:col-span-4 flex flex-col gap-8">
            
            {/* Search Box */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
              <h3 className="font-headline-md text-xl text-deep-forest mb-4 font-bold">Search Journal</h3>
              <div className="relative">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search keywords..."
                  className="w-full pl-10 pr-9 py-2.5 border border-outline-variant rounded-xl focus:ring-2 focus:ring-sage-accent focus:border-sage-accent font-body-sm text-sm bg-background-white text-on-surface outline-none transition-all placeholder:text-outline/70"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors text-outline p-0.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Topic Tags */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-headline-md text-xl text-deep-forest font-bold">Topics</h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-sage-accent hover:text-primary transition-colors font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {categoriesWithCounts.map(({ name, count }) => {
                  const isActive = selectedCategory === name;
                  return (
                    <button
                      key={name}
                      onClick={() => setSelectedCategory(isActive ? null : name)}
                      className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-sage-accent text-on-primary shadow-sm hover:bg-primary'
                          : 'bg-surface-container text-secondary hover:bg-surface-container-high'
                      }`}
                    >
                      {name}
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isActive ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Promo */}
            <div className="bg-sage-accent text-on-primary p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-primary-fixed-dim opacity-10 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-headline-md text-xl mb-2 text-on-primary font-bold">Engineering Updates</h3>
                <p className="font-body-sm text-xs text-on-primary opacity-80 mb-4 leading-relaxed">
                  Get technical Open Graph deep-dives delivered straight to your inbox. No marketing fluff.
                </p>
                {subscribed ? (
                  <div className="bg-surface/20 border border-white/20 p-4 rounded-xl text-center backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mx-auto text-on-primary mb-2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <p className="font-label-md text-xs font-semibold">Successfully Subscribed!</p>
                    <p className="text-[10px] opacity-75 mt-0.5">Welcome to our engineering loop.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@company.com"
                      required
                      className="px-3.5 py-2.5 rounded-xl border-none font-body-sm text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-fixed bg-background-white"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-on-primary font-semibold text-xs py-2.5 rounded-xl hover:bg-on-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </aside>
          
        </div>
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

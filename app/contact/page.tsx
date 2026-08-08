import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact | LinkPeek',
  description:
    'Get in touch with the LinkPeek team — report bugs, ask questions, or provide feedback on our free Open Graph preview tool.',
  alternates: {
    canonical: 'https://www.getlinkpeek.com/contact',
  },
};

const CONTACT_EMAIL = 'kedardeshmukh2003@gmail.com';
const GITHUB_ISSUES = 'https://github.com/Kedar200/Link-preview/issues/new';
const GITHUB_REPO = 'https://github.com/Kedar200/Link-preview';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f0e6]">
      {/* Header */}
      <nav className="w-full bg-[#1a2b21] border-b border-white/5 py-4">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 flex items-center justify-between">
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
          <div className="flex items-center gap-4">
            <Link href="/" className="px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm no-underline">Tool</Link>
            <Link href="/blog" className="px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm no-underline">Blog</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1a2b21]/10 text-[#1a2b21] px-3 py-1 rounded-full text-xs font-semibold mb-4">
            Get in touch
          </div>
          <h1 className="text-4xl font-bold text-[#1a2b21] mb-3 leading-tight">Contact</h1>
          <p className="text-[#4f6f5b] text-base leading-relaxed max-w-xl">
            LinkPeek is a one-person open-source project. Whether you found a bug, have a feature idea,
            or just want to say hi — all messages are welcome.
          </p>
        </div>

        <div className="space-y-5">

          {/* Email */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#1a2b21]/10 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a2b21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1a2b21] mb-1">Email</h2>
              <p className="text-sm text-[#4f6f5b] mb-3">
                For privacy questions, partnership enquiries, or anything else.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2b21] hover:bg-[#2f4a3a] text-white rounded-full text-sm font-medium transition-colors no-underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </section>

          {/* GitHub Issues */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#1a2b21]/10 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a2b21">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1a2b21] mb-1">Bug Reports & Feature Requests</h2>
              <p className="text-sm text-[#4f6f5b] mb-3">
                Found something broken? Have an idea? Open an issue on GitHub — it&apos;s the fastest way to get a response.
              </p>
              <a
                href={GITHUB_ISSUES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2b21] hover:bg-[#2f4a3a] text-white rounded-full text-sm font-medium transition-colors no-underline"
              >
                Open an issue on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </section>

          {/* GitHub Repo */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10 flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-[#1a2b21]/10 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a2b21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1a2b21] mb-1">Source Code</h2>
              <p className="text-sm text-[#4f6f5b] mb-3">
                LinkPeek is fully open source. Contributions, PRs, and stars are always appreciated.
              </p>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#1a2b21]/20 hover:bg-[#1a2b21]/5 text-[#1a2b21] rounded-full text-sm font-medium transition-colors no-underline"
              >
                github.com/Kedar200/Link-preview
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </a>
            </div>
          </section>

          {/* About the project */}
          <section className="bg-[#1a2b21] rounded-2xl p-6 text-white">
            <h2 className="text-base font-semibold mb-2">About the Project</h2>
            <p className="text-sm leading-relaxed text-white/80">
              LinkPeek was built because most link preview tools are ugly, slow, or missing key platforms.
              It&apos;s maintained as a free, open-source tool for developers, marketers, and designers who care
              about how their links look on social media. No accounts, no paywalls, no data hoarding.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/privacy" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors no-underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium transition-colors no-underline">
                Terms of Service
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

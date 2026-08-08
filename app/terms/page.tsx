import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | LinkPeek',
  description:
    'Terms of Service for LinkPeek — the free, open-source Open Graph preview tool for WhatsApp, LinkedIn, X, Slack, Discord, and Instagram.',
  alternates: {
    canonical: 'https://www.getlinkpeek.com/terms',
  },
};

const LAST_UPDATED = 'August 8, 2026';
const CONTACT_EMAIL = 'kedardeshmukh2003@gmail.com';

export default function TermsPage() {
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
            Legal
          </div>
          <h1 className="text-4xl font-bold text-[#1a2b21] mb-3 leading-tight">Terms of Service</h1>
          <p className="text-[#4f6f5b] text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-6">

          {/* Intro */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Introduction</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              Welcome to LinkPeek (<strong>getlinkpeek.com</strong>). By accessing or using our service, you agree to
              be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
            <p className="text-sm leading-relaxed text-[#444] mt-3">
              LinkPeek is a free, open-source tool that fetches and displays Open Graph metadata from URLs you provide,
              allowing you to preview how your links will appear on social media platforms.
            </p>
          </section>

          {/* Use of the service */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-4">Use of the Service</h2>
            <div className="space-y-4 text-sm text-[#444]">
              <div>
                <h3 className="font-semibold text-[#1a2b21] mb-1">Permitted Use</h3>
                <p className="leading-relaxed">
                  You may use LinkPeek to preview Open Graph tags, Twitter Cards, and social media link appearances
                  for any publicly accessible URL, or for localhost URLs during development. The service is intended
                  for quality assurance, development, and marketing purposes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a2b21] mb-1">Prohibited Use</h3>
                <p className="leading-relaxed mb-2">You agree not to use LinkPeek to:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Scrape, crawl, or systematically extract data from the service at scale</li>
                  <li>Attempt to bypass, disable, or circumvent security features</li>
                  <li>Submit URLs that contain or link to malware, phishing, or illegal content</li>
                  <li>Use the service in any way that violates applicable laws or regulations</li>
                  <li>Impersonate any person or entity, or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the service or servers connected to it</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual property */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Intellectual Property & Open Source</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              The LinkPeek source code is open source and available under the terms of its licence at{' '}
              <a href="https://github.com/Kedar200/Link-preview" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                github.com/Kedar200/Link-preview
              </a>.
              The LinkPeek name, logo, and brand assets are the property of the project maintainer and may not be
              used without permission.
            </p>
            <p className="text-sm leading-relaxed text-[#444] mt-3">
              When you check a URL, the Open Graph metadata returned belongs to the respective website owner.
              LinkPeek merely displays it for preview purposes and makes no claim of ownership over that content.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Disclaimers</h2>
            <div className="space-y-3 text-sm leading-relaxed text-[#444]">
              <p>
                <strong>As-is service:</strong> LinkPeek is provided &quot;as is&quot; and &quot;as available&quot; without
                warranties of any kind, express or implied. We do not guarantee that the service will be uninterrupted,
                error-free, or that previews will exactly match what third-party platforms display (platforms may
                change their rendering at any time).
              </p>
              <p>
                <strong>Third-party content:</strong> The metadata and images fetched and displayed by LinkPeek come
                from third-party websites. We are not responsible for the accuracy, legality, or appropriateness of
                that content.
              </p>
              <p>
                <strong>No liability:</strong> To the fullest extent permitted by law, LinkPeek and its maintainer
                shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use the service.
              </p>
            </div>
          </section>

          {/* Advertising */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Advertising</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              LinkPeek displays advertisements through Google AdSense to fund the free operation of the service.
              By using the service, you acknowledge that advertisements may be shown. You agree not to use ad
              blockers in a way that violates AdSense policies, and you understand that ad targeting is governed
              by Google&apos;s own policies, not ours. See our{' '}
              <Link href="/privacy" className="text-[#1a7a45] underline">Privacy Policy</Link> for more detail.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Changes to These Terms</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              We reserve the right to modify these Terms of Service at any time. The &quot;Last updated&quot; date
              at the top of this page reflects when the most recent changes were made. Continued use of LinkPeek
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Governing Law</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              These Terms shall be governed by and construed in accordance with the laws of India.
              Any disputes arising from these Terms or your use of LinkPeek shall be subject to the
              exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#1a2b21] rounded-2xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-2">Questions about these Terms?</h2>
            <p className="text-sm leading-relaxed text-white/80">
              Reach out and we&apos;ll respond as soon as possible.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors no-underline"
              >
                {CONTACT_EMAIL}
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors no-underline"
              >
                Privacy Policy
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | LinkPeek',
  description:
    'Privacy Policy for LinkPeek — learn how we handle data, cookies, and analytics on our free Open Graph preview tool.',
  alternates: {
    canonical: 'https://www.getlinkpeek.com/privacy',
  },
};

const LAST_UPDATED = 'August 8, 2026';
const CONTACT_EMAIL = 'kedardeshmukh2003@gmail.com';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-[#1a2b21] mb-3 leading-tight">Privacy Policy</h1>
          <p className="text-[#4f6f5b] text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-6">

          {/* Intro */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Overview</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              LinkPeek (<strong>getlinkpeek.com</strong>) is a free, open-source tool that lets you preview how your links
              appear on social media platforms like WhatsApp, LinkedIn, X (Twitter), Slack, Discord, and Instagram.
              This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
            </p>
            <p className="text-sm leading-relaxed text-[#444] mt-3">
              By using LinkPeek, you agree to the practices described in this policy.
            </p>
          </section>

          {/* What we collect */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-4">Information We Collect</h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-[#1a2b21] mb-1">URLs You Enter</h3>
                <p className="text-sm leading-relaxed text-[#444]">
                  When you enter a URL into the LinkPeek tool, that URL is sent to our server-side API to fetch Open Graph
                  metadata (title, description, image). <strong>We do not store or log the URLs you check.</strong> The
                  URL is processed in real-time and immediately discarded. Localhost URLs are processed entirely in your
                  browser and never leave your device.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1a2b21] mb-1">Usage Analytics (Google Analytics)</h3>
                <p className="text-sm leading-relaxed text-[#444]">
                  We use <strong>Google Analytics 4</strong> to understand how visitors use the site — pages visited,
                  time on site, general geographic region (country/city level), and device type. This data is anonymised
                  and aggregated. We do not collect personally identifiable information through Analytics.
                  Google&apos;s privacy policy applies:{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                    policies.google.com/privacy
                  </a>.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1a2b21] mb-1">Advertising (Google AdSense)</h3>
                <p className="text-sm leading-relaxed text-[#444]">
                  We use <strong>Google AdSense</strong> to display advertisements on this site. AdSense may use cookies
                  and similar tracking technologies to serve personalised or contextual ads based on your interests and
                  browsing history. Google&apos;s advertising policies apply:{' '}
                  <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                    policies.google.com/technologies/ads
                  </a>.
                </p>
                <p className="text-sm leading-relaxed text-[#444] mt-2">
                  You can opt out of personalised advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                    google.com/settings/ads
                  </a>{' '}
                  or via the{' '}
                  <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                    Digital Advertising Alliance opt-out tool
                  </a>.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1a2b21] mb-1">Cookies</h3>
                <p className="text-sm leading-relaxed text-[#444]">We use the following types of cookies:</p>
                <ul className="mt-2 space-y-1 text-sm text-[#444] list-disc list-inside">
                  <li><strong>Functional cookies</strong> — e.g., remembering that you have completed the onboarding animation (stored in localStorage).</li>
                  <li><strong>Analytics cookies</strong> — set by Google Analytics to measure traffic and usage.</li>
                  <li><strong>Advertising cookies</strong> — set by Google AdSense to serve relevant ads.</li>
                </ul>
                <p className="text-sm leading-relaxed text-[#444] mt-2">
                  You can control or delete cookies via your browser settings. Note that disabling cookies may affect site functionality.
                </p>
              </div>
            </div>
          </section>

          {/* How we use it */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">How We Use Your Information</h2>
            <ul className="space-y-2 text-sm text-[#444]">
              <li className="flex items-start gap-2">
                <span className="text-[#1a7a45] mt-0.5 font-bold">✓</span>
                <span>To provide the Open Graph preview service — fetching and displaying metadata for URLs you enter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1a7a45] mt-0.5 font-bold">✓</span>
                <span>To understand how the tool is used and improve it (via aggregated analytics).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1a7a45] mt-0.5 font-bold">✓</span>
                <span>To fund the free operation of the service through advertising revenue.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>We do <strong>not</strong> sell your data to third parties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>We do <strong>not</strong> require account creation or store personal profiles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5 font-bold">✗</span>
                <span>We do <strong>not</strong> store or log the URLs you check.</span>
              </li>
            </ul>
          </section>

          {/* Third party */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Third-Party Services</h2>
            <div className="space-y-3 text-sm text-[#444]">
              <div className="flex gap-3 items-start">
                <div className="w-32 shrink-0 font-semibold text-[#1a2b21]">Google Analytics</div>
                <div>Traffic analysis and usage insights. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">Privacy Policy</a></div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-32 shrink-0 font-semibold text-[#1a2b21]">Google AdSense</div>
                <div>Ad delivery and monetisation. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">Privacy Policy</a></div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-32 shrink-0 font-semibold text-[#1a2b21]">Vercel</div>
                <div>Hosting and serverless functions. Processes URLs transiently. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">Privacy Policy</a></div>
              </div>
            </div>
          </section>

          {/* Open source */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Open Source Transparency</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              LinkPeek is fully open source. You can inspect exactly how URLs are processed, what data is collected,
              and how the tool works at our{' '}
              <a href="https://github.com/Kedar200/Link-preview" target="_blank" rel="noopener noreferrer" className="text-[#1a7a45] underline">
                GitHub repository
              </a>. Transparency is a core principle of this project.
            </p>
          </section>

          {/* Your rights */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Your Rights</h2>
            <p className="text-sm leading-relaxed text-[#444] mb-3">
              Depending on your location (EU/GDPR, California/CCPA, etc.), you may have rights including:
            </p>
            <ul className="space-y-1 text-sm text-[#444] list-disc list-inside">
              <li>The right to know what data is collected about you</li>
              <li>The right to request deletion of your data</li>
              <li>The right to opt out of personalised advertising</li>
              <li>The right to not be discriminated against for exercising these rights</li>
            </ul>
            <p className="text-sm leading-relaxed text-[#444] mt-3">
              Since we do not store personal data ourselves, most requests relate to third-party services (Google
              Analytics, AdSense). Contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1a7a45] underline">{CONTACT_EMAIL}</a>{' '}
              for any privacy-related queries.
            </p>
          </section>

          {/* Changes */}
          <section className="bg-white rounded-2xl p-6 border border-[#1a2b21]/10">
            <h2 className="text-lg font-semibold text-[#1a2b21] mb-3">Changes to This Policy</h2>
            <p className="text-sm leading-relaxed text-[#444]">
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this
              page reflects when the most recent changes were made. Continued use of LinkPeek after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#1a2b21] rounded-2xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-2">Questions?</h2>
            <p className="text-sm leading-relaxed text-white/80">
              If you have any questions about this Privacy Policy or how your data is handled, please reach out:
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

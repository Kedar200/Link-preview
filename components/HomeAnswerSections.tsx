import Link from 'next/link';
import { seoToolPages } from '@/lib/seo-pages';

const workflowPoints = [
  'Platform-specific WhatsApp, LinkedIn, X, Slack, and Discord mockups.',
  'Localhost Open Graph testing without a public deploy or ngrok tunnel.',
  'Open Graph tags, Twitter Cards, cache issues, and broken OG images in one pass.',
  'Share-ready preview checks before your audience sees the link.',
];

const priorityTools = [
  'open-graph-preview-tool',
  'whatsapp-link-preview-checker',
  'linkedin-preview-checker',
  'twitter-card-preview',
  'localhost-og-preview',
  'slack-link-preview-checker',
];

const homepageBlogs = [
  {
    href: '/blog/preview-og-tags-localhost-no-ngrok',
    label: 'Localhost OG tags',
  },
  {
    href: '/blog/whatsapp-link-preview-not-working',
    label: 'WhatsApp cache fixes',
  },
  {
    href: '/blog/twitter-card-not-displaying',
    label: 'Twitter card fixes',
  },
  {
    href: '/blog/linkedin-preview-image-wrong',
    label: 'LinkedIn image fixes',
  },
];

const proofPoints = [
  { value: '6', label: 'social surfaces' },
  { value: '0', label: 'tunnels needed' },
  { value: 'OG', label: 'tag audit' },
];

export default function HomeAnswerSections() {
  const tools = priorityTools
    .map((slug) => seoToolPages.find((page) => page.slug === slug))
    .filter((page): page is (typeof seoToolPages)[number] => Boolean(page));

  return (
    <section className="answer-section">
      <div className="answer-shell">
        <div className="section-heading card-animate">
          <div className="section-heading-dot answer-heading-dot" />
          <h2 className="h2 text-[#1a2b21]">
            Answers. <br />
            <span className="text-[#4f6f5b]/50">Built into the page.</span>
          </h2>
        </div>

        <div className="answer-hero">
          <div className="answer-copy">
            <p className="answer-kicker">Answer engine summary</p>
            <h2>What is LinkPeek?</h2>
            <p>
              LinkPeek is a free Open Graph preview tool that lets developers test how links appear
              on WhatsApp, LinkedIn, X, Slack, Discord, and Instagram. It supports localhost URLs,
              so teams can debug social previews before deploying or setting up ngrok.
            </p>

            <div className="answer-proof-row" aria-label="LinkPeek product facts">
              {proofPoints.map((point) => (
                <div key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="answer-result-panel" aria-label="Search answer preview">
            <div className="answer-panel-top">
              <span>indexed answer</span>
              <i />
            </div>
            <div className="answer-question">What is LinkPeek?</div>
            <div className="answer-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="answer-platform-cloud" aria-hidden="true">
              <span>WhatsApp</span>
              <span>LinkedIn</span>
              <span>X</span>
              <span>Slack</span>
              <span>Discord</span>
              <span>Localhost</span>
            </div>
            <div className="answer-mini-card answer-mini-card-one">
              <span>og:image</span>
              <strong>ready</strong>
            </div>
            <div className="answer-mini-card answer-mini-card-two">
              <span>localhost</span>
              <strong>no tunnel</strong>
            </div>
          </div>
        </div>

        <div className="answer-lower-grid">
          <div className="answer-workflow">
            <p className="answer-kicker">LinkPeek vs ngrok</p>
            <h3>Built for preview debugging, not just exposing a port.</h3>
            <div className="answer-workflow-list">
              {workflowPoints.map((point, index) => (
                <div key={point}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="answer-link-panel">
            <p className="answer-kicker">Main tools</p>
            <h3>Jump straight into the checker you need.</h3>
            <div className="answer-tool-grid">
              {tools.map((page, index) => (
                <Link key={page.slug} href={`/tools/${page.slug}`} className="answer-tool-link">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{page.title}</strong>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="answer-guide-strip" aria-label="Developer guides">
          <p>Developer guides</p>
          <div>
            {homepageBlogs.map((blog) => (
              <Link key={blog.href} href={blog.href}>
                {blog.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

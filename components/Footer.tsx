import Link from 'next/link';

const footerTools = [
  {
    href: '/tools/open-graph-preview-tool',
    label: 'Open Graph preview tool',
  },
  {
    href: '/tools/whatsapp-link-preview-checker',
    label: 'WhatsApp link preview checker',
  },
  {
    href: '/tools/linkedin-preview-checker',
    label: 'LinkedIn preview checker',
  },
  {
    href: '/tools/twitter-card-preview',
    label: 'Twitter card preview tool',
  },
  {
    href: '/tools/localhost-og-preview',
    label: 'test OG tags on localhost',
  },
  {
    href: '/tools/slack-link-preview-checker',
    label: 'Slack link preview checker',
  },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t py-8 px-4"
      style={{ borderColor: 'rgba(0,0,0,0.05)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-sm text-[#4f6f5b]">
            LinkPeek — free forever, open source
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/tools"
              className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21] no-underline"
            >
              Tools
            </Link>
            <Link
              href="/blog"
              className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21] no-underline"
            >
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
            <a
              href="https://github.com/Kedar200/Link-preview/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21]"
            >
              Report an issue
            </a>
          </div>
        </div>
        <nav
          aria-label="Main LinkPeek tools"
          className="flex flex-wrap justify-center gap-x-5 gap-y-3 border-t border-[#1a2b21]/10 pt-5"
        >
          {footerTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="text-xs font-semibold leading-5 text-[#4f6f5b] no-underline transition-colors hover:text-[#1a2b21]"
            >
              {tool.label}
            </Link>
          ))}
          <Link
            href="/tools/bulk-link-preview-checker"
            className="text-xs font-semibold leading-5 text-[#4f6f5b] no-underline transition-colors hover:text-[#1a2b21]"
          >
            Bulk link preview checker
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export interface SeoToolPage {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  updatedAt: string;
  heroLabel: string;
  primaryCta: string;
  sections: Array<{
    title: string;
    body: string;
    points: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const seoToolPages: SeoToolPage[] = [
  {
    slug: 'open-graph-preview-tool',
    title: 'Open Graph Preview Tool',
    metaTitle: 'Open Graph Preview Tool - Test OG Images & Meta Tags | LinkPeek',
    description:
      'Preview Open Graph tags as pixel-perfect social card mockups before publishing. Test how your page appears across major apps.',
    keywords: [
      'Open Graph preview tool',
      'OG preview tool',
      'Open Graph checker',
      'OG image preview',
      'meta tag preview',
      'social preview checker',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'Open Graph checker',
    primaryCta: 'Preview Open Graph tags',
    sections: [
      {
        title: 'Check the tags that decide your link preview',
        body:
          'LinkPeek reads your page metadata and renders the title, description, image, URL, and card layout inside high-fidelity social UI mockups.',
        points: [
          'Validate og:title, og:description, og:image, og:url, and og:type',
          'Catch missing absolute image URLs before the link is shared',
          'Compare Open Graph output against pixel-perfect Twitter/X, LinkedIn, WhatsApp, Slack, Discord, and Instagram-style cards',
        ],
      },
      {
        title: 'Useful before launch and after metadata changes',
        body:
          'Use the checker while building a new page, refreshing a landing page, or debugging a card that is already cached on social platforms.',
        points: [
          'Paste a production URL or a localhost URL',
          'Review platform-specific warnings in the audit panel',
          'Copy fix tags for your framework or CMS head section',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is an Open Graph preview tool?',
        answer:
          'An Open Graph preview tool checks the metadata social apps use to generate link cards, including title, description, image, and canonical URL.',
      },
      {
        question: 'Can LinkPeek preview OG images before publishing?',
        answer:
          'Yes. LinkPeek can test a live URL, render high-fidelity preview mockups, and support localhost workflows before a public deploy.',
      },
      {
        question: 'Why does my Open Graph image not show?',
        answer:
          'Common causes include a missing og:image tag, a relative image URL, a blocked crawler, an unsupported image format, or an image that is too small or too large for the target app.',
      },
    ],
  },
  {
    slug: 'link-preview-checker',
    title: 'Link Preview Checker',
    metaTitle: 'Link Preview Checker - Test Social Cards Before Sharing | LinkPeek',
    description:
      'Check how a URL preview looks before sharing it with pixel-perfect mockups for WhatsApp, Twitter/X, LinkedIn, Slack, Discord, and Instagram-style previews.',
    keywords: [
      'link preview checker',
      'URL preview checker',
      'social media link preview tool',
      'preview link before sharing',
      'social card checker',
      'link preview test',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'Social preview checker',
    primaryCta: 'Check a link preview',
    sections: [
      {
        title: 'See the share card before your audience does',
        body:
          'A broken preview can reduce clicks even when the page itself is fine. LinkPeek gives you high-fidelity social card mockups and a metadata audit in one place.',
        points: [
          'Preview title, description, thumbnail, and destination URL',
          'Inspect platform-specific UI mockups before the link is shared',
          'Spot truncation and missing image issues early',
          'Export a preview image for design or approval workflows',
        ],
      },
      {
        title: 'Built for marketers, founders, and developers',
        body:
          'Use it when shipping launch pages, blog posts, product updates, newsletters, and pages that will be shared in private communities.',
        points: [
          'No sign-in required',
          'Works across multiple social card styles',
          'Includes an audit with copy-paste fixes',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I check a link preview?',
        answer:
          'Paste the URL into LinkPeek and run a scan. The tool fetches metadata and renders pixel-perfect social card previews with an audit of missing or weak tags.',
      },
      {
        question: 'Which social previews can LinkPeek check?',
        answer:
          'LinkPeek shows high-fidelity previews for WhatsApp, Twitter/X, LinkedIn, Slack, Discord, and Instagram-style link cards.',
      },
      {
        question: 'Does a link preview checker update cached previews?',
        answer:
          'No. A checker helps diagnose and verify metadata. Some platforms cache previews, so you may still need to refresh or cache-bust the URL after fixing tags.',
      },
    ],
  },
  {
    slug: 'bulk-link-preview-checker',
    title: 'Bulk Link Preview Checker',
    metaTitle: 'Bulk Link Preview Checker - Scan Multiple Social Cards | LinkPeek',
    description:
      'Scan multiple URLs at once, find broken Open Graph tags, and open pixel-perfect social preview mockups for launch QA.',
    keywords: [
      'bulk link preview checker',
      'bulk Open Graph checker',
      'bulk social preview audit',
      'launch QA social previews',
      'multiple URL preview checker',
      'CSV link preview checker',
    ],
    updatedAt: '2026-06-20',
    heroLabel: 'Launch QA',
    primaryCta: 'Run bulk scan',
    sections: [
      {
        title: 'Scan launch URLs in one pass',
        body:
          'Paste a list of campaign, blog, product, or landing page URLs and LinkPeek will audit each page with the same metadata engine used by the single URL previewer.',
        points: [
          'Check multiple public URLs without pasting them one by one',
          'Summarize missing titles, descriptions, images, crawler blocks, and image size problems',
          'See platform scores for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram',
        ],
      },
      {
        title: 'Drill into the URLs that need attention',
        body:
          'Bulk results stay compact for fast QA, but every row links back to the full pixel-perfect mockup view for deeper inspection.',
        points: [
          'Open any URL in the full LinkPeek preview experience',
          'Export a CSV report for developers, clients, or launch checklists',
          'Use the table to prioritize critical failures before warnings and polish items',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a bulk link preview checker?',
        answer:
          'A bulk link preview checker scans multiple URLs and reports which pages have broken or weak social preview metadata.',
      },
      {
        question: 'How many URLs can I scan at once?',
        answer:
          'This bulk checker currently scans up to 100 public URLs in one run, with controlled parallel checks to keep the scan reliable.',
      },
      {
        question: 'Can I inspect the actual preview for one failed URL?',
        answer:
          'Yes. Each result has an Open mockup action that loads the URL in the full LinkPeek preview interface.',
      },
    ],
  },
  {
    slug: 'whatsapp-link-preview-checker',
    title: 'WhatsApp Link Preview Checker',
    metaTitle: 'WhatsApp Link Preview Checker - Fix Missing Preview Images | LinkPeek',
    description:
      'Test pixel-perfect WhatsApp link preview mockups and diagnose missing title, description, and image problems before sharing in chats or groups.',
    keywords: [
      'WhatsApp link preview checker',
      'WhatsApp link preview not working',
      'WhatsApp OG image not showing',
      'WhatsApp preview image size',
      'fix WhatsApp link preview',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'WhatsApp preview audit',
    primaryCta: 'Check WhatsApp preview',
    sections: [
      {
        title: 'Debug the most common WhatsApp preview failures',
        body:
          'WhatsApp previews are sensitive to image size, image format, crawler access, and Open Graph tag quality. LinkPeek shows the issue inside a WhatsApp-style UI mockup.',
        points: [
          'Check whether og:image is present and absolute',
          'Confirm the preview has a title and concise description',
          'See how the WhatsApp card layout frames your image and copy',
          'Review image format, dimensions, HTTPS access, and crawler-blocking issues',
        ],
      },
      {
        title: 'Fix issues before sharing in private channels',
        body:
          'Private WhatsApp shares are hard to recover after a broken card appears. Testing first helps avoid plain-text links and missing thumbnails.',
        points: [
          'Run the URL through LinkPeek before posting',
          'Apply the generated metadata fixes',
          'Retest with a cache-busted URL when a platform has stale preview data',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my WhatsApp link preview not working?',
        answer:
          'Usually the page is missing Open Graph tags, the image URL is invalid, the image is too large or unsupported, HTTPS access fails, or WhatsApp is showing a cached preview.',
      },
      {
        question: 'What image size should I use for WhatsApp previews?',
        answer:
          'Use a 1200 by 630 image for broad platform compatibility and keep the file size compressed so it loads reliably for crawlers.',
      },
      {
        question: 'Does WhatsApp use Twitter Card tags?',
        answer:
          'WhatsApp primarily relies on Open Graph tags, so og:title, og:description, and og:image matter more than Twitter-specific tags.',
      },
    ],
  },
  {
    slug: 'twitter-card-preview',
    title: 'Twitter Card Preview',
    metaTitle: 'Twitter Card Preview - Test X Cards & OG Images | LinkPeek',
    description:
      'Preview high-fidelity Twitter/X card mockups, check summary large image metadata, and find missing Twitter Card or Open Graph tags before posting.',
    keywords: [
      'Twitter card preview',
      'X card preview',
      'Twitter card checker',
      'Twitter card not displaying',
      'summary large image preview',
      'twitter:image preview',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'Twitter/X card checker',
    primaryCta: 'Preview Twitter card',
    sections: [
      {
        title: 'Check Twitter/X card metadata',
        body:
          'A Twitter card needs the right card type, title, description, and image tags to avoid a weak or missing preview. LinkPeek renders the result as a realistic X card mockup.',
        points: [
          'Review twitter:card, twitter:title, twitter:description, and twitter:image',
          'Compare the card with Open Graph fallback data',
          'Inspect the visual card layout before a post goes live',
          'Find missing or low-quality preview image tags',
        ],
      },
      {
        title: 'Avoid launch-day social card surprises',
        body:
          'Use LinkPeek before posting product launches, blog posts, changelogs, and campaign pages on X.',
        points: [
          'Test the URL before publishing a post',
          'Use the audit to patch missing metadata',
          'Export the rendered card for approvals',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my Twitter card not displaying?',
        answer:
          'The page may be missing twitter:card metadata, the image may be blocked or invalid, or X may be using cached metadata from an earlier version of the page.',
      },
      {
        question: 'Should I use Twitter tags or Open Graph tags?',
        answer:
          'Use both. Twitter-specific tags give you control on X, while Open Graph tags provide better fallback coverage across other apps.',
      },
      {
        question: 'Can LinkPeek show summary large image cards?',
        answer:
          'Yes. LinkPeek previews large-image social cards as high-fidelity mockups and audits the metadata that controls them.',
      },
    ],
  },
  {
    slug: 'linkedin-preview-checker',
    title: 'LinkedIn Preview Checker',
    metaTitle: 'LinkedIn Preview Checker - Test Link Cards Before Posting | LinkPeek',
    description:
      'Check pixel-perfect LinkedIn link preview mockups for missing images, wrong titles, stale descriptions, and Open Graph metadata issues before posting.',
    keywords: [
      'LinkedIn preview checker',
      'LinkedIn link preview not showing',
      'LinkedIn preview image wrong',
      'LinkedIn OG image checker',
      'LinkedIn post preview',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'LinkedIn card checker',
    primaryCta: 'Check LinkedIn preview',
    sections: [
      {
        title: 'Protect professional posts from bad previews',
        body:
          'LinkedIn link cards are often used for launches, hiring pages, case studies, and company updates where trust matters. LinkPeek lets you inspect the card in a high-fidelity LinkedIn-style UI.',
        points: [
          'Verify the title and description that appear in the feed',
          'Catch missing or incorrect og:image values',
          'Review the visual preview before stakeholders or customers see it',
          'Confirm the canonical URL and metadata are aligned',
        ],
      },
      {
        title: 'Diagnose image and copy problems quickly',
        body:
          'LinkPeek turns metadata into a pixel-perfect visual preview and highlights what should be changed in the page head.',
        points: [
          'Scan live pages or local development URLs',
          'Find common Open Graph mistakes',
          'Copy suggested fixes into your app or CMS',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is my LinkedIn preview image wrong?',
        answer:
          'LinkedIn may be reading an old cache, a different og:image tag, or a canonical URL that points to metadata you did not expect.',
      },
      {
        question: 'Can I test a LinkedIn preview before posting?',
        answer:
          'Yes. LinkPeek renders a high-fidelity LinkedIn-style card and audits the Open Graph metadata before you publish the post.',
      },
      {
        question: 'What tags control LinkedIn previews?',
        answer:
          'LinkedIn primarily uses Open Graph tags such as og:title, og:description, og:image, og:url, and og:type.',
      },
    ],
  },
  {
    slug: 'localhost-link-preview',
    title: 'Localhost Link Preview',
    metaTitle: 'Localhost Link Preview - Test Social Cards Before Deploy | LinkPeek',
    description:
      'Preview pixel-perfect Open Graph and social media card mockups for localhost URLs before deployment. Test metadata while your app is still in development.',
    keywords: [
      'localhost link preview',
      'test OG tags localhost',
      'Open Graph localhost',
      'preview social cards before deploy',
      'localhost OG preview tool',
    ],
    updatedAt: '2026-06-14',
    heroLabel: 'Local development preview',
    primaryCta: 'Preview localhost URL',
    sections: [
      {
        title: 'Test social metadata before the page is public',
        body:
          'Many preview tools require a deployed URL. LinkPeek is built for developers who need high-fidelity card mockups while the page is still running locally.',
        points: [
          'Preview localhost pages during development',
          'Inspect WhatsApp, X, LinkedIn, Slack, Discord, and Instagram-style mockups',
          'Avoid deploys just to inspect metadata',
          'Catch broken image paths before production',
        ],
      },
      {
        title: 'Move metadata QA earlier in your workflow',
        body:
          'Treat social cards like any other launch requirement by checking them before merge or release.',
        points: [
          'Run your app locally',
          'Paste the localhost URL into LinkPeek',
          'Fix metadata before the first public share',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I preview Open Graph tags on localhost?',
        answer:
          'Yes. LinkPeek supports a local preview workflow so developers can inspect pixel-perfect social cards before a public deployment.',
      },
      {
        question: 'Why do normal social debuggers fail on localhost?',
        answer:
          'Most platform crawlers cannot reach a private localhost address from the internet, so they require a deployed or tunneled URL.',
      },
      {
        question: 'Should I test previews before deploying?',
        answer:
          'Yes. Testing early catches missing absolute URLs, broken image paths, and title or description issues before they are cached by social apps.',
      },
    ],
  },
];

export function getSeoToolPage(slug: string) {
  return seoToolPages.find((page) => page.slug === slug);
}

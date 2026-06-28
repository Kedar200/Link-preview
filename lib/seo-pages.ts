export interface SeoToolPage {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  updatedAt: string;
  heroLabel: string;
  primaryCta: string;
  targetKeyword: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
    points: string[];
  }>;
  steps: string[];
  commonIssues: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedToolSlugs: string[];
  relatedBlogSlugs: string[];
}

const updatedAt = '2026-06-28';

export const seoToolPages: SeoToolPage[] = [
  {
    slug: 'open-graph-preview-tool',
    title: 'Open Graph Preview Tool',
    metaTitle: 'Open Graph Preview Tool | Test OG Tags Instantly',
    description:
      'Test Open Graph tags, OG images, titles, descriptions, Twitter cards, and social previews across WhatsApp, LinkedIn, X, Slack, Discord, and localhost.',
    keywords: [
      'open graph preview tool',
      'OG preview tool',
      'Open Graph checker',
      'OG image preview',
      'meta tag preview',
      'social preview checker',
      'Open Graph tag tester',
    ],
    updatedAt,
    heroLabel: 'OG preview testing',
    primaryCta: 'Preview Open Graph tags',
    targetKeyword: 'open graph preview tool',
    intro:
      'Use LinkPeek as a free Open Graph preview tool when you need to see the actual card experience, not only a list of tags. Paste a URL and inspect the title, description, image, canonical URL, Twitter Card fallback, and platform-specific rendering across WhatsApp, LinkedIn, X, Slack, Discord, and Instagram. Developers can also test localhost URLs before deployment, which makes Open Graph QA part of the normal build workflow instead of a last-minute production check.',
    sections: [
      {
        title: 'Check the tags that control every social card',
        body:
          'Open Graph tags decide how most social apps summarize your page. A small mistake in og:title, og:description, og:image, or og:url can produce a blank card, stale image, or misleading preview. LinkPeek turns those tags into visual previews so the metadata can be evaluated like a real UI surface.',
        points: [
          'Validate og:title, og:description, og:image, og:url, og:type, and og:site_name',
          'Compare Open Graph output with Twitter Card fallbacks and app-specific layouts',
          'Catch relative image paths, missing HTTPS, weak descriptions, and bad canonical URLs',
        ],
      },
      {
        title: 'Built for developers before and after deployment',
        body:
          'Many Open Graph problems are introduced while a page is still being built. LinkPeek supports local development workflows, production URLs, and cache-busted retests, so teams can catch metadata problems before platforms cache the wrong version.',
        points: [
          'Test localhost previews without deploying only to inspect a card',
          'Retest production pages after metadata changes or CMS updates',
          'Use the audit output to hand clear fixes to the developer who owns the page head',
        ],
      },
      {
        title: 'Preview more than one generic card',
        body:
          'A technically valid Open Graph setup can still look wrong on a specific platform. WhatsApp may crop the image tightly, LinkedIn may use a stale image, Slack may emphasize site name, and X may prefer Twitter Card tags. LinkPeek shows these differences in one workflow.',
        points: [
          'Review WhatsApp, LinkedIn, X, Slack, Discord, and Instagram-style previews',
          'Check whether the same image and copy survive different card dimensions',
          'Use platform-specific warnings instead of guessing from raw HTML',
        ],
      },
    ],
    steps: [
      'Paste the page URL into the Open Graph preview tool.',
      'Run the scan and let LinkPeek fetch the metadata.',
      'Review the visual cards for WhatsApp, LinkedIn, X, Slack, Discord, and Instagram.',
      'Fix missing or weak Open Graph and Twitter Card tags in your app or CMS.',
      'Retest the canonical URL and a cache-busted URL before sharing publicly.',
    ],
    commonIssues: [
      {
        title: 'The OG image URL is relative',
        body:
          'Social crawlers need an absolute HTTPS image URL. Replace /og.png with a full URL such as https://example.com/og.png.',
      },
      {
        title: 'The title looks fine in HTML but bad in cards',
        body:
          'Long titles can wrap or truncate differently across apps. Preview the card visually and write a shorter social-specific title when needed.',
      },
      {
        title: 'The page depends on client-side metadata',
        body:
          'Social crawlers usually read server HTML. If your framework injects tags only after JavaScript runs, platforms may never see them.',
      },
      {
        title: 'Platforms show stale metadata',
        body:
          'WhatsApp, LinkedIn, Slack, and X cache link previews. After fixing tags, retest with the canonical URL and a versioned cache-busting URL.',
      },
    ],
    faqs: [
      {
        question: 'What is an Open Graph preview tool?',
        answer:
          'An Open Graph preview tool checks the metadata social apps use to generate link cards, including title, description, image, canonical URL, and card type.',
      },
      {
        question: 'Can LinkPeek preview OG tags before deployment?',
        answer:
          'Yes. LinkPeek supports localhost preview workflows so developers can test Open Graph tags before a public deployment or ngrok tunnel.',
      },
      {
        question: 'Does an Open Graph preview tool clear social caches?',
        answer:
          'No checker can directly clear every platform cache. LinkPeek helps verify the fixed metadata and shows when a cache-busted URL should be tested.',
      },
      {
        question: 'Should I include Twitter Card tags with Open Graph tags?',
        answer:
          'Yes. X can use Open Graph fallbacks, but twitter:card is still important for controlling card style and large image previews.',
      },
    ],
    relatedToolSlugs: [
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'twitter-card-preview',
      'localhost-og-preview',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'open-graph-meta-tags-guide',
      'og-image-size-guide-2026',
      'open-graph-vs-twitter-cards',
      'preview-og-tags-localhost-no-ngrok',
    ],
  },
  {
    slug: 'whatsapp-link-preview-checker',
    title: 'WhatsApp Link Preview Checker',
    metaTitle: 'WhatsApp Link Preview Checker | Test OG Images & Titles',
    description:
      'Preview WhatsApp link cards, test OG images and titles, diagnose missing preview images, cache issues, crawler access, and Open Graph tag problems.',
    keywords: [
      'whatsapp link preview checker',
      'whatsapp og image not showing',
      'whatsapp link preview not working',
      'clear whatsapp link preview cache',
      'whatsapp preview image size',
      'fix WhatsApp link preview',
    ],
    updatedAt,
    heroLabel: 'WhatsApp card QA',
    primaryCta: 'Check WhatsApp preview',
    targetKeyword: 'whatsapp link preview checker',
    intro:
      'Use LinkPeek as a WhatsApp link preview checker when a URL shows as plain text, uses the wrong image, or keeps showing stale metadata after a fix. WhatsApp relies heavily on Open Graph tags and can be strict about image size, format, HTTPS access, and caching. LinkPeek shows the WhatsApp-style card near the top of the page and pairs it with a metadata audit so you can fix the root cause before sending the link to a chat, group, or campaign audience.',
    sections: [
      {
        title: 'Diagnose missing WhatsApp preview images',
        body:
          'WhatsApp preview failures usually come from one of a few metadata problems: no og:image, a relative image URL, unsupported media, blocked crawler access, or stale cache. A raw tag checker can confirm that a tag exists, but it cannot show whether the card actually looks useful inside a chat thread.',
        points: [
          'Check whether og:image is present, absolute, and reachable over HTTPS',
          'Confirm the title and description are short enough for WhatsApp cards',
          'Review image dimensions and file size risks before the link is shared',
        ],
      },
      {
        title: 'Handle WhatsApp cache issues without guessing',
        body:
          'WhatsApp can keep showing old titles or images after a page is fixed. LinkPeek helps you compare the canonical URL with a versioned URL so you can separate a metadata problem from a cache problem.',
        points: [
          'Retest the fixed page before sending it again',
          'Use a cache-busted query string when WhatsApp still shows an old card',
          'Document the current title, description, image, and crawler status for handoff',
        ],
      },
      {
        title: 'Protect private-channel launches',
        body:
          'WhatsApp shares often happen in private communities, customer chats, founder groups, and partner channels where there is no easy public correction after a broken card appears. Checking the preview first protects the first impression.',
        points: [
          'Test launch pages before sending them to private groups',
          'Catch plain-text fallback links before campaign traffic starts',
          'Make social card QA part of the release checklist for important pages',
        ],
      },
    ],
    steps: [
      'Paste the page URL into LinkPeek.',
      'Switch to the WhatsApp preview card in the app selector.',
      'Check the title, description, image crop, and destination URL.',
      'Fix Open Graph tags, image access, or cache-busting issues from the audit.',
      'Retest before sending the link in a WhatsApp chat or group.',
    ],
    commonIssues: [
      {
        title: 'WhatsApp shows no image',
        body:
          'Check for a missing og:image, unsupported format, blocked image URL, tiny image, oversized image, or insecure HTTP asset.',
      },
      {
        title: 'WhatsApp shows the old image',
        body:
          'The page may be fixed but WhatsApp may still have cached the old metadata. Retest a versioned URL such as ?v=2 after confirming the tags are correct.',
      },
      {
        title: 'WhatsApp shows only a tiny thumbnail',
        body:
          'Images that are too small or awkwardly cropped can produce weak cards. Use a 1200 by 630 image for broad compatibility.',
      },
      {
        title: 'The preview works elsewhere but not WhatsApp',
        body:
          'WhatsApp is often stricter than other platforms about image access, file size, and Open Graph quality.',
      },
    ],
    faqs: [
      {
        question: 'Why is my WhatsApp link preview image not showing?',
        answer:
          'Common causes include a missing og:image tag, a relative image URL, unsupported image format, blocked crawler access, image size problems, or stale WhatsApp cache.',
      },
      {
        question: 'What image size should I use for WhatsApp link previews?',
        answer:
          'Use a 1200 by 630 image for broad social-card compatibility, and keep the file compressed so crawlers can fetch it reliably.',
      },
      {
        question: 'Does WhatsApp use Twitter Card tags?',
        answer:
          'WhatsApp primarily reads Open Graph tags such as og:title, og:description, and og:image. Twitter Card tags are mainly for X.',
      },
      {
        question: 'Can LinkPeek clear WhatsApp cache?',
        answer:
          'LinkPeek cannot directly clear WhatsApp cache, but it helps verify fixed metadata and test cache-busted URLs so you know what changed.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'localhost-og-preview',
      'linkedin-preview-checker',
      'twitter-card-preview',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'whatsapp-link-preview-not-working',
      'clear-whatsapp-link-preview-cache',
      'og-image-size-guide-2026',
      'link-preview-not-showing',
    ],
  },
  {
    slug: 'linkedin-preview-checker',
    title: 'LinkedIn Preview Checker',
    metaTitle: 'LinkedIn Preview Checker | Test LinkedIn Link Cards',
    description:
      'Test LinkedIn link cards before posting. Check Open Graph image, title, description, cache behavior, canonical URL, and crawler-friendly metadata.',
    keywords: [
      'linkedin preview checker',
      'linkedin link preview not showing',
      'linkedin preview image wrong',
      'linkedin og image checker',
      'linkedin post preview',
      'linkedin preview not showing image',
    ],
    updatedAt,
    heroLabel: 'LinkedIn card QA',
    primaryCta: 'Check LinkedIn preview',
    targetKeyword: 'linkedin preview checker',
    intro:
      'Use LinkPeek as a LinkedIn preview checker before posting a launch, blog article, hiring page, case study, or company announcement. LinkedIn link cards are often the first product surface a professional audience sees. LinkPeek renders a LinkedIn-style preview and audits the Open Graph metadata behind it, so you can spot a wrong title, missing image, stale cache, or canonical mismatch before the post is live.',
    sections: [
      {
        title: 'Preview the card before your network sees it',
        body:
          'LinkedIn posts often carry higher business context than casual social shares. A broken image or weak description can make a launch, hiring update, or case study feel unfinished. LinkPeek lets you review the card like a content asset, not just a metadata dump.',
        points: [
          'Inspect the LinkedIn-style title, description, image, and URL presentation',
          'Check whether the image crop keeps the important subject visible',
          'Confirm the preview matches the page you intend to promote',
        ],
      },
      {
        title: 'Find stale image and canonical problems',
        body:
          'LinkedIn caches previews and can show the wrong image when the page has redirects, multiple OG images, or conflicting canonical signals. LinkPeek helps identify the metadata that LinkedIn is likely to read before you use LinkedIn Post Inspector.',
        points: [
          'Check og:url against your canonical URL and sitemap URL',
          'Avoid redirect-heavy image URLs that crawlers may fail to resolve',
          'Retest after changing metadata to confirm the page source is correct',
        ],
      },
      {
        title: 'Improve B2B and founder posting workflows',
        body:
          'For product launches and thought-leadership posts, the link card carries credibility. A clear title, clean image, and accurate description can improve trust before the reader clicks.',
        points: [
          'Review blog posts and landing pages before scheduled LinkedIn posts',
          'Give developers a precise list of metadata issues to fix',
          'Use one checker for LinkedIn plus WhatsApp, X, Slack, and Discord previews',
        ],
      },
    ],
    steps: [
      'Paste the LinkedIn URL target into LinkPeek.',
      'Open the LinkedIn preview and review the card image, headline, description, and domain.',
      'Check the audit for missing Open Graph tags, redirect problems, or weak copy.',
      'Fix metadata and confirm the canonical URL points to the intended page.',
      'Retest, then use LinkedIn Post Inspector if LinkedIn still shows stale cached data.',
    ],
    commonIssues: [
      {
        title: 'LinkedIn shows the wrong image',
        body:
          'The page may have multiple OG images, stale cache, redirect-heavy images, or a canonical URL pointing LinkedIn to a different page.',
      },
      {
        title: 'LinkedIn shows no image',
        body:
          'Confirm the image is at least 200 by 200, accessible without login, served over HTTPS, and not blocked by bot protection.',
      },
      {
        title: 'The preview title is outdated',
        body:
          'The page source may be fixed while LinkedIn cache remains stale. Verify with LinkPeek, then refresh through LinkedIn Post Inspector.',
      },
      {
        title: 'The description is too generic',
        body:
          'Use page-specific og:description copy instead of boilerplate site copy for posts where click intent matters.',
      },
    ],
    faqs: [
      {
        question: 'Can I test a LinkedIn link preview before posting?',
        answer:
          'Yes. LinkPeek renders a LinkedIn-style card and audits the Open Graph tags that control the preview before the post is published.',
      },
      {
        question: 'Why is my LinkedIn preview image not showing?',
        answer:
          'Common causes include stale cache, missing og:image, image redirects, blocked crawler access, unsupported image format, or an image that is too small.',
      },
      {
        question: 'What tags control LinkedIn previews?',
        answer:
          'LinkedIn primarily reads Open Graph tags, including og:title, og:description, og:image, og:url, og:type, and sometimes og:site_name.',
      },
      {
        question: 'Does LinkPeek replace LinkedIn Post Inspector?',
        answer:
          'LinkPeek is best for previewing and auditing the card. LinkedIn Post Inspector is still useful when you need LinkedIn to refresh its own cache.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'whatsapp-link-preview-checker',
      'twitter-card-preview',
      'slack-link-preview-checker',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'linkedin-preview-image-wrong',
      'og-image-size-guide-2026',
      'best-tool-for-seeing-link-preview',
      'link-preview-not-showing',
    ],
  },
  {
    slug: 'twitter-card-preview',
    title: 'Twitter/X Card Preview Tool',
    metaTitle: 'Twitter/X Card Preview Tool | Test Twitter Cards',
    description:
      'Preview Twitter/X cards and test twitter:card, title, description, image, Open Graph fallback tags, cache behavior, and large-image social cards.',
    keywords: [
      'twitter card preview tool',
      'twitter card preview',
      'x card preview',
      'twitter card checker',
      'twitter card not updating',
      'summary large image preview',
      'twitter:image preview',
    ],
    updatedAt,
    heroLabel: 'X card QA',
    primaryCta: 'Preview Twitter card',
    targetKeyword: 'twitter card preview tool',
    intro:
      'Use LinkPeek as a Twitter/X card preview tool when you need to verify how a URL will render before posting. X can read Twitter Card tags and Open Graph fallbacks, but missing twitter:card metadata, blocked images, stale cache, or weak preview copy can still produce a poor card. LinkPeek renders the card and audits the underlying tags so you can fix the issue before publishing.',
    sections: [
      {
        title: 'Check Twitter Card tags and Open Graph fallbacks',
        body:
          'X uses a combination of Twitter Card tags and Open Graph fallback data. If twitter:card is missing, the card style may be wrong even when og:title and og:image exist. LinkPeek makes those differences visible.',
        points: [
          'Inspect twitter:card, twitter:title, twitter:description, and twitter:image',
          'Confirm Open Graph fallback values are strong enough when Twitter-specific tags are absent',
          'Check summary large image presentation before posting',
        ],
      },
      {
        title: 'Spot stale cards and image problems',
        body:
          'A card can keep showing old metadata after a deploy because X caches preview data. LinkPeek helps confirm whether the page source is correct so you know whether to fix tags or refresh cache.',
        points: [
          'Compare the current page source with the visual card output',
          'Check image URL, dimensions, HTTPS access, and crawler availability',
          'Retest cache-busted URLs after metadata changes',
        ],
      },
      {
        title: 'Use visual QA for launches and threads',
        body:
          'For product launches, blog threads, changelogs, and public announcements, the card should reinforce the message. The headline should not truncate awkwardly and the image should be clear even in a fast-moving feed.',
        points: [
          'Preview cards before scheduled X posts',
          'Audit every URL in a launch thread with the bulk checker',
          'Export visual evidence for approvals when the preview matters',
        ],
      },
    ],
    steps: [
      'Paste the URL into LinkPeek.',
      'Open the X/Twitter preview card.',
      'Review the card type, title, description, image, and destination URL.',
      'Fix missing Twitter Card tags or weak Open Graph fallback tags.',
      'Retest after deployment and use a cache-busted URL if the old card persists.',
    ],
    commonIssues: [
      {
        title: 'twitter:card is missing',
        body:
          'Add twitter:card with summary_large_image when you want a large visual card. Open Graph fallback tags do not replace this card-type control.',
      },
      {
        title: 'The Twitter card image is not updating',
        body:
          'X may be using cached metadata. Verify the source with LinkPeek, then test a versioned URL or platform debugger workflow.',
      },
      {
        title: 'The image URL is blocked',
        body:
          'Hotlink protection, bot rules, or authentication can prevent crawlers from fetching the preview image even when it opens for you.',
      },
      {
        title: 'The title truncates in the feed',
        body:
          'Write a concise social title. A title that works in a browser tab can still be too long for a card.',
      },
    ],
    faqs: [
      {
        question: 'What is a Twitter Card preview tool?',
        answer:
          'A Twitter Card preview tool shows how a URL will appear on X/Twitter and checks the tags that control the card image, title, description, and card type.',
      },
      {
        question: 'Do I need Twitter tags if I already have Open Graph tags?',
        answer:
          'Yes. X can use Open Graph fallbacks, but twitter:card is still important for selecting the card layout.',
      },
      {
        question: 'Why is my Twitter/X card not updating?',
        answer:
          'The page may be cached, the image URL may be blocked, or the current source may still contain old metadata.',
      },
      {
        question: 'Can LinkPeek preview summary large image cards?',
        answer:
          'Yes. LinkPeek renders large-image social cards and audits the tags that control them.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'slack-link-preview-checker',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'twitter-card-not-displaying',
      'open-graph-vs-twitter-cards',
      'og-image-size-guide-2026',
      'debug-og-image-cropping',
    ],
  },
  {
    slug: 'localhost-og-preview',
    title: 'Test Open Graph Tags on Localhost',
    metaTitle: 'Test Open Graph on Localhost Without ngrok',
    description:
      'Test Open Graph tags, Twitter cards, and social link previews on localhost before deployment. Preview WhatsApp, LinkedIn, X, Slack, and Discord without ngrok.',
    keywords: [
      'test open graph localhost',
      'preview og tags localhost',
      'open graph localhost without ngrok',
      'localhost og preview',
      'test social cards before deploying',
      'localhost link preview',
    ],
    updatedAt,
    heroLabel: 'Localhost OG preview',
    primaryCta: 'Test localhost preview',
    targetKeyword: 'test open graph localhost',
    intro:
      'Use LinkPeek to test Open Graph tags on localhost when a page is still running on your laptop and is not ready for deployment. Traditional platform debuggers cannot crawl http://localhost:3000 because that address only exists on your machine. LinkPeek is built for developers who want to inspect social cards before deploying, before setting up ngrok, and before social platforms cache broken metadata.',
    sections: [
      {
        title: 'Preview social cards before the page is public',
        body:
          'Most Open Graph issues are easiest to fix while the code is still local. Waiting until production means you may discover a missing image after the URL has already been shared or cached. LinkPeek shifts this QA step earlier.',
        points: [
          'Run your app locally and paste the localhost URL into LinkPeek',
          'Preview WhatsApp, LinkedIn, X, Slack, Discord, and Instagram-style cards',
          'Fix tags before the first deploy instead of after a broken share',
        ],
      },
      {
        title: 'Avoid deploy-tunnel-cache guessing',
        body:
          'ngrok can expose localhost, but it does not show platform-specific cards by itself. You still have to copy a tunnel URL into multiple debuggers, wait for caches, and interpret raw metadata. LinkPeek focuses on the preview and audit workflow.',
        points: [
          'Use one interface for local, staging, and production preview checks',
          'See card layouts directly instead of stitching together multiple debugger outputs',
          'Reduce temporary tunnel links in content QA and design review workflows',
        ],
      },
      {
        title: 'Catch framework metadata mistakes early',
        body:
          'Next.js, React, CMS templates, and marketing pages can each produce different metadata per route. Local preview testing helps verify that the correct tags are server-rendered for the exact URL you plan to launch.',
        points: [
          'Check that route-level metadata is present in the HTML source',
          'Catch relative image paths before social crawlers reject them',
          'Confirm canonical and Open Graph URLs match the intended production route',
        ],
      },
    ],
    steps: [
      'Start your local development server.',
      'Open LinkPeek and paste a localhost URL such as http://localhost:3000/page.',
      'Run the preview and inspect the app-specific social cards.',
      'Fix metadata, image URLs, and title or description copy in your local code.',
      'Retest locally, then deploy once the preview is correct.',
    ],
    commonIssues: [
      {
        title: 'Platform debuggers cannot access localhost',
        body:
          'External crawlers cannot reach your private machine. LinkPeek is designed to support local preview workflows before a public URL exists.',
      },
      {
        title: 'Local images use relative paths',
        body:
          'Relative image paths may appear locally but fail after deployment or when crawled. Plan for absolute production image URLs before launch.',
      },
      {
        title: 'Metadata only appears after JavaScript runs',
        body:
          'Social crawlers expect metadata in server HTML. If the tags are client-injected, the live preview may be blank.',
      },
      {
        title: 'A tunnel URL changes during QA',
        body:
          'Temporary URLs can make cache behavior harder to reason about. Test the card itself first, then verify the final production URL.',
      },
    ],
    faqs: [
      {
        question: 'Can I test Open Graph tags on localhost?',
        answer:
          'Yes. LinkPeek supports localhost preview workflows so developers can inspect Open Graph and Twitter Card metadata before deployment.',
      },
      {
        question: 'Do I need ngrok to preview localhost link cards?',
        answer:
          'No. LinkPeek is built to help preview localhost social cards without relying on ngrok for the visual card QA workflow.',
      },
      {
        question: 'Why do official platform debuggers fail on localhost?',
        answer:
          'Official platform debuggers run from external servers, so they cannot crawl a private localhost URL on your machine.',
      },
      {
        question: 'Should I still test the production URL?',
        answer:
          'Yes. Local testing catches issues early, but you should retest the final canonical production URL before public sharing.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'twitter-card-preview',
      'slack-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'preview-og-tags-localhost-no-ngrok',
      'preview-social-cards-before-deploying',
      'react-app-og-tags-not-working',
      'open-graph-meta-tags-guide',
    ],
  },
  {
    slug: 'slack-link-preview-checker',
    title: 'Slack Link Preview Checker',
    metaTitle: 'Slack Link Preview Checker | Test Slack Link Cards',
    description:
      'Preview Slack link cards, test Open Graph metadata, site name, title, description, image access, crawler behavior, and Slack unfurl issues.',
    keywords: [
      'slack link preview checker',
      'slack link preview not working',
      'slack og image missing',
      'slack unfurl checker',
      'og:site_name slack',
      'slack social card preview',
    ],
    updatedAt,
    heroLabel: 'Slack unfurl QA',
    primaryCta: 'Check Slack preview',
    targetKeyword: 'slack link preview checker',
    intro:
      'Use LinkPeek as a Slack link preview checker when a URL unfurls without an image, shows the wrong title, or misses the site name that makes the card feel branded. Slack previews rely on crawler-readable metadata and can fail silently when tags are too deep in HTML, images are blocked, or site-name data is missing. LinkPeek renders a Slack-style card and surfaces the metadata issues that need attention.',
    sections: [
      {
        title: 'Check the Slack unfurl before sending the message',
        body:
          'Slack links are often shared in team channels, customer communities, sales rooms, and launch war rooms. A broken unfurl makes the link harder to scan and can hide the most important context.',
        points: [
          'Preview the Slack-style card image, title, description, and source label',
          'Confirm og:site_name gives Slack a clean brand anchor',
          'Catch missing or weak Open Graph tags before posting in a channel',
        ],
      },
      {
        title: 'Find crawler and HTML-depth issues',
        body:
          'Slackbot reads page HTML quickly and can miss metadata when the head is bloated or blocked. LinkPeek helps identify whether the important tags are visible and whether image URLs are directly fetchable.',
        points: [
          'Check for crawler access problems and blocked images',
          'Keep Open Graph tags high in the document head',
          'Avoid redirect chains for page and image URLs',
        ],
      },
      {
        title: 'Use Slack preview QA for internal launches',
        body:
          'Many launches begin inside Slack before they reach public social feeds. Checking the Slack unfurl helps teams spot broken cards in the same environment where stakeholders discuss the release.',
        points: [
          'Preview product updates before internal announcements',
          'Check documentation and changelog links before sharing them with customers',
          'Use bulk scans for launch lists that include many Slack-shared URLs',
        ],
      },
    ],
    steps: [
      'Paste the URL into LinkPeek.',
      'Open the Slack preview card.',
      'Review image, title, description, domain, and site name.',
      'Fix missing Open Graph tags, blocked images, or bloated head markup.',
      'Retest before posting the URL in Slack.',
    ],
    commonIssues: [
      {
        title: 'Slack shows no image',
        body:
          'The og:image URL may be missing, blocked, too slow, redirect-heavy, or inaccessible to Slackbot.',
      },
      {
        title: 'Slack shows a weak source label',
        body:
          'Add og:site_name so Slack can show a clear brand label above the preview.',
      },
      {
        title: 'Slackbot misses tags',
        body:
          'Keep critical Open Graph tags near the top of the head and avoid large inline assets before metadata.',
      },
      {
        title: 'Slack keeps an old unfurl',
        body:
          'Slack caches previews. Verify the source is fixed, then retest with a versioned URL if necessary.',
      },
    ],
    faqs: [
      {
        question: 'What is a Slack link preview checker?',
        answer:
          'A Slack link preview checker shows how a URL will unfurl in Slack and audits the Open Graph metadata Slackbot reads.',
      },
      {
        question: 'Why is my Slack link preview missing an image?',
        answer:
          'The page may be missing og:image, blocking Slackbot, using a redirect-heavy image URL, or placing metadata too deep in the HTML.',
      },
      {
        question: 'Does Slack use Open Graph tags?',
        answer:
          'Yes. Slack uses Open Graph metadata including title, description, image, and site name when building link unfurls.',
      },
      {
        question: 'Can LinkPeek test Slack previews with other platforms?',
        answer:
          'Yes. LinkPeek shows Slack alongside WhatsApp, LinkedIn, X, Discord, and Instagram-style previews.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'twitter-card-preview',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'slack-link-preview-no-image',
      'open-graph-meta-tags-guide',
      'link-preview-not-showing',
      'preview-social-cards-before-deploying',
    ],
  },
  {
    slug: 'link-preview-checker',
    title: 'Link Preview Checker',
    metaTitle: 'Link Preview Checker | Test Social Cards Before Sharing',
    description:
      'Check how a URL preview looks before sharing it across WhatsApp, LinkedIn, X, Slack, Discord, Instagram, and other social card surfaces.',
    keywords: [
      'link preview checker',
      'URL preview checker',
      'social media link preview tool',
      'preview link before sharing',
      'social card checker',
      'link preview test',
    ],
    updatedAt,
    heroLabel: 'Social preview checker',
    primaryCta: 'Check a link preview',
    targetKeyword: 'link preview checker',
    intro:
      'Use LinkPeek as a link preview checker when you want to see how a URL will appear before it is shared in feeds, chat apps, workspaces, DMs, or launch posts. It combines visual social card previews with a metadata audit, so you can fix title, description, image, crawler, and cache issues from one workflow.',
    sections: [
      {
        title: 'See the share card before your audience does',
        body:
          'A link preview is often the first visual impression of a page. If the title is vague, the image is missing, or the description is stale, people may ignore the link even when the page itself is strong.',
        points: [
          'Preview title, description, thumbnail, image crop, and destination URL',
          'Compare multiple app-style cards in one place',
          'Use audit findings to patch weak or missing metadata',
        ],
      },
      {
        title: 'Useful for marketers, founders, agencies, and developers',
        body:
          'Link preview QA matters for product launches, campaign pages, newsletters, blog posts, documentation, communities, and client reporting. LinkPeek gives non-technical users a clear visual check and gives developers precise metadata problems to fix.',
        points: [
          'No sign-in required for quick checks',
          'Works across public URLs and local development workflows',
          'Pairs single-page inspection with bulk launch QA',
        ],
      },
      {
        title: 'Move beyond generic tag output',
        body:
          'Raw metadata can be technically valid but visually weak. LinkPeek shows the card itself so teams can judge whether the headline reads well, the image crop works, and the preview supports the share intent.',
        points: [
          'Catch truncation before posting',
          'Check cross-platform card differences',
          'Export or share results during review workflows',
        ],
      },
    ],
    steps: [
      'Paste the URL you plan to share.',
      'Run the LinkPeek scan.',
      'Review the visual cards for each supported platform.',
      'Fix Open Graph, Twitter Card, image, or crawler issues.',
      'Retest the final URL before posting or launching.',
    ],
    commonIssues: [
      {
        title: 'The link preview is blank',
        body:
          'Blank cards usually mean metadata is missing, hidden behind JavaScript, blocked by robots, or served with an image URL crawlers cannot fetch.',
      },
      {
        title: 'The wrong image appears',
        body:
          'Look for stale cache, multiple OG images, canonical mismatches, or old CMS data.',
      },
      {
        title: 'The preview copy is not page-specific',
        body:
          'Generic site descriptions are common. Use page-level title and description values for important URLs.',
      },
      {
        title: 'Only one platform is broken',
        body:
          'Each app has its own crawler and card rules. A preview can work on X but fail on WhatsApp or Slack.',
      },
    ],
    faqs: [
      {
        question: 'How do I check a link preview?',
        answer:
          'Paste the URL into LinkPeek and run a scan. The tool fetches metadata, renders social card previews, and reports missing or weak tags.',
      },
      {
        question: 'Which social previews can LinkPeek check?',
        answer:
          'LinkPeek previews WhatsApp, LinkedIn, X, Slack, Discord, Instagram-style cards, Twitter Cards, and Open Graph metadata.',
      },
      {
        question: 'Does a link preview checker update cached previews?',
        answer:
          'No. A checker diagnoses and verifies metadata. Some platforms still require a cache refresh or cache-busted URL after fixes.',
      },
      {
        question: 'Can I check multiple URLs?',
        answer:
          'Yes. Use the Bulk Link Preview Checker to scan up to 100 public URLs in one run.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'twitter-card-preview',
      'bulk-link-preview-checker',
    ],
    relatedBlogSlugs: [
      'link-preview-not-showing',
      'best-tool-for-seeing-link-preview',
      'preview-social-cards-before-deploying',
      'bulk-link-preview-checker-launch-qa',
    ],
  },
  {
    slug: 'bulk-link-preview-checker',
    title: 'Bulk Link Preview Checker',
    metaTitle: 'Bulk Link Preview Checker | Scan Multiple Social Cards',
    description:
      'Scan multiple URLs, find broken Open Graph tags, compare platform scores, export CSV results, and open full social card mockups for launch QA.',
    keywords: [
      'bulk link preview checker',
      'bulk Open Graph checker',
      'bulk social preview audit',
      'launch QA social previews',
      'multiple URL preview checker',
      'CSV link preview checker',
    ],
    updatedAt,
    heroLabel: 'Launch QA',
    primaryCta: 'Run bulk scan',
    targetKeyword: 'bulk link preview checker',
    intro:
      'Use the Bulk Link Preview Checker when a launch includes many URLs and you need to know which social cards are ready. Paste up to 100 public URLs, scan them together, review platform scores, export a CSV, and open any failed row in the full LinkPeek previewer for deeper inspection.',
    sections: [
      {
        title: 'Scan launch URLs in one pass',
        body:
          'Real campaigns include homepages, landing pages, blog posts, pricing pages, docs, partner pages, and campaign URLs. Checking those one by one is slow and easy to lose track of. Bulk scanning turns social preview QA into a checklist.',
        points: [
          'Check many public URLs without pasting them one at a time',
          'Summarize missing titles, descriptions, images, crawler blocks, and image size problems',
          'See platform scores for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram',
        ],
      },
      {
        title: 'Prioritize fixes before launch',
        body:
          'A bulk report makes it clear which pages are failing and which pages only need polish. Teams can fix critical metadata failures first, then inspect the visual card for the URLs that matter most.',
        points: [
          'Open any URL in the full LinkPeek preview experience',
          'Export a CSV report for developers, clients, or launch checklists',
          'Use the table to prioritize critical failures before warnings and polish items',
        ],
      },
      {
        title: 'Useful for agencies and SEO teams',
        body:
          'Bulk link preview checking is practical for client audits, site migrations, content launches, and campaign QA. It gives teams evidence they can share instead of a long manual list of screenshots.',
        points: [
          'Audit blog and landing page collections',
          'Share CSV findings with stakeholders',
          'Connect summary QA with visual mockup review',
        ],
      },
    ],
    steps: [
      'Collect the URLs that matter for the launch.',
      'Paste the list into the Bulk Link Preview Checker.',
      'Run the scan and review platform scores and main issues.',
      'Open failed URLs in the full LinkPeek mockup view.',
      'Export the CSV and rerun the scan after fixes.',
    ],
    commonIssues: [
      {
        title: 'Some pages have no OG image',
        body:
          'Bulk scanning catches inconsistent CMS templates or route-level metadata gaps across a site section.',
      },
      {
        title: 'Only one URL is correct',
        body:
          'Teams often perfect the homepage but miss campaign pages, blog posts, or docs routes.',
      },
      {
        title: 'Failures are hard to share',
        body:
          'CSV export gives developers and clients a compact list of URLs, scores, and main issues.',
      },
      {
        title: 'A URL needs visual inspection',
        body:
          'Use the Open mockup action to move from table triage to full social-card review.',
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
      {
        question: 'Does bulk scanning work with localhost?',
        answer:
          'The bulk checker is designed for public URLs. Use the main LinkPeek preview workflow for localhost URLs.',
      },
    ],
    relatedToolSlugs: [
      'open-graph-preview-tool',
      'link-preview-checker',
      'whatsapp-link-preview-checker',
      'linkedin-preview-checker',
      'twitter-card-preview',
    ],
    relatedBlogSlugs: [
      'bulk-link-preview-checker-launch-qa',
      'best-tool-for-seeing-link-preview',
      'preview-social-cards-before-deploying',
      'link-preview-not-showing',
    ],
  },
];

export function getSeoToolPage(slug: string) {
  return seoToolPages.find((page) => page.slug === slug);
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  heroEmoji: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'clear-whatsapp-link-preview-cache',
    title: 'How to Clear WhatsApp Link Preview Cache',
    description:
      'Learn practical ways to refresh stale WhatsApp link previews after changing Open Graph titles, descriptions, or images, plus how to verify the fixed metadata.',
    keywords: [
      'clear WhatsApp link preview cache',
      'WhatsApp preview cache',
      'WhatsApp link preview not updating',
      'WhatsApp old image showing',
      'WhatsApp OG image cache',
      'whatsapp link preview checker',
    ],
    category: 'Troubleshooting',
    readTime: '7 min read',
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '💬',
    content: `## Direct Answer

You cannot press one universal "clear cache" button for every WhatsApp link preview. WhatsApp caches Open Graph metadata after a URL is shared, so the practical fix is to confirm the page source is correct, then force WhatsApp to see a changed URL or changed image URL.

The fastest workflow is:

- Verify the current Open Graph tags with the [WhatsApp link preview checker](https://www.getlinkpeek.com/tools/whatsapp-link-preview-checker)
- Update \`og:title\`, \`og:description\`, and \`og:image\` in the page source
- Change the image URL or add a version query like \`?v=2\`
- Retest the canonical URL and a cache-busted URL
- Share the final URL only after the preview is correct

---

## Why WhatsApp Shows an Old Preview

WhatsApp caches link preview data to make chats fast. When someone pastes a URL, WhatsApp reads the Open Graph tags and stores the preview result. If you later change the image, title, or description, WhatsApp may still show the old card because it already has a cached response for that exact URL.

This is why a page can look fixed in your browser while WhatsApp still shows an old image. The browser loads the live page. WhatsApp may be showing cached metadata.

---

## Step 1: Confirm the Metadata Is Actually Fixed

Before blaming cache, check the source. Many teams update the visible page title but forget the social tags.

Use [LinkPeek](https://www.getlinkpeek.com/tools/open-graph-preview-tool) and verify:

- \`og:title\` is the title you want WhatsApp to show
- \`og:description\` is concise and page-specific
- \`og:image\` points to the right image
- \`og:image\` is absolute, HTTPS, and accessible without login
- \`og:url\` matches the canonical URL you plan to share

If those values are still wrong, clearing cache will not help. Fix the source first.

---

## Step 2: Version the Image URL

The cleanest cache refresh is changing the preview image URL when the image changes.

\`\`\`html
<meta property="og:image" content="https://example.com/og/product-launch-v2.jpg" />
\`\`\`

If you cannot rename the file, add a version query:

\`\`\`html
<meta property="og:image" content="https://example.com/og/product-launch.jpg?v=2" />
\`\`\`

This gives WhatsApp a new asset URL to fetch instead of reusing the old cached image.

---

## Step 3: Test a Cache-Busted Page URL

If WhatsApp still shows an old card for the page itself, test a versioned page URL:

\`\`\`
https://example.com/product?v=2
\`\`\`

Do not make random query strings your permanent marketing URL unless you need to. Use this as a test to prove whether the metadata is fixed and whether the problem is cache-related.

---

## Step 4: Avoid Creating Duplicate SEO URLs

Cache-busted URLs are useful for testing, but your canonical URL should stay stable. Keep your canonical tag, sitemap URL, internal links, and \`og:url\` pointed at the clean page URL.

Use a versioned image URL more often than a versioned page URL. That usually refreshes the visual card without splitting link equity across multiple URLs.

---

## Try LinkPeek

Use the [WhatsApp link preview checker](https://www.getlinkpeek.com/tools/whatsapp-link-preview-checker) to verify the current card, then use the [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) to compare the same URL across LinkedIn, X, Slack, Discord, and Instagram before you share it.

---

## FAQ

**Q: Can I directly clear WhatsApp's preview cache?**
A: Not reliably for every user and URL. The practical approach is to fix the tags and change the image URL or test a versioned page URL.

**Q: Why does WhatsApp still show the old image after I changed it?**
A: WhatsApp may have cached the original \`og:image\` response. Rename the image or add a version query to the image URL.

**Q: Should I change my canonical URL to clear cache?**
A: No. Keep the canonical URL clean. Use versioning for testing or for the image asset, not as a permanent SEO workaround.

**Q: How do I know if the issue is cache or bad metadata?**
A: Run the URL through LinkPeek. If the current tags are correct but WhatsApp still shows old data, cache is likely the problem.`,
  },
  {
    slug: 'preview-social-cards-before-deploying',
    title: 'How to Preview Social Cards Before Deploying',
    description:
      'A developer workflow for previewing Open Graph, Twitter Card, WhatsApp, LinkedIn, Slack, and Discord social cards before a page reaches production.',
    keywords: [
      'preview social cards before deploying',
      'test social cards before launch',
      'open graph localhost preview',
      'preview og tags localhost',
      'social card preview tool',
      'test open graph localhost',
    ],
    category: 'Guide',
    readTime: '8 min read',
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'Developer Workflow' },
    heroEmoji: '🧪',
    content: `## Direct Answer

To preview social cards before deploying, run the page locally, add server-rendered Open Graph and Twitter Card tags, then test the localhost URL in a tool that can render platform-specific previews. LinkPeek is built for this workflow because it can preview WhatsApp, LinkedIn, X, Slack, Discord, and Instagram-style cards before a public URL exists.

Start with the [localhost Open Graph preview tool](https://www.getlinkpeek.com/tools/localhost-og-preview) if the page is still in development.

---

## Why Pre-Deploy Preview Testing Matters

Social cards are part of the product surface. A launch page can be visually polished but still share as a plain link if the page source is missing \`og:image\`, the image URL is relative, or the metadata only appears after JavaScript runs.

Waiting until production has two costs:

- You may discover the issue after the link is already shared
- Social platforms may cache the broken version

Testing before deployment lets you fix the page while it is still cheap to change.

---

## Step 1: Add the Core Tags Locally

Every important page should define:

\`\`\`html
<meta property="og:title" content="Page title for social cards" />
<meta property="og:description" content="Short preview description" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
\`\`\`

For local development, you can still verify title, description, layout, and image intent before the final production URL is live. Just remember to switch image and canonical URLs to production-ready absolute URLs before launch.

---

## Step 2: Preview the Localhost URL

Run your app locally and paste the page into LinkPeek:

\`\`\`
http://localhost:3000/my-launch-page
\`\`\`

Use the [test Open Graph localhost page](https://www.getlinkpeek.com/tools/localhost-og-preview) to inspect how the page will look across app-specific layouts. This catches problems that raw metadata output misses, such as awkward title wrapping, weak description copy, and bad image cropping.

---

## Step 3: Check Platform Differences

Do not assume one card preview represents every platform.

WhatsApp can be strict about image access and cache. LinkedIn can show stale images. X needs Twitter Card control. Slack uses \`og:site_name\` as an important brand label. Discord often shows richer descriptions.

Use related tools for specific surfaces:

- [WhatsApp link preview checker](https://www.getlinkpeek.com/tools/whatsapp-link-preview-checker)
- [LinkedIn preview checker](https://www.getlinkpeek.com/tools/linkedin-preview-checker)
- [Twitter/X card preview tool](https://www.getlinkpeek.com/tools/twitter-card-preview)
- [Slack link preview checker](https://www.getlinkpeek.com/tools/slack-link-preview-checker)

---

## Step 4: Retest After Deploying

Pre-deploy testing catches most mistakes, but the final production URL still matters. After deployment, test the canonical URL and confirm:

- The page returns a 200 response
- Open Graph tags are in the server HTML
- The \`og:image\` URL is production HTTPS
- \`og:url\`, canonical URL, sitemap URL, and internal links agree
- Robots rules do not block social crawlers

---

## Try LinkPeek

Start with [LinkPeek's localhost OG preview](https://www.getlinkpeek.com/tools/localhost-og-preview), then run the final production URL through the [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) before the launch post goes out.

---

## FAQ

**Q: Can I preview social cards before a public URL exists?**
A: Yes. LinkPeek supports localhost preview workflows so developers can inspect cards before deployment.

**Q: Do I still need to test production?**
A: Yes. Local previewing catches early issues, but the final canonical URL, HTTPS image, and crawler access must be verified after deployment.

**Q: Is ngrok required for Open Graph testing?**
A: No. ngrok exposes localhost, but LinkPeek focuses on previewing the cards and metadata without turning the workflow into tunnel and cache guessing.

**Q: What is the most common pre-deploy mistake?**
A: Relative image URLs are one of the most common issues. Social crawlers need absolute HTTPS image URLs.`,
  },
  {
    slug: 'open-graph-vs-twitter-cards',
    title: 'Open Graph vs Twitter Cards: What Developers Need to Know',
    description:
      'Understand how Open Graph tags and Twitter Cards work together, which platforms read each tag, and how to configure social previews without duplication.',
    keywords: [
      'Open Graph vs Twitter Cards',
      'Open Graph Twitter Cards',
      'twitter card vs og tags',
      'twitter card preview tool',
      'open graph preview tool',
      'social media meta tags',
    ],
    category: 'Guide',
    readTime: '8 min read',
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'Metadata Guides' },
    heroEmoji: '🏷️',
    content: `## Direct Answer

Open Graph tags are the broad social-preview standard used by platforms such as WhatsApp, LinkedIn, Slack, Discord, Facebook, and many messaging apps. Twitter Cards are X/Twitter-specific tags that give you extra control over card type and X presentation. Developers should usually include both.

Test the combined setup with the [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) and the [Twitter/X card preview tool](https://www.getlinkpeek.com/tools/twitter-card-preview).

---

## The Core Difference

Open Graph describes the page for broad social sharing:

\`\`\`html
<meta property="og:title" content="Your title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://example.com/og.jpg" />
<meta property="og:url" content="https://example.com/page" />
\`\`\`

Twitter Cards describe how X should render the card:

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://example.com/og.jpg" />
\`\`\`

The tags overlap, but they are not identical. The most important unique tag is \`twitter:card\`, which controls the card type on X.

---

## What Happens If You Only Use Open Graph?

Many platforms will work. WhatsApp, LinkedIn, Slack, Discord, and Facebook primarily rely on Open Graph. X can also fall back to Open Graph for title, description, and image.

The risk is card control. Without \`twitter:card\`, X may not render the large image card you expect. For launch posts and image-heavy content, that is enough reason to add Twitter Card tags.

---

## What Happens If You Only Use Twitter Cards?

Your X preview may work, but other platforms can fail. WhatsApp and LinkedIn do not treat Twitter Card tags as the main source of truth. If \`og:title\`, \`og:description\`, and \`og:image\` are missing, those apps may show weak or blank previews.

For broad compatibility, Open Graph should be the foundation.

---

## Recommended Developer Setup

Use one canonical social title and image unless you have a strong reason to customize by platform:

\`\`\`html
<meta property="og:title" content="Launch title" />
<meta property="og:description" content="Short launch summary" />
<meta property="og:image" content="https://example.com/og-launch.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://example.com/launch" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Launch title" />
<meta name="twitter:description" content="Short launch summary" />
<meta name="twitter:image" content="https://example.com/og-launch.jpg" />
\`\`\`

This gives every platform usable data while keeping maintenance simple.

---

## When to Customize Twitter Tags

Customize Twitter Card tags when the X audience needs a shorter title, different framing, or an image crop that works better in the X feed. Keep the canonical URL and core brand message aligned so analytics and previews do not drift.

---

## Try LinkPeek

Use the [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) for broad social preview QA, then verify the X-specific result with the [Twitter/X card preview tool](https://www.getlinkpeek.com/tools/twitter-card-preview).

---

## FAQ

**Q: Are Twitter Cards the same as Open Graph tags?**
A: No. They overlap, but Twitter Cards are X-specific and Open Graph is the broader social-preview standard.

**Q: Does X use Open Graph tags?**
A: X can use Open Graph fallbacks for title, description, and image, but \`twitter:card\` controls card type.

**Q: Should I duplicate every OG tag as a Twitter tag?**
A: You do not have to duplicate every field, but including Twitter Card tags gives better control over X previews.

**Q: Which should I test first?**
A: Test Open Graph first for broad platform coverage, then test Twitter/X cards for X-specific card layout.`,
  },
  {
    slug: 'debug-og-image-cropping',
    title: 'How to Debug OG Image Cropping Across Platforms',
    description:
      'Learn why Open Graph images crop differently on WhatsApp, LinkedIn, X, Slack, Discord, and other apps, plus a practical safe-area workflow.',
    keywords: [
      'debug OG image cropping',
      'Open Graph image cropping',
      'og image crop preview',
      'social card image cropping',
      'WhatsApp OG image crop',
      'LinkedIn preview image crop',
    ],
    category: 'Design QA',
    readTime: '8 min read',
    publishedAt: '2026-06-28',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'Preview Design' },
    heroEmoji: '🖼️',
    content: `## Direct Answer

OG image cropping happens because social platforms render the same source image in different card shapes. A 1200 by 630 image is the safest universal starting point, but WhatsApp, LinkedIn, X, Slack, and Discord can still crop, scale, or frame it differently. The fix is to design with a safe area and preview the image across platforms before sharing.

Use LinkPeek's [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) to compare the card layouts side by side.

---

## Why Cropping Differs by Platform

Open Graph only tells platforms which image to use. It does not force every app to render that image with the same dimensions. Each app has its own card UI, feed width, thumbnail rules, rounded corners, dark mode treatment, and text layout.

That means the same image can look good on LinkedIn but feel cramped on WhatsApp, or look clear on X but lose edge text in Slack.

---

## Start With the Universal Image Size

For most pages, create a 1200 by 630 image. It maps to the common 1.91:1 social preview ratio and works across major platforms.

Keep the most important content away from the edges:

- Place logos and faces near the center
- Avoid important text in the outer 10 percent of the canvas
- Use large text that survives mobile scaling
- Keep file size compressed for crawler reliability
- Use JPG or PNG for broad compatibility

The [Open Graph image size guide](https://www.getlinkpeek.com/blog/og-image-size-guide-2026) covers dimensions in more detail.

---

## Check WhatsApp Cropping

WhatsApp can show compact thumbnails or larger cards depending on the image and context. If the image is too small or visually busy, the preview can feel weak even when the metadata is valid.

Use the [WhatsApp link preview checker](https://www.getlinkpeek.com/tools/whatsapp-link-preview-checker) and verify that the center of the image still communicates the page topic.

---

## Check LinkedIn and X Separately

LinkedIn and X both support large image cards, but the feed context changes how users scan them. X users move quickly through a dense feed, so the image should be instantly readable. LinkedIn cards often sit beside longer professional commentary, so the image should reinforce credibility and not look like a cropped ad.

Use the [LinkedIn preview checker](https://www.getlinkpeek.com/tools/linkedin-preview-checker) and [Twitter/X card preview tool](https://www.getlinkpeek.com/tools/twitter-card-preview) before publishing important posts.

---

## Build a Safe-Area Review Workflow

Before launch, check the same image in every target surface:

1. Preview the URL in LinkPeek.
2. Switch between WhatsApp, LinkedIn, X, Slack, Discord, and Instagram-style cards.
3. Watch for clipped logos, unreadable text, awkward face crops, and low contrast.
4. Adjust the source image, not just the CSS on the page.
5. Retest after uploading the new image URL.

---

## Try LinkPeek

Use the [Open Graph preview tool](https://www.getlinkpeek.com/tools/open-graph-preview-tool) for the full cross-platform comparison, then use the platform-specific tools when WhatsApp, LinkedIn, X, or Slack is the main sharing surface.

---

## FAQ

**Q: What is the safest OG image size?**
A: 1200 by 630 pixels is the safest starting point for broad social preview compatibility.

**Q: Why does my OG image look different on every platform?**
A: Platforms use different card layouts, thumbnail rules, and feed widths, so the same source image can be cropped or scaled differently.

**Q: Should I put text in my OG image?**
A: Yes, but keep it large and centered. Small text near the edges is likely to become unreadable or cropped.

**Q: Can LinkPeek show OG image crop differences?**
A: Yes. LinkPeek renders platform-specific previews so you can compare how the same image appears across major card layouts.`,
  },
  {
    slug: 'best-tool-for-seeing-link-preview',
    title: 'Best Open Graph Preview Tools for Developers',
    description:
      'A practical comparison of Open Graph preview tools for developers who need to test link cards, social previews, metadata, and launch URLs before sharing.',
    keywords: [
      'best Open Graph preview tools',
      'Open Graph preview tools for developers',
      'tool for seeing link preview',
      'best link preview tool',
      'LinkPeek vs OpenGraph.io',
      'OpenGraph.io alternative',
      'Social Share Preview alternative',
      'social preview checker comparison',
      'link preview checker',
      'Open Graph preview tool',
    ],
    category: 'Comparison',
    readTime: '8 min read',
    publishedAt: '2026-06-23',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'Product Comparison' },
    heroEmoji: '🔍',
    content: `## Short Answer

If you searched for a tool for seeing link preview cards before sharing a URL, you are probably trying to answer one simple question:

> Will this link look correct when someone sees it in a social feed, chat, DM, or workspace?

There are a few good tools in this space. [OpenGraph.io](https://www.opengraph.io/link-preview) is strong when you care about Open Graph data, site audits, and API workflows. [Social Share Preview](https://socialsharepreview.com/) is useful when you want a quick lightweight preview for common social platforms. [LinkPeek](https://www.getlinkpeek.com/) is built for visual QA: high-fidelity link preview mockups, metadata audits, copy-paste fixes, and bulk launch checks.

Here is the practical breakdown.

---

## Competitor Comparison

| Tool | Best fit | Strong points | Tradeoff |
|------|----------|---------------|----------|
| [LinkPeek](https://www.getlinkpeek.com/) | Visual preview QA before posting or launching | High-fidelity mockups for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram-style cards; metadata audit; copy-paste fixes; bulk checker for up to 100 URLs | Focused on preview QA, not a dedicated link-preview API business |
| [OpenGraph.io](https://www.opengraph.io/link-preview) | Teams that need a preview checker plus API or site-audit path | Public page lists Facebook, LinkedIn, X, Slack, and Google previews; checks title, description, image, Open Graph tags, and Twitter/X tags; offers account-based saved reports and site audit workflows | Can be heavier than needed if you only want to visually inspect one shared link |
| [Social Share Preview](https://socialsharepreview.com/) | Simple social preview check | Public page focuses on Twitter, Facebook, LinkedIn, and Pinterest previews; includes a browser-extension entry point; connects naturally with Placid creative tools | Narrower if you need bulk QA, platform scoring, or developer-ready metadata fixes |

No single tool should be treated as the best for every workflow. The right choice depends on whether you need a quick visual check, API infrastructure, creative automation, or a repeatable launch QA process.

---

## When LinkPeek Is the Better Choice

Use [LinkPeek](https://www.getlinkpeek.com/) when the preview itself matters as much as the raw metadata.

That usually means:

- You are about to post a launch link on LinkedIn, X, WhatsApp, Slack, Discord, or a community channel
- You want to see how the title, description, image, and URL feel inside real app-style layouts
- You need to catch missing images, weak descriptions, oversized assets, crawler problems, or truncation risk
- You want copy-paste metadata fixes instead of only reading raw tags
- You have more than one URL to check before a campaign goes live

The core difference is that LinkPeek treats social previews like a visual product surface. A card can be technically valid and still look weak. The title can be too long. The image can crop badly. The description can read like boilerplate. A simple tag dump will not always make those problems obvious.

Try the main checker here: [https://www.getlinkpeek.com/](https://www.getlinkpeek.com/)

For launch pages, campaign URLs, blog rollouts, and client handoffs, use the bulk checker: [https://www.getlinkpeek.com/tools/bulk-link-preview-checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker)

---

## When OpenGraph.io Is the Better Choice

OpenGraph.io is a strong fit when your use case goes beyond manually checking a link preview.

Choose OpenGraph.io if:

- You need a link-preview or unfurling API for your app
- You want a broader Open Graph data extraction workflow
- You care about saved preview reports or account-based site audit workflows
- Your team is comparing metadata, screenshots, scraping, and preview services together

Its public link preview page positions the tool around checking title, description, image, Open Graph tags, Twitter/X tags, and multiple platform previews. It also points users toward site audit and API workflows, which makes sense for teams that want infrastructure rather than only a visual QA tool.

For a developer building link unfurling into a product, OpenGraph.io may be the better starting point. For a marketer, founder, or agency checking whether a shared card looks right before publishing, LinkPeek is usually faster to reason about.

---

## When Social Share Preview Is the Better Choice

Social Share Preview is useful when you want a quick, simple preview check without a heavier workflow.

Choose it if:

- You mainly care about Facebook, Twitter/X, LinkedIn, or Pinterest share previews
- You want a lightweight social share preview page
- You like having a browser-extension entry point
- You are already using Placid or exploring automated share-image generation

It is a clean option for a single-page check. The tradeoff is that it is less focused on audit depth, bulk URL checks, and developer handoff. If your workflow is "paste one URL and glance at the major social cards," Social Share Preview can be enough. If your workflow is "find every broken launch URL and give fixes to the team," LinkPeek is better aligned.

---

## Which Tool Should You Use?

| Situation | Recommended tool |
|-----------|------------------|
| I want to see how one link looks before posting it | LinkPeek or Social Share Preview |
| I want high-fidelity mockups across chat and social apps | LinkPeek |
| I want to check many launch URLs together | LinkPeek Bulk Link Preview Checker |
| I need a link-preview API for my own product | OpenGraph.io |
| I want saved reports or a broader site audit workflow | OpenGraph.io |
| I want a simple social preview page for common social networks | Social Share Preview |
| I need copy-paste fixes for Open Graph and social metadata | LinkPeek |

---

## The Search Intent Behind "Tool for Seeing Link Preview"

Most people do not search this query because they want a long explanation of Open Graph tags. They search it because they have a URL in hand and they are unsure what will happen after they share it.

The common fears are practical:

- Will the image show?
- Will WhatsApp render a full card or a plain link?
- Will LinkedIn use the wrong image?
- Will Slack show stale metadata?
- Is the title too long?
- Did the CMS publish the right description?
- Are all campaign URLs ready, or only the homepage?

That is why a useful tool for seeing link preview cards should do more than show raw tags. It should connect the metadata to the actual card experience.

---

## Recommended Workflow Before You Share a Link

1. Paste the URL into [LinkPeek](https://www.getlinkpeek.com/).
2. Review the visual previews across supported apps.
3. Check the audit findings for missing or weak metadata.
4. Copy the suggested fixes into your page head, CMS, or framework metadata config.
5. Re-run the preview after deploying the fix.
6. If the page is part of a launch, paste all important URLs into the [Bulk Link Preview Checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker).
7. Export the results or share the failed URLs with the person fixing metadata.

That gives you a repeatable QA step instead of a last-minute social post surprise.

---

## Final Verdict

Use OpenGraph.io when API, site audit, and data extraction workflows matter most.

Use Social Share Preview when you want a lightweight single-page social preview check.

Use LinkPeek when you want to actually see, audit, fix, and bulk-check link previews before your audience sees them.

Start here: [https://www.getlinkpeek.com/](https://www.getlinkpeek.com/)

For multiple URLs, use: [https://www.getlinkpeek.com/tools/bulk-link-preview-checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker)`,
  },
  {
    slug: 'bulk-link-preview-checker-launch-qa',
    title: 'Bulk Link Preview Checker: QA Every Social Card Before Launch',
    description:
      'Learn how bulk link preview testing helps marketers, agencies, founders, and developers catch broken social cards across many URLs before a campaign goes live.',
    keywords: [
      'bulk link preview checker',
      'bulk Open Graph checker',
      'launch QA social previews',
      'social card audit',
      'Open Graph audit multiple URLs',
      'link preview QA',
      'campaign URL checker',
    ],
    category: 'Launch QA',
    readTime: '7 min read',
    publishedAt: '2026-06-20',
    updatedAt: '2026-06-20',
    author: { name: 'LinkPeek Team', role: 'Launch QA' },
    heroEmoji: '🚀',
    content: `## The Problem With Checking Links One by One

Most teams do not launch one URL at a time.

A real launch usually includes a homepage, pricing page, product pages, landing pages, blog posts, documentation, newsletter links, partner pages, and campaign URLs. If even one of those pages has a missing \`og:image\`, a bad title, a blocked crawler, or an oversized image, the link can look broken when it gets shared.

That is why single URL preview tools are useful, but not enough for launch QA. They help you inspect one page deeply. They do not help you answer the bigger launch question:

> Are all of our important URLs ready to be shared?

The [Bulk Link Preview Checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker) is built for that exact moment.

---

## What the Bulk Link Preview Checker Does

The tool lets you paste a list of public URLs and scan them together. Instead of checking each page manually, LinkPeek audits the batch and gives you a compact table of what needs attention.

You can use it to:

- Scan up to 100 public URLs in one run
- Check Open Graph and social preview metadata across multiple pages
- See per-platform scores for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram
- Find missing titles, descriptions, preview images, crawler blocks, and image problems
- Export the results as a CSV report
- Open any row in the full pixel-perfect LinkPeek previewer

Try it here: [Bulk Link Preview Checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker)

---

## Why Bulk Testing Is Useful

### 1. It Saves Time Before a Launch

If you have 30 campaign URLs, checking them one by one is slow. It is also easy to lose track of which URLs passed and which ones still need fixes.

With bulk testing, you paste the full URL list once and get a table back. That table becomes your launch QA checklist.

### 2. It Finds Problems Hidden Across the Site

One landing page might have a perfect preview. Another might be missing \`twitter:card\`. A blog post might use an image that is too large for WhatsApp. A pricing page might have a title that gets cut off in the feed.

Bulk testing helps you spot these inconsistencies quickly.

### 3. It Makes Social Preview QA Easy to Share

The CSV export is useful for agencies, developers, and marketing teams. You can send a clean list of failed URLs, scores, and main issues instead of writing a long manual audit.

That makes it easier to hand fixes to the right person.

### 4. It Connects Summary QA With Pixel-Perfect Review

The bulk table is intentionally compact. It is for triage.

When a URL needs deeper review, click **Open mockup** and LinkPeek loads that URL in the full preview experience. That means you can move from batch QA to visual inspection without copying the URL again.

---

## Who Should Use It?

### Marketing Teams

Use it before campaigns, launches, newsletters, and social announcements. A broken card can make a polished launch look unfinished.

### Agencies

Use it to audit client URLs before sending final reports or publishing campaign links. The CSV export gives you a simple deliverable.

### Founders

Use it before posting to Product Hunt, LinkedIn, X, Reddit, newsletters, and communities. Your launch links should look right the first time.

### Developers

Use it before release to catch missing metadata, bad image URLs, and crawler issues across multiple routes.

### SEO Teams

Use it when auditing site sections where social sharing matters: blog posts, comparison pages, landing pages, product pages, and guides.

---

## What to Check Before You Share a URL

| Check | Why it matters |
|------|----------------|
| \`og:title\` | Controls the headline shown in social cards |
| \`og:description\` | Controls the supporting preview text |
| \`og:image\` | Determines whether the card has a strong visual |
| Image size | Oversized or tiny images can fail or look weak |
| HTTPS image URL | Some platforms reject insecure preview images |
| \`twitter:card\` | Helps X render the right card style |
| Crawler access | Blocked bots can prevent previews from rendering |

The bulk checker is useful because it does not only tell you whether tags exist. It helps you see which URLs are risky before the audience sees them.

---

## Recommended Launch Workflow

1. Collect all launch URLs in a spreadsheet.
2. Paste the URLs into the [Bulk Link Preview Checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker).
3. Run the scan.
4. Sort mentally by critical failures first.
5. Open failed URLs in the full mockup view.
6. Fix metadata in your app, CMS, or site builder.
7. Re-run the scan before the campaign goes live.
8. Export the CSV report for your team or client.

This turns social preview QA from a last-minute manual check into a repeatable launch step.

---

## Why LinkPeek Is Different

Many tools focus on raw tags. Raw tags are useful, but they do not show how the link will feel when someone sees it in a real social app.

LinkPeek combines two things:

- Bulk metadata scanning for many URLs
- Pixel-perfect social preview mockups for deep visual review

That combination matters. A technically valid card can still look weak, cropped, generic, or unclear. LinkPeek helps you catch both the metadata problems and the visual presentation problems.

---

## Start With Your Next Launch

If you are preparing a campaign, product launch, blog rollout, or client handoff, run the URLs through LinkPeek before publishing.

Use the tool here:

[https://www.getlinkpeek.com/tools/bulk-link-preview-checker](https://www.getlinkpeek.com/tools/bulk-link-preview-checker)

Your links should not look broken after they are already in the feed. Check them before they get shared.`,
  },
  {
    slug: 'whatsapp-link-preview-not-working',
    title: 'Why WhatsApp Link Preview Image Is Not Showing',
    description:
      'Learn why WhatsApp link preview images fail, how to fix missing OG images, how cache affects previews, and how to test WhatsApp cards before sharing.',
    keywords: [
      'WhatsApp link preview not working',
      'WhatsApp OG image not showing',
      'fix WhatsApp link preview',
      'WhatsApp preview image size',
      'og:image WhatsApp',
      'link preview checker',
      'WhatsApp link preview tool',
    ],
    category: 'Troubleshooting',
    readTime: '8 min read',
    publishedAt: '2026-05-20',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '💬',
    content: `## Why Your WhatsApp Link Preview Isn't Showing

When you share a URL on WhatsApp and see nothing but a plain text link—no image, no title, no description—it's almost always a problem with your Open Graph (OG) meta tags or your image specs. WhatsApp is the **strictest platform** when it comes to link previews, and even small mistakes can break them entirely.

Here's what's actually happening behind the scenes: when someone pastes a URL in WhatsApp, WhatsApp's crawler fetches your page, reads the OG tags, and decides whether to render a rich preview or just show the raw URL. If anything is off, you get nothing.

---

## The 7 Most Common Causes (and How to Fix Each One)

### 1. Your OG Image Is Too Large (File Size)

**WhatsApp's limit: 600 KB maximum.**

This is the #1 reason link previews break on WhatsApp. Unlike Facebook (8 MB) or Twitter (5 MB), WhatsApp enforces a strict 600 KB file size cap. If your image exceeds this, WhatsApp silently drops it—no error message, no fallback. Your link just appears as plain text.

**Fix:**
\`\`\`html
<!-- Ensure your image is under 600 KB -->
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<!-- Use JPG at 80% quality for best size-to-quality ratio -->
\`\`\`

Use tools like TinyPNG or Squoosh to compress your image. Target **200–400 KB** for a safe margin.

### 2. Your Image Dimensions Are Below the Minimum

WhatsApp requires a **minimum of 100×100 pixels**. Below that, no preview image is shown at all—not even a thumbnail.

But there's more nuance here:
- **100–299 px width** → Small thumbnail beside the URL
- **≥ 300 px width** → Full-width card with image, title, and description

**Recommended dimensions:** 1200×630 px (1.91:1 aspect ratio). This is the "golden ratio" that works perfectly on every platform.

### 3. You're Using an Unsupported Image Format

WhatsApp does **NOT** support:
- ❌ GIF images
- ❌ SVG images

**Supported formats:** JPG, JPEG, PNG, WebP only.

If you're using an SVG logo or an animated GIF as your OG image, WhatsApp will ignore it completely.

### 4. Your Image URL Uses HTTP Instead of HTTPS

WhatsApp requires HTTPS for OG images. An HTTP URL will be rejected:

\`\`\`html
<!-- ❌ Won't work -->
<meta property="og:image" content="http://yoursite.com/og.jpg" />

<!-- ✅ Works -->
<meta property="og:image" content="https://yoursite.com/og.jpg" />
\`\`\`

### 5. Your Image URL Is Relative, Not Absolute

OG image URLs must be absolute (full) URLs, not relative paths:

\`\`\`html
<!-- ❌ Won't work -->
<meta property="og:image" content="/images/og.jpg" />

<!-- ✅ Works -->
<meta property="og:image" content="https://yoursite.com/images/og.jpg" />
\`\`\`

### 6. Your robots.txt Is Blocking WhatsApp's Crawler

WhatsApp uses a crawler (user-agent: \`WhatsApp\`) to fetch your page. If your \`robots.txt\` blocks it, no preview will be generated.

Check your \`/robots.txt\` file and make sure it doesn't disallow the WhatsApp crawler:

\`\`\`
# ✅ Allow WhatsApp crawler
User-agent: WhatsApp
Allow: /
\`\`\`

### 7. WhatsApp's Cache Is Stale

WhatsApp aggressively caches link previews. Even after fixing your OG tags, the old (broken) preview might persist for hours or days.

**Cache-busting methods:**
- Append a query parameter: \`yoursite.com/page?v=2\`
- On iOS: Delete the conversation and start a new one
- On Android: Settings → Storage → Clear Cache

---

## The Perfect WhatsApp OG Tag Setup

Here's the complete, battle-tested tag setup that guarantees a working WhatsApp preview:

\`\`\`html
<meta property="og:title" content="Your Page Title (60-65 chars max)" />
<meta property="og:description" content="Compelling description under 80 characters for WhatsApp" />
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://yoursite.com/page" />
<meta property="og:type" content="website" />
\`\`\`

### Quick Specs Reference

| Spec | Requirement |
|------|-------------|
| **Image size** | Under 600 KB |
| **Min dimensions** | 100×100 px (300+ for full card) |
| **Recommended** | 1200×630 px |
| **Formats** | JPG, PNG, WebP only |
| **URL** | Absolute, HTTPS |
| **Title limit** | ~65 characters |
| **Description limit** | ~80 characters |

---

## How to Test Your WhatsApp Link Preview

Before sharing your link publicly, use [LinkPeek](https://www.getlinkpeek.com) to preview exactly how your link will appear on WhatsApp (and 5 other platforms). LinkPeek shows you the live WhatsApp mockup, audits your OG tags, and generates fix code if anything is wrong.

Unlike other tools, LinkPeek:
- Shows real platform mockups (not just raw tag data)
- Checks WhatsApp-specific requirements (600 KB limit, format support, dimension checks)
- Generates copy-paste fix code for every issue found
- Works with localhost URLs (for developers testing before deployment)

---

## FAQ: WhatsApp Link Preview Issues

**Q: Why does my preview work on Twitter but not WhatsApp?**
A: WhatsApp has much stricter requirements. Twitter accepts images up to 5 MB in various formats, while WhatsApp limits you to 600 KB and rejects GIF/SVG.

**Q: I fixed my tags but the old preview still shows. Why?**
A: WhatsApp caches aggressively. Append \`?v=2\` to your URL or clear WhatsApp's cache to see the updated preview.

**Q: Does WhatsApp use Twitter Card tags?**
A: No. WhatsApp only reads Open Graph tags (\`og:\` prefix). Twitter Card tags (\`twitter:\` prefix) are completely ignored.

**Q: Can I use multiple og:image tags?**
A: No. Using multiple \`og:image\` tags causes unpredictable behavior on WhatsApp. Use only one.`,
  },

  {
    slug: 'og-image-size-guide-2026',
    title: 'Open Graph Image Size for WhatsApp, LinkedIn and X',
    description:
      'Recommended Open Graph image dimensions, file sizes, formats, and cropping guidance for WhatsApp, LinkedIn, X, Slack, Discord, Instagram, and Facebook.',
    keywords: [
      'og image size',
      'Open Graph image dimensions',
      'og:image size requirements',
      'social media image size 2026',
      'og image dimensions',
      'Facebook OG image size',
      'Twitter card image size',
      'LinkedIn preview image size',
    ],
    category: 'Reference',
    readTime: '10 min read',
    publishedAt: '2026-05-18',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '📐',
    content: `## The Universal OG Image: One Size to Rule Them All

If you only remember one thing from this guide, let it be this:

> **1200×630 pixels, JPG format, under 300 KB** works perfectly on every major platform.

That's the "golden image" specification. But if you want to optimize for each platform individually—or understand why your preview looks wrong on a specific app—read on.

---

## Platform-by-Platform Breakdown

### WhatsApp

WhatsApp is the most restrictive platform for link previews. Get any spec wrong, and you get **zero preview**—not even a degraded one.

| Spec | Value | What Happens If Wrong |
|------|-------|-----------------------|
| **Max file size** | 600 KB | No preview image at all |
| **Min dimensions** | 100×100 px | No preview shown whatsoever |
| **Small preview** | 100–299 px width | Tiny thumbnail beside URL |
| **Full-width card** | ≥ 300 px width | Full preview with image, title, description |
| **Recommended** | 1200×630 px | Perfect full-width card |
| **Formats** | JPG, PNG, WebP | GIF and SVG are rejected |

**Pro tip:** WhatsApp accepts any aspect ratio (including 1:1 square), but 1.91:1 gives you the most visual real estate.

### Facebook

Facebook is the most lenient platform, accepting larger files and more formats.

| Spec | Value | What Happens If Wrong |
|------|-------|-----------------------|
| **Max file size** | 8 MB | No image shown |
| **Min dimensions** | 200×200 px | No image shown |
| **Compact preview** | Width ≤ 445 px OR ratio ≤ 0.797 | Small thumbnail beside link |
| **Expanded preview** | Width > 445 px, Height > 232 px, Ratio > 0.797 | Full-width card |
| **Recommended** | 1200×630 px (1.91:1) | Perfect expanded card |
| **Formats** | JPG, PNG, WebP, GIF, SVG | All standard formats accepted |

### Twitter/X

Twitter has two card types with different requirements:

| Spec | Summary Card | Summary Large Image |
|------|-------------|---------------------|
| **Dimensions** | 144×144 to 4096×4096 | 300×157 to 4096×4096 |
| **Aspect ratio** | 1:1 | 2:1 |
| **Max file size** | 5 MB | 5 MB |
| **Formats** | JPG, PNG, WebP, GIF | JPG, PNG, WebP, GIF |

**Important:** Twitter requires the \`twitter:card\` meta tag. Without it, the default card type is used. For large preview images, set:

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
\`\`\`

### LinkedIn

LinkedIn has aggressive caching and specific quirks:

| Spec | Value | Notes |
|------|-------|-------|
| **Recommended** | 1200×627 px (1.91:1) | |
| **Min dimensions** | 200×200 px | |
| **Max file size** | 5 MB | |
| **Formats** | JPG, PNG, GIF | No WebP, no SVG |
| **Caching** | Very aggressive | Use Post Inspector to refresh |

**Warning:** LinkedIn is notorious for image redirect issues. If your OG image URL involves multiple redirects (e.g., CDN → origin → final URL), LinkedIn will often fail to load it.

### Instagram DMs

| Spec | Value |
|------|-------|
| **Max file size** | 8 MB |
| **Recommended ratio** | 1.91:1 (1200×630) |
| **Formats** | JPG, PNG, WebP, GIF, SVG |
| **Twitter cards** | Ignored—only OG tags |

### Discord

| Spec | Value |
|------|-------|
| **Title limit** | 256 characters |
| **Description limit** | ~350 characters |
| **og:type** | Matters—Discord styles types differently |

### Slack

| Spec | Value |
|------|-------|
| **og:site_name** | Critical—used as bold header |
| **Fallback** | Domain is guessed if \`og:site_name\` is missing |

---

## The Complete OG Tag Setup for All Platforms

This HTML snippet covers every platform's requirements:

\`\`\`html
<!-- Open Graph (Facebook, WhatsApp, Instagram, LinkedIn, Discord, Slack) -->
<meta property="og:title" content="Your Title — 60 chars optimal" />
<meta property="og:description" content="Compelling description, 150-200 chars" />
<meta property="og:image" content="https://yoursite.com/og-1200x630.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://yoursite.com/page" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Your Site Name" />

<!-- Twitter Card (overrides OG if present) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/og-1200x630.jpg" />
<meta name="twitter:site" content="@yourusername" />
\`\`\`

---

## Text Limits by Platform

Don't just optimize your images—your title and description have character limits too:

| Platform | Title Limit | Description Limit |
|----------|-------------|-------------------|
| WhatsApp | ~65 chars | ~80 chars |
| Twitter/X | ~70 chars | Varies |
| LinkedIn | ~150 chars | Varies |
| Facebook | ~88 chars | ~200 chars |
| Discord | 256 chars | ~350 chars |
| Instagram | Short preferred | If space allows |
| **Safe universal** | **60 chars** | **150 chars** |

---

## Key Stats: Why OG Images Matter

| Stat | Impact |
|------|--------|
| Rich previews | **2× more clicks** than plain URLs |
| Optimized OG images | **179% more engagement** |
| A/B testing OG images | Up to **47% CTR increase** |
| Tweets with cards | **2× more engagement** |
| LinkedIn posts with images | **2× more engagement** |

---

## Test Your OG Images Before Sharing

Use [LinkPeek](https://www.getlinkpeek.com) to preview your link across WhatsApp, Twitter, LinkedIn, Slack, Discord, and Instagram simultaneously. It checks all platform-specific requirements and tells you exactly what needs fixing.`,
  },

  {
    slug: 'twitter-card-not-displaying',
    title: 'Twitter/X Card Not Updating? Complete Fix',
    description:
      'Diagnose stale Twitter/X cards, missing summary large images, old titles, blocked crawler access, and Twitter Card metadata issues with a practical fix workflow.',
    keywords: [
      'Twitter card not displaying',
      'Twitter card image not showing',
      'fix Twitter card',
      'twitter:card meta tag',
      'Twitter card validator',
      'Twitter summary_large_image',
      'X card preview',
      'Open Graph Twitter',
    ],
    category: 'Troubleshooting',
    readTime: '7 min read',
    publishedAt: '2026-05-15',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '🐦',
    content: `## Why Your Twitter Card Isn't Showing

You've carefully crafted a tweet with a link, hit publish, and… nothing. No card. No image. Just a bare URL staring back at you. Sound familiar?

Twitter/X cards are how your links look when shared on the platform. When they work, they show a rich preview with your image, title, and description—dramatically increasing engagement. When they don't, your tweet looks like spam.

Let's fix that.

---

## Step 1: Check If You Have the Required Meta Tags

Twitter/X needs specific meta tags to render cards. At minimum, you need:

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your description here" />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />
\`\`\`

**The \`twitter:card\` tag is required.** Without it, Twitter defaults to the most basic card type. The most common values are:

- \`summary\` — Small square image with title and description
- \`summary_large_image\` — Large rectangular image above title and description (recommended for most sites)

### Twitter Falls Back to OG Tags

If you don't have Twitter-specific tags, Twitter will use your Open Graph tags instead:

| Twitter Tag | Falls Back To |
|-------------|---------------|
| \`twitter:title\` | \`og:title\` |
| \`twitter:description\` | \`og:description\` |
| \`twitter:image\` | \`og:image\` |

**But \`twitter:card\` has NO fallback.** You must include it explicitly.

---

## Step 2: Verify Your Image Specs

Twitter is relatively lenient with images compared to WhatsApp, but there are still requirements:

### Summary Card (\`summary\`)
- **Min:** 144×144 px
- **Max:** 4096×4096 px
- **Aspect ratio:** 1:1 (square)
- **Max file size:** 5 MB

### Summary Large Image (\`summary_large_image\`)
- **Min:** 300×157 px
- **Max:** 4096×4096 px
- **Aspect ratio:** 2:1
- **Max file size:** 5 MB
- **Formats:** JPG, PNG, WebP, GIF

---

## Step 3: Add \`twitter:site\` for Attribution

While optional, the \`twitter:site\` tag links your card to your Twitter/X account:

\`\`\`html
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorname" />
\`\`\`

This adds credibility and drives followers. Without it, the card works but shows no attribution.

---

## Step 4: Debug with Twitter's Card Validator

Twitter's Card Validator (cards-dev.twitter.com/validator) lets you preview your card and force a cache refresh. Enter your URL and click "Preview card."

**Common validator errors:**
- **"Card not found"** — Missing \`twitter:card\` meta tag
- **"Image not found"** — Image URL is wrong, returns 404, or exceeds 5 MB
- **"Unable to render Card preview"** — robots.txt is blocking Twitterbot

---

## Step 5: Check robots.txt

Twitter's crawler uses the user-agent \`Twitterbot\`. Make sure your \`robots.txt\` doesn't block it:

\`\`\`
User-agent: Twitterbot
Allow: /
\`\`\`

---

## The Complete, Correct Twitter Card Setup

Here's the battle-tested meta tag setup:

\`\`\`html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorname" />
<meta name="twitter:title" content="Your Title (under 70 chars)" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/og-1200x630.jpg" />
<meta name="twitter:image:alt" content="Description of the image" />

<!-- Also include OG tags for other platforms -->
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/og-1200x630.jpg" />
<meta property="og:url" content="https://yoursite.com/page" />
<meta property="og:type" content="website" />
\`\`\`

---

## FAQ

**Q: Do I need both OG tags and Twitter Card tags?**
A: You need at least \`twitter:card\`. For \`title\`, \`description\`, and \`image\`, Twitter falls back to OG tags if Twitter-specific tags are missing. Best practice: include both.

**Q: How long does Twitter take to update cached cards?**
A: Usually within a few minutes. Use the Card Validator to force a refresh.

**Q: Why does my card work on some URLs but not others?**
A: Each URL needs its own valid meta tags. If some pages have correct tags and others don't, only the correctly tagged pages will show cards.

Use [LinkPeek](https://www.getlinkpeek.com) to test your Twitter card alongside previews for 5 other platforms before publishing.`,
  },

  {
    slug: 'linkedin-preview-image-wrong',
    title: 'LinkedIn Preview Not Showing Image: How to Fix It',
    description:
      'Fix LinkedIn previews that show no image, the wrong image, or stale metadata. Learn the Open Graph setup, cache refresh workflow, and image requirements.',
    keywords: [
      'LinkedIn preview image wrong',
      'LinkedIn link preview not showing',
      'LinkedIn OG image not updating',
      'LinkedIn Post Inspector',
      'fix LinkedIn preview',
      'LinkedIn preview image size',
      'LinkedIn cache clear',
      'LinkedIn og:image',
    ],
    category: 'Troubleshooting',
    readTime: '6 min read',
    publishedAt: '2026-05-12',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '💼',
    content: `## The LinkedIn Preview Problem

LinkedIn is notorious for two things when it comes to link previews:

1. **Showing the wrong image** (or no image at all)
2. **Refusing to update** even after you fix your OG tags

Both problems stem from LinkedIn's aggressive caching and its strict requirements for OG images. Let's fix both.

---

## Why LinkedIn Shows the Wrong Image

### Cause 1: LinkedIn's Cache Is Stale

LinkedIn caches link preview data very aggressively—sometimes for weeks. Even after updating your OG tags, LinkedIn continues showing the old preview.

**Fix:** Use LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) tool:
1. Paste your URL
2. Click "Inspect"
3. LinkedIn will re-fetch your page and update its cache

### Cause 2: Image Redirect Chains

This is LinkedIn's most common and frustrating issue. If your OG image URL involves redirects (even standard CDN redirects), LinkedIn often fails to follow them.

\`\`\`
❌ og:image → 301 → CDN → 302 → final.jpg (LinkedIn gives up)
✅ og:image → final.jpg (direct, no redirects)
\`\`\`

**Fix:** Make sure your \`og:image\` URL points directly to the final image file, with zero redirects.

### Cause 3: Image Dimensions Too Small

LinkedIn requires a **minimum of 200×200 pixels**. Below that, no image is shown.

**Recommended:** 1200×627 px (1.91:1 aspect ratio).

### Cause 4: Unsupported Image Format

LinkedIn supports JPG, PNG, and GIF. **WebP and SVG are NOT supported.**

| Format | LinkedIn Support |
|--------|-----------------|
| JPG/JPEG | ✅ |
| PNG | ✅ |
| GIF | ✅ |
| WebP | ❌ |
| SVG | ❌ |

---

## The Correct LinkedIn OG Tag Setup

\`\`\`html
<meta property="og:title" content="Your Title (up to 150 chars on LinkedIn)" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/og-1200x627.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="627" />
<meta property="og:url" content="https://yoursite.com/page" />
<meta property="og:type" content="article" />
\`\`\`

### LinkedIn-Specific Tips

1. **Use \`og:type\` = \`article\`** for blog posts and articles. LinkedIn renders these differently than \`website\`.
2. **Include \`og:image:width\` and \`og:image:height\`** — this helps LinkedIn render the preview faster without having to fetch the image first to determine dimensions.
3. **Keep your image URL simple** — no query parameters, no redirects, no authentication required.

---

## Debugging Checklist

- [ ] Image is at least 200×200 px (ideally 1200×627)
- [ ] Image is under 5 MB
- [ ] Image format is JPG, PNG, or GIF (not WebP or SVG)
- [ ] Image URL is absolute HTTPS with no redirects
- [ ] \`og:title\`, \`og:description\`, \`og:image\`, \`og:url\` all present
- [ ] Run through LinkedIn Post Inspector to clear cache
- [ ] No robots.txt blocking LinkedIn's crawler

---

## Key Stats

Posts with properly configured link previews on LinkedIn get **2× more engagement** than those without images. For a platform where B2B engagement drives revenue, that's significant.

---

## Test Before You Post

Use [LinkPeek](https://www.getlinkpeek.com) to preview your LinkedIn link card alongside WhatsApp, Twitter, Slack, Discord, and Instagram. Fix issues before they embarrass you in front of your professional network.`,
  },

  {
    slug: 'open-graph-meta-tags-guide',
    title: 'Open Graph Meta Tags: The Complete Guide for 2026',
    description:
      'Master Open Graph meta tags in 2026. Learn every OG tag, what each does, which platforms read them, common mistakes, and how to test your tags before publishing.',
    keywords: [
      'Open Graph meta tags',
      'og tags guide',
      'what are Open Graph tags',
      'og:title',
      'og:description',
      'og:image',
      'meta tags for social media',
      'Open Graph protocol',
      'social media meta tags',
    ],
    category: 'Guide',
    readTime: '12 min read',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-23',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '🏷️',
    content: `## What Are Open Graph Meta Tags?

Open Graph (OG) tags are snippets of HTML that control how your web pages appear when shared on social media, messaging apps, and other platforms. They were created by Facebook in 2010 and have since become the universal standard for link previews across the internet.

When someone shares your URL on WhatsApp, Twitter, LinkedIn, Slack, Discord, Instagram, or Facebook, these platforms read your OG tags to decide:
- What **image** to show
- What **title** to display
- What **description** to include
- What **site name** to attribute

Without OG tags, platforms either show nothing or guess—and they usually guess badly.

---

## The Essential OG Tags (Every Page Needs These)

### 1. \`og:title\` — The Headline

\`\`\`html
<meta property="og:title" content="Your Page Title" />
\`\`\`

This is the bold headline in link previews. Keep it under **60 characters** for universal compatibility (WhatsApp truncates at ~65, Twitter at ~70).

**Tips:**
- Don't duplicate your \`<title>\` tag verbatim—write a more compelling, shareable version
- Don't use ALL CAPS (looks spammy, hurts CTR)
- Include your primary keyword naturally

### 2. \`og:description\` — The Subtitle

\`\`\`html
<meta property="og:description" content="A brief, compelling summary" />
\`\`\`

The supporting text beneath the title. Aim for **150 characters** as the safe universal limit.

**Tips:**
- Include a call-to-action or value proposition
- Don't stuff keywords—write for humans
- Different from your meta description (optimize for the sharing context)

### 3. \`og:image\` — The Hero Image

\`\`\`html
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
\`\`\`

The most impactful tag. Posts with images get **179% more engagement**. Use the golden spec: **1200×630 px, JPG, under 300 KB**.

**Critical rules:**
- Must be an **absolute HTTPS URL**
- Only use **one** \`og:image\` tag (multiple = unpredictable)
- Never use SVG (unsupported on WhatsApp and Twitter)
- Include \`og:image:width\` and \`og:image:height\` for faster rendering

### 4. \`og:url\` — The Canonical URL

\`\`\`html
<meta property="og:url" content="https://yoursite.com/page" />
\`\`\`

The canonical URL for this content. This tells platforms which URL to associate the preview data with, preventing duplicate previews for the same content served at different URLs.

### 5. \`og:type\` — The Content Type

\`\`\`html
<meta property="og:type" content="website" />
\`\`\`

Tells platforms what kind of content this is. Common values:
- \`website\` — Default for most pages
- \`article\` — Blog posts, news articles
- \`product\` — E-commerce products

Discord, notably, renders different \`og:type\` values with distinct styling.

---

## Recommended (But Optional) OG Tags

### \`og:site_name\`

\`\`\`html
<meta property="og:site_name" content="LinkPeek" />
\`\`\`

The name of your website. **Critical for Slack**, which uses it as the bold header when unfurling links. Facebook and other platforms use it as a subtle attribution label.

### \`og:locale\`

\`\`\`html
<meta property="og:locale" content="en_US" />
\`\`\`

The language and region of the content. Useful for multilingual sites.

### \`og:image:type\`

\`\`\`html
<meta property="og:image:type" content="image/jpeg" />
\`\`\`

Explicitly declares the image format. Helps platforms pre-validate the image without fetching it.

---

## Twitter-Specific Tags

Twitter reads OG tags as fallbacks but has its own tag system:

\`\`\`html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorname" />
\`\`\`

**Note:** \`twitter:card\` has NO OG fallback—you must include it explicitly for Twitter card functionality.

---

## The 10 Most Common OG Tag Mistakes

1. **Relative image URLs** — Must be absolute \`https://\` URLs
2. **HTTP instead of HTTPS** — Most platforms reject HTTP images
3. **SVG or GIF images** — Not supported on WhatsApp; GIF not on LinkedIn
4. **Image too small** — Below 100px (WhatsApp) or 200px (Facebook/LinkedIn)
5. **Image too large (file size)** — Over 600 KB kills WhatsApp previews
6. **Duplicate title and description** — Wastes the description for unique messaging
7. **ALL CAPS titles** — Looks unprofessional, reduces CTR
8. **Multiple og:image tags** — Causes unpredictable platform behavior
9. **Blocking crawlers via robots.txt** — WhatsApp, Facebook, Twitter all crawl
10. **Image redirect chains** — LinkedIn especially fails on multi-hop redirects

---

## How to Test Your OG Tags

### Platform-Specific Debuggers

| Platform | Tool | Action |
|----------|------|--------|
| Facebook | [Sharing Debugger](https://developers.facebook.com/tools/debug/) | Click "Scrape Again" |
| Twitter/X | [Card Validator](https://cards-dev.twitter.com/validator) | Preview card |
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) | Click "Refresh" |

### Multi-Platform Testing

Use [LinkPeek](https://www.getlinkpeek.com) to test your link across **all 6 major platforms** simultaneously. It shows you real mockups for WhatsApp, Twitter, LinkedIn, Slack, Discord, and Instagram—plus a full audit with fix code for every issue.

---

## OG Tags and SEO

Open Graph tags don't directly affect your Google search rankings. However, they **indirectly boost SEO** by:

1. **Increasing CTR** — Better previews → more clicks → more traffic
2. **Reducing bounce rate** — Accurate previews set correct expectations
3. **Driving social signals** — Higher engagement → more shares → more backlinks
4. **Improving Dark Social attribution** — When links are shared privately (WhatsApp, Slack, iMessage), OG tags are the only data your brand controls

---

## Schema Markup: The Next Level

While OG tags control social previews, structured data (JSON-LD schema) controls how search engines and AI assistants understand your content:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "image": "https://yoursite.com/og-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2026-05-10",
  "publisher": {
    "@type": "Organization",
    "name": "Your Site Name"
  }
}
</script>
\`\`\`

This is becoming increasingly important for **GEO (Generative Engine Optimization)** — optimizing for AI-powered search engines like Perplexity, ChatGPT Search, and Google AI Overviews.`,
  },
  {
    slug: 'link-preview-not-showing',
    title: 'Link Preview Not Showing? Fix Missing Social Cards Fast',
    description:
      'A practical troubleshooting checklist for missing link previews, blank cards, stale images, and social previews that show the wrong title or description.',
    keywords: [
      'link preview not showing',
      'link preview image not showing',
      'social preview not working',
      'URL preview not working',
      'OG image not showing',
      'fix link preview',
      'link preview checker',
    ],
    category: 'Troubleshooting',
    readTime: '7 min read',
    publishedAt: '2026-06-14',
    updatedAt: '2026-06-14',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '🔎',
    content: `## Why Link Previews Disappear

A missing link preview usually means the social app could not read clean metadata from your page. The page may load perfectly in a browser, but crawlers still need accessible Open Graph tags, a valid image URL, and a response they can fetch without JavaScript-only rendering.

This is why the same URL can show a full card in one app, a tiny thumbnail in another app, and plain text somewhere else.

---

## Quick Fix Checklist

- Add \`og:title\`, \`og:description\`, \`og:image\`, \`og:url\`, and \`og:type\`
- Use an absolute HTTPS URL for \`og:image\`
- Make sure the image returns a 200 response without login, bot blocking, or hotlink protection
- Use a JPG, PNG, or WebP image instead of SVG as the primary preview image
- Keep the image large enough for rich cards and compressed enough for strict apps
- Avoid redirect chains for the page URL and the image URL
- Check that \`robots.txt\` does not block social crawlers
- Refresh or cache-bust the URL after fixing metadata

---

## The Tags Most Apps Expect

\`\`\`html
<meta property="og:title" content="Page title for the preview" />
<meta property="og:description" content="Short preview copy for social cards" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
\`\`\`

Use the same canonical page URL in your Open Graph tags, canonical tag, sitemap, and internal links. Mixed hosts like \`example.com\` and \`www.example.com\` can split signals and make debuggers show stale or unexpected results.

---

## Platform-Specific Problems

### WhatsApp

WhatsApp is often strict about image access, size, and format. If your WhatsApp preview is missing, start by checking \`og:image\`, HTTPS access, image file size, and stale cache.

### Twitter/X

Twitter/X can use Twitter Card tags and Open Graph fallback data. If the large image card is missing, confirm \`twitter:card\`, \`twitter:image\`, and the image URL.

### LinkedIn

LinkedIn commonly shows stale titles or images after metadata changes. Confirm the canonical URL and Open Graph tags, then retest after refreshing cached metadata.

### Slack and Discord

Slack and Discord previews usually fail when the page requires JavaScript to expose metadata, blocks crawler access, or has an image URL that cannot be fetched directly.

---

## How to Test the Fix

Use [LinkPeek](https://www.getlinkpeek.com) to run a multi-platform preview scan. It renders WhatsApp, Twitter/X, LinkedIn, Slack, Discord, and Instagram-style cards, then gives you an audit of missing tags and copy-paste fixes.

After updating your page:

1. Retest the canonical URL
2. Retest a cache-busted URL such as \`/page?v=2\`
3. Confirm the image URL opens directly in a private browser window
4. Share the final URL only after the preview is correct

---

## FAQ: Link Preview Not Showing

**Q: Why does my link preview show no image?**
A: The most common reasons are a missing \`og:image\` tag, a relative image URL, blocked crawler access, unsupported image format, image file size problems, or stale platform cache.

**Q: Why does my preview show the old image?**
A: Social apps cache preview metadata. Update the image URL or add a versioned query string, then use platform debuggers or a fresh share to retest.

**Q: Do Open Graph tags help SEO?**
A: Open Graph tags are mainly for social previews, not direct Google ranking. They can still improve click-through and sharing quality, which helps distribution.

**Q: Can I test a preview before deployment?**
A: Yes. LinkPeek supports localhost preview workflows so you can fix metadata before a public release.`,
  },
  {
    slug: 'preview-og-tags-localhost-no-ngrok',
    title: 'How to Test Open Graph Tags on Localhost Without ngrok',
    description:
      'Learn how to test Open Graph tags, Twitter cards, and social previews on localhost without deploying or setting up ngrok tunnels.',
    keywords: [
      'preview og tags localhost',
      'localhost open graph preview',
      'test og tags locally',
      'link preview localhost',
      'ngrok alternative og preview',
    ],
    category: 'Guide',
    readTime: '8 min read',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-28',
    author: { name: 'LinkPeek Team', role: 'UI Engineers' },
    heroEmoji: '💻',
    content: `## The Pain of Local Open Graph Testing

Web developers know the routine: you're building a new landing page or blog post, you've added your Open Graph (OG) tags, and now you want to check if the social preview looks right. 

You open the official Facebook Sharing Debugger or Twitter Card Validator, paste \`http://localhost:3000/my-page\`, and get a frustrating error. The reason? Social media crawlers live on the internet—they cannot reach your local machine's private network.

Usually, the fix is setting up a tunnel using ngrok or Localtunnel, copying the temporary HTTPS URL, pasting it into the debugger, and repeating the process every time you change a meta tag. It is slow, tedious, and completely breaks your development flow.

LinkPeek solves this with a **zero-tunnel, client-side preview engine** that renders **pixel-perfect visual mockups** of your localhost pages directly in the browser.

---

## Why Pixel-Perfect Local Previews Matter

A social media share card is a key design element. Just like you wouldn't write CSS without looking at the browser, you shouldn't write meta tags without seeing the visual output.

Most raw metadata validators only check if the tags exist. They show you key-value pairs like:
- \`og:title\`: "Our Amazing Product"
- \`og:image\`: "/assets/hero.png"

But raw text doesn't tell you how the design looks in real life. It won't show you:
- Whether your typography wraps awkwardly to a second line.
- Whether the text contrast looks muddy on light or dark mode.
- Whether your logo is cropped in half by WhatsApp's square container.

LinkPeek renders 100% accurate, high-fidelity mockups of WhatsApp, X (Twitter), LinkedIn, Slack, Discord, and Instagram, matching the exact fonts, margins, and border radii used by the real apps.

---

## How to Preview Localhost Tags with LinkPeek

LinkPeek supports two ways to inspect localhost URLs, both of which require zero tunnels:

### Method 1: In-Browser Client-Side Fetching (Default)

When you paste a localhost URL (like \`http://localhost:3000\`) into LinkPeek, the app does not send the request to a server. Instead, it reads the HTML directly from your browser:

1. LinkPeek runs a client-side fetch request to your local dev server.
2. It extracts the raw HTML headers and parses the meta tags.
3. It immediately generates the social previews using our custom layout engine.

Because nothing leaves your computer, this method is private, instant, and secure.

### Method 2: LinkPeek Local Companion (For Advanced Port Mapping)

If your local server has strict CORS (Cross-Origin Resource Sharing) headers that block in-browser requests, you can run our lightweight, zero-configuration local companion:

\`\`\`bash
npx linkpeek-local
\`\`\`

This command starts a tiny proxy that securely relays the HTML to the LinkPeek editor, bypassing CORS blocks in seconds without exposing your code to the public internet.

---

## Verification Checklist for Local OG Tags

Before you deploy your code to production, run your localhost URL through LinkPeek and double-check these visual elements:

- [ ] **Image Cropping**: Check the square preview crop on WhatsApp. Is your logo centered so it doesn't get clipped?
- [ ] **Title Length**: Does your title fit on X/Twitter without ending in an awkward ellipsis?
- [ ] **Slack Site Name**: Is \`og:site_name\` configured? Slack uses it as the bold header above your link card, which acts as a major brand anchor.
- [ ] **Mixed Content**: Ensure your \`og:image\` URL starts with \`https://\` and uses an absolute path. Relative paths like \`/images/og.jpg\` will fail when shared.

---

## FAQ: Localhost OG Previews

**Q: Can I test localhost previews on LinkPeek without a public URL?**
A: Yes. LinkPeek is built specifically for local development testing. It fetches and parses your local metadata directly inside your browser, requiring no public tunneling.

**Q: Why does my localhost preview work in LinkPeek but fail in Facebook Debugger?**
A: LinkPeek runs locally on your machine and can access your localhost port, whereas Facebook's external crawlers cannot bypass your private router to fetch localhost.

**Q: Does the local companion send my code to your servers?**
A: No. The local companion proxy only routes HTML headers locally on your device to help bypass browser CORS security restrictions. Your code stays completely private.`,
  },
  {
    slug: 'facebook-og-image-not-showing',
    title: 'Facebook OG Image Not Showing? The Ultimate Troubleshooting Guide',
    description:
      'Fix broken Facebook preview cards instantly. Learn why your Facebook og:image is missing, how to clear Facebook\'s cache, and why pixel-perfect mockups are key to checking crops.',
    keywords: [
      'facebook og image not showing',
      'facebook link preview broken',
      'facebook share debugger',
      'og:image size facebook',
      'fix facebook card preview',
    ],
    category: 'Troubleshooting',
    readTime: '7 min read',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-19',
    author: { name: 'LinkPeek Team', role: 'OG Experts' },
    heroEmoji: '📘',
    content: `## Why Facebook Link Previews Break

You share your latest article or product page on Facebook, and instead of a beautiful, eye-catching card, all you see is a plain text link or a generic gray fallback box. 

A missing or broken preview image can destroy your click-through rate (CTR). Research shows that links with rich social cards receive **up to 2× more clicks** than plain text links. 

When your Facebook preview fails to render, it is usually because of a small syntax error in your meta tags, a server configuration issue, or a stale cache.

---

## The Top 5 Reasons Facebook Rejects Your OG Image

### 1. The Image File Size Exceeds 8 MB

Facebook has a maximum file size limit of 8 MB for preview images. If your image exceeds this, Facebook's crawler will ignore it and show a text-only card. 

**The Fix:** Compress your images using PNGQuant or TinyPNG. For optimal performance and speed, keep your social card images **under 500 KB**.

### 2. You Are Using a Relative URL

Open Graph image paths must be absolute URLs that start with \`https://\`. Facebook's crawler is an external service and does not know where to look if you specify a relative folder path.

\`\`\`html
<!-- ❌ Broken relative path -->
<meta property="og:image" content="/images/social-share.png" />

<!-- ✅ Correct absolute URL -->
<meta property="og:image" content="https://www.yoursite.com/images/social-share.png" />
\`\`\`

### 3. Your Image is Below the 200×200 Pixel Minimum

Facebook enforces a strict minimum size of **200×200 pixels** for social card images. If your image is even one pixel smaller, it will not display at all.

For a full-width, rich card preview, Facebook recommends using images that are at least **1200×630 pixels** (a 1.91:1 aspect ratio).

### 4. Facebook Is Showing a Stale Cached Version

Facebook caches link preview metadata heavily to optimize page load speeds. If you upload a page, find an error, fix your meta tags, and re-share, Facebook will continue to display the original broken preview from its database.

**The Fix:** Force a refresh using the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/):
1. Paste your URL into the input field.
2. Click **Debug**.
3. Click **Scrape Again** to force Facebook's crawler to re-fetch your page and update its index.

### 5. Server Security / Hotlink Protection is Blocking Crawlers

Many CDNs and hosting providers (like Cloudflare) enable hotlink protection by default to prevent other sites from stealing your bandwidth. However, this protection also blocks social media crawlers. When Facebook tries to load your image, your server returns a \`403 Forbidden\` error.

**The Fix:** Make sure your CDN configuration allows requests from Facebook's official user-agent: \`facebookexternalhit\`.

---

## The Importance of Pixel-Perfect Mockups

Checking that tags exist in the HTML is only half the battle. Because Facebook uses different card layouts based on image dimensions, you must inspect the actual visual rendering.

If your image is wide enough (greater than 445px wide, 232px high, and has an aspect ratio above 0.797), Facebook will display an **expanded full-width card**. If it falls below these numbers, Facebook crops it into a **compact square thumbnail** aligned to the left of your text.

Standard metadata parsers cannot show you which layout Facebook will select. LinkPeek's preview engine simulates Facebook's exact aspect ratio rules, rendering a pixel-perfect mockup so you can make sure your key branding assets stay in the frame.

---

## Facebook Open Graph Template

Here is the correct meta tag template to ensure your page renders as a full-width card on Facebook:

\`\`\`html
<meta property="og:title" content="Your Headline (under 88 characters)" />
<meta property="og:description" content="A brief summary of your page (under 200 characters)" />
<meta property="og:image" content="https://www.yoursite.com/images/share-card.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://www.yoursite.com/page-url" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Your Brand Name" />
\`\`\`

---

## FAQ: Facebook Previews

**Q: How do I force Facebook to update a link preview?**
A: Go to the Facebook Sharing Debugger, paste your page URL, click "Debug", and then click "Scrape Again". This clears the cache immediately.

**Q: Can I use SVG images for Facebook previews?**
A: While Facebook supports SVG, other platforms (like WhatsApp and Twitter) will reject SVG images. For universal sharing compatibility, use JPG or PNG.

**Q: Why does Facebook crop my rectangular image into a small thumbnail?**
A: If the image width is below 445px or the height is below 232px, Facebook defaults to a compact thumbnail layout instead of a full-width card. Check your layout visually with LinkPeek to verify.`,
  },
  {
    slug: 'slack-link-preview-no-image',
    title: 'The Hidden Reason Your Slack Link Preview Shows No Image',
    description:
      'Slack link preview not showing an image? Discover the 32KB bot limit, redirection blocks, and how to verify your site name renders with pixel-perfect bold headers.',
    keywords: [
      'slack link preview not working',
      'slack og:image missing',
      'slack bot robots.txt',
      'og:site_name slack preview',
      'slack unfurl not working',
    ],
    category: 'Troubleshooting',
    readTime: '6 min read',
    publishedAt: '2026-06-15',
    updatedAt: '2026-06-19',
    author: { name: 'LinkPeek Team', role: 'Integration Engineers' },
    heroEmoji: '⚡',
    content: `## The Slack Unfurl Mystery

We have all been there: you paste a URL in a Slack channel, expecting a beautiful unfurled card to show off your page layout, but instead, it renders as a bare text link. 

Slack calls its link preview system "unfurling." When a link is shared, the Slackbot crawler attempts to scrape the page's HTML, extract the Open Graph (OG) tags, and format them into a structured card.

Slack is notorious for failing silently. If any part of its strict crawling workflow is interrupted, it drops the image and shows a generic fallback.

---

## The 3 Most Common Reasons Slack Previews Fail

### 1. Your Meta Tags are Too Deep in the HTML (The 32KB Limit)

This is Slack's most famous and frustrating quirk: **Slackbot only reads the first 32 KB of your HTML file.** 

If you use a modern framework that embeds heavy serialized state, large inline CSS styles, or inline SVG symbols at the top of your \`<head>\` tag, your Open Graph meta tags might get pushed past the 32KB boundary. When Slackbot stops reading, it concludes that your page has no social metadata.

**The Fix:** Keep your header lean. Move heavy JS scripts, analytics trackers, and inline CSS blocks below your OG and Twitter meta tags. Always place your meta tags at the absolute top of the \`<head>\` block.

### 2. The Page Redirects Too Many Times

Slackbot is highly sensitive to redirect latency. If your page redirects from HTTP to HTTPS, then to a locale path (like \`/en\`), and then your CDN redirects the image URL to an external bucket, Slackbot will timeout and discard the preview.

Keep redirect chains to a maximum of **1 hop** for both the page URL and the image URL.

### 3. Robots.txt is Blocking Slackbot

If your server has a restrictive \`robots.txt\` file, it might block the Slackbot crawler from index access:

\`\`\`
# ❌ Blocks Slack previews
User-agent: *
Disallow: /
\`\`\`

**The Fix:** Explicitly allow the Slackbot user-agent in your robots.txt file:

\`\`\`
# ✅ Allow Slackbot crawler
User-agent: Slackbot
Allow: /
\`
\`\`\`

---

## Marketing with Pixel-Perfect Precision

Slack formats link previews with a very specific, recognizable layout:
1. The **Site Name** (\`og:site_name\`) is styled as a bold, uppercase header.
2. The **Title** (\`og:title\`) is rendered as a clickable link.
3. The **Description** and **Image** are aligned with precise borders.

Raw metadata outputs cannot show you if your site name matches your logo or if the line-wrapping on your description pushes your image out of frame. LinkPeek's layout simulator matches Slack's exact typography and spacing rules, giving you a 100% accurate visual rendering of how your brand looks inside a Slack message.

---

## FAQ: Slack Link Previews

**Q: Why does my preview show up on Twitter but not on Slack?**
A: Slackbot has unique constraints like the 32KB HTML size limit and a faster timeout window. Twitterbot is more patient and reads the entire HTML document.

**Q: How do I clear Slack's link preview cache?**
A: Slack caches link previews for 24 hours. To force an immediate update for testing, append a query parameter to your link: \`https://yoursite.com/page?v=2\`.

**Q: Does Slack support animated GIF preview images?**
A: Yes, Slack supports static and animated GIFs, but it will only play them if the file is under 2 MB. Larger files are dropped or rendered as static images.`,
  },
  {
    slug: 'react-app-og-tags-not-working',
    title: 'Why Your React App Has Broken Social Previews (SPA SEO)',
    description:
      'Fix broken link previews for single-page applications. Learn how React, Vue, and Angular apps fail to show social cards and how to verify layouts visually before deploy.',
    keywords: [
      'react app og tags not working',
      'spa social preview issues',
      'single page application open graph',
      'react meta tags helper',
      'client-side rendering link preview',
    ],
    category: 'Troubleshooting',
    readTime: '7 min read',
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-19',
    author: { name: 'LinkPeek Team', role: 'Frontend Architects' },
    heroEmoji: '⚛️',
    content: `## The Single-Page Application (SPA) Trap

You have built a beautiful, fast, interactive Single-Page Application (SPA) using React, Vue, or Angular. You share a link to your app, but instead of the custom title and image you set, it displays a blank white box or a generic fallback.

This is the most common issue developers face when building client-side rendered apps. It happens because **social media crawlers do not execute JavaScript.**

---

## Why Social Media Crawlers See a Blank Page

When a user opens your SPA, their browser downloads a minimal HTML shell:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My React App</title>
    <!-- React bundle loaded here -->
    <script src="/static/bundle.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
\`\`\`

The browser then runs the JavaScript bundle, which renders the components and injects the title and meta tags. 

However, social media bots (like \`Twitterbot\`, \`LinkedInBot\`, and \`Discordbot\`) are simple scrapers designed for speed. They request your page, read the raw HTML shell, and immediately parse the metadata. Because they do not wait for the JavaScript to execute, they see a completely blank page with no OG tags.

---

## 3 Ways to Fix React App OG Tags

### 1. Server-Side Rendering (SSR) — The Gold Standard

If you use Next.js (for React) or Nuxt.js (for Vue), the server pre-renders the complete HTML page, including all the correct meta tags, before sending it to the client. When a crawler requests the page, it gets clean, readable HTML.

### 2. Static Site Generation (SSG) / Prerendering

If your site consists of static pages, you can use prerendering tools (like React Snap or Prerender.io). These tools build static HTML files for each route during deployment, ensuring crawlers have access to the headers.

### 3. Edge Middleware / User-Agent Redirection

You can configure an Edge middleware function or serverless rule that checks the incoming \`User-Agent\` header. If the request comes from a social bot, you redirect them to a static, server-rendered version of the metadata. If it is a real human, you serve the standard React bundle.

---

## Spotting SPA Errors Visually with LinkPeek

Debugging client-side rendering errors is difficult because the page looks perfect when you open it in your browser. Since your browser executes the JavaScript, you cannot easily tell what a bot is seeing.

LinkPeek is designed to solve this. When you run a scan, our engine fetches the URL without executing JavaScript, simulating a real bot's crawler environment. 

Our **pixel-perfect layout engine** then renders a mockup of the output. If your React app is serving a blank HTML shell, you will immediately see an empty card in the editor, making it easy to catch SPA rendering bugs before deploying to production.

---

## FAQ: React OG Previews

**Q: Can I use React Helmet to set Open Graph tags?**
A: React Helmet works by injecting tags into the DOM client-side. While it helps search engines like Google (which runs some JS), it is ignored by social crawlers like WhatsApp and X.

**Q: How do I test what a social bot sees on my local React app?**
A: Paste your local server URL into LinkPeek. It crawls the page in a bot-like sandbox environment and shows a mockup of the actual crawled results.

**Q: Why does Google show my page title correctly but LinkedIn doesn\'t?**
A: Google's search bot executes JavaScript rendering queues, whereas LinkedIn's preview crawler only scrapes the raw static HTML from the server response.`,
  },
  {
    slug: 'og-image-https-required',
    title: 'og:image HTTP vs HTTPS: Why Insecure Links Break Previews',
    description:
      'Insecure image links can destroy your click-through rate. Understand why platforms reject HTTP image tags and how to ensure your preview cards render flawlessly.',
    keywords: [
      'og image https required',
      'insecure og:image',
      'http vs https link preview',
      'social card mixed content',
      'broken og image secure connection',
    ],
    category: 'Guide',
    readTime: '6 min read',
    publishedAt: '2026-06-10',
    updatedAt: '2026-06-19',
    author: { name: 'LinkPeek Team', role: 'Security & QA' },
    heroEmoji: '🔒',
    content: `## The Silent Protocol Killer

You have configured all your Open Graph tags, verified the image file size is under the limit, and confirmed that your \`robots.txt\` allows bot traffic. Yet, when you share your link on WhatsApp or LinkedIn, the preview image remains blank.

The culprit is often a single letter in your image URL protocol: **HTTP instead of HTTPS.**

In 2026, social media platforms are aggressively enforcing user security. Serving insecure media assets in social shares is no longer accepted, and most crawlers will silently drop your image if it is served over an unencrypted connection.

---

## Why Platforms Reject HTTP Social Images

When a user clicks a link preview on a secure platform (like WhatsApp or Slack), they expect a safe, encrypted transition. If the platform renders an image served over HTTP inside its secure mobile app interface, it triggers a **mixed-content warning**.

To maintain their security standards, WhatsApp, LinkedIn, X, and Facebook crawlers reject insecure asset connections:

- **WhatsApp**: Silently drops any \`og:image\` that does not use a secure HTTPS protocol.
- **LinkedIn**: Fails to load insecure images due to strict SSL handshakes on its CDN proxy.
- **Facebook**: Flags insecure images in its debugger, warning that they will fail to load for users.

---

## Visual Branding Impact of Insecure Cards

A broken preview card does not just hurt your traffic; it damages your brand credibility. When an image fails to load, the layout shifts, leaving a large, empty gray box that looks broken and untrustworthy to users.

Raw tag checkers might show you that \`og:image\` is populated, but they will not show you the visual impact of an empty, broken image box. LinkPeek's layout checker immediately simulates these connection failures and triggers a critical warning, allowing you to fix protocol mismatches before your users see a broken link card.

---

## How to Secure Your Open Graph Assets

To guarantee that your preview images render flawlessly, ensure that:
1. Your domain has a valid SSL certificate.
2. Your \`og:image\` URL starts with \`https://\`.
3. Your server redirects all HTTP traffic to HTTPS.

\`\`\`html
<!-- ❌ Insecure HTTP URL (will fail on WhatsApp and LinkedIn) -->
<meta property="og:image" content="http://example.com/share-image.jpg" />

<!-- ✅ Secure HTTPS URL (universal compatibility) -->
<meta property="og:image" content="https://example.com/share-image.jpg" />
\`\`\`

---

## FAQ: Insecure OG Images

**Q: Can I use an HTTP page URL if my image uses HTTPS?**
A: While the image will render, it is best practice to secure both the page URL and the image URL to prevent security warnings.

**Q: Why does my HTTP image show up in Slack but not in WhatsApp?**
A: Slackbot runs in a more permissive server environment, whereas WhatsApp generates previews directly on the sender's device, which enforces strict mobile security settings.

**Q: How can I check if my certificate is causing issues?**
A: Run your URL through LinkPeek. It checks the SSL handshake of the image server and flags expired or self-signed certificates that block crawlers.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

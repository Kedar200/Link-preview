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
    slug: 'whatsapp-link-preview-not-working',
    title: 'WhatsApp Link Preview Not Working? Complete Fix Guide (2026)',
    description:
      'Fix WhatsApp link preview issues instantly. Learn why your OG image is missing, how to debug broken previews, and the exact image specs WhatsApp requires in 2026.',
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
    updatedAt: '2026-05-23',
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
    title: 'OG Image Size Guide 2026: Every Platform\'s Requirements',
    description:
      'The definitive OG image size guide for 2026. Exact dimensions, file sizes, and format requirements for WhatsApp, Facebook, Twitter/X, LinkedIn, Instagram, Discord, and Slack.',
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
    updatedAt: '2026-05-23',
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
    title: 'Twitter Card Not Displaying? Here\'s How to Fix It',
    description:
      'Diagnose and fix Twitter/X card display issues. Learn why your Twitter card image, title, or description isn\'t showing, with step-by-step debugging and fix code.',
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
    updatedAt: '2026-05-23',
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
    title: 'LinkedIn Preview Image Wrong or Missing? How to Fix It',
    description:
      'Fix broken LinkedIn link previews. Learn why LinkedIn shows the wrong image, how to clear LinkedIn\'s aggressive cache, and the exact OG tag setup LinkedIn requires.',
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
    updatedAt: '2026-05-23',
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

# LinkPeek Audit Engine: Deep Research Report

> **Purpose**: This document is the authoritative source of truth for building the audit engine and writing blog posts. Every rule, limit, and quirk is sourced from platform docs and verified community findings.

---

## 🌐 Universal OG Tag Foundations

### The Required 4 (Must Have on Every Page)
```html
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your Description" />
<meta property="og:image" content="https://yourdomain.com/image.jpg" />
<meta property="og:url" content="https://yourdomain.com/your-page" />
```

### Highly Recommended
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Your Brand Name" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Image description" />
```

### The Universal Image Golden Rule
**1200 × 630 pixels at 1.91:1 aspect ratio** is the safest choice for all 6 platforms simultaneously.

---

## 📋 Top 10 Universal Failure Modes (Audit Engine Must Check)

| # | Failure | Plain-English Error Message | Severity |
|---|---------|----------------------------|----------|
| 1 | `og:image` uses a **relative URL** | "Your image URL must start with `https://` — social platforms can't find relative paths." | 🔴 Critical |
| 2 | `og:image` uses **HTTP** not HTTPS | "Your image is on an insecure connection (HTTP). WhatsApp and LinkedIn will refuse to load it." | 🔴 Critical |
| 3 | `og:title` is **missing** | "No title found. Every platform will show a blank title card." | 🔴 Critical |
| 4 | `og:image` is **missing** | "No preview image found. Platforms will try to guess one and usually fail." | 🔴 Critical |
| 5 | Meta tags **in body, not head** | "Your tags are in the wrong place. They must be in the `<head>` section." | 🔴 Critical |
| 6 | Page built with **client-side JS only** (SPA) | "Your tags are invisible to social crawlers. They don't run JavaScript — use server-side rendering." | 🔴 Critical |
| 7 | **Image too small** (< 200×200) | "Your image is too small. It won't display on most platforms." | 🟡 Warning |
| 8 | **Image file too large** (> 1MB) | "Your image file is too big. It may time out when WhatsApp or Slack tries to load it." | 🟡 Warning |
| 9 | `og:description` is **too long** | "Your description is too long and will be cut off mid-sentence." | 🟡 Warning |
| 10 | **Hotlink protection** blocking crawlers | "Your server is blocking social media bots. Your preview image will appear broken." | 🟡 Warning |

---

## 📱 Platform-by-Platform Specifications

---

### 1. WhatsApp

**Character Limits**
- `og:title`: ~2 lines displayed (keep under 65 chars)
- `og:description`: Max ~80 characters displayed before truncation

**Image Rules**
| Rule | Value |
|------|-------|
| Recommended Size | 1200 × 630 px |
| Minimum Size | 300 × 300 px |
| Below this → no image | < 100 × 100 px |
| Aspect Ratio (displayed) | Near-square crop applied |
| Max File Size (safe) | **300 KB** (fails on slow mobile) |
| Hard limit | 600 KB |
| Formats | JPG, PNG, WebP |
| Protocol | **HTTPS only — HTTP fails silently** |

**Critical Quirks**
- WhatsApp generates previews **on the sender's device**, not a central server. Server response speed matters.
- WhatsApp **has no public debugger tool** — testing requires pasting into a real chat.
- Cache is **extremely aggressive**. Force refresh by appending a query param: `?v=2`
- **Blocks `robots.txt` check**: WhatsApp uses user agent `WhatsApp/2.0` — never block it.
- Center your key visuals — WhatsApp applies a square crop to rectangular images.

**Plain-English Audit Messages (WhatsApp-Specific)**
- "Your image is too large. On a slow mobile connection, WhatsApp won't load it. Keep it under 300KB."
- "WhatsApp applied a square crop to your image. Important content may be hidden. Try a square image or center your logo."
- "Your image uses HTTP. WhatsApp requires HTTPS — this preview will fail completely."
- "Your image is smaller than 300×300px. WhatsApp won't display it at all."

---

### 2. X (Twitter)

**Required Tags**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your Description" />
<meta name="twitter:image" content="https://yourdomain.com/image.jpg" />
<meta name="twitter:image:alt" content="Alt text" />
<meta name="twitter:site" content="@yourhandle" />
```

**Card Types**

| Type | Use Case | Image Size | Aspect Ratio |
|------|----------|-----------|--------------|
| `summary` | Blog posts, text content | 144×144 px min | 1:1 Square |
| `summary_large_image` | Visual content, marketing | **1200×628 px** | **2:1** |
| `player` | Video/audio embeds | Custom | Requires API approval |

**Character Limits**
| Field | Limit |
|-------|-------|
| `twitter:title` | **70 characters** |
| `twitter:description` | **200 characters** |

**Image Rules**
| Rule | Value |
|------|-------|
| Max File Size | **5 MB** |
| Formats | JPG, PNG, WebP, GIF (first frame only) |
| SVG | ❌ Not supported |

**Critical Quirks**
- X **falls back to `og:` tags** if `twitter:` tags are absent — but explicit tags always win.
- GIF: Only the **first frame** is used as a static image — not animated.
- `summary_large_image` gets significantly more engagement than `summary` due to visual impact.
- The `twitter:player` card requires **dedicated API registration** through X Developer Portal.
- Official validator: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

**Plain-English Audit Messages (X-Specific)**
- "You're missing `twitter:card`. X may not display your image at all."
- "Your title is over 70 characters. X will cut it off mid-sentence."
- "You're using `summary` card type — switch to `summary_large_image` for 3× more clicks."
- "Your image is a GIF. X will only show the first frame as a static image."
- "SVG images are not supported by X. Use JPG or PNG instead."

---

### 3. LinkedIn

**Required Tags** — LinkedIn uses OG tags only (no Twitter fallback).

**Character Limits**
| Field | Limit |
|-------|-------|
| `og:title` displayed | ~150 characters |
| `og:description` displayed | ~300 characters |

**Image Rules**
| Rule | Value |
|------|-------|
| Recommended Size | **1200 × 627 px** |
| Aspect Ratio | **1.91:1** |
| Max File Size | **5 MB** |
| Formats | JPG, PNG |

**Critical Quirks**
- LinkedIn uses `og:` tags — NOT `twitter:` tags. Set both.
- Official cache-clearing tool: [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
- LinkedIn's crawler user-agent: `LinkedInBot` — ensure it's allowed in `robots.txt`.
- LinkedIn is **very strict about image aspect ratio** — significantly off-ratio images get heavily cropped.

**Plain-English Audit Messages (LinkedIn-Specific)**
- "Your image dimensions are off. LinkedIn will crop it awkwardly. Use exactly 1200×627 pixels."
- "Your image format is WebP. LinkedIn only reliably supports JPG and PNG."
- "LinkedIn won't use your Twitter card tags. Make sure you also have standard `og:` tags."

---

### 4. Slack

**Tag Priority**: Reads OG tags primarily. Also supports Twitter Cards and oEmbed for advanced customization.

**Image Rules**
| Rule | Value |
|------|-------|
| Recommended Size | 1200 × 630 px |
| Minimum Size | 200 × 200 px |
| Max File Size (safe) | **300 KB** (ideal), hard fail at ~2–3 MB |
| Formats | PNG, JPG, static GIF |

**Critical Quirks**
- Slackbot only fetches the **first 32KB** of your HTML. Put meta tags at the very top of `<head>`.
- Slackbot **does NOT execute JavaScript**. SPAs will show no preview.
- Official user-agent: `Slackbot` — never block in `robots.txt`.
- Too many redirects = timeout = no preview. Keep redirect chains to 0–1 hops.
- Slack supports `twitter:label` and `twitter:data` tags for displaying extra metadata (e.g., "Author" / "Reading Time") inside the unfurl card.

**Plain-English Audit Messages (Slack-Specific)**
- "Your meta tags appear too late in the HTML. Slack only reads the first 32KB — move them to the top of `<head>`."
- "Slackbot doesn't run JavaScript. If your site is a React/Vue app without server-side rendering, Slack will see a blank page."
- "Your image is over 1MB. Slack may time out while loading it, resulting in no preview."
- "Multiple redirects detected. Slack may give up before reaching your actual page."

---

### 5. Discord

**Image Rules**
| Rule | Value |
|------|-------|
| Recommended Size | 1200 × 630 px |
| Minimum Size | 600 × 315 px |
| Max File Size | 5 MB (ideally < 1 MB) |
| Formats | PNG, JPG (no SVG, no complex formats) |
| Aspect Ratio | 1.91:1 |

**Helpful Bonus Tags**
```html
<!-- Helps Discord render image faster without downloading it first -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Discord also reads this to determine large image card style -->
<meta name="twitter:card" content="summary_large_image" />
```

**Critical Quirks**
- Discord's crawler (`Discordbot`) **must be allowed** by your server/CDN.
- Discord **aggressively caches** embeds. After changing OG tags, old previews persist for hours.
- Discord reads `twitter:card` to decide whether to show a large or small image embed.
- Always use **absolute HTTPS URLs** — Discord will silently fail on HTTP or relative paths.

**Plain-English Audit Messages (Discord-Specific)**
- "Add `og:image:width` and `og:image:height` tags. Discord will render your image faster."
- "Discord uses your `twitter:card` tag to choose image size. Set it to `summary_large_image` for a bigger preview."
- "Your image is below 600×315px — Discord may not show it."

---

### 6. Facebook

**Image Rules**
| Rule | Value |
|------|-------|
| Optimal Size | **1200 × 630 px** |
| Minimum (full size) | 600 × 315 px |
| Minimum (thumbnail only) | 200 × 200 px |
| Max File Size | **8 MB** |
| Formats | JPEG, PNG, GIF |
| Aspect Ratio | **1.91:1** |

**Critical Quirks**
- Facebook requires `gzip` and `deflate` encoding support on your server.
- Official debugger: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- Use `og:image:width` and `og:image:height` to allow Facebook to render images without pre-downloading them.
- Renaming the image file (not just updating it) is the most reliable way to force a cache refresh.

**Plain-English Audit Messages (Facebook-Specific)**
- "Facebook may show a small thumbnail instead of a large preview. Your image must be at least 600×315px."
- "Add `og:image:width` and `og:image:height` — this makes Facebook load your preview faster."

---

## 🤖 Social Media Crawler User Agents (Reference List)

> **Audit Check**: If a user's `robots.txt` blocks any of these, that platform's preview will silently fail.

| Platform | User Agent String |
|----------|-----------------|
| Facebook | `facebookexternalhit` |
| X (Twitter) | `Twitterbot` |
| LinkedIn | `LinkedInBot` |
| Slack | `Slackbot` |
| Discord | `Discordbot` |
| WhatsApp | `WhatsApp/2.0` |
| Pinterest | `Pinterestbot` |

---

## ⚡ The Caching Problem: Per-Platform Guide

| Platform | Caching Behavior | Force Refresh Method |
|----------|-----------------|---------------------|
| Facebook | Heavy | [Sharing Debugger](https://developers.facebook.com/tools/debug/) → "Scrape Again" |
| LinkedIn | Moderate | [Post Inspector](https://www.linkedin.com/post-inspector/) → "Inspect" |
| X/Twitter | Moderate | [Card Validator](https://cards-dev.twitter.com/validator) → re-submit URL |
| WhatsApp | Very Heavy | Append `?v=2` to URL (no official tool) |
| Slack | Moderate | Re-paste link in chat; wait for re-crawl |
| Discord | Heavy | No official tool; wait or share in new message |

---

## 🏗️ Architecture Failure: SPA / Client-Side Rendering

**The Problem**: Social crawlers don't run JavaScript. A React/Vue/Angular SPA without SSR will show a blank or generic preview on every platform.

**The Solutions** (in order of preference):
1. **Next.js / Nuxt.js** (best): Server renders correct tags per route automatically.
2. **Edge middleware / Serverless function**: Detects bot user-agent, injects pre-rendered HTML on the fly.
3. **Prerendering service** (Prerender.io): Crawls site, caches snapshots, serves to bots.

**Plain-English Audit Message**:
> "Your page appears to be a JavaScript-powered app (SPA). Social media crawlers don't run JavaScript, so they'll see a blank page with no title, no image, and no description. Switch to server-side rendering to fix this."

---

## 🔒 Hotlink Protection Failure

**The Problem**: Hotlink protection blocks requests from servers that aren't your own domain. Social crawlers are external servers — they get 403 Forbidden when trying to fetch your `og:image`.

**The Fix**: Allowlist these user-agents in your CDN, `.htaccess`, or Nginx config:
```
facebookexternalhit, Twitterbot, LinkedInBot, Slackbot, Discordbot, WhatsApp
```

**Plain-English Audit Message**:
> "Your server is blocking social media bots. When WhatsApp or LinkedIn tries to load your preview image, they get a 403 error and your preview appears without any image."

---

## ✍️ Blog Content Ideas (SEO Strategy)

Each blog post targets a high-value, low-competition keyword.

| Blog Title | Primary Keyword | Target Audience |
|-----------|-----------------|-----------------|
| "How to preview OG tags on localhost without ngrok" | `preview og tags localhost` | Devs |
| "Why your WhatsApp link preview has no image (and how to fix it)" | `whatsapp link preview no image` | Everyone |
| "The complete guide to Twitter card meta tags in 2025" | `twitter card meta tags` | Devs + Marketers |
| "LinkedIn post preview broken? Here's the exact fix" | `linkedin preview broken` | Marketers |
| "Why your React app has broken social media previews" | `react app og tags not working` | Devs |
| "Open Graph image size: The definitive 2025 guide" | `og image size 2025` | Everyone |
| "What is hotlink protection and why it breaks your link previews" | `hotlink protection link preview` | Devs |
| "How social media platforms cache your link previews (and how to clear them)" | `clear link preview cache` | Everyone |
| "og:image HTTP vs HTTPS: Why one destroys your social preview" | `og image https required` | Devs |
| "The hidden reason your Slack link preview shows no image" | `slack link preview not working` | Devs |

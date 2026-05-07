# LinkPeek Knowledge Base
> Scraped from competitor blogs on **2026-04-28** — LinkPreview.eu (10 articles) & Ogrilla.com (6 articles).
> Cross-referenced with our `auditEngine.ts`, `parseOG.ts`, and `route.ts`.

---

## Table of Contents
1. [Platform-Specific OG Image Specs](#1-platform-specific-og-image-specs)
2. [Platform-Specific Text Limits](#2-platform-specific-text-limits)
3. [Platform-Specific Caching & Debugging Tools](#3-platform-specific-caching--debugging-tools)
4. [OG Tag Checklist (Universal)](#4-og-tag-checklist-universal)
5. [Dark Social & Attribution](#5-dark-social--attribution)
6. [E-Commerce / Advanced OG Strategies](#6-e-commerce--advanced-og-strategies)
7. [URL Security Concerns](#7-url-security-concerns)
8. [CTR & Engagement Data Points](#8-ctr--engagement-data-points)
9. [Competitor Feature Matrix](#9-competitor-feature-matrix)
10. [Gap Analysis: What LinkPeek Can Do Better](#10-gap-analysis-what-linkpeek-can-do-better)

---

## 1. Platform-Specific OG Image Specs

### WhatsApp (Source: Ogrilla, LinkPreview.eu)
| Spec | Value | Notes |
|------|-------|-------|
| **Max file size** | **600 KB** | Images > 600 KB → NO preview image at all |
| **Min dimensions** | 100×100 px | Below this → no preview shown whatsoever |
| **Small preview** | 100–299 px width | Thumbnail beside URL |
| **Large preview** | ≥ 300 px width | Full-width card with image/title/desc |
| **Recommended** | 1200×630 px | 1.91:1 ratio optimal but WhatsApp accepts any ratio (including 1:1 square) |
| **Formats** | JPG, JPEG, PNG, WebP | **GIF and SVG NOT supported** |
| **Multiple og:image** | Unpredictable | Use only one og:image tag |
| **Twitter card tags** | Ignored | WhatsApp only reads OG tags |

### Facebook (Source: Ogrilla)
| Spec | Value | Notes |
|------|-------|-------|
| **Max file size** | 8 MB | Much more lenient than WhatsApp |
| **Min dimensions** | 200×200 px | Below this → no image at all |
| **Compact preview** | Width ≤ 445 px OR ratio ≤ 0.797 | Small thumbnail beside link |
| **Expanded preview** | Width > 445 px, Height > 232 px, Ratio > 0.797 | Full-width card |
| **Recommended** | 1200×630 px (1.91:1) | |
| **Formats** | JPG, JPEG, PNG, WebP, **GIF, SVG** | Facebook is the most permissive |
| **SVG support** | YES (Facebook accepts it) | Unlike WhatsApp |

### Instagram DMs (Source: Ogrilla)
| Spec | Value | Notes |
|------|-------|-------|
| **Max file size** | **8 MB** | Same as Facebook |
| **Recommended ratio** | 1.91:1 (1200×630) | Cropping if ratio differs |
| **Formats** | JPG, JPEG, PNG, WebP, GIF, SVG | All standard formats |
| **Twitter card tags** | Ignored | Only OG tags used |

### Twitter/X (Source: LinkPreview.eu)
| Spec | Value | Notes |
|------|-------|-------|
| **Summary card image** | Min 144×144, Max 4096×4096 | 1:1 aspect ratio |
| **Summary large image** | Min 300×157, Max 4096×4096 | 2:1 aspect ratio |
| **Max file size** | 5 MB | |
| **Formats** | JPG, PNG, WebP, GIF | |
| **Requires** | `twitter:card` meta tag | Falls back to OG tags if missing |
| **`twitter:site`** | Recommended | `@username` for attribution |
| **`twitter:creator`** | Optional | `@authorname` |

### LinkedIn (Source: LinkPreview.eu, Ogrilla)
| Spec | Value | Notes |
|------|-------|-------|
| **Recommended** | 1200×627 px (1.91:1) | |
| **Min dimensions** | 200×200 px | |
| **Max file size** | 5 MB | |
| **Formats** | JPG, PNG, GIF | |
| **Caching** | Very aggressive | Use Post Inspector to force refresh |
| **Redirect issues** | Common cause of broken previews | Avoid multi-hop redirects on images |

### Discord
| Spec | Value | Notes |
|------|-------|-------|
| **Title limit** | 256 characters | Truncated after |
| **Description limit** | ~350 characters | Truncated after |
| **og:type** | Matters | Discord styles different types differently |

### Slack
| Spec | Value | Notes |
|------|-------|-------|
| **og:site_name** | Critical | Used as bold header in unfurled links |
| **Fallback** | Domain guessed if missing | |

---

## 2. Platform-Specific Text Limits

| Platform | og:title | og:description |
|----------|----------|----------------|
| **WhatsApp** | ~65 chars (truncated) | ~80 chars visible |
| **Twitter/X** | ~70 chars (truncated with "...") | Varies |
| **LinkedIn** | ~150 chars | Varies |
| **Facebook** | ~88 chars | ~200 chars |
| **Discord** | 256 chars | ~350 chars |
| **Instagram** | Short preferred | Used if space allows |
| **Universal ideal** | 60–90 chars | 150–200 chars |

---

## 3. Platform-Specific Caching & Debugging Tools

| Platform | Tool | How to Refresh |
|----------|------|----------------|
| **Facebook** | [Sharing Debugger](https://developers.facebook.com/tools/debug/) | Click "Scrape Again" |
| **Twitter/X** | [Card Validator](https://cards-dev.twitter.com/validator) | Preview card to force refresh |
| **LinkedIn** | [Post Inspector](https://www.linkedin.com/post-inspector/) | Click "Refresh" |
| **WhatsApp** | None official | Append `?v=2` to URL, or clear conversation cache |
| **Instagram** | None official | Use URL variant like `?v=2` |
| **Slack** | Built-in | Re-paste link after updating |
| **Discord** | Built-in | Re-paste link after updating |

### Cache-busting tips:
- Add query parameter to URL (e.g., `?v=2`)
- WhatsApp iOS: delete conversation and start new one
- WhatsApp Android: Settings > Storage > Clear Cache
- Facebook caches **indefinitely** until manually cleared via Sharing Debugger

---

## 4. OG Tag Checklist (Universal)

### Essential tags (MUST have):
```html
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="A brief summary" />
<meta property="og:image" content="https://yoursite.com/image.jpg" />
<meta property="og:url" content="https://yoursite.com/page" />
<meta property="og:type" content="website" />
```

### Recommended tags:
```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Your Site Name" />
<meta property="og:image:type" content="image/jpeg" />
```

### Twitter-specific (overrides OG if present):
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/image.jpg" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorname" />
```

### Common mistakes:
1. **Relative image URLs** — Must be absolute `https://` URLs
2. **HTTP instead of HTTPS** — Many platforms reject HTTP images
3. **SVG images** — Not supported on WhatsApp, Twitter
4. **Image too small** — Below platform minimums → no image shown
5. **Image too large (file size)** — WhatsApp 600 KB, others 5–8 MB
6. **Duplicate title/description** — Wastes engagement opportunity
7. **ALL CAPS title** — Looks spammy, hurts CTR
8. **Multiple og:image tags** — Causes unpredictable behavior
9. **robots.txt blocking crawlers** — WhatsApp, Facebook, Twitter all have crawlers
10. **Image redirect chains** — LinkedIn especially fails on multi-hop redirects

---

## 5. Dark Social & Attribution

### Key insight (Source: Ogrilla - Dark Social article):
- **"Direct traffic" in Google Analytics is often misattributed** — much of it comes from private messaging (WhatsApp, iMessage, Slack, Discord)
- **SparkToro experiment (2023)**: 100% of traffic from WhatsApp, Slack, Discord shows as "Direct". 75% from Facebook Messenger. 30% from Instagram DMs.
- **69% of social referrals arrive without referrer data** (Alexis Madrigal, The Atlantic, 2012)
- SparkToro found 95% of its own site traffic shows as "Direct" — demonstrably false

### What can be measured:
- **Not the click** (browser doesn't forward referrer from messaging apps — protocol constraint)
- **The share itself** — When a link is pasted, the platform's crawler fetches OG tags. That request is loggable.
- User-agent identifies the platform, URL identifies the page, timestamp tells when

### Implication for LinkPeek:
> This is a **massive feature opportunity**: offering "Share Tracking" (like Ogrilla does) — detecting which platforms crawl your OG tags and when, giving users visibility into Dark Social shares.

---

## 6. E-Commerce / Advanced OG Strategies

### Amazon's Link Preview Evolution (Source: Ogrilla):
1. **Stage 1**: Simple product photos as OG images
2. **Stage 2**: Preview images with star ratings embedded (social proof)
3. **Stage 3**: Dynamic OG images with seasonal accents (Christmas, Black Friday badges)

### Strategic principles for OG images:
1. **Social proof in preview** — Embed star ratings, review counts directly in OG image
2. **Seasonal/contextual updates** — Swap OG images for campaigns (Black Friday, Holiday Deals)
3. **Clean design with brand elements** — High-contrast, focused, brand colors/logo
4. **Individual OG images per page** — Don't reuse one image for everything
5. **A/B test OG images** — 47% CTR increase documented from OG image optimization

### Key stat:
> Links with rich previews receive **up to 2× more clicks** than plain text URLs (multiple sources confirm).
> Posts with optimized preview images achieve **179% more engagement**.

---

## 7. URL Security Concerns

### Threats LinkPeek could detect (Source: LinkPreview.eu):
- **Phishing** — Fake sites mimicking legitimate ones
- **Typosquatting** — `googel.com`, `amazom.com`
- **Homoglyph attacks** — Cyrillic 'а' vs Latin 'a'
- **URL shortener abuse** — Hiding malicious destinations
- **Open redirects** — Exploiting legitimate redirect features

### Warning signs:
- Unusual domain extensions (.xyz, .top)
- IP addresses instead of domains
- Many subdomains (`login.secure.bank.evil.com`)
- Shortened URLs from unknown sources

---

## 8. CTR & Engagement Data Points

| Stat | Source |
|------|--------|
| Rich previews → **2× more clicks** | Multiple (LinkPreview.eu, Ogrilla) |
| Tweets with cards → **2× more engagement** | LinkPreview.eu |
| Posts with images → **2× more engagement** on LinkedIn | LinkPreview.eu |
| A/B testing OG image → **47% CTR increase** | Ogrilla (opengraph.xyz study) |
| Optimized OG images → **179% more engagement** | Ogrilla |
| Visual content → **80% of brain input** | LinkPreview.eu |
| Time to grab attention → **sub-second** | LinkPreview.eu |
| **75% of all web shares are private** (Dark Social) | RadiumOne 2014 |

---

## 9. Competitor Feature Matrix

| Feature | LinkPeek (Us) | LinkPreview.eu | Ogrilla |
|---------|---------------|----------------|---------|
| Multi-platform preview | ✅ 6 platforms | ✅ | ✅ |
| Audit engine | ✅ 50+ checks | ❌ (just shows tags) | ✅ (checklist style) |
| Fix generator | ✅ Copy-paste tags | ❌ | ❌ |
| Localhost support | ✅ (killer feature) | ❌ | ❌ |
| Custom link creation | ❌ | ✅ (core product) | ❌ |
| Share tracking | ❌ | ❌ | ✅ (core product) |
| Dark Social analytics | ❌ | ❌ | ✅ |
| Blog/SEO content | ❌ (broken) | ✅ (10 articles) | ✅ (6 articles) |
| URL security checks | ❌ | ✅ (claims) | ❌ |
| Image format detection | ❌ | ❌ | ✅ |
| Facebook mockup | ❌ | ✅ | ✅ |
| Click analytics | ❌ | ✅ | ✅ |
| Figma export | ✅ (prototype) | ❌ | ❌ |
| Per-platform image sizing advice | Partial | ❌ | ✅ (very detailed) |
| og:image:type parsing | ❌ | ❌ | ✅ |

---

## 10. Gap Analysis: What LinkPeek Can Do Better

### 🔴 CRITICAL — Incorrect/Missing Audit Rules

#### 1. WhatsApp image size limit is WRONG in our code
**File**: `auditEngine.ts` line 151
```typescript
// CURRENT (line 151):
if (has(data.image) && data.imageSize != null && data.imageSize > 300 * 1024) {
// SHOULD BE:
if (has(data.image) && data.imageSize != null && data.imageSize > 600 * 1024) {
```
**Why**: Ogrilla's 2026 guide (the most authoritative, platform-tested source) says **600 KB**, not 300 KB. Our previous conversation already identified this but the audit message still says "~300 KB". The 300 KB threshold was overly conservative.

#### 2. No WhatsApp minimum dimension check (100×100 px)
WhatsApp won't show ANY preview if image is below 100×100 px. We check for 200×200 (Instagram) and 600px width, but never for WhatsApp's 100px minimum.
```
Missing check: if width < 100 OR height < 100 → WhatsApp shows NO image at all
```

#### 3. No WhatsApp image format check (GIF/SVG rejected)
WhatsApp rejects GIF and SVG. We never check the image format/extension or Content-Type.

#### 4. No Facebook-specific image size checks
Facebook needs **200×200 px minimum** (not 100 like WhatsApp). We have LinkedIn 1200px check but no Facebook 200px minimum or the expanded preview threshold (width > 445px, height > 232px, ratio > 0.797).

#### 5. No Instagram DM file size check (8 MB limit)
Instagram DMs cap at 8 MB. We have no check for this.

#### 6. Facebook 8 MB file size limit not checked
We only check WhatsApp's limit. Facebook also has a max (8 MB).

### 🟡 WARNING — Missing Meta Tag Parsing

#### 7. Not parsing `og:image:type`
We don't extract `og:image:type` (e.g., `image/jpeg`, `image/png`). This would let us warn about format mismatches (SVG used on WhatsApp, etc.) even without probing the actual file.

#### 8. Not parsing `twitter:site` and `twitter:creator`
These are recommended Twitter card tags. We don't parse or audit them. Missing `twitter:site` means no account attribution on X posts.

#### 9. Not parsing `og:image:url` (alias for `og:image`)
In `parseOG.ts` (client-side parser), we don't check for `og:image:url`. The server-side route.ts does check it (line 139), but the client-side fallback doesn't.

#### 10. Not detecting `og:locale`
Some platforms use this for language-specific rendering.

### 🟡 WARNING — Audit Logic Gaps

#### 11. No check for image redirect chains
LinkedIn especially fails on multi-hop image redirects. Our HEAD request follows redirects but we don't warn if there are redirects.

#### 12. No robots.txt check
If robots.txt blocks WhatsApp/Facebook/Twitter crawlers, previews won't work. We could add a check by fetching `/robots.txt`.

#### 13. No SSL/certificate validation
We detect `http://` vs `https://` on image URLs, but we don't check for mixed content, expired certs, or self-signed certificates.

#### 14. No check for multiple og:image tags
Multiple og:image tags cause unpredictable behavior. We should warn if found.

#### 15. Missing WhatsApp large vs small preview distinction in audit messaging
We should tell users: "Your image is 250px wide — WhatsApp will show a small thumbnail. Use ≥ 300px for a full-width preview."

#### 16. Facebook expanded vs compact preview logic not present
Should audit: width > 445, height > 232, ratio > 0.797 for "expanded" preview on Facebook.

### 🟢 FEATURE — Opportunities from Competitors

#### 17. Image format detection (from actual file / Content-Type)
During the HEAD request on the image, we could capture `Content-Type` header and cross-check against platform requirements (e.g., WhatsApp rejects GIF/SVG).

#### 18. Actual image dimensions probing
We rely on `og:image:width/height` tags. If missing, we could actually download the image and detect real dimensions — much more reliable.

#### 19. Facebook mockup missing
We have WhatsApp, Twitter, LinkedIn, Slack, Discord, Instagram mockups — but no Facebook mockup. Both competitors have Facebook previews.

#### 20. Blog/content strategy
Both competitors have substantial blog content driving SEO traffic. Our blog is reportedly broken. Need to fix and add content targeting keywords like:
- "WhatsApp link preview not working"
- "Facebook og image not showing"
- "Twitter card not displaying"
- "LinkedIn preview image wrong"
- "og image size requirements 2026"

---

## Source URLs (for future re-scraping)

### LinkPreview.eu (10 articles)
1. https://linkpreview.eu/en/blog/og-image-not-showing-facebook
2. https://linkpreview.eu/en/blog/fix-link-preview-whatsapp
3. https://linkpreview.eu/en/blog/twitter-card-not-displaying
4. https://linkpreview.eu/en/blog/linkedin-preview-image-wrong
5. https://linkpreview.eu/en/blog/customize-link-preview-no-coding
6. https://linkpreview.eu/en/blog/social-media-preview-generator-guide
7. https://linkpreview.eu/en/blog/best-link-preview-tools-2025
8. https://linkpreview.eu/en/blog/boost-your-ctr
9. https://linkpreview.eu/en/blog/url-security
10. https://linkpreview.eu/en/blog/importance-of-og-tags

### Ogrilla.com (6 articles)
1. https://www.ogrilla.com/blog/whatsapp-link-preview-guide
2. https://www.ogrilla.com/blog/facebook-og-image-size
3. https://www.ogrilla.com/blog/instagram-dm-link-preview-guide
4. https://www.ogrilla.com/blog/direct-traffic-dark-social
5. https://www.ogrilla.com/blog/amazon-link-previews-lessons
6. https://www.ogrilla.com/blog/ultimate-link-previews-guide-2025

---

## Quick Reference: Ideal OG Image

```
Dimensions: 1200 × 630 px
Aspect Ratio: 1.91:1
File Size: < 300 KB (safe for ALL platforms including WhatsApp)
Format: JPG or PNG (universal compatibility)
URL: Absolute, HTTPS, no redirects
```

**This is the "golden image" that works perfectly on every platform.**

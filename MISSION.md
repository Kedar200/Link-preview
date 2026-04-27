# LinkPeek: Product Vision & Strategic Roadmap

## 🎯 Product Identity
**Tagline**: "See exactly how your links look on social media—before you hit publish."
**Plain English**: LinkPeek is a professional-grade tool that shows you a 100% accurate preview of your website on platforms like WhatsApp, X, and LinkedIn. It audits your tags and gives you simple, non-technical instructions to fix them so your links never look broken again.
**Target Audience**: Everyone who shares links—Marketers, SEOs, Designers, Business Owners, and Developers.

---

## ✨ Core Features

### 1. The Audit & Insights (Core Value)
- **Deep Audit**: Scans for 50+ metadata points beyond basic OG tags.
- **Plain English Explanations**: "Your image is too large for WhatsApp" instead of "og:image exceeds 300KB".
- **Per-Platform Scoring**: Visual scores (e.g., WhatsApp 80%, Twitter 100%) to identify failures instantly.
- **Fix Generator**: One-click "Generate Meta Tags" based on audit findings.

### 2. High-Fidelity Mockups
- **Platform Replicas**: 100% accurate UI for WhatsApp, X (Twitter), LinkedIn, Slack, Discord, and Facebook.
- **Audio/Video Detection**: Detects and mocks Slack audio players and Twitter player cards.
- **Image Validation**: Size, format, dimensions, aspect ratio, HTTP vs HTTPS, and hotlink protection checks.

### 3. Developer & Designer Experience
- **Localhost Zero-Tunnel**: "Preview OG tags on localhost without ngrok"—the killer feature.
- **Auto-Refresh**: Page re-fetches automatically as the developer saves their file.
- **Figma Export (v2)**: One-click export to editable SVG/Vector layers for designers (Roadmap).

---

## 🛠️ Technical Details
- **Tech Stack**: Next.js, Tailwind CSS, TypeScript, Cheerio (parsing), Vercel (hosting).
- **Fetching Strategy**:
    - **Localhost**: Client-side fetch (nothing leaves the browser).
    - **Live URLs**: Vercel Serverless API + Cheerio.
- **Infrastructure**: No database, no auth, no login. Speed and privacy are paramount.
- **CORS Handling**: Intelligent proxying for images and client-side fetching for local development.

---

## 💰 Business Model
- **Free Tier**: 5 URLs per day, basic warnings, localhost feature (free forever).
- **Pro Tier**: Full audit, fix generator, unlimited URLs.
- **Team Tier**: Bulk CSV checker, monitoring alerts, shareable reports.

---

## 📈 Marketing & SEO
- **The Localhost Angle**: Primary SEO play: **"preview og tags on localhost without ngrok"**.
- **Viral Mechanism**: Shareable audit scorecards for social proof.
- **Distribution**: Product Hunt launch, Reddit communities (`r/webdev`, `r/nextjs`, `r/entrepeneur`).
- **Open Source Strategy**: Open core previews; proprietary audit engine.

---

## ⚖️ Competitor Gap
- **opengraph.xyz**: Ugly, no audit, no localhost.
- **metatags.io**: Better design, but still lacks deep audit and localhost support.
- **Official Validators**: Platform-specific, technical, and developer-only.
- **LinkPeek Gap**: All platforms, beautiful UI, audit insights, localhost support, built for everyone.

---

## 🎨 Design Philosophy
- **UI is the Product**: Premium aesthetics for non-developer audiences.
- **True Replicas**: Must feel like real apps, not diagrams.
- **Mobile First**: Most non-dev users check links on mobile.
- **The "Wow" Moment**: Seeing your link inside all 6 platforms simultaneously.

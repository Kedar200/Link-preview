import type { OGData } from '@/types';
import { esc, trunc, wrapText } from '../figma-clipboard';

export function buildDiscordFigmaClipboard(
  data: OGData | null,
  theme: 'light' | 'dark',
  embeddedImages: { ogImage: string; avatar: string }
): string {
  const isDark = theme === 'dark' || true; // Discord mock defaults to dark
  const bgMain = '#313338';
  const bgServerHeader = '#111214';
  const bgHeader = '#313338';
  const textMain = '#dbdee1';
  const textTitle = '#f2f3f5';
  const textMuted = '#949ba4';
  
  const bgEmbed = '#2b2d31';
  const bgInput = '#383a40';
  const bgCode = '#1e1f22';
  
  const linkColor = '#00a8fc';
  const dividerCol = '#3f4147';

  const f = `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

  const title = data ? esc(trunc(data.title || data.domain || 'LinkPeek - Social Media Previews', 50)) : 'LinkPeek - Social Media Previews';
  const domain = data ? esc(data.siteName || data.domain || 'LinkPeek') : 'LinkPeek';
  const desc = data ? esc(trunc(data.description || '', 80)) : '';
  const url = data ? esc(data.url || 'https://linkpeek.com/demo') : 'https://linkpeek.com/demo';
  const ogImgUri = embeddedImages.ogImage;

  const W = 390, H = 844, BORDER = 16, R = 55;
  const SX = BORDER, SY = BORDER, SW = W - 2 * BORDER, SH = H - 2 * BORDER;
  const innerR = R - BORDER;

  const cardW = SW - 80;
  const cardImgH = Math.round(cardW / 1.91);

  const hasOgImage = !!ogImgUri;
  const ogImageDef = hasOgImage ? `
    <pattern id="dcOgImage" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${ogImgUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';
  const avatarDef = `
    <pattern id="dcAvatar1" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="https://github.com/Kedar200.png" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <pattern id="dcAvatar2" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="https://i.pravatar.cc/100?img=33" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <clipPath id="dcImgClip"><rect x="0" y="0" width="${cardW - 24}" height="${cardImgH}" rx="6"/></clipPath>
  `;

  // Icons
  const searchIcon = `<path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" fill="currentColor"/>`;
  const inboxIcon = `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>`;
  const hashIcon = `<path d="M10.59 4l-1.63 7H4.5v2h4.03l-1.16 5H3.5v2h3.41l-1.63 7h2.24l1.63-7h4.43l-1.63 7h2.24l1.63-7h4.43v-2h-4.03l1.16-5h3.86v-2h-3.41l1.63-7h-2.24l-1.63 7h-4.43l1.63-7H10.59zm3.56 9h-4.43l1.16-5h4.43l-1.16 5z" fill="${textMuted}"/>`;
  const peopleIcon = `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="${textMuted}"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm3.2 2.8C18.15 13.28 17.13 13 16 13c-1.13 0-2.15.28-3.2.8.71 1.05 1.2 2.29 1.2 3.7v1.5h6v-1.5c0-1.41-.49-2.65-1.2-3.7z" fill="${textMuted}"/>`;
  
  const menuIcon = `<line x1="3" y1="12" x2="21" y2="12" stroke="${textTitle}" stroke-width="2.5"/><line x1="3" y1="6" x2="21" y2="6" stroke="${textTitle}" stroke-width="2.5"/><line x1="3" y1="18" x2="21" y2="18" stroke="${textTitle}" stroke-width="2.5"/>`;

  const emojiIcon = `<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 1.5 8.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="${textMuted}"/>`;
  const giftIcon = `<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm-3-4v2h8V7H8z" fill="${textMuted}"/>`;
  const sendIcon = `<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#4f545c"/>`;
  const plusIcon = `<line x1="12" y1="5" x2="12" y2="19" stroke="#383a40" stroke-width="3" stroke-linecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="#383a40" stroke-width="3" stroke-linecap="round"/>`;

  const cardContent = data ? `
    <rect width="${cardW}" height="${34 + 20 + 20 + cardImgH + 12}" rx="4" fill="${bgEmbed}"/>
    <rect x="0" y="0" width="4" height="${34 + 20 + 20 + cardImgH + 12}" fill="#202225"/>
    <g transform="translate(12, 12)">
      <text x="0" y="10" font-family="${f}" font-size="12" font-weight="bold" fill="${textMuted}">${domain}</text>
      <text x="0" y="28" font-family="${f}" font-size="15" font-weight="bold" fill="${linkColor}">${title}</text>
      ${desc ? `<text x="0" y="46" font-family="${f}" font-size="14" fill="${textMain}">${desc}</text>` : ''}
      ${hasOgImage ? `<g transform="translate(0, 56)" clip-path="url(#dcImgClip)"><rect width="${cardW - 24}" height="${cardImgH}" fill="url(#dcOgImage)"/></g>` : ''}
    </g>
  ` : `
    <rect width="${cardW}" height="40" rx="4" fill="${bgEmbed}"/>
    <rect x="0" y="0" width="4" height="40" fill="#202225"/>
    <text x="12" y="24" font-family="${f}" font-size="13" font-style="italic" fill="${textMuted}">Waiting for link...</text>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <clipPath id="screenClip"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}"/></clipPath>
  ${ogImageDef}
  ${avatarDef}
</defs>

<g id="Phone-Mockup">
  <rect id="Device-Body" width="${W}" height="${H}" rx="${R}" fill="#000"/>
  <rect id="Screen-BG" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}" fill="${bgMain}"/>

  <g clip-path="url(#screenClip)">
    
    <!-- Topmost Server Header -->
    <g transform="translate(${SX}, ${SY})">
      <rect width="${SW}" height="44" fill="${bgServerHeader}"/>
      <line x1="0" y1="44" x2="${SW}" y2="44" stroke="#1e1f22" stroke-width="1"/>
      <circle cx="80" cy="22" r="8" fill="url(#dcAvatar1)"/>
      <text x="92" y="26" font-family="${f}" font-size="13" font-weight="bold" fill="${textTitle}">LinkPeek</text>
      
      <g transform="translate(${SW - 60}, 14)" fill="${textTitle}" opacity="0.8">
        <svg width="18" height="18">${searchIcon}</svg>
      </g>
      <g transform="translate(${SW - 34}, 14)" fill="${textTitle}" opacity="0.8">
        <svg width="18" height="18">${inboxIcon}</svg>
      </g>
    </g>

    <!-- Channel Header -->
    <g transform="translate(${SX}, ${SY + 44})">
      <rect width="${SW}" height="40" fill="${bgHeader}"/>
      <g transform="translate(16, 8)"><svg width="24" height="24">${menuIcon}</svg></g>
      <g transform="translate(56, 10)"><svg width="20" height="20">${hashIcon}</svg></g>
      <text x="80" y="24" font-family="${f}" font-size="16" font-weight="bold" fill="${textTitle}">general</text>
      <circle cx="140" cy="20" r="2" fill="#4f545c"/>
      <text x="148" y="23" font-family="${f}" font-size="14" fill="${linkColor}">Share your cool links here!</text>
      <g transform="translate(${SW - 40}, 8)"><svg width="24" height="24">${peopleIcon}</svg></g>
    </g>

    <!-- Messages -->
    <g transform="translate(${SX}, ${SY + 84})">
      
      <!-- Fake Message 1 -->
      <g transform="translate(12, 12)">
        <circle cx="20" cy="20" r="20" fill="#ff7300"/>
        <text x="20" y="26" font-size="20" text-anchor="middle">🔥</text>
        <g transform="translate(52, 0)">
          <text x="0" y="14" font-family="${f}" font-size="15" font-weight="500" fill="#f38a1d">Alex</text>
          <rect x="34" y="2" width="36" height="14" rx="2" fill="#313338" stroke="#3f4147" stroke-width="1"/>
          <text x="38" y="12" font-family="${f}" font-size="9" font-weight="bold" fill="${textMuted}">💻 DEV</text>
          <text x="74" y="14" font-size="14">🤖</text>
          <text x="94" y="14" font-family="${f}" font-size="12" fill="${textMuted}">2/8/26, 8:20 AM</text>

          <text x="0" y="36" font-family="${f}" font-size="15" fill="${textMain}">Has anyone checked out this new tool?</text>
          <text x="0" y="56" font-family="${f}" font-size="15" fill="${textMain}">It creates these beautiful social media previews instantly.</text>
        </g>
      </g>

      <!-- Date Divider -->
      <g transform="translate(0, 100)">
        <line x1="12" y1="12" x2="130" y2="12" stroke="${dividerCol}" stroke-width="1"/>
        <text x="${SW/2}" y="16" font-family="${f}" font-size="12" font-weight="bold" fill="${textMuted}" text-anchor="middle">March 7, 2026</text>
        <line x1="228" y1="12" x2="${SW - 12}" y2="12" stroke="${dividerCol}" stroke-width="1"/>
      </g>

      <!-- Fake Message 2 (with our link) -->
      <g transform="translate(12, 136)">
        <circle cx="20" cy="20" r="20" fill="url(#dcAvatar2)"/>
        <g transform="translate(52, 0)">
          <text x="0" y="14" font-family="${f}" font-size="15" font-weight="500" fill="#d126cc">Sam</text>
          <rect x="36" y="2" width="40" height="14" rx="2" fill="#313338" stroke="#3f4147" stroke-width="1"/>
          <text x="40" y="12" font-family="${f}" font-size="9" font-weight="bold" fill="${textMuted}"><tspan fill="#3ba55c">✦</tspan> MOD</text>
          <text x="82" y="14" font-family="${f}" font-size="12" fill="${textMuted}">3/7/26, 11:09 PM</text>

          <rect x="0" y="22" width="144" height="20" rx="4" fill="${bgCode}"/>
          <text x="4" y="36" font-family="monospace" font-size="13" fill="${textMain}">https://linkpeek.com</text>
          <text x="148" y="36" font-family="${f}" font-size="15" fill="${textMain}">&lt;- Yeah, I've been using</text>
          <text x="0" y="56" font-family="${f}" font-size="15" fill="${textMain}">it for all my projects recently.</text>

          <text x="0" y="76" font-family="${f}" font-size="15" fill="${linkColor}" text-decoration="underline">${url}</text>

          <g transform="translate(0, 88)">
            ${cardContent}
          </g>

          <g transform="translate(0, ${88 + 34 + 20 + 20 + cardImgH + 12 + 12})">
            <rect x="0" y="-14" width="100" height="20" rx="4" fill="${bgCode}"/>
            <text x="4" y="0" font-family="monospace" font-size="13" fill="${textMain}">The meta tags</text>
            <text x="104" y="0" font-family="${f}" font-size="15" fill="${textMain}">are generated flawlessly.</text>
          </g>

        </g>
      </g>
    </g>

    <!-- Input Area -->
    <g transform="translate(${SX}, ${SY + SH - 64})">
      <rect width="${SW}" height="64" fill="${bgMain}"/>
      
      <g transform="translate(12, 8)">
        <rect width="${SW - 24}" height="44" rx="22" fill="${bgInput}"/>
        <circle cx="22" cy="22" r="12" fill="#4f545c"/>
        <g transform="translate(14, 14)"><svg width="16" height="16">${plusIcon}</svg></g>

        <text x="44" y="27" font-family="${f}" font-size="15" fill="${textMuted}">Message #general</text>

        <g transform="translate(${SW - 24 - 100}, 11)"><svg width="22" height="22">${emojiIcon}</svg></g>
        <g transform="translate(${SW - 24 - 70}, 11)"><svg width="22" height="22">${giftIcon}</svg></g>
        <g transform="translate(${SW - 24 - 40}, 12)"><svg width="20" height="20">${sendIcon}</svg></g>
      </g>
    </g>

    <!-- Home Indicator -->
    <rect x="${SX + SW/2 - 65}" y="${SY + SH - 14}" width="130" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
  </g>

  <!-- Notch -->
  <g id="Notch">
    <rect x="${W / 2 - 80}" y="0" width="160" height="34" fill="#000" rx="0"/>
    <rect x="${W / 2 - 80}" y="24" width="160" height="10" fill="#000" rx="0"/>
    <circle cx="${W / 2 + 50}" cy="18" r="6" fill="#111" stroke="rgba(255,255,255,0.05)"/>
  </g>
</g>
</svg>`;
}

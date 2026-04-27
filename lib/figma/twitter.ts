import type { OGData } from '@/types';
import { esc, trunc, wrapText } from '../figma-clipboard';

export function buildTwitterFigmaClipboard(
  data: OGData | null,
  theme: 'light' | 'dark',
  embeddedImages: { ogImage: string; avatar: string }
): string {
  const bgMain = '#000000';
  const textMain = '#e7e9ea';
  const textMuted = '#71767b';
  const borderCol = '#2f3336';
  const blueColor = '#1d9bf0';
  const f = `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

  const title = data ? esc(trunc(data.title || data.domain || 'Untitled', 50)) : '';
  const domain = data ? esc(data.siteName?.toLowerCase() || data.domain?.toLowerCase() || '') : '';
  const ogImgUri = embeddedImages.ogImage;
  // Fallback to random default avatars if not provided
  const avatar1 = embeddedImages.avatar || 'https://i.pravatar.cc/100?img=11';

  const W = 390, H = 844, BORDER = 16, R = 55;
  const SX = BORDER, SY = BORDER, SW = W - 2 * BORDER, SH = H - 2 * BORDER;
  const innerR = R - BORDER;

  const cardW = SW - 84; // 390 - 32 (padding) - 68 (left margin) = 290
  const cardImgH = Math.round(cardW / 1.91);

  const hasOgImage = !!ogImgUri;
  const ogImageDef = hasOgImage ? `
    <pattern id="twOgImage" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${ogImgUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';
  
  // We use placeholder images or rectangles if avatar is not embedded properly. 
  // Figma accepts base64 embedded images.
  const avatarDef = `
    <pattern id="twAvatar" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${avatar1}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>`;

  // Top header icons
  const xLogo = `<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z" fill="${textMain}"/>`;
  
  // Tweet Action Bar Icons
  const replyIcon = `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const retweetIcon = `<path d="M17 2l4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const likeIcon = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const viewIcon = `<line x1="18" y1="20" x2="18" y2="10" stroke="${textMuted}" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="${textMuted}" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="${textMuted}" stroke-width="2" stroke-linecap="round"/>`;
  const bookmarkIcon = `<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const shareIcon = `<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round"/><polyline points="16 6 12 2 8 6" fill="none" stroke="${textMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="2" x2="12" y2="15" stroke="${textMuted}" stroke-width="2" stroke-linecap="round"/>`;
  
  const verifiedBadge = `<svg width="18" height="18" viewBox="0 0 24 24" fill="${blueColor}"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.846 3.45-.065.342-.1.69-.1 1.05 0 2.21 1.71 4 3.918 4 .47 0 .92-.086 1.336-.25.52 1.334 1.82 2.25 3.337 2.25s2.816-.916 3.337-2.25c.416.164.866.25 1.336.25 2.21 0 3.918-1.79 3.918-4 0-.36-.035-.708-.1-1.05 1.106-.704 1.846-1.99 1.846-3.45z"/><path d="M10.23 15.6l-3.32-3.3c-.3-.3-.3-.78 0-1.08.3-.3.78-.3 1.08 0l2.25 2.24 6.17-6.17c.3-.3.78-.3 1.08 0 .3.3.3.78 0 1.08l-6.71 6.71c-.15.15-.35.22-.54.22-.2 0-.4-.07-.55-.2z" fill="white"/></svg>`;
  const menuIcon = `<circle cx="5" cy="12" r="2" fill="${textMuted}"/><circle cx="12" cy="12" r="2" fill="${textMuted}"/><circle cx="19" cy="12" r="2" fill="${textMuted}"/>`;

  const linkPreviewCard = data ? `
    <g transform="translate(0,0)">
      <clipPath id="cardClip"><rect width="${cardW}" height="${cardImgH}" rx="16"/></clipPath>
      <rect width="${cardW}" height="${cardImgH}" rx="16" fill="#16181c" stroke="${borderCol}" stroke-width="1"/>
      <g clip-path="url(#cardClip)">
        <rect width="${cardW}" height="${cardImgH}" fill="${hasOgImage ? 'url(#twOgImage)' : '#16181c'}"/>
        ${!hasOgImage ? `<g transform="translate(${cardW/2 - 16}, ${cardImgH/2 - 16})"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="${textMuted}" stroke-width="1.5"/><path d="M3 9h18M9 21V9" stroke="${textMuted}" stroke-width="1.5"/></g>` : ''}
        ${title ? `<rect x="8" y="${cardImgH - 28}" width="${Math.min(cardW - 16, title.length * 7 + 16)}" height="20" rx="4" fill="rgba(0,0,0,0.7)"/>
        <text x="16" y="${cardImgH - 14}" font-family="${f}" font-size="13" font-weight="500" fill="#ffffff">${title}</text>` : ''}
      </g>
    </g>
    ${domain ? `<text x="2" y="${cardImgH + 20}" font-family="${f}" font-size="13" fill="${textMuted}">From ${domain}</text>` : ''}
  ` : `
    <rect width="${cardW}" height="${cardImgH}" rx="16" fill="#16181c" stroke="${borderCol}" stroke-width="1"/>
    <text x="${cardW/2}" y="${cardImgH/2}" text-anchor="middle" font-family="${f}" font-size="13" fill="${textMuted}">Waiting for link...</text>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <clipPath id="screenClip"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}"/></clipPath>
  ${ogImageDef}
  ${avatarDef}
</defs>

<g id="Phone-Mockup">
  <!-- Device Body -->
  <rect id="Device-Body" width="${W}" height="${H}" rx="${R}" fill="#000"/>
  
  <!-- Screen Background -->
  <rect id="Screen-BG" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}" fill="${bgMain}"/>

  <g clip-path="url(#screenClip)">
    
    <!-- Top Header -->
    <g transform="translate(${SX}, ${SY + 8})">
      <rect width="${SW}" height="48" fill="${bgMain}"/>
      <circle cx="32" cy="24" r="16" fill="url(#twAvatar)"/>
      <g transform="translate(${SW/2 - 11}, 13)">${xLogo}</g>
      <rect x="${SW - 96}" y="10" width="80" height="28" rx="14" fill="none" stroke="${textMain}" stroke-width="1"/>
      <text x="${SW - 56}" y="29" font-family="${f}" font-size="14" font-weight="bold" fill="${textMain}" text-anchor="middle">Subscribe</text>
    </g>

    <!-- Tabs -->
    <g transform="translate(${SX}, ${SY + 56})">
      <rect width="${SW}" height="48" fill="${bgMain}"/>
      <line x1="0" y1="48" x2="${SW}" y2="48" stroke="${borderCol}" stroke-width="1"/>
      <text x="${SW/4}" y="28" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}" text-anchor="middle">For you</text>
      <rect x="${SW/4 - 28}" y="44" width="56" height="4" rx="2" fill="${blueColor}"/>
      <text x="${SW*0.75}" y="28" font-family="${f}" font-size="15" fill="${textMuted}" text-anchor="middle">Following</text>
    </g>

    <!-- Show Posts Banner -->
    <g transform="translate(${SX}, ${SY + 104})">
      <rect width="${SW}" height="44" fill="${bgMain}"/>
      <line x1="0" y1="44" x2="${SW}" y2="44" stroke="${borderCol}" stroke-width="1"/>
      <text x="${SW/2}" y="27" font-family="${f}" font-size="15" fill="${blueColor}" text-anchor="middle">Show 28 posts</text>
    </g>

    <!-- Main Tweet -->
    <g transform="translate(${SX}, ${SY + 148})">
      <rect width="${SW}" height="${140 + cardImgH + 50}" fill="${bgMain}"/>
      <line x1="0" y1="${140 + cardImgH + 50}" x2="${SW}" y2="${140 + cardImgH + 50}" stroke="${borderCol}" stroke-width="1"/>
      
      <circle cx="36" cy="36" r="20" fill="url(#twAvatar)"/>
      
      <g transform="translate(68, 16)">
        <text x="0" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}">Alex</text>
        <text x="40" y="14" font-family="${f}" font-size="15" fill="${textMuted}">@alex · 26s</text>
        
        <g transform="translate(${cardW - 18}, 5)">${menuIcon}</g>
        
        <text x="0" y="38" font-family="${f}" font-size="15" fill="${textMain}">This new link preview tool is exactly what I've</text>
        <text x="0" y="58" font-family="${f}" font-size="15" fill="${textMain}">been looking for. The generated cards look</text>
        <text x="0" y="78" font-family="${f}" font-size="15" fill="${textMain}">incredible!</text>
        
        <g transform="translate(0, 92)">
          ${linkPreviewCard}
        </g>
        
        <!-- Action Bar -->
        <g transform="translate(0, ${92 + cardImgH + 34})">
          <g transform="translate(0, 0) scale(0.9)"><svg width="24" height="24">${replyIcon}</svg></g>
          <g transform="translate(60, 0) scale(0.9)"><svg width="24" height="24">${retweetIcon}</svg></g>
          <g transform="translate(120, 0) scale(0.9)"><svg width="24" height="24">${likeIcon}</svg></g>
          <g transform="translate(180, 0) scale(0.9)"><svg width="24" height="24">${viewIcon}</svg></g>
          <g transform="translate(230, 0) scale(0.9)"><svg width="24" height="24">${bookmarkIcon}</svg></g>
          <g transform="translate(260, 0) scale(0.9)"><svg width="24" height="24">${shareIcon}</svg></g>
        </g>
      </g>
    </g>

    <!-- Second Tweet -->
    <g transform="translate(${SX}, ${SY + 148 + 140 + cardImgH + 50})">
      <rect width="${SW}" height="140" fill="${bgMain}"/>
      <circle cx="36" cy="36" r="20" fill="url(#twAvatar)"/>
      <g transform="translate(68, 16)">
        <text x="0" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}">Sam</text>
        <g transform="translate(38, 1)">${verifiedBadge}</g>
        <text x="60" y="14" font-family="${f}" font-size="15" fill="${textMuted}">@sam_tech · 2h</text>
        
        <text x="0" y="38" font-family="${f}" font-size="15" fill="${textMain}">Just dropped: A comprehensive guide on</text>
        <text x="0" y="58" font-family="${f}" font-size="15" fill="${textMain}">optimizing your social media meta tags for better</text>
        <text x="0" y="78" font-family="${f}" font-size="15" fill="${textMain}">engagement and click-through rates. Thread 🧵</text>
      </g>
    </g>

    <!-- Floating Action Button -->
    <g transform="translate(${SX + SW - 72}, ${SY + SH - 120})">
      <circle cx="28" cy="28" r="28" fill="${blueColor}"/>
      <path transform="translate(16, 16) scale(1)" d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" fill="white"/>
    </g>

    <!-- Bottom Nav -->
    <g transform="translate(${SX}, ${SY + SH - 50})">
      <rect width="${SW}" height="50" fill="${bgMain}"/>
      <line x1="0" y1="0" x2="${SW}" y2="0" stroke="${borderCol}" stroke-width="1"/>
      
      <!-- Home -->
      <path transform="translate(24, 12)" d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" fill="${textMain}"/>
      <circle cx="36" cy="42" r="3" fill="${blueColor}"/>
      
      <!-- Search -->
      <g transform="translate(94, 12)">
        <circle cx="11" cy="11" r="8" fill="none" stroke="${textMain}" stroke-width="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="${textMain}" stroke-width="2"/>
      </g>
      
      <!-- Communities -->
      <g transform="translate(164, 12)">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" fill="none" stroke="${textMain}" stroke-width="2"/>
        <line x1="16" y1="8" x2="2" y2="22" stroke="${textMain}" stroke-width="2"/>
        <line x1="17.5" y1="15" x2="9" y2="6.5" stroke="${textMain}" stroke-width="2"/>
      </g>
      
      <!-- Notifications -->
      <g transform="translate(234, 12)">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="${textMain}" stroke-width="2"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="${textMain}" stroke-width="2"/>
        <circle cx="18" cy="4" r="6" fill="${blueColor}"/>
        <text x="18" y="7" font-family="${f}" font-size="10" font-weight="bold" fill="white" text-anchor="middle">2</text>
      </g>
      
      <!-- Messages -->
      <g transform="translate(304, 12)">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="${textMain}" stroke-width="2"/>
      </g>
    </g>

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

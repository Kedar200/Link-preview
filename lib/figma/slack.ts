import type { OGData } from '@/types';
import { esc, trunc, wrapText } from '../figma-clipboard';

const NAMES = [
  'Jordan Smith',
  'Alex Rivera',
  'Taylor Morgan',
  'Casey Wright',
  'Riley Cooper',
  'Jamie Dawson',
  'Quinn Campbell',
  'Skyler Reed',
  'Morgan Page',
  'Avery Hayes'
];

export function buildSlackFigmaClipboard(
  data: OGData | null,
  theme: 'light' | 'dark',
  embeddedImages: { ogImage: string; avatar: string }
): string {
  const isDark = theme === 'dark';
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];

  const bgApp = isDark ? '#1a1d21' : '#ffffff';
  const textMain = isDark ? '#d1d2d3' : '#1d1c1d';
  const textTitle = isDark ? '#ffffff' : '#1d1c1d';
  const textMuted = isDark ? '#ababad' : '#616061';
  const headerBg = isDark ? '#1a1d21' : '#ffffff';
  const borderCol = isDark ? '#3a3b3c' : '#e2e2e2';
  const linkCol = isDark ? '#1d9bd1' : '#0b4d9c';
  
  const proBg = isDark ? '#3b2b13' : '#f4ebe1';
  const proText = isDark ? '#ffffff' : '#1d1c1d';
  const proBadge = '#a333c8'; // purple PRO badge

  const f = `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

  const title = data ? esc(trunc(data.title || data.domain || 'Untitled', 50)) : '';
  const domain = data ? esc(data.siteName || data.domain || 'youtube.com') : '';
  const desc = data ? esc(trunc(data.description || '', 80)) : '';
  const url = data ? esc(data.url || 'https://youtube.com') : 'https://youtube.com';
  const ogImgUri = embeddedImages.ogImage;
  const avatarUri = embeddedImages.avatar || 'https://i.pravatar.cc/100?img=60';

  const W = 390, H = 844, BORDER = 16, R = 55;
  const SX = BORDER, SY = BORDER, SW = W - 2 * BORDER, SH = H - 2 * BORDER;
  const innerR = R - BORDER;

  const hasOgImage = !!ogImgUri;
  const ogImageDef = hasOgImage ? `
    <pattern id="slOgImage" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${ogImgUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';
  const avatarDef = `
    <pattern id="slAvatar" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${avatarUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <clipPath id="slImgClip"><rect x="0" y="0" width="260" height="136" rx="8"/></clipPath>
  `;

  // Icons
  const backIcon = `<path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="${textTitle}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const plusIcon = `<line x1="12" y1="5" x2="12" y2="19" fill="none" stroke="currentColor" stroke-width="2"/><line x1="5" y1="12" x2="19" y2="12" fill="none" stroke="currentColor" stroke-width="2"/>`;
  const micIcon = `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
  const statusIcon = `<svg width="10" height="10" viewBox="0 0 24 24" fill="${isDark ? '#2bac76' : '#007a5a'}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
  const lockIcon = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${textMuted}" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;

  const cardContent = data ? `
    <rect width="4" height="${hasOgImage ? 250 : 100}" rx="2" fill="${isDark ? '#3a3b3c' : '#dddddd'}"/>
    <g transform="translate(12, 4)">
      <text x="0" y="10" font-family="${f}" font-size="12" font-weight="bold" fill="${textTitle}">${domain}</text>
      <text x="0" y="28" font-family="${f}" font-size="15" font-weight="bold" fill="${textTitle}">${title}</text>
      ${desc ? `<text x="0" y="46" font-family="${f}" font-size="14" fill="${textMain}">${desc}</text>` : ''}
      ${hasOgImage ? `<g transform="translate(0, 60)" clip-path="url(#slImgClip)"><rect width="260" height="136" fill="url(#slOgImage)" stroke="${borderCol}" stroke-width="1"/></g>` : ''}
    </g>
  ` : `
    <text x="0" y="12" font-family="${f}" font-size="14" font-style="italic" fill="${textMuted}">Waiting for link...</text>
  `;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <clipPath id="screenClip"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}"/></clipPath>
  ${ogImageDef}
  ${avatarDef}
</defs>

<g id="Phone-Mockup">
  <rect id="Device-Body" width="${W}" height="${H}" rx="${R}" fill="#000"/>
  <rect id="Screen-BG" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}" fill="${bgApp}"/>

  <g clip-path="url(#screenClip)">
    
    <!-- Status Bar Area -->
    <rect x="${SX}" y="${SY}" width="${SW}" height="48" fill="${headerBg}"/>
    
    <!-- Header -->
    <g transform="translate(${SX}, ${SY + 48})">
      <rect width="${SW}" height="56" fill="${headerBg}"/>
      <line x1="0" y1="56" x2="${SW}" y2="56" stroke="${borderCol}" stroke-width="1"/>
      <g transform="translate(16, 16)"><svg width="24" height="24">${backIcon}</svg></g>
      
      <g transform="translate(56, 10)">
        <rect width="36" height="36" rx="6" fill="url(#slAvatar)"/>
        <circle cx="36" cy="36" r="5" fill="#2bac76" stroke="${headerBg}" stroke-width="1.5"/>
      </g>
      
      <g transform="translate(100, 10)">
        <text x="0" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textTitle}">${esc(randomName)} (you)</text>
        <g transform="translate(0, 22)">
          ${statusIcon}
          <text x="14" y="9" font-family="${f}" font-size="12" font-weight="500" fill="${isDark ? '#2bac76' : '#007a5a'}">2 tabs</text>
          <g transform="translate(50, 0)">${lockIcon}</g>
        </g>
      </g>
    </g>

    <!-- Messages Area -->
    <g transform="translate(${SX}, ${SY + 104})">
      <text x="16" y="24" font-family="${f}" font-size="15" fill="${textMain}">talk to yourself here, but please bear in mind you'll</text>
      <text x="16" y="44" font-family="${f}" font-size="15" fill="${textMain}">have to supply both sides of the conversation.</text>

      <!-- PRO Banner -->
      <g transform="translate(16, 60)">
        <rect width="${SW - 32}" height="64" rx="12" fill="${proBg}"/>
        <rect x="12" y="14" width="28" height="14" rx="3" fill="${proBadge}"/>
        <text x="26" y="24" font-family="${f}" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">PRO</text>
        <text x="48" y="24" font-family="${f}" font-size="14" fill="${proText}">Messages and files older than 90 days are</text>
        <text x="48" y="44" font-family="${f}" font-size="14" fill="${proText}">hidden on your current subscription.</text>
        <text x="48" y="64" font-family="${f}" font-size="14" font-weight="500" fill="${linkCol}">Start a free trial</text>
      </g>

      <!-- Date Divider -->
      <g transform="translate(0, 160)">
        <line x1="16" y1="12" x2="${SW - 16}" y2="12" stroke="${borderCol}" stroke-width="1"/>
        <rect x="${SW/2 - 32}" y="0" width="64" height="24" rx="12" fill="${bgApp}" stroke="${borderCol}" stroke-width="1"/>
        <text x="${SW/2}" y="16" font-family="${f}" font-size="12" font-weight="bold" fill="${textTitle}" text-anchor="middle">Today</text>
      </g>

      <!-- Link Message -->
      <g transform="translate(16, 200)">
        <rect width="40" height="40" rx="6" fill="url(#slAvatar)"/>
        <g transform="translate(52, 0)">
          <text x="0" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textTitle}">${esc(randomName.toUpperCase())}</text>
          <text x="204" y="14" font-family="${f}" font-size="12" fill="${textMuted}">23:21</text>
          
          <text x="0" y="36" font-family="${f}" font-size="15" fill="${linkCol}" text-decoration="underline">${url}</text>

          <g transform="translate(0, 48)">
            ${cardContent}
          </g>
        </g>
      </g>

    </g>

    <!-- Input Area -->
    <g transform="translate(${SX}, ${SY + SH - 68})">
      <rect width="${SW}" height="68" fill="${headerBg}"/>
      <line x1="0" y1="0" x2="${SW}" y2="0" stroke="${borderCol}" stroke-width="1"/>
      
      <circle cx="32" cy="34" r="16" fill="none" stroke="${isDark ? '#555' : '#999'}" stroke-width="1"/>
      <g transform="translate(22, 24)" fill="none" stroke="${isDark ? '#ababad' : '#616061'}">${plusIcon}</g>

      <rect x="56" y="12" width="${SW - 104}" height="44" rx="12" fill="${isDark ? '#222529' : '#f8f8f8'}" stroke="${isDark ? '#3a3b3c' : '#dddddd'}" stroke-width="1"/>
      <text x="72" y="38" font-family="${f}" font-size="15" fill="${textMuted}">Jot something down</text>

      <g transform="translate(${SW - 36}, 22)" fill="none" stroke="${textMuted}">${micIcon}</g>
    </g>

    <!-- Home Indicator -->
    <rect x="${SX + SW/2 - 65}" y="${SY + SH - 14}" width="130" height="4" rx="2" fill="${isDark ? '#9ca3af' : '#1f2937'}"/>
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

import type { OGData } from '@/types';
import { esc, trunc, wrapText } from '../figma-clipboard';

export function buildLinkedInFigmaClipboard(
  data: OGData | null,
  theme: 'light' | 'dark',
  embeddedImages: { ogImage: string; avatar: string }
): string {
  const bgMain = '#ffffff';
  const textMain = '#111827';
  const textSub = '#6b7280';
  const blueColor = '#0a66c2';
  const borderCol = '#e5e7eb';
  const f = `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

  const title = data ? esc(trunc(data.title || data.domain || 'Untitled', 40)) : '';
  const domain = data ? esc(data.domain || '') : '';
  const url = data ? esc(data.url || 'https://youtube.com') : 'https://youtube.com';
  const ogImgUri = embeddedImages.ogImage;
  const avatarUri = embeddedImages.avatar || 'https://i.pravatar.cc/100?img=11';

  const W = 390, H = 844, BORDER = 16, R = 55;
  const SX = BORDER, SY = BORDER, SW = W - 2 * BORDER, SH = H - 2 * BORDER;
  const innerR = R - BORDER;

  const hasOgImage = !!ogImgUri;
  const ogImageDef = hasOgImage ? `
    <pattern id="liOgImage" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${ogImgUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';
  const avatarDef = `
    <pattern id="liAvatar" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${avatarUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <pattern id="liAvatar2" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="https://i.pravatar.cc/100?img=60" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <pattern id="liAvatar3" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="https://i.pravatar.cc/100?img=33" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <clipPath id="liCardImgClip"><rect x="0" y="0" width="100" height="100" rx="0"/></clipPath>
  `;

  // Icons
  const backIcon = `<path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const videoIcon = `<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#666"/>`;
  const infoIcon = `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const plusIcon = `<path d="M12 5v14M5 12h14" fill="none" stroke="${blueColor}" stroke-width="2"/>`;
  const micIcon = `<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="none" stroke="${textSub}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="${textSub}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="19" x2="12" y2="22" stroke="${textSub}" stroke-width="2" stroke-linecap="round"/>`;
  const checkIcon = `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#444"/>`;

  const cardContent = data ? `
    <rect width="280" height="100" rx="12" fill="#ffffff" stroke="#d1d5db" stroke-width="1"/>
    <g clip-path="url(#liCardImgClip)">
      <rect width="100" height="100" fill="${hasOgImage ? 'url(#liOgImage)' : '#f3f2ef'}"/>
      ${!hasOgImage ? `<g transform="translate(34, 34)"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></g>` : ''}
    </g>
    <line x1="100" y1="0" x2="100" y2="100" stroke="#e5e7eb" stroke-width="1"/>
    <text x="112" y="46" font-family="${f}" font-size="14" font-weight="bold" fill="${textMain}">${title}</text>
    <text x="112" y="64" font-family="${f}" font-size="12" fill="${textSub}">${domain}</text>
  ` : `
    <rect width="280" height="50" rx="12" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
    <text x="140" y="30" text-anchor="middle" font-family="${f}" font-size="14" font-style="italic" fill="${textSub}">Waiting for link...</text>
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
    
    <!-- Header -->
    <g transform="translate(${SX}, ${SY + 48})">
      <rect width="${SW}" height="64" fill="${bgMain}"/>
      <line x1="0" y1="64" x2="${SW}" y2="64" stroke="${borderCol}" stroke-width="1"/>
      <g transform="translate(16, 20)">
        <svg width="24" height="24">${backIcon}</svg>
      </g>
      <text x="56" y="30" font-family="${f}" font-size="16" font-weight="bold" fill="${textMain}">Pranav Khude</text>
      <circle cx="60" cy="42" r="3" fill="#16a34a"/>
      <text x="68" y="45" font-family="${f}" font-size="12" fill="${textSub}">Mobile • 2h ago</text>
      <g transform="translate(${SW - 80}, 20)"><svg width="20" height="20">${videoIcon}</svg></g>
      <g transform="translate(${SW - 40}, 20)"><svg width="20" height="20">${infoIcon}</svg></g>
    </g>

    <g transform="translate(${SX}, ${SY + 112})">
      
      <!-- Fake Top Message -->
      <g transform="translate(16, -20)">
        <circle cx="20" cy="20" r="20" fill="url(#liAvatar)"/>
        <text x="52" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}">Pranav Khude</text>
        <g transform="translate(142, 3)"><svg width="14" height="14">${checkIcon}</svg></g>
        <text x="160" y="14" font-family="${f}" font-size="12" fill="${textSub}">9:51 AM</text>
        <text x="52" y="44" font-size="32">👍</text>
      </g>

      <!-- Date Divider -->
      <g transform="translate(0, 50)">
        <line x1="16" y1="8" x2="130" y2="8" stroke="${borderCol}" stroke-width="1"/>
        <text x="${SW/2}" y="12" font-family="${f}" font-size="11" font-weight="bold" fill="${textSub}" text-anchor="middle" letter-spacing="1">SEP 21, 2025</text>
        <line x1="228" y1="8" x2="${SW-16}" y2="8" stroke="${borderCol}" stroke-width="1"/>
      </g>

      <!-- Shared Post -->
      <g transform="translate(16, 80)">
        <circle cx="20" cy="20" r="20" fill="url(#liAvatar2)"/>
        <text x="52" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}">Kedar Deshmukh</text>
        <rect x="174" y="2" width="14" height="12" rx="2" fill="${blueColor}"/>
        <text x="176" y="11" font-family="${f}" font-size="9" font-weight="bold" fill="#fff">in</text>
        <text x="194" y="14" font-family="${f}" font-size="13" fill="#4b5563">(He/Him)</text>
        <text x="246" y="14" font-family="${f}" font-size="12" fill="${textSub}">• 11:55 AM</text>

        <!-- Post Embed -->
        <g transform="translate(52, 24)">
          <rect width="290" height="130" rx="8" fill="none" stroke="${borderCol}" stroke-width="1"/>
          <circle cx="32" cy="32" r="20" fill="url(#liAvatar3)"/>
          <text x="64" y="24" font-family="${f}" font-size="14" font-weight="bold" fill="${textMain}">Ansh... • 2nd</text>
          <text x="64" y="40" font-family="${f}" font-size="12" fill="${textSub}">ML @ Zomato</text>
          <text x="64" y="54" font-family="${f}" font-size="11" fill="${textSub}">7mo • Edited • 🌐</text>
          
          <g transform="translate(220, 14)">
            <svg width="14" height="14">${plusIcon}</svg>
            <text x="18" y="12" font-family="${f}" font-size="14" font-weight="bold" fill="${blueColor}">Follow</text>
          </g>

          <text x="12" y="86" font-family="${f}" font-size="14" fill="#1f2937">You're in an ML Engineer interview at</text>
          <text x="12" y="106" font-family="${f}" font-size="14" fill="#1f2937">Google, and the interviewer asks:...</text>
          <text x="250" y="106" font-family="${f}" font-size="14" fill="${textSub}">more</text>
        </g>
        <circle cx="332" cy="164" r="10" fill="url(#liAvatar2)" stroke="#fff" stroke-width="1"/>
      </g>

      <!-- Date Divider 2 -->
      <g transform="translate(0, 260)">
        <line x1="16" y1="8" x2="150" y2="8" stroke="${borderCol}" stroke-width="1"/>
        <text x="${SW/2}" y="12" font-family="${f}" font-size="11" font-weight="bold" fill="${textSub}" text-anchor="middle" letter-spacing="1">TODAY</text>
        <line x1="208" y1="8" x2="${SW-16}" y2="8" stroke="${borderCol}" stroke-width="1"/>
      </g>

      <!-- Link Message -->
      <g transform="translate(16, 290)">
        <circle cx="20" cy="20" r="20" fill="url(#liAvatar2)"/>
        <text x="52" y="14" font-family="${f}" font-size="15" font-weight="bold" fill="${textMain}">Kedar Deshmukh</text>
        <rect x="174" y="2" width="14" height="12" rx="2" fill="${blueColor}"/>
        <text x="176" y="11" font-family="${f}" font-size="9" font-weight="bold" fill="#fff">in</text>
        <text x="194" y="14" font-family="${f}" font-size="13" fill="#4b5563">(He/Him)</text>
        <text x="246" y="14" font-family="${f}" font-size="12" fill="${textSub}">• 11:19 PM</text>

        <text x="52" y="38" font-family="${f}" font-size="15" font-weight="500" fill="${blueColor}" text-decoration="underline">${url}</text>

        <g transform="translate(52, 54)">
          ${cardContent}
        </g>
        <g transform="translate(${280 + 52 - 16}, ${54 + 100 + 8})"><svg width="16" height="16">${checkIcon}</svg></g>
      </g>

    </g>

    <!-- Input Area -->
    <g transform="translate(${SX}, ${SY + SH - 68})">
      <rect width="${SW}" height="68" fill="${bgMain}"/>
      <line x1="0" y1="0" x2="${SW}" y2="0" stroke="${borderCol}" stroke-width="1"/>
      
      <circle cx="32" cy="34" r="16" fill="none" stroke="${blueColor}" stroke-width="1"/>
      <g transform="translate(22, 24)"><svg width="20" height="20">${plusIcon}</svg></g>

      <rect x="56" y="13" width="${SW - 110}" height="42" rx="12" fill="#f3f2ef"/>
      <text x="72" y="38" font-family="${f}" font-size="15" fill="${textSub}">Write a message...</text>

      <g transform="translate(${SW - 40}, 22)"><svg width="24" height="24">${micIcon}</svg></g>
    </g>

    <!-- Home Indicator -->
    <rect x="${SX + SW/2 - 65}" y="${SY + SH - 14}" width="130" height="4" rx="2" fill="#d1d5db"/>
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

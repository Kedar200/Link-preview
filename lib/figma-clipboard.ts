// Generates a Figma-pasteable clipboard payload.
// Uses structured SVG with named groups and real <text> elements.
// When pasted into Figma (Cmd+V), creates editable layers:
//   - Named groups → Figma groups
//   - <text> → editable Figma text nodes
//   - <rect>, <circle> → editable vector shapes
//   - <image> with base64 data URIs → image fills (Figma drops external URLs)

import type { OGData } from '@/types';

export function esc(s: string) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
export function trunc(s: string, n: number) { return s.length > n ? s.slice(0,n) + '…' : s; }

/**
 * Fetches an image URL and returns a base64 data URI.
 * Uses a server-side proxy route to bypass CORS.
 * Returns empty string on failure (image will simply be omitted).
 */
async function fetchImageAsDataUri(url: string): Promise<string> {
  try {
    const res = await fetch(`/api/proxy-image?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('Proxy failed');
    const data = await res.json();
    return data.base64 || '';
  } catch (err) {
    console.error('Failed to proxy image for Figma clipboard:', err);
    return '';
  }
}

/** Word-wrap text to fit a given pixel width. Returns array of lines.
 *  Uses average character width estimation for proportional fonts.
 *  fontSize 15 at system-ui ≈ 7.8px per char avg, so for cardW ~334px 
 *  with 14px padding each side → usable ~306px → ~39 chars per line.
 */
export function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function getTheme(isDark: boolean) {
  return isDark ? {
    screen: '#0b141a', header: '#0b141a', text: '#e9edef', sub: '#8696a0',
    inBubble: '#202c33', outBubble: '#005c4b', dateBg: '#182229',
    inputBg: '#0b141a', pillBg: '#1f2c34', icon: '#8696a0',
    card: '#024a3c', cardTitle: '#e9edef', cardDesc: '#8ea59f', cardDomain: '#e9edef',
    headerBorder: 'rgba(255,255,255,0.05)', stickerBg: 'rgba(0,0,0,0.1)',
  } : {
    screen: '#efeae2', header: '#ffffff', text: '#000000', sub: '#54656f',
    inBubble: '#ffffff', outBubble: '#e1f6cb', dateBg: '#ffffff',
    inputBg: '#ffffff', pillBg: '#f0f2f5', icon: '#54656f',
    card: '#cfebba', cardTitle: '#000000', cardDesc: '#54656f', cardDomain: '#000000',
    headerBorder: 'rgba(0,0,0,0.05)', stickerBg: 'rgba(0,0,0,0.1)',
  };
}

/**
 * Builds the SVG string for Figma clipboard.
 * Now accepts pre-fetched base64 data URIs so the SVG is fully self-contained.
 */
function buildWhatsAppFigmaClipboard(
  data: OGData | null,
  theme: 'light' | 'dark',
  embeddedImages: { ogImage: string; avatar: string }
): string {
  const isDark = theme === 'dark';
  const c = getTheme(isDark);
  const f = `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;

  const title = data ? esc(trunc(data.title || data.domain || 'Untitled', 55)) : '';
  const desc = data ? esc(trunc(data.description || '', 120)) : '';
  const domain = data ? esc(data.domain || '') : '';
  const ogImgUri = embeddedImages.ogImage; // base64 data URI or empty
  const avatarUri = embeddedImages.avatar;  // base64 data URI or empty

  // Layout constants (matching the React component exactly)
  // Phone: 390x844 with 16px border → inner screen is 358x812 starting at (16,16)
  const W = 390, H = 844, BORDER = 16, R = 55;
  const SX = BORDER, SY = BORDER, SW = W - 2 * BORDER, SH = H - 2 * BORDER;
  const innerR = R - BORDER; // 39

  // Status bar: 48px tall
  const statusH = 48;
  // Header: 58px tall
  const headerH = 58;
  // Input bar area
  const inputBarH = 70;
  const homeIndicatorH = 32;

  // Card content geometry
  const chatPad = 12; // p-3
  const chatInnerW = SW - 2 * chatPad; // 334
  const bubbleW = Math.round(chatInnerW * 0.95); // 317
  const bubbleX = SX + chatPad + (chatInnerW - bubbleW); // SX + 29
  
  const cardPad = 6; // padding inside bubble to card
  const cardW = bubbleW - 2 * cardPad; // 317 - 12 = 305
  const imgH = 180;
  const cardTextPad = 14; // text inset within the card

  // Word-wrap description text (~38 chars per line for 15px font in ~277px usable width)
  const descLines = desc ? wrapText(desc, 38) : [];
  const descLineH = 18;
  const descBlockH = descLines.length * descLineH;

  // Card text area height
  const textAreaH = 12 + 22 + 6 + descBlockH + 8 + 18 + 12;
  const hasOgImage = !!ogImgUri;
  const cardH = hasOgImage ? imgH + textAreaH : textAreaH;
  const bubbleH = cardH + 2 * cardPad + 28; // extra for timestamp row

  // Y positions
  const statusY = SY;
  const headerY = SY + statusH;
  const chatY = headerY + headerH;
  const inputBarY = SY + SH - inputBarH - homeIndicatorH;
  const homeY = SY + SH - homeIndicatorH;

  // Chat elements Y positions
  const badgeYesterdayY = chatY + 20;
  const stickerY = badgeYesterdayY + 30;
  const badgeTodayY = stickerY + 115;
  const bubbleY = badgeTodayY + 30;

  // --- Header Icons ---
  const backArrowIcon = `<path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="${c.icon}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  
  const videoIcon = `<g transform="translate(${SX + SW - 120},${headerY + 18})">
    <polygon points="23,7 16,12 23,17" fill="none" stroke="${c.icon}" stroke-width="2"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="none" stroke="${c.icon}" stroke-width="2"/>
  </g>`;
  
  const searchIcon = `<g transform="translate(${SX + SW - 80},${headerY + 18})">
    <circle cx="11" cy="11" r="8" fill="none" stroke="${c.icon}" stroke-width="2"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="${c.icon}" stroke-width="2"/>
  </g>`;
  
  const kebabIcon = `<g transform="translate(${SX + SW - 40},${headerY + 18})">
    <circle cx="12" cy="6" r="1.5" fill="${c.icon}"/>
    <circle cx="12" cy="12" r="1.5" fill="${c.icon}"/>
    <circle cx="12" cy="18" r="1.5" fill="${c.icon}"/>
  </g>`;

  // --- Input bar icons ---
  // Input area: W=358, left-pad=8+4=12, right-pad=8+4=12, gap=8.
  // Mic btn width=50, X = 358 - 12 - 50 = 296.
  // Pill width = 296 - 8 - 12 = 276. X = 12. Height = 50.
  // Icons inside pill: gap=14, px=14. Icon width=24.
  // Smiley X = 14
  // Text X = 14+24+14 = 52
  // Camera X = 276 - 14 - 24 = 238
  // Rupee X = 238 - 14 - 24 = 200
  // Paperclip X = 200 - 14 - 24 = 162

  const pillX = SX + 12;
  const pillY = inputBarY + 10; // inputBarH is 70, pb is 12 -> 70-12-50 = 8. Let's use 10 to center in 70.
  const pillW = 276;

  const smileyIcon = `<g transform="translate(${pillX + 14},${pillY + 13})">
    <circle cx="12" cy="12" r="9" fill="none" stroke="${c.icon}" stroke-width="1.75"/>
    <circle cx="9" cy="10" r="0.8" fill="${c.icon}"/>
    <circle cx="15" cy="10" r="0.8" fill="${c.icon}"/>
    <path d="M9.5 15a3.5 3.5 0 0 0 5 0" fill="none" stroke="${c.icon}" stroke-width="1.75" stroke-linecap="round"/>
  </g>`;

  const paperclipIcon = `<g transform="translate(${pillX + 162},${pillY + 13})">
    <path d="M10.5 15.5v-6.5a1.5 1.5 0 0 1 3 0v7.5a3 3 0 0 1 -6 0v-8.5a4.5 4.5 0 0 1 9 0v7.5" fill="none" stroke="${c.icon}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  const rupeeIcon = `<g transform="translate(${pillX + 200},${pillY + 13})">
    <circle cx="12" cy="12" r="9" fill="none" stroke="${c.icon}" stroke-width="1.75"/>
    <path d="M14.5 8.5h-5h1.5a2.5 2.5 0 0 1 0 5h-1.5l3.5 4" fill="none" stroke="${c.icon}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 11h5" fill="none" stroke="${c.icon}" stroke-width="1.75" stroke-linecap="round"/>
  </g>`;

  const cameraIcon = `<g transform="translate(${pillX + 238},${pillY + 13})">
    <path d="M5 7h2.5l1.5 -2h6l1.5 2h2.5a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" fill="none" stroke="${c.icon}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="13" r="3.5" fill="none" stroke="${c.icon}" stroke-width="1.75"/>
  </g>`;

  const micBtnX = SX + 296;
  const micBtnY = inputBarY + 10;
  const micIconFill = isDark ? '#0b141a' : '#ffffff';
  const micButton = `<g id="Mic-Button">
    <circle cx="${micBtnX + 25}" cy="${micBtnY + 25}" r="25" fill="#00a884"/>
    <g transform="translate(${micBtnX + 13},${micBtnY + 13})">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="${micIconFill}"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.76 6.43 6 6.92V21h2v-3.08c3.24-.49 6-3.39 6-6.92h-2z" fill="${micIconFill}"/>
    </g>
  </g>`;

  // --- Link icon for domain row ---
  const linkIconSvg = (x: number, y: number) => `<g transform="translate(${x},${y}) scale(0.625)">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="${c.cardDomain}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="${c.cardDomain}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  // --- Build description text lines ---
  const descTextElements = descLines.map((line, i) => {
    const baseY = hasOgImage ? imgH + 12 + 22 + 6 : 12 + 22 + 6;
    return `<text x="${cardTextPad}" y="${baseY + i * descLineH + 13}" font-family="${f}" font-size="15" fill="${c.cardDesc}">${esc(line)}</text>`;
  }).join('\n            ');

  // --- Domain Y position ---
  const domainBaseY = hasOgImage ? imgH + 12 + 22 + 6 + descBlockH + 8 : 12 + 22 + 6 + descBlockH + 8;

  // --- OG Image element (base64 embedded) ---
  const ogImageDef = hasOgImage ? `
    <pattern id="ogImagePattern" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${ogImgUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';

  const ogImageElement = hasOgImage ? `
          <path d="M0 10 C0 4.477 4.477 0 10 0 L${cardW - 10} 0 C${cardW - 4.477} 0 ${cardW} 4.477 ${cardW} 10 L${cardW} ${imgH} L0 ${imgH} Z" fill="url(#ogImagePattern)"/>` : '';

  // --- Avatar element (base64 embedded) ---
  const avatarDef = avatarUri ? `
    <pattern id="avatarPattern" patternContentUnits="objectBoundingBox" width="1" height="1">
      <image xlink:href="${avatarUri}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/>
    </pattern>` : '';

  const avatarFill = avatarUri ? 'url(#avatarPattern)' : '#d1d5db';

  // --- Card content ---
  const cardContent = data ? `
        <g id="Link-Preview-Card" transform="translate(${cardPad},${cardPad})">
          <rect id="Card-BG" width="${cardW}" height="${cardH}" rx="10" fill="${c.card}"/>
          ${ogImageElement}
          
          <text id="Title" x="${cardTextPad}" y="${hasOgImage ? imgH + 12 + 16 : 12 + 16}" 
                font-family="${f}" font-size="16" font-weight="600" fill="${c.cardTitle}">${title}</text>
          
          ${descTextElements}
          
          ${linkIconSvg(cardTextPad, domainBaseY)}
          <text id="Domain" x="${cardTextPad + 18}" y="${domainBaseY + 14}" 
                font-family="${f}" font-size="14" font-weight="500" fill="${c.cardDomain}">${domain}</text>
        </g>` : `
        <text x="${bubbleW / 2}" y="55" text-anchor="middle" font-family="${f}" font-size="13" fill="${c.sub}" font-style="italic">Waiting for you to paste a link...</text>`;

  // Timestamp + checkmark position
  const timeY = cardPad + cardH + 16;

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
  <rect id="Screen-BG" x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${innerR}" fill="${c.screen}"/>

  <g clip-path="url(#screenClip)">
    
    <!-- Status Bar -->
    <g id="Status-Bar">
      <rect x="${SX}" y="${statusY}" width="${SW}" height="${statusH}" fill="${c.header}"/>
      <text x="${SX + 28}" y="${statusY + 34}" font-family="${f}" font-size="14" font-weight="600" fill="${c.text}">10:04</text>
      <!-- Status bar icons (right side) -->
      <g transform="translate(${SX + SW - 60},${statusY + 14})">
        <rect x="0" y="2" width="7" height="16" rx="1" fill="${c.text}" opacity="0.9"/>
        <rect x="9" y="5" width="7" height="13" rx="1" fill="${c.text}" opacity="0.9"/>
        <rect x="18" y="8" width="7" height="10" rx="1" fill="${c.text}" opacity="0.7"/>
        <rect x="27" y="11" width="7" height="7" rx="1" fill="${c.text}" opacity="0.4"/>
      </g>
      <!-- Battery -->
      <g transform="translate(${SX + SW - 16},${statusY + 15})">
        <rect x="-18" y="0" width="16" height="12" rx="2" fill="none" stroke="${c.text}" stroke-width="1.2"/>
        <rect x="-15" y="2.5" width="10" height="7" rx="1" fill="${c.text}"/>
        <rect x="-2" y="3" width="2" height="6" rx="1" fill="${c.text}"/>
      </g>
    </g>

    <!-- WhatsApp Header -->
    <g id="WhatsApp-Header">
      <rect x="${SX}" y="${headerY}" width="${SW}" height="${headerH}" fill="${c.header}"/>
      <line x1="${SX}" y1="${headerY + headerH}" x2="${SX + SW}" y2="${headerY + headerH}" stroke="${c.headerBorder}" stroke-width="1"/>
      
      <!-- Back Arrow -->
      <g transform="translate(${SX + 8},${headerY + 17})">
        <svg width="24" height="24" viewBox="0 0 24 24">
          ${backArrowIcon}
        </svg>
      </g>
      
      <!-- Avatar with profile pic (base64 embedded) -->
      <g transform="translate(${SX + 36},${headerY + 9})">
        <circle cx="20" cy="20" r="20" fill="${avatarFill}"/>
      </g>
      
      <!-- Contact Name -->
      <g transform="translate(${SX + 84}, ${headerY + 12})">
        <text id="Contact-Name" x="0" y="14" font-family="${f}" font-size="17" font-weight="600" fill="${c.text}">Product Team</text>
        <text id="Contact-Sub" x="0" y="32" font-family="${f}" font-size="12" fill="${c.sub}">Alex, Sam, Jamie...</text>
      </g>
      
      <!-- Header Action Icons -->
      ${videoIcon}
      ${searchIcon}
      ${kebabIcon}
    </g>

    <!-- Chat Area -->
    <g id="Chat-Area">
      <rect x="${SX}" y="${chatY}" width="${SW}" height="${inputBarY - chatY}" fill="${c.screen}"/>
      
      <!-- Date Badge -->
      <g id="Badge-Date" transform="translate(${SX + SW / 2},${badgeYesterdayY})">
        <rect x="-60" y="-12" width="120" height="26" rx="8" fill="${c.dateBg}" opacity="0.9"/>
        <text text-anchor="middle" y="4" font-family="${f}" font-size="11" font-weight="500" fill="${c.sub}">AUGUST 27, 2026</text>
      </g>

      <!-- Kedar Message 1 -->
      <g transform="translate(${SX + 12},${chatY + 50})">
        <path d="M0 0 L12 0 L12 12 Z" fill="${c.inBubble}" transform="translate(-8, 0)"/>
        <rect width="${SW * 0.8}" height="55" rx="10" fill="${c.inBubble}"/>
        <text x="12" y="22" font-family="${f}" font-size="13" font-weight="bold" fill="#06cf9c">Alex</text>
        <text x="12" y="42" font-family="${f}" font-size="15" fill="${c.text}">Hey, are we finally ready to show the client?</text>
        <text x="${SW * 0.8 - 50}" y="48" font-family="${f}" font-size="10" fill="${c.sub}">10:01 pm</text>
      </g>

      <!-- Outgoing Message 1 -->
      <g transform="translate(${SX + SW - 160},${chatY + 120})">
        <path d="M12 0 L0 0 L0 12 Z" fill="${c.outBubble}" transform="translate(148, 0)"/>
        <rect width="148" height="60" rx="10" fill="${c.outBubble}"/>
        <text x="12" y="22" font-family="${f}" font-size="15" fill="${c.text}">Yeah, just finishing the</text>
        <text x="12" y="42" font-family="${f}" font-size="15" fill="${c.text}">WhatsApp mockup now.</text>
        <text x="90" y="52" font-family="${f}" font-size="10" fill="${isDark ? 'rgba(255,255,255,0.5)' : '#54656f'}">10:04 pm</text>
      </g>

      <!-- Unread Divider -->
      <g id="Badge-Unread" transform="translate(${SX + SW / 2},${chatY + 200})">
        <rect x="-65" y="-12" width="130" height="26" rx="12" fill="${c.dateBg}" opacity="0.9"/>
        <text text-anchor="middle" y="4" font-family="${f}" font-size="11" font-weight="500" fill="${c.text}">1 unread message</text>
      </g>

      <!-- Kedar Message 2 -->
      <g transform="translate(${SX + 12},${chatY + 240})">
        <path d="M0 0 L12 0 L12 12 Z" fill="${c.inBubble}" transform="translate(-8, 0)"/>
        <rect width="${SW * 0.75}" height="45" rx="10" fill="${c.inBubble}"/>
        <text x="12" y="22" font-family="${f}" font-size="13" font-weight="bold" fill="#06cf9c">Alex</text>
        <text x="12" y="38" font-family="${f}" font-size="15" fill="${c.text}">Looks clean. Send me the link!</text>
      </g>

      <!-- Outgoing Message Bubble (Preview) -->
      <g id="Outgoing-Message" transform="translate(${bubbleX},${bubbleY})">
        <rect id="Bubble" width="${bubbleW}" height="${bubbleH}" rx="12" fill="${c.outBubble}"/>
        <polygon points="${bubbleW},0 ${bubbleW + 8},0 ${bubbleW},10" fill="${c.outBubble}"/>
        ${data ? `${cardContent}
        <text id="Time-Sent" x="${bubbleW - 56}" y="${timeY}" font-family="${f}" font-size="10" fill="${isDark ? 'rgba(255,255,255,0.5)' : '#54656f'}" text-anchor="end">10:05 pm</text>
        <g transform="translate(${bubbleW - 44},${timeY - 12}) scale(0.58)">
          <polyline points="20 6 9 17 4 12" fill="none" stroke="#53bdeb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        ` : cardContent}
      </g>
    </g>

    <!-- Input Bar -->
    <g id="Input-Bar">
      <rect x="${SX}" y="${inputBarY}" width="${SW}" height="${inputBarH}" fill="${c.inputBg}"/>
      
      <!-- Input Pill -->
      <rect id="Text-Field" x="${pillX}" y="${pillY}" width="${pillW}" height="50" rx="25" fill="${c.pillBg}"/>
      
      <!-- Smiley Icon -->
      ${smileyIcon}
      
      <!-- Message Placeholder -->
      <text id="Placeholder" x="${pillX + 52}" y="${pillY + 31}" font-family="${f}" font-size="17" fill="${c.sub}">Message</text>
      
      <!-- Paperclip -->
      ${paperclipIcon}
      
      <!-- Rupee -->
      ${rupeeIcon}
      
      <!-- Camera -->
      ${cameraIcon}
      
      <!-- Mic Button -->
      ${micButton}
    </g>

    <!-- Home Indicator -->
    <g id="Home-Indicator">
      <rect x="${SX}" y="${homeY}" width="${SW}" height="${homeIndicatorH}" fill="${c.inputBg}"/>
      <rect x="${SX + SW / 2 - 70}" y="${homeY + 12}" width="140" height="5" rx="2.5" fill="${c.icon}" opacity="0.5"/>
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

/**
 * Fetches all images, embeds them as base64, builds SVG, and copies to clipboard.
 * This ensures Figma gets fully self-contained SVG with no external references.
 */
import { buildTwitterFigmaClipboard } from './figma/twitter';
import { buildLinkedInFigmaClipboard } from './figma/linkedin';
import { buildSlackFigmaClipboard } from './figma/slack';
import { buildDiscordFigmaClipboard } from './figma/discord';

export async function copyForFigma(data: OGData | null, theme: 'light' | 'dark', app: string): Promise<void> {
  // Fetch all images in parallel and convert to base64 data URIs
  const [ogImage, avatar] = await Promise.all([
    data?.image ? fetchImageAsDataUri(data.image) : Promise.resolve(''),
    fetchImageAsDataUri('https://i.pravatar.cc/100?img=12'),
  ]);

  let svg = '';
  const embeddedImages = { ogImage, avatar };

  if (app === 'whatsapp') {
    svg = buildWhatsAppFigmaClipboard(data, theme, embeddedImages);
  } else if (app === 'twitter') {
    svg = buildTwitterFigmaClipboard(data, theme, embeddedImages);
  } else if (app === 'linkedin') {
    svg = buildLinkedInFigmaClipboard(data, theme, embeddedImages);
  } else if (app === 'slack') {
    svg = buildSlackFigmaClipboard(data, theme, embeddedImages);
  } else if (app === 'discord') {
    svg = buildDiscordFigmaClipboard(data, theme, embeddedImages);
  } else {
    // Default fallback to whatsapp if not implemented
    svg = buildWhatsAppFigmaClipboard(data, theme, embeddedImages);
  }

  // Write as text/html (Figma recognizes embedded SVG and creates editable layers)
  const htmlBlob = new Blob(
    [`<html><body>${svg}</body></html>`],
    { type: 'text/html' }
  );
  const textBlob = new Blob([svg], { type: 'text/plain' });

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': textBlob,
    })
  ]);
}

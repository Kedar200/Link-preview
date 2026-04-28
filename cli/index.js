#!/usr/bin/env node

const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 9876;
const SUPPORTED_ORIGINS = ['https://linkpeek-steel.vercel.app', 'https://linkpeek.com', 'http://localhost:3000', 'http://localhost:3001'];

// ─── Minimal OG parser ────────────────────────────────────────────────────────
function parseOG(html, sourceUrl) {
  const getMeta = (prop) => {
    for (const p of [
      new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, 'i'),
      new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${prop}["']`, 'i'),
    ]) {
      const m = html.match(p);
      if (m) return m[1].trim();
    }
    return '';
  };

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : '';

  const makeAbs = (u) => {
    if (!u) return '';
    try { return new URL(u, sourceUrl).href; } catch { return u; }
  };

  const rawImage = getMeta('og:image') || getMeta('twitter:image');
  let domain = '';
  try { domain = new URL(sourceUrl).hostname.replace(/^www\./, ''); } catch { domain = sourceUrl; }

  return {
    title: getMeta('og:title') || getMeta('twitter:title') || pageTitle || '',
    description: getMeta('og:description') || getMeta('twitter:description') || getMeta('description') || '',
    image: rawImage ? makeAbs(rawImage) : '',
    siteName: getMeta('og:site_name') || domain,
    domain,
    imageWidth: getMeta('og:image:width'),
    imageHeight: getMeta('og:image:height'),
    type: getMeta('og:type'),
    twitterCard: getMeta('twitter:card'),
    url: sourceUrl,
    isLocalhost: true,
  };
}

// ─── Server ────────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';

  // CORS — allow LinkPeek origins + any localhost
  const isAllowed = SUPPORTED_ORIGINS.includes(origin) || origin.startsWith('http://localhost:');
  res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  // Health check — used by the web app to detect if companion is running
  if (reqUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', version: '1.0.0' }));
    return;
  }

  // OG fetch endpoint
  if (reqUrl.pathname === '/api/og') {
    const targetUrl = reqUrl.searchParams.get('url');
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'url parameter is required' }));
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(targetUrl, {
        headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
        signal: controller.signal,
        redirect: 'follow',
      });
      clearTimeout(timeout);

      if (!response.ok) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: `Local server returned ${response.status}`,
          ...parseOG('', targetUrl),
        }));
        return;
      }

      const html = await response.text();
      const data = parseOG(html, targetUrl);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (err) {
      const msg = err.name === 'AbortError'
        ? 'Local server took too long to respond.'
        : `Could not reach ${targetUrl} — is your dev server running?`;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: msg, ...parseOG('', targetUrl) }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log('  │                                         │');
  console.log(`  │   🔗 LinkPeek Local Companion v1.0.0    │`);
  console.log(`  │   Running on http://localhost:${PORT}     │`);
  console.log('  │                                         │');
  console.log('  │   Ready to preview localhost URLs from   │');
  console.log('  │   linkpeek-steel.vercel.app              │');
  console.log('  │                                         │');
  console.log('  │   Press Ctrl+C to stop                  │');
  console.log('  │                                         │');
  console.log('  └─────────────────────────────────────────┘');
  console.log('');
});

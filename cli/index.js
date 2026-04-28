#!/usr/bin/env node

const http = require('http');
const { URL } = require('url');

const PREFERRED_PORT = 9876;
const MAX_PORT = 9886; // will try 9876–9886

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

// ─── Check if a port already has our companion running ─────────────────────────
function checkExistingCompanion(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/health`, { timeout: 1500 }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve(json.status === 'ok');
        } catch { resolve(false); }
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

// ─── Try to listen on a port, resolve with the port or reject ──────────────────
function tryListen(server, port) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') reject(err);
      else reject(err);
    });
    server.listen(port, () => resolve(port));
  });
}

// ─── Create the server ─────────────────────────────────────────────────────────
function createServer() {
  return http.createServer(async (req, res) => {
    const origin = req.headers.origin || '';

    // CORS — allow any origin (companion is local-only, no security risk)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const reqUrl = new URL(req.url, `http://localhost`);

    // Health check
    if (reqUrl.pathname === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', version: '1.0.0' }));
      return;
    }

    // OG fetch
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
}

// ─── Start with auto port-finding ──────────────────────────────────────────────
async function start() {
  // First, check if companion is already running on the preferred port
  const alreadyRunning = await checkExistingCompanion(PREFERRED_PORT);
  if (alreadyRunning) {
    console.log('');
    console.log('  ✅ LinkPeek companion is already running on port ' + PREFERRED_PORT);
    console.log('     You\'re all set! Go preview your localhost URLs.');
    console.log('');
    process.exit(0);
  }

  const server = createServer();

  // Try ports in range
  for (let port = PREFERRED_PORT; port <= MAX_PORT; port++) {
    try {
      await tryListen(server, port);

      console.log('');
      console.log('  ┌─────────────────────────────────────────┐');
      console.log('  │                                         │');
      console.log(`  │   🔗 LinkPeek Local Companion v1.0.0    │`);
      console.log(`  │   Running on http://localhost:${port}     │`);
      console.log('  │                                         │');
      console.log('  │   Ready to preview localhost URLs from   │');
      console.log('  │   linkpeek-steel.vercel.app              │');
      console.log('  │                                         │');
      console.log('  │   Press Ctrl+C to stop                  │');
      console.log('  │                                         │');
      console.log('  └─────────────────────────────────────────┘');
      if (port !== PREFERRED_PORT) {
        console.log(`  ℹ  Port ${PREFERRED_PORT} was busy, using ${port} instead.`);
      }
      console.log('');
      return; // success
    } catch {
      // Port busy, try next
      continue;
    }
  }

  console.error(`  ❌ Could not find a free port in range ${PREFERRED_PORT}–${MAX_PORT}.`);
  console.error('     Close other services and try again.');
  process.exit(1);
}

start();

import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

function makeAbsolute(url: string, base: string): string {
  if (!url) return '';
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const commonHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1',
      'Referer': 'https://www.google.com/',
    };

    let response = await fetch(url, {
      signal: controller.signal,
      headers: commonHeaders,
      redirect: 'follow',
    });

    clearTimeout(timeout);

    let html = await response.text();


    // Akamai challenge detection: 200 OK but with meta-refresh
    if (response.ok && html.includes('http-equiv="refresh"') && html.length < 5000) {
      const setCookie = response.headers.get('set-cookie');
      const refreshMatch = html.match(/URL=['"]?([^'"]+)['"]?/i);
      const refreshUrl = refreshMatch ? makeAbsolute(refreshMatch[1], url) : url;

      if (setCookie || refreshUrl !== url) {
        // Extract only the name=value part of the cookie
        const cleanCookie = setCookie ? setCookie.split(';')[0] : '';
        
        const retryController = new AbortController();
        const retryTimeout = setTimeout(() => retryController.abort(), 6000);
        
        const retryResponse = await fetch(refreshUrl, {
          signal: retryController.signal,
          headers: {
            ...commonHeaders,
            'Cookie': cleanCookie,
            'Referer': url,
          },
          redirect: 'follow',
        });
        
        clearTimeout(retryTimeout);
        if (retryResponse.ok) {
          const retryHtml = await retryResponse.text();
          if (retryHtml.length > html.length) {
            html = retryHtml;
            response = retryResponse;
          }
        }
      }
    }

    if (!response.ok) {
      const statusText =
        response.status === 401 || response.status === 403
          ? 'This page appears to be private or requires a login.'
          : response.status === 404
          ? 'This page does not exist.'
          : `The page returned an error (${response.status}).`;

      return NextResponse.json(
        {
          error: statusText,
          status: response.status,
          partial: true,
          title: '',
          description: '',
          image: '',
          siteName: extractDomain(url),
          domain: extractDomain(url),
          imageWidth: '',
          imageHeight: '',
          type: '',
          twitterCard: '',
          url,
          isLocalhost: false,
        },
        { status: 200 }
      );
    }

    const $ = cheerio.load(html);

    const getMeta = (property: string) =>
      $(`meta[property="${property}"]`).attr('content')?.trim() ||
      $(`meta[name="${property}"]`).attr('content')?.trim() ||
      '';

    const ogTitle = getMeta('og:title');
    const twitterTitle = getMeta('twitter:title');
    const pageTitle = $('title').first().text().trim();

    const ogDesc = getMeta('og:description');
    const twitterDesc = getMeta('twitter:description');
    const metaDesc = getMeta('description');

    const ogImage = getMeta('og:image') || getMeta('og:image:url');
    const twitterImage = getMeta('twitter:image') || getMeta('twitter:image:src');
    const rawImage = ogImage || twitterImage;

    const data = {
      title: ogTitle || twitterTitle || pageTitle || '',
      description: ogDesc || twitterDesc || metaDesc || '',
      image: rawImage ? makeAbsolute(rawImage, url) : '',
      siteName: getMeta('og:site_name') || extractDomain(url),
      domain: extractDomain(url),
      imageWidth: getMeta('og:image:width'),
      imageHeight: getMeta('og:image:height'),
      type: getMeta('og:type'),
      twitterCard: getMeta('twitter:card'),
      url,
      isLocalhost: false,
    };

    return NextResponse.json(data);
  } catch (err: unknown) {
    clearTimeout(timeout);
    const isAbort =
      err instanceof Error && (err.name === 'AbortError' || err.message.includes('abort'));
    const message = isAbort
      ? 'The page took too long to respond. Try again in a moment.'
      : 'Could not reach this URL. Check that it\'s accessible and try again.';

    return NextResponse.json(
      {
        error: message,
        title: '',
        description: '',
        image: '',
        siteName: extractDomain(url),
        domain: extractDomain(url),
        imageWidth: '',
        imageHeight: '',
        type: '',
        twitterCard: '',
        url,
        isLocalhost: false,
      },
      { status: 200 }
    );
  }
}

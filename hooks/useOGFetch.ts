'use client';
import { useState, useCallback } from 'react';
import type { OGData } from '@/types';
import { isLocalhostUrl, normalizeUrl } from '@/lib/detect';
import { parseOGFromHTML } from '@/lib/parseOG';

interface FetchState {
  data: OGData | null;
  loading: boolean;
  error: string | null;
}

export function useOGFetch() {
  const [state, setState] = useState<FetchState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetch_ = useCallback(async (rawUrl: string) => {
    const url = normalizeUrl(rawUrl);
    if (!url) {
      setState({ data: null, loading: false, error: 'Please enter a URL.' });
      return;
    }

    setState({ data: null, loading: true, error: null });

    try {
      if (isLocalhostUrl(url)) {
        // Client-side fetch for localhost
        const res = await fetch(url, {
          headers: { Accept: 'text/html' },
          signal: AbortSignal.timeout(8000),
        });
        const html = await res.text();
        const parsed = parseOGFromHTML(html, url);
        parsed.isLocalhost = true;
        setState({ data: parsed, loading: false, error: null });
      } else {
        // Server-side fetch via API route
        const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
        const json = await res.json();

        if (json.error && !json.title && !json.domain) {
          setState({ data: null, loading: false, error: json.error });
          return;
        }

        setState({ data: json as OGData, loading: false, error: json.error || null });
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.name === 'TimeoutError'
          ? 'The page took too long to respond.'
          : 'Something went wrong. Please try again.';
      setState({ data: null, loading: false, error: msg });
    }
  }, []);

  return { ...state, fetch: fetch_ };
}

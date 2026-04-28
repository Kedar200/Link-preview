'use client';
import { useState, useCallback } from 'react';
import type { OGData } from '@/types';
import { isLocalhostUrl, normalizeUrl } from '@/lib/detect';
import { parseOGFromHTML } from '@/lib/parseOG';

const COMPANION_PORT = 9876;
const COMPANION_BASE = `http://localhost:${COMPANION_PORT}`;

// Special error code the UI can detect for showing companion setup instructions
export const LOCALHOST_COMPANION_NEEDED = '__LOCALHOST_COMPANION_NEEDED__';

interface FetchState {
  data: OGData | null;
  loading: boolean;
  error: string | null;
}

/** Check if LinkPeek itself is running on localhost */
function appIsLocal(): boolean {
  if (typeof window === 'undefined') return false;
  return isLocalhostUrl(window.location.href);
}

/** Quick health-check to see if the companion server is running */
async function isCompanionRunning(): Promise<boolean> {
  try {
    const res = await fetch(`${COMPANION_BASE}/health`, {
      signal: AbortSignal.timeout(1500),
    });
    const json = await res.json();
    return json.status === 'ok';
  } catch {
    return false;
  }
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
        // ── Localhost URL detected ──────────────────────────────────────

        if (appIsLocal()) {
          // LinkPeek is running locally — server-side API proxy CAN reach
          // the user's localhost (same machine), so use it.
          const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
          const json = await res.json();

          if (json.error && !json.title && !json.domain) {
            setState({ data: null, loading: false, error: json.error });
            return;
          }

          const ogData = json as OGData;
          ogData.isLocalhost = true;
          setState({ data: ogData, loading: false, error: json.error || null });
        } else {
          // LinkPeek is deployed (Vercel, etc.) — server can't reach user's
          // localhost. Try the local companion proxy first.
          const companionAlive = await isCompanionRunning();

          if (companionAlive) {
            const res = await fetch(
              `${COMPANION_BASE}/api/og?url=${encodeURIComponent(url)}`,
              { signal: AbortSignal.timeout(10000) }
            );
            const json = await res.json();

            if (json.error && !json.title && !json.domain) {
              setState({ data: null, loading: false, error: json.error });
              return;
            }

            const ogData = json as OGData;
            ogData.isLocalhost = true;
            setState({ data: ogData, loading: false, error: json.error || null });
          } else {
            // Companion not running — signal the UI to show setup instructions
            setState({ data: null, loading: false, error: LOCALHOST_COMPANION_NEEDED });
          }
        }
      } else {
        // ── Regular URL — use server-side API proxy ────────────────────
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

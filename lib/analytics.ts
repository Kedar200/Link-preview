/**
 * Lightweight analytics helper for Google Analytics 4.
 * Tracks custom events like URL checks without any npm dependency.
 */

// Extend the window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Track a custom event in GA4 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track a URL check event.
 * Called every time a user submits a URL for preview.
 * In GA4 dashboard, find this under Events → "url_checked".
 */
export function trackUrlChecked(url: string) {
  try {
    const parsed = new URL(url);
    trackEvent('url_checked', {
      domain: parsed.hostname,
      is_localhost: parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1',
      full_url: url.substring(0, 100), // Truncate for GA limits
    });
  } catch {
    trackEvent('url_checked', {
      domain: 'invalid',
      is_localhost: false,
    });
  }
}

/**
 * Lightweight analytics helper for Google Analytics 4.
 * Tracks custom events like URL checks without any npm dependency.
 */

// Extend the window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __linkpeekAnalyticsContext?: AnalyticsParams;
  }
}

type AnalyticsParamValue = string | number | boolean | undefined;
type AnalyticsParams = Record<string, AnalyticsParamValue>;

const CAMPAIGN_ID_PARAMS = ['utm_id', 'campaign_id', 'campaignId', 'cid'];
const SESSION_CAMPAIGN_ID_KEY = 'linkpeek_campaign_id';

function cleanParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  ) as Record<string, string | number | boolean>;
}

function readCampaignId(searchParams: URLSearchParams): string | undefined {
  const campaignId = CAMPAIGN_ID_PARAMS
    .map(param => searchParams.get(param))
    .find((value): value is string => Boolean(value));

  if (campaignId) {
    try {
      sessionStorage.setItem(SESSION_CAMPAIGN_ID_KEY, campaignId);
    } catch {
      // Ignore storage failures in private browsing or restricted contexts.
    }
    return campaignId;
  }

  try {
    return sessionStorage.getItem(SESSION_CAMPAIGN_ID_KEY) || undefined;
  } catch {
    return undefined;
  }
}

/** Build common GA event params for campaign and browser size context. */
export function getAnalyticsContext(): AnalyticsParams {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const context: AnalyticsParams = {
    campaign_id: readCampaignId(searchParams),
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    browser_width: window.innerWidth,
    browser_height: window.innerHeight,
    screen_avail_width: window.screen?.availWidth,
    screen_avail_height: window.screen?.availHeight,
  };

  window.__linkpeekAnalyticsContext = cleanParams(context);
  return window.__linkpeekAnalyticsContext;
}

/** Track a custom event in GA4 */
export function trackEvent(
  eventName: string,
  params?: AnalyticsParams
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, cleanParams({
      ...getAnalyticsContext(),
      ...params,
    }));
  }
}

/** Track the initial landing context once GA is ready. */
export function trackLandingContext() {
  trackEvent('landing_context');
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

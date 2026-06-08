// Tiny helper to fire Meta (Facebook) Pixel events from client components.
// Safe no-op when the pixel isn't configured/loaded, so call sites never break.

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// `options.eventID` lets the browser event share an id with a server-side
// Conversions API event so Meta deduplicates the two (counts one conversion).
type FbqOptions = { eventID?: string };

export function fbTrack(
  event: string,
  params?: FbqParams,
  options?: FbqOptions,
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params && options) {
    window.fbq("track", event, params, options);
  } else if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}

import crypto from "node:crypto";

// Server-side Meta (Facebook) Conversions API client.
//
// The browser pixel can be blocked by ad blockers / ITP and never sees the
// buyer's email, name, or address. The Conversions API sends the same events
// straight from our server with hashed customer data, which is why Purchase —
// "the real deal" — is sent from the Stripe webhook, not the browser.
//
// Stays dormant unless both the pixel id and the access token are configured.

const GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION ?? "v21.0";
const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_CONVERSIONS_API_TOKEN;
// Optional: paste a code from Events Manager → Test events to verify wiring.
const TEST_EVENT_CODE = process.env.FACEBOOK_TEST_EVENT_CODE;

export function isCapiConfigured(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Meta requires PII to be normalized (trim/lowercase, strip noise) before
// SHA-256 hashing. Each field has its own rule.
const hashEmail = (v?: string | null) =>
  v ? sha256(v.trim().toLowerCase()) : undefined;

const hashName = (v?: string | null) =>
  v ? sha256(v.trim().toLowerCase()) : undefined;

// City/state: lowercase, strip everything but a–z0–9.
const hashToken = (v?: string | null) => {
  if (!v) return undefined;
  const cleaned = v.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned ? sha256(cleaned) : undefined;
};

// Phone: digits only (keep country code), drop symbols and leading zeros.
const hashPhone = (v?: string | null) => {
  if (!v) return undefined;
  const digits = v.replace(/[^0-9]/g, "").replace(/^0+/, "");
  return digits ? sha256(digits) : undefined;
};

// Zip: lowercase, trim, US uses the 5-digit prefix.
const hashZip = (v?: string | null) => {
  if (!v) return undefined;
  const cleaned = v.trim().toLowerCase().split("-")[0].replace(/\s/g, "");
  return cleaned ? sha256(cleaned) : undefined;
};

// Country: 2-letter ISO, lowercase.
const hashCountry = (v?: string | null) =>
  v ? sha256(v.trim().toLowerCase()) : undefined;

export type PurchaseEventInput = {
  eventId: string;
  eventSourceUrl?: string;
  eventTimeMs?: number;
  value: number;
  currency: string;
  contentName?: string;
  orderId?: string;
  user: {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    externalId?: string | null;
    // Not hashed — sent as-is for match quality.
    fbc?: string | null;
    fbp?: string | null;
    clientIpAddress?: string | null;
    clientUserAgent?: string | null;
  };
};

// Drop undefined keys so we never send empty hashes.
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null),
  ) as Partial<T>;
}

export async function sendPurchaseEvent(
  input: PurchaseEventInput,
): Promise<{ ok: boolean; error?: string }> {
  if (!isCapiConfigured()) {
    return { ok: false, error: "Conversions API not configured" };
  }

  const u = input.user;
  const userData = compact({
    em: hashEmail(u.email),
    fn: hashName(u.firstName),
    ln: hashName(u.lastName),
    ph: hashPhone(u.phone),
    ct: hashToken(u.city),
    st: hashToken(u.state),
    zp: hashZip(u.zip),
    country: hashCountry(u.country),
    external_id: u.externalId ? sha256(u.externalId) : undefined,
    fbc: u.fbc ?? undefined,
    fbp: u.fbp ?? undefined,
    client_ip_address: u.clientIpAddress ?? undefined,
    client_user_agent: u.clientUserAgent ?? undefined,
  });

  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor((input.eventTimeMs ?? Date.now()) / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: compact({
          currency: input.currency,
          value: input.value,
          content_name: input.contentName,
          content_type: "product",
          order_id: input.orderId,
        }),
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Meta CAPI ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

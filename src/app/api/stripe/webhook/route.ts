import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { EBOOK } from "@/lib/ebook";
import { isCapiConfigured, sendPurchaseEvent } from "@/lib/meta-capi";

// Stripe calls this URL after a payment. It is the authoritative "the sale
// really happened" signal — far more reliable than the browser success page —
// so the server-side Purchase event (Conversions API) is sent from here.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("STRIPE_WEBHOOK_SECRET is not set.", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature.", { status: 400 });
  }

  // Signature verification requires the raw, unparsed body.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid payload";
    return new Response(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      await firePurchase(session);
    }
  }

  // Always 200 so Stripe doesn't retry on our downstream (CAPI) hiccups.
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function firePurchase(session: Stripe.Checkout.Session) {
  if (!isCapiConfigured()) return;

  const details = session.customer_details;
  const address = details?.address;
  const [firstName, ...rest] = (details?.name ?? "").trim().split(/\s+/);
  const lastName = rest.join(" ");
  const meta = session.metadata ?? {};

  const result = await sendPurchaseEvent({
    eventId: `purchase_${session.id}`,
    eventSourceUrl: meta.event_source_url || undefined,
    value: (session.amount_total ?? EBOOK.priceCents) / 100,
    currency: (session.currency ?? EBOOK.currency).toUpperCase(),
    contentName: `${EBOOK.title} (ebook)`,
    orderId: session.id,
    user: {
      email: details?.email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: details?.phone,
      city: address?.city,
      state: address?.state,
      zip: address?.postal_code,
      country: address?.country,
      externalId:
        typeof session.customer === "string"
          ? session.customer
          : session.id,
      fbc: meta.fbc || undefined,
      fbp: meta.fbp || undefined,
      clientIpAddress: meta.client_ip || undefined,
      clientUserAgent: meta.client_user_agent || undefined,
    },
  });

  if (!result.ok) {
    // Logged for Vercel/observability; never blocks the 200 to Stripe.
    console.error("[meta-capi] Purchase event failed:", result.error);
  }
}

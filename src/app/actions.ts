"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { EBOOK } from "@/lib/ebook";

// Server Action invoked by the "Buy the ebook" form. Runs only on the server,
// so the secret key and pricing are never exposed to the browser.
export async function createCheckoutSession() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  // Capture the Meta Pixel identifiers now, while we still have the browser
  // context, and stash them on the session. The Stripe webhook (which has no
  // browser context) reads them back to send a high-match Purchase event via
  // the Conversions API.
  const c = await cookies();
  const forwardedFor = h.get("x-forwarded-for") ?? "";
  const metaTracking = {
    fbc: c.get("_fbc")?.value ?? "",
    fbp: c.get("_fbp")?.value ?? "",
    client_user_agent: h.get("user-agent") ?? "",
    client_ip: forwardedFor.split(",")[0]?.trim() ?? "",
    event_source_url: h.get("referer") ?? `${origin}/`,
  };

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: EBOOK.currency,
          unit_amount: EBOOK.priceCents,
          product_data: {
            name: `${EBOOK.title} (ebook)`,
            description: `Digital edition by ${EBOOK.author}`,
          },
        },
      },
    ],
    // Collect name + address + phone so the Purchase conversion can be matched
    // on City/State/Zip/Country/Phone/Name (better Meta attribution).
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    metadata: metaTracking,
    // Stripe collects the buyer's email; we watermark the PDF with it.
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?canceled=1`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  // redirect() throws a control-flow signal, so it must be outside try/catch.
  redirect(session.url);
}

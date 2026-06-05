"use server";

import { headers } from "next/headers";
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

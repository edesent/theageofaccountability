import Stripe from "stripe";

let client: Stripe | null = null;

// Lazily constructed so a missing key doesn't crash `next build` (which imports
// this module even for dynamic routes). The error surfaces only when actually used.
export function getStripe(): Stripe {
  if (client) return client;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (and to your Vercel project env).",
    );
  }

  // No apiVersion pin: the SDK uses its built-in default, avoiding TypeScript
  // literal-version mismatches across Stripe SDK upgrades.
  client = new Stripe(secretKey);
  return client;
}

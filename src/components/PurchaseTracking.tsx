"use client";

import { useEffect, useRef } from "react";
import { fbTrack } from "@/lib/fbq";

// Fires a single Meta Pixel "Purchase" event on the confirmation page.
// `eventId` matches the server-side Conversions API event sent from the Stripe
// webhook, so Meta deduplicates them into one conversion. No-op until the
// pixel is configured.
export default function PurchaseTracking({
  value,
  currency,
  eventId,
}: {
  value: number;
  currency: string;
  eventId: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    fbTrack(
      "Purchase",
      {
        value,
        currency,
        content_name: "The Age of Accountability (ebook)",
        content_type: "product",
        order_id: eventId.replace(/^purchase_/, ""),
      },
      { eventID: eventId },
    );
  }, [value, currency, eventId]);

  return null;
}

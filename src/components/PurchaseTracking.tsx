"use client";

import { useEffect, useRef } from "react";
import { fbTrack } from "@/lib/fbq";

// Fires a single Meta Pixel "Purchase" event on the confirmation page.
// No-op until the pixel is configured.
export default function PurchaseTracking({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    fbTrack("Purchase", {
      value,
      currency,
      content_name: "The Age of Accountability (ebook)",
      content_type: "product",
    });
  }, [value, currency]);

  return null;
}

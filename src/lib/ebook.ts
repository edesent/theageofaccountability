// Single source of truth for the ebook product.
// Edit price / formats here — both the checkout and the download route read this.

export type EbookFormat = "pdf" | "epub";

export const EBOOK = {
  title: "The Age of Accountability",
  author: "Jerry Boritzki",
  // Price the buyer pays, in the smallest currency unit (cents). 699 = $6.99.
  priceCents: 699,
  currency: "usd",
  // Formats you offer for download. The source files live in /private (see below).
  // PDF is watermarked per-buyer; EPUB is delivered as-is (EPUB can't be reliably watermarked).
  formats: ["pdf", "epub"] as EbookFormat[],
  // Filenames inside the (git-ignored-from-/public, repo-private) `private/` folder
  // at the project root. These are NEVER served statically — only via /api/download.
  files: {
    pdf: "the-age-of-accountability.pdf",
    epub: "the-age-of-accountability.epub",
  } as Record<EbookFormat, string>,
} as const;

export function priceLabel(): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: EBOOK.currency,
  }).format(EBOOK.priceCents / 100);
}

// What the downloaded file is named for the buyer.
export function downloadFilename(format: EbookFormat): string {
  return `The Age of Accountability.${format}`;
}

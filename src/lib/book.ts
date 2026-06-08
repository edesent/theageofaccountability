// Shared purchase constants used by the homepage and article pages.

// Master switch for the digital edition. While false, the whole site sells
// only the Amazon paperback: the "Buy" buttons link straight to Amazon, the
// edition picker is hidden, and the ebook offer is dropped from structured
// data. Flip to true to bring back the Stripe ebook checkout — no other code
// changes needed.
export const EBOOK_ENABLED = false;

export const AMAZON_URL =
  "https://www.amazon.com/Age-Accountability-Jerry-Boritzki/dp/B0DN8962YR";

export const ISBN = "979-8-9894804-0-1";

// The paperback is sold by Amazon. Change this ONE number and it updates the
// purchase picker, the mobile menu, and the JSON-LD structured data.
export const PAPERBACK_PRICE_USD = 12.95;

// Display string ("$12.95") derived from the number above.
export const PAPERBACK_PRICE = `$${PAPERBACK_PRICE_USD.toFixed(2)}`;

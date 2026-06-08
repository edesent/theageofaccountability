"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal, useFormStatus } from "react-dom";
import { createCheckoutSession } from "@/app/actions";
import { EBOOK_ENABLED } from "@/lib/book";
import { fbTrack } from "@/lib/fbq";

const priceToNumber = (s: string) => Number(s.replace(/[^0-9.]/g, "")) || undefined;

type Variant = "solid" | "inverse";

const TRIGGER_BASE =
  "group inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 font-body text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass";

const TRIGGER_VARIANT: Record<Variant, string> = {
  solid:
    "bg-action text-ivory shadow-[0_14px_34px_rgba(47,107,79,0.28)] hover:bg-ink",
  inverse: "bg-ivory text-action shadow-none hover:bg-ink hover:text-ivory",
};

function Arrow() {
  return (
    <svg
      className="ml-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function EbookSubmit({ price }: { price: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() =>
        fbTrack("InitiateCheckout", {
          content_name: "The Age of Accountability (ebook)",
          content_type: "product",
          value: priceToNumber(price),
          currency: "USD",
        })
      }
      className="group flex w-full items-center gap-4 rounded-xl border border-ink/12 bg-ivory p-5 text-left transition hover:border-action hover:bg-action/5 disabled:cursor-wait disabled:opacity-70"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-action/10 text-action">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-xl font-semibold text-ink">
          {pending ? "Redirecting to checkout…" : "Ebook"}
        </span>
        <span className="mt-0.5 block font-body text-sm text-ink-soft">
          Instant PDF &amp; EPUB download
        </span>
      </span>
      <span className="font-body text-sm font-bold text-action">{price}</span>
    </button>
  );
}

type PurchaseButtonProps = {
  amazonUrl: string;
  ebookPrice: string;
  paperbackPrice: string;
  isbn?: string;
  label?: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function PurchaseButton(props: PurchaseButtonProps) {
  // While the ebook is off, every "Buy" button links straight to the Amazon
  // paperback. Flip EBOOK_ENABLED in lib/book.ts to restore the edition picker.
  return EBOOK_ENABLED ? (
    <EditionPickerButton {...props} />
  ) : (
    <AmazonLinkButton {...props} />
  );
}

// Amazon-only mode. AddToCart still fires (the pixel adds the event source URL,
// event time, the _fbc cookie, and the client user agent automatically).
function AmazonLinkButton({
  amazonUrl,
  paperbackPrice,
  label = "Buy the book",
  variant = "solid",
  className = "",
}: PurchaseButtonProps) {
  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        fbTrack("AddToCart", {
          content_name: "The Age of Accountability (paperback)",
          content_type: "product",
          value: priceToNumber(paperbackPrice),
          currency: "USD",
        })
      }
      className={`${TRIGGER_BASE} ${TRIGGER_VARIANT[variant]} ${className}`}
    >
      {label}
      <Arrow />
    </a>
  );
}

function EditionPickerButton({
  amazonUrl,
  ebookPrice,
  paperbackPrice,
  isbn,
  label = "Buy the book",
  variant = "solid",
  className = "",
}: PurchaseButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          // "Buy" click = intent to purchase → AddToCart. The pixel attaches
          // event source URL, event time, the _fbc cookie, and the client user
          // agent automatically.
          fbTrack("AddToCart", {
            content_name: "The Age of Accountability",
            content_type: "product",
            value: priceToNumber(ebookPrice),
            currency: "USD",
          });
        }}
        className={`${TRIGGER_BASE} ${TRIGGER_VARIANT[variant]} ${className}`}
      >
        {label}
        <Arrow />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-dialog-title"
          >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/65 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md rounded-2xl bg-ivory p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <p className="font-body text-xs font-bold uppercase tracking-wide text-brick">
              Choose your edition
            </p>
            <h2
              id="purchase-dialog-title"
              className="mt-2 font-display text-3xl font-semibold leading-tight text-ink"
            >
              The Age of Accountability
            </h2>

            <div className="mt-6 flex flex-col gap-3">
              {/* Ebook — Stripe Checkout via the server action. */}
              <form action={createCheckoutSession}>
                <EbookSubmit price={ebookPrice} />
              </form>

              {/* Paperback — fulfilled by Amazon. */}
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-4 rounded-xl border border-ink/12 bg-ivory p-5 text-left transition hover:border-action hover:bg-action/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-action/10 text-action">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 5h16v14H4zM4 9h16M9 5v4" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-semibold text-ink">
                    Paperback
                  </span>
                  <span className="mt-0.5 block font-body text-sm text-ink-soft">
                    Ships from Amazon
                  </span>
                </span>
                <span className="font-body text-sm font-bold text-action">
                  {paperbackPrice}
                </span>
              </a>
            </div>

            {isbn && (
              <p className="mt-5 text-center font-body text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
                Paperback ISBN {isbn}
              </p>
            )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

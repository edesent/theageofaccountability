"use client";

import { useEffect, useState } from "react";
import PurchaseButton from "@/components/PurchaseButton";
import { priceLabel } from "@/lib/ebook";
import { AMAZON_URL, ISBN, PAPERBACK_PRICE } from "@/lib/book";

const LINKS = [
  { href: "#case", label: "The question" },
  { href: "#quotes", label: "Quotes" },
  { href: "#articles", label: "Articles" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Click-away backdrop */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-ink/20"
          />
          <div className="absolute inset-x-0 top-full z-50 border-b border-ink/10 bg-ivory/98 shadow-[0_24px_40px_rgba(20,20,20,0.12)] backdrop-blur-xl">
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4"
            >
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-body text-base font-semibold text-ink-soft transition hover:bg-ink/5 hover:text-brick"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 px-3">
                <PurchaseButton
                  amazonUrl={AMAZON_URL}
                  ebookPrice={priceLabel()}
                  paperbackPrice={PAPERBACK_PRICE}
                  isbn={ISBN}
                  label="Buy book"
                  className="w-full"
                />
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

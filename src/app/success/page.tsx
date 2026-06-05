import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { createDownloadToken } from "@/lib/download-token";
import { EBOOK, priceLabel } from "@/lib/ebook";
import PurchaseTracking from "@/components/PurchaseTracking";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let buyerEmail = "";

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      buyerEmail = session.customer_details?.email ?? "";
    } catch {
      paid = false;
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
      {paid ? (
        <div className="rounded-3xl bg-ivory p-8 shadow-[0_24px_60px_rgba(20,20,20,0.10)] sm:p-12">
          <PurchaseTracking
            value={EBOOK.priceCents / 100}
            currency={EBOOK.currency.toUpperCase()}
          />
          <p className="font-body text-xs font-bold uppercase text-brick">
            Payment confirmed
          </p>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Thank you — your ebook is ready.
          </h1>
          <p className="mt-4 font-body text-ink/70">
            You purchased <strong>{EBOOK.title}</strong> for {priceLabel()}.
            {buyerEmail ? ` A receipt was sent to ${buyerEmail}.` : ""}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {EBOOK.formats.map((format) => {
              const token = createDownloadToken(sessionId!, format);
              return (
                <a
                  key={format}
                  href={`/api/download?token=${encodeURIComponent(token)}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 py-3 font-body text-sm font-semibold text-ivory transition hover:bg-ink"
                >
                  Download {format.toUpperCase()}
                </a>
              );
            })}
          </div>

          <p className="mt-6 font-body text-sm text-ink/60">
            These download links expire in 30 minutes. Your PDF is watermarked
            with your email — please keep it for your own use and don&apos;t
            share it.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-body text-sm font-semibold text-brick hover:text-ink"
          >
            ← Back to the book
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl bg-ivory p-8 text-center shadow-[0_24px_60px_rgba(20,20,20,0.10)] sm:p-12">
          <h1 className="font-display text-3xl text-ink">
            We couldn&apos;t confirm your purchase
          </h1>
          <p className="mt-4 font-body text-ink/70">
            If you were charged, please contact us and we&apos;ll send your copy
            right away. Otherwise you can try again from the book page.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 py-3 font-body text-sm font-semibold text-ivory transition hover:bg-ink"
          >
            Back to the book
          </Link>
        </div>
      )}
    </main>
  );
}

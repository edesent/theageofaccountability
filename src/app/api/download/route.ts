import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { getStripe } from "@/lib/stripe";
import { verifyDownloadToken } from "@/lib/download-token";
import { EBOOK, downloadFilename, type EbookFormat } from "@/lib/ebook";

// Never cache or prerender a paid download.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return new Response("Missing download token.", { status: 400 });
  }

  // 1) The token must be present, unexpired, and carry a valid signature.
  const payload = verifyDownloadToken(token);
  if (!payload) {
    return new Response("This download link is invalid or has expired.", {
      status: 403,
    });
  }

  // 2) Defense in depth: confirm with Stripe that this session was actually paid.
  let buyerEmail = "";
  try {
    const session = await getStripe().checkout.sessions.retrieve(
      payload.sessionId,
    );
    if (session.payment_status !== "paid") {
      return new Response("Payment for this link could not be verified.", {
        status: 403,
      });
    }
    buyerEmail = session.customer_details?.email ?? "";
  } catch {
    return new Response("Payment for this link could not be verified.", {
      status: 403,
    });
  }

  const format = payload.format as EbookFormat;
  const fileName = EBOOK.files[format];
  if (!fileName) {
    return new Response("Unknown ebook format.", { status: 400 });
  }

  // 3) Read from /private — outside /public, so it is never served statically.
  //    next.config.ts traces this folder into the function bundle for Vercel.
  const filePath = path.join(process.cwd(), "private", fileName);
  let fileBytes: Buffer;
  try {
    fileBytes = await readFile(filePath);
  } catch {
    return new Response("The ebook file is not available. Please contact us.", {
      status: 500,
    });
  }

  // 4) Watermark PDFs per-buyer. This is the anti-resharing deterrent: a leaked
  //    copy points straight back to the purchaser. EPUB is delivered as-is.
  let body: Uint8Array = new Uint8Array(fileBytes);
  let contentType = "application/octet-stream";

  if (format === "pdf") {
    contentType = "application/pdf";
    try {
      body = await watermarkPdf(fileBytes, buyerEmail);
    } catch {
      // If watermarking fails, fall back to the original rather than blocking
      // a paying customer.
      body = new Uint8Array(fileBytes);
    }
  } else if (format === "epub") {
    contentType = "application/epub+zip";
  }

  const filename = downloadFilename(format);
  return new Response(body as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "no-store",
    },
  });
}

async function watermarkPdf(
  bytes: Buffer,
  buyerEmail: string,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const stamp = buyerEmail
    ? `Licensed to ${buyerEmail} — not for redistribution`
    : "Licensed copy — not for redistribution";

  for (const page of pdf.getPages()) {
    const { width } = page.getSize();

    // Footer stamp on every page.
    page.drawText(stamp, {
      x: 36,
      y: 18,
      size: 7,
      font,
      color: rgb(0.45, 0.45, 0.45),
    });

    // Faint diagonal watermark across the page.
    if (buyerEmail) {
      page.drawText(buyerEmail, {
        x: width / 2 - 160,
        y: 120,
        size: 28,
        font,
        color: rgb(0.85, 0.85, 0.85),
        rotate: degrees(35),
        opacity: 0.35,
      });
    }
  }

  return pdf.save();
}

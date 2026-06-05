import crypto from "node:crypto";
import type { EbookFormat } from "@/lib/ebook";

// A download link is a short-lived, signed token — NOT a guessable file path.
// It binds: the Stripe session that paid, the format, and an expiry.
// Tampering with any field invalidates the HMAC signature.

function getSecret(): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    throw new Error(
      "DOWNLOAD_TOKEN_SECRET is not set. Generate one with `openssl rand -hex 32` and add it to your env.",
    );
  }
  return secret;
}

// How long a download link stays valid after purchase.
const TTL_MS = 30 * 60 * 1000; // 30 minutes

type Payload = {
  sessionId: string;
  format: EbookFormat;
  exp: number; // epoch ms
};

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(data: string): string {
  return b64url(crypto.createHmac("sha256", getSecret()).update(data).digest());
}

export function createDownloadToken(
  sessionId: string,
  format: EbookFormat,
): string {
  const payload: Payload = { sessionId, format, exp: Date.now() + TTL_MS };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyDownloadToken(token: string): Payload | null {
  const now = Date.now();
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;

  const expected = sign(body);
  // Constant-time comparison to avoid signature-timing leaks.
  const sigBuf = fromB64url(sig);
  const expBuf = fromB64url(expected);
  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    return null;
  }

  let payload: Payload;
  try {
    payload = JSON.parse(fromB64url(body).toString("utf8"));
  } catch {
    return null;
  }

  if (typeof payload.exp !== "number" || payload.exp < now) return null;
  if (payload.format !== "pdf" && payload.format !== "epub") return null;
  if (!payload.sessionId) return null;

  return payload;
}

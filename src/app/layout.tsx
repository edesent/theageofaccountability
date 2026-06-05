import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = "The Age of Accountability — a book by Jerry Boritzki";
const SITE_DESCRIPTION =
  "A doctrine grounded in Scripture, not human reasoning. Over two decades in the making, The Age of Accountability by Jerry Boritzki examines what the Bible itself teaches about young people, the love of God, and when accountability begins.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theageofaccountability.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Age of Accountability",
    "Jerry Boritzki",
    "Christian doctrine",
    "children and salvation",
    "theology",
    "Christian book",
  ],
  authors: [{ name: "Jerry Boritzki" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "book",
    images: [{ url: "/images/book-front.jpg", width: 331, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/book-front.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}

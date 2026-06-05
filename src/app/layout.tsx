import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://theageofaccountability.com";
const SITE_TITLE = "The Age of Accountability — a book by Jerry Boritzki";
const SITE_DESCRIPTION =
  "A doctrine grounded in Scripture, not human reasoning. Over two decades in the making, The Age of Accountability by Jerry Boritzki examines what the Bible itself teaches about young people, the love of God, and when accountability begins.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · The Age of Accountability",
  },
  description: SITE_DESCRIPTION,
  applicationName: "The Age of Accountability",
  keywords: [
    "Age of Accountability",
    "Jerry Boritzki",
    "Christian doctrine",
    "age of accountability book",
    "children and salvation",
    "when does accountability begin",
    "biblical doctrine",
    "theology",
    "Christian parenting",
    "Sunday school doctrine",
    "Christian book",
  ],
  authors: [{ name: "Jerry Boritzki" }],
  creator: "Jerry Boritzki",
  publisher: "Jerry Boritzki",
  category: "Religion & Spirituality",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "book",
    url: SITE_URL,
    siteName: "The Age of Accountability",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Age of Accountability by Jerry Boritzki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#252821",
  colorScheme: "light",
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

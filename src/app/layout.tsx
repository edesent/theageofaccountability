import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://perthbible.church";
const SITE_TITLE = "Perth Bible Church";
const SITE_DESCRIPTION =
  "Perth Bible Church in Amsterdam, New York exists to love God absolutely and love others sacrificially.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Perth Bible Church",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  keywords: [
    "Perth Bible Church",
    "Amsterdam NY church",
    "Perth Bible Christian Academy",
    "church in Amsterdam New York",
    "Bible church",
    "Christian academy",
  ],
  authors: [{ name: "Perth Bible Church" }],
  creator: "Perth Bible Church",
  publisher: "Perth Bible Church",
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
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/church/hero.jpeg",
        width: 1200,
        height: 800,
        alt: "Perth Bible Church gathering space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/church/hero.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#11295c",
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
      <body className="min-h-full bg-paper text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted (OFL-licensed) fonts: no third-party requests, no layout shift.
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-opsz-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-opsz-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});
const amiri = localFont({
  src: "./fonts/amiri-arabic-400-normal.woff2",
  weight: "400",
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hajj & Umrah Packages 2027 from Birmingham | Al-Makkawi Travel",
    template: "%s | Al-Makkawi Travel",
  },
  description: site.description,
  keywords: [
    "Hajj packages UK",
    "Umrah packages Birmingham",
    "Hajj 2027",
    "Umrah 2027",
    "ATOL protected Umrah",
    "Islamic tours",
    "Al-Aqsa tour",
    "Hajj travel agent Birmingham",
    "Makkah hotels",
    "Madinah hotels",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Hajj & Umrah from Birmingham | Al-Makkawi Travel",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@almakkawitravel",
    title: "Hajj & Umrah from Birmingham | Al-Makkawi Travel",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#0e3a2f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${manrope.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveals only hide content once this class is set, so the page is complete without JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* The compiled CSS loses comments, so the stamp fields the render check reads are repeated here (see app/globals.css). */}
        <style>{"/* Hallmark · hero: Poster · posture: committed · job: book · genre: editorial · theme: brand · redesign: full */"}</style>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

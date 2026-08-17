import type { Metadata } from "next";
import localFont from "next/font/local";

import { Navigation } from "@/components/navigation";
import { PixelBoot } from "@/components/pixel-boot";
import { ContextCursor, TemporalProvider } from "@/components/temporal-archive";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const ibmPlexMono = localFont({
  src: [
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "../public/fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();
const homeUrl = `${siteUrl}/`;
const title = "Matthew Wijaya \u2014 Computer Science, Design & Software";
const description =
  "Matthew Wijaya is a Computer Science student at Universitas Indonesia working across software engineering, product design, interaction design, and web development.";
const ogImageUrl = `${siteUrl}/opengraph-image`;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: homeUrl,
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
    title,
    description,
    url: homeUrl,
    siteName: "Matthew Wijaya Portfolio",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Matthew Wijaya portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: ogImageUrl, alt: "Matthew Wijaya portfolio preview" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${plusJakartaSans.variable}`}>
      <body>
        <TemporalProvider>
          <PixelBoot />
          <Navigation />
          <div className="site-shell">
            <div className="grain" />
            {children}
          </div>
          <ContextCursor />
        </TemporalProvider>
      </body>
    </html>
  );
}

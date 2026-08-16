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

export const metadata: Metadata = {
  title: "Matthew Wijaya - Design & Software",
  description:
    "Portfolio of Matthew Wijaya, a Computer Science student at Universitas Indonesia working across UI/UX design, web experiences, and software development.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Matthew Wijaya - Design & Software",
    description:
      "Portfolio of Matthew Wijaya, a Computer Science student at Universitas Indonesia working across UI/UX design, web experiences, and software development.",
    url: siteUrl,
    siteName: "Matthew Wijaya Portfolio",
    images: [
      {
        url: "/opengraph-image",
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
    title: "Matthew Wijaya - Design & Software",
    description:
      "Portfolio of Matthew Wijaya, a Computer Science student at Universitas Indonesia working across UI/UX design, web experiences, and software development.",
    images: ["/opengraph-image"],
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

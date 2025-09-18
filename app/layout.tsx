import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "./ga";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Evan Grothjan Portfolio",
  description: "Visual investigator and filmmaker portfolio",
  icons: {
    icon: "/favicon-2.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlex.variable}>
      <head>
        <link rel="icon" href="/favicon-2.ico" type="image/x-icon" />
      </head>
      <body className="antialiased font-sans bg-[var(--background)] text-[var(--foreground)]">
        {/* 🔑 Fixed 4cm padding left & right */}
        <main style={{ paddingLeft: ".1cm", paddingRight: ".05cm" }}>
          {children}
        </main>

        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

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
  title: "Grothjan Studio",
  description: "Art Direction, Animation, & Design",
  icons: { icon: "/favicon-2.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={ibmPlex.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased font-sans bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
        {children}
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

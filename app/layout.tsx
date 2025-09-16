import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Icon } from "@iconify/react";
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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-16 text-center sm:text-left">
          <header className="flex justify-between items-baseline py-4 sm:items-end sm:justify-between sm:flex-row sm:py-4">
            <Link href="/" className="text-2xl">
              grothjan
            </Link>
            <div className="flex gap-3 items-center">
              <Link
                href="https://www.linkedin.com/in/evan-grothjan-09772b57/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Icon
                  icon="mdi:linkedin"
                  className="text-gray-600 dark:text-gray-300 w-5 h-5 hover:text-black dark:hover:text-white transition-colors"
                />
              </Link>
              <Link
                href="https://x.com/EvanGrothjan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
              >
                <Icon
                  icon="ri:twitter-x-fill"
                  className="text-gray-600 dark:text-gray-300 w-5 h-5 hover:text-black dark:hover:text-white transition-colors"
                />
              </Link>
              <Link
                href="mailto:evangrothjan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Icon
                  icon="ic:outline-email"
                  className="text-gray-600 dark:text-gray-300 w-5 h-5 hover:text-black dark:hover:text-white transition-colors"
                />
              </Link>
            </div>
          </header>
        </div>

        <main className="max-w-screen-xl mx-auto px-0 sm:px-8 text-center sm:text-left">
          {children}
        </main>

        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AAAGTMP — Aurion AI Agent GTM Platform",
  description:
    "Governance Portal — Real-time AI agent dashboard for Aurion Group. Institutional-grade GTM with mandatory human approval.",
  openGraph: {
    title: "AAAGTMP — Aurion AI Agent GTM Platform",
    description:
      "Governance Portal — Real-time AI agent dashboard for Aurion Group. Institutional-grade GTM with mandatory human approval.",
    url: "https://aaagtmp.amirariff.com",
    siteName: "AAAGTMP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

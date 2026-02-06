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
  title: {
    default: "JTLD Consulting Inc | IT Staffing & Technology Consulting",
    template: "%s | JTLD Consulting Inc",
  },
  description:
    "JTLD Consulting Inc connects IT professionals with employers seeking contract, direct hire, and project-based IT talent. Staffing, consulting, and workforce solutions.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://jtldinc.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "JTLD Consulting Inc",
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

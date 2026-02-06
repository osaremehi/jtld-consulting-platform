import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";
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
    default: "JTLD Consulting Inc | Business Consulting & Technology Services",
    template: "%s | JTLD Consulting Inc",
  },
  description:
    "JTLD Consulting Inc delivers strategic business consulting, managed IT services, AI solutions, data analytics, and cloud infrastructure to drive measurable results.",
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
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}

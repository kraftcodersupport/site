import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brand } from "@/lib/niches";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Outfit({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["400", "500", "600", "700", "800"],
});

const editorialFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial-family",
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Premium AI Consultancy`,
    template: `%s | ${brand.name}`,
  },
  description: brand.tagline,
  metadataBase: new URL(siteUrl),
  applicationName: brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: brand.name,
    title: brand.name,
    description: brand.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${editorialFont.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

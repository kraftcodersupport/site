import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { getOrganizationSchema, getProfessionalServiceSchema, JsonLd } from "@/lib/jsonld";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kraft-coder.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        template: "%s | KraftCoder",
        default: "KraftCoder — Enterprise AI Consulting & Strategy",
    },
    description:
        "KraftCoder helps organizations turn AI into measurable business outcomes. Enterprise AI consulting, strategy, agent development, RAG systems, and governed delivery models.",
    keywords: [
        "AI consulting",
        "AI strategy",
        "enterprise AI",
        "AI agents",
        "AI automation",
        "RAG systems",
        "chatbot development",
        "AI consulting firm",
        "AI implementation",
        "machine learning consulting",
        "AI governance",
        "KraftCoder",
    ],
    applicationName: "KraftCoder",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        siteName: "KraftCoder",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
    alternates: {
        canonical: "/",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);
    const isRtl = locale === "ar";

    return (
        <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${jakarta.variable} ${sora.variable}`}>
            <body className="antialiased">
                {/* Global Organization & ProfessionalService JSON-LD */}
                <JsonLd data={getOrganizationSchema()} />
                <JsonLd data={getProfessionalServiceSchema()} />

                <Navbar locale={locale} dict={dict} />
                <main className="pt-16">
                    {children}
                </main>
                <Footer locale={locale} dict={dict} />
                <Chatbot />
            </body>
        </html>
    );
}

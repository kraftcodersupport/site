import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

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

import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
        <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${inter.variable} ${outfit.variable}`}>
            <body className="bg-white text-black antialiased selection:bg-primary/30">
                <Navbar locale={locale} dict={dict} />
                <main className="pt-14">
                    {children}
                </main>
                <Footer locale={locale} dict={dict} />
            </body>
        </html>
    );
}

import Link from "next/link";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { NICHES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import CTASection from "@/components/CTASection";
import { getItemListSchema, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "AI Solutions — Enterprise, RAG, Chatbot, SaaS & Cloud",
    description:
        "Specialized AI solutions for enterprise delivery: consulting & strategy, agent development, automation, RAG systems, chatbots, SaaS development, and cloud infrastructure.",
    keywords: ["AI solutions", "enterprise AI", "RAG solutions", "AI chatbot", "SaaS AI", "cloud AI"],
    alternates: { canonical: "/solutions" },
    openGraph: {
        title: "AI Solutions — Enterprise, RAG, Chatbot, SaaS & Cloud",
        description: "Specialized AI paradigms for enterprise and startup delivery.",
        url: "/solutions",
        type: "website",
    },
};
export default async function SolutionsPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            {/* ── SEO: Structured Data ── */}
            <JsonLd data={getItemListSchema("KraftCoder AI Solutions", NICHES.map(n => ({
                name: n.title,
                description: n.shortDescription,
                url: `/solutions/${n.slug}`,
            })))} />

            <PageHero
                title={dict.nav.solutions}
                subtitle="Specialized AI paradigms for enterprise and startup delivery. We provide the architecture, safety, and implementation layer."
                eyebrow="Capabilities"
            />

            {/* ── Solutions Grid (Light Background - Mix Mode) ── */}
            <section className="section-padding bg-zinc-50 border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {NICHES.map((item, index) => (
                            <Link
                                key={item.slug}
                                href={`/solutions/${item.slug}`}
                                className="group card-light flex flex-col justify-between rounded-3xl p-8 reveal-up bg-white border border-zinc-200 shadow-sm relative overflow-hidden"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all group-hover:bg-primary/10" />

                                <div className="relative z-10">
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight text-zinc-900 mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-semibold leading-relaxed text-zinc-600 line-clamp-2">
                                        {item.shortDescription}
                                    </p>
                                </div>
                                <div className="mt-10 pt-6 border-t border-zinc-100 flex items-center justify-between relative z-10">
                                    <div className="rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                        {item.metric}
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 text-zinc-400 transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Summary CTA Section (Dark Background - Mix Mode) ── */}
            <CTASection
                title="Architecture first. Implementation always."
                subtitle="We don't just build features; we build governed AI programs that scale reliably across your entire enterprise infrastructure."
                buttonText="Request Strategy Session"
                eyebrow="Our Commitment"
            />
        </div>
    );
}

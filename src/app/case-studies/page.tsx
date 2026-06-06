import Link from "next/link";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CASE_STUDIES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import CTASection from "@/components/CTASection";
import { getItemListSchema, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "AI Case Studies — Measurable ROI from Enterprise Implementations",
    description:
        "Real-world AI implementation case studies showing 52% faster onboarding, 71% faster policy lookup, 18 hours saved weekly, and 34% higher analyst throughput.",
    keywords: ["AI case studies", "AI ROI", "enterprise AI results", "AI implementation examples"],
    alternates: { canonical: "/case-studies" },
    openGraph: {
        title: "AI Case Studies — Measurable ROI from Enterprise Implementations",
        description: "Pilots that scaled. High-impact enterprise AI implementations that delivered measurable ROI.",
        url: "/case-studies",
        type: "website",
    },
};
export default async function CaseStudiesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            {/* ── SEO: Structured Data ── */}
            <JsonLd data={getItemListSchema("KraftCoder AI Case Studies", CASE_STUDIES.map(cs => ({
                name: cs.title,
                description: cs.summary,
            })))} />

            <PageHero 
                title={dict.nav.caseStudies} 
                subtitle="Pilots that scaled. High-impact enterprise AI implementations that delivered measurable ROI and improved operational throughput." 
                eyebrow="Our Work"
            />
            
            {/* ── Case Studies List (Light Background - Mix Mode) ── */}
            <section className="section-padding bg-zinc-50 border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {CASE_STUDIES.map((study, index) => (
                            <div key={study.title} className={`flex flex-col gap-16 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} reveal-up`} style={{ animationDelay: `${index * 150}ms` }}>
                                {/* Content Column */}
                                <div className="lg:w-1/2">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
                                        <div className="flex items-center justify-center p-1.5 rounded-md bg-primary/10 border border-primary/20">
                                            <study.icon className="h-3.5 w-3.5" />
                                        </div>
                                        <span>{study.sector}</span>
                                        <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                        <span className="text-zinc-500">{study.client}</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-zinc-900 sm:text-4xl mb-6 leading-tight tracking-tight">{study.title}</h2>
                                    <div className="space-y-6">
                                        <p className="text-base font-semibold text-zinc-600 leading-relaxed italic border-l-2 border-primary pl-5">{study.summary}</p>
                                        
                                        <div className="grid gap-8 sm:grid-cols-2 pt-6 mt-6 border-t border-zinc-200">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">The Challenge</span>
                                                <p className="mt-2 text-sm font-semibold text-zinc-700 leading-relaxed">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">The Impact</span>
                                                <p className="mt-2 text-sm font-semibold text-zinc-900 leading-relaxed">{study.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Metric/Visual Column */}
                                <div className="lg:w-1/2">
                                    <div className="aspect-4/3 w-full rounded-3xl glass-strong flex flex-col items-center justify-center p-10 text-center group border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
                                        {/* Subtle background element */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all group-hover:bg-primary/30" />
                                        
                                        <div className="text-6xl font-black text-white mb-4 group-hover:text-primary-light transition-colors tracking-tighter relative z-10">{study.metric}</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 relative z-10">{study.result}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* ── Ready to Deliver CTA (Dark Background - Mix Mode) ── */}
            <CTASection />
        </div>
    );
}

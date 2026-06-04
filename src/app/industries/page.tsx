import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { INDUSTRIES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function IndustriesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero title={dict.nav.industries} subtitle="Sector-specific AI implementations that account for industry-specific constraints, compliance, and competitive dynamics." />
            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {INDUSTRIES.map((industry, index) => (
                            <div key={industry.title} className="group card-dark rounded-2xl p-8 reveal-up" style={{ animationDelay: `${index * 80}ms` }}>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <industry.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{industry.title}</h3>
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-6">{industry.description}</p>
                                <div className="space-y-4 pt-5 border-t border-white/[0.06]">
                                    <div>
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Primary Challenge</span>
                                        <p className="text-sm font-medium text-zinc-300 mt-1">{industry.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-light">Strategic Outcome</span>
                                        <p className="text-sm font-medium text-white mt-1">{industry.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-padding bg-background relative overflow-hidden border-t border-white/[0.04] section-glow">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Don&apos;t see your sector?</h2>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-400">Our delivery methodology is sector-agnostic at its core, but compliance-aware in its implementation. We can design a custom roadmap for any enterprise operating in high-stakes environments.</p>
                    <div className="mt-10">
                        <Link href="/contact" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-zinc-300 hover:bg-primary hover:border-primary hover:text-white transition-all">
                            Request Sector Capability Brief <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

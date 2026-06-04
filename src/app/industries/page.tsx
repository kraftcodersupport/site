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
            <PageHero
                title={dict.nav.industries}
                subtitle="Sector-specific AI implementations that account for industry-specific constraints, compliance, and competitive dynamics."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {INDUSTRIES.map((industry, index) => (
                            <div
                                key={industry.title}
                                className="group feature-card-light rounded-[40px] p-10 border border-slate-100 reveal-up hover:border-primary/20 transition-all"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-8 group-hover:scale-110 transition-transform">
                                    <industry.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{industry.title}</h3>
                                <p className="text-base font-medium text-slate-500 leading-relaxed mb-8">
                                    {industry.description}
                                </p>
                                <div className="space-y-4 pt-6 border-t border-slate-100">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Challenge</span>
                                        <p className="text-sm font-bold text-slate-700 mt-1">{industry.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Outcome</span>
                                        <p className="text-sm font-bold text-slate-900 mt-1">{industry.outcome}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agnostic Section */}
            <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Don&apos;t see your sector?
                    </h2>
                    <p className="mt-6 text-lg font-medium leading-relaxed text-slate-400">
                        Our delivery methodology is sector-agnostic at its core, but compliance-aware in its implementation. We can design a custom roadmap for any enterprise operating in high-stakes environments.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-black text-white hover:bg-primary hover:border-primary transition-all"
                        >
                            Request Sector Capability Brief <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

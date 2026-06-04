import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CASE_STUDIES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function CaseStudiesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero title={dict.nav.caseStudies} subtitle="Pilots that scaled. High-impact enterprise AI implementations that delivered measurable ROI and improved operational throughput." />
            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-20">
                        {CASE_STUDIES.map((study, index) => (
                            <div key={study.title} className={`flex flex-col gap-12 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} reveal-up`} style={{ animationDelay: `${index * 150}ms` }}>
                                <div className="lg:w-1/2">
                                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-primary-light mb-5">
                                        <study.icon className="h-3.5 w-3.5" />
                                        <span>{study.sector}</span>
                                        <span className="h-1 w-1 rounded-full bg-zinc-700" />
                                        <span className="text-zinc-500">{study.client}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white sm:text-3xl mb-5 leading-tight">{study.title}</h2>
                                    <div className="space-y-5">
                                        <p className="text-base font-medium text-zinc-400 leading-relaxed italic border-l-2 border-primary/30 pl-5">{study.summary}</p>
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">The Challenge</span>
                                                <p className="mt-1 text-sm font-medium text-zinc-300 leading-relaxed">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-light">The Impact</span>
                                                <p className="mt-1 text-sm font-medium text-white leading-relaxed">{study.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="aspect-video w-full rounded-2xl card-dark flex flex-col items-center justify-center p-10 text-center group">
                                        <div className="text-4xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">{study.metric}</div>
                                        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{study.result}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-padding bg-background relative overflow-hidden border-t border-white/[0.04] section-glow">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to deliver results?</h2>
                    <p className="mt-6 text-lg font-medium text-zinc-400 max-w-2xl mx-auto">Our delivery methodology is designed for speed and technical rigor.</p>
                    <div className="mt-10">
                        <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all">
                            Start Your Pilot <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

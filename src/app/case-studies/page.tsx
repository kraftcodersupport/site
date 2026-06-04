import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, MessageSquareText, Database, Workflow, BarChart3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CASE_STUDIES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function CaseStudiesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.caseStudies}
                subtitle="Pilots that scaled. High-impact enterprise AI implementations that delivered measurable ROI and improved operational throughput."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {CASE_STUDIES.map((study, index) => (
                            <div
                                key={study.title}
                                className={`flex flex-col gap-16 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} reveal-up`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="lg:w-1/2">
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary mb-6">
                                        <study.icon className="h-4 w-4" />
                                        <span>{study.sector}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                                        <span className="text-slate-400">{study.client}</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-6 leading-tight">
                                        {study.title}
                                    </h2>
                                    <div className="space-y-6">
                                        <p className="text-lg font-medium text-slate-500 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                                            {study.summary}
                                        </p>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Challenge</span>
                                                <p className="mt-1 text-sm font-bold text-slate-700 leading-relaxed">{study.challenge}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">The Impact</span>
                                                <p className="mt-1 text-sm font-bold text-slate-900 leading-relaxed">{study.impact}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="aspect-video w-full rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-12 text-center group transition-colors hover:border-primary/20">
                                        <div className="text-5xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">{study.metric}</div>
                                        <div className="text-sm font-black uppercase tracking-widest text-slate-400">{study.result}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to deliver results?</h2>
                    <p className="mt-6 text-lg font-medium text-slate-400 max-w-2xl mx-auto">
                        Our delivery methodology is designed for speed and technical rigor.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-black text-black hover:bg-primary hover:text-white transition-all"
                        >
                            Start Your Pilot <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

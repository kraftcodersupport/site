import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, ShieldCheck, Sparkles, Globe, Rocket } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";

export default async function AboutPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.about}
                subtitle="A high-performance consultancy moving at the intersection of executive strategy and technical execution."
            />

            <section className="relative py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="prose prose-slate prose-lg max-w-none">
                                <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
                                    Turning broad curiosity into <span className="text-primary italic">prioritized roadmaps.</span>
                                </h2>
                                <p className="mt-8 text-lg font-medium leading-relaxed text-slate-600">
                                    Most organizations are curious about AI, but few have a disciplined execution model. At KraftCoder, we bridge that gap. We help leadership teams move beyond the hype and focus on the 2-3 use cases that will actually move the needle in their P&L.
                                </p>
                                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
                                        <div className="h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary flex mb-6">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-4">Governed Delivery</h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                            We prioritize security, privacy, and compliance from day one, ensuring AI systems fit within existing enterprise controls.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-50 p-8 border border-slate-100">
                                        <div className="h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary flex mb-6">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-4">Outcome Oriented</h3>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                            We focus on ROI, throughput, and efficiency metrics, not just model benchmarks. We ship systems that solve real business problems.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 rounded-[40px] bg-background p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 surface-grid opacity-10" />
                                <div className="relative z-10 h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white flex mb-8">
                                    <Rocket className="h-7 w-7" />
                                </div>
                                <h3 className="relative z-10 text-2xl font-black text-white mb-6">Built for Momentum</h3>
                                <p className="relative z-10 text-sm font-bold text-white/80 leading-relaxed mb-10">
                                    We don&apos;t just deliver documents. We deliver production systems that sit inside your existing tech ecosystem and generate ROI from week 01.
                                </p>
                                <Link
                                    href="/contact"
                                    className="relative z-10 flex items-center justify-center gap-3 rounded-full bg-white py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-primary hover:text-white"
                                >
                                    Initiate Roadmap <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

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

            <section className="relative section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="max-w-none">
                                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                    Turning broad curiosity into <span className="text-primary-light italic">prioritized roadmaps.</span>
                                </h2>
                                <p className="mt-8 text-lg font-medium leading-relaxed text-zinc-400">
                                    Most organizations are curious about AI, but few have a disciplined execution model. At KraftCoder, we bridge that gap. We help leadership teams move beyond the hype and focus on the 2-3 use cases that will actually move the needle in their P&L.
                                </p>
                                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                                    <div className="card-dark rounded-2xl p-7">
                                        <div className="h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary flex mb-5">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-3">Governed Delivery</h3>
                                        <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                                            We prioritize security, privacy, and compliance from day one, ensuring AI systems fit within existing enterprise controls.
                                        </p>
                                    </div>
                                    <div className="card-dark rounded-2xl p-7">
                                        <div className="h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary flex mb-5">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-3">Outcome Oriented</h3>
                                        <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                                            We focus on ROI, throughput, and efficiency metrics, not just model benchmarks. We ship systems that solve real business problems.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 glass rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute inset-0 surface-grid opacity-10" />
                                <div className="relative z-10 h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex mb-6">
                                    <Rocket className="h-6 w-6" />
                                </div>
                                <h3 className="relative z-10 text-xl font-bold text-white mb-4">Built for Momentum</h3>
                                <p className="relative z-10 text-sm font-medium text-zinc-400 leading-relaxed mb-8">
                                    We don&apos;t just deliver documents. We deliver production systems that sit inside your existing tech ecosystem and generate ROI from week 01.
                                </p>
                                <Link
                                    href="/contact"
                                    className="relative z-10 flex items-center justify-center gap-3 rounded-full bg-primary py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]"
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

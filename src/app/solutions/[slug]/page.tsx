import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getNicheBySlug, brand } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function SolutionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);
    const niche = getNicheBySlug(slug);

    if (!niche) {
        notFound();
    }

    return (
        <div className="relative">
            <PageHero
                title={niche.title}
                subtitle={niche.shortDescription}
            />

            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="max-w-none">
                                <h2 className="text-3xl font-bold text-white sm:text-4xl">Overview</h2>
                                <p className="mt-8 text-lg font-medium leading-relaxed text-zinc-400">
                                    {niche.overview}
                                </p>

                                <h3 className="mt-14 text-2xl font-bold text-white">Key Outcomes</h3>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {niche.outcomes.map((outcome) => (
                                        <div key={outcome} className="flex items-start gap-3 p-5 rounded-2xl card-dark">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <p className="text-sm font-medium text-zinc-300 leading-relaxed">{outcome}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="mt-14 text-2xl font-bold text-white">Deliverables</h3>
                                <ul className="mt-6 grid gap-3">
                                    {niche.deliverables.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-zinc-400 font-medium">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 space-y-6">
                                <div className="glass rounded-2xl p-8 relative overflow-hidden">
                                    <div className="absolute inset-0 surface-grid opacity-10" />
                                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white mb-6">
                                        <niche.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="relative z-10 text-lg font-bold text-white mb-3">Strategic Metric</h3>
                                    <div className="relative z-10 text-2xl font-bold text-primary-light mb-8">{niche.metric}</div>

                                    <div className="relative z-10 pt-6 border-t border-white/[0.06]">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Best For</span>
                                        <p className="mt-2 text-sm font-medium text-zinc-400 leading-relaxed">{niche.bestFor}</p>
                                    </div>
                                </div>

                                <Link
                                    href="/contact"
                                    className="group flex items-center justify-center gap-3 rounded-full bg-primary py-5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)]"
                                >
                                    Initiate Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

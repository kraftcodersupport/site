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

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-20 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="prose prose-slate prose-lg max-w-none">
                                <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Overview</h2>
                                <p className="mt-8 text-lg font-medium leading-relaxed text-slate-600">
                                    {niche.overview}
                                </p>

                                <h3 className="mt-16 text-2xl font-black text-slate-900">Key Outcomes</h3>
                                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                                    {niche.outcomes.map((outcome) => (
                                        <div key={outcome} className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">{outcome}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="mt-16 text-2xl font-black text-slate-900">Deliverables</h3>
                                <ul className="mt-8 grid gap-4">
                                    {niche.deliverables.map((item) => (
                                        <li key={item} className="flex items-center gap-4 text-slate-600 font-medium">
                                            <div className="h-2 w-2 rounded-full bg-primary/40" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <div className="rounded-[40px] bg-background p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 surface-grid opacity-10" />
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white mb-8">
                                        <niche.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="relative z-10 text-xl font-black text-white mb-4">Strategic Metric</h3>
                                    <div className="relative z-10 text-3xl font-black text-primary mb-10">{niche.metric}</div>

                                    <div className="relative z-10 pt-8 border-t border-white/10">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Best For</span>
                                        <p className="mt-3 text-sm font-bold text-white/80 leading-relaxed">{niche.bestFor}</p>
                                    </div>
                                </div>

                                <Link
                                    href="/contact"
                                    className="group flex items-center justify-center gap-3 rounded-full bg-slate-900 py-6 text-sm font-black text-white transition-all hover:bg-primary shadow-xl"
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

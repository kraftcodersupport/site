import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getNicheBySlug, brand } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import { getServiceSchema, getBreadcrumbSchema, JsonLd, BASE_URL } from "@/lib/jsonld";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const niche = getNicheBySlug(slug);
    if (!niche) return {};

    return {
        title: `${niche.title} — KraftCoder AI Solutions`,
        description: niche.shortDescription,
        keywords: [niche.title, "AI solutions", "enterprise AI", brand.name],
        alternates: { canonical: `/solutions/${slug}` },
        openGraph: {
            title: `${niche.title} — KraftCoder`,
            description: niche.shortDescription,
            url: `/solutions/${slug}`,
            type: "website",
        },
    };
}
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
            {/* ── SEO: Structured Data ── */}
            <JsonLd data={{
                "@context": "https://schema.org",
                ...getServiceSchema({ title: niche.title, description: niche.shortDescription, bullets: niche.deliverables }),
            }} />
            <JsonLd data={getBreadcrumbSchema([
                { name: "Home", href: "/" },
                { name: "Solutions", href: "/solutions" },
                { name: niche.title },
            ])} />

            <PageHero
                title={niche.title}
                subtitle={niche.shortDescription}
                eyebrow="Specialized Solution"
            />

            {/* ── Solution Details (Light Background - Mix Mode) ── */}
            <section className="section-padding bg-zinc-50 border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="max-w-none">
                                <h2 className="text-3xl font-black text-zinc-900 sm:text-4xl tracking-tight">Overview</h2>
                                <p className="mt-6 text-lg font-semibold leading-relaxed text-zinc-600">
                                    {niche.overview}
                                </p>

                                <h3 className="mt-16 text-2xl font-black text-zinc-900 tracking-tight">Key Outcomes</h3>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                    {niche.outcomes.map((outcome) => (
                                        <div key={outcome} className="flex items-start gap-3 p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <p className="text-sm font-bold text-zinc-700 leading-relaxed">{outcome}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="mt-16 text-2xl font-black text-zinc-900 tracking-tight">Deliverables</h3>
                                <ul className="mt-6 grid gap-4">
                                    {niche.deliverables.map((item) => (
                                        <li key={item} className="flex items-center gap-4 text-zinc-700 font-semibold p-4 rounded-xl bg-white border border-zinc-100 shadow-sm">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-32 space-y-6">
                                <div className="card-light rounded-3xl p-8 bg-white border border-zinc-200 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none transition-all group-hover:bg-primary/10" />
                                    
                                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-8">
                                        <niche.icon className="h-6 w-6" />
                                    </div>
                                    
                                    <h3 className="relative z-10 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Strategic Metric</h3>
                                    <div className="relative z-10 text-3xl font-black text-zinc-900 mb-8">{niche.metric}</div>

                                    <div className="relative z-10 pt-6 border-t border-zinc-100">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Best For</span>
                                        <p className="mt-2 text-sm font-semibold text-zinc-600 leading-relaxed">{niche.bestFor}</p>
                                    </div>
                                </div>

                                <Link
                                    href="/contact"
                                    className="group flex items-center justify-center gap-3 rounded-2xl hero-cta-primary py-5 text-sm font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-95"
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

import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Bot, Workflow, Building2, Database, MessageSquareText, Rocket, Server, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { NICHES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function SolutionsPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.solutions}
                subtitle="Specialized AI paradigms for enterprise and startup delivery. We provide the architecture, safety, and implementation layer."
            />

            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {NICHES.map((item, index) => (
                            <Link
                                key={item.slug}
                                href={`/solutions/${item.slug}`}
                                className="group card-dark flex flex-col justify-between rounded-2xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div>
                                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-bold tracking-tight text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-medium leading-relaxed text-zinc-500 line-clamp-2">
                                        {item.shortDescription}
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center justify-between">
                                    <div className="rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                                        {item.metric}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-primary-light" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Summary Section */}
            <section className="section-padding bg-background relative overflow-hidden border-t border-white/[0.04] section-glow">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Architecture first. Implementation always.</h2>
                    <p className="mt-8 text-xl font-medium text-zinc-400 max-w-3xl mx-auto">
                        We don&apos;t just build features; we build governed AI programs that scale.
                    </p>
                </div>
            </section>
        </div>
    );
}

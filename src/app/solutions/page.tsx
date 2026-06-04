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

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {NICHES.map((item, index) => (
                            <Link
                                key={item.slug}
                                href={`/solutions/${item.slug}`}
                                className="group flex flex-col justify-between rounded-[40px] bg-slate-50 p-10 border border-slate-100 reveal-up hover:bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div>
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-transform group-hover:scale-110">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight text-slate-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-base font-medium leading-relaxed text-slate-500 line-clamp-2">
                                        {item.shortDescription}
                                    </p>
                                </div>
                                <div className="mt-10 flex items-center justify-between">
                                    <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        {item.metric}
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Summary Section */}
            <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-black text-white sm:text-4xl">Architecture first. Implementation always.</h2>
                    <p className="mt-8 text-xl font-medium text-slate-400 max-w-3xl mx-auto">
                        We don&apos;t just build features; we build governed AI programs that scale.
                    </p>
                </div>
            </section>
        </div>
    );
}

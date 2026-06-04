import { cookies } from "next/headers";
import PageHero from "@/components/PageHero";
import { RESOURCES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function ResourcesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero title={dict.nav.resources} subtitle="Strategy decks, governance manuals, and evaluation scorecards for leaders who need to deliver. No marketing fluff, just utility." />
            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {RESOURCES.map((resource, index) => (
                            <div key={resource.title} className="group card-dark rounded-2xl p-8 reveal-up flex flex-col" style={{ animationDelay: `${index * 80}ms` }}>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <resource.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{resource.title}</h3>
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-6 flex-grow">{resource.description}</p>
                                <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{resource.format}</span>
                                    <button className="text-sm font-semibold text-primary-light hover:text-white transition-colors">Download →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-padding bg-background relative overflow-hidden border-t border-white/[0.04] section-glow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Need custom training?</h2>
                    <p className="mt-6 text-lg font-medium text-zinc-400 max-w-2xl mx-auto">We deliver executive education and engineering workshops on-site or remotely, designed around your specific tech stack and roadmap.</p>
                    <div className="mt-10">
                        <button className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all">Inquire about Workshops</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

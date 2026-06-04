import { cookies } from "next/headers";
import PageHero from "@/components/PageHero";
import { PROCESS_STEPS } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function ProcessPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero title={dict.nav.howItWorks} subtitle="A disciplined delivery model that maps curiosity to high-impact production systems." />
            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.04] -translate-x-1/2 hidden lg:block" />
                        <div className="space-y-20">
                            {PROCESS_STEPS.map((step, index) => (
                                <div key={step.title} className={`relative flex flex-col gap-10 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} reveal-up`}>
                                    <div className="lg:w-1/2">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white text-xl font-bold mb-6">{step.step}</div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-base font-medium text-zinc-400 leading-relaxed">{step.description}</p>
                                    </div>
                                    <div className="lg:w-1/2 flex justify-center">
                                        <div className="aspect-video w-full rounded-2xl card-dark flex items-center justify-center p-10 text-center group">
                                            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-600 group-hover:text-primary-light transition-colors italic">Phase {step.step} Architectural Specification</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

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
            <PageHero
                title={dict.nav.howItWorks}
                subtitle="A disciplined delivery model that maps curiosity to high-impact production systems."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-100 -translate-x-1/2 hidden lg:block" />

                        <div className="space-y-24">
                            {PROCESS_STEPS.map((step, index) => (
                                <div key={step.title} className={`relative flex flex-col gap-12 lg:flex-row lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} reveal-up`}>
                                    <div className="lg:w-1/2">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white text-2xl font-black mb-8 lg:mx-0">
                                            {step.step}
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 mb-6">{step.title}</h3>
                                        <p className="text-lg font-medium text-slate-500 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className="lg:w-1/2 flex justify-center">
                                        <div className="aspect-video w-full rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-center p-12 text-center group">
                                            <span className="text-sm font-black uppercase tracking-widest text-slate-300 group-hover:text-primary transition-colors italic">Phase {step.step} Architectural Specification</span>
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

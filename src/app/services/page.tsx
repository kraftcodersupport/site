import { cookies } from "next/headers";
import PageHero from "@/components/PageHero";
import { SERVICES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function ServicesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.services}
                subtitle="End-to-end AI capabilities designed for organizations that need more than just a chatbot."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-2">
                        {SERVICES.map((service, index) => (
                            <div
                                key={service.title}
                                className="group relative flex flex-col items-start gap-8 rounded-[40px] bg-slate-50 p-10 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5 reveal-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-110">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                                    <p className="text-lg font-medium text-slate-500 leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                    <ul className="grid gap-4 sm:grid-cols-2">
                                        {service.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                                <div className="h-2 w-2 rounded-full bg-primary/40" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-black text-white sm:text-5xl leading-tight">
                                AI without <span className="text-primary italic">compromise.</span>
                            </h2>
                            <p className="mt-8 text-xl font-medium text-slate-400 leading-relaxed">
                                We believe the best AI systems are those that are invisible—working seamlessly in the background to augment human intelligence, not replace it.
                            </p>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 reveal-up" style={{ animationDelay: '200ms' }}>
                            {[
                                { label: "Engineering Lead", value: "Technical rigor at every step." },
                                { label: "Strategy Verified", value: "Aligned with board-level KPIs." },
                                { label: "Compliance Ready", value: "Secure-by-design architecture." },
                                { label: "Scale Native", value: "Built for global infrastructure." }
                            ].map((item) => (
                                <div key={item.label} className="p-6 rounded-3xl border border-white/5 bg-white/2">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">{item.label}</h3>
                                    <p className="text-sm font-bold text-white/80">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

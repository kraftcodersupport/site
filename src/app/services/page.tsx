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

            <section className="section-padding bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {SERVICES.map((service, index) => (
                            <div
                                key={service.title}
                                className="group card-dark relative flex flex-col items-start gap-6 rounded-2xl p-8 reveal-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/15 transition-transform group-hover:scale-110">
                                    <service.icon className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-base font-medium text-zinc-400 leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    <ul className="grid gap-3 sm:grid-cols-2">
                                        {service.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-center gap-2.5 text-sm font-medium text-zinc-500">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
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
            <section className="section-padding bg-background relative overflow-hidden border-t border-white/[0.04]">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold text-white sm:text-5xl leading-tight">
                                AI without <span className="text-primary-light italic">compromise.</span>
                            </h2>
                            <p className="mt-8 text-xl font-medium text-zinc-400 leading-relaxed">
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
                                <div key={item.label} className="card-dark p-5 rounded-2xl">
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-light mb-2">{item.label}</h3>
                                    <p className="text-sm font-medium text-zinc-400">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

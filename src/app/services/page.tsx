import PageHero from "@/components/PageHero";
import { SERVICES } from "@/lib/niches";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Delivery Architecture"
        title="Comprehensive AI engagement models"
        description="Our delivery stack is engineered to remove the gap between high-level strategy and production-grade engineering. We work as a tactical build partner or a long-term strategic anchor."
        primaryHref="/contact"
        primaryLabel="Request Engagement Model"
        secondaryHref="/solutions"
        secondaryLabel="Explore Technical Solutions"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, i) => (
              <article
                key={service.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white/5 bg-background p-10 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-white/5 text-accent mb-8 transition-transform group-hover:scale-110">
                    <service.icon className="h-8 w-8" />
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-white mb-6">
                    {service.title}
                  </h2>

                  <p className="text-base font-medium leading-relaxed text-muted-soft mb-8">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-10 pb-10 border-b border-white/5">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-4 shrink-0 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                          <Check className="h-3 w-3" />
                        </div>
                        <p className="text-sm font-bold text-white/80 leading-snug">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-soft group-hover:text-white transition-colors"
                  >
                    Discuss Scope <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Aesthetic Glow */}
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/5 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Banner */}
      <section className="relative py-24 bg-surface-strong/30 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 reveal-up">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Bridging the Gap from <span className="gradient-text">Concept to Capability</span>
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-muted-soft">
                Most consultancies stop at the slide deck. We stop when the system is integrated, monitored, and delivering its first batch of operational ROI. Our delivery methodology is designed for enterprises where failure is not a viable data point.
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
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-2">{item.label}</h3>
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

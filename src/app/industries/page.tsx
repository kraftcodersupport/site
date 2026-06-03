import PageHero from "@/components/PageHero";
import { INDUSTRIES } from "@/lib/niches";
import { ArrowRight, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function IndustriesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Sector Expertise"
        title="Adapting AI to the constraints of the market"
        description="Different sectors need different balances of speed, governance, privacy, and operational control. We shape the engineering engagement around those industry-specific realities."
        primaryHref="/contact"
        primaryLabel="Initiate Sector Research"
        secondaryHref="/solutions"
        secondaryLabel="Explore Technical Tracks"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {INDUSTRIES.map((industry, i) => (
              <article
                key={industry.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white/5 bg-background p-10 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-white/5 text-accent transition-transform group-hover:scale-110">
                      <industry.icon className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-white">
                      {industry.title}
                    </h2>
                  </div>

                  <p className="text-base font-medium leading-relaxed text-muted-soft mb-10">
                    {industry.description}
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 transition-colors group-hover:bg-white/10">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">
                        <Target className="h-3.5 w-3.5" />
                        Dominant Challenge
                      </div>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">
                        {industry.challenge}
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 transition-colors group-hover:bg-white/10">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-success mb-3">
                        <Zap className="h-3.5 w-3.5" />
                        Target Outcome
                      </div>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">
                        {industry.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/5">
                  <Link
                    href={`/solutions?industry=${industry.title.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-soft group-hover:text-white transition-colors"
                  >
                    View Relevant Patterns <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary/5 blur-[60px] transition-all group-hover:bg-primary/10" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Callout */}
      <section className="relative py-24 bg-surface-strong/30 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Don&apos;t see your sector?
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-muted-soft">
            Our delivery methodology is sector-agnostic at its core, but compliance-aware in its implementation. We can design a custom roadmap for any enterprise operating in high-stakes environments.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-black text-white hover:bg-white/10 transition-all"
            >
              Request Sector Capability Brief <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

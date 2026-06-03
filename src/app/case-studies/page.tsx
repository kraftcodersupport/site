import PageHero from "@/components/PageHero";
import { CASE_STUDIES } from "@/lib/niches";
import { ArrowRight, BarChart3, Target, Shield } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Impact Inventory"
        title="Verified outcomes for the global enterprise"
        description="The records below represent the technical and operational benchmarks cleared across our recent multi-phase engagements. From autonomous logistics to governance-first knowledge systems."
        primaryHref="/contact"
        primaryLabel="Request Detailed Dossier"
        secondaryHref="/services"
        secondaryLabel="Review Methodology"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {CASE_STUDIES.map((study, i) => (
              <article
                key={study.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white/5 bg-background p-10 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6 mb-12">
                    <div className="flex gap-6 items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-white/5 text-accent group-hover:scale-110 transition-transform">
                        <study.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-2">
                          {study.client}
                        </p>
                        <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                          {study.title}
                        </h2>
                      </div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-success shadow-[0_0_15px_rgba(34,197,94,0.1)] shrink-0">
                      {study.metric}
                    </div>
                  </div>

                  <p className="text-lg font-medium leading-relaxed text-muted-soft mb-12">
                    {study.summary}
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 mb-12">
                    <div className="rounded-3xl border border-white/5 bg-white/2 p-8 transition-colors group-hover:bg-white/5">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4">
                        <Target className="h-3.5 w-3.5" />
                        Strategic Friction
                      </div>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/5 bg-white/2 p-8 transition-colors group-hover:bg-white/5">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">
                        <Shield className="h-3.5 w-3.5" />
                        Applied Architecture
                      </div>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">
                        {study.approach}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] border border-white/5 bg-surface-strong/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-success mb-4">
                      <BarChart3 className="h-4 w-4" />
                      Final Performance Audit
                    </div>
                    <p className="text-base font-bold text-white leading-relaxed">
                      <span className="text-success">{study.result}.</span> {study.impact}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-10 mt-10 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-soft group-hover:text-white transition-colors"
                  >
                    Request Technical Tear-down <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Decorative mask */}
                <div className="absolute top-0 right-0 h-96 w-96 bg-primary/2 blur-[100px] pointer-events-none" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Summary */}
      <section className="relative py-24 bg-surface-strong/30 border-y border-white/5 overflow-hidden">
        <div className="hero-noise opacity-20" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-black tracking-tight text-white mb-8">
            Measured across <span className="gradient-text">every dimension</span>.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Efficiency Gain", value: "40%+" },
              { label: "Cost Reduction", value: "25%+" },
              { label: "Audit Success", value: "100%" },
              { label: "Scale Velocity", value: "10x" }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-soft">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

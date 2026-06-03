import { Award, Compass, ShieldCheck, Users, Target, Rocket, Workflow, Zap, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { HERO_STATS, PROCESS_STEPS, brand } from "@/lib/niches";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";

const values = [
  {
    icon: Compass,
    title: "Strategic Priority",
    description:
      "We resist technology-first impulses. Every engagement begins with a deep analysis of business outcomes and friction points.",
  },
  {
    icon: ShieldCheck,
    title: "Governance-First",
    description:
      "Controls, auditability, and fallback paths are operational requirements, not post-launch additions. We build for long-term safety.",
  },
  {
    icon: Users,
    title: "Operational Synergy",
    description:
      "We work inside your culture, alongside your operators. Adoption isn't a training session; it's a co-design process.",
  },
  {
    icon: Award,
    title: "Performance Integrity",
    description:
      "We commit to concrete operational benchmarks. If we can't measure the uplift, we don't consider the delivery complete.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Mission Architecture"
        title={`Forging the link between AI and Enterprise ROI`}
        description="Most AI programs stall due to tactical fragmentation or strategic vagueness. We provide the delivery discipline needed to move from experimentation to global scale."
        primaryHref="/contact"
        primaryLabel="Discuss Strategic Alignment"
        secondaryHref="/services"
        secondaryLabel="Review Delivery Model"
      />

      {/* Stats Grid */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="group reveal-up pl-8 border-l border-white/5 hover:border-primary/50 transition-all"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl font-black text-white mb-2">
                  <AnimatedNumber value={parseInt(stat.value)} suffix={stat.value.includes('%') ? '%' : '+'} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy/Values */}
      <section className="relative py-24 sm:py-32 bg-surface-strong/30 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                <Target className="h-3.5 w-3.5" />
                The Protocol
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                A delivery methodology built for <span className="gradient-text">high-stakes environments</span>.
              </h2>
            </div>
            <div className="pb-2 text-sm font-medium text-muted-soft lg:max-w-xs">
              We eliminate the ambiguity of AI adoption by enforcing a rigorous sequence of research, engineering, and rollout.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, i) => (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-[40px] border border-white/5 bg-background p-10 hover:border-primary/20 transition-all reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 flex flex-col sm:flex-row gap-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-accent border border-white/10 transition-transform group-hover:scale-110">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-muted-soft">
                      {value.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Model / Process */}
      <section className="relative py-24 sm:py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-20 lg:grid-cols-[1fr_0.4fr]">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                <Workflow className="h-3.5 w-3.5" />
                Sequential Logic
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-10">
                The Path to Operational Scale
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {PROCESS_STEPS.map((step, i) => (
                  <div
                    key={step.step}
                    className="relative rounded-3xl border border-white/5 bg-white/2 p-8 transition-all hover:bg-white/4 reveal-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">0{step.step}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Phase {step.step}</div>
                    <h3 className="text-xl font-black text-white mb-4">{step.title}</h3>
                    <p className="text-sm font-medium leading-relaxed text-muted-soft">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative flex flex-col justify-center reveal-up" style={{ animationDelay: '300ms' }}>
              <div className="glass-strong rounded-[40px] border border-white/10 p-10 bg-linear-to-br from-primary/10 to-accent/10">
                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-black mb-8 shadow-2xl">
                  <Rocket className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">Built for Momentum</h3>
                <p className="text-sm font-bold text-white/80 leading-relaxed mb-10">
                  We don&apos;t just deliver documents. We deliver production systems that sit inside your existing tech ecosystem and generate ROI from week 01.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 rounded-full bg-white py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-accent hover:text-white"
                >
                  Initiate Roadmap <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

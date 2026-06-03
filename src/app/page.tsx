import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CircleDot,
  Layers3,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe,
  BarChart3,
  Search,
  Lock,
  Workflow
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  CASE_STUDIES,
  HERO_STATS,
  INDUSTRIES,
  NICHES,
  PROCESS_STEPS,
  SERVICES,
  TRUST_TOKENS,
  brand,
} from "@/lib/niches";

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-4xl ${centered ? "mx-auto text-center" : ""}`}>
      <div className={`inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent ${centered ? "justify-center" : ""}`}>
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </div>
      <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-muted-soft lg:text-xl capitalize">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-background pt-32 pb-40 lg:pt-48 lg:pb-64">
        {/* Immersive Background Art */}
        <div className="absolute inset-0 surface-grid opacity-30" />
        <div className="hero-noise" />
        <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute top-1/4 -right-48 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center reveal-up">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-soft">
                <Zap className="h-3 w-3 text-accent" />
                Strategic AI Delivery for Global Enterprises
              </div>

              <h1 className="mt-10 font-display text-6xl font-black leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Turning broad curiosity into <span className="gradient-text">Disciplined AI Portfolios</span>.
              </h1>

              <p className="mt-10 max-w-2xl text-xl font-medium leading-relaxed text-muted-soft lg:text-2xl">
                We empower leadership teams to design, build, and scale AI programs that create measurable business outcomes, not just experimentation theater.
              </p>

              <div className="mt-12 flex flex-col gap-5 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-sm font-black text-black transition-all hover:pr-12 hover:text-white active:scale-95 shadow-2xl shadow-white/5"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative z-10">Launch Engagement</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/case-studies"
                  className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black text-white transition-all hover:bg-white/10"
                >
                  View Impact Records
                  <Globe className="h-5 w-5 text-muted-soft" />
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="group border-l border-white/5 pl-6 transition-all hover:border-primary/50">
                    <div className="text-3xl font-black text-white">
                      <AnimatedNumber value={parseInt(stat.value)} suffix={stat.value.includes('%') ? '%' : '+'} />
                    </div>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-soft">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block reveal-up" style={{ animationDelay: '200ms' }}>
              <div className="glass-strong relative h-[600px] w-full rounded-[40px] border border-white/10 p-2 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-50" />
                <div className="relative h-full w-full rounded-[35px] border border-white/5 bg-background/50 p-8 overflow-hidden">
                  {/* Dashboard Mockup - Enterprise style */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary to-accent p-2.5">
                        <BarChart3 className="h-full w-full text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Ops Intelligence</h3>
                        <p className="text-[10px] text-muted-soft">Real-time signal analysis active</p>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-surface-strong" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6">
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest leading-none">System Load</span>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                          <span className="text-[10px] text-success font-bold uppercase leading-none">Optimal</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1 h-24">
                        {[40, 20, 60, 80, 30, 50, 90, 40, 70, 50, 30, 60].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-sm bg-linear-to-t from-primary/20 to-primary/80 transition-all duration-500 hover:to-accent"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 mb-4 text-accent">
                          <Search className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-bold text-muted-soft uppercase tracking-widest mb-1">RAG Precision</p>
                        <p className="text-2xl font-black text-white">99.2%</p>
                      </div>
                      <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 mb-4 text-primary">
                          <Lock className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-bold text-muted-soft uppercase tracking-widest mb-1">Risk Buffer</p>
                        <p className="text-2xl font-black text-white">0.02%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -bottom-10 -left-10 glass rounded-3xl p-6 border border-white/10 shadow-2xl animate-float-soft">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <Workflow className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft">Workflow ROI</p>
                    <p className="text-xl font-black text-white">+$2.4M/yr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12 whitespace-nowrap opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-muted-soft hidden sm:block">Trusted Tech Ecosystem</span>
            <div className="flex min-w-full items-center gap-16 marquee-track">
              {TRUST_TOKENS.concat(TRUST_TOKENS).map((token, index) => (
                <span
                  key={`${token}-${index}`}
                  className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.15em] text-white"
                >
                  <CircleDot className="h-4 w-4 text-accent" />
                  {token}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Arsenal / Services */}
      <section className="relative py-24 sm:py-32 lg:py-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Our Arsenal"
            title="A full delivery stack for the AI-First enterprise"
            description="We eliminate 'vendor fragmentation' by providing a unified engineering and strategy layer across the entire transformation lifecycle."
          />

          <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <article
                key={service.title}
                className="group relative rounded-[40px] border border-white/5 bg-white/2 p-10 transition-all duration-500 hover:border-primary/30 hover:bg-white/4 reveal-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-white/5 text-accent transition-transform group-hover:scale-110">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-8 text-2xl font-black tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-muted-soft">
                    {service.description}
                  </p>
                  <ul className="mt-8 space-y-4 grow">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 pt-8 border-t border-white/5">
                    <Link href="/services" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent hover:text-white transition-colors">
                      Deep Dive <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 360° Value / Case Studies */}
      <section className="relative py-24 sm:py-32 lg:py-48 bg-surface-strong/30">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-background to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="360° Impact"
            title="Records of measurable progress across sectors"
            description="Our work reads like business growth, not technology experiments. We focus on KPIs that internal leadership teams can defend in the boardroom."
          />

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {CASE_STUDIES.map((study, index) => (
              <article
                key={study.title}
                className="group relative overflow-hidden rounded-[48px] border border-white/10 bg-background p-10 hover:border-primary/20 transition-all reveal-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-10">
                  <div className="rounded-full border border-white/5 bg-white/5 px-5 py-2 text-xs font-black text-accent uppercase tracking-widest">
                    {study.metric}
                  </div>
                </div>

                <div className="max-w-xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 border border-white/5">
                    <study.icon className="h-8 w-8" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-soft mb-3">
                    {study.client}
                  </p>
                  <h3 className="text-3xl font-black tracking-tight text-white mb-6">
                    {study.title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-muted-soft mb-10">
                    {study.summary}
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 border-t border-white/5 pt-10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft mb-3">The Challenge</p>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft mb-3">The Engineering</p>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">{study.approach}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / The Grid */}
      <section className="py-24 sm:py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Solution Tracks"
            title="Outcome-driven architectural patterns"
            description="We've developed battle-tested playbooks for the most critical AI use-cases facing enterprise leadership today."
          />

          <div className="mt-24 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {NICHES.map((solution, index) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group relative flex flex-col justify-between rounded-[40px] border border-white/5 bg-white/2 p-8 transition-all hover:bg-white/4 reveal-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent mb-8 border border-white/5 transition-transform group-hover:scale-110">
                    <solution.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-muted-soft">
                    {solution.shortDescription}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <div className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold text-muted-soft uppercase tracking-widest">
                    {solution.metric}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-soft transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-white/5 bg-background py-32 lg:py-48">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-10">
            Commit to Excellence
          </div>
          <h2 className="font-display text-5xl font-black leading-[1.1] tracking-tight text-white lg:text-7xl">
            Build an AI program that <span className="font-editorial italic font-normal text-white/90">leadership can defend</span>.
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-xl font-medium leading-relaxed text-muted-soft">
            From ROI discovery to global scale engineering, choose the delivery model that matches your current readiness.
          </p>
          <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/contact"
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-12 py-5 text-sm font-black text-black transition-all hover:pr-14 hover:text-white active:scale-95 shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10">Start Roadmap Mapping</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-12 py-5 text-sm font-black text-white transition-all hover:bg-white/10"
            >
              Explore Services
              <ChevronRight className="h-5 w-5 text-muted-soft" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

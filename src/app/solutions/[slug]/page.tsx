import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers
} from "lucide-react";
import { NICHES, getNicheBySlug, brand } from "@/lib/niches";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NICHES.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getNicheBySlug(slug);

  if (!solution) {
    return {
      title: "Solution not found",
    };
  }

  return {
    title: solution.title,
    description: solution.shortDescription,
    openGraph: {
      title: solution.title,
      description: solution.shortDescription,
      images: [`/api/og?slug=${slug}`],
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getNicheBySlug(slug);

  if (!solution) {
    notFound();
  }

  const related = NICHES.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className="relative">
      {/* Immersive Header */}
      <section className="relative overflow-hidden border-b border-white/5 bg-background pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 surface-grid opacity-20" />
        <div className="hero-noise" />
        <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-soft transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Infrastructure Portfolio
          </Link>

          <div className="mt-12 max-w-4xl reveal-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
              <Sparkles className="h-3 w-3" />
              Strategic Solution Track
            </div>

            <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {solution.title}
            </h1>

            <p className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-muted-soft lg:text-2xl">
              {solution.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Content */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Main Content */}
            <div className="space-y-16">
              <article className="reveal-up">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                  <Zap className="h-3.5 w-3.5" />
                  Technical Thesis
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-8">
                  Operational Context & Approach
                </h2>
                <p className="text-lg font-medium leading-relaxed text-muted-soft">
                  {solution.overview}
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  {solution.outcomes.map((outcome, i) => (
                    <div
                      key={outcome}
                      className="group rounded-3xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/4 reveal-up"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 transition-transform group-hover:scale-110">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-bold text-white/90 leading-relaxed">{outcome}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="reveal-up pt-16 border-t border-white/5">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                  <Layers className="h-3.5 w-3.5" />
                  Commitment Model
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-8">
                  Included Deliverables
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {solution.deliverables.map((deliverable) => (
                    <div
                      key={deliverable}
                      className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/1 p-5"
                    >
                      <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                      <p className="text-sm font-bold text-white/80">{deliverable}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Sidebar / Sidebar Cards */}
            <aside className="space-y-8 reveal-up" style={{ animationDelay: '200ms' }}>
              <div className="glass-strong rounded-[40px] border border-white/10 p-10">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                  <ShieldCheck className="h-4 w-4" />
                  Engagement Fit
                </div>
                <h3 className="text-xl font-black text-white mb-4">Strategic Compatibility</h3>
                <p className="text-sm font-medium leading-relaxed text-muted-soft">{solution.bestFor}</p>
              </div>

              <div className="relative overflow-hidden rounded-[40px] border border-primary/20 bg-linear-to-br from-primary/10 to-accent/10 p-10">
                <div className="absolute inset-0 hero-sweep opacity-30" />
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">
                    Performance Benchmark
                  </p>
                  <p className="text-5xl font-black text-white mb-4">{solution.metric}</p>
                  <p className="text-sm font-bold text-white/80 leading-relaxed">
                    Targeted operational improvement scoped for this delivery track.
                  </p>
                </div>
              </div>

              <div className="rounded-[40px] border border-white/5 bg-white/5 p-10">
                <h3 className="text-lg font-black text-white mb-6">Ready to initiate?</h3>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-3 rounded-full bg-white py-4 text-sm font-black text-black transition-all hover:bg-accent hover:text-white"
                >
                  Schedule Scoping Session
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related / Portfolio Navigation */}
      <section className="relative py-24 bg-surface-strong/30 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
            <div className="max-w-2xl">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-4">Adjacent Tracks</div>
              <h2 className="text-4xl font-black tracking-tight text-white">
                Expanding the <span className="gradient-text">Architectural Range</span>
              </h2>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted-soft hover:text-white transition-colors"
            >
              Explore Full Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item, i) => (
              <Link
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className="group relative flex flex-col justify-between rounded-[40px] border border-white/5 bg-background p-8 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent mb-8 border border-white/5 transition-transform group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-muted-soft line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <div className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold text-muted-soft uppercase tracking-widest">
                    {item.metric}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-soft transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

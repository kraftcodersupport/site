import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.04] bg-background py-24 lg:py-32 section-glow">
      {/* Background Art */}
      <div className="absolute inset-0 surface-grid opacity-15" />
      <div className="hero-noise" />
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute top-1/2 -right-24 h-56 w-56 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
            <Sparkles className="h-3 w-3" />
            {eyebrow}
          </div>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-400 lg:text-xl">
            {subtitle}
          </p>

          {(primaryHref || secondaryHref) && (
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              {primaryHref && primaryLabel && (
                <Link
                  href={primaryHref}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] active:scale-95"
                >
                  <span className="relative z-10">{primaryLabel}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white"
                >
                  {secondaryLabel}
                  <ChevronRight className="h-4 w-4 text-zinc-500" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

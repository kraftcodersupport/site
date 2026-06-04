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
    <section className="relative overflow-hidden border-b border-white/5 bg-background py-24 lg:py-32">
      {/* Background Art */}
      <div className="absolute inset-0 surface-grid opacity-20" />
      <div className="hero-noise" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-1/2 -right-24 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
            <Sparkles className="h-3 w-3" />
            {eyebrow}
          </div>

          <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-muted-soft lg:text-xl">
            {subtitle}
          </p>

          {(primaryHref || secondaryHref) && (
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              {primaryHref && primaryLabel && (
                <Link
                  href={primaryHref}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-black text-black transition-all hover:pr-10 hover:text-white active:scale-95"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative z-10">{primaryLabel}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-black text-white transition-all hover:bg-white/10"
                >
                  {secondaryLabel}
                  <ChevronRight className="h-4 w-4 text-muted-soft" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

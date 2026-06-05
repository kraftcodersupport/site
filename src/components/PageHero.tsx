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
    <section className="relative overflow-hidden border-b border-zinc-900 bg-background py-28 lg:py-36">
      {/* Background Decor */}
      <div className="absolute inset-0 surface-grid opacity-15" />
      <div className="hero-noise" />
      
      {/* Decorative Orbs */}
      <div className="absolute -top-32 left-1/4 h-[350px] w-[350px] rounded-full bg-primary/10 blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/2 -right-32 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px] animate-pulse" style={{ animationDuration: "12s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-in">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
              <Sparkles className="h-3 w-3 text-primary animate-sparkle" />
              {eyebrow}
            </div>
          )}

          <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.25em] last:mr-0">
                {i === title.split(" ").length - 1 ? (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400">
                    {word}
                  </span>
                ) : (
                  word
                )}
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
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/95 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] active:scale-95"
                >
                  <span className="relative z-10">{primaryLabel}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/4 px-8 py-4 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/8 hover:text-white"
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
export const dynamic = "force-dynamic";

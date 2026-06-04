"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Send,
  AtSign,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import type { HeroStat } from "@/lib/niches";

type HomeHeroProps = {
  brandName: string;
  email: string;
  tagline: string;
  ctaLabel: string;
  contactLabel: string;
  stats: HeroStat[];
};

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="relative z-10 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-8xl mt-8 sm:mt-12">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="hero-title-word inline-block"
          style={{ animationDelay: `${120 + i * 90}ms` }}
        >
          <span
            className={
              i === words.length - 1
                ? "text-primary-light"
                : "text-white"
            }
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function HomeHero({
  brandName,
  email,
  tagline,
  ctaLabel,
  contactLabel,
  stats,
}: HomeHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pt-6 sm:pt-10">
      <div className="absolute inset-0 surface-grid opacity-15" />
      <div className="hero-noise" />
      <div className="hero-bottom-glow" />
      <div className="hero-mesh" aria-hidden />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-primary/8 blur-[120px] hero-glow-pulse" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center min-h-[88vh]">
        <div
          className={`relative flex flex-col items-center text-center pb-12 pt-6 sm:pt-10 ${mounted ? "hero-mounted" : ""}`}
        >
          {/* Badge */}
          <div
            className="hero-fade-item relative z-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-light backdrop-blur-md"
            style={{ animationDelay: "80ms" }}
          >
            <Sparkles className="h-3.5 w-3.5 animate-sparkle" />
            <span>Executive AI Consultancy</span>
            <span className="hero-badge-dot" />
          </div>

          {/* Title */}
          <AnimatedTitle text={brandName} />

          {/* Tagline */}
          <p
            className="hero-fade-item relative z-10 mt-6 max-w-2xl text-base font-medium leading-relaxed text-zinc-400 sm:text-lg lg:text-xl"
            style={{ animationDelay: "420ms" }}
          >
            {tagline}
          </p>

          {/* CTAs */}
          <div
            className="hero-fade-item relative z-10 mt-10 flex flex-col sm:flex-row items-center gap-4"
            style={{ animationDelay: "520ms" }}
          >
            <Link
              href="/services"
              className="group hero-cta-primary inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {ctaLabel}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-1 group-hover:bg-white group-hover:text-primary">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-zinc-300 transition-all hover:border-primary/30 hover:bg-white/[0.08] hover:text-white backdrop-blur-md"
            >
              Book a strategy call
            </Link>
          </div>

          {/* Stats Row (inline) */}
          <div
            className="hero-fade-item relative z-10 mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            style={{ animationDelay: "650ms" }}
          >
            {stats.slice(0, 3).map((stat, index) => (
              <div
                key={stat.label}
                className="text-center hero-stat-row"
                style={{ animationDelay: `${700 + index * 80}ms` }}
              >
                <div className="text-2xl font-bold text-white lg:text-3xl">
                  <AnimatedNumber
                    value={parseInt(stat.value) || 0}
                    suffix={stat.value.includes("%") ? "%" : "+"}
                  />
                </div>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 max-w-[100px] leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll Hint */}
          <a
            href="#partner-strip"
            className="hero-fade-item mt-14 flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
            style={{ animationDelay: "800ms" }}
            aria-label="Scroll to explore"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest">
              Explore
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce-soft" />
          </a>
        </div>

        {/* Bottom Contact Card */}
        <div
          className="hero-fade-item mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:left-8 z-20 hero-card-hover"
          style={{ animationDelay: "600ms" }}
        >
          <div className="glass rounded-2xl p-6 sm:p-8 min-w-[260px] sm:min-w-[320px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2">
              {contactLabel}
            </p>
            <p className="text-sm font-bold text-white mb-5 break-all sm:break-normal">
              {email}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="hero-social-btn flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="hero-social-btn flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="hero-social-btn flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400"
              >
                <AtSign className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

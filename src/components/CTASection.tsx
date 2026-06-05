import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  eyebrow?: string;
}

export default function CTASection({
  title = "Ready to deliver results?",
  subtitle = "Our delivery methodology is designed for speed, technical rigor, and zero governance compromise.",
  buttonText = "Start Your Pilot",
  buttonLink = "/contact",
  eyebrow = "Next Steps",
}: CTASectionProps) {
  return (
    <section className="section-padding bg-zinc-50 relative overflow-hidden ">
      <div className="absolute inset-0 surface-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-strong rounded-[2.5rem] p-10 sm:p-20 text-center relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light mb-6 relative z-10">
            <Sparkles className="h-3 w-3 text-primary animate-sparkle" />
            {eyebrow}
          </div>

          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight mb-6 relative z-10">
            {title.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">
              {title.split(' ').slice(-1)}
            </span>
          </h2>

          <p className="mt-6 text-base font-semibold text-zinc-400 max-w-2xl mx-auto leading-relaxed relative z-10">
            {subtitle}
          </p>

          <div className="mt-10 relative z-10">
            <Link
              href={buttonLink}
              className="inline-flex items-center gap-3 rounded-full hero-cta-primary px-8 py-4 text-sm font-bold text-white transition-all active:scale-95 shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              {buttonText} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

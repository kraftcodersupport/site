import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, ShieldCheck, Sparkles, Rocket, Compass, Settings } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";
import CTASection from "@/components/CTASection";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="relative">
      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero
        title={dict.nav.about}
        subtitle="A high-performance consultancy moving at the intersection of executive strategy and technical execution."
        eyebrow="Our Agency"
      />

      {/* ── Core Story & Sidebar (Light Background - Mix Mode) ── */}
      <section className="relative section-padding bg-white border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">

            {/* Core Story */}
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Narrative
              </span>
              <h2 className="mt-4 text-3xl font-black text-zinc-900 sm:text-4xl leading-tight">
                Turning broad curiosity into <span className="text-primary italic">prioritized roadmaps.</span>
              </h2>
              <p className="mt-6 text-base font-semibold leading-relaxed text-zinc-500">
                Most organizations are curious about AI, but few have a disciplined execution model. At KraftCoder, we bridge that gap. We help leadership teams move beyond the hype and focus on the 2-3 use cases that will actually move the needle in their P&L.
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <div className="card-light rounded-3xl p-8 border border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-primary/30 transition-all">
                  <div className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary flex mb-6 shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 mb-3">Governed Delivery</h3>
                  <p className="text-sm font-semibold text-zinc-600 leading-relaxed">
                    We prioritize security, privacy, and compliance from day one, ensuring AI systems fit within existing enterprise controls.
                  </p>
                </div>

                <div className="card-light rounded-3xl p-8 border border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-primary/30 transition-all">
                  <div className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary flex mb-6 shadow-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 mb-3">Outcome Oriented</h3>
                  <p className="text-sm font-semibold text-zinc-600 leading-relaxed">
                    We focus on ROI, throughput, and efficiency metrics, not just model benchmarks. We ship systems that solve real business problems.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar (High-Contrast Dark Glass Card) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 rounded-3xl p-8 overflow-hidden bg-zinc-950 border border-zinc-850 shadow-xl">
                <div className="absolute inset-0 surface-grid opacity-15" />
                <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative z-10 h-12 w-12 items-center justify-center rounded-xl bg-primary text-white flex mb-6 shadow-md shadow-primary/20">
                  <Rocket className="h-6 w-6 animate-pulse" />
                </div>
                <h3 className="relative z-10 text-xl font-bold text-white mb-4">Built for Momentum</h3>
                <p className="relative z-10 text-sm font-semibold text-zinc-400 leading-relaxed mb-8">
                  We don't just deliver slide decks. We deliver production systems that sit inside your existing tech ecosystem and generate ROI from week 01.
                </p>
                <Link
                  href="/contact"
                  className="relative z-10 flex items-center justify-center gap-3 rounded-full bg-primary py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/95 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] active:scale-95"
                >
                  Initiate Roadmap <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Core Principles Grid (Dark Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="absolute bottom-0 right-1/4 h-64 w-[400px] rounded-full bg-primary/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Our Foundations
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Strategic Pillars of <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">KraftCoder</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Security & Sovereignty First",
                desc: "We ensure all data pipelines, prompts, and training scopes are protected within private security boundaries."
              },
              {
                icon: Compass,
                title: "KPI-Led Development",
                desc: "We don't optimize model accuracy in isolation; we optimize system performance to directly hit board-level business metrics."
              },
              {
                icon: Settings,
                title: "Engineering Excellence",
                desc: "We build using robust, composable software structures with strict monitoring, structured fallback switches, and scalable architectures."
              }
            ].map((principle, idx) => (
              <div
                key={principle.title}
                className="card-dark p-8 rounded-3xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 transition-all hover:border-zinc-800"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6">
                  <principle.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{principle.title}</h3>
                <p className="text-sm font-semibold text-zinc-400 leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ready to Deliver CTA (Dark Background - Mix Mode) ── */}
      <CTASection />
    </div>
  );
}
export const dynamic = "force-dynamic";

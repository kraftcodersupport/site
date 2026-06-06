import { cookies } from "next/headers";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { PROCESS_STEPS } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import { ShieldAlert, Compass, Settings } from "lucide-react";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import { getHowToSchema, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "How It Works — Our 4-Phase AI Delivery Process",
  description:
    "Discover KraftCoder's disciplined 4-phase delivery model: Discover, Design, Build, Scale. From AI curiosity to production systems in 8-12 weeks.",
  keywords: ["AI delivery process", "AI implementation methodology", "AI project phases", "AI pilot to production"],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works — KraftCoder's 4-Phase AI Delivery Process",
    description: "A disciplined delivery model that maps curiosity to high-impact production systems.",
    url: "/how-it-works",
    type: "website",
  },
};
export default async function ProcessPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="relative">
      {/* ── SEO: Structured Data ── */}
      <JsonLd data={getHowToSchema(PROCESS_STEPS)} />

      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero 
        title={dict.nav.howItWorks} 
        subtitle="A disciplined delivery model that maps curiosity to high-impact production systems." 
        eyebrow="Our Process"
      />

      {/* ── Timeline Section (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-white border-t border-zinc-200 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Step-by-step
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
              From Strategy to Production
            </h2>
          </div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-zinc-200 -translate-x-1/2 hidden lg:block" />

            <div className="space-y-24 relative">
              {PROCESS_STEPS.map((step, index) => (
                <div 
                  key={step.title} 
                  className={`relative flex flex-col gap-10 lg:flex-row lg:items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text card */}
                  <div className="lg:w-1/2 w-full">
                    <div className="card-light rounded-3xl p-8 border border-zinc-200/85 bg-zinc-50/50 hover:bg-white hover:border-primary/30 transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white text-xl font-black mb-6 shadow-md shadow-primary/20">
                        {step.step}
                      </div>
                      <h3 className="text-2xl font-black text-zinc-900 mb-4">{step.title}</h3>
                      <p className="text-base font-semibold text-zinc-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for center dot on large viewports */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white border-4 border-primary shadow-sm z-10" />

                  {/* Architectural spec placeholder card */}
                  <div className="lg:w-1/2 w-full flex justify-center">
                    <div className="aspect-video w-full rounded-3xl border border-zinc-200 bg-zinc-50 overflow-hidden relative group shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all">
                      <Image 
                        src={`/images/phase${step.step}.jpg`} 
                        alt={`Phase ${step.step} - ${step.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                         <span className="text-white font-bold tracking-wider text-lg">Phase {step.step} Visualization</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Execution Standards (Dark Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="absolute bottom-0 right-1/4 h-72 w-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Quality Assurance
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Our Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">Validation Standards</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Latency & Throughput Loops",
                desc: "Every system undergoes load validation simulating high concurrency. We verify streaming chunks are processed below Vercel/worker timeouts."
              },
              {
                icon: ShieldAlert,
                title: "Governance & PII Guardrails",
                desc: "Integrated filters scrub output chunks for sensitive data leakage, prompt injections, and hallucinations before displaying to clients."
              },
              {
                icon: Settings,
                title: "Autonomous Recovery Switches",
                desc: "Automatic failovers redirect traffic seamlessly to secondary endpoints if the primary model throws a server error or undergoes outages."
              }
            ].map((item, idx) => (
              <div 
                key={item.title} 
                className="card-dark p-8 rounded-3xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 transition-all hover:border-zinc-800"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm font-semibold text-zinc-400 leading-relaxed">{item.desc}</p>
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

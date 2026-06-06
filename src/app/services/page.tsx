import { cookies } from "next/headers";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SERVICES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";
import CTASection from "@/components/CTASection";
import { getServiceListSchema, JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI Consulting Services — Strategy, Agents, Automation & RAG",
  description:
    "End-to-end AI capabilities: consulting, strategy, agent development, automation, RAG systems, chatbots, SaaS development, and cloud infrastructure.",
  keywords: [
    "AI consulting services",
    "AI strategy services",
    "AI agent development",
    "AI automation services",
    "RAG systems",
    "chatbot development services",
    "enterprise AI services",
    "SaaS development",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Consulting Services — Strategy, Agents, Automation & RAG",
    description: "End-to-end AI capabilities designed for organizations that need more than just a chatbot.",
    url: "/services",
    type: "website",
  },
};
export default async function ServicesPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="relative">
      {/* ── SEO: Structured Data ── */}
      <JsonLd data={getServiceListSchema(SERVICES)} />

      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero
        title={dict.nav.services}
        subtitle="End-to-end AI capabilities designed for organizations that need more than just a chatbot."
        eyebrow="Solutions & Capabilities"
      />

      {/* ── Services Grid (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-white relative border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
              Professional Grade AI Strategy & Execution
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="group card-light relative flex flex-col items-start gap-6 rounded-3xl p-8 border border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-primary/30 transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110 shadow-sm">
                  <service.icon className="h-7 w-7" />
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{service.title}</h3>
                  <p className="text-sm font-semibold text-zinc-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Section (Dark Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-[500px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                Our Philosophy
              </span>
              <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl leading-tight">
                AI without <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">compromise.</span>
              </h2>
              <p className="mt-6 text-base font-semibold text-zinc-450 leading-relaxed">
                We believe the best AI systems are those that are invisible—working seamlessly in the background to augment human intelligence, not replace it.
              </p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { label: "Engineering Lead", value: "Technical rigor at every step." },
                { label: "Strategy Verified", value: "Aligned with board-level KPIs." },
                { label: "Compliance Ready", value: "Secure-by-design architecture." },
                { label: "Scale Native", value: "Built for global infrastructure." }
              ].map((item, idx) => (
                <div
                  key={item.label}
                  className="card-dark p-6 rounded-2xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 transition-all hover:border-zinc-800"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary-light mb-2">{item.label}</h3>
                  <p className="text-sm font-semibold text-zinc-400 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ready to Deliver CTA (Dark Background - Mix Mode) ── */}
      <CTASection />
    </div>
  );
}
export const dynamic = "force-dynamic";

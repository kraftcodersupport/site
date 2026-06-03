import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MessageSquareText, FileText, Globe, Zap } from "lucide-react";
import PageHero from "@/components/PageHero";
import { brand } from "@/lib/niches";

const contactCards = [
  {
    icon: Mail,
    title: "Strategic Inquiry",
    detail: brand.email,
    note: "Executive-level project briefings and strategy session scheduling.",
  },
  {
    icon: CalendarDays,
    title: "Response Protocol",
    detail: "Next Business Day",
    note: "All strategic inquiries are triaged within 24 hours.",
  },
  {
    icon: MessageSquareText,
    title: "Engagement Fit",
    detail: "Architecture to Delivery",
    note: "We handle the entire stack, from roadmap to shipping code.",
  },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Initiate Engagement"
        title="Transforming the conversation around AI excellence"
        description="Every high-impact engagement begins with a clear business problem. Tell us what you're trying to improve, what's getting in the way, and what kind of outcome would make the work a win."
        primaryHref={`mailto:${brand.email}?subject=Executive%20AI%20Strategy%20Session`}
        primaryLabel="Email Technical Brief"
        secondaryHref="/case-studies"
        secondaryLabel="Review Global Impact Records"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 mb-20">
            {contactCards.map((card, i) => (
              <article
                key={card.title}
                className="group relative rounded-[40px] border border-white/5 bg-background p-10 hover:border-primary/20 transition-all reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-accent border border-white/10 mb-8 transition-transform group-hover:scale-110">
                  <card.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white mb-4">{card.title}</h2>
                <p className="text-sm font-bold text-white/90 mb-3">{card.detail}</p>
                <p className="text-sm font-medium leading-relaxed text-muted-soft">{card.note}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
            <div className="reveal-up p-10 rounded-[48px] border border-white/5 bg-white/2">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-8">
                <FileText className="h-3.5 w-3.5" />
                Submission Framework
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-8">
                The AI Strategy Briefing
              </h2>
              <p className="text-base font-medium text-muted-soft mb-10">
                A short, precise brief is enough to begin our triage process. Focus on these four architectural points:
              </p>
              <ul className="space-y-6">
                {[
                  "Definition of the core business process requiring optimization",
                  "Summary of existing technical attempts or operational learnings",
                  "Identification of success metrics for the targeted outcome",
                  "Operational constraints (Compliance, Security, Timeline)"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm font-bold text-white/80 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-up rounded-[48px] border border-white/10 bg-linear-to-br from-primary/10 to-accent/10 p-10 lg:sticky lg:top-32">
              <div className="absolute inset-0 hero-sweep opacity-20" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-8">
                  <Zap className="h-3.5 w-3.5" />
                  Preferred Protocol
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-8">
                  Direct Strategic Scoping
                </h2>
                <p className="text-base font-bold text-white/80 leading-relaxed mb-10">
                  We review every brief to decide whether a strategy session or a focused build plan is the better first step. You’ll receive a clean next move based on our technical readiness triage.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={`mailto:${brand.email}?subject=Executive%20AI%20Strategy%20Session`}
                    className="group flex flex-1 items-center justify-center gap-3 rounded-full bg-white py-5 text-sm font-black text-black transition-all hover:bg-accent hover:text-white"
                  >
                    Initiate Roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex flex-1 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 py-5 text-sm font-black text-white transition-all hover:bg-white/10"
                  >
                    Delivery Model <Globe className="h-4 w-4 text-muted-soft" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

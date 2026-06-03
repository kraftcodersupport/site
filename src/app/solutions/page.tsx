import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { NICHES } from "@/lib/niches";

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Solution tracks shaped by the actual work clients need"
        description="These tracks map directly to the brief: consulting, strategy, agents, automation, enterprise AI, RAG, chatbots, software, SaaS, and cloud operations."
        primaryHref="/contact"
        primaryLabel="Talk Through the Fit"
      />

      <section className="section-grid mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {NICHES.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group rounded-3xl border border-card-border bg-surface p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-surface-strong"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-accent">
                  <solution.icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-soft transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-foreground">
                {solution.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-soft">
                {solution.shortDescription}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-accent">
                {solution.metric}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Book, Download, FileCheck, Shield, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { RESOURCES } from "@/lib/niches";

export default function ResourcesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Asset Library"
        title="Reference material for the technical leader"
        description="A curated collection of checklists, feasibility frameworks, and delivery templates used across our enterprise engagements."
        primaryHref="/contact"
        primaryLabel="Request Custom Roadmap"
        secondaryHref="/blog"
        secondaryLabel="Read Technical Notes"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {RESOURCES.map((resource, i) => (
              <article
                key={resource.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white/5 bg-background p-10 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border border-white/5 text-accent mb-8 transition-transform group-hover:scale-110">
                    <resource.icon className="h-8 w-8" />
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-white mb-6">
                    {resource.title}
                  </h2>

                  <p className="text-base font-medium leading-relaxed text-muted-soft mb-10">
                    {resource.description}
                  </p>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
                    <FileCheck className="h-3.5 w-3.5" />
                    {resource.format}
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors"
                  >
                    Access Asset <Download className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </Link>
                </div>

                {/* Masking element */}
                <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-white/5 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            ))}
          </div>

          <div className="mt-20 relative overflow-hidden rounded-[48px] border border-white/5 bg-white/2 p-12 lg:p-20 reveal-up">
            <div className="absolute inset-0 hero-noise opacity-10" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">
                  <Shield className="h-4 w-4" />
                  Next Operational Move
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Move from Research to <span className="gradient-text">Execution</span>.
                </h2>
                <p className="mt-6 text-lg font-medium leading-relaxed text-muted-soft">
                  The resources above provide the framework. Discovery provides the data. If you have defined the challenge, you are ready for a focused technical discovery session.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-4 rounded-full bg-white px-10 py-5 text-sm font-black text-black transition-all hover:bg-accent hover:text-white"
                >
                  Initiate Discovery <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-muted-soft hover:text-white transition-colors"
                >
                  View Delivery Records <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

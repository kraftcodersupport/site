import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Globe, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";
import { getSanityTeamMembers } from "@/lib/sanity/client";
import { getItemListSchema, JsonLd, BASE_URL } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Our Team — AI Architects, Engineers & Strategists",
  description:
    "Meet the KraftCoder team — a multidisciplinary collective of AI architects, engineers, and strategists obsessed with AI delivery discipline.",
  keywords: ["KraftCoder team", "AI architects", "AI engineers", "AI strategists", "AI consultants"],
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team — AI Architects, Engineers & Strategists",
    description: "A multidisciplinary collective of architects, engineers, and strategists obsessed with AI delivery discipline.",
    url: "/team",
    type: "website",
  },
};
export default async function TeamPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);
  const teamMembers = await getSanityTeamMembers();

  return (
    <div className="relative">
      {/* ── SEO: Structured Data ── */}
      <JsonLd data={getItemListSchema("KraftCoder Team", teamMembers.map(m => ({
        name: m.name,
        description: m.role,
        ...(m.portfolioUrl && m.portfolioUrl !== "#" && { url: m.portfolioUrl }),
      })))} />

      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero
        title={dict.nav.team}
        subtitle="A multidisciplinary collective of architects, engineers, and strategists obsessed with AI delivery discipline."
        eyebrow="The Experts"
      />

      {/* ── Team Grid (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-50 border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Core Team
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
              Meet the Masters of Intelligence
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => {
              const initials = (member.name as string)
                .split(" ")
                .map((n: string) => n[0])
                .join("");
              return (
                <div
                  key={member.name}
                  className="relative pt-12 reveal-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`group flex flex-col items-center text-center rounded-2xl p-6 pt-14 transition-all duration-300 hover:shadow-md border border-zinc-200 bg-background`}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 aspect-square w-32 overflow-hidden rounded-full bg-white border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center z-10">
                      {member?.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black tracking-wider text-zinc-400 font-display">
                          {initials}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                    <p className="text-[13px] font-medium text-zinc-500 mt-1 mb-2">{member.role}</p>

                    {member?.portfolioUrl && (
                      <div className="mt-2">
                        <a href={member.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-primary transition-colors">
                          View Portfolio <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Recruitment Callout (Dark Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light">
            ✦ Join KraftCoder ✦
          </div>
          <h2 className="mt-8 text-3xl font-black text-white sm:text-5xl tracking-tight leading-tight">
            Help Us Build the <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">Autonomous Enterprise</span>
          </h2>
          <p className="mt-6 text-base font-semibold text-zinc-450 leading-relaxed max-w-2xl mx-auto">
            We are always looking for senior AI architects, engineering leads, and strategy consultants who value technical execution and operational discipline.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-primary/95 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] active:scale-95"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export const dynamic = "force-dynamic";

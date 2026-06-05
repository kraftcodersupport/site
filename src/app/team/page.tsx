import { cookies } from "next/headers";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";
import { getSanityTeamMembers } from "@/lib/sanity/client";

export default async function TeamPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);
  const teamMembers = await getSanityTeamMembers();

  return (
    <div className="relative">
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, index) => {
              const initials = (member.name as string)
                .split(" ")
                .map((n: string) => n[0])
                .join("");
              return (
                <div
                  key={member.name}
                  className="group card-light rounded-3xl p-8 text-center flex flex-col justify-between min-h-[380px] border border-zinc-200/80 bg-white hover:border-primary/30 transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div>
                    {/* Redesigned typographic avatar */}
                    <div className="relative mb-6 aspect-square max-w-[120px] mx-auto overflow-hidden rounded-full bg-linear-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300">
                      <span className="text-3xl font-black tracking-wider text-indigo-650 font-display">
                        {initials}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                    <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">{member.role}</p>
                    <p className="mt-4 text-sm font-semibold leading-relaxed text-zinc-600 line-clamp-4">{member.bio}</p>
                  </div>
                  <div className="mt-6 flex justify-center gap-3">
                    {Object?.entries(member?.socials).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link as string}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-550 transition-all hover:bg-primary/5 hover:text-primary hover:border-primary/30 shadow-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    ))}
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

import Link from "next/link";
import { cookies } from "next/headers";
import { Users, Globe, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { TEAM_MEMBERS } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function TeamPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.team}
                subtitle="A multidisciplinary collective of architects, engineers, and strategists obsessed with AI delivery discipline."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {TEAM_MEMBERS.map((member, index) => (
                            <div
                                key={member.name}
                                className="group feature-card-light rounded-[40px] p-8 text-center reveal-up hover:border-primary/20 transition-all"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative mb-8 aspect-square overflow-hidden rounded-[32px] bg-slate-50 border border-slate-100">
                                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                                        <Users className="h-16 w-16 text-primary/40 transition-transform group-hover:scale-110" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">{member.name}</h3>
                                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                                    {member.role}
                                </p>
                                <p className="mt-6 text-sm font-medium leading-relaxed text-slate-500">
                                    {member.bio}
                                </p>
                                <div className="mt-8 flex justify-center gap-4">
                                    {Object.entries(member.socials).map(([platform, link]) => (
                                        <a
                                            key={platform}
                                            href={link}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-primary hover:text-white"
                                        >
                                            <Globe className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

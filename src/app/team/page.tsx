import { cookies } from "next/headers";
import { Globe } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";
import { getSanityTeamMembers } from "@/lib/sanity/client";

export default async function TeamPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);
    const teamMembers = await getSanityTeamMembers();

    return (
        <div className="relative bg-white">
            <PageHero title={dict.nav.team} subtitle="A multidisciplinary collective of architects, engineers, and strategists obsessed with AI delivery discipline." />
            
            <section className="section-padding bg-zinc-50 border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {teamMembers.map((member, index) => {
                            const initials = (member.name as string)
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("");
                            return (
                                <div 
                                    key={member.name} 
                                    className="group card-light rounded-2xl p-8 text-center reveal-up flex flex-col justify-between min-h-[380px]" 
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div>
                                        {/* Redesigned typographic avatar */}
                                        <div className="relative mb-6 aspect-square max-w-[100px] mx-auto overflow-hidden rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300">
                                            <span className="text-3xl font-black tracking-wider text-indigo-600 font-display">
                                                {initials}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                                        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">{member.role}</p>
                                        <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-600">{member.bio}</p>
                                    </div>
                                    <div className="mt-6 flex justify-center gap-3">
                                        {Object.entries(member.socials).map(([platform, link]) => (
                                            <a key={platform} href={link as string} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-500 transition-all hover:bg-primary/5 hover:text-primary hover:border-primary/30 shadow-sm">
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
        </div>
    );
}

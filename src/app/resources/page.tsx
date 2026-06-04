import { cookies } from "next/headers";
import { Download, CalendarDays, FileText, LayoutDashboard, PlayCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import { RESOURCES } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function ResourcesPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.resources}
                subtitle="Strategy decks, governance manuals, and evaluation scorecards for leaders who need to deliver. No marketing fluff, just utility."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {RESOURCES.map((resource, index) => (
                            <div
                                key={resource.title}
                                className="group feature-card-light rounded-[40px] p-10 border border-slate-100 reveal-up hover:border-primary/20 transition-all flex flex-col"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary mb-8 group-hover:scale-110 transition-transform">
                                    <resource.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4">{resource.title}</h3>
                                <p className="text-base font-medium text-slate-500 leading-relaxed mb-8 flex-grow">
                                    {resource.description}
                                </p>
                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{resource.format}</span>
                                    <button className="text-sm font-black text-primary hover:underline">Download →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate Education */}
            <section className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Need custom training?</h2>
                    <p className="mt-6 text-lg font-medium text-slate-500 max-w-2xl mx-auto">
                        We deliver executive education and engineering workshops on-site or remotely, designed around your specific tech stack and roadmap.
                    </p>
                    <div className="mt-10">
                        <button className="rounded-full bg-slate-900 px-10 py-4 text-sm font-black text-white hover:bg-primary transition-all">
                            Inquire about Workshops
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Globe, Send, MessageSquare, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import { brand } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function ContactPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.contact}
                subtitle="Connect with our strategy team to discuss your AI objectives, governance requirements, and roadmap timing."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl leading-tight">
                                Let&apos;s start a <span className="text-primary italic">conversation.</span>
                            </h2>
                            <p className="mt-8 text-lg font-medium text-slate-500 leading-relaxed">
                                Whether you’re looking to build your first AI pilot or scale an enterprise portfolio, we’re here to help you navigate the complexity.
                            </p>

                            <div className="mt-12 space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                                        <Send className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
                                        <p className="mt-1 text-sm font-medium text-slate-500">For inquiries and strategy sessions.</p>
                                        <a href={`mailto:${brand.email}`} className="mt-2 block font-black text-primary hover:underline">
                                            {brand.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Direct Chat</h3>
                                        <p className="mt-1 text-sm font-medium text-slate-500">Available Mon-Fri, 9am - 6pm EST.</p>
                                        <p className="mt-2 block font-black text-slate-900">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Global Presence</h3>
                                        <p className="mt-1 text-sm font-medium text-slate-500">HQ in New York City with remote-first hubs worldwide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[40px] bg-background p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 surface-grid opacity-10" />
                                <div className="relative z-10 text-center mb-10">
                                    <h3 className="text-2xl font-black text-white mb-4">Request a Strategy Call</h3>
                                    <p className="text-sm font-bold text-white/60">A 30-minute session to map your AI curiosities to business outcomes.</p>
                                </div>

                                <div className="relative z-10 flex flex-col gap-6">
                                    <Link
                                        href={`mailto:${brand.email}?subject=KraftCoder%20AI%20Strategy%20Session`}
                                        className="group flex items-center justify-center gap-3 rounded-full bg-white py-5 text-sm font-black text-black transition-all hover:bg-primary hover:text-white"
                                    >
                                        Initiate Roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 py-5 text-sm font-black text-white transition-all hover:bg-white/10"
                                    >
                                        Delivery Model <Globe className="h-4 w-4 text-slate-400" />
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

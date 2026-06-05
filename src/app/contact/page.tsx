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
                eyebrow="Get in touch"
            />
            
            {/* ── Contact Section (Light Background - Mix Mode) ── */}
            <section className="section-padding bg-zinc-50 border-t border-zinc-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Left Info Column */}
                        <div>
                            <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight mb-6">
                                Connect with <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">KraftCoder.</span>
                            </h2>
                            <p className="mt-6 text-lg font-semibold text-zinc-600 leading-relaxed">
                                Whether you&apos;re looking to build your first AI pilot or scale an enterprise portfolio, we&apos;re here to help you navigate the complexity.
                            </p>
                            
                            <div className="mt-12 space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                        <Send className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900">Email Us</h3>
                                        <p className="mt-1 text-sm font-semibold text-zinc-500">For inquiries and strategy sessions.</p>
                                        <a href={`mailto:${brand.email}`} className="mt-2 block font-bold text-primary hover:underline">{brand.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900">Direct Chat</h3>
                                        <p className="mt-1 text-sm font-semibold text-zinc-500">Available Mon-Fri, 9am - 6pm EST.</p>
                                        <p className="mt-2 block font-bold text-zinc-800">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900">Global Presence</h3>
                                        <p className="mt-1 text-sm font-semibold text-zinc-500">HQ in New York City with remote-first hubs worldwide.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Column */}
                        <div className="relative">
                            <div className="card-light rounded-3xl p-8 sm:p-10 relative overflow-hidden bg-white border border-zinc-200 shadow-sm">
                                <div className="relative z-10 text-center mb-10">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">Request a Strategy Call</h3>
                                    <p className="text-sm font-semibold text-zinc-500">A 30-minute session to map your AI curiosities to business outcomes.</p>
                                </div>
                                
                                <form action="#" className="relative z-10 flex flex-col gap-5">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-full h-12 px-5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-sm" 
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Corporate Email" 
                                        className="w-full h-12 px-5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-sm" 
                                    />
                                    <textarea 
                                        placeholder="Briefly describe your objectives..." 
                                        rows={4}
                                        className="w-full p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all font-semibold text-sm resize-none" 
                                    />
                                    <Link href={`mailto:${brand.email}?subject=KraftCoder%20AI%20Strategy%20Session`} className="group flex items-center justify-center gap-3 rounded-xl bg-primary py-4 mt-2 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-md">
                                        Initiate Roadmap <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </form>
                                
                                <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center justify-center">
                                    <Link href="/services" className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 hover:text-primary transition-colors uppercase tracking-widest">
                                        <Globe className="h-3.5 w-3.5" /> View Delivery Model
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

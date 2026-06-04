import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getDictionary } from "@/lib/dictionaries";
import { getSanityBlogPosts } from "@/lib/sanity/client";

export default async function BlogPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);
    const blogPosts = await getSanityBlogPosts();

    return (
        <div className="relative bg-zinc-950">
            <PageHero title={dict.nav.blog} subtitle="Insights on AI strategy, delivery models, and the technical discipline required to ship systems that work." />
            
            <section className="section-padding bg-zinc-950 border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2 grid gap-8">
                            {blogPosts.map((post, index) => (
                                <article 
                                    key={post.title} 
                                    className="group relative flex flex-col justify-between card-dark p-8 rounded-3xl reveal-up min-h-[240px]" 
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div>
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                                            <span>{post.category}</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                                            <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>{post.title}</Link>
                                        </h2>
                                        <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-6 line-clamp-2">{post.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-6 border-t border-zinc-800/60">
                                        <div className="flex items-center gap-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.published}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                                        </div>
                                        <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <aside className="space-y-8">
                            <div className="card-dark rounded-3xl p-8">
                                <h3 className="text-xs font-bold text-white mb-5 uppercase tracking-widest">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Strategy", "Engineering", "Delivery", "Leadership", "Case Studies"].map(cat => (
                                        <button key={cat} className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-400 hover:border-primary/30 hover:text-primary transition-all">{cat}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="card-dark rounded-3xl p-8 relative overflow-hidden text-center">
                                <div className="absolute inset-0 surface-grid opacity-10" />
                                <h3 className="relative z-10 text-lg font-bold text-white mb-3">Case Studies</h3>
                                <p className="relative z-10 text-sm font-medium text-zinc-400 mb-6">Detailed breakdowns of pilots that made it to production.</p>
                                <Link href="/case-studies" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors">View all <ChevronRight className="h-4 w-4" /></Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-855 section-glow">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-black text-white sm:text-4xl mb-6">Discipline in your <span className="text-primary italic">Inbox.</span></h2>
                    <p className="text-lg font-medium text-zinc-400 mb-10">Join 2,000+ enterprise leaders receiving our monthly dispatch on AI delivery discipline. No noise, just architectural truth.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input type="email" placeholder="Corporate Email Address" className="w-full sm:w-auto min-w-[300px] h-14 px-6 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-650 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" />
                        <button className="w-full sm:w-auto h-14 px-8 rounded-full hero-cta-primary text-sm font-bold transition-all active:scale-95">Join Protocol</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

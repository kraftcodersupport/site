import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Newspaper, Calendar, Clock, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { BLOG_POSTS } from "@/lib/niches";
import { getDictionary } from "@/lib/dictionaries";

export default async function BlogPage() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
    const dict = await getDictionary(locale);

    return (
        <div className="relative">
            <PageHero
                title={dict.nav.blog}
                subtitle="Insights on AI strategy, delivery models, and the technical discipline required to ship systems that work."
            />

            <section className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Main Blog Grid */}
                        <div className="lg:col-span-2 grid gap-12">
                            {BLOG_POSTS.map((post, index) => (
                                <article
                                    key={post.title}
                                    className="group relative flex flex-col gap-8 md:flex-row md:items-center reveal-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative aspect-video w-full md:w-72 shrink-0 overflow-hidden rounded-[32px] bg-slate-50 border border-slate-100">
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                            <post.icon className="h-12 w-12 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                                            <span>{post.category}</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors">
                                            <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <p className="text-base font-medium text-slate-500 leading-relaxed mb-6 line-clamp-2">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3" /> {post.published}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3" /> {post.readTime}
                                                </span>
                                            </div>
                                            <Link href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-primary transition-all">
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="rounded-[40px] bg-slate-50 p-8 border border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-wider">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Strategy", "Engineering", "Delivery", "Leadership", "Case Studies"].map(cat => (
                                        <button key={cat} className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all">
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-background p-10 border border-white/5 relative overflow-hidden text-center">
                                <div className="absolute inset-0 surface-grid opacity-10" />
                                <h3 className="relative z-10 text-xl font-bold text-white mb-4">Case Studies</h3>
                                <p className="relative z-10 text-sm font-medium text-slate-400 mb-8">Detailed breakdowns of pilots that made it to production.</p>
                                <Link href="/case-studies" className="relative z-10 inline-flex items-center gap-2 text-sm font-black text-primary hover:text-white transition-colors">
                                    View all <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
                <div className="absolute inset-0 surface-grid opacity-10" />
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl font-black text-white sm:text-4xl mb-6">
                        Discipline in your <span className="text-primary italic">Inbox.</span>
                    </h2>
                    <p className="text-lg font-medium text-slate-400 mb-10">
                        Join 2,000+ enterprise leaders receiving our monthly dispatch on AI delivery discipline. No noise, just architectural truth.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input
                            type="email"
                            placeholder="Corporate Email Address"
                            className="w-full sm:w-auto min-w-[300px] h-14 px-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <button className="w-full sm:w-auto h-14 px-10 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                            Join Protocol
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

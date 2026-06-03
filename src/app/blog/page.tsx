import PageHero from "@/components/PageHero";
import { BLOG_POSTS } from "@/lib/niches";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Strategic Archive"
        title="Engineering notes for the AI-first enterprise"
        description="Practical guidance on delivery, governance, and architectural adoption. We focus on the friction points of implementation rather than market speculation."
        primaryHref="/resources"
        primaryLabel="Browse Reference Library"
        secondaryHref="/contact"
        secondaryLabel="Inquire for Briefings"
      />

      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 surface-grid opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {BLOG_POSTS.map((post, i) => (
              <article
                key={post.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white/5 bg-background p-10 transition-all hover:border-primary/20 hover:bg-white/2 reveal-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent border border-white/10 group-hover:scale-110 transition-transform">
                      <post.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-soft">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4">
                    <BookOpen className="h-3.5 w-3.5" />
                    {post.category}
                  </div>

                  <h2 className="text-3xl font-black tracking-tight text-white mb-6 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-lg font-medium leading-relaxed text-muted-soft mb-10">
                    {post.description}
                  </p>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-soft">
                    Published {post.published}
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors"
                  >
                    Read Manuscript <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Aesthetic Gradient */}
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Callout */}
      <section className="relative py-24 bg-surface-strong/30 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-6">
            Stay aligned with the <span className="gradient-text">Engineering Edge</span>.
          </h2>
          <p className="text-lg font-medium text-muted-soft mb-10">
            Join 2,000+ enterprise leaders receiving our monthly dispatch on AI delivery discipline. No noise, just architectural truth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Corporate Email Address"
              className="w-full sm:w-auto min-w-[300px] h-14 px-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-muted-soft focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button className="w-full sm:w-auto h-14 px-10 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
              Join Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

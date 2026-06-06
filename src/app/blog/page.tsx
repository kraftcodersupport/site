import { cookies } from "next/headers";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import { getDictionary } from "@/lib/dictionaries";
import { getSanityBlogPosts } from "@/lib/sanity/client";
import { JsonLd, BASE_URL } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "AI Insights & Blog — Strategy, Engineering & Leadership",
  description:
    "Expert insights on AI strategy, delivery models, RAG systems, governance, and the technical discipline required to ship production AI systems.",
  keywords: ["AI blog", "AI insights", "AI strategy articles", "enterprise AI blog", "RAG best practices", "AI governance"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Insights & Blog — KraftCoder",
    description: "Expert insights on AI strategy, delivery models, and technical discipline.",
    url: "/blog",
    type: "website",
  },
};
export default async function BlogPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale);
  const blogPosts = await getSanityBlogPosts();

  return (
    <div className="relative">
      {/* ── SEO: Structured Data ── */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "KraftCoder AI Blog",
        description: "Expert insights on AI strategy, delivery models, and technical discipline.",
        url: `${BASE_URL}/blog`,
        publisher: {
          "@type": "Organization",
          name: "KraftCoder",
          url: BASE_URL,
        },
      }} />

      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero 
        title={dict.nav.blog} 
        subtitle="Insights on AI strategy, delivery models, and the technical discipline required to ship systems that work." 
        eyebrow="Our Blog"
      />
      
      {/* ── Blog Listings Grid (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-50 border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogList initialPosts={blogPosts} />
        </div>
      </section>

      {/* ── Newsletter Dispatch Strip (Dark Background - Mix Mode) ── */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light mb-6">
            ✦ KraftCoder Dispatch ✦
          </div>
          <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight mb-6">
            Discipline in your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">Inbox.</span>
          </h2>
          <p className="text-base font-semibold text-zinc-450 leading-relaxed mb-10 max-w-2xl mx-auto">
            Join 2,000+ enterprise leaders receiving our monthly dispatch on AI delivery discipline. No noise, just architectural truth.
          </p>
          <form 
            action="#" 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Corporate Email Address" 
              required
              className="w-full h-14 px-6 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all shadow-sm font-semibold text-sm" 
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto h-14 px-8 rounded-full hero-cta-primary text-sm font-bold transition-all active:scale-95 whitespace-nowrap"
            >
              Join Protocol
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import { getSanityBlogPostBySlug, getSanityBlogPosts } from "@/lib/sanity/client";
import { getBlogPostingSchema, getBreadcrumbSchema, JsonLd } from "@/lib/jsonld";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description || `Read about ${post.title} on the KraftCoder AI blog.`,
    keywords: [post.category, "AI blog", "KraftCoder", post.title].filter(Boolean),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description || `Read about ${post.title} on the KraftCoder AI blog.`,
      url: `/blog/${slug}`,
      type: "article",
      ...(post.published && { publishedTime: post.published }),
    },
  };
}
const DEFAULT_CONTENT = `
## Technical Strategy for Autonomous Workloads

Implementing production-ready systems requires more than just calling an API. It demands strict engineering discipline, robust monitoring, and structured fallbacks.

### Key Considerations
1. **Model Selection**: Choosing the right tool for the right job, balancing latency, throughput, and cost.
2. **Retrieval Accuracy**: Grounding generation in authoritative documentation to prevent hallucination.
3. **Governance & Controls**: Ensuring audit trails and human-in-the-loop validation checkpoints are built-in from day one.

### Implementation Checklist
- Define clear evaluation datasets.
- Implement streaming to optimize perceived latency.
- Instrument telemetry and request logging.
- Set up automatic retry and model fallback logic.
`;

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-zinc-900 font-bold'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em class='text-zinc-800 italic'>$1</em>")
    .replace(/`(.*?)`/g, "<code class='px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-primary font-mono text-xs'>$1</code>");
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("### ")) {
      return (
        <h4 key={i} className="text-lg font-black text-zinc-900 mt-8 mb-4 tracking-tight">
          {trimmed.replace("### ", "")}
        </h4>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h3 key={i} className="text-2xl font-black text-zinc-900 mt-10 mb-4 tracking-tight border-b border-zinc-100 pb-2">
          {trimmed.replace("## ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("# ")) {
      return (
        <h2 key={i} className="text-3xl font-black text-zinc-900 mt-12 mb-6 tracking-tight">
          {trimmed.replace("# ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split(/\n[-*]\s+/).map(item => item.replace(/^[-*]\s+/, ""));
      return (
        <ul key={i} className="list-disc pl-6 my-4 space-y-2.5 text-zinc-700 font-semibold">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split(/\n\d+\.\s+/).map(item => item.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={i} className="list-decimal pl-6 my-4 space-y-2.5 text-zinc-700 font-semibold">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ol>
      );
    }
    return (
      <p
        key={i}
        className="text-zinc-700 leading-relaxed mb-6 font-semibold"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getSanityBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.title !== post.title)
    .slice(0, 2);

  const rawContent = post.content || DEFAULT_CONTENT;

  // Helper to generate correct slug path
  const getPostSlug = (p: any) => {
    if (typeof p.slug === "string") return p.slug;
    if (p.slug?.current) return p.slug.current;
    return p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="relative">
      {/* ── SEO: Structured Data ── */}
      <JsonLd data={getBlogPostingSchema({ ...post, slug })} />
      <JsonLd data={getBreadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: post.title },
      ])} />

      {/* ── Page Hero (Dark bg-background) ── */}
      <section className="relative overflow-hidden border-b border-zinc-900 bg-background py-28 lg:py-36">
        <div className="absolute inset-0 surface-grid opacity-15" />
        <div className="hero-noise" />
        <div className="absolute -top-32 left-1/4 h-[350px] w-[350px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl animate-fade-in">
            {/* Category tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
              <Sparkles className="h-3 w-3 text-primary animate-sparkle" />
              {post.category}
            </div>

            <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="mt-8 flex flex-wrap gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest border-t border-zinc-900 pt-6">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-500" /> {post.published}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Post Content (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-white relative border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">

            {/* Main Article Body */}
            <div className="lg:col-span-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors mb-10"
              >
                <ArrowLeft className="h-4 w-4" /> Back to blog
              </Link>

              <article className="prose max-w-none">
                {renderMarkdown(rawContent)}
              </article>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 rounded-3xl p-8 bg-zinc-50 border border-zinc-200 shadow-sm">
                <h3 className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-widest">About KraftCoder</h3>
                <p className="text-sm font-semibold text-zinc-500 leading-relaxed mb-6">
                  We are a premium AI strategy and technical execution firm, helping enterprise leaders implement governed delivery models that drive business outcomes.
                </p>
                <div className="border-t border-zinc-200 pt-6">
                  <h4 className="text-xs font-bold text-zinc-900 mb-3 uppercase tracking-widest">Share this Article</h4>
                  <p className="text-xs font-semibold text-zinc-500">Copy the URL from your address bar to share this content with your team.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Posts Section (Dark Background - Mix Mode) ── */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
          <div className="absolute inset-0 surface-grid opacity-15" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                Insights
              </span>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Continue <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-light to-indigo-400 italic">Reading</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {relatedPosts.map((p, index) => {
                const relatedSlug = getPostSlug(p);
                return (
                  <article
                    key={p.title}
                    className="group relative flex flex-col justify-between card-dark p-8 rounded-3xl border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-800 transition-all min-h-[220px]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 block">
                        {p.category}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedSlug}`}>{p.title}</Link>
                      </h3>
                      <p className="text-xs font-semibold text-zinc-400 leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-zinc-850 flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <span>{p.published}</span>
                      <Link
                        href={`/blog/${relatedSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-300 group-hover:text-primary transition-colors"
                      >
                        Read Post <Clock className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 60;

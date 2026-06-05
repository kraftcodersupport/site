"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronRight, Search } from "lucide-react";

interface BlogPost {
  title: string;
  category: string;
  readTime: string;
  published: string;
  description: string;
  content?: string;
  slug?: { current: string } | string;
}

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Strategy", "Engineering", "Delivery", "Leadership", "Case Studies"];

  // Helper to generate correct slug path
  const getPostSlug = (post: BlogPost) => {
    if (typeof post.slug === "string") return post.slug;
    if (post.slug?.current) return post.slug.current;
    return post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Blog Posts Column */}
      <div className="lg:col-span-2 space-y-8">

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-6 rounded-2xl bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-450 focus:outline-none focus:border-primary/45 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-semibold shadow-sm"
          />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1">
            {filteredPosts.map((post, index) => {
              const slug = getPostSlug(post);
              return (
                <article
                  key={post.title}
                  className="group relative flex flex-col justify-between card-light p-8 rounded-3xl border border-zinc-200/80 bg-white hover:border-primary/30 transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] min-h-[220px]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-black text-zinc-900 leading-tight mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm font-semibold text-zinc-500 leading-relaxed mb-6 line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-150">
                    <div className="flex items-center gap-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400" /> {post.published}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-zinc-400" /> {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${slug}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
            <p className="text-zinc-500 font-semibold text-sm">No articles match your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Sidebar Column */}
      <aside className="space-y-8">
        {/* Categories list */}
        <div className="card-light rounded-3xl p-8 border border-zinc-200 bg-white">
          <h3 className="text-xs font-bold text-zinc-900 mb-5 uppercase tracking-widest">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${(cat === "All" && selectedCategory === "All") ||
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/10"
                  : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Card (High Contrast Dark Glass Card) */}
        <div className="rounded-3xl p-8 relative overflow-hidden bg-zinc-950 border border-zinc-850 shadow-xl text-center">
          <div className="absolute inset-0 surface-grid opacity-15" />
          <h3 className="relative z-10 text-lg font-bold text-white mb-3">Case Studies</h3>
          <p className="relative z-10 text-sm font-semibold text-zinc-400 mb-6">
            Detailed breakdowns of pilot implementations that successfully scaled to production.
          </p>
          <Link
            href="/case-studies"
            className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors"
          >
            View all case studies <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
}

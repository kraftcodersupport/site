import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { NICHES } from "@/lib/niches";
import { getSanityBlogPosts } from "@/lib/sanity/client";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticPages: Array<{ path: string; changeFrequency: ChangeFreq; priority: number }> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  for (const niche of NICHES) {
    entries.push({
      url: `${SITE_URL}/solutions/${niche.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  try {
    const posts = await getSanityBlogPosts();
    for (const post of posts) {
      const slug =
        typeof post.slug === "string"
          ? post.slug
          : post.slug?.current ||
            post.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
      entries.push({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: post.published ? new Date(post.published) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (err) {
    console.error("Failed to load blog pages for sitemap:", err);
  }

  return entries;
}

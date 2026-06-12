import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { NICHES } from "../src/lib/niches";
import { getSanityBlogPosts } from "../src/lib/sanity/client";

let BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kraft-coder.vercel.app";

// Fallback to production URL if local development URL is configured,
// since sitemap/robots.txt should always contain the production domain.
if (!BASE_URL || BASE_URL.includes("localhost") || BASE_URL.includes("127.0.0.1")) {
  BASE_URL = "https://kraft-coder.vercel.app";
}

async function generateSitemap() {
  console.log("Generating sitemap...");
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const solutionPages = NICHES.map((niche) => ({
    url: `${BASE_URL}/solutions/${niche.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let blogPages: any[] = [];
  try {
    const posts = await getSanityBlogPosts();
    blogPages = posts.map((post) => {
      const slug =
        typeof post.slug === "string"
          ? post.slug
          : post.slug?.current ||
          post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
      return {
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: post.published ? new Date(post.published) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch (err) {
    console.error("Failed to load blog pages for sitemap:", err);
  }

  const allPages = [...staticPages, ...solutionPages, ...blogPages];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of allPages) {
    xml += "  <url>\n";
    xml += `    <loc>${page.url}</loc>\n`;
    if (page.lastModified) {
      const dateStr = page.lastModified.toISOString().split("T")[0];
      xml += `    <lastmod>${dateStr}</lastmod>\n`;
    }
    if (page.changeFrequency) {
      xml += `    <changefreq>${page.changeFrequency}</changefreq>\n`;
    }
    if (page.priority !== undefined) {
      xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
    }
    xml += "  </url>\n";
  }

  xml += "</urlset>\n";

  const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf8");
  console.log(`Sitemap written successfully to: ${sitemapPath}`);
}

function generateRobots() {
  console.log("Generating robots.txt...");
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

User-agent: GPTBot
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /studio/
Disallow: /admin/
Disallow: /api/

Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}
`;

  const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
  fs.writeFileSync(robotsPath, robotsTxt, "utf8");
  console.log(`Robots.txt written successfully to: ${robotsPath}`);
}

async function main() {
  try {
    await generateSitemap();
    generateRobots();
    console.log("SEO assets static regeneration complete.");
  } catch (error) {
    console.error("SEO static generation failed:", error);
    process.exit(1);
  }
}

main();

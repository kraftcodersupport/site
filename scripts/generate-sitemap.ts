import { writeFileSync } from "fs";
import { join } from "path";
import { NICHES } from "../src/lib/niches";

const SITE_URL = "https://kraft-coder.vercel.app";
const now = new Date().toISOString().split("T")[0];

const staticPages = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions", changefreq: "monthly", priority: "0.9" },
  { path: "/industries", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/team", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.6" },
  { path: "/resources", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const nichePages = NICHES.map((niche) => ({
  path: `/solutions/${niche.slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const allPages = [...staticPages, ...nichePages];

const urls = allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outputPath = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(outputPath, xml, "utf-8");
console.log(`Sitemap generated at public/sitemap.xml with ${allPages.length} URLs`);

import type { MetadataRoute } from "next";
import { NICHES } from "@/lib/niches";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/industries",
    "/case-studies",
    "/blog",
    "/resources",
    "/contact",
  ];

  const staticRoutes: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = NICHES.map((solution) => ({
    url: `${siteUrl}/solutions/${solution.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes];
}

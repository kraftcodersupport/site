// Single source of truth for the canonical site URL.
// Reads NEXT_PUBLIC_SITE_URL but falls back to the production domain whenever
// the value is empty or points at a local dev host — sitemap, robots, metadata,
// and JSON-LD must never emit localhost URLs.
const PRODUCTION_URL = "https://kraft-coder.vercel.app";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw || raw.includes("localhost") || raw.includes("127.0.0.1")) {
    return PRODUCTION_URL;
  }
  // Normalize: strip a single trailing slash so `${SITE_URL}/path` never doubles up.
  return raw.replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();

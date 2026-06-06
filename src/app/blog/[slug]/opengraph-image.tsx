import { ImageResponse } from "next/og";
import { getSanityBlogPostBySlug } from "@/lib/sanity/client";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSanityBlogPostBySlug(slug);

  const title = post?.title || "Blog Post";
  const category = post?.category || "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-100px",
            width: "500px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Category badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#818cf8",
                textTransform: "uppercase",
                letterSpacing: "3px",
                display: "flex",
              }}
            >
              ✦ {category}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 60 ? 40 : 52,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-1px",
              lineHeight: 1.15,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "white",
              display: "flex",
            }}
          >
            Kraft<span style={{ color: "#818cf8" }}>Coder</span>
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#71717a",
              display: "flex",
            }}
          >
            kraft-coder.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

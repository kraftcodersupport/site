import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const title = slug
    ? slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    : "Kraft Coder";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #f9f5f0 0%, #ffffff 48%, #f2ebe3 100%)",
          color: "#101828",
          fontFamily: "IBM Plex Sans, Inter, system-ui, sans-serif",
          padding: "72px",
          border: "1px solid rgba(16,24,40,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#d6005d",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          Kraft Coder
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "66px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "980px",
              color: "#101828",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#475467",
              maxWidth: "900px",
              lineHeight: 1.35,
            }}
          >
            Helping organizations turn AI into measurable business outcomes.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#667085",
            fontSize: "20px",
          }}
        >
          <span>Premium AI consultancy</span>
          <span>Strategy. Build. Scale.</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanityWriteClient } from "@/lib/sanity/client";

const DAILY_TOPICS = [
  "Evaluating RAG architectures: When vector databases are overkill",
  "The hidden cost of local LLM orchestration in production environments",
  "Navigating regulatory boundaries: HIPAA and GDPR compliance in LLM design",
  "Model fine-tuning vs dynamic context window injection: A cost-benefit analysis",
  "The P&L impact of autonomous AI agents in enterprise customer success",
  "Designing secure AI gateway wrappers to prevent prompt injection",
  "How to measure real productivity gains from AI copilot integrations"
];

export async function GET(req: NextRequest) {
  // Verify authorization for cron job (Vercel sets a CRON_SECRET header to verify requests)
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET && 
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Select a random topic from our curated daily list
    const randomIndex = Math.floor(Math.random() * DAILY_TOPICS.length);
    const topic = DAILY_TOPICS[randomIndex];

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.warn("CRON: GEMINI_API_KEY is not set. Creating mock blog post.");
      if (sanityWriteClient) {
        await sanityWriteClient.create({
          _type: "blogPost",
          title: `Daily Dispatch: ${topic}`,
          slug: {
            _type: "slug",
            current: `daily-dispatch-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
          },
          category: "Strategy",
          readTime: "3 min read",
          published: new Date().toISOString().split("T")[0],
          description: `An automated daily dispatch concerning ${topic}.`,
          content: `Mock content for topic: ${topic}. Configure GEMINI_API_KEY to enable daily dynamic blogs.`
        });
      }
      return NextResponse.json({ success: true, mock: true, topic });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { 
        responseMimeType: "application/json",
        maxOutputTokens: 3000 // High limits to prevent truncation, fast gemini-2.5-flash will finish in < 4s
      }
    });

    const prompt = `
Generate a professional, strategic blog post about the topic: "${topic}".
Output MUST follow this JSON schema exactly:
{
  "title": "A highly engaging, SEO-optimized title",
  "category": "One of: Strategy, Engineering, Delivery, Leadership, Case Studies",
  "readTime": "e.g. 5 min read",
  "description": "A concise 2-sentence summary of the article",
  "content": "Full rich text blog content in Markdown format, explaining architectural and strategy insights. Keep this content to around 400-600 words so it does not get truncated."
}
`;

    const result = await model.generateContent(prompt);
    const blogData = JSON.parse(result.response.text());

    if (sanityWriteClient) {
      await sanityWriteClient.create({
        _type: "blogPost",
        title: blogData.title,
        slug: {
          _type: "slug",
          current: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        },
        category: blogData.category,
        readTime: blogData.readTime,
        published: new Date().toISOString().split("T")[0],
        description: blogData.description,
        content: blogData.content
      });
      return NextResponse.json({ success: true, topic, post: blogData });
    } else {
      console.warn("CRON: Sanity write client is not configured.");
      return NextResponse.json({ success: true, savedToSanity: false, post: blogData });
    }

  } catch (error: any) {
    console.error("Cron daily blog generation failed:", error);
    return NextResponse.json({ error: error.message || "Cron generation failed" }, { status: 500 });
  }
}

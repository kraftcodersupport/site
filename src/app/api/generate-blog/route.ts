import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanityWriteClient } from "@/lib/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const topic = body.topic || "Enterprise AI Delivery and Governance Models";

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      // Mock mode if no Gemini key exists
      console.warn("GEMINI_API_KEY is not set. Generating mock blog post.");
      const mockPost = {
        title: `Mock Post: ${topic}`,
        category: "Strategy",
        readTime: "4 min read",
        description: `An automated insight regarding ${topic} created in mock mode.`,
        content: `This is a mock blog post content for: ${topic}. Please set GEMINI_API_KEY to enable AI generation.`,
      };
      
      // If Sanity write client is configured, write the mock post
      if (sanityWriteClient) {
        await sanityWriteClient.create({
          _type: "blogPost",
          title: mockPost.title,
          slug: {
            _type: "slug",
            current: mockPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          },
          category: mockPost.category,
          readTime: mockPost.readTime,
          published: new Date().toISOString().split("T")[0],
          description: mockPost.description,
          content: mockPost.content
        });
      }
      return NextResponse.json({ success: true, mock: true, post: mockPost });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    // Use gemini-2.5-flash for very low latency (< 10 seconds Vercel limit)
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
    const responseText = result.response.text();
    const blogData = JSON.parse(responseText);

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
      return NextResponse.json({ success: true, savedToSanity: true, post: blogData });
    } else {
      console.warn("Sanity write client is not configured. Logging generated blog to console.");
      console.log("Generated Blog Post:", blogData);
      return NextResponse.json({ success: true, savedToSanity: false, post: blogData });
    }

  } catch (error: any) {
    console.error("Failed to generate blog:", error);
    return NextResponse.json({ error: error.message || "Failed to generate blog post" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPosts, createPost } from "@/lib/db-fallback";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify authorization for cron job (Vercel sets a CRON_SECRET header to verify requests)
  const authHeader = req.headers.get("authorization");
  const url = req.nextUrl;
  const isManualTrigger = url.searchParams.get("manual") === "true";

  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    !isManualTrigger // Allow manual trigger from admin console
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    console.log("Generating daily batch of 4 LinkedIn posts with 3 alternative Imagen 3 prompts each...");
    
    const genAI = new GoogleGenerativeAI(geminiKey);
    let modelName = "gemini-2.5-flash";
    let result;

    const systemPrompt = `
You are a content strategist for Kraft Coder, a web development and AI-focused company.

Task:
Create 4 highly engaging, strategic LinkedIn post ideas for today. Focus on topics relevant to startup founders, business owners, and developers (e.g. AI tools, web performance, UI/UX, SaaS strategies).

Brand context:
- Company: Kraft Coder
- Website: https://kraft-coder.vercel.app
- Audience: startup founders, business owners, developers, and people who need websites or web apps
- Services: web development, AI integration, modern UI, SaaS websites, performance optimization
- Tone: modern, smart, simple, trustworthy, slightly bold
- Goal: create social media content that increases followers and shows expertise

Generate exactly 4 post ideas for today, covering these 4 distinct post types:
1. educational (tips, how-to, guides)
2. showcase (project highlights, architecture case studies, portfolio style)
3. opinion (bold takes on industry trends, future of AI/dev)
4. engagement (questions, debate, interactive content)

Output must follow this JSON schema exactly (Return a JSON Array containing exactly 4 objects):
[
  {
    "post_type": "educational" | "showcase" | "opinion" | "engagement",
    "topic": "Concise topic title",
    "hook": "An attention-grabbing first line (the hook) that stops the scroll",
    "caption_short": "A short, summarized caption of the post (1-2 sentences)",
    "caption_long": "The complete post caption with clear spacing, bullet points, structured information, and highly readable copy. Do not include hashtags or CTA here.",
    "design_style": "Visual style description for the image graphic (e.g., Clean minimalist dark mode, neo-brutalist tech graphic, vibrant cyber-grid diagram, etc.)",
    "image_prompts": [
      "Option 1 (Minimalist 3D Studio Render): A deeply detailed text-to-image prompt optimized for Imagen 3. Describe abstract claymorphic 3D shapes, smooth matte plastic or frosted glass, soft ambient studio lighting, drop shadows, and clean tech metaphors with neon indigo and emerald details against a clean dark charcoal background. Keep it to 2-3 sentences.",
      "Option 2 (Cinematic Conceptual Photography): A deeply detailed text-to-image prompt optimized for Imagen 3. Describe a real-world high-quality photograph representing the topic conceptually (e.g. keycaps, hands on glowing glass interfaces, abstract prisms reflecting light), dramatic moody studio lighting, macro lens details, blur background (depth of field), and professional camera styling. Keep it to 2-3 sentences.",
      "Option 3 (Flat Isometric Tech Vector): A deeply detailed text-to-image prompt optimized for Imagen 3. Describe a clean isometric digital blueprint with flat vector tech icons, connecting grid lines, neon wireframes, subtle gradients, and clean technical layouts on a dark mode background. Keep it to 2-3 sentences."
    ],
    "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4"],
    "cta": "Actionable Call To Action tailored to the post (e.g., 'Need a high-performance web app? Let\\'s build it. Link in bio.')",
    "target_platforms": ["linkedin"]
  }
]

Ensure:
- Valid JSON only.
- Content is practical, current, and strategic.
- Do not use unescaped double quotes (\") inside any text fields (hooks, captions, image_prompts, topics). Use single quotes (') instead.
- Do not make up fake statistics.
- Captions are ready to copy-paste.
- Image prompts must be designed for 1080x1080 square social graphics.
`;

    const currentDateStr = new Date().toISOString().split("T")[0];

    try {
      console.log(`Attempting generation with primary model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
        },
      });
      result = await model.generateContent(systemPrompt);
    } catch (primaryError: any) {
      console.warn(`Primary model ${modelName} failed. Falling back to gemini-2.5-flash-lite. Error:`, primaryError.message || primaryError);
      modelName = "gemini-2.5-flash-lite";
      console.log(`Attempting generation with fallback model: ${modelName}`);
      const fallbackModel = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
        },
      });
      result = await fallbackModel.generateContent(systemPrompt);
    }

    const textResponse = result.response.text();
    
    // Strip markdown code block wrappers if present
    let cleanText = textResponse.trim();
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```(?:json)?\n?/i, "");
      cleanText = cleanText.replace(/\n?```$/i, "");
      cleanText = cleanText.trim();
    }

    let postsData;
    try {
      postsData = JSON.parse(cleanText);
    } catch (parseError: any) {
      console.error("JSON parse failed. Response length:", cleanText.length, "Last 200 chars:", cleanText.slice(-200));
      throw new Error(`JSON parse error: ${parseError.message}. Response may have been truncated.`);
    }

    if (!Array.isArray(postsData) || postsData.length === 0) {
      throw new Error("Invalid response format from Gemini model. Expected an array.");
    }

    const createdPosts = [];
    for (const post of postsData) {
      const newPost = await createPost({
        post_type: post.post_type,
        topic: post.topic,
        hook: post.hook,
        caption_short: post.caption_short,
        caption_long: post.caption_long,
        design_style: post.design_style,
        image_prompts: post.image_prompts || [],
        hashtags: post.hashtags,
        cta: post.cta,
        target_platforms: post.target_platforms || ["linkedin"],
        status: "pending",
        batch_date: currentDateStr,
      });
      createdPosts.push(newPost);
    }

    return NextResponse.json({
      success: true,
      message: `Generated 4 LinkedIn posts with 3 Imagen 3 prompts each for batch ${currentDateStr}.`,
      posts: createdPosts,
    });

  } catch (error: any) {
    console.error("Cron execution failed:", error);
    return NextResponse.json(
      { error: error.message || "Cron execution failed" },
      { status: 500 }
    );
  }
}

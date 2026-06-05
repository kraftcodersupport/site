import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  SERVICES,
  TEAM_MEMBERS,
  BLOG_POSTS,
  brand,
} from "@/lib/niches";

// Create context payload
const siteContext = `
You are the AI assistant for KraftCoder (formerly Executive AI Consultancy).
Your job is to answer questions ONLY about KraftCoder, its team, services, blogs, and solutions.
Be extremely concise, professional, and friendly. Answer in 2-3 sentences maximum.
If a question is NOT about KraftCoder, politely decline: "I'm sorry, I can only answer questions related to KraftCoder's services, team, and blog posts."

Here is the authentic context of KraftCoder:
- Brand Name: ${brand.name}
- Email: ${brand.email}
- Services:
${SERVICES.map(s => `  * ${s.title}: ${s.description}. Key outcomes: ${s.bullets.join(", ")}`).join("\n")}
- Team Members:
${TEAM_MEMBERS.map(t => `  * ${t.name} (${t.role}): ${t.bio}`).join("\n")}
- Blogs:
${BLOG_POSTS.map(b => `  * ${b.title} (${b.category}): ${b.description}`).join("\n")}
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content || "";

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    let useGroq = false;
    let geminiError: any = null;

    if (geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          systemInstruction: siteContext,
        });

        // Format history for Gemini (alternate user/model, starting with user)
        const contents = messages
          .filter((m: any, idx: number) => !(idx === 0 && m.role === "assistant"))
          .map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }]
          }));

        if (contents.length === 0) {
          contents.push({ role: "user", parts: [{ text: latestMessage }] });
        }

        // To handle Vercel Hobby timeout limit (10s), we use streaming.
        const result = await model.generateContentStream({
          contents,
        });

        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                controller.enqueue(encoder.encode(text));
              }
            } catch (e) {
              controller.error(e);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });

      } catch (err: any) {
        console.error("Gemini stream initialization failed, falling back to Groq:", err);
        geminiError = err;
        useGroq = true;
      }
    }

    if (!geminiKey || useGroq) {
      if (groqKey) {
        // Format history for Groq (standard OpenAI role structure)
        const formattedMessages = [
          { role: "system", content: siteContext },
          ...messages.map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content
          }))
        ];

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: formattedMessages,
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error(`Groq API returned error: ${response.statusText}`);
        }

        // Stream from Groq completions API
        const stream = new ReadableStream({
          async start(controller) {
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            const encoder = new TextEncoder();
            if (!reader) return controller.close();

            try {
              let buffer = "";
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  const cleaned = line.trim();
                  if (!cleaned || cleaned === "data: [DONE]") continue;

                  if (cleaned.startsWith("data: ")) {
                    try {
                      const parsed = JSON.parse(cleaned.slice(6));
                      const text = parsed.choices[0]?.delta?.content || "";
                      if (text) {
                        controller.enqueue(encoder.encode(text));
                      }
                    } catch (err) {
                      // Ignore parse errors on incomplete chunks
                    }
                  }
                }
              }
            } catch (e) {
              controller.error(e);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });

      } else {
        const errMsg = geminiError 
          ? `Gemini failed (${geminiError.message || geminiError}) and Groq API key is not configured.`
          : "No API keys (GEMINI_API_KEY or GROQ_API_KEY) found.";
        return Response.json(
          { error: errMsg },
          { status: 500 }
        );
      }
    }

  } catch (error: any) {
    console.error("Chat API error:", error);
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

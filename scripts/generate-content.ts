/**
 * Content Generation Script
 *
 * Loops through all niches, calls Groq API (Llama 3.3 70B) with structured
 * prompts, and upserts the results into MongoDB.
 *
 * Usage: npx tsx scripts/generate-content.ts [limit]
 *   e.g. npx tsx scripts/generate-content.ts 10
 *
 * Required env vars: MONGODB_URI, GROQ_API_KEY
 */

import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import Groq from "groq-sdk";

// ─── Config ───
const MONGODB_URI = process.env.MONGODB_URI!;
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

if (!MONGODB_URI || MONGODB_URI.includes("<user>")) {
    console.error("❌ Please set MONGODB_URI in .env.local");
    process.exit(1);
}
if (!GROQ_API_KEY || GROQ_API_KEY.includes("xxxx")) {
    console.error("❌ Please set GROQ_API_KEY in .env.local");
    process.exit(1);
}

// ─── Niche Definitions (import from shared module) ───
interface NicheDefinition {
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
}

const NICHES: NicheDefinition[] = [
    { slug: "ai-bias-auditing", title: "AI Bias Auditing", shortDescription: "Systematic evaluation of AI systems for discriminatory patterns and unfair outcomes.", icon: "Search" },
    { slug: "gdpr-ai-compliance", title: "GDPR AI Compliance", shortDescription: "Ensuring AI systems comply with EU General Data Protection Regulation requirements.", icon: "Shield" },
    { slug: "algorithmic-transparency", title: "Algorithmic Transparency", shortDescription: "Making AI decision-making processes explainable and auditable for stakeholders.", icon: "Eye" },
    { slug: "ai-risk-assessment", title: "AI Risk Assessment", shortDescription: "Comprehensive frameworks for evaluating risks associated with AI deployment.", icon: "AlertTriangle" },
    { slug: "eu-ai-act-compliance", title: "EU AI Act Compliance", shortDescription: "Navigate the EU AI Act's risk-based classification and compliance obligations.", icon: "BookOpen" },
    { slug: "ai-data-privacy", title: "AI Data Privacy", shortDescription: "Protecting personal data in AI training pipelines and inference systems.", icon: "Lock" },
    { slug: "automated-decision-making", title: "Automated Decision Making", shortDescription: "Legal frameworks for AI-driven decisions affecting individuals' rights.", icon: "GitBranch" },
    { slug: "ai-ethics-governance", title: "AI Ethics & Governance", shortDescription: "Building ethical AI governance structures within legal organizations.", icon: "Scale" },
    { slug: "machine-learning-compliance", title: "Machine Learning Compliance", shortDescription: "Regulatory compliance for ML model development, deployment, and monitoring.", icon: "Cpu" },
    { slug: "ai-intellectual-property", title: "AI Intellectual Property", shortDescription: "IP rights, ownership, and licensing considerations for AI-generated content.", icon: "FileText" },
    { slug: "ai-liability-frameworks", title: "AI Liability Frameworks", shortDescription: "Determining legal liability when AI systems cause harm or make errors.", icon: "Gavel" },
    { slug: "ai-contract-review", title: "AI Contract Review", shortDescription: "Using AI for contract analysis while maintaining legal compliance standards.", icon: "FileCheck" },
    { slug: "facial-recognition-regulation", title: "Facial Recognition Regulation", shortDescription: "Compliance with biometric data laws and facial recognition restrictions.", icon: "ScanFace" },
    { slug: "ai-in-legal-discovery", title: "AI in Legal Discovery", shortDescription: "Leveraging AI for e-discovery while ensuring defensibility and compliance.", icon: "FolderSearch" },
    { slug: "ai-healthcare-compliance", title: "AI Healthcare Compliance", shortDescription: "Regulatory requirements for AI in healthcare diagnostics and treatment.", icon: "Heart" },
    { slug: "ai-financial-regulation", title: "AI Financial Regulation", shortDescription: "Compliance with financial regulations for AI-driven trading and lending.", icon: "Landmark" },
    { slug: "deepfake-legislation", title: "Deepfake Legislation", shortDescription: "Legal frameworks addressing AI-generated synthetic media and deepfakes.", icon: "Video" },
    { slug: "ai-employment-law", title: "AI Employment Law", shortDescription: "Using AI in hiring while complying with anti-discrimination laws.", icon: "Users" },
    { slug: "cross-border-ai-regulation", title: "Cross-Border AI Regulation", shortDescription: "Navigating differing AI regulations across international jurisdictions.", icon: "Globe" },
    { slug: "ai-cybersecurity-compliance", title: "AI Cybersecurity Compliance", shortDescription: "Security requirements and compliance for AI systems handling sensitive data.", icon: "ShieldCheck" },
];

// ─── Mongoose Schema (inline for script portability) ───
const PageSchema = new mongoose.Schema(
    {
        niche_slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        ai_generated_content: { type: mongoose.Schema.Types.Mixed, required: true },
        meta_tags: { type: mongoose.Schema.Types.Mixed, required: true },
        image_url: { type: String, default: "" },
        published: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const PageModel =
    mongoose.models.Page || mongoose.model("Page", PageSchema);

// ─── Groq Client ───
const groq = new Groq({ apiKey: GROQ_API_KEY });

// ─── Prompt Builder ───
function buildPrompt(niche: NicheDefinition): string {
    return `You are an expert in AI compliance and legal technology. Generate comprehensive, SEO-optimized content for a page about "${niche.title}" in the context of AI compliance for legal tech.

Topic: ${niche.title}
Description: ${niche.shortDescription}

You MUST respond with valid JSON only (no markdown, no code fences). Use the exact structure below:

{
  "hero_headline": "A compelling headline (5-10 words)",
  "hero_subheadline": "A detailed subtitle explaining the topic (20-40 words)",
  "sections": [
    {
      "heading": "Section title",
      "body": "Detailed paragraph (80-150 words) with actionable insights",
      "icon": "LucideIconName"
    }
  ],
  "faq": [
    {
      "question": "Common question about ${niche.title}",
      "answer": "Comprehensive answer (40-80 words)"
    }
  ],
  "stats": [
    {
      "label": "Short metric label",
      "value": "Numeric value or percentage"
    }
  ]
}

Requirements:
- Generate exactly 4 sections, 4 FAQ items, and 4 stats
- Content must be unique, authoritative, and actionable
- Include specific regulations, frameworks, and best practices
- Use professional legal tech language
- Stats should be realistic and compelling
- Icon names must be valid Lucide React icon names`;
}

// ─── Rate Limiter ───
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main ───
async function main() {
    const limit = parseInt(process.argv[2] || "0") || NICHES.length;
    const nichesToProcess = NICHES.slice(0, limit);

    console.log(`🚀 Starting content generation pipeline (${nichesToProcess.length} of ${NICHES.length} niches)...\n`);

    // Connect to MongoDB
    console.log("📦 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < nichesToProcess.length; i++) {
        const niche = nichesToProcess[i];
        console.log(
            `[${i + 1}/${nichesToProcess.length}] Generating: ${niche.title}...`
        );

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI compliance expert. Respond with valid JSON only.",
                    },
                    {
                        role: "user",
                        content: buildPrompt(niche),
                    },
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                max_tokens: 2000,
                response_format: { type: "json_object" },
            });

            const rawContent = chatCompletion.choices[0]?.message?.content;
            if (!rawContent) {
                throw new Error("Empty response from Groq");
            }

            const aiContent = JSON.parse(rawContent);

            // Validate structure
            if (
                !aiContent.hero_headline ||
                !aiContent.sections ||
                !Array.isArray(aiContent.sections)
            ) {
                throw new Error("Invalid content structure");
            }

            // Upsert into MongoDB
            await PageModel.findOneAndUpdate(
                { niche_slug: niche.slug },
                {
                    niche_slug: niche.slug,
                    title: niche.title,
                    description: niche.shortDescription,
                    ai_generated_content: aiContent,
                    meta_tags: {
                        title: `${niche.title} — AI Compliance Guide | ComplianceAI`,
                        description:
                            aiContent.hero_subheadline || niche.shortDescription,
                        keywords: [
                            niche.title.toLowerCase(),
                            "ai compliance",
                            "legal tech",
                            "regulation",
                            niche.slug.replace(/-/g, " "),
                        ],
                    },
                    image_url: `${siteUrl}/api/og?slug=${niche.slug}`,
                    published: true,
                },
                { upsert: true, new: true }
            );

            console.log(`   ✅ ${niche.title} — saved to MongoDB`);
            successCount++;
        } catch (error) {
            console.error(
                `   ❌ ${niche.title} — Error:`,
                error instanceof Error ? error.message : error
            );
            errorCount++;
        }

        // Rate limiting: 1.5s between requests to stay within Groq free tier
        if (i < nichesToProcess.length - 1) {
            await delay(1500);
        }
    }

    console.log(`\n${"─".repeat(50)}`);
    console.log(`✅ Success: ${successCount} | ❌ Errors: ${errorCount}`);
    console.log(`📊 Total: ${nichesToProcess.length} niches processed`);

    await mongoose.disconnect();
    console.log("\n🏁 Done! Disconnected from MongoDB.");
    process.exit(0);
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});

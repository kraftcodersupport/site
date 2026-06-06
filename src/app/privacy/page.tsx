import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KraftCoder handles and protects your organizational data, credentials, and cookies.",
  alternates: { canonical: "/privacy" },
  robots: {
    index: false,
    follow: true,
  },
};
export default function PrivacyPage() {
  return (
    <div className="relative">
      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero
        title="Privacy Policy"
        subtitle="How KraftCoder handles and protects your organizational data, credentials, and cookies."
        eyebrow="Legal Protocol"
      />

      {/* ── Privacy Policy Body (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-white relative border-t border-zinc-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <article className="space-y-8 text-zinc-700">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">1. Data Sovereignty & Protection</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              At KraftCoder, we operate under strict security guidelines. We do not store, intercept, or sell data processed by our AI pipelines. All data remains within your private cloud environment or designated API boundaries.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">2. Information Collection</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              We only collect essential information required to verify identity, manage active API configurations, or respond to consultations. This includes name, organization email address, and any specific requirements you share during bookable strategy calls.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">3. Cookies & Session Storage</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              Our website uses cookies solely to maintain active sessions, track selected interface language coordinates, and verify chatbot interaction scopes. No cross-site advertisement or marketing trackers are loaded onto our domains.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">4. Third-Party Interfaces</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              When using our autonomous chat assistance features, prompts are directed through Google Gemini or Groq servers. These requests are governed by their enterprise API data privacy terms, which state that inputs are not used for public model training.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">5. Compliance Queries</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              If you have any questions regarding our data compliance practices, or require a custom NDA before a strategy consultation, please contact our privacy compliance officer directly.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 3600;

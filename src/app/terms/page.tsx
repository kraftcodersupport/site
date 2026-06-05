import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative">
      {/* ── Page Hero (Dark bg-background) ── */}
      <PageHero
        title="Terms of Service"
        subtitle="The legal framework governing consultations, specifications, and code delivery by KraftCoder."
        eyebrow="Legal Protocol"
      />

      {/* ── Terms of Service Body (Light Background - Mix Mode) ── */}
      <section className="section-padding bg-white relative border-t border-zinc-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <article className="space-y-8 text-zinc-700">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">1. Strategy Consultations</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              KraftCoder provides high-performance AI consultation. All strategy blueprints, scoping parameters, and roadmaps represent professional recommendations based on market data and our engineering experience, but do not constitute financial guarantees.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">2. Deliverables & IP Sovereignty</h2>
            <p className="font-semibold leading-relaxed text-zinc-605">
              Unless otherwise specified in a custom Master Services Agreement (MSA), all code, architectural blueprints, schema files, and integration parameters built specifically for your organization become your exclusive intellectual property upon receipt of payment.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">3. Safe API Usage</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              When utilizing our autonomous pilot applications or API layers, you agree not to submit prompts designed to breach model restrictions, generate illegal outputs, or conduct denial-of-service attempts.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">4. Modifications & Notices</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              We reserve the right to modify these service terms, update our pricing modules, or adapt deliverables schedules at any point. Continued engagement with our digital services signifies agreement to the updated terms.
            </p>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">5. Governing Jurisdiction</h2>
            <p className="font-semibold leading-relaxed text-zinc-600">
              These terms are governed and construed under the legal frameworks of our primary operating jurisdiction, without regard to conflict of law principles.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
export const dynamic = "force-dynamic";
export const revalidate = 3600;

"use client";

import { useState } from "react";
import { Sparkles, Terminal, FileText, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminGeneratePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [postResult, setPostResult] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus("Initiating Gemini generative sequence...");
    setPostResult(null);

    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger generator");
      }

      setStatus("Post generated successfully!");
      setPostResult(data.post);
    } catch (err: any) {
      setStatus(`Execution error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white py-16 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 surface-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Exit Console
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 text-primary shadow-md shadow-primary/10">
            <Sparkles className="h-6 w-6 animate-sparkle" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Blog Generator Console</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Autonomous Content Protocol</p>
          </div>
        </div>

        {/* Input Card */}
        <div className="card-dark rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
            <Terminal className="h-4 w-4 text-primary" /> System Instructions
          </div>
          <p className="text-sm font-semibold text-zinc-400 leading-relaxed">
            Enter a topic below. Gemini will design an SEO-optimized title, write strategic content, and automatically insert it as a document in your Sanity dataset.
          </p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Post Topic / Focus Keywords
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Navigating Regulatory Audits for Financial AI Pipelines"
                className="w-full h-14 px-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-semibold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-14 rounded-2xl hero-cta-primary text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" /> Trigger Content Generation
                </>
              )}
            </button>
          </form>

          {/* Status Display */}
          {status && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div className="text-xs font-bold text-zinc-300 font-mono">{status}</div>
            </div>
          )}
        </div>

        {/* Output Preview */}
        {postResult && (
          <div className="card-dark rounded-3xl p-8 space-y-6 animate-fade-in">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-800 pb-3">
              Generated Document Payload
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Category</span>
                <p className="text-sm font-bold text-white mt-1">{postResult.category}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Title</span>
                <p className="text-xl font-black text-white mt-1">{postResult.title}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Description</span>
                <p className="text-sm font-medium text-zinc-400 mt-1 leading-relaxed">{postResult.description}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Body (Markdown Preview)</span>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 overflow-x-auto whitespace-pre-wrap max-h-60 mt-1">
                  {postResult.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

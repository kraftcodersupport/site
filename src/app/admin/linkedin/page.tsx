"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Clock,
  Clipboard,
  Trash2,
  CheckCircle,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  Calendar,
  X,
  Compass
} from "lucide-react";
import Link from "next/link";

interface ILinkedInPost {
  _id: string;
  post_type: "educational" | "showcase" | "opinion" | "engagement";
  topic: string;
  hook: string;
  caption_short: string;
  caption_long: string;
  design_style: string;
  image_prompts?: string[];
  image_prompt?: string; // fallback for older schema
  hashtags: string[];
  cta: string;
  target_platforms: string[];
  status: "pending" | "selected" | "posted";
  batch_date: string;
  createdAt: string;
}

export default function LinkedInConsolePage() {
  const [posts, setPosts] = useState<ILinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [timeLefts, setTimeLefts] = useState<{ [key: string]: string }>({});
  const [showGrowthTips, setShowGrowthTips] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/linkedin-posts");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      } else {
        throw new Error(data.error || "Failed to load posts");
      }
    } catch (err: any) {
      console.error(err);
      setActionStatus(`Error fetching posts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Update countdown timers every minute
  useEffect(() => {
    if (posts.length === 0) return;

    const updateTimers = () => {
      const newTimeLefts: { [key: string]: string } = {};
      posts.forEach((post) => {
        const createdTime = new Date(post.createdAt).getTime();
        const expiryTime = createdTime + 48 * 60 * 60 * 1000; // 48 hours
        const diff = expiryTime - Date.now();

        if (diff <= 0) {
          newTimeLefts[post._id] = "Expired";
        } else {
          const totalMinutes = Math.floor(diff / (1000 * 60));
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          newTimeLefts[post._id] = `${hours}h ${minutes}m`;
        }
      });
      setTimeLefts(newTimeLefts);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [posts]);

  const handleGenerateBatch = async () => {
    if (generating) return;
    setGenerating(true);
    setActionStatus("Initiating Gemini Content Protocol...");

    try {
      const res = await fetch("/api/cron-generate-linkedin?manual=true");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation error");
      setActionStatus("Daily batch generated successfully!");
      fetchPosts();
    } catch (err: any) {
      setActionStatus(`Generation failed: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleSelect = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "selected" ? "pending" : "selected";
    setActionStatus(`Updating status to ${newStatus}...`);

    try {
      const res = await fetch("/api/linkedin-posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Instantly update local state
      setPosts((prev) =>
        prev.map((p) => {
          if (p._id === id) {
            return { ...p, status: newStatus as any };
          }
          // If setting to selected, unselect others in same batch
          if (newStatus === "selected" && p.batch_date === postBatchDate(id)) {
            return { ...p, status: "pending" as any };
          }
          return p;
        })
      );
      setActionStatus(newStatus === "selected" ? "Post marked as SELECTED for today." : "Post unselected.");
    } catch (err: any) {
      setActionStatus(`Status update failed: ${err.message}`);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setActionStatus("Deleting post document...");

    try {
      const res = await fetch(`/api/linkedin-posts?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPosts((prev) => prev.filter((p) => p._id !== id));
      setActionStatus("Post removed successfully.");
    } catch (err: any) {
      setActionStatus(`Deletion failed: ${err.message}`);
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setActionStatus(`${label} copied to clipboard!`);
    setTimeout(() => setActionStatus(null), 3000);
  };

  const postBatchDate = (id: string) => {
    return posts.find((p) => p._id === id)?.batch_date;
  };

  // Group posts by date
  const groupedPosts = posts.reduce((groups: { [key: string]: ILinkedInPost[] }, post) => {
    const date = post.batch_date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
    return groups;
  }, {});

  // Sort groups by date desc
  const sortedDates = Object.keys(groupedPosts).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "educational":
        return "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
      case "showcase":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "opinion":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "engagement":
        return "bg-pink-500/10 text-pink-400 border border-pink-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border border-zinc-700";
    }
  };

  const getPromptOptionTitle = (index: number) => {
    switch (index) {
      case 0:
        return "Option 1: Minimalist 3D Render";
      case 1:
        return "Option 2: Cinematic Photo";
      case 2:
        return "Option 3: Isometric Vector";
      default:
        return `Option ${index + 1}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-primary selection:text-white">
      {/* Toast Notification */}
      {actionStatus && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800/80 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-zinc-300">{actionStatus}</span>
          <button
            onClick={() => setActionStatus(null)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative border-b border-zinc-900 overflow-hidden bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-all group"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
              Agency Workspace
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              LinkedIn Strategy Console
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Generate daily, highly optimized LinkedIn campaigns. Copy text, select visual prompts, and create stunning graphics using Gemini / Imagen 3.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerateBatch}
              disabled={generating}
              className="h-11 px-5 rounded-xl bg-linear-to-r from-primary to-primary-light hover:brightness-110 active:scale-[0.98] text-xs font-bold text-white shadow-lg shadow-primary/15 transition-all flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Sparkles className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Calibrating Strategy..." : "Trigger Daily Generation"}
            </button>
          </div>
        </div>

        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Growth Strategy tips panel */}
        {showGrowthTips && (
          <div className="relative rounded-3xl p-6 bg-linear-to-b from-zinc-900/60 to-zinc-950/40 border border-zinc-850 overflow-hidden">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary h-fit">
                  <Compass className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">Daily Social Posting Instructions</h3>
                  <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
                    <li>Copy your preferred post caption using the <strong>Copy Caption</strong> action below.</li>
                    <li>Choose one of the 3 custom-engineered visual prompt options below.</li>
                    <li>Open <strong>Google Gemini (gemini.google.com)</strong> or <strong>Google ImageFX</strong>.</li>
                    <li>Paste the prompt to generate a high-fidelity 1080x1080 social media graphic.</li>
                    <li>Publish directly to LinkedIn to drive agency inbound growth!</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setShowGrowthTips(false)}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-zinc-500">Retrieving active campaign schedule...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-850 rounded-3xl space-y-4">
            <Sparkles className="h-10 w-10 text-zinc-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">No active LinkedIn campaigns</h3>
              <p className="text-xs text-zinc-500">Click &quot;Trigger Daily Generation&quot; above to compose your first draft batch.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedDates.map((date) => (
              <div key={date} className="space-y-6">
                {/* Date header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      Batch: {date}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Active within 48h window
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {groupedPosts[date].map((post) => {
                    const prompts = Array.isArray(post.image_prompts) && post.image_prompts.length > 0
                      ? post.image_prompts
                      : [post.image_prompt || "No prompt available."];

                    return (
                      <div
                        key={post._id}
                        className={`card-dark rounded-3xl p-6 space-y-6 transition-all duration-300 relative ${post.status === "selected"
                          ? "border-primary/50 shadow-lg shadow-primary/5 bg-primary/2"
                          : ""
                          }`}
                      >
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-4">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${getPostTypeColor(post.post_type)}`}>
                            {post.post_type}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleSelect(post._id, post.status)}
                              className={`h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${post.status === "selected"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                                }`}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              {post.status === "selected" ? "Selected" : "Select Post"}
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/30 text-zinc-500 hover:text-red-400 transition-all flex items-center justify-center"
                              title="Delete draft"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Header content */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Topic Focus</span>
                          <h3 className="text-md font-bold tracking-tight text-white leading-tight">
                            {post.topic}
                          </h3>
                          <p className="text-xs font-semibold text-primary italic">
                            &ldquo;{post.hook}&rdquo;
                          </p>
                        </div>

                        {/* Body Description & Copy Caption */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">Caption text (Long version)</span>
                            <button
                              onClick={() =>
                                handleCopyToClipboard(
                                  `${post.hook}\n\n${post.caption_long}\n\n${post.cta}\n\n${post.hashtags.map(h => `#${h}`).join(" ")}`,
                                  "Full caption"
                                )
                              }
                              className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                            >
                              <Clipboard className="h-3.5 w-3.5" /> Copy caption
                            </button>
                          </div>
                          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-900 text-xs text-zinc-300 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-line scrollbar-thin">
                            <strong>{post.hook}</strong>
                            <br /><br />
                            {post.caption_long}
                            <br /><br />
                            <strong>{post.cta}</strong>
                            <br /><br />
                            <span className="text-primary font-mono">{post.hashtags.map(h => `#${h}`).join(" ")}</span>
                          </div>
                        </div>

                        {/* Visual Prompt Suite */}
                        <div className="space-y-4 pt-4 border-t border-zinc-900">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">Imagen 3 Prompt Options</span>
                            <a
                              href="https://gemini.google.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-primary hover:text-primary-light flex items-center gap-1 transition-colors font-bold"
                            >
                              Open Gemini <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>

                          <div className="space-y-3">
                            {prompts.map((promptText, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-900/80 hover:border-zinc-850 hover:bg-zinc-900/60 transition-all space-y-2 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
                                    {getPromptOptionTitle(idx)}
                                  </span>
                                  <button
                                    onClick={() => handleCopyToClipboard(promptText, `Prompt option ${idx + 1}`)}
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1 text-[9px]"
                                    title="Copy to clipboard"
                                  >
                                    <Clipboard className="h-3 w-3" /> Copy
                                  </button>
                                </div>
                                <p className="text-[11px] text-zinc-400 italic leading-relaxed font-sans">
                                  {promptText}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

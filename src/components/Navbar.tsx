"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sparkles, X, ChevronDown, Rocket, Shield, Cpu, MessageSquare } from "lucide-react";
import { brand, NAV_ITEMS } from "@/lib/niches";

const megaMenuContent = [
  {
    title: "Capabilities",
    icon: Cpu,
    items: [
      { label: "AI Consulting", href: "/services", desc: "Executive Workshops & ROI" },
      { label: "Engineered RAG", href: "/solutions/rag-systems", desc: "Enterprise Knowledge" },
      { label: "Agentic Workflows", href: "/solutions/ai-agent-development", desc: "Autonomous Logic" },
    ]
  },
  {
    title: "Industries",
    icon: Shield,
    items: [
      { label: "Financial Services", href: "/industries", desc: "Compliant Intelligence" },
      { label: "Healthcare Systems", href: "/industries", desc: "Privacy First" },
      { label: "Modern SaaS", href: "/industries", desc: "Scalable Growth" },
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${isScrolled || activeMega
        ? "glass-strong py-4"
        : "bg-transparent py-6"
        }`}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group relative flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-primary to-accent shadow-2xl shadow-primary/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-6 w-6 text-white" />
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
              {brand.name.split(' ')[0]}<span className="text-accent">{brand.name.split(' ')[1]}</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-soft">
              Premium Intelligence
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.slice(1, 4).map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => {
                if (item.label === "Services" || item.label === "Solutions") {
                  setActiveMega(item.label);
                } else {
                  setActiveMega(null);
                }
              }}
            >
              <Link
                href={item.label === "Solutions" ? "/solutions" : item.href}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-soft hover:bg-white/5 hover:text-white"
                  }`}
              >
                {item.label}
                {(item.label === "Services" || item.label === "Solutions") && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMega === item.label ? "rotate-180" : ""}`} />
                )}
              </Link>
            </div>
          ))}
          {NAV_ITEMS.slice(4, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted-soft transition-all hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition-all hover:pr-8 hover:text-white active:scale-95"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative z-10">Start Project</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mega Menu Overlay */}
      {activeMega && (
        <div
          className="absolute inset-x-0 top-full overflow-hidden border-b border-white/5 bg-background shadow-2xl reveal-up"
          onMouseEnter={() => setActiveMega(activeMega)}
        >
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {megaMenuContent.map((section) => (
                <div key={section.title} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <section.icon className="h-5 w-5 text-accent" />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-soft">
                      {section.title}
                    </h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group/item flex flex-col gap-1 rounded-2xl p-4 transition-all hover:bg-white/5"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="text-sm font-bold text-white group-hover/item:text-primary">
                          {item.label}
                        </span>
                        <span className="text-xs text-muted-soft">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between gap-6 rounded-3xl bg-linear-to-r from-primary/5 to-accent/5 p-8 border border-white/5">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-primary">
                  <Rocket className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white">Ready to automate your intelligence?</h4>
                  <p className="text-sm text-muted-soft">Connect with an executive strategist to map your roadmap.</p>
                </div>
              </div>
              <Link href="/contact" className="rounded-full bg-white px-8 py-3 text-sm font-black text-black hover:bg-primary hover:text-white transition-all">
                Book Strategy Session
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen ? (
        <div className="fixed inset-0 top-20 z-40 bg-background px-4 py-8 lg:hidden">
          <div className="grid grid-cols-1 gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-5 text-lg font-bold text-white active:bg-white/10"
              >
                {item.label}
                <ChevronDown className="-rotate-90 h-5 w-5 text-muted-soft" />
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent py-5 text-lg font-black text-white"
            >
              Start Project
              <ArrowUpRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

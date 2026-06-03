import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles, Globe, Share2, Cpu } from "lucide-react";
import { brand, NAV_ITEMS } from "@/lib/niches";

const footerColumns = [
  {
    title: "Intelligence",
    items: [
      { href: "/services", label: "Consulting Model" },
      { href: "/solutions", label: "Enterprise Solutions" },
      { href: "/solutions/rag-systems", label: "RAG Architectures" },
      { href: "/solutions/ai-agent-development", label: "Agentic Systems" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About Strategy" },
      { href: "/case-studies", label: "Impact Records" },
      { href: "/blog", label: "Executive Insights" },
      { href: "/contact", label: "Partner Relations" },
    ],
  },
  {
    title: "Resources",
    items: [
      { href: "/resources", label: "Readiness Checklists" },
      { href: "/resources", label: "Governance Kits" },
      { href: "/resources", label: "Evaluation Frameworks" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-background pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-10">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent shadow-2xl shadow-primary/20">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  {brand.name.split(' ')[0]}<span className="text-accent">{brand.name.split(' ')[1]}</span>
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-soft">
                  Global AI Delivery
                </p>
              </div>
            </Link>

            <div className="max-w-md space-y-6">
              <h2 className="font-editorial text-2xl italic tracking-tight text-white/90">
                "Turning broad curiosity into disciplined AI portfolios."
              </h2>
              <p className="text-sm leading-7 text-muted-soft">
                We empower leadership teams to design, build, and scale AI programs that create measurable business outcomes, not just experimentation theater.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[Globe, Share2, Cpu].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-muted-soft transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-muted-soft transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 border-t border-white/5 pt-12 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft">Inquiries</p>
              <p className="text-sm font-bold text-white">{brand.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft">Support</p>
              <p className="text-sm font-bold text-white">24/7 Monitored Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-soft">Presence</p>
              <p className="text-sm font-bold text-white">Global Delivery Centers</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs font-bold text-muted-soft">
            &copy; {new Date().getFullYear()} {brand.name}. All strategic rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-xs font-bold text-muted-soft hover:text-white transition-colors">Privacy Charter</Link>
            <Link href="#" className="text-xs font-bold text-muted-soft hover:text-white transition-colors">Service Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

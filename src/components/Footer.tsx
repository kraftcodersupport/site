"use client";

import Link from "next/link";
import {
  ExternalLink,
  Send,
  AtSign,
  MapPin,
  Mail,
  Globe,
  Map
} from "lucide-react";
import Image from "next/image";
import { brand, NAV_ITEMS } from "@/lib/niches";

export default function Footer({ locale, dict }: { locale: string; dict: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background pt-16 pb-12 overflow-hidden border-t border-white/4 mt-10">

      {/* World Map Highlight (Abstract Globe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px]  pointer-events-none z-0 text-white flex items-center justify-center">
        <Image
          src="/world-dotted.svg"
          alt="World Map"
          fill
          className="object-contain"
        />
      </div>

      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none z-0 select-none opacity-40">
        <span className="text-[18vw] font-black text-white leading-none tracking-tighter whitespace-nowrap translate-y-[25%]">
          KraftCoder
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Footer Main Card */}
        <div className="glass rounded-3xl p-10 sm:p-14 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-50" />
          <div className="grid gap-12 lg:grid-cols-3 relative z-10">
            {/* Brand Column */}
            <div>
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-all group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <span className="text-lg font-bold">K</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white">
                    {brand.name.split(' ')[0]}<span className="text-primary-light">{brand.name.split(' ')[1] ? ` ${brand.name.split(' ')[1]}` : ''}</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-400">
                    Strategic AI Consulting
                  </span>
                </div>
              </Link>
              <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-zinc-400">
                {dict.footer.tagline}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm">
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm">
                  <Send className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm">
                  <AtSign className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Links Column */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
                Intelligence
              </h4>
              <ul className="space-y-3">
                {[
                  { label: dict.nav.services, href: `/services` },
                  { label: dict.nav.solutions, href: `/solutions` },
                  { label: dict.nav.team, href: `/team` },
                  { label: dict.nav.blog, href: `/blog` },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-zinc-500 transition-colors hover:text-primary-light">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-300">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 break-all mt-1">{brand.email}</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 leading-relaxed mt-1">
                    Innovation Hub, Tashkent, Uzbekistan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/4 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-zinc-600">
            © {currentYear} {brand.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-xs font-medium text-zinc-600 hover:text-primary-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs font-medium text-zinc-600 hover:text-primary-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

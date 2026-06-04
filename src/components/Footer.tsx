"use client";

import Link from "next/link";
import {
  ExternalLink,
  Send,
  AtSign,
  MapPin,
  Mail,
  Globe
} from "lucide-react";
import { brand, NAV_ITEMS } from "@/lib/niches";

export default function Footer({ locale, dict }: { locale: string; dict: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background pt-48 pb-12 overflow-hidden border-t border-white/5 mt-10 rounded-t-[32px]">
      {/* Large branding text that overlaps the footer card (70% top, 30% behind) */}
      <div className="absolute top-0 left-0 w-full flex justify-center z-0 pt-10 px-4">
        <div className="footer-branding-text w-full text-center">
          {brand.name}
        </div>
      </div>

      {/* World map dots background (Highlighted for dark theme) */}
      <div className="absolute inset-0 world-map-bg z-0 mix-blend-screen" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Footer Main Card - Positioned relative to overlap the text */}
        <div className="bg-[#0B0F1A] rounded-[48px] p-10 sm:p-16 border border-white/10 shadow-2xl shadow-black relative overflow-hidden mb-16 mt-20">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/5 opacity-50 backdrop-blur-xl" />

          <div className="relative z-10 grid gap-16 lg:grid-cols-2">
            <div>
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <span className="text-xl font-black">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-white">
                    {brand.name.split(' ')[0]}<span className="text-primary">{brand.name.split(' ')[1] ? ` ${brand.name.split(' ')[1]}` : ''}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Strategic AI Consulting
                  </span>
                </div>
              </Link>
              <p className="mt-8 max-w-sm text-base font-medium leading-relaxed text-slate-400">
                {dict.footer.tagline}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:border-primary">
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:border-primary">
                  <Send className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:border-primary">
                  <AtSign className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                  Intelligence
                </h4>
                <ul className="space-y-4">
                  {[
                    { label: dict.nav.services, href: `/${locale}/services` },
                    { label: dict.nav.solutions, href: `/${locale}/solutions` },
                    { label: dict.nav.team, href: `/${locale}/team` },
                    { label: dict.nav.blog, href: `/${locale}/blog` },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm font-bold text-slate-400 transition-colors hover:text-primary">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                  Contact
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span className="text-sm font-bold text-slate-300 break-all">{brand.email}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span className="text-sm font-bold text-slate-300 line-clamp-2 leading-relaxed">
                      Innovation Hub, Tashkent, Uzbekistan
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-12 sm:flex-row">
          <p className="text-sm font-medium text-slate-400">
            © {currentYear} {brand.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
              <Globe className="h-4 w-4" />
              EN (US)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

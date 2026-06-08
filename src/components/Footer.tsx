"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Send,
  AtSign,
  MapPin,
  Mail,
  Globe,
  Map,
  Phone
} from "lucide-react";
import Image from "next/image";
import { brand, NAV_ITEMS } from "@/lib/niches";

export default function Footer({ locale, dict }: { locale: string; dict: any }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/studio")) return null;

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
                <Image src="/logo2.png" alt="Logo" width={40} height={40} className="h-10 w-auto rounded-lg" />
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
                {brand.linkedin && (
                  <a href={brand.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                <a href={`mailto:${brand.email}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm" aria-label="Email">
                  <Mail className="h-4 w-4" />
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
                  <a href={`mailto:${brand.email}`} className="text-sm font-medium text-zinc-400 hover:text-primary-light transition-colors break-all mt-1">
                    {brand.email}
                  </a>
                </li>
                {brand.phones && brand.phones.map((phone, i) => (
                  <li key={phone} className="flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <a href={`tel:${brand.phonesRaw[i]}`} className="text-sm font-medium text-zinc-400 hover:text-primary-light transition-colors mt-1">
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 leading-relaxed mt-1">
                    {brand.address}
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

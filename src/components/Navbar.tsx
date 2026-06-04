"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Globe } from "lucide-react";
import { brand } from "@/lib/niches";

export default function Navbar({ locale, dict }: { locale: string; dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const locales = [
    { code: "en", name: "EN", flag: "🇺🇸" },
    { code: "ar", name: "AR", flag: "🇸🇦" },
    { code: "fr", name: "FR", flag: "🇫🇷" },
    { code: "de", name: "DE", flag: "🇩🇪" },
  ];

  const mainNavItems = [
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.solutions, href: "/solutions" },
    { label: dict.nav.team, href: "/team" },
    { label: dict.nav.howItWorks, href: "/how-it-works" },
    { label: dict.nav.blog, href: "/blog" },
  ];

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setIsLangOpen(false);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl w-full items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 min-w-[120px] lg:min-w-[150px]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <span className="text-base font-bold text-white">K</span>
            </div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap group-hover:text-primary-light transition-colors">
              {brand.name.split(" ")[0]}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex flex-1 items-center justify-center min-w-0 px-2"
            aria-label="Main navigation"
          >
            <ul className="flex items-center justify-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 backdrop-blur-md">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 ${isActive
                          ? "text-primary-light"
                          : "text-zinc-400 hover:text-white"
                        }`}
                    >
                      {item.label}
                      <span
                        className={`nav-link-dot ${isActive ? "nav-link-dot-active" : ""
                          }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 min-w-[120px] lg:min-w-[200px]">
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen((open) => !open)}
                className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-xs font-semibold text-zinc-400 transition-all hover:bg-white/[0.08] hover:text-white"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
              >
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span>{locale.toUpperCase()}</span>
              </button>

              {isLangOpen && (
                <div
                  role="listbox"
                  className="absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl nav-dropdown-enter"
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      role="option"
                      aria-selected={locale === l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-xs font-semibold transition-colors hover:bg-white/[0.05] ${locale === l.code ? "text-primary-light" : "text-zinc-400"
                        }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="group relative hidden sm:inline-flex h-9 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] active:scale-95"
            >
              <span className="relative z-10">{dict.common.getStarted}</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all lg:hidden ${isOpen
                  ? "border-primary/40 bg-primary/20 text-white"
                  : "border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute inset-x-4 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-zinc-900 p-5 shadow-2xl nav-dropdown-enter">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {mainNavItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-item flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${pathname === item.href
                      ? "bg-primary/10 text-primary-light"
                      : "text-zinc-300 hover:bg-white/[0.04]"
                    }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              ))}
            </nav>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white"
            >
              {dict.common.getStarted}
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-5">
              {locales.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLocaleChange(l.code)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${locale === l.code
                      ? "bg-primary/10 text-primary-light ring-1 ring-primary/30"
                      : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]"
                    }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X, Globe } from "lucide-react";
import { brand } from "@/lib/niches";

export default function Navbar({ locale, dict }: { locale: string; dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const locales = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'ar', name: 'AR', flag: '🇸🇦' },
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
    { code: 'de', name: 'DE', flag: '🇩🇪' },
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
    // Set cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year
    setIsLangOpen(false);
    setIsOpen(false);
    // Refresh to apply server-side changes
    window.location.reload();
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-100 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled
      ? "bg-background py-4 border-b border-white/10"
      : "bg-background border-4 border-t-0 border-white rounded-[32px] rounded-b-none pt-0"
      }`}>
      <div className={`mx-auto flex max-w-7xl items-start justify-between transition-all duration-300 ${isScrolled ? "items-center" : "items-start"}`}>

        {/* Left: Logo */}
        <Link href="/" className={`group flex min-w-[20%] items-center gap-2.5 transition-all duration-300 ${isScrolled ? "pt-0" : "pt-2"}`}>
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary transition-transform group-hover:scale-105">
            <span className="text-lg font-black text-white">A</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white hidden sm:block">
            {brand.name.split(' ')[0]}
          </span>
        </Link>

        {/* Center: Menu Bar */}
        <div className="relative min-w-[60%] hidden lg:block">
          <div className={`px-8 transition-all duration-300 flex items-center gap-2 ${isScrolled
            ? "bg-transparent py-2"
            : "tab-notched rounded-b-[24px] py-4"
            }`}>
            {!isScrolled && (
              <>
                <div className="concave-corner-tl opacity-100 transition-opacity" />
                <div className="concave-corner-tr opacity-100 transition-opacity" />
              </>
            )}

            <nav className="flex items-center justify-around w-full gap-3">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-300 ${pathname === item.href
                    ? "text-primary"
                    : isScrolled
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Right: Language + Start Project */}
        <div className={`flex items-center justify-end min-w-[20%] gap-3 transition-all duration-300 ${isScrolled ? "pt-0" : "pt-1"}`}>
          <div className="relative group shrink-0">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`rounded-full flex h-10 px-3 items-center justify-center border transition-all gap-2 ${isScrolled
                ? "bg-background border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                : "bg-white border-white/10 text-black/70 hover:bg-white/90"
                }`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold">{locale.toUpperCase()}</span>
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-background border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={`flex items-center w-full gap-3 px-4 py-3 text-xs font-bold transition-colors hover:bg-white/5 ${locale === l.code ? 'text-primary' : 'text-white/70'}`}
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
            className="group relative flex h-10 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20"
          >
            {dict.common.getStarted}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (simplified) */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-background/98 backdrop-blur-xl px-4 py-8 lg:hidden">
          <div className="grid grid-cols-1 gap-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-6 py-4 text-base font-semibold transition-all ${pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-muted-soft" />
              </Link>
            ))}

            <div className="mt-8 border-t border-white/10 pt-8 grid grid-cols-2 gap-4">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLocaleChange(l.code)}
                  className="flex items-center justify-center gap-2 bg-white/5 rounded-xl py-4"
                >
                  <span className="text-xl">{l.flag}</span>
                  <span className="text-sm font-bold text-white">{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

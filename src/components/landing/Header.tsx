import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-display font-black">ACROPOLIS</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

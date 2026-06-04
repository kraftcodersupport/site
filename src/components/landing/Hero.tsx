import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background border-4 border-t-0 border-white rounded-tr-none rounded-tl-none rounded-3xl pt-10">
      <div className="absolute inset-0 surface-grid opacity-20" />
      <div className="hero-noise" />
      <div className="hero-bottom-glow" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center min-h-[68vh]">
        <div className="relative flex flex-col items-center text-center reveal-up pb-12 pt-10">
          <h1 className="relative z-10 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
            ACROPOLIS INTEGRO
          </h1>
          <p className="relative z-10 mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            Комплексные IT-услуги, включая консалтинг, информационную безопасность и решения для резервного копирования данных.
          </p>
          <div className="relative z-10 mt-8">
            <Link href="/services" className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10">
              Наши услуги
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

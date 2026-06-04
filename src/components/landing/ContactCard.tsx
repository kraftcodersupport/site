import React from "react";

export default function ContactCard() {
  return (
    <div className="mt-16 lg:mt-0 lg:absolute lg:bottom-0 lg:left-0 z-20 reveal-up bg-white rounded-tr-2xl" style={{ animationDelay: '300ms' }}>
      <div className="concave-corner-br opacity-100" />
      <div className="concave-corner-card-tr opacity-100" />
      <div className="tab-notched rounded-2xl p-6 min-w-[300px] border-4 border-white bg-background!">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Связаться с нами</p>
        <p className="text-base font-black text-white mb-4">info@acropolis.uz</p>
        <div className="flex items-center gap-4">
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">in</a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">tg</a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">ig</a>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function FeaturesGrid() {
  const items = [
    { title: 'Надежное партнерство', desc: 'Глубокая экспертиза и поддержка на всех этапах' },
    { title: 'Поддержка целей клиентов', desc: 'Решения, нацеленные на рост бизнеса' },
    { title: 'Развитие цифровой экосистемы', desc: 'Инфраструктурные решения для роста' },
    { title: 'Комплексный подход к ИТ', desc: 'Снижение рисков и повышение эффективности' },
  ];

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, idx) => (
        <article key={it.title} className="feature-card-light rounded-3xl p-6">
          <h3 className="font-bold text-lg mb-2">{it.title}</h3>
          <p className="text-sm text-slate-500">{it.desc}</p>
        </article>
      ))}
    </div>
  );
}

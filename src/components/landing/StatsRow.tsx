import React from "react";

export default function StatsRow() {
  const stats = [
    { value: '40+', label: 'довольных заказчиков' },
    { value: '5+', label: 'стран реализации проектов' },
    { value: '10+', label: 'лет опыта команды' },
  ];

  return (
    <div className="mt-10 flex items-center justify-center gap-8 text-white">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="text-2xl font-black">{s.value}</div>
          <div className="text-xs uppercase text-white/60 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  suffix = "",
  duration = 1200,
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const next = Math.round(value * progress);
      setCurrent(next);
      if (progress < 1) {
        raf = window.requestAnimationFrame(frame);
      } else {
        setCurrent(value);
      }
    };

    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, [duration, value]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}

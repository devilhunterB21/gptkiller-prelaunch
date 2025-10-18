"use client";
import { useEffect, useMemo, useState } from "react";

export default function Countdown() {
  // 10 days from now, computed on first render:
  const target = useMemo(() => Date.now() + 10*24*60*60*1000, []);
  const [t, setT] = useState({ d:0,h:0,m:0,s:0 });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  return <div className="text-3xl md:text-4xl glitch-text">Activation in: {t.d}d {t.h}h {t.m}m {t.s}s</div>;
}

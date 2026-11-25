"use client";

import { useEffect } from "react";

// Scroll-reveal + stat count-up for the About section (renders nothing).
export default function AboutMotion() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll("#about .reveal").forEach((el) => io.observe(el));

    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const end = Number(el.dataset.count);
          co.unobserve(el);
          if (reduce) return;
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("#about [data-count]").forEach((el) => co.observe(el));

    return () => {
      io.disconnect();
      co.disconnect();
    };
  }, []);

  return null;
}

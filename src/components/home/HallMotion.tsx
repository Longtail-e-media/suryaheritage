"use client";

import { useEffect } from "react";

// Scroll-reveal + image parallax for the Hall section (renders nothing).
export default function HallMotion() {
  useEffect(() => {
    const root = document.getElementById("hall");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const img = root.querySelector<HTMLElement>("[data-parallax]");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!img) return;
      const r = root.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1 around centre
      img.style.transform = `translate3d(0, ${(-p * 40).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (!reduce) {
      update();
      addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

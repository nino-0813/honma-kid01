"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

type ScrollJackPinProps = {
  previous: ReactNode;
  next: ReactNode;
  /** Total scroll distance as multiple of viewport height (like GSAP pin distance). Default 2 = 200vh. */
  scrollVh?: number;
  className?: string;
};

export default function ScrollJackPin({
  previous,
  next,
  scrollVh = 2,
  className = "",
}: ScrollJackPinProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const p = clamp01(-rect.top / vh / scrollVh);
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion, scrollVh]);

  const heightStyle = { height: `${scrollVh * 100}dvh` } as const;

  return (
    <section
      ref={rootRef}
      className={["relative bg-white text-[#444]", className].filter(Boolean).join(" ")}
      style={heightStyle}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div
          className="absolute inset-0 z-10"
          style={{
            opacity: 1 - progress * 0.08,
            transform: `scale(${1 - progress * 0.01})`,
            transformOrigin: "center",
          }}
        >
          {previous}
        </div>

        <div
          className="absolute inset-0 z-20"
          style={{
            transform: `translate3d(0, ${(1 - progress) * 100}%, 0)`,
            willChange: "transform",
          }}
        >
          {next}
        </div>
      </div>
    </section>
  );
}

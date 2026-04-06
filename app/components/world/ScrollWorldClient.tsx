"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
};

/**
 * Scroll = camera: hero/depth layers scrub with page motion via GSAP ScrollTrigger.
 * Targets: [data-world="hero"], [data-world="hero-bg"], [data-world="hero-fg"],
 * [data-depth="…"], #access + [data-world="access-bg"].
 */
export default function ScrollWorldClient({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>('[data-world="hero"]');
      const heroBg = root.querySelector<HTMLElement>('[data-world="hero-bg"]');
      const heroFg = root.querySelector<HTMLElement>('[data-world="hero-fg"]');

      if (hero && heroBg) {
        gsap.to(heroBg, {
          yPercent: 14,
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.72,
          },
        });
      }

      if (hero && heroFg) {
        gsap.to(heroFg, {
          y: -52,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.72,
          },
        });
      }

      root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const raw = el.dataset.depth;
        const factor = raw ? parseFloat(raw) : 0.1;
        if (Number.isNaN(factor)) return;
        const section = el.closest("section") ?? root;
        gsap.to(el, {
          y: factor * 130,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      const access = root.querySelector<HTMLElement>("#access");
      const accessBg = root.querySelector<HTMLElement>('[data-world="access-bg"]');
      if (access && accessBg) {
        gsap.to(accessBg, {
          yPercent: 10,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: access,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mx-auto flex max-w-[1920px] flex-col gap-6 px-4 py-6 md:px-6"
    >
      {children}
    </div>
  );
}

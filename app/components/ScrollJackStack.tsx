"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

type ScrollJackStackProps = {
  panels: ReactNode[];
  className?: string;
  entry?: "immediate" | "rise";
  underlay?: ReactNode;
  /** Extra scroll distance (in viewports) after the rise, before transitioning to panel 2. */
  holdDvhAfterRise?: number;
  /**
   * When set with `entry="rise"`, the first panel content moves up with **page** scroll over the hold
   * (translateY) instead of using an inner scroll container — no nested scrollbar.
   */
  firstPanelMaxLiftPx?: number;
};

export default function ScrollJackStack({
  panels,
  className = "",
  entry = "rise",
  underlay = null,
  holdDvhAfterRise = 0,
  firstPanelMaxLiftPx,
}: ScrollJackStackProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  /** Scope that contains optional `[data-stack-lift]` — only that node is translated so fixed backdrops stay put. */
  const liftScopeRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const maxLiftPx = firstPanelMaxLiftPx ?? 0;
  const [stackHeightDvh, setStackHeightDvh] = useState(() =>
    entry === "rise"
      ? Math.max(2, panels.length + 1 + holdDvhAfterRise) * 100
      : Math.max(1, panels.length) * 100,
  );

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useLayoutEffect(() => {
    if (entry !== "rise") {
      setStackHeightDvh(Math.max(1, panels.length) * 100);
      return;
    }
    const vh = Math.max(1, window.innerHeight);
    const holdH =
      maxLiftPx > 0
        ? Math.max(holdDvhAfterRise, Math.ceil(maxLiftPx / vh))
        : holdDvhAfterRise;
    setStackHeightDvh(Math.max(2, panels.length + 1 + holdH) * 100);
  }, [entry, panels.length, holdDvhAfterRise, maxLiftPx]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(entry === "rise" ? panels.length : Math.max(0, panels.length - 1));
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const maxProgress =
        entry === "rise" ? panels.length : Math.max(0, panels.length - 1);
      const holdH =
        entry === "rise" && maxLiftPx > 0
          ? Math.max(holdDvhAfterRise, Math.ceil(maxLiftPx / vh))
          : holdDvhAfterRise;

      const raw = (vh - rect.top) / vh;
      let nextProgress: number;

      if (entry === "rise") {
        if (raw <= 1) nextProgress = clamp(raw, 0, 1);
        else if (raw <= 1 + holdH) nextProgress = 1;
        else if (raw <= 2 + holdH) nextProgress = 1 + (raw - 1 - holdH);
        else nextProgress = 2;
        nextProgress = clamp(nextProgress, 0, maxProgress);
      } else {
        nextProgress = clamp(Math.max(0, -rect.top) / vh, 0, maxProgress);
      }

      setProgress(nextProgress);

      const scope = liftScopeRef.current;
      const liftTarget =
        scope?.querySelector<HTMLElement>("[data-stack-lift]") ?? scope;
      if (
        liftTarget &&
        entry === "rise" &&
        maxLiftPx > 0 &&
        nextProgress >= 1 &&
        nextProgress < 2
      ) {
        const stackProgress = nextProgress - 1;
        const currentIdx = clamp(Math.floor(stackProgress), 0, panels.length - 1);
        let liftPx = 0;
        if (currentIdx === 0) {
          if (raw > 1 && raw <= 1 + holdH) {
            liftPx = Math.min((raw - 1) * vh, maxLiftPx);
          } else if (raw > 1 + holdH && raw < 2 + holdH) {
            const tTrans = raw - 1 - holdH;
            liftPx = (1 - tTrans) * maxLiftPx;
          }
        }
        liftTarget.style.transform = liftPx > 0.5 ? `translateY(${-liftPx}px)` : "";
      } else {
        scope?.querySelectorAll<HTMLElement>("[data-stack-lift]").forEach((el) => {
          el.style.transform = "";
        });
        if (scope && !scope.querySelector("[data-stack-lift]")) {
          scope.style.transform = "";
        }
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entry, panels.length, prefersReducedMotion, holdDvhAfterRise, maxLiftPx]);

  const maxIndex = Math.max(0, panels.length - 1);
  let current: ReactNode | null = null;
  let next: ReactNode | null = null;
  let t = 0;

  if (entry === "rise") {
    if (progress < 1) {
      current = underlay;
      next = panels[0] ?? null;
      t = clamp(progress, 0, 1);
    } else {
      const stackProgress = progress - 1;
      const currentIndex = clamp(Math.floor(stackProgress), 0, maxIndex);
      const nextIndex = clamp(currentIndex + 1, 0, maxIndex);
      t = clamp(stackProgress - currentIndex, 0, 1);
      current = panels[currentIndex] ?? null;
      next = nextIndex !== currentIndex ? panels[nextIndex] : null;
    }
  } else {
    const currentIndex = clamp(Math.floor(progress), 0, maxIndex);
    const nextIndex = clamp(currentIndex + 1, 0, maxIndex);
    t = clamp(progress - currentIndex, 0, 1);
    current = panels[currentIndex] ?? null;
    next = nextIndex !== currentIndex ? panels[nextIndex] : null;
  }

  const liftWrapper =
    entry === "rise" &&
    maxLiftPx > 0 &&
    progress >= 1 &&
    current &&
    (() => {
      const stackProgress = progress - 1;
      const currentIndex = clamp(Math.floor(stackProgress), 0, maxIndex);
      return currentIndex === 0;
    })();

  return (
    <section
      ref={rootRef}
      className={["relative text-[#444]", className].filter(Boolean).join(" ")}
      style={{
        height: `${stackHeightDvh}dvh`,
      }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {current ? (
          <div
            className="absolute inset-0 z-10"
            style={{
              opacity: next ? 1 - t * 0.08 : 1,
              transform: next ? `scale(${1 - t * 0.01})` : "none",
              transformOrigin: "center",
            }}
          >
            {liftWrapper ? (
              <div ref={liftScopeRef} className="h-full min-h-0 w-full">
                {current}
              </div>
            ) : (
              current
            )}
          </div>
        ) : null}

        {next ? (
          <div
            className="absolute inset-0 z-20"
            style={{
              transform: `translate3d(0, ${(1 - t) * 100}%, 0)`,
              willChange: "transform",
            }}
          >
            {next}
          </div>
        ) : null}
      </div>
    </section>
  );
}

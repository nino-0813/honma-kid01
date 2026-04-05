"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 右下 CTA 専用の年間プログラム判定。
 * `#usecase` セクションが見えている間は黄色のまま保持し、
 * セクションを完全に抜けたら緑へ戻す。
 */
export function useUsecaseCtaActive(enabled: boolean) {
  const [active, setActive] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const usecaseEl = document.getElementById("usecase");
    if (!(usecaseEl instanceof HTMLElement)) return;

    const update = () => {
      const u = usecaseEl.getBoundingClientRect();
      const vh = window.innerHeight;

      const usecaseVisible =
        Number.isFinite(u.top) &&
        Number.isFinite(u.bottom) &&
        u.top < vh &&
        u.bottom > 0;

      setActive(usecaseVisible);
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [enabled]);

  return active;
}

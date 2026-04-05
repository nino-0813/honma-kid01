"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 右下 CTA 専用の年間プログラム判定。
 * `data-usecase-cta-trigger` が見えた瞬間に ON、
 * `#staff` が見えた瞬間に OFF。
 * ヘッダーとは別タイミングにして、視覚的な違和感を減らす。
 */
export function useUsecaseCtaActive(enabled: boolean) {
  const [active, setActive] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const triggerEl = document.querySelector("[data-usecase-cta-trigger]");
    const staffEl = document.getElementById("staff");
    if (!(triggerEl instanceof HTMLElement)) return;

    const update = () => {
      const t = triggerEl.getBoundingClientRect();
      const s = staffEl?.getBoundingClientRect();
      const vh = window.innerHeight;

      const triggerVisible =
        Number.isFinite(t.top) &&
        Number.isFinite(t.bottom) &&
        t.top < vh &&
        t.bottom > 0;

      const staffVisible =
        s != null &&
        Number.isFinite(s.top) &&
        Number.isFinite(s.bottom) &&
        s.top < vh &&
        s.bottom > 0;

      setActive(triggerVisible && !staffVisible);
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
